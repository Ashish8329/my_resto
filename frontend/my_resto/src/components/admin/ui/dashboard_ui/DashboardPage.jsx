// dashboard/DashboardPage.jsx
import { useState } from "react";
import { RefreshCw } from "lucide-react"; // optional icon, or you can use any
import DashboardStatsCard from "./DashboardStatsCard";
import DashboardStatusCard from "./DashboardStatusCard";

const initialData = {
  totalOrders: 23,
  revenue: 5600,
  activeTables: 12,
  status: {
    pending: 3,
    preparing: 5,
    ready: 2,
  },
};

const DashboardPage = () => {
  const [data, setData] = useState(initialData);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // simulate API
    setTimeout(() => {
      setData({ ...data }); // currently same, later replace with API fetch
      setRefreshing(false);
    }, 1000);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition"
        >
          {refreshing ? "Refreshing..." : "Refresh"}
          {!refreshing && <RefreshCw size={16} />}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DashboardStatsCard
          title="Total Orders"
          value={data.totalOrders}
          color="bg-indigo-100 text-indigo-700"
        />
        <DashboardStatsCard
          title="Revenue"
          value={`₹${data.revenue}`}
          color="bg-green-100 text-green-700"
        />
        <DashboardStatsCard
          title="Active Tables"
          value={data.activeTables}
          color="bg-yellow-100 text-yellow-700"
        />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardStatusCard status="Pending" value={data.status.pending} color="bg-slate-100 text-slate-700" />
        <DashboardStatusCard status="Preparing" value={data.status.preparing} color="bg-yellow-100 text-yellow-700" />
        <DashboardStatusCard status="Ready" value={data.status.ready} color="bg-blue-100 text-blue-700" />
      </div>
    </div>
  );
};

export default DashboardPage;
