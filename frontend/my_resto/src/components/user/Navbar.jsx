import { useState } from "react"
import MyOrders from "./MyOrders"
import Menu from "./Menu"

function Navbar() {
  const [open, setOpen] = useState("menus")
  const activeClasses = "border-b-4 border-blue-500 text-blue-600"

  return (
    <div className="w-full min-h-screen">
      {/* Tabs */}
      <div className="flex w-full h-min gap-2">
        {/* Menus */}
        <div
          onClick={() => setOpen("menus")}
          className={`flex-1 bg-white border rounded-md cursor-pointer ${
            open === "menus" ? activeClasses : ""
          }`}
        >
          <h2 className="font-semibold mb-2 text-center">Menus</h2>
        </div>

        {/* My Orders */}
        <div
          onClick={() => setOpen("orders")}
          className={`flex-1 bg-white border rounded-md cursor-pointer ${
            open === "orders" ? activeClasses : ""
          }`}
        >
          <h2 className="font-semibold mb-2 text-center">My Orders</h2>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {open === "orders" ? <MyOrders /> : <Menu />}
      </div>
    </div>
  )
}

export default Navbar
