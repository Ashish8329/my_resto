import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [cart, setCart] = useState({}) // { [id]: { ...food, quantity } }

  const addItem = (food) => {
    setCart(prev => ({
      ...prev,
      [food.id]: { ...food, quantity: 1 }
    }))
  }

  const increment = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: prev[id].quantity + 1
      }
    }))
  }

  const decrement = (id) => {
    setCart(prev => {
      if (prev[id].quantity === 1) {
        const copy = { ...prev }
        delete copy[id]
        return copy
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          quantity: prev[id].quantity - 1
        }
      }
    })
  }

  const items = Object.values(cart)

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        totalItems,
        totalPrice,
        addItem,
        increment,
        decrement
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
