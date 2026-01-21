// reports/ReportsPage.jsx
import { useState } from "react";
import ReportFilterBar from "./ReportFilterBar";
import ReportStatsCards from "./ReportStatsCards";
import ReportSummaryCard from "./ReportSummaryCard";
import ReportChartSection from "./ReportChartSection";


const ReportsPage = () => {
  const [range, setRange] = useState("today");

  const reportData = {
    revenue: 18200,
    totalOrders: 74,
    avgOrderValue: 246,
    status: {
      pending: 6,
      preparing: 9,
      ready: 12,
      served: 47,
    },
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Reports</h1>

      <ReportFilterBar range={range} onChange={setRange} />

      <ReportStatsCards data={reportData} />

      <ReportSummaryCard data={reportData} range={range} />

      <ReportChartSection />
    </div>
  );
};

export default ReportsPage;
