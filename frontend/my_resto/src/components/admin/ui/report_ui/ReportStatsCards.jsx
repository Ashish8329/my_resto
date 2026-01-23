// reports/ReportStatsCards.jsx
const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border">
    <div className="text-xs text-slate-500">{label}</div>
    <div className="text-2xl font-semibold mt-2">{value}</div>
  </div>
);

const ReportStatsCards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard label="Total Revenue" value={`₹${data.total_revenue}`} />
      <StatCard label="Total Orders" value={data.total_orders} />
      <StatCard label="Avg Order Value" value={`₹${data.average_order_value}`} />
    </div>
  );
};

export default ReportStatsCards;
