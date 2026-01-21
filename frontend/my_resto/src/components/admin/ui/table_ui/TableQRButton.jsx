import { useState } from "react";

const TableQRButton = ({ tableId, qrUrl, disabled }) => {
  const [loading, setLoading] = useState(false);

  const handleGetQR = async () => {
    setLoading(true);

    try {
      let downloadUrl = qrUrl;

      // If QR not generated yet → call API
      if (!downloadUrl) {
        // 🔴 replace with real API later
        const res = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                qr_url: `https://api.example.com/qr/table-${tableId}.png`,
              }),
            1200
          )
        );

        downloadUrl = res.qr_url;
      }

      // 🔽 Trigger download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `table-${tableId}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("QR download failed", err);
    } finally {
      setLoading(false);
    }
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
          Downloading
        </span>
      ) : (
        "Get QR"
      )}
    </button>
  );
};

export default TableQRButton;
