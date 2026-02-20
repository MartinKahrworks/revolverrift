import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import weapon1 from "../../assets/newassets/colt 19111.webp";
import weapon2 from "../../assets/newassets/ice pick 3.webp";
import weapon3 from "../../assets/newassets/Mosin_Nagant_3.webp";
import weapon4 from "../../assets/newassets/p08_2.webp";
import weapon5 from "../../assets/newassets/trench_gun_3.webp";
import weapon6 from "../../assets/newassets/WINCHESTER1.webp";
import bgImage from "../../assets/Texturelabs_Grunge_353M.webp";

const weapons = [weapon1, weapon2, weapon3, weapon4, weapon5, weapon6];

export default function GunsShowcase() {
  const containerRef = useRef(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  useEffect(() => {
    let offset = 0;
    const speed = 0.5;
    const loop = () => {
      if (containerRef.current) {
        offset += speed;
        containerRef.current.scrollLeft = offset;
        if (
          offset >=
          containerRef.current.scrollWidth - containerRef.current.clientWidth
        ) {
          offset = 0;
        }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }, []);

  return (
    <div
      className=" py-6 relative  "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Scrolling container */}
      <div
        ref={containerRef}
        className="relative flex bg-cover overflow-hidden no-scrollbar gap-4 px-4 sm:px-6"
        style={{ scrollBehavior: "auto", whiteSpace: "nowrap" }}
      >
        {weapons.concat(weapons).map((weapon, index) => (
          <motion.img
            key={index}
            src={weapon}
            alt={`weapon-${index}`}
            onClick={() => setSelectedWeapon(weapon)}
            className="cursor-pointer rounded-xl hover:scale-105 transition-transform duration-300 object-contain"
            style={{
              width: "200px",
              height: "150px",
            }}
            // Responsive sizing
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 500px"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          />
        ))}
      </div>

      {/* Modal for selected weapon */}
      {selectedWeapon && (
        <div
          onClick={() => setSelectedWeapon(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={selectedWeapon}
            alt="Selected Weapon"
            className="max-w-[95%] max-h-[90vh] rounded-lg shadow-lg transition-transform duration-300"
          />
        </div>
      )}
    </div>
  );
}
