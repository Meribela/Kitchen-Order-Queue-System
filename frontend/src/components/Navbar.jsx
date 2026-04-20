import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "../api/api";

export default function Navbar() {
  const base =
    "px-4 py-2 rounded-xl text-sm font-medium border transition";
  const active = "bg-black text-white border-black";
  const idle = "bg-white border-gray-200 hover:bg-gray-50";
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-black text-white grid place-items-center font-bold">
            CR
          </div>

          <div className="leading-tight">
            <div className="font-extrabold">Crammer's Restaurant</div>
            <div className="text-xs text-gray-500">Kitchen Order Queue System</div>
          </div>
        </div>

        <nav className="flex gap-2">
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            Customers
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            Orders
          </NavLink>

          <NavLink
            to="/track-order"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            Track Order
          </NavLink>

          <NavLink
            to="/queues"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            Queue
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            Profile
          </NavLink>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`${base} bg-red-50 border-red-200 text-red-600 hover:bg-red-100 disabled:opacity-50`}
          >
            {isLoggingOut ? "..." : "Logout"}
          </button>
        </nav>
      </div>
    </header>
  );
}