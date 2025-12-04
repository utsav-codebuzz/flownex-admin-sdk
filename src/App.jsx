import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./components/Login";
import AddUser from "./components/AddUser";
import AddCaseType from "./components/AddCaseType";

export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-case-type" element={<AddCaseType />} />
        <Route
          path="/"
          element={<p className="text-lg">Select a page from the sidebar.</p>}
        />
      </Routes>
    </DashboardLayout>
  );
}
