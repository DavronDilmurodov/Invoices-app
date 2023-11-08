import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DeleteModal = ({ visible, onClose, id, token }) => {
  const navigate = useNavigate();

  if (!visible) return null;

  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const onDelete = async () => {
    await axios
      .delete(`http://13.209.46.214:3000/invoice/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        console.log(err.message);
      });

    navigate("/");
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
          Confirm Deletion
        </h2>
        <p className="text-slate-400 text-base font-medium leading-snug mt-1">
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone.
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
            onClick={onDelete}
            className="leading-[15px] text-white font-medium rounded-3xl bg-[#EC5757] hover:bg-[#FF9797] px-[22.5px] py-[18px]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
