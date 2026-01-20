import { useState } from "react";

const TableQRButton = ({ tableId, disabled }) => {
  const [loading, setLoading] = useState(false);

  const handleGetQR = async () => {
    setLoading(true);

    // simulate API
    setTimeout(() => {
      setLoading(false);
      console.log("QR fetched for table:", tableId);
    }, 1500);
  };

  return (
    <button
      disabled={disabled || loading}
      onClick={handleGetQR}
      className={`px-4 py-1.5 text-xs rounded-full font-medium transition
      ${
        disabled
          ? "bg-slate-300 text-slate-500 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Generating
        </span>
      ) : (
        "Get QR"
      )}
    </button>
  );
};

export default TableQRButton;
