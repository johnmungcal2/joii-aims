import { useState } from "react";
import "./Inventory.css";

function Inventory() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    dateAdded: "",
    qty: "",
    description: "",
    brand: "",
    tagging: "",
    status: "",
    remarks: "",
    note: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (idx) => {
    setForm(rows[idx]);
    setShowForm(true);
    setEditIndex(idx);
  };

  const emptyForm = {
    dateAdded: "",
    qty: "",
    description: "",
    brand: "",
    tagging: "",
    status: "",
    remarks: "",
    note: "",
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedRows = rows.slice();
      updatedRows[editIndex] = form;
      setRows(updatedRows);
      setEditIndex(null);
    } else {
      setRows([...rows, form]);
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleDelete = (idx) => {
    const updatedRows = rows.filter((_, i) => i !== idx);
    setRows(updatedRows);
    // If deleting the row being edited, close the form
    if (editIndex === idx) {
      setShowForm(false);
      setEditIndex(null);
      setForm(emptyForm);
    }
  };

  return (
    <div className="inventory-container">
      <h1>Inventory List</h1>
      <div className="inventory-actions">
        <button
          className="show-form-btn"
          onClick={() => {
            setShowForm(true);
            setEditIndex(null);
            setForm(emptyForm);
          }}
        >
          Add
        </button>
      </div>
      {showForm && (
        <div className="inventory-modal">
          <div className="inventory-modal-content">
            <form className="inventory-form" onSubmit={handleAdd}>
              <input
                name="dateAdded"
                type="date"
                value={form.dateAdded}
                onChange={handleChange}
                placeholder="Date Added"
                required
              />
              <input
                name="qty"
                type="number"
                value={form.qty}
                onChange={handleChange}
                placeholder="Qty"
                min="0"
                required
              />
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand"
                required
              />
              <input
                name="tagging"
                value={form.tagging}
                onChange={handleChange}
                placeholder="Tagging"
                required
              />
              <input
                name="status"
                value={form.status}
                onChange={handleChange}
                placeholder="Status"
                required
              />
              <input
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                placeholder="Remarks"
              />
              <input
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Note"
              />
              <div style={{ display: "flex", gap: "8px" }}>
                <button type="submit">
                  {editIndex !== null ? "Save" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditIndex(null);
                  }}
                >
                  Cancel
                </button>
                {editIndex !== null && (
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => {
                      handleDelete(editIndex);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>DATE ADDED</th>
            <th>QTY</th>
            <th>DESCRIPTION</th>
            <th>BRAND</th>
            <th>TAGGING</th>
            <th>STATUS</th>
            <th>REMARKS</th>
            <th>NOTE</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => handleEdit(idx)}
              className={editIndex === idx ? "selected-row" : ""}
            >
              <td>{row.dateAdded}</td>
              <td>{row.qty}</td>
              <td>{row.description}</td>
              <td>{row.brand}</td>
              <td>{row.tagging}</td>
              <td>{row.status}</td>
              <td>{row.remarks}</td>
              <td>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
