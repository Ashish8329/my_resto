import { useState } from "react";

const StaffFormModal = ({ onClose, onSave }) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("Chef");
    const [phone, setPhone] = useState("");


    const submit = () => {
        if (!name) return;
        onSave({ name, phone,role });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-80 rounded-xl p-5">
                <h3 className="font-semibold mb-4">Add Staff</h3>

                <input
                    placeholder="Staff name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border w-full mb-3 px-3 py-2 rounded"
                />

                <input
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border w-full mb-3 px-3 py-2 rounded"
                />


                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border w-full mb-4 px-3 py-2 rounded"
                >
                    <option>Admin</option>
                    <option>Chef</option>
                    <option>Waiter</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="text-sm">
                        Cancel
                    </button>
                    <button
                        onClick={submit}
                        className="bg-indigo-600 text-white px-4 py-2 rounded text-sm"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaffFormModal;
