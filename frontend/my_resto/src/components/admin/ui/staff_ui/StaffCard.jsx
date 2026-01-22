import StaffActiveToggle from "./StaffActiveToggle";
import StaffEditInline from "./StaffEditInline";
import StaffRoleSelect from "./StaffRoleSelect";

const StaffCard = ({ staff, onUpdate, onDeactivate }) => {
    return (
        <div className="bg-white border rounded-xl p-4 shadow-sm">
            <StaffEditInline
                value={staff.first_name + " " + staff.last_name}
                onSave={(v) => onUpdate(staff.id, { name: v })}
            />

            <p className="text-sm text-slate-600 mt-1">
                📞 {staff.phone}
            </p>


            <div className="mt-1">
                <StaffRoleSelect
                    value={staff.role}
                    onChange={(v) => onUpdate(staff.id, { role: v })}
                />
            </div>


            <p className="text-xs text-slate-500 mt-2">
                Joined: {new Date(staff.date_joined).toLocaleDateString()}
            </p>

            <div className="flex justify-between items-center mt-3">
                <StaffActiveToggle
                    value={staff.is_active}
                    onChange={(v) => onUpdate(staff.id, { is_active: v })}
                />

                {staff.is_active && (
                    <button
                        onClick={() => onDeactivate(staff.id)}
                        className="text-xs text-red-500"
                    >
                        Deactivate
                    </button>
                )}
            </div>
        </div>
    );
};

export default StaffCard;
