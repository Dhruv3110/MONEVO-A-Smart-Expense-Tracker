import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Sparkles, Home, Bell, Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = ({ notifications, showNotifications, setShowNotifications }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const navLinks = [
    { label: <Home size={20} />, to: "/", isIcon: true },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Upload", to: "/upload" },
    { label: "Budget", to: "/budget" },
    { label: "Expenses", to: "/expenses" },
  ];

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Click outside to close user menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    // navigate("/"); 
  };

  // ✅ Helper to get user initial
  const getInitial = (nameOrEmail) => {
    if (!nameOrEmail) return "";

    // If it's an email and no displayName exists → extract before @
    const name = nameOrEmail.includes("@")
      ? nameOrEmail.split("@")[0]                 // ex: "dhruv@gmail.com" → "dhruv"
      : nameOrEmail;                              // else use full displayName

    // Split by space, map to first letter of each part, take max 2 letters
    const parts = name.trim().split(" ");
    const initials = parts
      .filter(p => p.length > 0)
      .map(p => p[0].toUpperCase())
      .slice(0, 2)                                // return first 2 letters max
      .join("");

    return initials;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">MONEVO</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Notifications */}
            {user && (
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
            )}

            {/* User Section */}
            {user && (
              <div className="relative ml-4" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold hover:ring-2 hover:ring-blue-300 transition"
                >
                  {getInitial(user.displayName || user.email)}
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden mt-4 flex flex-col gap-2"
            >
              {navLinks.map((link, idx) => (
                <NavLink
                  key={idx}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Notifications */}
              {user && (
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setMenuOpen(false);
                  }}
                  className="relative w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
                >
                  <Bell size={20} className="inline mr-2" /> Notifications
                  {notifications.length > 0 && (
                    <span className="absolute top-2 right-6 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>
              )}

              {/* User + Logout */}
              {user && (
                <div className="flex items-center justify-between px-4 py-2 mt-2 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                      {getInitial(user.displayName || user.email)}
                    </div>
                    <span className="text-gray-700 font-medium">
                      {user.displayName || user.email.split("@")[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
