import React from "react";
import poster from "../../assets/content1.webp"; // Using webp for better performance
import bgImage from '../../assets/Texturelabs_Grunge_353M.jpg';

const Banner = () => {
  const navbarHeight = 80;

  return (
    <div
      className="relative w-full bg-black overflow-hidden"
      style={{
        height: `calc(100vh - ${navbarHeight}px)`,
      }}
    >
      {/* Dynamic Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundPosition: "80% 50%",
        }}
      />

      {/* Atmospheric Fog/Grunge Overlay with Animation */}
      <div
        className="absolute inset-0 opacity-20 z-1 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          animation: 'panOverlay 30s linear infinite alternate'
        }}
      />
      <style>{`
        @keyframes panOverlay {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 1px); }
          60% { clip-path: inset(15% 0 80% 0); transform: translate(-1px, -2px); }
          80% { clip-path: inset(55% 0 10% 0); transform: translate(1px, 2px); }
          100% { clip-path: inset(40% 0 30% 0); transform: translate(-2px, 1px); }
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent; 
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 #ff0000;
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
          clip-path: inset(0 0 0 0);
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 #00ffff;
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
          clip-path: inset(0 0 0 0);
        }
        .scanline {
          width: 100%;
          height: 2px;
          background: rgba(255, 0, 0, 0.3);
          position: absolute;
          z-index: 10;
          animation: scanline 6s linear infinite;
          opacity: 0.6;
        }
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)]" />

      {/* Content Wrapper */}
      <div className="relative z-20 w-full max-w-screen-xl mx-auto px-6 md:px-12 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* Main Text Section */}
          <div className="lg:pr-10">
            <div className="space-y-8 relative">

              {/* Header with Glitch Effect */}
              <div className="relative inline-block mb-4">
                <h1
                  data-text="WELCOME TO THE RIFT"
                  className="glitch-text text-3xl md:text-4xl lg:text-5xl font-custom tracking-widest text-[#e4d6c3] uppercase relative z-10 drop-shadow-lg"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  WELCOME TO THE RIFT
                </h1>
                <div className="h-1 w-24 bg-red-600 mt-4 shadow-[0_0_10px_rgba(220,38,38,0.8)]" data-aos="fade-right" data-aos-delay="400" />
              </div>

              {/* Description Block with HUD Styling */}
              <div
                className="relative p-6 border-l-2 border-red-600/50 bg-black/40 backdrop-blur-sm group hover:bg-black/60 transition-colors duration-500 rounded-r-sm"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                {/* Corner decorations */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-600" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-red-600" />
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-6 text-lg md:text-xl text-gray-300 font-serif leading-relaxed">
                  <p className="max-w-2xl">
                    A hardcore <span className="text-white font-semibold">PvPvE Extraction Shooter</span> with tactical depth and hellish stakes.
                  </p>

                  <p className="max-w-2xl text-base md:text-lg text-gray-400">
                    Every match is a sandbox of deadly choices: drop into war-torn 1944, loot powerful artifacts, and face demons, undead, and rival players before the Rift collapses.
                  </p>

                  <div className="relative overflow-hidden py-2">
                    <p className="text-sm font-mono tracking-widest uppercase text-red-500/80">
                        // Use period weapons, perks, and gadgets to build your loadout, track enemies, and ambush with precision.make
                    </p>
                    {/* Scanning Line Animation for this specific alert */}
                    <div className="scanline" style={{ height: '1px', background: 'rgba(220, 38, 38, 0.5)' }}></div>
                  </div>

                  <p className="border-t border-white/10 pt-4 text-base md:text-lg">
                    But remember <span className="font-bold text-[#AA0000] drop-shadow-[0_0_8px_rgba(170,0,0,0.8)]">only what you extract survives.</span> High risk. High reward. No second chances.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
