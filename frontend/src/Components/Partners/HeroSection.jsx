import React, { useEffect, useRef } from "react";

/**
 * HeroSection — Cinematic split-layout hero for the Partnership page.
 * CMS fields: heroTitle, heroSubtitle, primaryButtonText, secondaryButtonText
 */
const HeroSection = ({ heroTitle, heroSubtitle, primaryButtonText, secondaryButtonText }) => {
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // Staggered fade-in on mount
        const els = [titleRef.current, contentRef.current];
        els.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = "0";
            el.style.transform = "translateY(24px)";
            setTimeout(() => {
                el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, 150 + i * 180);
        });
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden bg-[#060606]"
        >
            {/* Grain overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundSize: "180px",
                }}
            />

            {/* Red radial glow — left */}
            <div
                className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full opacity-20"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(170,0,0,0.45) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Thin vertical red rule — decorative */}
            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#AA0000]/30 to-transparent hidden lg:block" />

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-36 pb-28 grid lg:grid-cols-2 gap-16 items-center">

                {/* LEFT — Text content */}
                <div ref={contentRef}>
                    {/* Eyebrow label */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="h-px w-10 bg-[#AA0000]" />
                        <span className="font-mono text-[10px] tracking-[0.35em] text-[#AA0000] uppercase">
                            Creator Program
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="font-custom text-5xl md:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight mb-6"
                        style={{ textShadow: "0 0 60px rgba(170,0,0,0.15)" }}
                    >
                        {heroTitle}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-400 font-sans text-base md:text-lg leading-relaxed max-w-[480px] mb-10 tracking-wide">
                        {heroSubtitle}
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            className="group relative inline-flex items-center gap-3 bg-[#AA0000] text-white font-mono text-xs tracking-[0.25em] uppercase px-8 py-4 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(170,0,0,0.5)] hover:scale-[1.02]"
                        >
                            <span className="relative z-10">{primaryButtonText}</span>
                            {/* Sweep hover effect */}
                            <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 ease-in-out skew-x-12" />
                        </button>

                        <a
                            href="#tiers"
                            className="inline-flex items-center gap-3 border border-white/20 text-white/70 font-mono text-xs tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300 hover:border-[#AA0000] hover:text-white"
                        >
                            {secondaryButtonText}
                            <svg className="w-3.5 h-3.5 rotate-90 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* RIGHT — Decorative stats / texture panel */}
                <div className="hidden lg:flex flex-col gap-8 pl-16">
                    {/* Decorative stat blocks */}
                    {[
                        { value: "3", label: "Tier Levels", sub: "Creator → Partner → Ambassador" },
                        { value: "∞", label: "Community Reach", sub: "Any size, any platform" },
                        { value: "24h", label: "Response Commitment", sub: "After acceptance confirmation" },
                    ].map((stat, i) => (
                        <div key={i} className="flex gap-5 items-start group">
                            <div className="w-px h-12 bg-gradient-to-b from-[#AA0000] to-transparent opacity-60 mt-1 flex-shrink-0 group-hover:opacity-100 transition-opacity" />
                            <div>
                                <p className="font-custom text-3xl text-white tracking-widest">{stat.value}</p>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#AA0000] mt-0.5">{stat.label}</p>
                                <p className="text-gray-600 text-[11px] mt-1">{stat.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom edge fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none" />
        </section>
    );
};

export default HeroSection;
