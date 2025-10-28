import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="backdrop-blur-md bg-amber-100/80 shadow-md sticky top-0 z-50 border-b border-amber-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Title */}
        <h1 className="text-2xl font-extrabold text-amber-600 tracking-wide drop-shadow-sm">
          Paste<span className="text-amber-500">Vault</span> ✨
        </h1>

        {/* Navigation Links */}
        <div className="flex gap-6 text-lg font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-all duration-200 ${
                isActive
                  ? "text-amber-600 border-b-2 border-amber-500 pb-1"
                  : "text-gray-700 hover:text-amber-500"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `transition-all duration-200 ${
                isActive
                  ? "text-amber-600 border-b-2 border-amber-500 pb-1"
                  : "text-gray-700 hover:text-amber-500"
              }`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
