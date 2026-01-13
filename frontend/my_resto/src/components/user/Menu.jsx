import React, { useState } from 'react'
import FoodCard from './FoodCard'

 

const Menu = () => {

  const food = {
    id: 1,
    name: "Paneer Butter Masala",
    price: 249,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    description: "Rich creamy tomato gravy with soft paneer cubes."
  }

  const [cart, setCart] = useState({})

  console.log(cart)
  const addItem = (food) => {
    setCart(prev => ({
      ...prev,
      [food.id]: 1
    }))
  }

  const increment = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }))
  }

  const decrement = (id) => {
    setCart(prev => {
      if (prev[id] === 1) {
        const copy = { ...prev }
        delete copy[id]
        return copy
      }
      return { ...prev, [id]: prev[id] - 1 }
    })
  }

  return (
    <div>
      <FoodCard
        food={food}
        quantity={cart[food.id] || 0}
        onAdd={() => addItem(food)}
        onIncrement={() => increment(food.id)}
        onDecrement={() => decrement(food.id)}
      />
    </div>
  )
}

export default Menu
