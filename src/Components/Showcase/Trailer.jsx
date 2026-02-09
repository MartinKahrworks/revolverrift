import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import poster from '../../assets/posters/poster2.png'; // Using existing poster as thumbnail

const Trailer = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="relative w-full h-[40vh] md:h-[50vh] bg-black overflow-hidden flex items-center justify-center group">
            {/* Background Image / Thumbnail */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                style={{ backgroundImage: `url(${poster})` }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

            {/* Content */}
            <div className="relative z-10 text-center">
                <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:text-[#ff3333] hover:border-[#ff3333] hover:scale-110 transition-all duration-300 backdrop-blur-sm bg-black/20"
                >
                    <FaPlay className="w-8 h-8 md:w-10 md:h-10 ml-1" />
                </button>
                <h2 className="mt-8 text-3xl md:text-5xl font-godlike uppercase tracking-wider text-white drop-shadow-lg">
                    Watch Trailer
                </h2>
            </div>

            {/* Simple Modal Video Player (Placeholder logic) */}
            {isPlaying && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl border border-white/10">
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="absolute -top-12 right-0 text-white hover:text-[#ff3333] font-bold text-xl uppercase tracking-widest"
                        >
                            Close [X]
                        </button>
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Trailer;
