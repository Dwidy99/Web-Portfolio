//import react router dom
import { Routes, Route } from "react-router-dom";

//======================================================
// view admin
//======================================================

//import view login
import Login from "../views/Auth/Login";
//import view forbidden
import Forbidden from "../views/Auth/Forbidden";
//import privateRoute
import PrivateRoutes from "./PrivateRoutes";
//import Dashboard
import Dashboard from "../views/Admin/Dashboard";
//import Permissions
import PermissionsIndex from "../views/Admin/Permissions/Index";
// import RolesIndex
import RolesIndex from "../views/Admin/Roles/Index";
// import RolesCreate
import RolesCreate from "../views/Admin/Roles/Create";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/login" element={<Login />} />

      {/* route "/forbidden" */}
      <Route path="/forbidden" element={<Forbidden />} />

      {/* route "/admin/dashboard" */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/permissions" */}
      <Route
        path="/admin/permissions"
        element={
          <PrivateRoutes>
            <PermissionsIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/roles" */}
      <Route
        path="/admin/roles"
        element={
          <PrivateRoutes>
            <RolesIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/roles/create" */}
      <Route
        path="/admin/roles/create"
        element={
          <PrivateRoutes>
            <RolesCreate />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
