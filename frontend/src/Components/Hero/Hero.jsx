import React, { useEffect, useState, useRef } from 'react';
import poster2 from '../../assets/posters/fullposter1.png';
import movingVideo from '../../assets/posters/moving video.mp4';
import crackedBox from '../../assets/image.png';
import SlantedGallery from './SlantedGallery';
import CinematicSlider from './CinematicSlider';
import bgGrunge from '../../assets/Texturelabs_Grunge_353M.webp';
import comingSoonHero from '../../assets/shot2.1.webp';
import skull from '../../assets/skull.png';

import ShopPreview from '../Shop/ShopPreview';


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
                {/* Background Video (Commented Out) */}
                {/* <video
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    src={movingVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                /> */}

                {/* Background Image - COMING SOON */}
                <div
                    className="absolute top-0 left-0 w-full h-[100vh] bg-cover bg-no-repeat z-0"
                    style={{
                        backgroundImage: `url(${skull})`,
                        backgroundPosition: isMobile ? '40% center' : 'center center',
                        minHeight: '100vh'
                    }}
                />

                {/* 📜 Content */}
                <div className="relative z-20 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full min-h-screen max-w-screen-2xl mx-auto">

                    {/* Left/Center Content */}
                    <div className="flex-1 flex flex-col items-center justify-end h-full pb-32 md:pb-40 text-center w-full">


                        {/* Bottom message */}
                        <div className="max-w-4xl mx-auto px-2 sm:px-4 w-full">


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
                    {/* <div className="hidden lg:block absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-30 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards] max-w-[300px]">
                        <ShopPreview />
                    </div> */}
                </div>




            </section>

            {/* Cinematic Slider - scroll animation is now inside the component */}
            <CinematicSlider />

            <SlantedGallery />
        </div >
    );
};

export default HeroCountdown;