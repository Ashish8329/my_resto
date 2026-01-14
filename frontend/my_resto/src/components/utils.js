export function get_localstorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Error reading localStorage", error);
        return null;
    }
}

export function set_localstorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error writing localStorage", error);
    }
}

export function remove_localstorage(key) {
    localStorage.removeItem(key);
}
