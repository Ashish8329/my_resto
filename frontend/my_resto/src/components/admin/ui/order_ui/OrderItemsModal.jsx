// orders/OrderItemsModal.jsx
const OrderItemsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50">
      <div className="bg-white w-full md:w-96 rounded-t-2xl md:rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">
            Table {order.table_number}
          </h2>
          <button onClick={onClose} className="text-slate-500">✕</button>
        </div>

        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{order.total_amount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItemsModal;
