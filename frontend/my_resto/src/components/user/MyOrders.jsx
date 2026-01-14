import React, { useEffect, useState } from 'react'
import OrderStatusCard from './OrderStatusCard'
import { get, put } from '../../api/api'

const MyOrders = () => {
  const restaurant_id = 1
  const table_id = 1
  const [orderDetails, setOrderDetails] = useState([]) // array
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [canceling, setCanceling] = useState(false)

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const data = await get(`/order/?restaurant_id=${restaurant_id}`)
        setOrderDetails(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [])

  async function handleCancel(orderId) {
    const confirmed = window.confirm("Are you sure you want to cancel this order?")
    if (!confirmed) return

    try {
      setCanceling(true)
      const body = { 'status': 'CANCELLED' }
      await put(`/order/${orderId}/`, body) // your backend endpoint
      // Remove canceled order from state
      setOrderDetails(prev => prev.filter(order => order.id !== orderId))
      console.log(`Order ${orderId} canceled`)
    } catch (err) {
      setError(err.message)
    } finally {
      setCanceling(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className='pb-30'>
      {orderDetails.map(order => (
        <OrderStatusCard
          key={order.id}
          orderId={order.id}
          status={order.status}
          totalItems={order.items?.length || 0}
          totalPrice={order.total_amount}
          orderedAt="12:45 PM"
          onCancel={() => { handleCancel(order.id) }
          }
        />
      ))}
    </div>
  )
}

export default MyOrders
