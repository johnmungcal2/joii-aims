import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState, createContext } from "react";
import AppRoutes from "./AppRoutes";
import Assignments from "./Assignments";

export const InventoryContext = createContext();

function App() {
  const [inventoryRows, setInventoryRows] = useState([]);

  return (
    <Router>
      <InventoryContext.Provider value={{ inventoryRows, setInventoryRows }}>
        <header className="site-header">
          <img src="/joii_logo.png" alt="Logo" className="site-header-logo" />
          IT Asset & Inventory Management System
        </header>
        <nav className="site-navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/assets">Assets</Link>
            </li>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/assignments">Assignments</Link>
            </li>
          </ul>
        </nav>
        <AppRoutes />
      </InventoryContext.Provider>
    </Router>
  );
}

export default App;
