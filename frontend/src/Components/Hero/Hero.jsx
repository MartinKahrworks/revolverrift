import React, { useRef, useState, useEffect } from 'react';
import SlantedGallery from './SlantedGallery';
import CinematicSlider from './CinematicSlider';
import skull from '../../assets/skull.png';
import { getHomePage } from '../../../api/homeApi';

const HeroCountdown = () => {
    const sectionRef = useRef(null);

    // null = no image yet; CMS image applied after Promise resolves; skull only as last resort
    const [bgImage, setBgImage] = useState(null);

    useEffect(() => {
        getHomePage().then((data) => {
            if (data?.hero?.backgroundImage) {
                // CMS image available — use it
                setBgImage(data.hero.backgroundImage);
            } else {
                // CMS returned no image — fall back to local skull
                setBgImage(skull);
            }
        }).catch(() => {
            // Strapi unavailable — fall back to local skull
            setBgImage(skull);
        });
    }, []);

    return (
        <div className="bg-black overflow-x-hidden">
            <section ref={sectionRef} className="relative w-full h-[100dvh] md:h-screen font-serif overflow-hidden">

                {/* Background — hidden until CMS or fallback resolves; black base prevents white flash */}
                <div className="absolute inset-0 w-full h-full z-0 bg-black">
                    {bgImage && (
                        <img
                            src={bgImage}
                            alt="Hero Background"
                            className="w-full h-full object-cover object-[65%_center] md:object-center"
                            style={{ animation: 'fadeInBg 0.6s ease-in-out forwards' }}
                            loading="eager"
                            decoding="async"
                        />
                    )}
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* Content Container */}
                <div className="relative z-20 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full h-full max-w-screen-2xl mx-auto pointer-events-none">

                    <div className="flex-1 flex flex-col items-center justify-end h-full pb-32 md:pb-40 text-center w-full pointer-events-auto">
                        <div className="max-w-4xl mx-auto px-2 sm:px-4 w-full">

                            {/* Store Logos — temporarily hidden */}
                            {/* <div className="flex items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6">
                                <img src="..." alt="Steam" className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain" />
                                <img src="..." alt="PC Store" className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain" />
                            </div> */}

                        </div>
                    </div>

                </div>

            </section>

            {/* Cinematic Slider — overlaps bottom of hero slightly */}
            <div className="relative z-30 bg-transparent">
                <CinematicSlider />
            </div>

            <SlantedGallery />
        </div>
    );
};

export default HeroCountdown;