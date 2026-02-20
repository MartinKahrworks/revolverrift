import React from "react";
import BannerPng from "../../assets/brown_street.jpeg";
import { BiPlayCircle } from "react-icons/bi";

const Banner4 = ({ togglePlay }) => {
  return (
    <div className="py-12 sm:py-20 relative bg-black">
      <div className="max-w-screen-xl mx-auto min-h-[620px] flex items-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center relative w-full">
          {/* image section */}
          <div data-aos="fade-up" data-aos-once="false">
            <img
              src={BannerPng}
              alt="Banner"
              className="w-full max-w-[500px] sm:max-w-[400px] mx-auto"
            />
          </div>

          {/* text content section */}
          <div className="w-full relative z-10">
            <div className="space-y-5 text-center md:text-left">
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-3xl sm:text-4xl md:text-5xl font-vintage tracking-wide text-[#e4d6c3]"
              >
                Welcome to the Rift
              </h1>
              <p
                data-aos="fade-up"
                data-aos-delay="500"
                className="text-base sm:text-lg leading-relaxed font-vintage text-[#d0c4b0]"
              >
                The year is 1908, but the world is not as the history books tell it. Here, towering gothic castles are shrouded in the smog of burgeoning industry. Knights clad in steel plate carry newly-forged revolvers, and ancient blood feuds are settled not just with swords, but with the deafening roar of gunpowder.
              </p>
              <p
                data-aos="fade-up"
                data-aos-delay="600"
                className="text-base sm:text-lg leading-relaxed font-vintage text-[#d0c4b0]"
              >
                A strange celestial event the Rift has torn through the fabric of reality, imbuing certain bloodlines with uncanny abilities. Now, factions clash in the cobblestone streets and iron-wrought factories, vying for control of this newfound power. You are a wanderer, a duelist, caught in the crossfire of this new, brutal age.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start pt-4">
                <button
                  data-aos="fade-up"
                  data-aos-delay="700"
                  className="primary-btn"
                >
                  Get Started
                </button>
                <button
                  data-aos="fade-up"
                  data-aos-delay="800"
                  onClick={togglePlay}
                  className="flex items-center gap-2 text-white justify-center"
                >
                  <BiPlayCircle className="text-3xl" />
                  See Demo
                </button>
              </div>
            </div>

            {/* background color blob */}
            <div className="absolute h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-40 bottom-[-40px] left-[50%] sm:left-[300px] -translate-x-1/2 sm:translate-x-0 pointer-events-none z-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner4;
