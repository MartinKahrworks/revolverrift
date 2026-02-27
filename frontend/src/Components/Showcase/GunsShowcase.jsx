import React, { useEffect, useRef, useState } from "react";

import weapon1 from "../../assets/newassets/colt 19111.webp";
import weapon2 from "../../assets/newassets/ice pick 3.webp";
import weapon3 from "../../assets/newassets/Mosin_Nagant_3.webp";
import weapon4 from "../../assets/newassets/p08_2.webp";
import weapon5 from "../../assets/newassets/trench_gun_3.webp";
import weapon6 from "../../assets/newassets/WINCHESTER1.webp";

const WEAPONS = [
  { img: weapon1, name: "Colt M1911", category: "Pistol" },
  { img: weapon2, name: "Ice Pick", category: "Melee" },
  { img: weapon3, name: "Mosin-Nagant", category: "Rifle" },
  { img: weapon4, name: "P08 Luger", category: "Pistol" },
  { img: weapon5, name: "Trench Gun", category: "Shotgun" },
  { img: weapon6, name: "Winchester", category: "Rifle" },
];

export default function GunsShowcase() {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const [spotlight, setSpotlight] = useState(null);

  // Smooth infinite scroll
  useEffect(() => {
    const speed = 0.6;
    const loop = () => {
      if (containerRef.current && !isPausedRef.current) {
        offsetRef.current += speed;
        const half = containerRef.current.scrollWidth / 2;
        if (offsetRef.current >= half) offsetRef.current = 0;
        containerRef.current.scrollLeft = offsetRef.current;
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // ESC to close spotlight
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSpotlight(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const doubled = [...WEAPONS, ...WEAPONS];

  return (
    <>
      <div className="relative w-full overflow-hidden bg-[#050505] border-t border-b border-white/5 py-10">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          className="flex gap-6 overflow-hidden no-scrollbar"
          style={{ scrollBehavior: "auto", whiteSpace: "nowrap" }}
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; }}
        >
          {doubled.map((weapon, idx) => (
            <div
              key={idx}
              onClick={() => setSpotlight(weapon)}
              className="group flex-shrink-0 relative flex flex-col items-center gap-3 cursor-pointer"
              style={{ width: "200px" }}
            >
              {/* Card */}
              <div className="relative w-full h-[130px] border border-white/5 group-hover:border-red-600/40 bg-[#0d0d0d] transition-all duration-300 overflow-hidden flex items-center justify-center">
                <img
                  src={weapon.img}
                  alt={weapon.name}
                  loading="lazy"
                  className="h-[110px] w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                />
                {/* Red glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at center, rgba(220,38,38,0.08) 0%, transparent 70%)" }}
                />
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-500" />
              </div>

              {/* Labels */}
              <div className="text-center">
                <p className="text-white/80 font-mono text-[11px] uppercase tracking-widest group-hover:text-white transition-colors">
                  {weapon.name}
                </p>
                <p className="text-white/25 font-mono text-[9px] uppercase tracking-widest mt-0.5">
                  {weapon.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weapon Spotlight Modal */}
      {spotlight && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSpotlight(null)}
        >
          {/* Radial glow behind image */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(220,38,38,0.12) 0%, transparent 70%)" }}
          />

          <button
            onClick={() => setSpotlight(null)}
            className="absolute top-5 right-6 text-white/40 hover:text-red-500 font-mono text-sm tracking-widest uppercase transition-colors"
          >
            ✕ ESC
          </button>

          <div className="flex flex-col items-center gap-6 relative z-10" onClick={(e) => e.stopPropagation()}>
            <img
              src={spotlight.img}
              alt={spotlight.name}
              className="max-h-[65vh] max-w-[85vw] object-contain drop-shadow-[0_0_40px_rgba(220,38,38,0.25)]"
            />
            <div className="text-center border-t border-white/10 pt-5 w-48">
              <p className="text-red-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-1">{spotlight.category}</p>
              <p className="text-white font-custom text-xl uppercase tracking-wider">{spotlight.name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
