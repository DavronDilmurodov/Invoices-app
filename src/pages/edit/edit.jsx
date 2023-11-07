import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import Select from "react-select";
import axios from "axios";

import left from "../../assets/images/left.svg";
import { useAuth } from "../../hooks/useAuth";
import { TokenModal } from "../../components/modals/token.modal";

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [token] = useAuth();
  const [modal, setModal] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const dateRef = useRef();
  const termRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const onBack = () => {
    navigate(-1);
  };

  const onSend = async (evt) => {
    evt.preventDefault();

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const dueDate = dateRef.current.value.trim();
    const term = Number(termRef.current.props.value.value.trim());
    const description = descriptionRef.current.value.trim();
    const price = Number(priceRef.current.value.trim());

    if (email.slice(-4) !== ".com") {
      return setValidEmail(true);
    }

    const res = await axios
      .put(
        `http://13.209.46.214:3000/invoice/${id}`,
        {
          name,
          email,
          dueDate,
          term,
          description,
          price,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((err) => {
        return setModal(true);
      });

    if (res?.status === 200) {
      navigate("/");
      navigate(0);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderBottom: "1px solid #DFE3FA",
      color: state.isFocused ? "#7C5DFA" : "black",
    }),
  };

  const options = [
    { value: "1", label: "Net 1 Day" },
    { value: "7", label: "Net 7 Days" },
    { value: "14", label: "Net 14 Days" },
    { value: "30", label: "Net 30 Days" },
  ];

  return (
    <div>
      <button
        onClick={onBack}
        className="text-gray-950 font-bold leading-[15px] flex gap-5 items-center tracking-[-0.25px] mb-[41px]"
      >
        <img src={left} alt="left" />
        Go back
      </button>
      <div className="max-w-[631px] mx-auto bg-white rounded-lg pt-[51px] pb-[32px] px-14 shadow">
        <h2 className="text-[#0C0E16] tracking-[-0.5px] font-bold text-2xl mb-9">
          Edit <span className="text-[#888EB0]">#</span>
          {state.id}
        </h2>
        <form onSubmit={onSend} className="relative">
          <label
            htmlFor="name"
            className="inline-block font-medium text-sm tracking-[-0.25px] text-[#7E88C3] mb-[10px]"
          >
            Client`s Name
          </label>
          <input
            className="border border-[#DFE3FA] rounded w-full pl-3 mb-6 py-2 focus:border-[#9277FF] text-[#0C0E16] font-bold leading-[15px] text-sm"
            type="text"
            placeholder="Name"
            required
            name="name"
            id="name"
            defaultValue={state.name}
            ref={nameRef}
            minLength={2}
            maxLength={15}
          />
          <label
            htmlFor="email"
            className="inline-block font-medium text-sm tracking-[-0.25px] text-[#7E88C3] mb-[10px]"
          >
            Client`s Email
          </label>
          <input
            className="border border-[#DFE3FA] rounded w-full pl-3 mb-6 py-2 text-[#0C0E16] font-bold leading-[15px] text-sm"
            type="email"
            placeholder="Email"
            required
            name="email"
            id="email"
            defaultValue={state.email}
            ref={emailRef}
          />
          <p
            className={
              validEmail
                ? "text-red-600 text-sm absolute top-[153px] left-1 block"
                : "hidden"
            }
          >
            Please, write correct email address
          </p>
          <div className="flex gap-x-[25px] items-center max-[500px]:flex-col">
            <div className="md:w-2/4 max-md:w-full">
              <label
                htmlFor="date"
                className="inline-block font-medium text-sm tracking-[-0.25px]  text-[#7E88C3] mb-[10px]"
              >
                Due Date
              </label>
              <input
                type="date"
                required
                className="border border-[#DFE3FA] rounded w-full pl-3 mb-6 py-2 text-[#0C0E16] font-bold leading-[15px] text-sm pr-2"
                id="date"
                value={state.dueDate.slice(0, 10)}
                ref={dateRef}
              />
            </div>
            <div className="md:w-2/4 max-md:w-full">
              <label
                className="text-sm pl-3 tracking-[-0.25px] text-[#7E88C3] font-medium inline-block"
                htmlFor="terms"
              >
                Payment Terms
              </label>
              <Select
                ref={termRef}
                options={options}
                required
                styles={customStyles}
                defaultValue={options.find(
                  (option) => option.value == state.term
                )}
                className="rounded w-full mb-4 py-2 font-bold leading-[15px] text-sm"
              />
            </div>
          </div>
          <label
            htmlFor="description"
            className="inline-block font-medium text-sm tracking-[-0.25px] text-[#7E88C3] mb-[10px]"
          >
            Project Description
          </label>
          <input
            className="border border-[#DFE3FA] rounded w-full pl-3 mb-6 py-2 text-[#0C0E16] font-bold leading-[15px] text-sm"
            type="text"
            placeholder="Description"
            name="text"
            id="description"
            defaultValue={state.description}
            ref={descriptionRef}
            maxLength={80}
          />
          <label
            htmlFor="price"
            className="block font-medium text-sm tracking-[-0.25px] text-[#7E88C3] mb-[10px]"
          >
            Price
          </label>
          <input
            className="border border-[#DFE3FA] rounded w-full pl-3 mb-6 py-2 text-[#0C0E16] font-bold leading-[15px] text-sm pr-2"
            type="number"
            placeholder="Price"
            required
            name="number"
            id="price"
            defaultValue={state.price}
            min={100}
            max={700}
            ref={priceRef}
          />
          <div className="flex justify-between items-center max-[425px]:flex-col max-[425px]:gap-y-4">
            <button
              onClick={() => navigate("/")}
              type="button"
              className="bg-[#F9FAFE] rounded-3xl px-6 py-4 text-[#7E88C3] hover:bg-[#DFE3FA]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#7C5DFA] rounded-3xl px-6 py-4 text-white hover:bg-[#9277FF]"
            >
              Save & Send
            </button>
          </div>
        </form>
      </div>
      <TokenModal visible={modal} />
    </div>
  );
};
