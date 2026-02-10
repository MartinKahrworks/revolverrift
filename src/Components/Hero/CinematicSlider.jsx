import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
// import { FaTwitter, FaFacebook, FaInstagram, FaDiscord } from 'react-icons/fa';
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
import gun5 from '../../assets/newassets/GUN5.png';
import winchester from '../../assets/newassets/WINCHESTER1.webp';
import embersBackground from '../../assets/embers_background.gif';

const slides = [
    { id: 1, image: gun1, title: 'Epic Battle Awaits', subtitle: 'Prepare for Glory' },
    { id: 2, image: gun2, title: 'Godlike Warriors', subtitle: 'Unleash Your Power' },
    { id: 3, image: gun3, title: 'Dark Fantasy Realm', subtitle: 'Explore the Abyss' },
    { id: 4, image: gun4, title: 'Legendary Heroes', subtitle: 'Rise to Greatness' },
    { id: 5, image: gun5, title: 'Ultimate Power', subtitle: 'Dominate the Battlefield' },
    { id: 6, image: winchester, title: 'Classic Arsenal', subtitle: 'Timeless Weapons' },
];

const socialLinks = [
    // { icon: FaTwitter, url: '#', label: 'Twitter' },
    // { icon: FaFacebook, url: '#', label: 'Facebook' },
    // { icon: FaInstagram, url: '#', label: 'Instagram' },
    // { icon: FaDiscord, url: '#', label: 'Discord' },
];

const CinematicSlider = () => {
    const sectionRef = useRef(null);

    // Track scroll progress relative to this section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"] // Trigger: when section enters viewport → when it reaches top
    });

    // Map scroll progress to vertical translation for slider only
    // 0% scroll → y = 0px
    // 100% scroll → y = -100px (Slight overlap for blending)
    const sliderY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={sectionRef} className="relative w-full min-h-[100vh] bg-transparent overflow-hidden flex flex-col justify-center pb-32 -mt-[300px] z-30 pointer-events-none">
            {/* Pointer events auto for children to allow interaction */}


            {/* Atmosphere Layers - Removed for seamless overlay */}
            <div className="absolute inset-0 top-[300px] z-0 pointer-events-none">
                <img
                    src={embersBackground}
                    alt="Embers Background"
                    className="w-full h-full object-cover opacity-100 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
            </div>

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
                className="w-full max-w-[1600px] relative z-30 px-4 md:px-0 mx-auto overflow-hidden pointer-events-auto"
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
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false, // Ensure no shadows/overlays
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    className="w-full py-12"
                    speed={1200} // Slower, more cinematic transition
                    breakpoints={{
                        // Mobile: 1 main slide
                        320: {
                            slidesPerView: 1.2,
                            spaceBetween: 0,
                            coverflowEffect: { rotate: 0, stretch: 0, depth: 50, modifier: 1, scale: 0.85 }
                        },
                        // Desktop: Square slider showing exactly 3 images
                        1024: {
                            slidesPerView: 2.2, // Show exactly 3 images (1 center + 2 sides)
                            centeredSlides: true,
                            spaceBetween: -200, // Overlap for seamless connection
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 0,
                                depth: 180, // Moderate depth for visible sides
                                modifier: 1,
                                scale: 0.7 // Side slides are 70% of center - clearly visible
                            }
                        }
                    }}
                >

                    {slides.map((slide, index) => (
                        <SwiperSlide
                            key={index}
                            // Square dimensions to prevent cutting
                            className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[700px] md:h-[700px] relative transition-all duration-700 ease-out"
                        >
                            <div className="w-full h-full relative overflow-hidden shadow-2xl group transition-all duration-500">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-contain transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                    draggable="false"
                                />


                                {/* Content - Only visible when active */}
                                {/* <div className="absolute bottom-0 left-0 w-full p-6 text-center transform translate-y-4 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-500 z-10">
                                    <h3 className="text-[#ff3333] text-sm tracking-widest uppercase mb-1">{slide.subtitle}</h3>
                                    <h2 className="text-white font-godlike text-2xl md:text-4xl drop-shadow-lg">{slide.title}</h2>
                                </div> */}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* Custom Styles for Swiper Pagination/Bullets to match Red theme */}
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

                /* Grunge Borders */
                .grunge-border-bottom {
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    width: 100%;
                    height: 50px;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23000000' fill-opacity='1' d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
                    background-size: cover;
                    background-repeat: no-repeat;
                    z-index: 50;
                }
            `}</style>
            {/* Removed top grunge border for better blending */}
            <div className="grunge-border-bottom mix-blend-multiply opacity-80" />
        </section>
    );
};

export default CinematicSlider;