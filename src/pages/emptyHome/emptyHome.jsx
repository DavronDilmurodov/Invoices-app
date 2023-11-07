import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";

import plus from "../../assets/images/plus.svg";
import emptyHome from "../../assets/images/emptyHome.svg";
import { TokenModal } from "../../components/modals/token.modal";

export const EmptyHome = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);

  if (!token) {
    setTimeout(() => {
      return setModal(true);
    }, 1000);
  }

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

  return (
    <>
      <header className="flex md:mb-[141px] max-sm:mb-[102px] max-md:mb-[210px] justify-between">
        <div>
          <h1 className="text-[#0C0E16] font-bold text-[32px] max-sm:text-2xl sm:leading-9">
            Invoices
          </h1>
          <p className="text-[#888EB0] max-sm:text-xs">No invoices</p>
        </div>
        <div className="flex items-center sm:gap-x-10 max-sm:gap-x-[18px]">
          <Select
            placeholder="Filter by status"
            options={options}
            required
            styles={customStyles}
            className="font-bold leading-[15px] text-sm max-[450px]:hidden"
          />
          <Select
            placeholder="Filter"
            options={options}
            required
            styles={customStyles}
            className="font-bold leading-[15px] text-sm min-[450px]:hidden"
          />
          <button
            onClick={() => {
              navigate("/create");
            }}
            className="text-sm bg-[#7C5DFA] font-normal text-white pr-4 pl-2 py-2 tracking-[-0.25px] flex items-center gap-x-4 rounded-3xl hover:bg-[#9277FF] max-[450px]:hidden"
          >
            <img src={plus} alt="plus" /> New Invoice
          </button>
          <button
            onClick={() => {
              navigate("/create");
            }}
            className="text-sm bg-[#7C5DFA] font-normal text-white pr-4 pl-2 py-2 tracking-[-0.25px] flex items-center gap-x-2 rounded-3xl hover:bg-[#9277FF] min-[450px]:hidden max-sm:py-[6px] max-sm:pl-[6px] max-sm:pr-[14px]"
          >
            <img src={plus} alt="plus" /> New
          </button>
        </div>
      </header>
      <div className="text-center">
        <img src={emptyHome} alt="emptyHome" className="mx-auto md:hidden" />
        <h2 className="mb-6 tracking-[-0.63px] text-[#0C0E16] font-bold leading-[22px] text-[20px]">
          There is nothing here
        </h2>
        <p className="text-[#888EB0] font-medium text-xs tracking-[-0.25]">
          Create an invoice by clicking the <br />
          <span className="font-bold"> New Invoice</span> button and get started
        </p>
      </div>
      <TokenModal visible={modal} />
    </>
  );
};
