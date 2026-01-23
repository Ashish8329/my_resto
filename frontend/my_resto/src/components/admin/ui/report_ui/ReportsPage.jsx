// reports/ReportsPage.jsx
import { useEffect, useState } from "react";
import ReportFilterBar from "./ReportFilterBar";
import ReportStatsCards from "./ReportStatsCards";
import ReportSummaryCard from "./ReportSummaryCard";
import ReportChartSection from "./ReportChartSection";
import { get } from "../../../../api/api";
import { get_localstorage } from "../../../utils";
import { ENDPOINTS } from "../../../../constatns/api";


const ReportsPage = () => {
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
  const [range, setRange] = useState("today");
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const restaurantId = get_localstorage("restaurant_id");

  
    async function fetchAnalyticsData(range = "today") {
      setLoading(true);
      try {
        const data = await get(ENDPOINTS.ANALYTICS + `?restaurant_id=${restaurantId}` + `&timeframe=${range}`);
        console.log("Fetched Analytics Data:", data); // Debugging line
        setData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch analytics data.");
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchAnalyticsData(range);
    }, [range]);

    if(loading) {
      return <div className="p-4 md:p-6">Loading reports...</div>;
    }

    if(error) {
      return <div className="p-4 md:p-6 text-red-500">{error}</div>;
    }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Reports</h1>

      <ReportFilterBar range={range} onChange={setRange} />

      <ReportStatsCards data={data} />
      <ReportSummaryCard data={data} range={range} />

      <ReportChartSection />
    </div>
  );
};

export default ReportsPage;
