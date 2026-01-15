import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { API_BASE_URL, ENDPOINTS } from "../../constatns/api";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const restaurantId = 1; // for MVP (later from auth/context)

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/${ENDPOINTS.KITCHEN_GET_ORDERS}/${restaurantId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching chef orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // MVP polling (every 10s)
    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          🍳 Kitchen Orders
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Live orders waiting to be prepared
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 mt-10">
          Loading orders...
        </div>
      )}

      {/* Empty State */}
      {!loading && orders.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No active orders 👌
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4 flex flex-col items-center">
        {orders.map((order) => (
          <OrderCard
            key={order.order_id}
            orderId={order.order_id}
            tableId={order.table_id}
            status={order.status}
            timeAgo={order.time}
            items={order.items.map((i) => ({
              name: i.item_name,
              quantity: i.quantity,
            }))}
            onStart={() => console.log("Start order", order.order_id)}
            onReady={() => console.log("Ready order", order.order_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
