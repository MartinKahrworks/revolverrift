import React, { useEffect } from 'react';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import heroBackground from '../../assets/poster1.png';

const GodLikeHero = () => {
    useEffect(() => {
        // Add fade-in animation class to body
        document.body.classList.add('hero-loaded');
    }, []);

    return (
        <section className="godlike-hero relative w-full h-screen overflow-hidden">
            {/* Background Image - No Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${heroBackground})`,
                    backgroundPosition: '40% center',
                }}
            >
            </div>

            {/* Social Media Icons - Left Edge */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-6">
                <a
                    href="#"
                    className="social-icon text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Facebook"
                >
                    <FaFacebook size={24} />
                </a>
                <a
                    href="#"
                    className="social-icon text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Twitter"
                >
                    <FaTwitter size={24} />
                </a>
                <a
                    href="#"
                    className="social-icon text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Pinterest"
                >
                    <FaPinterest size={24} />
                </a>
            </div>

            {/* Main Content - Centered */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
                {/* Subtitle */}
                <h2 className="hero-subtitle text-white/90 text-xl md:text-2xl lg:text-3xl font-light mb-10 md:mb-14 max-w-3xl leading-relaxed">
                    Hardcore PvPvE extraction shooter game
                </h2>

                {/* CTA Buttons */}
                <div className="hero-buttons flex flex-col sm:flex-row gap-4 md:gap-6">
                    <button className="godlike-btn-primary group relative px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold uppercase tracking-wider overflow-hidden">
                        <span className="relative z-10 text-[#d4a574] group-hover:text-black transition-colors duration-300">
                            Purchase
                        </span>
                        <span className="absolute inset-0 border-2 border-[#d4a574]"></span>
                        <span className="absolute inset-0 bg-[#d4a574] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </button>

                    <button className="godlike-btn-secondary group relative px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold uppercase tracking-wider overflow-hidden">
                        <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
                            Learn More
                        </span>
                        <span className="absolute inset-0 border-2 border-white"></span>
                        <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </button>
                </div>

                {/* Store Logos */}
                <div className="hero-stores flex items-center justify-center gap-4 md:gap-6 mt-10 md:mt-14">
                    <img
                        src="https://res.cloudinary.com/df7s2xmz1/image/upload/v1765701093/24babc47-9fc8-4b0a-a09f-74e7e51b09a6.png"
                        alt="Steam"
                        className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                    <img
                        src="https://res.cloudinary.com/df7s2xmz1/image/upload/v1765705048/image-removebg-preview_su2ttv.png"
                        alt="Epic Games"
                        className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hero-scroll-indicator">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    );
};

export default GodLikeHero;
