import TableActiveToggle from "./TableActiveToggle";
import TableQRButton from "./TableQRButton";

const TableCard = ({ table, onDelete, onUpdate }) => {
  if (!table) return null;

  return (
    <div className="flex flex-col items-center gap-2">

      {/* Rounded Table Card */}
      <div
        className={`relative w-28 h-28 rounded-2xl
        flex flex-col items-center justify-center
        shadow-sm border transition
        ${
          table.is_active
            ? "bg-white border-slate-200"
            : "bg-slate-100 border-slate-300 opacity-60"
        }`}
      >
        {/* Delete button */}
        <button
          onClick={() => onDelete(table.id)}
          className="absolute top-1.5 right-1.5
          w-5 h-5 rounded-full
          flex items-center justify-center
          text-slate-400 hover:text-red-500 hover:bg-red-50
          transition text-xs"
          title="Delete table"
        >
          ✕
        </button>

        <span className="text-[10px] text-slate-400">TABLE</span>
        <span className="text-2xl font-semibold text-slate-800">
          {table.table_number}
        </span>
      </div>

      <TableQRButton qrUrl={table.QR_code}  tableId={table.id} disabled={!table.is_active} />
      <TableActiveToggle table={table} handleUpdate={onUpdate} />
    </div>
  );
};

export default TableCard;
