import MenuAvailability from "./MenuAvailability";
import MenuEditInline from "./MenuEditInline";

const MenuCard = ({ menu, onUpdate, onDelete }) => {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <MenuEditInline
        value={menu.name}
        onSave={(v) => onUpdate(menu.id, { name: v })}
      />

      <div className="text-sm text-slate-500 mt-1">
        ₹
        <MenuEditInline
          type="number"
          value={menu.price}
          onSave={(v) => onUpdate(menu.id, { price: Number(v) })}
        />
        {menu.category && ` • ${menu.category}`}
      </div>

      <div className="flex justify-between items-center mt-3">
        <MenuAvailability
          value={menu.is_available}
          onChange={(v) => onUpdate(menu.id, { is_available: v })}
        />

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

export default MenuCard;
