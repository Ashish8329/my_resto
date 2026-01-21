import MenuAvailability from "./MenuAvailability";
import MenuEditInline from "./MenuEditInline";

const MenuRow = ({ menu, onUpdate, onDelete }) => {
  return (
    <div className="grid grid-cols-6 items-center px-4 py-3 border-b text-sm">
      <MenuEditInline
        value={menu.name}
        onSave={(v) => onUpdate(menu.id, { name: v })}
      />

      <span className="text-slate-500">{menu.category || "-"}</span>

      <MenuEditInline
        type="number"
        value={menu.price}
        onSave={(v) => onUpdate(menu.id, { price: Number(v) })}
      />

      <MenuAvailability
        value={menu.is_available}
        onChange={(v) => onUpdate(menu.id, { is_available: v })}
      />

      <div className="col-span-2 flex justify-end gap-3">
        <button
          onClick={() => onDelete(menu.id)}
          className="text-red-500 text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MenuRow;
