import { useState } from "react";
import MenuList from "./MenuList";
import MenuFormModal from "./MenuFormModal";
import PageHeader from "./PageHeader";
import MenuTableHeader from "./MenuTableHeader";


const initialMenus = [
    {
        id: 1,
        name: "Paneer Tikka",
        price: 180,
        is_available: true,
        category: "Starter",
        image_url: null,
    },
    {
        id: 2,
        name: "Veg Biryani",
        price: 220,
        is_available: false,
        category: "Main Course",
        image_url: null,
    },
];

const MenuPage = () => {
    const [menus, setMenus] = useState(initialMenus);
    const [showModal, setShowModal] = useState(false);

    const addMenu = (menu) => {
        setMenus((prev) => [...prev, { ...menu, id: Date.now() }]);
    };

    const updateMenu = (id, updates) => {
        setMenus((prev) =>
            prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
        );
    };

    const deleteMenu = (id) => {
        if (!window.confirm("Delete this item?")) return;
        setMenus((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <>
            <PageHeader
                title="Menu"
                subtitle={`${menus.length} items • ${menus.filter(m => m.is_available).length
                    } available`}
                action={
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md"
                    >
                        + Add Item
                    </button>
                }
            />

            <MenuTableHeader />


            <MenuList
                menus={menus}
                onUpdate={updateMenu}
                onDelete={deleteMenu}
            />

            {showModal && (
                <MenuFormModal
                    onClose={() => setShowModal(false)}
                    onSave={addMenu}
                />
            )}
        </>
    );
};

export default MenuPage;
