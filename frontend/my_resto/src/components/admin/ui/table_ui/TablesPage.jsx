import { useEffect, useState } from "react";
import TableCard from "./TableCard";
import AddTableCard from "./AddTableCard";
import CreateTableModal from "./CreateTableModal";
import { del, get, post } from "../../../../api/api";
import { ENDPOINTS, LocalhostCred } from "../../../../constatns/api";
import { get_localstorage } from "../../../utils";


const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const restaurant_id = get_localstorage('restaurant_id');

  const handleDeleteTable = (tableId) => {
    setTables((prevTables) =>
      prevTables.filter((table) => table.id !== tableId)
    );

    async function deleteTable() {
      try {
        res = await del(`${ENDPOINTS.TABLE_ENDPOINT}/${tableId}/`);
      } catch (error) {
        console.error("Error deleting table:", error);
      }
    }
    deleteTable();
  }


  const addTable = (table) => {
    setTables((prev) => [...prev, table]);

    async function postTable() {
      try {
        setLoading(true);
        await post(`${ENDPOINTS.TABLE_ENDPOINT}/`, {
          table_number: table.table_number,
          restaurant: restaurant_id, 
        });

        setLoading(false);
      } catch (error) {
        console.error("Error creating table:", error);
        setLoading(false);
      }
    }

    postTable();
  };

  useEffect (() => {
    // Fetch existing tables from the server
    const fetchTables = async () => {
      try {
        const data = await get(ENDPOINTS.TABLE_ENDPOINT + "?restaurant_id=" + restaurant_id);
         
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
          <TableCard key={table.id} 
          table={table}
          onDelete={handleDeleteTable} 
          />
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
