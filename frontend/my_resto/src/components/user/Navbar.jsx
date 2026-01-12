import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full min-h-scree ">
      
      <div className="flex w-full h-min gap-2">
        
        {/* Menus */}
        <div className="flex-1 bg-white border rounded-md ">
          <h2 className="font-semibold mb-2">Menus</h2>
        </div>

        {/* My Orders */}
        <div className="flex-1 bg-white border rounded-md ">
          <h2 className="font-semibold mb-2">My Orders</h2>
        </div>

      </div>
    </div>
  )
}


export default Navbar
