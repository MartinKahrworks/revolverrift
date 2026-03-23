import React, { useState, useEffect } from "react";
import poster from "../../assets/content1.webp"; // Using webp for better performance
import bgImage from '../../assets/Texturelabs_Grunge_353M.jpg';
import { getContentPageBannerData, FALLBACK_BANNER_DATA } from "../../api/contentApi";

const Banner = () => {
  const navbarHeight = 80;
  const [data, setData] = useState(FALLBACK_BANNER_DATA);

  useEffect(() => {
    getContentPageBannerData().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div
      className="relative w-full bg-black overflow-hidden flex items-center min-h-[60vh] md:min-h-[calc(100dvh-80px)] py-16 md:py-0"
    >
      {/* Dynamic Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${data.background_image || poster})`,
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

      <div className="relative z-20 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center pt-28 pb-12 md:pb-0 md:pt-[104px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* Main Text Section */}
          <div className="lg:pr-10">
            <div className="space-y-8 relative">

              {/* Header with Glitch Effect */}
              <div className="relative inline-block mb-4">
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-custom tracking-widest text-[#e4d6c3] uppercase relative z-10 drop-shadow-lg"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  {data.title}
                </h1>
                <div className="h-1 w-24 bg-red-600 mt-4 shadow-[0_0_10px_rgba(220,38,38,0.8)]" data-aos="fade-right" data-aos-delay="400" />
              </div>

              {/* Description Block with HUD Styling */}
              <div
                className="relative p-4 sm:p-6 border-l-2 border-red-600/50 bg-black/40 backdrop-blur-sm group hover:bg-black/60 transition-colors duration-500 rounded-r-sm"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                {/* Corner decorations */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-600" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-red-600" />
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-gray-300 font-serif leading-relaxed">
                  <p className="max-w-2xl">
                    {data.description1}
                  </p>

                  <p className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-400">
                    {data.description2}
                  </p>

                  <div className="relative overflow-hidden py-2">
                    <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-red-500/80">
                      {data.hud_text}
                    </p>
                    <div className="scanline" style={{ height: '1px', background: 'rgba(220, 38, 38, 0.5)' }}></div>
                  </div>

                  <p className="border-t border-white/10 pt-4 text-sm sm:text-base md:text-lg">
                    {data.warning_text}
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
