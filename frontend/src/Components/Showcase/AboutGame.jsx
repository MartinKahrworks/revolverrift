import React, { useState, useEffect } from 'react';
import { getHomePage, FALLBACK_ABOUT } from '../../api/homeApi';

const AboutGame = () => {
    // ── State initialised with hardcoded fallback ──────────────────────────────
    const [about, setAbout] = useState(FALLBACK_ABOUT);

    useEffect(() => {
        getHomePage().then((data) => {
            if (!data) return; // Strapi unavailable — fallback stays
            if (data.about) {
                setAbout(data.about);
            }
        });
    }, []);

    return (
        <section className="relative py-32 bg-[#050505] text-white overflow-hidden text-center">
            {/* Center Line Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-white/20" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <h4 className="text-[#ff3333] text-sm tracking-[0.3em] uppercase mb-4 font-bold">
                    {about.subtitle}
                </h4>
                <h2 className="text-4xl md:text-6xl font-godlike uppercase tracking-wider mb-8 text-white">
                    {about.title}
                </h2>

                <p className="text-gray-400 text-lg md:text-xl font-body leading-relaxed mb-16 max-w-3xl mx-auto">
                    {about.description}
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-b border-white/5 py-12">
                    {about.statistics.map((stat, i) => (
                        <div key={i} className="space-y-2">
                            <div className="text-5xl font-godlike text-white">{stat.number}</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutGame;
