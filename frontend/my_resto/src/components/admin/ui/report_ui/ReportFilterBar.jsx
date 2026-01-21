// reports/ReportFilterBar.jsx
const ranges = ["today", "yesterday", "last_7_days", "last_30_days"];

const ReportFilterBar = ({ range, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {ranges.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
            ${
              range === r
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
        >
          {r.replaceAll("_", " ")}
        </button>
      ))}
    </div>
  );
};

export default ReportFilterBar;
