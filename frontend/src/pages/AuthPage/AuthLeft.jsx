


// File: AuthLeft.jsx
import React from "react";
import { Sparkles, Upload, TrendingUp, Bell } from "lucide-react";
import AnimatedOrb from "../../components/AnimatedOrb";

const features = [
  { icon: <Upload size={24} />, text: "Instant receipt scanning" },
  { icon: <TrendingUp size={24} />, text: "Real-time analytics" },
  { icon: <Bell size={24} />, text: "Smart budget alerts" },
];

const AuthLeft = () => {
  return (
    <>
      <AnimatedOrb />
      <div className="relative z-10 flex flex-col justify-center items-center p-10 text-white">
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <Sparkles className="w-20 h-20 relative z-10 animate-spin-slow" />
          </div>
        </div>

        <h2 className="text-4xl lg:text-5xl font-black mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
          Welcome to the Future
        </h2>

        <p className="text-lg lg:text-xl text-gray-300 text-center mb-8 max-w-md">
          Join thousands of users managing their finances smarter with AI-powered insights
        </p>

        <div className="space-y-4 w-full max-w-sm">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:scale-105 transition">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-2">{item.icon}</div>
              <span className="text-white font-semibold">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AuthLeft;


