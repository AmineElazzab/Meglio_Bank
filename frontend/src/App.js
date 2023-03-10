import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import DashboardAdmin from "./pages/admin/DashboardAdmin";


function App() {
  
  const isLogin = window.location.pathname === "/login";
  const isRegister = window.location.pathname === "/register";
  const showHeader = !isLogin && !isRegister;

  return (
    <>
      <Router>
        {showHeader && <Header />}
        <div className="">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/dashboard" element={<DashboardAdmin />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
