import React, { useState, useEffect } from 'react';
import { FaGhost, FaGamepad, FaTrophy } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { getHomePage, FALLBACK_FEATURES } from '../../api/homeApi';

// Fallback icons map — used when Strapi doesn't provide icon images
const iconMap = [FaGhost, FaGamepad, FaTrophy];

const Features = () => {
  // ── State initialised with hardcoded fallback ──────────────────────────────
  const [featuresData, setFeaturesData] = useState(FALLBACK_FEATURES);

  useEffect(() => {
    getHomePage().then((data) => {
      if (!data) return; // Strapi unavailable — fallback stays
      if (data.features?.items?.length > 0) {
        setFeaturesData(data.features);
      }
    });
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#070707] to-black text-white overflow-hidden border-y border-white/5">
      
      {/* Subtle Radial Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,1) 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {featuresData.items.map((feature, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <div key={index} className="group cursor-default">
                <div className="mb-5 relative inline-block">
                  <Icon className="w-14 h-14 text-white/90 group-hover:text-[#ff3333] transition-colors duration-300 transform group-hover:scale-110 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-[#ff3333]/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-godlike tracking-widest uppercase mb-3 text-white group-hover:text-[#ff3333] transition-colors duration-300 drop-shadow-md">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto drop-shadow-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;