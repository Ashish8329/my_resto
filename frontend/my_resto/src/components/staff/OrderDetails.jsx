import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { API_BASE_URL, ENDPOINTS } from "../../constatns/api";
import { get, put } from "../../api/api";

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const restaurantId = 1; // for MVP (later from auth/context)

    const fetchOrders = async () => {
        try {
            const res = await get(
                `/${ENDPOINTS.KITCHEN_GET_ORDERS}/${restaurantId}`
            );

            setOrders(res);
        } catch (error) {
            setError(true)
            console.error("Error fetching chef orders:", error);
        } finally {
            setLoading(false);
        }
    };

    async function handleUpdate(order_status, orderId) {

        try {
            setLoading(true)
            const body = { 'status': order_status }
            await put(`/order/${orderId}/`, body) // your backend endpoint

        } catch (err) {
            setError("something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders();

        // MVP polling (every 10s)
        const interval = setInterval(fetchOrders, 10000);

        return () => clearInterval(interval);
    }, []);

    if (error) return <p>{error}</p>


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
                        onStart={() => handleUpdate("IN_KITCHEN", order.order_id)}
                        onReady={() => handleUpdate("READY", order.order_id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default OrderDetails;
