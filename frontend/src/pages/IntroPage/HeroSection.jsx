import React, {useState, useEffect} from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedOrb from "../../components/AnimatedOrb";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
const HeroSection = ({ 
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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-cyan-900 to-indigo-900 opacity-70"></div>
      
      {/* Floating Orbs */}
      <AnimatedOrb />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl">
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse "></div>
          </div>
          <Sparkles className="w-28 h-28 mx-auto text-white relative z-10 animate-spin-slow drop-shadow-2xl" />
        </div>
        
        <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 animate-gradient">
            MONEVO
          </span>
          <br />
        </h1>
        <h2 className="text-5xl md:text-5xl font-black text-white mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 animate-gradient">
            Smart Expense
          </span>
          <br />
          <span className="text-white">Tracker</span>
        </h2>
        
        <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
          Master Your Money with AI-Powered Intelligence
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Track expenses effortlessly, get smart insights, and take control of your financial future with our cutting-edge expense management platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={handleGetStarted}
            className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-xl font-bold text-white hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Free
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            onClick={() => { setShowAuth(true); setAuthMode('login'); }}
            className="px-10 py-4 border-2 border-white/30 rounded-full text-xl font-semibold text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection;