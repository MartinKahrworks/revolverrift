import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// ── Local fallback images (used when Strapi has 0 cinematic_slider images) ────
import colt from '../../assets/newassets/colt 19111.png';
import icePick from '../../assets/newassets/ice pick 3.png';
import p08 from '../../assets/newassets/p08 2.png';
import trench from '../../assets/newassets/trench_gun_3.webp';
import mosin from '../../assets/newassets/Mosin_Nagant_3.webp';
import winchester from '../../assets/newassets/WINCHESTER1.webp';
import embersBackground from '../../assets/embers_background.gif';

import { getHomePage } from '../../api/homeApi';

// Fallback slides — shown when Strapi cinematic_slider is empty
const FALLBACK_SLIDES = [
    { id: 1, image: colt, title: 'Standard Issue', subtitle: 'Reliable Power' },
    { id: 2, image: icePick, title: 'Silent Killer', subtitle: 'Cold Steel' },
    { id: 3, image: p08, title: 'The Luger', subtitle: 'Precision Engineering' },
    { id: 4, image: trench, title: 'Trench Gun', subtitle: 'Close Quarters' },
    { id: 5, image: mosin, title: 'The Sniper', subtitle: 'Long Range Death' },
    { id: 6, image: winchester, title: 'The Classic', subtitle: 'Wild West Legend' },
];

const CinematicSlider = () => {
    const sectionRef = useRef(null);

    // State initialised with fallback slides — renders immediately without waiting for Strapi
    const [slides, setSlides] = useState(FALLBACK_SLIDES);

    useEffect(() => {
        getHomePage().then((data) => {
            // Only replace slides if Strapi has at least 1 image in cinematic_slider
            if (data?.hero?.cinematicSlides?.length > 0) {
                setSlides(
                    data.hero.cinematicSlides.map((img) => ({
                        id: img.id,
                        image: img.url,
                        title: img.title || '',
                        subtitle: '',
                    }))
                );
            }
            // If length === 0 → FALLBACK_SLIDES stay as-is
        });
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    // Slight upward movement as the section scrolls into view
    const sliderY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[60vh] bg-transparent overflow-hidden flex flex-col justify-center pb-16 -mt-[150px] z-30 pointer-events-none"
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

            {/* Swiper with scroll-driven Y offset */}
            <motion.div
                style={{ y: sliderY }}
                className="w-full max-w-[1200px] relative z-30 px-4 md:px-0 mx-auto overflow-hidden pointer-events-auto"
            >
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={slides.length > 1}
                    slideToClickedSlide={true}
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
                            coverflowEffect: { rotate: 0, stretch: 0, depth: 50, modifier: 1, scale: 0.85 }
                        },
                        1024: {
                            slidesPerView: 2.2,
                            centeredSlides: true,
                            spaceBetween: -150,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 0,
                                depth: 150,
                                modifier: 1,
                                scale: 0.7
                            }
                        }
                    }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide
                            key={slide.id ?? index}
                            className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] relative transition-all duration-700 ease-out"
                        >
                            <div className="w-full h-full relative overflow-hidden shadow-2xl group transition-all duration-500 bg-transparent">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-contain transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                    draggable="false"
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
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
            `}</style>
        </section>
    );
};

export default CinematicSlider;