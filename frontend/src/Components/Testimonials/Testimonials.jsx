import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
  EffectCoverflow,
  Mousewheel,
} from "swiper/modules";
import { motion } from "framer-motion";

import logo1 from "../../assets/logo/Logo1.png";
import logo2 from "../../assets/logo/Logo2.png";
import logo3 from "../../assets/logo/Logo3.png";
import logo4 from "../../assets/logo/Logo4.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';
import Banner7 from "../Banner/Banner7";
import { getCreditsPage } from "../../api/creditsApi";

// ─── Fallback data (used when Strapi is unavailable) ─────────────────────────
const FALLBACK_QUOTES = [
  { id: 1, name: "Lead Narrative Designer", role: "NARRATIVE_OP", quote: "Sometimes we scream ideas across the room like maniacs and that's how a Devil Chair is born." },
  { id: 2, name: "Game Programmer", role: "CODE_WIZARD", quote: "Balance is important. But chaos? Chaos is beautiful." },
  { id: 3, name: "Level Design Director", role: "WORLD_BUILDER", quote: "We didn't want safe. We wanted unforgettable." },
  { id: 4, name: "Creative Director", role: "VISIONARY", quote: "Most games have lore. We've got an apocalypse. And trust me, it's a lot more fun than average bedtime story." },
  { id: 5, name: "Combat Designer", role: "COMBAT_LOGIC", quote: "You think this is a war? No. It's a blood feast. And you're invited, whether you're ready or not." },
  { id: 6, name: "Game Director", role: "OVERLORD", quote: "Designing Revolver Rift is like teaching a wolf to hunt. But instead of a wolf, it's a warlord. And instead of hunting... it's chaos. But it works." },
];

const FALLBACK_PARTNERS = [
  { id: 1, name: "Partner 1", logoUrl: null },
  { id: 2, name: "Partner 2", logoUrl: null },
  { id: 3, name: "Partner 3", logoUrl: null },
  { id: 4, name: "Partner 4", logoUrl: null },
];

const FALLBACK_LOGO_IMGS = [logo1, logo2, logo3, logo4];

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block group cursor-default">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 animate-glitch-1 clip-path-notch">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-0 group-hover:opacity-70 animate-glitch-2 clip-path-notch">
        {text}
      </span>
    </div>
  );
};

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState(FALLBACK_QUOTES);
  const [partners, setPartners] = useState(FALLBACK_PARTNERS);
  const [pageTitle, setPageTitle] = useState("DEVELOPER ARCHIVES");
  const [pageSubtitle, setPageSubtitle] = useState("Echoes of Creation");
  const [useFallbackLogos, setUseFallbackLogos] = useState(true);

  useEffect(() => {
    getCreditsPage().then((data) => {
      if (!data) return; // Strapi unavailable — fallback already set

      if (data.quotes.length > 0) setTestimonials(data.quotes);
      if (data.partners.length > 0) {
        setPartners(data.partners);
        setUseFallbackLogos(false); // use Strapi logos
      }
      if (data.pageTitle) setPageTitle(data.pageTitle);
      if (data.pageSubtitle) setPageSubtitle(data.pageSubtitle);
    });
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center overflow-hidden bg-black text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#0a0a0a]/80 to-black/95 z-0"></div>

      {/* Scanline/Grid Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0 mix-blend-overlay"></div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%]"></div>

      <div className="relative z-10 w-full max-w-7xl pt-24 pb-12 px-4 flex flex-col items-center min-h-screen justify-center">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 relative"
        >
          <div className="inline-block px-4 py-1 mb-6 border-l-4 border-r-4 border-[#b89a6f]/40 bg-black/60 backdrop-blur-md">
            <span className="text-[#b89a6f] text-[10px] md:text-xs tracking-[0.4em] font-mono uppercase">
               // System_Log: Dev_Insights //
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#e4d6c3] font-custom tracking-wider drop-shadow-[0_0_10px_rgba(228,214,195,0.3)]">
            <GlitchText text={pageTitle} />
          </h1>

          <div className="mt-6 flex items-center justify-center gap-4 opacity-70">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#b89a6f]"></div>
            <p className="text-sm md:text-base text-gray-400 font-custom tracking-[0.2em] uppercase">
              {pageSubtitle}
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#b89a6f]"></div>
          </div>
        </motion.div>

        {/* Swiper Carousel */}
        <div className="w-full relative px-2 md:px-0">
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow, Mousewheel]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 1.2,
              slideShadows: false,
            }}
            loop={true}
            centeredSlides={true}
            grabCursor={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
            }}
            mousewheel={{ forceToAxis: true, sensitivity: 1 }}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.2 },
              1280: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="group py-10">
                <div className="relative h-full transition-all duration-500 select-none">

                  {/* Card Container with Clip-path */}
                  <div
                    className="relative overflow-hidden h-full bg-[#0f0f0f]/90 backdrop-blur-md border border-[#333] transition-all duration-300"
                    style={{
                      clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
                    }}
                  >
                    {/* Inner Content */}
                    <div className="relative h-full p-8 flex flex-col items-center text-center bg-gradient-to-b from-[#1a1a1a] via-[#0d0d0d] to-black">

                      {/* Decorative Tech Corner Lines */}
                      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#b89a6f]/60"></div>
                      <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-[#b89a6f]/60"></div>
                      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-[#b89a6f]/60"></div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#b89a6f]/60"></div>

                      {/* Rank/Role Badge */}
                      <div className="mt-2 mb-8 px-4 py-1.5 bg-[#b89a6f]/5 border border-[#b89a6f]/20 rounded-sm text-[9px] md:text-[10px] tracking-[0.3em] text-[#b89a6f] font-mono uppercase shadow-[0_0_10px_rgba(184,154,111,0.1)]">
                        ID: {t.role}
                      </div>

                      {/* Quote Icon */}
                      <div className="text-5xl text-[#5c1e1e] mb-6 opacity-60 leading-none font-serif">
                        "
                      </div>

                      {/* Quote Text */}
                      <p className="flex-1 text-base md:text-lg text-gray-300 font-light leading-loose mb-10 italic relative z-10" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                        {t.quote}
                      </p>

                      {/* Author Name */}
                      <div className="mt-auto relative z-10 w-full pt-6 border-t border-white/5">
                        <h3 className="text-xl font-bold text-[#f2d3b0] tracking-widest font-custom uppercase">
                          {t.name}
                        </h3>
                      </div>

                      {/* Hover Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#b89a6f]/10 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Glowing Border on hover */}
                  <div
                    className="absolute -inset-[1px] bg-gradient-to-b from-[#b89a6f] to-[#5c1e1e] opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300 -z-10"
                    style={{
                      clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
                    }}
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="custom-pagination flex justify-center gap-2 mt-8 z-20 relative"></div>
        </div>

        {/* Partners Section */}
        <div className="w-full mt-20 border-t border-[#b89a6f]/20 pt-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-[#b89a6f]/50 text-xs tracking-widest font-mono uppercase">
            // Allied_Factions //
          </div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {useFallbackLogos
              ? FALLBACK_LOGO_IMGS.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, opacity: 1, filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}
                  className="w-20 md:w-28 h-20 md:h-28 flex items-center justify-center"
                >
                  <img src={src} alt={`Partner ${i + 1}`} className="max-w-full max-h-full object-contain" />
                </motion.div>
              ))
              : partners.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ scale: 1.1, opacity: 1, filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}
                  className="w-20 md:w-28 h-20 md:h-28 flex items-center justify-center"
                >
                  {p.logoUrl ? (
                    <img src={p.logoUrl} alt={p.name} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center text-white/20 text-xs font-mono">
                      {p.name}
                    </div>
                  )}
                </motion.div>
              ))
            }
          </div>
        </div>

        <div className="mt-16 w-full opacity-80 hover:opacity-100 transition-opacity duration-500">
          <Banner7 />
        </div>

      </div>

      <style>{`
        .clip-path-notch {
          clip-path: polygon(0 0, 100% 0, 100% 45%, 98% 50%, 100% 55%, 100% 100%, 0 100%);
        }

        .swiper-slide {
          height: 520px !important;
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          opacity: 0.3;
          transform: scale(0.8);
          filter: blur(4px) grayscale(0.8);
        }

        .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
          filter: blur(0) grayscale(0);
          z-index: 20;
        }

        .swiper-slide-prev, .swiper-slide-next {
          opacity: 0.6;
          transform: scale(0.9);
          filter: blur(1px) grayscale(0.4);
        }

        .swiper-pagination-bullet {
          width: 24px;
          height: 4px;
          background: #444;
          opacity: 1;
          margin: 0 !important;
          border-radius: 0;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .swiper-pagination-bullet::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background: #b89a6f;
          transition: width 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          width: 40px;
          background: #333;
        }

        .swiper-pagination-bullet-active::after {
          width: 100%;
        }

        @keyframes glitch-anim-1 {
          0%   { clip-path: inset(20% 0 80% 0); transform: translate(-2px,  1px); }
          20%  { clip-path: inset(60% 0 10% 0); transform: translate( 2px, -1px); }
          40%  { clip-path: inset(40% 0 50% 0); transform: translate(-2px,  2px); }
          60%  { clip-path: inset(80% 0  5% 0); transform: translate( 2px, -2px); }
          80%  { clip-path: inset(10% 0 70% 0); transform: translate(-1px,  1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate( 1px, -1px); }
        }

        @keyframes glitch-anim-2 {
          0%   { clip-path: inset(10% 0 60% 0); transform: translate( 2px, -1px); }
          20%  { clip-path: inset(80% 0  5% 0); transform: translate(-2px,  2px); }
          40%  { clip-path: inset(30% 0 20% 0); transform: translate( 2px,  1px); }
          60%  { clip-path: inset(10% 0 80% 0); transform: translate(-1px, -2px); }
          80%  { clip-path: inset(50% 0 30% 0); transform: translate( 1px,  2px); }
          100% { clip-path: inset(70% 0 10% 0); transform: translate(-2px,  1px); }
        }

        .animate-glitch-1 {
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
        }
        .animate-glitch-2 {
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSlider;
