// File: AuthPage.jsx
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { auth, db } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import AuthLeft from "./AuthLeft";
import AuthForm from "./AuthForm";

const AuthPage = ({ authMode: authModeProp, setAuthMode: setAuthModeProp, setShowAuth }) => {
  const [authMode, setAuthMode] = useState(authModeProp || "login");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authModeProp) setAuthMode(authModeProp);
  }, [authModeProp]);

  useEffect(() => {
    if (typeof setAuthModeProp === "function") setAuthModeProp(authMode);
  }, [authMode, setAuthModeProp]);

  const handleAuthSubmit = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      if (authMode === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });
        await set(ref(db, `users/${user.uid}`), {
          name,
          email,
          createdAt: new Date().toISOString(),
        });

        setIsLoading(false);
        setAuthMode("login"); 
        alert("Registration successful. Please login now.");
      } 
      else {
        if (!email.trim() || !password.trim()) {
          alert("Email and password are required");
          return;
        }
        await signInWithEmailAndPassword(auth, email.trim(), password.trim());
        setIsLoading(false);
        if (typeof setShowAuth === "function") setShowAuth(false);
        navigate("/dashboard");
      } 
    } catch (error) {
      setIsLoading(false);
      let msg = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          msg = "This email is already registered. Please sign in instead.";
          setAuthMode('login')
          break;
        case "auth/invalid-credential":
          msg = "Invalid email or password.";
          setAuthMode("register");
          break;
        case "auth/invalid-email":
          msg = "Please enter a valid email address.";
          break;
        case "auth/missing-password":
          msg = "Password field cannot be empty.";
          break;
        case "auth/too-many-requests":
          msg = "Too many failed attempts. Please try again later.";
          break;
        default:
          msg = error.message || "An unexpected error occurred.";
      }
      alert(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 md:p-4">
      <div className="relative w-full max-w-6xl max-h-[95vh] flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-950 via-cyan-900 to-indigo-900">
          <AuthLeft />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-white relative flex flex-col">

          <button
            onClick={() => typeof setShowAuth === "function" && setShowAuth(false)}
            className="absolute xl:top-6 xl:right-6 md:top-3 md:right-3 top-1 right-1 p-2 rounded-full hover:bg-gray-100 transition z-10"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex-1 overflow-y-auto p-8 md:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              <AuthForm
                authMode={authMode}
                setAuthMode={setAuthMode}
                onSubmit={handleAuthSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;


