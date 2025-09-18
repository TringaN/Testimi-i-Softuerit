import React, { useState, useEffect } from "react";
import axiosInstance from "../helpers/axiosInstance"; // axios me token automatikisht

function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", year: "", price: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  // lexojmë rolin nga localStorage
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err.response?.data || err.message);
      setError("❌ Nuk mund të ngarkohen librat.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update
        await axiosInstance.put(`/books/${editId}`, form);
        setEditId(null);
      } else {
        // Create
        await axiosInstance.post("/books", form);
      }
      setForm({ title: "", author: "", year: "", price: "" });
      fetchBooks();
    } catch (err) {
      console.error("Error saving book:", err.response?.data || err.message);
      setError("❌ Gabim gjatë ruajtjes së librit.");
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      year: book.year,
      price: book.price,
    });
    setEditId(book._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("A je i sigurt që do ta fshish librin?")) return;
    try {
      await axiosInstance.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err.response?.data || err.message);
      setError("❌ Gabim gjatë fshirjes së librit.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📚 Books</h2>

      {/* Error Alert */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Forma – vetëm për admin */}
      {role === "admin" && (
        <form className="row g-2 mb-4" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100">
              {editId ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      )}

      {/* Lista e librave */}
      <ul className="list-group">
        {books.map((b) => (
          <li
            key={b._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              <b>{b.title}</b> - {b.author} ({b.year}) ${b.price}
            </span>
            {/* Butonat Edit/Delete – vetëm për admin */}
            {role === "admin" && (
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(b)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(b._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
