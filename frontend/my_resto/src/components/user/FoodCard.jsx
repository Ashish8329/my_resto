import { useState } from "react"
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react"

function FoodCard() {
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)

  const addItem = () => setQuantity(1)
  const increment = () => setQuantity(q => q + 1)
  const decrement = () => setQuantity(q => (q - 1 <= 0 ? 0 : q - 1))

  return (
    <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden">

      {/* Collapsed Header */}
      <div className="flex items-center justify-between p-4 gap-3">
        <h3 className="text-sm sm:text-base font-semibold flex-1">
          Paneer Butter Masala
        </h3>

        <p className="text-gray-600 text-sm sm:text-base">₹249</p>

        {/* Add / Quantity Control */}
        <div className="flex items-center gap-2">
          {quantity === 0 ? (
            <button
              onClick={addItem}
              className="px-4 py-1.5 text-sm font-medium border border-green-600 text-green-600 rounded-lg"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center border border-green-600 rounded-lg overflow-hidden">
              <button
                onClick={decrement}
                className="px-2 py-1 text-green-600"
              >
                <Minus size={16} />
              </button>

              <span className="px-3 text-sm font-medium">
                {quantity}
              </span>

              <button
                onClick={increment}
                className="px-2 py-1 text-green-600"
              >
                <Plus size={16} />
              </button>
            </div>
          )}

          <button onClick={() => setOpen(!open)}>
            {open ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {open && (
        <div className="border-t p-4">
          <div className="flex flex-col sm:flex-row gap-4">

            {/* Image */}
            <div className="w-full sm:w-40 h-40 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                alt="Food"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold">
                  Paneer Butter Masala
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  Rich creamy tomato gravy with soft paneer cubes.
                </p>
                <p className="mt-2 font-medium">₹249</p>
              </div>

              {/* Bottom cart button */}
              <div className="mt-4">
                {quantity === 0 ? (
                  <button
                    onClick={addItem}
                    className="w-full sm:w-auto px-5 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrement}
                      className="px-4 py-2 border rounded-lg"
                    >
                      -
                    </button>
                    <span className="font-medium">{quantity}</span>
                    <button
                      onClick={increment}
                      className="px-4 py-2 border rounded-lg"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default FoodCard
