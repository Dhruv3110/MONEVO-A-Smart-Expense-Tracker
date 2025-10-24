import React from "react";

const WorkingSection = ({ steps }) => {
  return (
    <div className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-black text-center text-white mb-20">
          How It Works
        </h2>
        
        <div className="space-y-16">
          {steps.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12 group">
              <div className="lg:text-8xl text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300">
                {item.step}
              </div>
              <div className="flex-1">
                <h3 className="lg:text-3xl text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="lg:text-xl text-md text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkingSection;