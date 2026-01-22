import { useEffect, useState } from "react";
import StaffList from "./StaffList";
import StaffTableHeader from "./StaffTableHeader";
import StaffFormModal from "./StaffFormModal";
import PageHeader from "../menu_ui/PageHeader";
import { get_localstorage } from "../../../utils";
import { del, get, post, put } from "../../../../api/api";
import { ENDPOINTS } from "../../../../constatns/api";

const initialStaff = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "9876543210",
    role: "Chef",
    is_active: true,
    date_joined: "2024-01-12",
    username: "rahulsharma",
    password: "securepassword",
  },
  {
    id: 2,
    name: "Amit Verma",
    phone: "9123456789",
    role: "Waiter",
    is_active: false,
    date_joined: "2023-11-02",
    username: "rahulsharma",
    password: "securepassword",
  },
];


const StaffPage = () => {
  const [staffs, setStaffs] = useState(initialStaff);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const restaurant_id = get_localstorage("restaurant_id");

  async function fetchStaffs() {
    const data = await get(ENDPOINTS.USER + `?restaurant_id=${restaurant_id}`);
    console.log('--- fetched staffs ---', data);
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
            const restaurant_data = { restaurant: restaurant_id };
            const data = await put(ENDPOINTS.USER + '/' + id + '/', { ...updates, ...restaurant_data });
            setStaffs((prev) =>
                prev.map((s) => (s.id === id ? { ...s, ...data } : s))
            );
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
