import MenuCard from "./MenuCard";
import MenuRow from "./MenuRow";

const MenuList = ({ menus, onUpdate, onDelete }) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="border rounded-lg overflow-hidden">
          {menus.map((menu) => (
            <MenuRow
              key={menu.id}
              menu={menu}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default MenuList;
