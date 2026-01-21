import { useState } from "react";

const MenuFormModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const submit = () => {
    if (!name || !price) return;
    onSave({
      name,
      price: Number(price),
      is_available: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-80 rounded-xl p-5">
        <h3 className="font-semibold mb-4">Add Menu Item</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full mb-3 px-3 py-2 rounded"
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border w-full mb-4 px-3 py-2 rounded"
        />

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

export default MenuFormModal;
