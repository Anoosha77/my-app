import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LoggedInLayout from "./layout/LoggedInLayout";

import Login from "./pages/login";
import Otp from "./pages/Otp";
import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expenses";
import Profile from "./pages/profile";
import Products from "@/pages/products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="verify-otp" element={<Otp />} />
        </Route>

        {/* Protected Routes with Sidebar */}
        <Route element={<LoggedInLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="profile" element={<Profile />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
