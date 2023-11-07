import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import error from "../../assets/images/error.svg";
import exit from "../../assets/images/exit.svg";

export const Login = () => {
  const navigate = useNavigate();
  const [, setToken] = useAuth();
  const [badReqError, setBadReqError] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const onLogin = async (evt) => {
    evt.preventDefault();
    const username = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const res = await axios
      .post("http://13.209.46.214:3000/auth/login", {
        username,
        password,
      })
      .catch((err) => {
        if (err.response.status == 401) {
          return setBadReqError(true);
        }
      });

    if (res?.status == 200) {
      const token = res?.data.data.token;
      setToken(token);

      setTimeout(() => {
        navigate(0);
      }, 0);
    }
  };

  return (
    <div className="h-[94%] px-4 mx-auto flex justify-center items-center">
      <div className="sm:pt-11 sm:pb-9 sm:px-[58px] max-sm:w-full bg-white rounded-lg max-sm:pb-6 max-sm:pt-8 max-sm:px-8">
        <div
          className={
            badReqError
              ? "bg-[#f59494aa] p-9 max-w-[510px] mx-auto rounded-lg shadow-lg max-[512px]:p-5 max-[512px]:pl-2 mb-5 flex items-center justify-between gap-x-3 pl-4 relative"
              : "hidden"
          }
        >
          <button
            type="button"
            className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute top-1 right-1"
            onClick={() => setBadReqError(false)}
          >
            <span className="sr-only">Close menu</span>
            <img src={exit} className="h-6 w-6" alt="" />
          </button>
          <img
            src={error}
            alt="error mark"
            className="max-[512px]:w-14 max-[375px]:w-11"
          />
          <h2 className="text-gray-950 text-xl font-bold leading-tight max-[512px]:text-lg max-[375px]:text-base mr-4">
            Username or Password is incorrect. Please try again
          </h2>
        </div>

        <h2 className="text-[#0C0E16] font-bold text-2xl tracking-[-0.5px]">
          Login
        </h2>
        <form onSubmit={onLogin} className="pt-9">
          <p className="font-medium text-xs tracking-[-0.25px] text-[#7E88C3] mb-[10px]">
            Username
          </p>
          <input
            className="border border-[#DFE3FA] rounded-[4px] sm:w-[516px] max-sm:w-full mb-6 py-1 pl-4 focus:ring-indigo-500"
            type="text"
            placeholder="Username"
            required
            name="username"
            ref={emailRef}
            minLength={2}
            maxLength={30}
          />
          <p className="font-medium text-xs tracking-[-0.25px] text-[#7E88C3] mb-[10px]">
            Password
          </p>
          <input
            className="border border-[#DFE3FA] rounded-[4px] mb-6 sm:w-[516px] max-sm:w-full py-1 pl-4"
            type="password"
            placeholder="Password"
            required
            ref={passwordRef}
            name="password"
            minLength={8}
            maxLength={20}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#7C5DFA] rounded-3xl py-3 px-6 text-white hover:bg-[#9277FF] block"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
