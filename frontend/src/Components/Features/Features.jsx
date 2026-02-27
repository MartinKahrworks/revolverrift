import React, { useState, useEffect } from 'react';
import { FaGhost, FaGamepad, FaTrophy } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import embersBackground from '../../assets/embers_background.gif';
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
    <section className="relative py-24 bg-black text-white overflow-hidden border-t border-white/5">

      {/* Embers GIF Background */}
      <img
        src={embersBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen pointer-events-none"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {featuresData.items.map((feature, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <div key={index} className="group cursor-default">
                <div className="mb-6 relative inline-block">
                  <Icon className="w-14 h-14 text-white/90 group-hover:text-[#ff3333] transition-colors duration-300 transform group-hover:scale-110 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-[#ff3333]/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-godlike tracking-widest uppercase mb-3 text-white group-hover:text-[#ff3333] transition-colors duration-300 drop-shadow-md">
                  {feature.title}
                </h3>
                <p className="text-gray-300 font-body text-sm leading-relaxed max-w-xs mx-auto drop-shadow-sm">
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