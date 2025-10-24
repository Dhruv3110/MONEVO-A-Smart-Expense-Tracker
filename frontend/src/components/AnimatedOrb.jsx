import React from "react";

const AnimatedOrb = () => {
  return (
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-xl "
          style={{
            width: Math.random() * 300 + 100 + 'px',
            height: Math.random() * 300 + 100 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: `radial-gradient(circle, ${['rgba(59,130,246,0.4)', 'rgba(34,211,238,0.4)', 'rgba(99,102,241,0.4)'][i % 3]} 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedOrb;