


// File: AuthToggle.jsx
import React from "react";

const AuthToggle = ({ authMode, setAuthMode }) => {
  return (
    <div className="flex gap-2 mb-8 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setAuthMode("login")}
        className={`flex-1 py-3 rounded-full font-semibold ${
          authMode === "login"
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => setAuthMode("register")}
        className={`flex-1 py-3 rounded-full font-semibold ${
          authMode === "register"
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthToggle;


