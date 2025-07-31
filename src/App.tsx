// FETCHING OF DATA FROM FAKE API

// import Posts from "./pages/post";
// import { Toaster } from "sonner"; // ✅ from sonner

// function App() {
//   return (
//     <>
//       <Posts />
//       <Toaster position="top-right" richColors /> {/* ✅ enable sonner globally */}
//     </>
//   );
// }

// export default App;

//CHECKPOINT TO CHECK WHTHER CONNECT TO BACKEND OR NOT
// import CheckBackend from './components/CheckBackend';

// function App() {
//   return (
//     <div>
//       <CheckBackend />
//     </div>
//   );
// }

// export default App;
// SIDEBAR
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./layout/MainLayout";
import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expenses";
import Profile from "./pages/profile";
import Products from "@/pages/products";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
2
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



// PING
// import { useEffect } from "react";
// import { pingServer } from "@/@core/api/api";

// export default function Dashboard() {
//   useEffect(() => {
//     const testPing = async () => {
//       try {
//         const res = await pingServer();
//         console.log("✅ Ping Success:", res);
//       } catch (err) {
//         console.error("❌ Ping Failed:", err);
//       }
//     };

//     testPing();
//   }, []);

//   return <div>Dashboard Loaded</div>;
// }
