import React from "react";
import poster from "../../assets/content2.webp";
import bgImage from '../../assets/Texturelabs_Grunge_353M.jpg';

const Banner10 = ({ togglePlay }) => {
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
          {/* left side empty / image side */}
          <div className="hidden lg:block"></div>

          {/* text content section on the right, centered */}
          <div className="flex items-center justify-center h-full lg:pl-10 px-2">
            <div className="space-y-6 text-center max-w-lg">


              <div
                // data-aos="fade-up"
                data-aos-delay="500"
                className="text-base md:text-lg leading-relaxed text-gray-300 space-y-4 bg-left "
              >
                <p className="font-semibold font-custom text-[#e4d6c3] text-3xl md:text-4xl lg:text-5xl">
                  Into the Abyss
                </p>

                <p>
                  Beyond the compounds lies the abyss: swamps, forests, and caves where light struggles to survive.
                </p>

                <p>
                  Here stalk the Anomaly, the Reaper, the Crower, and horrors whispered only in nightmares.
                </p>

                <p>
                  Those who push this deep face the Rift at its cruelest but those who escape carry its greatest rewards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner10;
