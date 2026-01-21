import StaffEditInline from "./StaffEditInline";
import StaffRoleSelect from "./StaffRoleSelect";
import StaffActiveToggle from "./StaffActiveToggle";

const StaffRow = ({ staff, onUpdate, onDeactivate }) => {
  return (
    <div className="grid grid-cols-7 items-center px-4 py-3 border-b text-sm bg-white">
  <StaffEditInline
    value={staff.name}
    onSave={(v) => onUpdate(staff.id, { name: v })}
  />

  <StaffEditInline
    value={staff.phone}
    onSave={(v) => onUpdate(staff.id, { phone: v })}
  />

  <StaffRoleSelect
    value={staff.role}
    onChange={(v) => onUpdate(staff.id, { role: v })}
  />

  <span className="text-slate-500">
    {new Date(staff.date_joined).toLocaleDateString()}
  </span>

  <StaffActiveToggle
    value={staff.is_active}
    onChange={(v) => onUpdate(staff.id, { is_active: v })}
  />

  <div className="col-span-2 text-right">
    {staff.is_active && (
      <button
        onClick={() => onDeactivate(staff.id)}
        className="text-xs text-red-500 hover:underline"
      >
        Deactivate
      </button>
    )}
  </div>
</div>

  );
};

export default StaffRow;
