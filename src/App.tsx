import { FC, useState } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./components/Login";
import AddUser from "./components/AddUser";
import AddCaseType from "./components/AddCaseType";

const baseURL = "";

const App: FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (response: { token: string; user: any }) => {
    setToken(response.token);
    localStorage.setItem("flownex_token", response.token);
  };

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/login" element={<Login baseURL={baseURL} onLogin={handleLogin} />} />
        <Route path="/add-user" element={<AddUser baseURL={baseURL} token={token ?? ""} />} />
        <Route path="/add-case-type" element={<AddCaseType baseURL={baseURL} token={token ?? ""} />} />
        <Route
          path="/"
          element={<p className="text-lg">Select a page from the sidebar.</p>}
        />
      </Routes>
    </DashboardLayout>
  );
};

export default App;
