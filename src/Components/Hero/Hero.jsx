import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import poster2 from '../../assets/posters/fullposter1.png';
import movingVideo from '../../assets/posters/moving video.mp4';
import crackedBox from '../../assets/image.png';
import SlantedGallery from './SlantedGallery';
import CinematicSlider from './CinematicSlider';
import bgGrunge from '../../assets/Texturelabs_Grunge_353M.webp';

import ShopPreview from '../Shop/ShopPreview';

// Scroll-linked wrapper component for carousel overlap effect
const ScrollLinkedCarouselWrapper = ({ children }) => {
    const targetRef = useRef(null);

    // Track scroll progress relative to this component
    // Start tracking when component enters viewport, end when it reaches overlap position
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "start start"] // Trigger: when carousel enters viewport → when it reaches top
    });

    // Map scroll progress to vertical translation
    // 0% scroll → y = 0px (no overlap)
    // 100% scroll → y = -400px (full overlap with hero, matching GodLike visual)
    const y = useTransform(scrollYProgress, [0, 1], [0, -400]);

    return (
        <motion.div
            ref={targetRef}
            style={{ y }} // GPU-accelerated transform
            className="relative z-30" // Ensure carousel appears above hero
        >
            {children}
        </motion.div>
    );
};

const HeroCountdown = () => {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // const calculateTimeLeft = () => {
    //   const targetDate = new Date('2025-08-29T13:00:00+02:00');
    //   const difference = targetDate - new Date();
    //   let timeLeft = {};

    //   if (difference > 0) {
    //     timeLeft = {
    //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    //       hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
    //       minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
    //     };
    //   }
    //   return timeLeft;
    // };

    // const [timeLeft, setTimeLeft] = useState({
    //   days: 1,
    //   hours: '05',
    //   minutes: '30',
    // });

    return (
        <div className="bg-black overflow-x-hidden">
            <section ref={sectionRef} className="relative w-full text-white font-serif overflow-hidden" style={{ minHeight: '100vh', maxWidth: '100vw' }}>
                {/* Background Video */}
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    src={movingVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                {/* Background Image (Commented Out) */}
                {/* <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat z-0"
                    style={{
                        backgroundImage: `url(${poster2})`,
                        backgroundPosition: isMobile ? '40% center' : 'center center',
                        minHeight: '100vh'
                    }}
                /> */}

                {/* 📜 Content */}
                <div className="relative z-20 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full min-h-screen max-w-screen-2xl mx-auto">

                    {/* Left/Center Content */}
                    <div className="flex-1 flex flex-col items-center justify-end h-full pb-32 md:pb-40 text-center w-full">


                        {/* Bottom message */}
                        <div className="max-w-4xl mx-auto px-2 sm:px-4 w-full">
                            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed mb-4 sm:mb-6 md:mb-8 px-2">
                                Hardcore PvPvE extraction shooter game. <br />
                                Wishlisting available soon on PC stores.
                            </h2>

                            {/* Store Logos */}
                            <div className="flex items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6">
                                <img
                                    src="https://res.cloudinary.com/df7s2xmz1/image/upload/v1765701093/24babc47-9fc8-4b0a-a09f-74e7e51b09a6.png"
                                    alt="Steam"
                                    className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                                />
                                <img
                                    src="https://res.cloudinary.com/df7s2xmz1/image/upload/v1765705048/image-removebg-preview_su2ttv.png"
                                    alt="PC Store"
                                    className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Shop Preview (Hidden on tablet and mobile) */}
                    {<div className="hidden lg:block absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-30 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards] max-w-[300px]">
                        <ShopPreview />
                    </div>}
                </div>

                {/* Film Border Corners - Grunge Texture */}
                <div
                    className="absolute top-0 left-0 w-32 md:w-40 lg:w-48 h-32 md:h-40 lg:h-48 pointer-events-none z-40 opacity-60"
                    style={{
                        backgroundImage: `url(${bgGrunge})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top left',
                        maskImage: 'linear-gradient(135deg, black 30%, transparent 70%)',
                        WebkitMaskImage: 'linear-gradient(135deg, black 30%, transparent 70%)'
                    }}
                />
                <div
                    className="absolute top-0 right-0 w-32 md:w-40 lg:w-48 h-32 md:h-40 lg:h-48 pointer-events-none z-40 opacity-60"
                    style={{
                        backgroundImage: `url(${bgGrunge})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top right',
                        maskImage: 'linear-gradient(225deg, black 30%, transparent 70%)',
                        WebkitMaskImage: 'linear-gradient(225deg, black 30%, transparent 70%)'
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 w-32 md:w-40 lg:w-48 h-32 md:h-40 lg:h-48 pointer-events-none z-40 opacity-60"
                    style={{
                        backgroundImage: `url(${bgGrunge})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom left',
                        maskImage: 'linear-gradient(45deg, black 30%, transparent 70%)',
                        WebkitMaskImage: 'linear-gradient(45deg, black 30%, transparent 70%)'
                    }}
                />
                <div
                    className="absolute bottom-0 right-0 w-32 md:w-40 lg:w-48 h-32 md:h-40 lg:h-48 pointer-events-none z-40 opacity-60"
                    style={{
                        backgroundImage: `url(${bgGrunge})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom right',
                        maskImage: 'linear-gradient(315deg, black 30%, transparent 70%)',
                        WebkitMaskImage: 'linear-gradient(315deg, black 30%, transparent 70%)'
                    }}
                />

                {/* Bottom Fade Gradient */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-30 pointer-events-none" />
            </section>

            {/* Scroll-linked carousel wrapper - creates cinematic overlap effect */}
            {/* As user scrolls down, carousel moves upward to overlap hero bottom */}
            {/* Motion is GPU-accelerated and tied strictly to scroll (no listeners) */}
            <ScrollLinkedCarouselWrapper>
                <CinematicSlider />
            </ScrollLinkedCarouselWrapper>

            <SlantedGallery />
        </div >
    );
};

export default HeroCountdown;