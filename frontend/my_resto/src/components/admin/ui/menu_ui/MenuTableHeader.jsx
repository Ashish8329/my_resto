const MenuTableHeader = () => {
  return (
    <div
      className="hidden md:grid grid-cols-6 gap-2
      px-4 py-2 text-xs font-medium text-slate-500
      bg-slate-50 border border-slate-200 rounded-t-lg"
    >
      <span>Name</span>
      <span>Category</span>
      <span>Price</span>
      <span>Status</span>
      <span className="col-span-2 text-right">Actions</span>
    </div>
  );
};

export default MenuTableHeader;
