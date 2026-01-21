const StaffTableHeader = () => {
    return (
        <div className="hidden md:grid grid-cols-7 px-4 py-2
  text-xs font-medium text-slate-500
  bg-slate-50 border border-slate-200 rounded-t-lg"
        >
            <span>Name</span>
            <span>Phone</span>
            <span>Role</span>
            <span>Joined</span>
            <span>Status</span>
            <span className="col-span-2 text-right">Actions</span>
        </div>

    );
};

export default StaffTableHeader;
