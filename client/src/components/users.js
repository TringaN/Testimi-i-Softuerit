import React, { useState, useEffect } from "react";
import axiosInstance from "../helpers/axiosInstance";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "user" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setError("❌ Nuk mund të ngarkohen user-at.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axiosInstance.put(`/users/${editId}`, form);
        setEditId(null);
      } else {
        await axiosInstance.post("/users", form);
      }
      setForm({ name: "", email: "", role: "user" });
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err.response?.data || err.message);
      setError("❌ Gabim gjatë ruajtjes së user-it.");
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, role: user.role });
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("A je i sigurt që do ta fshish user-in?")) return;
    try {
      await axiosInstance.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
      setError("❌ Gabim gjatë fshirjes së user-it.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">👤 Users</h2>

      {/* Error Alert */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Forma */}
      <form className="row g-2 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100">
            {editId ? "Update User" : "Add User"}
          </button>
        </div>
      </form>

      {/* Lista e user-ave */}
      <ul className="list-group">
        {users.map((u) => (
          <li
            key={u._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              <b>{u.name}</b> ({u.email}) - {u.role}
            </span>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(u)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(u._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
