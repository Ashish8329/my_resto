import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { set_localstorage } from "../utils";
const BASE_URL = import.meta.env.VITE_API_URL

const UserLanding = () => {
  const { qrToken } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scanQR = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/staff/scan/${qrToken}/`
        );

        if (!res.ok) {
          throw new Error("Invalid QR Code");
        }

        const data = await res.json();

        const context = {
          restaurant_id: data.restaurant_id,
          table_id: data.table_id,
          qr_token: qrToken,
        };

        set_localstorage("qr_context", context);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    scanQR();
  }, [qrToken]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading menu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-end p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5')",
      }}
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">Welcome 👋</h1>
        <p className="text-gray-600 mb-6">
          Scan successful. View menu & place your order.
        </p>

        <button
          onClick={() => navigate("/menu")}
          className="w-full bg-black text-white py-3 rounded-xl text-lg active:scale-95 transition"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default UserLanding;
