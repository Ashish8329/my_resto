// reports/ReportSummaryCard.jsx
const ReportSummaryCard = ({ data, range }) => {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
      <h3 className="font-semibold mb-2">Summary</h3>

      <p className="text-sm text-slate-700 leading-relaxed">
        For <span className="font-medium">{range.replaceAll("_", " ")}</span>,
        you processed <span className="font-semibold">{data.totalOrders}</span>{" "}
        orders generating a total revenue of{" "}
        <span className="font-semibold">₹{data.revenue}</span>.
        The average order value was{" "}
        <span className="font-semibold">₹{data.avgOrderValue}</span>.
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded bg-slate-200">
          Pending: {data.status.pending}
        </span>
        <span className="px-2 py-1 rounded bg-yellow-200">
          Preparing: {data.status.preparing}
        </span>
        <span className="px-2 py-1 rounded bg-blue-200">
          Ready: {data.status.ready}
        </span>
        <span className="px-2 py-1 rounded bg-green-200">
          Served: {data.status.served}
        </span>
      </div>
    </div>
  );
};

export default ReportSummaryCard;
