import React from "react";
import poster from "../../assets/content4.webp";
import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';

const Banner8 = ({ togglePlay }) => {
  const navbarHeight = 80; // match your actual navbar height

  return (
    <div
      className="relative w-full bg-black h-screen w-screen bg-cover bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${poster})`,
        backgroundPosition: "30% 80%",
        height: `calc(100vh - ${navbarHeight}px)`,
      }}
    >
      {/* Texture Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
        }}
      />

      {/* Top vignette */}
      <div
        className="absolute top-0 left-0 w-full h-32 pointer-events-none z-20"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)",
        }}
      ></div>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
        }}
      ></div>

      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center w-full">
          {/* Left side empty for balance */}
          <div className="hidden lg:block"></div>

          {/* Text content */}
          <div className="flex items-center justify-center h-full lg:pl-10 px-2">
            <div className="space-y-6 text-center max-w-lg"

            >
              {/* <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] text-[#E6E6E6]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Welcome to the Rift
              </h1> */}

              <div
                // data-aos="fade-up"
                data-aos-delay="500"
                className="text-base md:text-lg leading-relaxed text-gray-300 space-y-4 bg-left "

              >
                <p className="font-semibold font-custom  text-[#e4d6c3] text-3xl md:text-4xl lg:text-5xl">
                  Cursed Compounds
                </p>
                <p>
                  Scattered across the Rift are <span className="font-bold text-[#AA0000]">16 compounds</span>, each a crucible of combat.

                </p>

                <p>
                  From sawmills to ironworks, these strongholds hold weapons, skill cards, and the path to the artifact or VIP.

                </p>
                <p>
                  Enter them ready for war
                </p>

                <p>
                  Because inside, every team, every monster, and every shadow is your enemy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner8;
