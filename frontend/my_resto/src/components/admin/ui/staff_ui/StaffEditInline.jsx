import { useState } from "react";

const StaffEditInline = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  const save = () => {
    setEditing(false);
    if (val !== value) onSave(val);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => e.key === "Enter" && save()}
        className="border px-2 py-1 rounded text-sm w-full"
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className="cursor-pointer font-medium hover:underline"
    >
      {value}
    </span>
  );
};

export default StaffEditInline;
