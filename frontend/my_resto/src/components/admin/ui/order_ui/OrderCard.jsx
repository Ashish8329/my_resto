// orders/OrderCard.jsx
import OrderStatusBadge from "./OrderStatusBadge";


const OrderCard = ({ order, onViewItems }) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Table {order.table_number}
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="text-xs text-slate-500 mt-1">
        {order.id} • {order.created_at}
      </div>

      <div className="mt-2 font-semibold">
        ₹{order.total_amount}
      </div>

      <button
        onClick={() => onViewItems(order)}
        className="mt-3 w-full text-sm text-indigo-600 font-medium border rounded-lg py-1.5"
      >
        View Items
      </button>
    </div>
  );
};

export default OrderCard;
