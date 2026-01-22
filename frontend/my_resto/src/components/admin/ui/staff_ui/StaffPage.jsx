import { useEffect, useState } from "react";
import StaffList from "./StaffList";
import StaffTableHeader from "./StaffTableHeader";
import StaffFormModal from "./StaffFormModal";
import PageHeader from "../menu_ui/PageHeader";
import { get_localstorage } from "../../../utils";
import { del, get, patch, post, put } from "../../../../api/api";
import { ENDPOINTS } from "../../../../constatns/api";



const StaffPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const restaurant_id = get_localstorage("restaurant_id");

  async function fetchStaffs() {
    const data = await get(ENDPOINTS.USER + `?restaurant_id=${restaurant_id}`);
    setStaffs(data);
    
  }

    // update api 
    async function addStaffApi(staff) {
        try {
            const restaurant_data = { restaurant: restaurant_id };
            const data = await post(ENDPOINTS.USER + '/', { ...staff, ...restaurant_data });
            setStaffs((prev) => [...prev, data]);
        } catch (error) {   
            console.error('Error adding staff:', error);
            setError('Failed to add staff item.');
        }
    }

    async function updateStaffApi(id, updates) {
        try {
          // if update consist of role fix it 
          if (updates.role) {
            if (updates.role === 'Chef') {
              updates.groups = [2]
          }
          else if (updates.role === 'Admin') {
              updates.groups = [1]
          }
          delete updates.role; // remove role from updates to avoid confusion
        }

          setLoading(true);
            const data = await patch(ENDPOINTS.USER + '/' + id + '/', { ...updates });
            setStaffs((prev) =>
                prev.map((s) => (s.id === id ? { ...s, ...data } : s))
            );
            setLoading(false);
        } catch (error) {
            console.error('Error updating staff:', error);
            setError('Failed to update staff item.');
        }   
    }

    async function deleteStaffApi(id) {
        try {
            await del(ENDPOINTS.USER + '/' + id + '/');
            setStaffs((prev) => prev.filter((s) => s.id !== id));
        } catch (error) {
            console.error('Error deleting staff:', error);
            setError('Failed to delete staff item.');
        }
    }

  useEffect(() => {
    try {
      setLoading(true);
      fetchStaffs();
    } catch (err) {
      setError(err.message || "Failed to fetch staffs");
    } finally {
      setLoading(false);
    }
  }, []);

  // CREATE
  const addStaff = (staff) => {
    setStaffs((prev) => [
      ...prev,
      {
        ...staff,
        id: Date.now(),
        date_joined: new Date().toISOString().slice(0, 10),
        is_active: true,
      },
    ]);
    addStaffApi(staff);
  };

  // UPDATE
  const updateStaff = (id, updates) => {
    setStaffs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    updateStaffApi(id, updates);
  };

  // SOFT DELETE (deactivate)
  const deactivateStaff = (id) => {
    setStaffs((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, is_active: false } : s
      )
    );
    deleteStaffApi(id);
  };

  return (
    <>
      <PageHeader
        title="Staff"
        subtitle={`${staffs.length} members`}
        action={
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md"
          >
            + Add Staff
          </button>
        }
      />

      <StaffTableHeader />

      <StaffList
        staffs={staffs}
        onUpdate={updateStaff}
        onDeactivate={deactivateStaff}
      />

      {showModal && (
        <StaffFormModal
          onClose={() => setShowModal(false)}
          onSave={addStaff}
        />
      )}
    </>
  );
};

export default StaffPage;
