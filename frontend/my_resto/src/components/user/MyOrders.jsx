import React, { useEffect, useState } from 'react'
import OrderStatusCard from './OrderStatusCard'
import { get, put } from '../../api/api'
import { get_localstorage } from '../utils'
import { LocalhostCred } from '../../constatns/api'

const MyOrders = () => {
  const context = get_localstorage(LocalhostCred)
  const restaurant_id = context.restaurant_id
  const table_id = context.table_id

  const [orderDetails, setOrderDetails] = useState([]) // array
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [canceling, setCanceling] = useState(false)

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const data = await get(`/order/?restaurant_id=${restaurant_id}&is_active=1&table_id=${table_id}`)
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
  if (orderDetails.length === 0) return  <p>No order found in this table</p>
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
