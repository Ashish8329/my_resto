const StaffActiveToggle = ({ value, onChange }) => {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`px-3 py-1 rounded-full text-xs font-medium
      ${
        value
          ? "bg-green-100 text-green-700"
          : "bg-slate-200 text-slate-600"
      }`}
    >
      {value ? "Active" : "Inactive"}
    </button>
  );
};

export default StaffActiveToggle;
