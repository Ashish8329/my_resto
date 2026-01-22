const roles = ["Admin", "Chef"];

const roleStyles = {
  Admin: "bg-purple-100 text-purple-700",
  Chef: "bg-green-100 text-green-700",
};

const StaffRoleSelect = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`text-xs px-2 py-1 rounded-full border outline-none
      ${roleStyles[value] || "bg-slate-100 text-slate-600"}`}
    >
      {roles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
};

export default StaffRoleSelect;
