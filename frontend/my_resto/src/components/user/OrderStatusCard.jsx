import { XCircle } from "lucide-react"

function OrderStatusCard({
  orderId,
  status,
  totalItems,
  totalPrice,
  orderedAt,
  onCancel
}) {
  const statusStyles = {
    pending: "bg-gray-100 text-gray-700",
    preparing: "bg-yellow-100 text-yellow-700",
    ready: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700"
  }

  // Business rule: cancel allowed only before ready
  const canCancel = status === "PENDING" || status === "IN_KITCHEN"

  return (
    <div className="w-full bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-3">

      {/* Top Row */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">
          Order #{orderId}
        </h3>

        <button
          onClick={onCancel}
          disabled={!canCancel}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md border
            ${canCancel
              ? "text-red-600 border-red-600"
              : "text-gray-400 border-gray-300 cursor-not-allowed"
            }`}
        >
          <XCircle size={14} />
          Cancel
        </button>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[status]}`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Meta Details */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
        <span>
          {totalItems} item{totalItems > 1 ? "s" : ""} • ₹{totalPrice}
        </span>
        <span>
          Ordered at {orderedAt}
        </span>
      </div>
    </div>
  )
}

export default OrderStatusCard
