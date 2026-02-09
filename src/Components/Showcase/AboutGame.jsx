import React from 'react';

const AboutGame = () => {
    return (
        <section className="relative py-32 bg-[#050505] text-white overflow-hidden text-center">
            {/* Center Line Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-white/20" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <h4 className="text-[#ff3333] text-sm tracking-[0.3em] uppercase mb-4 font-bold">The Story</h4>
                <h2 className="text-4xl md:text-6xl font-godlike uppercase tracking-wider mb-8 text-white">
                    About The Game
                </h2>

                <p className="text-gray-400 text-lg md:text-xl font-body leading-relaxed mb-16 max-w-3xl mx-auto">
                    RevolverRift is a hardcore extraction shooter set in a fractured reality.
                    Navigate through cursed compounds, fight against anomalous entities, and
                    survive the wrath of other players. Your only goal: Extract the artifact
                    before the Rift collapses.
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-b border-white/5 py-12">
                    <div className="space-y-2">
                        <div className="text-5xl font-godlike text-white">65</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Unique Classes</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-5xl font-godlike text-white">145</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Epic Bosses</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-5xl font-godlike text-white">35</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Zones</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutGame;
