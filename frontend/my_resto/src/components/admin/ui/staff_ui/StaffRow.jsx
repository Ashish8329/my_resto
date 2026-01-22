import StaffEditInline from "./StaffEditInline";
import StaffRoleSelect from "./StaffRoleSelect";
import StaffStatusSelect from "./StaffStatusSelect";

const StaffRow = ({ staff, onUpdate, onDeactivate }) => {
  if(staff.groups.includes(1)) {
    staff.role = 'Admin';
  }
  else if(staff.groups.includes(2)) {
    staff.role = 'Chef';
  }
  return (
    <div
      className="
        grid grid-cols-7 gap-x-6
        items-center px-4 py-3
        border-b text-sm bg-white
        min-h-[56px]
      "
    >
      {/* Name */}
      <span className="text-slate-500 whitespace-nowrap">
        {staff.first_name} {staff.last_name}
      </span>

      <span className="text-slate-500 whitespace-nowrap">
        {staff.username}
      </span>

      {/* Password (masked) */}
      <StaffEditInline
        value="••••••••"
        placeholder="Set new password"
        onSave={(v) => onUpdate(staff.id, { password: v })}
      />

      {/* Phone */}
      <StaffEditInline
        value={staff.phone}
        onSave={(v) => onUpdate(staff.id, { phone: v })}
      />

      {/* Role */}
      <StaffRoleSelect
        value={staff.role}
        onChange={(v) => onUpdate(staff.id, { role: v })}
      />

      {/* Date Joined */}
      <span className="text-slate-500 whitespace-nowrap">
        {new Date(staff.date_joined).toLocaleDateString()}
      </span>

      {/* Actions */}
      <div>
        <StaffStatusSelect
          value={staff.is_active}
          onChange={(v) => onUpdate(staff.id, { is_active: v })}
        />

      </div>
    </div>
  );
};

export default StaffRow;
