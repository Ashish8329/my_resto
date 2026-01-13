import React from 'react'
import OrderStatusCard from './OrderStatusCard'

const MyOrders = () => {
  return (
    <div>
      <OrderStatusCard
        orderId="1234"
        status="preparing"
        totalItems={3}
        totalPrice={547}
        orderedAt="12:45 PM"
        onCancel={() => {
          if (confirm("Are you sure you want to cancel this order?")) {
            console.log("Cancel order API call")
          }
        }}
      />


    </div>
  )
}

export default MyOrders
