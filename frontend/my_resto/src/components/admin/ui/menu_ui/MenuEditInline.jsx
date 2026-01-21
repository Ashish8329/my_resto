import { useState } from "react";

const MenuEditInline = ({ value, onSave, type = "text" }) => {
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
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => e.key === "Enter" && save()}
        className="border px-1 rounded text-sm w-full"
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className="cursor-pointer hover:underline"
    >
      {value}
    </span>
  );
};

export default MenuEditInline;
