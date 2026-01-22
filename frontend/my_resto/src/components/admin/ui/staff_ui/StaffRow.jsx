import StaffEditInline from "./StaffEditInline";
import StaffRoleSelect from "./StaffRoleSelect";
import StaffStatusSelect from "./StaffStatusSelect";

const StaffRow = ({ staff, onUpdate, onDeactivate }) => {
  console.log("Rendering StaffRow for:", staff);
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
      <StaffEditInline
        value={`${staff.first_name} ${staff.last_name}`}
        onSave={(v) => onUpdate(staff.id, { name: v })}
      />

      {/* Username */}
      <StaffEditInline
        value={staff.username}
        onSave={(v) => onUpdate(staff.id, { username: v })}
      />

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
