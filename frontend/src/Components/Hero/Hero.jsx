import React, { useRef, useState, useEffect } from 'react';
import SlantedGallery from './SlantedGallery';
import CinematicSlider from './CinematicSlider';
import skull from '../../assets/skull.png';

// Import our new consolidated API fetcher
import { getHomePage } from '../../api/homeApi';

const HeroCountdown = () => {
    const sectionRef = useRef(null);

    // null = no media yet; CMS media applied after Promise resolves; skull as last resort
    const [bgMedia, setBgMedia] = useState(null);

    useEffect(() => {
        getHomePage().then((data) => {
            const media = data?.hero?.backgroundMedia;

            // If hero media is a video, render immediately.
            if (media?.type === 'video' && media?.url) {
                setBgMedia({
                    type: 'video',
                    url: media.url,
                    mime: media.mime,
                    poster: data?.hero?.backgroundImage || skull,
                });
                return;
            }

            // Otherwise, preload image before rendering to avoid flash.
            let imgSrc = skull;
            if (media?.url) imgSrc = media.url;
            else if (data?.hero?.backgroundImage) imgSrc = data.hero.backgroundImage;

            const img = new Image();
            img.src = imgSrc;
            img.onload = () => {
                setBgMedia({ type: 'image', url: imgSrc });
            };
            img.onerror = () => {
                setBgMedia({ type: 'image', url: skull });
            };
        }).catch(() => {
            // Strapi unavailable — fall back to local skull
            setBgMedia({ type: 'image', url: skull });
        });
    }, []);

    return (
        <div className="bg-black overflow-x-hidden">
            <section ref={sectionRef} className="relative w-full h-[100dvh] md:h-screen font-serif overflow-hidden">

                {/* Background — hidden until CMS or fallback resolves; black base prevents white flash */}
                <div className="absolute inset-0 w-full h-full z-0 bg-black">
                    {bgMedia?.type === 'video' && (
                        <video
                            className="w-full h-full object-cover object-[65%_center] md:object-center"
                            style={{ animation: 'fadeInBg 0.6s ease-in-out forwards' }}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={bgMedia.poster || skull}
                            onError={() => setBgMedia({ type: 'image', url: skull })}
                        >
                            <source src={bgMedia.url} type={bgMedia.mime || 'video/mp4'} />
                        </video>
                    )}

                    {bgMedia?.type !== 'video' && bgMedia?.url && (
                        <img
                            src={bgMedia.url}
                            alt="Hero Background"
                            className="w-full h-full object-cover object-[65%_center] md:object-center"
                            style={{ animation: 'fadeInBg 0.6s ease-in-out forwards' }}
                            loading="eager"
                            fetchPriority="high"
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