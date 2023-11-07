import { useState } from "react";
import logo from "../../../assets/images/logo.svg";
import logout from "../../../assets/images/logout.svg";
import { Link } from "react-router-dom";
import { LogoutModal } from "../../modals/logout.modal";

export const Sidebar = () => {
  const [modal, setModal] = useState(false);

  const onHandleClose = () => setModal(false);

  return (
    <>
      <div className="bg-[#373B53] relative xl:h-screen md:rounded-r-3xl md:fixed md:top-0 md:left-0 md:bottom-0 max-md:w-screen max-md:h-20 max-md:mb-14">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-20 h-20" />
        </Link>
        <div className="absolute md:bottom-1 md:left-1 max-md:bottom-0 max-md:right-2">
          <button onClick={() => setModal(true)}>
            <img src={logout} alt="logout" />
          </button>
        </div>
      </div>
      <LogoutModal onClose={onHandleClose} visible={modal} />
    </>
  );
};
