// orders/OrdersPage.jsx
import { useState } from "react";
import OrdersList from "./OrdersList";
import OrderItemsModal from "./OrderItemsModal";


const OrdersPage = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1023",
      table_number: 5,
      status: "PREPARING",
      total_amount: 560,
      created_at: "12:40 PM",
      items: [
        { name: "Paneer Tikka", qty: 1, price: 180 },
        { name: "Veg Biryani", qty: 2, price: 190 },
      ],
    },
    {
      id: "ORD-1024",
      table_number: 2,
      status: "READY",
      total_amount: 320,
      created_at: "12:55 PM",
      items: [
        { name: "Masala Dosa", qty: 2, price: 160 },
      ],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Orders</h1>

      <OrdersList
        orders={orders}
        onViewItems={setSelectedOrder}
      />

      {selectedOrder && (
        <OrderItemsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
