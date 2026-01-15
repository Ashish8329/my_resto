const OrderCard = ({
  orderId,
  tableId,
  status,
  timeAgo,
  items = [],
  onStart,
  onReady,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-lg font-semibold">
            Table #{tableId}
          </h2>
          <p className="text-sm text-gray-500">
            {timeAgo}
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium
            ${status === "PENDING" && "bg-yellow-100 text-yellow-800"}
            ${status === "IN_KITCHEN" && "bg-blue-100 text-blue-800"}
            ${status === "READY" && "bg-green-100 text-green-800"}
          `}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Items */}
      <div className="border-t border-b py-3 my-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm py-1"
          >
            <span className="text-gray-800">
              {item.name}
            </span>
            <span className="font-semibold">
              ×{item.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {status === "PENDING" && (
          <button
            onClick={onStart}
            className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-sm font-medium active:scale-95 transition"
          >
            Start Cooking
          </button>
        )}

        {status === "IN_KITCHEN" && (
          <button
            onClick={onReady}
            className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-medium active:scale-95 transition"
          >
            Mark Ready
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
