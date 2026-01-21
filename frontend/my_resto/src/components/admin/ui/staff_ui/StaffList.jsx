
import StaffCard from "./StaffCard";
import StaffRow from "./StaffRow";

const StaffList = ({ staffs, onUpdate, onDeactivate }) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block border border-slate-200 rounded-b-lg overflow-hidden">
        {staffs.map((staff) => (
          <StaffRow
            key={staff.id}
            staff={staff}
            onUpdate={onUpdate}
            onDeactivate={onDeactivate}
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {staffs.map((staff) => (
          <StaffCard
            key={staff.id}
            staff={staff}
            onUpdate={onUpdate}
            onDeactivate={onDeactivate}
          />
        ))}
      </div>
    </>
  );
};

export default StaffList;
