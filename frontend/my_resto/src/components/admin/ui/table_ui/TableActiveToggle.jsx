import { useState } from "react";

const TableActiveToggle = ({ table }) => {
  const [active, setActive] = useState(table.active);

  const toggleStatus = () => {
    setActive(!active);
    console.log("Table active:", !active);
    // API call later
  };

  return (
    <button
      onClick={toggleStatus}
      className={`text-xs px-3 py-1 rounded-full transition
      ${
        active
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {active ? "Active" : "Disabled"}
    </button>
  );
};

export default TableActiveToggle;
