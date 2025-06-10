// This file was renamed from Settings.js to Assignments.js
import React, { useContext } from "react";
import { InventoryContext } from "./App";

function Assignments() {
  const { inventoryRows, setInventoryRows } = useContext(InventoryContext);
  // Filter only assigned items (with assignedTo filled)
  const assignedRows = inventoryRows.filter(
    (row) => row.assignedTo && row.assignedTo.trim() !== ""
  );
  const [editIndex, setEditIndex] = React.useState(null);
  const [form, setForm] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);

  const handleEdit = (idx) => {
    setForm({ ...assignedRows[idx] });
    setEditIndex(idx);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Find the index in inventoryRows that matches the assignment being edited
    const globalIdx = inventoryRows.findIndex(
      (row) =>
        row.assignedTo === assignedRows[editIndex].assignedTo &&
        row.dateAdded === assignedRows[editIndex].dateAdded &&
        row.tagging === assignedRows[editIndex].tagging
    );
    if (globalIdx !== -1) {
      const updatedRows = inventoryRows.slice();
      updatedRows[globalIdx] = { ...form };
      setInventoryRows(updatedRows);
    }
    setShowForm(false);
    setEditIndex(null);
    setForm(null);
  };

  const handleDelete = () => {
    // Find the index in inventoryRows that matches the assignment being edited
    const globalIdx = inventoryRows.findIndex(
      (row) =>
        row.assignedTo === assignedRows[editIndex].assignedTo &&
        row.dateAdded === assignedRows[editIndex].dateAdded &&
        row.tagging === assignedRows[editIndex].tagging
    );
    if (globalIdx !== -1) {
      const updatedRows = inventoryRows.slice();
      updatedRows.splice(globalIdx, 1);
      setInventoryRows(updatedRows);
    }
    setShowForm(false);
    setEditIndex(null);
    setForm(null);
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Assignments</h1>
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px 24px 16px 24px",
              borderRadius: 6,
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
              minWidth: 320,
              maxWidth: 400,
              width: "100%",
            }}
          >
            <form
              onSubmit={handleSave}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <input
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                placeholder="Employee"
                style={{
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
                required
              />
              <input
                name="client"
                value={form.client || ""}
                onChange={handleChange}
                placeholder="Client"
                style={{
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
              />
              <input
                name="position"
                value={form.position || ""}
                onChange={handleChange}
                placeholder="Position"
                style={{
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
              />
              <input
                name="qty"
                type="number"
                value={form.qty}
                onChange={handleChange}
                placeholder="Qty"
                style={{
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
                min="1"
                required
              />
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Assets"
                style={{
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
                required
              />
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand"
                style={{
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
                required
              />
              <input
                name="tagging"
                value={form.tagging}
                onChange={handleChange}
                placeholder="Tagging"
                style={{
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
                required
              />
              <input
                name="dateAdded"
                type="date"
                value={form.dateAdded}
                onChange={handleChange}
                placeholder="Date Deployed"
                style={{
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
                required
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit" style={{ flex: 1, padding: 8 }}>
                  Save
                </button>
                <button
                  type="button"
                  style={{ flex: 1, padding: 8 }}
                  onClick={() => {
                    setShowForm(false);
                    setEditIndex(null);
                    setForm(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: 8,
                    background: "#ffeded",
                    color: "#b00",
                    border: "1px solid #fbb",
                  }}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: 24 }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px 12px",
                background: "#f5f5f5",
                textAlign: "left",
              }}
            >
              Employee
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px 12px",
                background: "#f5f5f5",
                textAlign: "left",
              }}
            >
              Client
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px 12px",
                background: "#f5f5f5",
                textAlign: "left",
              }}
            >
              Position
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px 12px",
                background: "#f5f5f5",
                textAlign: "left",
              }}
            >
              Qty
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px 12px",
                background: "#f5f5f5",
                textAlign: "left",
              }}
            >
              Assets
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px 12px",
                background: "#f5f5f5",
                textAlign: "left",
              }}
            >
              Brand
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px 12px",
                background: "#f5f5f5",
                textAlign: "left",
              }}
            >
              Tagging
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px 12px",
                background: "#f5f5f5",
                textAlign: "left",
              }}
            >
              Date Deployed
            </th>
          </tr>
        </thead>
        <tbody>
          {assignedRows.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => handleEdit(idx)}
              style={editIndex === idx ? { background: "#f0f8ff" } : {}}
            >
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  textAlign: "left",
                }}
              >
                {row.assignedTo}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  textAlign: "left",
                }}
              >
                {row.client || ""}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  textAlign: "left",
                }}
              >
                {row.position || ""}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  textAlign: "left",
                }}
              >
                {row.qty}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  textAlign: "left",
                }}
              >
                {row.category}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  textAlign: "left",
                }}
              >
                {row.brand}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  textAlign: "left",
                }}
              >
                {row.tagging}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  textAlign: "left",
                }}
              >
                {row.dateAdded}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Assignments;
