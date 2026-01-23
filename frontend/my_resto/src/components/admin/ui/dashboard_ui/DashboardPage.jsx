// dashboard/DashboardPage.jsx
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react"; // optional icon, or you can use any
import DashboardStatsCard from "./DashboardStatsCard";
import DashboardStatusCard from "./DashboardStatusCard";
import { get } from "../../../../api/api";
import { ENDPOINTS } from "../../../../constatns/api";
import { get_localstorage } from "../../../utils";

const initialData = {
  total_orders: 0,
  total_revenue: 0,
  activeTables: 0,
  today_status_summary: {
    PENDING: 0,
    PREPARING: 0,
    READY: 0,
  },
};

const DashboardPage = () => {
  const [data, setData] = useState(initialData);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const restaurantId = get_localstorage("restaurant_id");

  async function fetchAnalyticsData() {
    setLoading(true);
    try {
      const data = await get(ENDPOINTS.ANALYTICS + `?restaurant_id=${restaurantId}`);
      console.log("Fetched Analytics Data:", data); // Debugging line
      setData(data);
    } catch (err) {
      setError("Failed to fetch analytics data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnalyticsData();
  }, []);


  const handleRefresh = () => {
    setRefreshing(true);
    // simulate API
    setTimeout(() => {
      fetchAnalyticsData();
      setRefreshing(false);
    }, 1000);
  };

  if (loading) {
    return <div className="p-4 md:p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-4 md:p-6 text-red-500">{error}</div>;
  }
  console.log("Rendering Dashboard with data:", data); // Debugging line
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
          value={data.total_orders}
          color="bg-indigo-100 text-indigo-700"
        />
        <DashboardStatsCard
          title="Revenue"
          value={`₹${data.total_revenue}`}
          color="bg-green-100 text-green-700"
        />
        <DashboardStatsCard
          title="Avg Order Value"
          value={`₹${data.average_order_value}`}
          color="bg-yellow-100 text-yellow-700"
        />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <DashboardStatusCard status="Pending" value={data? data.today_status_summary.PENDING : 0} color="bg-slate-100 text-slate-700" />
        <DashboardStatusCard status="Preparing" value={data? data.today_status_summary.IN_KITCHEN : 0} color="bg-yellow-100 text-yellow-700" />
        <DashboardStatusCard status="Ready" value={data? data.today_status_summary.READY : 0} color="bg-blue-100 text-blue-700" />
      </div>
    </div>
  );
};

export default DashboardPage;
