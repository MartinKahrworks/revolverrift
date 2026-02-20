import React from "react";

const Banner6 = () => {
  return (
    <div className="relative bg-black flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full">
        <div className="space-y-12 text-center text-[#e4d6c3]">

          {/* Hell Deputies */}
          <div className="space-y-6">
            <h2
              data-aos="fade-up"
              data-aos-delay="800"
              className="text-3xl sm:text-4xl md:text-5xl font-vintage font-semibold"
            >
              The Hell Deputies
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="900"
              className="text-base sm:text-lg md:text-xl leading-relaxed font-vintage text-[#d0c4b0] px-2 sm:px-6"
            >
              <strong>Condemned. Released. Unleashed.</strong> Once damned souls, now Hell’s elite killers. The Hell Deputies are chaos made flesh brutal enforcers of infernal will, driven by vengeance and power. They strike without warning and kill without hesitation, wielding cursed tools and dark knowledge born in fire.
            </p>
            <ul
              data-aos="fade-up"
              data-aos-delay="1000"
              className="list-disc list-inside text-base sm:text-lg md:text-xl text-[#d0c4b0] font-vintage space-y-2 px-4 sm:px-6"
            >
              <li>Aggressive, relentless, and unpredictable</li>
              <li>Demonic powers and cursed equipment</li>
              <li>Fight for freedom or burn with the weak</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner6;
