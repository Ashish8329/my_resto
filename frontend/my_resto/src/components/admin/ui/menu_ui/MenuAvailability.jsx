const MenuAvailability = ({ value, onChange }) => {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`px-3 py-1 rounded-full text-xs
      ${value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
    >
      {value ? "Available" : "Unavailable"}
    </button>
  );
};

export default MenuAvailability;
