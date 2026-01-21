import TableActiveToggle from "./TableActiveToggle";
import TableQRButton from "./TableQRButton";


const TableCard = ({ table }) => {
  if (!table) return null;

  return (
    <div className="flex flex-col items-center gap-2">

      {/* Rounded Table Card */}
      <div
        className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center
        shadow-sm border transition
        ${
          table.active
            ? "bg-white border-slate-200"
            : "bg-slate-100 border-slate-300 opacity-60"
        }`}
      >
        <span className="text-[10px] text-slate-400">TABLE</span>
        <span className="text-2xl font-semibold text-slate-800">
          {table.table_number}
        </span>
      </div>

      <TableQRButton tableId={table.id} disabled={!table.is_active} />
      <TableActiveToggle table={table} />
    </div>
  );
};

export default TableCard;
