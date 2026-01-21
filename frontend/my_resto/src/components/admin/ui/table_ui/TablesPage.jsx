import { useEffect, useState } from "react";
import TableCard from "./TableCard";
import AddTableCard from "./AddTableCard";
import CreateTableModal from "./CreateTableModal";
import { get } from "../../../../api/api";
import { ENDPOINTS } from "../../../../constatns/api";


const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addTable = (table) => {
    setTables((prev) => [...prev, table]);
  };

  useEffect (() => {
    // Fetch existing tables from the server
    const fetchTables = async () => {
      try {
        const data = await get(ENDPOINTS.TABLE_ENDPOINT + "?restaurant_id=2");
         
        setTables(data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    }
    fetchTables();
  }, []);


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
