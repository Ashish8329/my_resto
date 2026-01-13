import React, { useEffect, useState } from 'react'
import OrderStatusCard from './OrderStatusCard'
import { get } from '../../api/api'

const MyOrders = () => {
  const restaurant_id = 1
  const table_id = 1
  const [orderDetails, setOrderDetails] = useState([]) // array
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
          onCancel={() => {
            if (confirm("Are you sure you want to cancel this order?")) {
              console.log("Cancel order API call")
            }
          }}
          
        />
      ))}
    </div>
  )
}

export default MyOrders
