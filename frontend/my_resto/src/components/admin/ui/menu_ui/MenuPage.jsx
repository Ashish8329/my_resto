import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import MenuFormModal from "./MenuFormModal";
import PageHeader from "./PageHeader";
import MenuTableHeader from "./MenuTableHeader";
import { del, get, patch, post } from "../../../../api/api";
import { ENDPOINTS } from "../../../../constatns/api";
import { get_localstorage } from "../../../utils";


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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);    

    const restaurant_id = get_localstorage('restaurant_id');

    // update api 
    async function addMenuApi(menu) {
        try {
            const restaurant_data = { restaurant: restaurant_id };
            const data = await post(ENDPOINTS.MANAGE_MENU_ITEMS + '/', { ...menu, ...restaurant_data });
            setMenus((prev) => [...prev, data]);
        } catch (error) {   
            console.error('Error adding menu:', error);
            setError('Failed to add menu item.');
        }
    }

    async function updateMenuApi(id, updates) {
        try {
            const restaurant_data = { restaurant: restaurant_id };
            const data = await patch(ENDPOINTS.MANAGE_MENU_ITEMS + '/' + id + '/', { ...updates, ...restaurant_data });
            setMenus((prev) =>
                prev.map((m) => (m.id === id ? { ...m, ...data } : m))
            );
        } catch (error) {
            console.error('Error updating menu:', error);
            setError('Failed to update menu item.');
        }   
    }

    async function deleteMenuApi(id) {
        try {
            await del(ENDPOINTS.MANAGE_MENU_ITEMS + '/' + id + '/');
            setMenus((prev) => prev.filter((m) => m.id !== id));
        } catch (error) {
            console.error('Error deleting menu:', error);
            setError('Failed to delete menu item.');
        }
    }


    useEffect (() => {
        
        async function fetchMenus() {
            try {
                setLoading(true);
                const data = await get(ENDPOINTS.MANAGE_MENU_ITEMS + '?restaurant_id=' + restaurant_id);
                setMenus(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching menus:', error);
                setError('Failed to load menu items.');
                setLoading(false);
            }
        }
        fetchMenus();
    }, []
);

    const addMenu = (menu) => {
        addMenuApi(menu);
    };

    const updateMenu = (id, updates) => {
        // setMenus((prev) =>
        //     prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
        // );
        updateMenuApi(id, updates);
    };

    const deleteMenu = (id) => {
        if (!window.confirm("Delete this item?")) return;
        // setMenus((prev) => prev.filter((m) => m.id !== id));
        deleteMenuApi(id);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
