const StaffStatusSelect = ({ value, onChange }) => {
  return (
    <select
      value={value ? "active" : "inactive"}
      onChange={(e) => onChange(e.target.value === "active")}
      className="
        text-xs px-2 py-1 rounded-md border
        bg-white text-slate-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500
      "
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
};

export default StaffStatusSelect;
