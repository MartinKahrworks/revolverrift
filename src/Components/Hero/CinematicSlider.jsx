import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaTwitter, FaFacebook, FaInstagram, FaDiscord } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import gun1 from '../../assets/newassets/GUN1.png';
import gun2 from '../../assets/newassets/GUN2.png';
import gun3 from '../../assets/newassets/GUN3.png';
import gun4 from '../../assets/newassets/GUN4.png';
import embersBackground from '../../assets/embers_background.gif';

const slides = [
    { id: 1, image: gun1, title: 'Epic Battle Awaits', subtitle: 'Prepare for Glory' },
    { id: 2, image: gun2, title: 'Godlike Warriors', subtitle: 'Unleash Your Power' },
    { id: 3, image: gun3, title: 'Dark Fantasy Realm', subtitle: 'Explore the Abyss' },
    { id: 4, image: gun4, title: 'Legendary Heroes', subtitle: 'Rise to Greatness' },
];

const socialLinks = [
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaDiscord, url: '#', label: 'Discord' },
];

const CinematicSlider = () => {
    const sectionRef = useRef(null);

    // Track scroll progress relative to this section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"] // Trigger: when section enters viewport → when it reaches top
    });

    // Map scroll progress to vertical translation for slider only
    // 0% scroll → y = 0px (no overlap)
    // 100% scroll → y = -150px (subtle overlap with hero)
    const sliderY = useTransform(scrollYProgress, [0, 1], [0, -150]);

    return (
        <section ref={sectionRef} className="relative w-full min-h-[100vh] bg-transparent overflow-hidden flex flex-col justify-center pb-32">
            {/* Background Texture & Pulse */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `url(${embersBackground})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* Dynamic Background gradient - smooth blend from hero */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/70" />
            </div>

            {/* Atmosphere Layers */}
            {/* <div className="absolute inset-0 pointer-events-none z-10 cinematic-vignette mix-blend-multiply" /> */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

            {/* Social Icons - Left Side */}
            {/* <div className="hidden md:flex absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 flex-col gap-8 z-50">
                {socialLinks.map((social, index) => (
                    <a
                        key={index}
                        href={social.url}
                        aria-label={social.label}
                        className="text-white/40 hover:text-[#ff3333] transition-all duration-300 transform hover:scale-125 hover:translate-x-2"
                    >
                        <social.icon className="w-5 h-5" />
                    </a>
                ))}
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto mt-4" />
            </div> */}

            {/* Swiper Container with scroll animation - only the cards move up */}
            <motion.div
                style={{ y: sliderY }}
                className="w-full max-w-[1600px] relative z-30 px-4 md:px-0 mx-auto overflow-hidden"
            >
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'} // Start with auto to let CSS control width
                    loop={true}
                    slideToClickedSlide={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    coverflowEffect={{
                        rotate: 30, // Stronger rotation for side cards
                        stretch: 0,
                        depth: 100, // Reduced depth to keep them larger
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    className="w-full py-12"
                    breakpoints={{
                        // Mobile: 1 main slide
                        320: {
                            slidesPerView: 1.5, // Peek at neighbors
                            coverflowEffect: { rotate: 20, stretch: 0, depth: 100, modifier: 1 }
                        },
                        // Desktop: GodLike Layout (Big Center + 2 Angled Sides)
                        1024: {
                            slidesPerView: 2, // effectively shows 3 because center is wide
                            coverflowEffect: {
                                rotate: 25,
                                stretch: 0,
                                depth: 150,
                                modifier: 1.5,
                                scale: 0.8
                            }
                        }
                    }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide
                            key={index}
                            // Adjusted widths: Center slide needs to be dominant
                            className="w-[300px] h-[450px] sm:w-[400px] sm:h-[600px] md:w-[600px] md:h-[700px] lg:w-[800px] lg:h-[600px] relative transition-all duration-500"
                        >
                            <div className="w-full h-full relative overflow-hidden shadow-2xl group border border-white/5">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    draggable="false"
                                />
                                {/* Overlay / Shadow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                {/* Content - Only visible when active (optional, handled by CSS usually or just show always) */}
                                {/* <div className="absolute bottom-0 left-0 w-full p-6 text-center transform translate-y-4 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-500">
                                    <h3 className="text-[#ff3333] text-sm tracking-widest uppercase mb-1">{slide.subtitle}</h3>
                                    <h2 className="text-white font-godlike text-2xl md:text-4xl">{slide.title}</h2>
                                </div> */}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* Custom Styles for Swiper Pagination/Bullets to match Red theme */}
            <style jsx>{`
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
                    background-image: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0));
                }
            `}</style>
        </section>
    );
};

export default CinematicSlider;
