import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Assets from "./Assets";
import Inventory from "./Inventory";
import Settings from "./Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assets" element={<Assets />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default AppRoutes;
