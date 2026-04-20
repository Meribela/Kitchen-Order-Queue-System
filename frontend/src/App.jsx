import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Queue from "./pages/Queue";
import TrackOrder from "./pages/TrackOrder.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// Protected Route Component
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const isLoggedIn = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {isLoggedIn && <Navbar />}
        <main className={isLoggedIn ? "max-w-6xl mx-auto px-4 py-6" : ""}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/customers" replace /> : <Navigate to="/login" replace />} />
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/track-order" element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />
            <Route path="/queues" element={<ProtectedRoute><Queue /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/customers" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}