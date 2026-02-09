import React, { useEffect, useState } from 'react';
import bgImage from '../../assets/COMINGSOONHERO.png'; // Replace with your background image

import revolverTitle from '../../assets/Rift.png';

const HeroLanding = () => {
  return (
    <section
      className="relative w-full h-screen text-white font-serif overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 🔳 Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.65))',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-15 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Animation Keyframes */}
      <style>{`
        @keyframes bounceDrop {
          0% {
            transform: translateY(-200px) scale(1.2) rotateX(30deg);
            opacity: 0;
          }
          50% {
            transform: translateY(10px) scale(0.98);
            opacity: 1;
          }
          70% {
            transform: translateY(-6px) scale(1.03);
          }
          85% {
            transform: translateY(4px) scale(0.99);
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }
      `}</style>

      {/* 📜 Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <img
          src={revolverTitle}
          alt="Revolver Rift Title"
          className="w-[80%] max-w-5xl mb-6 animate-fade-in mt-20"
          style={{ animation: 'bounceDrop 1.2s ease-out forwards' }}
        />
        
        <p className="mt-4 text-3xl md:text-4xl text-[#f5ebd9] tracking-widest font-custom font-bold">
          EXTRACTION SHOOTER
        </p>

        <p className="mt-2 text-lg md:text-xl max-w-2xl text-[#e0d8c3] font-custom font-light">
          -Not Every Soldier Comes Back Human- 
        </p>

        <div className="flex items-center justify-center mt-6 mb-4 gap-4 text-[#b5a891] text-2xl">
          <span className="w-16 border-t border-[#b5a891]" />
          <span className="font-bold">×</span>
          <span className="w-16 border-t border-[#b5a891]" />
        </div>

        <p className="mt-4 text-3xl md:text-4xl text-[#f5ebd9] tracking-widest font-custom font-bold">
          COMING SOON...
        </p>
      </div>
    </section>
  );
};

export default HeroLanding;