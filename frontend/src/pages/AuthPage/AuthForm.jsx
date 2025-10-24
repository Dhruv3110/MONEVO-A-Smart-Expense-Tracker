

// File: AuthForm.jsx
import React, { useState, useEffect } from "react";
import AuthToggle from "./AuthToggle";

const AuthForm = ({ authMode, setAuthMode, onSubmit, isLoading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // clear name when switching to login to avoid accidental submission
    if (authMode === "login") setName("");
  }, [authMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic client-side validation
    if (authMode === "register" && name.trim().length < 2) {
      alert("Please provide your full name.");
      return;
    }

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // pass up form data; parent handles Firebase and navigation
    await onSubmit({ name: name.trim(), email: email.trim(), password: password });
  };

  return (
    <div>
      <AuthToggle authMode={authMode} setAuthMode={setAuthMode} />

      {/* Title */}
      <div className="mb-8">
        <h3 className="text-3xl font-black text-gray-900 mb-2">
          {authMode === "login" ? "Welcome Back!" : "Create Account"}
        </h3>
        <p className="text-gray-600">
          {authMode === "login"
            ? "Sign in to continue to your dashboard"
            : "Start your financial journey today"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {authMode === "register" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
              placeholder="John Doe"
              required={authMode === "register"}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : authMode === "login" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
