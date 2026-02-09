import React from "react";
import poster from "../../assets/content3.webp";
import bgImage from '../../assets/Texturelabs_Grunge_353M.jpg';

const Banner9 = () => {
  const navbarHeight = 80; // match your actual navbar height

  return (
    <div
      className="relative w-full bg-black h-screen w-screen bg-cover  bg-no-repeat"
      style={{
        backgroundImage: `url(${poster})`,
        backgroundPosition: "80% 50%",
        height: `calc(100vh - ${navbarHeight}px)`,
        marginTop: 0,
      }}
    >
      {/* Vignette overlay (corners + extra top/bottom thickness) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0) 70%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-[25%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0))",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-[25%]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))",
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center w-full">
          {/* text content section */}
          <div className="lg:pr-10 px-2">
            <div className="space-y-6 text-center">


              <div
                // data-aos="fade-up"
                data-aos-delay="500"
                className="text-base md:text-lg leading-relaxed text-gray-300 space-y-4 bg-left "
              >
                <p className="font-semibold font-custom text-[#e4d6c3] text-3xl md:text-4xl lg:text-5xl">
                  Forsaken Villages
                </p>

                <p>
                  The villages of Europe lie frozen in time, their streets patrolled by demons and restless dead.
                </p>

                <p>
                  Every creaking cabin and abandoned barn hides danger, loot, or a rival waiting in the dark.
                </p>

                <p>
                  Survival here demands stealth, courage, and a revolver ready to fire,
                </p>

                <p >
                  Because silence never lasts long in the Rift.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner9;
