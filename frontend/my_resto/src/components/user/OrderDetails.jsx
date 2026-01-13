import { X, Minus, Plus } from "lucide-react"

function OrderDetails({
  items,
  totalPrice,
  onClose,
  onIncrement,
  onDecrement
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
      
      {/* Drawer */}
      <div className="w-full bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Your Order</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2 border rounded-lg">
                <button
                  onClick={() => onDecrement(item.id)}
                  className="px-2 py-1"
                >
                  <Minus size={16} />
                </button>

                <span className="px-2">
                  {item.quantity}
                </span>

                <button
                  onClick={() => onIncrement(item.id)}
                  className="px-2 py-1"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Total</span>
            <span className="text-lg font-semibold">
              ₹{totalPrice}
            </span>
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl">
            Place Order
          </button>
        </div>

      </div>
    </div>
  )
}

export default OrderDetails
