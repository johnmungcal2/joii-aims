import { useState, useContext } from "react";
import { InventoryContext } from "./App";

const styles = {
  inventoryContainer: {
    padding: 16,
  },
  inventoryTable: {
    borderCollapse: "collapse",
    width: "100%",
  },
  inventoryThTd: {
    border: "1px solid #ccc",
    padding: 8,
    textAlign: "left",
    fontSize: 14,
  },
  inventoryTdLast: {
    textAlign: "center",
  },
  inventoryButton: {
    padding: "4px 10px",
    fontSize: 13,
    cursor: "pointer",
    border: "1px solid #bbb",
    borderRadius: 2,
    background: "#f5f5f5",
  },
  inventoryForm: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
    marginBottom: 0,
    background: "none",
  },
  inventoryInput: {
    display: "block",
    width: "100%",
    margin: 0,
    padding: "8px 8px",
    fontSize: 14,
    border: "1px solid #ccc",
    borderRadius: 2,
    boxSizing: "border-box",
  },
  inventoryFormButton: {
    width: "100%",
    whiteSpace: "nowrap",
    padding: "8px 0",
    cursor: "pointer",
    marginTop: 8,
  },
  showFormBtn: {
    marginBottom: 12,
    padding: "4px 16px",
    fontSize: 14,
    cursor: "pointer",
  },
  inventoryModal: {
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
  },
  inventoryModalContent: {
    background: "#fff",
    padding: "24px 24px 16px 24px",
    borderRadius: 6,
    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
    minWidth: 320,
    maxWidth: 400,
    width: "100%",
  },
  inventoryActions: {
    display: "flex",
    gap: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  selectedRow: {
    background: "#f0f8ff",
  },
  deleteBtn: {
    background: "#ffeded",
    color: "#b00",
    border: "1px solid #fbb",
    borderRadius: 2,
    padding: "4px 10px",
    fontSize: 13,
    cursor: "pointer",
    marginLeft: 4,
    transition: "background 0.2s",
  },
};

function Inventory() {
  const { inventoryRows, setInventoryRows } = useContext(InventoryContext);
  const [form, setForm] = useState({
    dateAdded: "",
    qty: "",
    category: "",
    brand: "",
    tagging: "",
    status: "",
    notes: "",
    assignedTo: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [customCategory, setCustomCategory] = useState("");
  const [customBrand, setCustomBrand] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setForm({ ...form, category: e.target.value });
      if (e.target.value !== "Other") setCustomCategory("");
    } else if (e.target.name === "brand") {
      setForm({ ...form, brand: e.target.value });
      if (e.target.value !== "Other") setCustomBrand("");
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleEdit = (idx) => {
    setForm(inventoryRows[idx]);
    setShowForm(true);
    setEditIndex(idx);
    if (
      inventoryRows[idx].category &&
      ![
        "Monitor",
        "Mouse",
        "Keyboard",
        "Laptop",
        "Printer",
        "UPS",
        "Webcam",
        "Headset",
      ].includes(inventoryRows[idx].category)
    ) {
      setCustomCategory(inventoryRows[idx].category);
      setForm({ ...inventoryRows[idx], category: "Other" });
    } else {
      setCustomCategory("");
    }
    if (inventoryRows[idx].brand && inventoryRows[idx].brand !== "Other") {
      setCustomBrand(inventoryRows[idx].brand);
      setForm({ ...inventoryRows[idx], brand: "Other" });
    } else {
      setCustomBrand("");
    }
  };

  const emptyForm = {
    dateAdded: "",
    qty: "",
    category: "",
    brand: "",
    tagging: "",
    status: "",
    notes: "",
    assignedTo: "",
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const categoryValue =
      form.category === "Other" ? customCategory : form.category;
    const brandValue = form.brand === "Other" ? customBrand : form.brand;
    const notesValue =
      form.notes && form.notes.trim() !== "" ? form.notes : "N/A";
    const newForm = {
      ...form,
      category: categoryValue,
      brand: brandValue,
      notes: notesValue,
    };
    if (editIndex !== null) {
      const updatedRows = inventoryRows.slice();
      updatedRows[editIndex] = newForm;
      setInventoryRows(updatedRows);
      setEditIndex(null);
    } else {
      setInventoryRows([...inventoryRows, newForm]);
    }
    setForm(emptyForm);
    setCustomCategory("");
    setCustomBrand("");
    setShowForm(false);
  };

  const handleDelete = (idx) => {
    const updatedRows = inventoryRows.filter((_, i) => i !== idx);
    setInventoryRows(updatedRows);
    // If deleting the row being edited, close the form
    if (editIndex === idx) {
      setShowForm(false);
      setEditIndex(null);
      setForm(emptyForm);
    }
  };

  return (
    <div style={styles.inventoryContainer}>
      <h1>Inventory List</h1>
      <div style={styles.inventoryActions}>
        <button
          style={styles.showFormBtn}
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
        <div style={styles.inventoryModal}>
          <div style={styles.inventoryModalContent}>
            <form
              style={styles.inventoryForm}
              className="inventory-form"
              onSubmit={handleAdd}
            >
              <input
                style={styles.inventoryInput}
                name="dateAdded"
                type="date"
                value={form.dateAdded}
                onChange={handleChange}
                placeholder="Date Added"
                required
              />
              <input
                style={styles.inventoryInput}
                name="qty"
                type="number"
                value={form.qty}
                onChange={handleChange}
                placeholder="Qty"
                min="0"
                required
              />
              <select
                style={styles.inventoryInput}
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="System Unit - i7">System Unit - i7</option>
                <option value="System Unit - i5">System Unit - i5</option>
                <option value="System Unit - i3">System Unit - i3</option>
                <option value="Laptop">Laptop</option>
                <option value="Monitor">Monitor</option>
                <option value="Mouse">Mouse</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Printer">Printer</option>
                <option value="UPS">UPS</option>
                <option value="Webcam">Webcam</option>
                <option value="Headset">Headset</option>
                <option value="Other">Other</option>
              </select>
              {form.category === "Other" && (
                <input
                  style={styles.inventoryInput}
                  name="customCategory"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Specify category"
                  required
                />
              )}
              <select
                style={styles.inventoryInput}
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Brand
                </option>
                <option value="A4TECH">A4TECH</option>
                <option value="SAMSUNG">SAMSUNG</option>
                <option value="Logitech">Logitech</option>
                <option value="APC">APC</option>
                <option value="Intel">Intel</option>
                <option value="Other">Other</option>
              </select>
              {form.brand === "Other" && (
                <input
                  style={styles.inventoryInput}
                  name="customBrand"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  placeholder="Specify brand"
                  required
                />
              )}
              <input
                style={styles.inventoryInput}
                name="tagging"
                value={form.tagging}
                onChange={handleChange}
                placeholder="Tagging"
                required
              />
              <select
                style={styles.inventoryInput}
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="BRAND NEW">BRAND NEW</option>
                <option value="GOOD">GOOD</option>
                <option value="DEFECTIVE">DEFECTIVE</option>
              </select>
              <input
                style={styles.inventoryInput}
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                placeholder="Assigned To (Staff Name)"
              />
              <input
                style={styles.inventoryInput}
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Notes"
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit" style={styles.inventoryFormButton}>
                  {editIndex !== null ? "Save" : "Add"}
                </button>
                <button
                  type="button"
                  style={styles.inventoryFormButton}
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
                    style={styles.deleteBtn}
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
      <table style={styles.inventoryTable} className="inventory-table">
        <thead>
          <tr>
            <th style={styles.inventoryThTd}>DATE ADDED</th>
            <th style={styles.inventoryThTd}>QTY</th>
            <th style={styles.inventoryThTd}>CATEGORY</th>
            <th style={styles.inventoryThTd}>BRAND</th>
            <th style={styles.inventoryThTd}>TAGGING</th>
            <th style={styles.inventoryThTd}>STATUS</th>
            <th style={styles.inventoryThTd}>ASSIGNED TO</th>
            <th style={styles.inventoryThTd}>NOTES</th>
          </tr>
        </thead>
        <tbody>
          {inventoryRows.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => handleEdit(idx)}
              style={editIndex === idx ? styles.selectedRow : {}}
            >
              <td style={styles.inventoryThTd}>{row.dateAdded}</td>
              <td style={styles.inventoryThTd}>{row.qty}</td>
              <td style={styles.inventoryThTd}>{row.category}</td>
              <td style={styles.inventoryThTd}>{row.brand}</td>
              <td style={styles.inventoryThTd}>{row.tagging}</td>
              <td style={styles.inventoryThTd}>{row.status}</td>
              <td style={styles.inventoryThTd}>{row.assignedTo}</td>
              <td style={styles.inventoryThTd}>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
