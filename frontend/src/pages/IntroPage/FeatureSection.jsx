const FeatureSection = ({icons}) => {

  return (
    <div className="py-24 px-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-center text-white mb-6">
          Everything You Need
        </h2>
        <p className="text-xl text-gray-400 text-center mb-20 max-w-2xl mx-auto">
          Powerful features designed to make expense tracking effortless and insightful
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {icons.map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/30"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeatureSection;
