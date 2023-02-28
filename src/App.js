import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./components/Login";
import Users from "./Pages/Users";
import Izin from "./Pages/Izin";
import AddUser from "./Pages/AddUser";
import EditUser from "./Pages/EditUser";
import AddIzin from "./Pages/AddIzin";
import EditIzin from "./Pages/EditIzin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/izin/add" element={<AddIzin />} />
          <Route path="/izin/edit/:id" element={<EditIzin />} />
          <Route path="/izin" element={<Izin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
