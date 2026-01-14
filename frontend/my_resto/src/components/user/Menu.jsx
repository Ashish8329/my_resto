import { useEffect, useState } from "react"
import FoodCard from "./FoodCard"
import OrderButton from "./OrderButton"
import OrderDetails from "./OrderDetails"
import { useCart } from "./CartContext"
import FloatingOrderButton from "./FloatingOrderButton"
import { get, post, put } from "../../api/api"
import { ENDPOINTS } from "../../constatns/api"


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

  const restaurant_id = 1
  const table_id = 1

  const [foods, setFoods] = useState([])
  const [openOrder, setOpenOrder] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await get(`${ENDPOINTS.RESTAURANT_MENU}?restaurant_id=${restaurant_id}`)
        setFoods(data)
      } catch (err) {
        setError(err.message) 
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  async function postOrder(order) {
    try {
      const temp_items = order.map(e => ({
        item_id: e.id,
        quantity: e.quantity,
      }))

      const body = {
        'restaurant_id': restaurant_id,
        'table_id': table_id,
        'items': temp_items
      }

      const res = await post('/order/', body)
      
      window.alert('order is placed successfully!')
      location.reload()  // TODO
      setOpenOrder(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

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
          postOrder(items)
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
