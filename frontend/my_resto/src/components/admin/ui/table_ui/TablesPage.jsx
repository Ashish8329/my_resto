import { useState } from "react";
import TableCard from "./TableCard";
import AddTableCard from "./AddTableCard";
import CreateTableModal from "./CreateTableModal";

const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addTable = (table) => {
    setTables((prev) => [...prev, table]);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

        <AddTableCard onClick={() => setShowModal(true)} />

        {tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>

      {showModal && (
        <CreateTableModal
          onClose={() => setShowModal(false)}
          onCreate={addTable}
        />
      )}
    </>
  );
};

export default TablesPage;
