import React from 'react';
import { FaGhost, FaGamepad, FaTrophy } from 'react-icons/fa';
import bgGrunge from '../../assets/Texturelabs_Grunge_353M.webp';

const features = [
  {
    icon: FaGhost,
    title: "Incredible Atmosphere",
    description: "Immerse yourself in a dark, atmospheric world where every shadow hides a threat."
  },
  {
    icon: FaGamepad,
    title: "Catchy Battles",
    description: "Engage in intense, high-stakes combat that demands skill and strategy."
  },
  {
    icon: FaTrophy,
    title: "28 Awards",
    description: "Recognized for excellence in design, gameplay, and immersive storytelling."
  }
];

const Features = () => {
  return (
    <section className="relative py-24 bg-black text-white overflow-hidden border-t border-white/5">
      {/* Background Texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${bgGrunge})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((feature, index) => (
            <div key={index} className="group cursor-default">
              <div className="mb-6 relative inline-block">
                <feature.icon className="w-14 h-14 text-white/80 group-hover:text-[#ff3333] transition-colors duration-300 transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#ff3333]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-godlike tracking-widest uppercase mb-3 text-white group-hover:text-[#ff3333] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 font-body text-sm leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
