import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import SystemHealth from "./components/dashboard/SystemHealth";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/admin-dashboard" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />

          <Route
            path="departments"
            element={<DepartmentList />}
          />

          <Route
            path="employees"
            element={<List />}
          />

          <Route
            path="add-employees"
            element={<Add />}
          />
          <Route
            path="employees/:id"
            element={<View />}
          />
          <Route
            path="employees/edit/:id"
            element={<Edit />}
          />
          <Route
  path="system-health"
  element={<SystemHealth />}
/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;