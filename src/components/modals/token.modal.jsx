import { useNavigate } from "react-router-dom";

export const TokenModal = ({ visible }) => {
  if (!visible) return null;
  const navigate = useNavigate();

  const onRestore = () => {
    localStorage.removeItem("token");
    navigate(0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="bg-white p-12 w-[480px] mx-4 rounded-lg shadow max-[512px]:p-6">
        <h2 className="text-gray-950 text-2xl font-bold leading-loose max-[512px]:leading-normal">
          Your token has been expired
        </h2>
        <p className="text-slate-400 text-base font-medium leading-snug mt-1">
          But you can login again and restore your token
        </p>
        <div className="flex justify-end gap-x-2 items-center mt-4">
          <button
            onClick={onRestore}
            type="button"
            className="bg-[#F9FAFE] rounded-3xl px-6 py-4 text-[#7E88C3] hover:bg-[#DFE3FA]"
          >
            Restore
          </button>
        </div>
      </div>
    </div>
  );
};
