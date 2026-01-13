import { ChevronUp } from "lucide-react"

function OrderButton({
  totalItems,
  totalPrice,
  onOpen
}) {
  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">

        <div>
          <p className="text-sm font-medium">
            {totalItems} item{totalItems > 1 ? "s" : ""}
          </p>
          <p className="text-lg font-semibold">
            ₹{totalPrice}
          </p>
        </div>

        <button
          onClick={onOpen}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-xl"
        >
          View Order
          <ChevronUp size={18} />
        </button>

      </div>
    </div>
  )
}

export default OrderButton
