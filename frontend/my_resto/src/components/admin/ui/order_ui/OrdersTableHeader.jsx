// orders/OrdersTableHeader.jsx
const OrdersTableHeader = () => {
  return (
    <div className="grid grid-cols-6 text-xs font-semibold text-slate-500 border-b pb-2">
      <div>Order</div>
      <div>Table</div>
      <div>Status</div>
      <div>Total</div>
      <div>Time</div>
      <div>Action</div>
    </div>
  );
};

export default OrdersTableHeader;
