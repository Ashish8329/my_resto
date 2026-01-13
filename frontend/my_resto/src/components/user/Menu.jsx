import { useState } from "react"
import FoodCard from "./FoodCard"
import OrderButton from "./OrderButton"
import OrderDetails from "./OrderDetails"
import { useCart } from "./CartContext"
import FloatingOrderButton from "./FloatingOrderButton"

const foods = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    price: 249,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    description: "Rich creamy tomato gravy with soft paneer cubes."
  },
  {
    id: 2,
    name: "Butter Naan",
    price: 49,
    image: "https://images.unsplash.com/photo-1604908554168-26c2b7b45c6f",
    description: "Soft naan brushed with butter."
  }
]

function Menu() {
  const {
    cart,
    items,
    totalItems,
    totalPrice,
    addItem,
    increment,
    decrement
  } = useCart()

  const [openOrder, setOpenOrder] = useState(false)

  return (
    <div className="pb-24 space-y-4">
      {foods.map(food => (
        <FoodCard
          key={food.id}
          food={food}
          quantity={cart[food.id]?.quantity || 0}
          onAdd={() => addItem(food)}
          onIncrement={() => increment(food.id)}
          onDecrement={() => decrement(food.id)}
        />
      ))}

      {/* <OrderButton
        totalItems={totalItems}
        totalPrice={totalPrice}
        onOpen={() => setOpenOrder(true)}
      /> */}
      <FloatingOrderButton
        totalItems={totalItems}
        totalPrice={totalPrice}
        onViewDetails={() => setOpenOrder(true)}
        onOrder={() => {
          // for now
          alert("Proceed to checkout")
          // later: navigate("/checkout") or call backend
        }}
      />


      {openOrder && (
        <OrderDetails
          items={items}
          totalPrice={totalPrice}
          onClose={() => setOpenOrder(false)}
          onIncrement={increment}
          onDecrement={decrement}
        />
      )}
    </div>
  )
}

export default Menu
