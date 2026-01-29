const StaffStatusSelect = ({ value, onChange }) => {
  const isActive = value === true;

  return (
    <div className="flex items-center gap-2">
      {/* status dot */}
      <span
        className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500" : "bg-gray-400"
          }`}
      />

      <select
        value={isActive ? "active" : "inactive"}
        onChange={(e) => onChange(e.target.value === "active")}
        className={`
          text-xs px-2 py-1 rounded-md border
          bg-white
          ${isActive ? "border-green-500 text-green-700" : "border-gray-300 text-slate-700"}
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        `}

      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default StaffStatusSelect;
