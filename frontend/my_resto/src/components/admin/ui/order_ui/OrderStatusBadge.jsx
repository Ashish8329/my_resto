// orders/OrderStatusBadge.jsx
const statusStyles = {
  PENDING: "bg-slate-200 text-slate-700",
  PREPARING: "bg-yellow-100 text-yellow-700",
  READY: "bg-blue-100 text-blue-700",
  SERVED: "bg-green-100 text-green-700",
  PAID: "bg-purple-100 text-purple-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const OrderStatusBadge = ({ status }) => {
  return (
    <div
      className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit
      ${statusStyles[status] || "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </div>
  );
};

export default OrderStatusBadge;
