import { useState } from "react";
import StaffList from "./StaffList";
import StaffTableHeader from "./StaffTableHeader";
import StaffFormModal from "./StaffFormModal";
import PageHeader from "../menu_ui/PageHeader";

const initialStaff = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "9876543210",
    role: "Chef",
    is_active: true,
    date_joined: "2024-01-12",
  },
  {
    id: 2,
    name: "Amit Verma",
    phone: "9123456789",
    role: "Waiter",
    is_active: false,
    date_joined: "2023-11-02",
    },
];


const StaffPage = () => {
  const [staffs, setStaffs] = useState(initialStaff);
  const [showModal, setShowModal] = useState(false);

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
  };

  // UPDATE
  const updateStaff = (id, updates) => {
    setStaffs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  // SOFT DELETE (deactivate)
  const deactivateStaff = (id) => {
    setStaffs((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, is_active: false } : s
      )
    );
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
