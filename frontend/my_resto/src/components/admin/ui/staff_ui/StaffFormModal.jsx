import { useState } from "react";

const StaffFormModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Chef");

  const isValid =
    name.trim().length > 0 &&
    username.trim().length >= 4 &&
    password.length >= 6;

  const submit = () => {
    if (!isValid) return;

    onSave({
      name: name.trim(),
      username: username.trim(),
      password,
      phone: phone.trim(),
      role,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg"
      >
        <h3 className="mb-4 text-base font-semibold text-slate-800">
          Add Staff
        </h3>

        {/* Name */}
        <Field label="Full name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </Field>

        {/* Username */}
        <Field label="Username (min 4 chars)">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            className="input"
          />
        </Field>

        {/* Password */}
        <Field label="Password (min 6 chars)">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </Field>

        {/* Phone */}
        <Field label="Phone number">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
          />
        </Field>

        {/* Role */}
        <Field label="Role">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input"
          >
            <option value="Admin">Admin</option>
            <option value="Chef">Chef</option>
            <option value="Waiter">Waiter</option>
          </select>
        </Field>

        {/* Actions */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={!isValid}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white
              hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

/* Small helper for clean layout */
const Field = ({ label, children }) => (
  <div className="mb-3">
    <label className="mb-1 block text-xs text-slate-500">{label}</label>
    {children}
  </div>
);

export default StaffFormModal;
