const AddTableCard = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-28 h-28 rounded-2xl border-2 border-dashed
      flex items-center justify-center
      text-slate-400 hover:text-indigo-600 hover:border-indigo-400
      transition"
    >
      <span className="text-2xl">+</span>
    </button>
  );
};

export default AddTableCard;
