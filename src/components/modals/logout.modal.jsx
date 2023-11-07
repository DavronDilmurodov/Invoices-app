import { useNavigate } from "react-router-dom";
import logout from "../../assets/images/logout.svg";

export const LogoutModal = ({ visible, onClose }) => {
  const navigate = useNavigate();

  if (!visible) return null;

  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate(0);
  };

  return (
    <div
      onClick={handleClose}
      id="container"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-10"
    >
      <div className="bg-white p-12 w-[480px] mx-4 rounded-lg shadow max-[512px]:p-6">
        <h2 className="text-gray-950 text-2xl font-bold leading-loose max-[512px]:leading-normal">
          Confirm Logging Out
        </h2>
        <p className="text-slate-400 text-base font-medium leading-snug mt-1">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-between gap-x-2 items-center mt-4">
          <button
            onClick={onClose}
            type="button"
            className="bg-[#F9FAFE] rounded-3xl px-6 py-4 text-[#7E88C3] hover:bg-[#DFE3FA]"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="bg-[#d34040] rounded-3xl px-2 pr-5 py-1 flex items-center text-white hover:bg-[#d87171]"
          >
            <img src={logout} alt="logout" className="w-12" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
