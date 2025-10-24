import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
const CTASection = ({
  setShowAuth,
  setAuthMode
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  },[]);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    }
    else{
      setAuthMode('login');
      setShowAuth(true);
    }
  }
  return (
    <div className="py-32 px-6 bg-gradient-to-br from-blue-900 via-cyan-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-6xl font-black text-white mb-6">
          Ready to Take Control?
        </h2>
        <p className="text-2xl text-gray-200 mb-12">
          Join thousands of users who have transformed their financial lives
        </p>
        <button
          onClick={handleGetStarted}
          className="group relative px-12 py-5 bg-white rounded-full text-2xl font-bold text-cyan-600 hover:shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Start Your Journey
            <Sparkles className=" lg:w-6 lg:h-6 md:h-6 md:w-6 w-10 h-10 group-hover:rotate-180 transition-transform duration-500" />
          </span>
        </button>
      </div>
    </div>
  )
}
export default CTASection;