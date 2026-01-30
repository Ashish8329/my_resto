import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react"
import { useState } from "react"

function FoodCard({
  food,
  quantity,
  onAdd,
  onIncrement,
  onDecrement
}) {
  const [open, setOpen] = useState(false)

  const isAvailable = food.is_available

  return (
    <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden">

      {/* Collapsed Header */}
      <div className="flex items-center justify-between p-4 gap-3">
        <h3 className="text-sm sm:text-base font-semibold flex-1">
          {food.name}
        </h3>

        <p className="text-gray-600 text-sm sm:text-base">
          ₹{food.price}
        </p>

        {/* Right Controls */}
        <div className="flex items-center gap-2">

          {/* Availability / Cart Controls */}
          {!isAvailable ? (
            <span className="px-3 py-1 text-xs sm:text-sm font-medium
                 text-orange-700 bg-orange-100 rounded-full">
              Out of stock
            </span>
          ) : quantity === 0 ? (
            <button
              onClick={onAdd}
              className="px-4 py-1.5 text-sm font-medium border border-green-600 text-green-600 rounded-lg"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center border border-green-600 rounded-lg overflow-hidden">
              <button
                onClick={onDecrement}
                className="px-2 py-1 text-green-600"
              >
                <Minus size={16} />
              </button>

              <span className="px-3 text-sm font-medium">
                {quantity}
              </span>

              <button
                onClick={onIncrement}
                className="px-2 py-1 text-green-600"
              >
                <Plus size={16} />
              </button>
            </div>
          )}

          {/* Expand Toggle */}
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
                src={food.image_url}
                alt={food.name}
                className={`w-full h-full object-cover ${
                  !isAvailable ? "grayscale opacity-70" : ""
                }`}
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold">
                  {food.name}
                </h4>

                <p className="text-gray-600 text-sm mt-1">
                  {food.description}
                </p>

                <p className="mt-2 font-medium">
                  ₹{food.price}
                </p>

                {!isAvailable && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    This item is currently unavailable
                  </p>
                )}
              </div>

              {/* Bottom Controls */}
              <div className="mt-4">
                {!isAvailable ? (
                  <button
                    disabled
                    className="w-full sm:w-auto px-5 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Unavailable
                  </button>
                ) : quantity === 0 ? (
                  <button
                    onClick={onAdd}
                    className="w-full sm:w-auto px-5 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onDecrement}
                      className="px-4 py-2 border rounded-lg"
                    >
                      -
                    </button>

                    <span className="font-medium">
                      {quantity}
                    </span>

                    <button
                      onClick={onIncrement}
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
