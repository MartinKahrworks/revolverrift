import React, { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import poster from '../../assets/posters/poster2.png';          // fallback thumbnail
import trailerVideo from '../../assets/newassets/1.mp4';        // fallback video
import embersBackground from '../../assets/embers_background.gif';
import { getHomePage, FALLBACK_TRAILER } from '../../api/homeApi';

const Trailer = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    // State initialised with fallback — local assets always render first
    const [trailerData, setTrailerData] = useState(FALLBACK_TRAILER);

    useEffect(() => {
        getHomePage().then((data) => {
            if (!data) return; // Strapi unavailable — fallback stays
            if (data.trailer) setTrailerData(data.trailer);
        });
    }, []);

    // Resolve which video and thumbnail to use
    const videoSrc = trailerData.videoUrl || trailerVideo;
    const thumbnailSrc = trailerData.thumbnailUrl || poster;

    return (
        <section className="relative w-full bg-gradient-to-b from-[#070707] to-black overflow-hidden flex items-center justify-center py-10 md:py-16 px-4 md:px-8 border-y border-white/5">
            
            {/* Radial Gradient Spotlight */}
            <div 
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,1) 100%)'
                }}
            />

            {/* Animated Embers Background - More Subtle */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-screen"
                style={{
                    backgroundImage: `url(${embersBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Centered Container with 16:9 aspect ratio + Cinematic Frame */}
            <div className="relative w-full max-w-4xl aspect-video group z-20 bg-black border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Thumbnail — CMS image if uploaded, else local poster2.png */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                    style={{ backgroundImage: `url(${thumbnailSrc})` }}
                />

                {/* Content - Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <button
                        onClick={() => setIsPlaying(true)}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:text-[#ff3333] hover:border-[#ff3333] hover:scale-110 transition-all duration-300 backdrop-blur-sm bg-black/20"
                    >
                        <FaPlay className="w-8 h-8 md:w-10 md:h-10 ml-1" />
                    </button>
                    <h2 className="mt-6 md:mt-8 text-2xl md:text-5xl font-godlike uppercase tracking-wider text-white drop-shadow-lg">
                        Watch Trailer
                    </h2>
                </div>

                {/* Video Modal Player */}
                {isPlaying && (
                    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-8 md:p-12">
                        <div className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl border border-white/10">
                            <button
                                onClick={() => setIsPlaying(false)}
                                className="absolute top-2 right-2 md:top-4 md:right-4 z-50 text-white hover:text-[#ff3333] font-bold text-xs md:text-sm uppercase tracking-widest bg-black/80 backdrop-blur-sm px-3 py-2 rounded border border-white/20 hover:border-[#ff3333] transition-all"
                            >
                                Close [X]
                            </button>
                            <video
                                className="w-full h-full"
                                src={videoSrc}
                                controls
                                autoPlay
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Trailer;
