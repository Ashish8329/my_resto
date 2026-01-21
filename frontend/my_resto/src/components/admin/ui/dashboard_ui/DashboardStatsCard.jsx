// dashboard/DashboardStatsCard.jsx
const DashboardStatsCard = ({ title, value, color }) => {
  return (
    <div className={`rounded-xl p-6 shadow-md flex flex-col items-start ${color}`}>
      <span className="text-sm font-medium">{title}</span>
      <span className="text-2xl md:text-3xl font-bold mt-2">{value}</span>
    </div>
  );
};

export default DashboardStatsCard;
