import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router>
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
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <AppRoutes />
    </Router>
  );
}

export default App;
