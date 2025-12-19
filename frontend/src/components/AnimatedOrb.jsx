import React from "react";

const AnimatedOrb = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-2xl animate-pulse"
          style={{
            width: Math.random() * 300 + 100 + 'px',
            height: Math.random() * 300 + 100 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: `radial-gradient(circle, ${
              [
                'rgba(6,182,212,0.15)',   // cyan-500
                'rgba(59,130,246,0.15)',  // blue-500
                'rgba(99,102,241,0.15)',  // indigo-500
                'rgba(34,211,238,0.12)',  // cyan-400
                'rgba(96,165,250,0.12)',  // blue-400
                'rgba(129,140,248,0.12)', // indigo-400
              ][i % 6]
            } 0%, transparent 70%)`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedOrb;