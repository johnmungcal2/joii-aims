import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Assets from "./Assets";
import Inventory from "./Inventory";
import Assignments from "./Assignments"; // Will rename file next

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assets" element={<Assets />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/assignments" element={<Assignments />} />
    </Routes>
  );
}

export default AppRoutes;
