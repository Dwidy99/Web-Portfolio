//import react router dom
import { Routes, Route } from "react-router-dom";

//======================================================
// view admin
//======================================================

//import view login
import Login from "../views/Auth/Login";
//import view forbidden
import Forbidden from "../views/Auth/Forbidden";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/login" element={<Login />} />

      {/* route "/forbidden" */}
      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}
