import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// ── Local fallback images ────────────────────────────────────────────────────
import colt from '../../assets/newassets/colt 19111.png';
import icePick from '../../assets/newassets/ice pick 3.png';
import p08 from '../../assets/newassets/p08 2.png';
import trench from '../../assets/newassets/trench_gun_3.webp';
import mosin from '../../assets/newassets/Mosin_Nagant_3.webp';
import winchester from '../../assets/newassets/WINCHESTER1.webp';
import embersBackground from '../../assets/embers_background.gif';

import { getHomePage } from '../../api/homeApi';

const FALLBACK_SLIDES = [
    { id: 1, mediaType: 'image', mediaSrc: colt, title: 'Standard Issue', subtitle: 'Reliable Power' },
    { id: 2, mediaType: 'image', mediaSrc: icePick, title: 'Silent Killer', subtitle: 'Cold Steel' },
    { id: 3, mediaType: 'image', mediaSrc: p08, title: 'The Luger', subtitle: 'Precision Engineering' },
    { id: 4, mediaType: 'image', mediaSrc: trench, title: 'Trench Gun', subtitle: 'Close Quarters' },
    { id: 5, mediaType: 'image', mediaSrc: mosin, title: 'The Sniper', subtitle: 'Long Range Death' },
    { id: 6, mediaType: 'image', mediaSrc: winchester, title: 'The Classic', subtitle: 'Wild West Legend' },
];

// Minimum slides required for Swiper loop mode to create left+right clones.
// With slidesPerView:'auto' and centeredSlides, you need at least 5 for stable UI.
const MIN_SLIDES_FOR_LOOP = 5;

/**
 * Ensures there are at least MIN_SLIDES_FOR_LOOP slides by repeating the array.
 * Swiper loop mode breaks if there aren't enough slides to create clones —
 * this is the PRIMARY cause of the broken side-image bug.
 */
function ensureMinSlides(slides) {
    if (!slides || slides.length === 0) return slides;
    let result = [...slides];
    while (result.length < MIN_SLIDES_FOR_LOOP) {
        result = [...result, ...slides];
    }
    return result;
}

const CinematicSlider = () => {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);

    const [slides, setSlides] = useState(FALLBACK_SLIDES);
    const [swiperKey, setSwiperKey] = useState('fallback');

    // safeSlides is what actually gets rendered — always has enough for loop mode
    const safeSlides = useMemo(() => ensureMinSlides(slides), [slides]);

    const handleSwiperInit = useCallback((swiper) => {
        // Force Swiper to remeasure slide dimensions after CSS is applied
        requestAnimationFrame(() => swiper.update());
    }, []);

    useEffect(() => {
        getHomePage().then((data) => {
            if (data?.hero?.cinematicSlides?.length > 0) {
                const newSlides = data.hero.cinematicSlides.map((img) => ({
                    id: img.id,
                    mediaType: img.type === 'video' ? 'video' : 'image',
                    mediaSrc: img.url,
                    mime: img.mime,
                    title: img.title || '',
                    subtitle: '',
                }));

                // Preload all images before touching the DOM
                const preloadPromises = newSlides.map((slide) => {
                    if (slide.mediaType !== 'image') return Promise.resolve();
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.onload = resolve;
                        img.onerror = resolve;
                        img.src = slide.mediaSrc;
                    });
                });

                Promise.all(preloadPromises).then(() => {
                    const el = wrapperRef.current;
                    if (!el) return;

                    // Fade out → swap data + remount Swiper → fade in
                    el.animate(
                        [{ opacity: 1 }, { opacity: 0 }],
                        { duration: 300, easing: 'ease-out', fill: 'forwards' }
                    ).finished.then(() => {
                        setSlides(newSlides);
                        setSwiperKey('strapi');

                        // Double rAF ensures React has committed the new DOM before fade-in
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                el.animate(
                                    [{ opacity: 0 }, { opacity: 1 }],
                                    { duration: 400, easing: 'ease-in', fill: 'forwards' }
                                );
                            });
                        });
                    });
                });
            }
        });
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const sliderY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[50vh] bg-transparent flex flex-col justify-center pb-10 md:pb-16 -mt-[50px] sm:-mt-[60px] md:-mt-[70px] z-30 pointer-events-none"
        >
            {/* Embers GIF Background */}
            <img
                src={embersBackground}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen pointer-events-none z-0"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)'
                }}
            />

            {/* Scroll parallax wrapper — opacity handled separately to avoid FM conflict */}
            <motion.div
                style={{ y: sliderY }}
                className="w-full max-w-[1920px] relative z-30 px-4 md:px-0 mx-auto pointer-events-auto"
            >
                {/* Plain div for opacity crossfade — avoids forwarding animation props to DOM */}
                <div ref={wrapperRef} style={{ position: 'relative' }}>
                    <Swiper
                        key={swiperKey}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        loop={safeSlides.length >= MIN_SLIDES_FOR_LOOP}
                        slideToClickedSlide={true}
                        onSwiper={handleSwiperInit}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                        className="w-full py-8"
                        speed={1200}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.2,
                                spaceBetween: 0,
                                coverflowEffect: { rotate: 15, stretch: 0, depth: 50, modifier: 1, scale: 0.85 }
                            },
                            1024: {
                                slidesPerView: 2.2,
                                centeredSlides: true,
                                spaceBetween: -100,
                                coverflowEffect: {
                                    rotate: 20,
                                    stretch: 0,
                                    depth: 150,
                                    modifier: 1,
                                    scale: 0.8
                                }
                            }
                        }}
                    >
                        {safeSlides.map((slide, index) => (
                            <SwiperSlide
                                key={index}
                                className="w-[88vw] h-[60vw] sm:w-[70vw] sm:h-[45vw] md:w-[55vw] md:h-[35vw] lg:w-[45vw] lg:h-[28vw] xl:w-[45vw] xl:h-[25vw] relative transition-all duration-700 ease-out shrink-0"
                                style={{ background: 'transparent' }}
                            >
                                <div
                                    className="w-full h-full relative group transition-all duration-500"
                                    style={{
                                        background: 'transparent',
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
                                        transform: 'translateZ(0)'
                                    }}
                                >
                                    {slide.mediaType === 'video' ? (
                                        <video
                                            src={slide.mediaSrc}
                                            className="w-full h-full object-fill transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                        >
                                            <source src={slide.mediaSrc} type={slide.mime || 'video/mp4'} />
                                        </video>
                                    ) : (
                                        <img
                                            src={slide.mediaSrc}
                                            alt={slide.title}
                                            className="w-full h-full object-fill transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                            draggable="false"
                                            loading="eager"
                                            decoding="async"
                                        />
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </motion.div>

            <style>{`
                .swiper-pagination-bullet {
                    background: white;
                    opacity: 0.3;
                    width: 10px;
                    height: 10px;
                    transition: all 0.3s;
                }
                .swiper-pagination-bullet-active {
                    background: #ff3333;
                    opacity: 1;
                    width: 24px;
                    border-radius: 5px;
                }
                .swiper-slide-shadow-left, .swiper-slide-shadow-right {
                    background-image: none !important;
                }
                .swiper-wrapper {
                    background: transparent !important;
                }
                .swiper-slide {
                    background: transparent !important;
                }
                .swiper {
                    background: transparent !important;
                    overflow: visible !important;
                }
            `}</style>
        </section>
    );
};

export default CinematicSlider;