import React from "react";

const Banner5 = () => {
  return (
    <div className="relative bg-black flex items-center justify-center pt-12 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full text-center">
        <div className="space-y-6">
          {/* Main Headline */}
          <h1
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-4xl sm:text-5xl md:text-6xl font-vintage font-bold tracking-wider text-[#e4d6c3]"
          >
            Teaser Incoming The Rift is Stirring
          </h1>

          {/* Body Text */}
          <p
            data-aos="fade-up"
            data-aos-delay="500"
            className="text-base sm:text-lg leading-relaxed font-vintage text-[#d0c4b0]"
          >
            The first Revolver Rift teaser is about to drop. Step into 1944’s war-torn
            world where cursed monsters roam and Heaven’s and Hell’s warriors clash.
          </p>

          <p
            data-aos="fade-up"
            data-aos-delay="550"
            className="text-base sm:text-lg leading-relaxed font-vintage text-[#d0c4b0]"
          >
            This is only the beginning more weapons, creatures, and high-value targets
            will be revealed soon. The Closed Beta Tech Demo is coming fast, with limited
            slots for those who register in time.
          </p>

          <p
            data-aos="fade-up"
            data-aos-delay="600"
            className="text-base sm:text-lg leading-relaxed font-vintage text-[#d0c4b0]"
          >
            The Rift is waking. Enter if you dare.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner5;
