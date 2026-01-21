import OrderStatusBadge from "./OrderStatusBadge";

// orders/OrderRow.jsx
const OrderRow = ({ order, onViewItems }) => {
  return (
    <div className="grid grid-cols-6 items-center py-3 text-sm">
      <div>{order.id}</div>
      <div className="font-semibold">Table {order.table_number}</div>
      <OrderStatusBadge status={order.status} />
      <div>₹{order.total_amount}</div>
      <div className="text-slate-500">{order.created_at}</div>
      <button
        onClick={() => onViewItems(order)}
        className="text-indigo-600 text-xs font-medium"
      >
        View
      </button>
    </div>
  );
};

export default OrderRow;
