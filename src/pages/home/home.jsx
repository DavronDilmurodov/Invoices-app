import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

import plus from "../../assets/images/plus.svg";
import right from "../../assets/images/right.svg";
import { EmptyHome } from "../emptyHome";
import { TokenModal } from "../../components/modals/token.modal";
import { useAuth } from "../../hooks/useAuth";

export const Home = () => {
  const navigate = useNavigate();

  const [token] = useAuth();
  const [modal, setModal] = useState(false);
  const [filteredDataText, setFilteredData] = useState("All");

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  async function getData() {
    const res = await axios
      .get(`http://13.209.46.214:3000/invoice?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        if (err.response.status == 403) {
          localStorage.removeItem("token");
          return setModal(true);
        }
      });

    if (res?.status == 200) {
      setPage(page + 1);

      const _data = res.data.data;

      setData([..._data, ...data]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  let filteredInvoices = data.filter((invoice) => {
    if (filteredDataText === "Paid") {
      return invoice.status == 2;
    } else if (filteredDataText === "Pending") {
      return invoice.status == 1;
    }
    return invoice;
  });

  filteredInvoices = filteredInvoices.sort((a, b) => b.id - a.id);

  const onNavigate = async (id) => {
    const newToken = localStorage.getItem("token");

    const res = await axios
      .get(`http://13.209.46.214:3000/invoice/${id}`, {
        headers: { Authorization: `Bearer ${newToken}` },
      })
      .catch((err) => {
        if (err.response.status == 403) {
          setModal(true);
        }
      });

    if (res?.status == 200) {
      navigate(`/invoice/${id}`, {
        state: res.data.data,
      });
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#e9e5eb" : "white",
      color: state.isFocused ? "#7C5DFA" : "black",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#7C5DFA",
    }),
  };

  const options = [
    { value: "All", label: "All" },
    { value: "Paid", label: "Paid" },
    { value: "Pending", label: "Pending" },
  ];

  const onFilter = (evt) => {
    setFilteredData(evt.value);
  };

  if (data?.length > 0) {
    return (
      <>
        <header className="flex justify-between">
          <div>
            <h1 className="text-[#0C0E16] font-bold text-[32px] max-sm:text-xl sm:leading-9">
              Invoices
            </h1>
            <p className="text-[#888EB0] max-sm:hidden">
              There are {filteredInvoices.length} total
              {filteredInvoices.length > 1 ? " invoices" : " invoice"}
            </p>
            <p className="text-[#888EB0] sm:hidden max-sm:text-xs">
              {filteredInvoices.length}
              {filteredInvoices.length > 1 ? " invoices" : " invoice"}
            </p>
          </div>
          <div className="flex items-center sm:gap-x-10 max-sm:gap-x-3">
            <Select
              placeholder="Filter by status"
              options={options}
              required
              styles={customStyles}
              onChange={onFilter}
              className="font-bold leading-[15px] w-[151px] text-sm max-[500px]:hidden"
            />
            <Select
              placeholder="Filter"
              options={options}
              required
              styles={customStyles}
              onChange={onFilter}
              className="font-bold leading-[15px] text-sm min-[500px]:hidden"
            />
            <button
              onClick={() => {
                navigate("/create");
              }}
              className="text-sm bg-[#7C5DFA] font-normal text-white pr-4 pl-2 py-2 tracking-[-0.25px] flex items-center gap-x-4 rounded-3xl hover:bg-[#9277FF] max-[500px]:hidden"
            >
              <img src={plus} alt="plus" /> New Invoice
            </button>
            <button
              onClick={() => {
                navigate("/create");
              }}
              className="text-sm bg-[#7C5DFA] font-normal text-white pr-4 pl-2 py-2 tracking-[-0.25px] flex items-center gap-x-2 rounded-3xl hover:bg-[#9277FF] min-[500px]:hidden max-sm:py-[6px] max-sm:pl-[6px] max-sm:pr-[14px]"
            >
              <img src={plus} alt="plus" /> New
            </button>
          </div>
        </header>
        <main className="md:mt-[65px] max-md:mt-14 max-sm:mt-8">
          <div className="text-center">
            <ul className="invoices-list">
              {filteredInvoices.map((invoice) => (
                <li
                  onClick={onNavigate.bind(null, invoice.id)}
                  key={invoice.id}
                  className="shadow rounded-lg mb-4 bg-white pl-8 pr-6 py-4 flex justify-between items-center hover:border hover:border-violet-500 md:text-sm max-md:text-sm max-md:px-6 max-sm:relative max-sm:h-[134px] "
                >
                  <h5 className="text-[#0C0E16] font-bold tracking-[-0.25px] max-sm:absolute max-sm:top-6 max-sm:left-6">
                    <span className="text-[#7E88C3]">#</span>
                    {invoice.id}
                  </h5>
                  <div className="text-[#7E88C3] font-medium tracking-[-0.25px] max-sm:absolute max-sm:top-[63px] max-sm:left-6">
                    <span className="text-[#888EB0]">Due</span>{" "}
                    {invoice.dueDate.slice(0, 10)}
                  </div>
                  <h4 className="text-[#858BB2] font-medium tracking-[-0.25px] sm:w-[144px] text-start max-sm:absolute max-sm:top-6 max-sm:right-6">
                    {invoice.name}
                  </h4>
                  <p className="font-bold text-[#0C0E16] tracking-[-0.8px] text-base max-sm:absolute max-sm:top-[86px] max-sm:left-6">
                    £ {invoice.price}
                  </p>
                  <div className="flex items-center gap-x-5 max-sm:absolute max-sm:top-[67px] max-sm:right-6">
                    {invoice.status == 1 ? (
                      <div className="bg-[#FF8F00] text-center bg-opacity-5 px-[18px] py-3 rounded-md">
                        <span className="bg-[#FF8F00] w-2 h-2 rounded-full inline-block mr-2"></span>
                        <span className="text-[#FF8F00] tracking-[-0.25px] font-bold">
                          Pending
                        </span>
                      </div>
                    ) : (
                      <div className="bg-[#33D69F] text-center bg-opacity-5 px-[29px] py-3 rounded-md">
                        <span className="bg-[#33D69F] w-2 h-2 rounded-full inline-block mr-2"></span>
                        <span className="text-[#33D69F] tracking-[-0.25px] font-bold">
                          Paid
                        </span>
                      </div>
                    )}

                    <img src={right} alt="right" className="max-sm:hidden" />
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={getData}
              className="max-w-xs w-full bg-[#7C5DFA] hover:bg-[#9277FF] text-white text-base font-normal hover:text-white py-3 px-5 border-none rounded-2xl mb-6 mt-2"
            >
              Show More
            </button>
          </div>
        </main>
        <TokenModal visible={modal} />
      </>
    );
  } else {
    return <EmptyHome />;
  }
};
