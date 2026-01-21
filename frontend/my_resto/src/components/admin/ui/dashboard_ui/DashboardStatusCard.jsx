// dashboard/DashboardStatusCard.jsx
const DashboardStatusCard = ({ status, value, color }) => {
  return (
    <div className={`rounded-xl p-4 shadow-sm flex justify-between items-center ${color}`}>
      <span className="font-medium">{status}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
};

export default DashboardStatusCard;
