import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import left from "../../assets/images/left.svg";
import { useAuth } from "../../hooks/useAuth";
import { DeleteModal } from "../../components/modals/delete.modal";
import { TokenModal } from "../../components/modals/token.modal";

export const Invoice = () => {
  const [modal, setModal] = useState(false);
  const [tokenModal, setTokenModal] = useState(false);

  const onHandleClose = () => setModal(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [token] = useAuth();

  const onBack = () => {
    navigate(-1);
  };

  const onEdit = () => {
    navigate(`/invoice/edit/${id}`, {
      state,
    });
  };

  const markAsPaid = async () => {
    const res = await axios
      .put(`http://localhost:3000/invoice/status/${id}`, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response.status == 403) {
          setTokenModal(true);
        }
      });

    if (res.status == 200) {
      navigate("/");
      navigate(0);
    }
  };

  return (
    <>
      <button
        onClick={onBack}
        className="text-gray-950 font-bold leading-[15px] flex gap-5 tracking-[-0.25px]"
      >
        <img src={left} alt="left" />
        Go back
      </button>
      <div className="mt-8 py-5 bg-white sm:px-8 max-sm:px-6 sm:flex items-center justify-between rounded-lg shadow">
        <div className="status flex items-center gap-x-4 max-sm:justify-between">
          <p className="text-slate-400 font-medium font-['Spartan'] leading-[15px]">
            Status
          </p>
          {state.status === 1 ? (
            <div className="bg-[#FF8F00] text-center bg-opacity-5 w-[104px] py-3 rounded-md">
              <span className="bg-[#FF8F00] w-2 h-2 rounded-full inline-block mr-2"></span>
              <span className="text-[#FF8F00] tracking-[-0.25px] font-bold">
                Pending
              </span>
            </div>
          ) : (
            <div className="bg-[#33D69F] text-center bg-opacity-5 w-[104px] py-3 rounded-md">
              <span className="bg-[#33D69F] w-2 h-2 rounded-full inline-block mr-2"></span>
              <span className="text-[#33D69F] tracking-[-0.25px] font-bold">
                Paid
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-x-2 tracking-[-0.25px] max-sm:hidden">
          <button
            onClick={onEdit}
            className="leading-[15px] text-[#7E88C3] hover:text-[#DFE3FA] font-medium rounded-3xl bg-[#F9FAFE] hover:bg-white px-[22.5px] py-[18px]"
          >
            Edit
          </button>
          <button
            onClick={() => setModal(true)}
            className="leading-[15px] text-white font-medium rounded-3xl bg-[#EC5757] hover:bg-[#FF9797] px-[22.5px] py-[18px]"
          >
            Delete
          </button>
          <button
            onClick={markAsPaid}
            className="leading-[15px] text-white font-medium rounded-3xl bg-[#7C5DFA] hover:bg-[#9277FF] px-[22.5px] py-[18px]"
          >
            {state.status == 2 ? "Mark as Unpaid" : "Mark as Paid"}
          </button>
        </div>
      </div>
      <div className="mt-[27px] max-sm:mb-14 px-8 max-sm:px-6 pb-12 pt-[51px] tracking-[-0.8px] shadow bg-white rounded-lg ">
        <div className="inline-block mb-[49px] max-sm:mb-10">
          <p className="text-[#0C0D16] text-lg max-sm:text-base font-bold leading-normal ">
            <span className="text-[#888EB0]">#</span>
            {state.id}
          </p>
          <p className="tracking-[-0.25px] text-[#7E88C3] font-medium text-lg max-sm:text-base leading-[15px] max-sm:mt-1 mt-[6px] max-w-2xl ">
            {state?.description}
          </p>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-y-8 max-[555px]:relative">
          <div>
            <p className="text-[#7E88C3] max-sm:text-sm leading-[15px] font-medium mb-3 max-sm:mb-2 tracking-[-0.25px]">
              Invoice Date
            </p>
            <p className="tracking-[-0.31px] leading-tight max-sm:text-[15px] font-bold text-[#0C0E16] text-lg">
              {state.createdAt.slice(0, 10)}
            </p>
          </div>
          <div className="max-[555px]:absolute max-[555px]:right-0">
            <p className="text-[#7E88C3] max-sm:text-sm leading-[15px] font-medium mb-3 max-sm:mb-2 tracking-[-0.25px]">
              Bill To
            </p>
            <p className="tracking-[-0.31px] leading-tight max-sm:text-[15px] font-bold text-[#0C0E16] text-lg">
              {state.name}
            </p>
          </div>
          <div className="max-[555px]:col-span-3">
            <p className="text-[#7E88C3] max-sm:text-sm leading-[15px] font-medium mb-3 max-sm:mb-2 tracking-[-0.25px]">
              Sent to
            </p>
            <p className="tracking-[-0.31px] leading-tight max-sm:text-[15px] font-bold text-[#0C0E16] text-lg">
              {state.email}
            </p>
          </div>
          <div>
            <p className="text-[#7E88C3] max-sm:text-sm leading-[15px] font-medium mb-3 max-sm:mb-2 tracking-[-0.25px]">
              Payment Due
            </p>
            <p className="tracking-[-0.31px] leading-tight max-sm:text-[15px] font-bold text-[#0C0E16] text-lg">
              {state.dueDate.slice(0, 10)}
            </p>
          </div>
        </div>
        <div className="mt-[50px] py-6 sm:px-8 max-sm:px-6 text-white bg-[#373B53] rounded-lg flex items-center justify-between">
          <p className="font-normal max-sm:text-sm leading-[18px] tracking-[-0.23px]">
            Amount Due
          </p>
          <h2 className="max-sm:text-2xl font-bold text-3xl leading-8 tracking-[-0.5px]">
            £ {state.price}
          </h2>
        </div>
      </div>
      <div className="sm:hidden flex gap-x-2 tracking-[-0.25px] justify-between bg-white px-6 py-[21px] absolute w-full left-0">
        <button
          onClick={onEdit}
          className="leading-[15px] text-[#7E88C3] hover:text-[#DFE3FA] font-medium rounded-3xl bg-[#F9FAFE] hover:bg-white px-[22.5px] py-[18px]"
        >
          Edit
        </button>
        <button
          onClick={() => setModal(true)}
          className="leading-[15px] text-white font-medium rounded-3xl bg-[#EC5757] hover:bg-[#FF9797] px-[22.5px] py-[18px]"
        >
          Delete
        </button>
        <button
          onClick={markAsPaid}
          className="leading-[15px] text-white font-medium rounded-3xl bg-[#7C5DFA] hover:bg-[#9277FF] px-[22.5px] py-[18px]"
        >
          {state.status == 2 ? "Mark as Unpaid" : "Mark as Paid"}
        </button>
      </div>
      <DeleteModal
        onClose={onHandleClose}
        visible={modal}
        id={state.id}
        token={token}
      />
      <TokenModal visible={tokenModal} />
    </>
  );
};
