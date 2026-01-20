import { useState } from "react";

const CreateTableModal = ({ onClose, onCreate }) => {
  const [number, setNumber] = useState("");

  const handleSubmit = () => {
    if (!number) return;

    onCreate({
      id: Date.now(),
      number: Number(number),
      active: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-80 rounded-xl p-5 shadow-lg">

        <h3 className="text-sm font-semibold mb-4">Create Table</h3>

        <input
          type="number"
          placeholder="Table Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTableModal;
