import { ChevronUp } from "lucide-react"

function FloatingOrderButton({
  totalItems,
  totalPrice,
  onViewDetails,
  onOrder
}) {
  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-10 left-0 right-0 z-50 flex justify-center px-4">
      <div className="relative w-full max-w-sm">

        {/* View Details Arrow */}
        <button
          onClick={onViewDetails}
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border rounded-full p-1 shadow"
          aria-label="View order details"
        >
          <ChevronUp size={18} />
        </button>

        {/* Main Order Button */}
        <button
          onClick={onOrder}
          className="w-full bg-green-600 text-white rounded-2xl px-5 py-4 shadow-lg active:scale-[0.98] transition"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-sm opacity-90">
                {totalItems} item{totalItems > 1 ? "s" : ""}
              </p>
              <p className="text-lg font-semibold">
                ₹{totalPrice}
              </p>
            </div>

            <span className="text-sm font-semibold uppercase">
              Place Order
            </span>
          </div>
        </button>

      </div>
    </div>
  )
}

export default FloatingOrderButton
