import OrderCard from "./OrderCard";
import OrderRow from "./OrderRow";
import OrdersTableHeader from "./OrdersTableHeader";

const OrdersList = ({ orders, onViewItems }) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <OrdersTableHeader />
        <div className="divide-y">
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onViewItems={onViewItems}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewItems={onViewItems}
          />
        ))}
      </div>
    </>
  );
};

export default OrdersList;
