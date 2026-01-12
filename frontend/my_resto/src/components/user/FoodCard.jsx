import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

function FoodCard() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden">
      
      {/* Collapsed Header */}
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-sm sm:text-base font-semibold">
            Paneer Butter Masala
          </h3>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">₹249</p>
        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 text-sm font-medium border border-green-600 text-green-600 rounded-lg">
            ADD
          </button>

          <button onClick={() => setOpen(!open)}>
            {open ? (
              <ChevronUp size={22} />
            ) : (
              <ChevronDown size={22} />
            )}
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

              <div className="mt-4">
                <button className="w-full sm:w-auto px-5 py-2 bg-green-600 text-white rounded-lg">
                  Add to Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default FoodCard
