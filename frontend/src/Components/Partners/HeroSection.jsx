import React, { useEffect, useRef } from "react";

// ─── Theme config for each tier ────────────────────────────────────────────────
const TIER_THEMES = [
    {
        // Creator — Red
        accent: "#AA0000",
        accentLight: "#cc0000",
        accentMuted: "rgba(170,0,0,0.12)",
        accentBorder: "rgba(170,0,0,0.35)",
        accentGlow: "rgba(170,0,0,0.25)",
        badgeText: "TIER 1",
        badgeBg: "rgba(170,0,0,0.15)",
        badgeBorder: "rgba(170,0,0,0.4)",
        isFeatured: false,
        featuredLabel: null,
    },
    {
        // Partner — Silver
        accent: "#C0C0C0",
        accentLight: "#e8e8e8",
        accentMuted: "rgba(192,192,192,0.10)",
        accentBorder: "rgba(192,192,192,0.35)",
        accentGlow: "rgba(192,192,192,0.20)",
        badgeText: "TIER 2",
        badgeBg: "rgba(192,192,192,0.12)",
        badgeBorder: "rgba(192,192,192,0.40)",
        isFeatured: true,
        featuredLabel: "MOST POPULAR",
    },
    {
        // Ambassador — Gold
        accent: "#c9a84c",
        accentLight: "#e8c96a",
        accentMuted: "rgba(201,168,76,0.12)",
        accentBorder: "rgba(201,168,76,0.35)",
        accentGlow: "rgba(201,168,76,0.25)",
        badgeText: "TIER 3",
        badgeBg: "rgba(201,168,76,0.12)",
        badgeBorder: "rgba(201,168,76,0.40)",
        isFeatured: false,
        featuredLabel: null,
    },
];

// ─── Perk Item ─────────────────────────────────────────────────────────────────
const PerkItem = ({ perk, theme }) => (
    <div className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0 group">
        {/* Check / icon bubble */}
        <div
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full mt-0.5 text-xs"
            style={{
                background: theme.accentMuted,
                border: `1px solid ${theme.accentBorder}`,
                color: theme.accent,
            }}
        >
            {perk.icon && perk.icon !== "✓" && perk.icon !== "◆"
                ? <span className="text-[13px] leading-none">{perk.icon}</span>
                : <span className="text-[12px] font-bold leading-none">✓</span>
            }
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
            <p
                className="font-custom text-[12px] md:text-[13px] uppercase tracking-[0.15em] mb-1 transition-colors"
                style={{ color: theme.accent }}
            >
                {perk.title}
            </p>
            {perk.description && (
                <p className="text-white text-sm leading-relaxed">{perk.description}</p>
            )}
        </div>
    </div>
);

// ─── Single Pricing Card ───────────────────────────────────────────────────────
const TierCard = ({ tier, index, wrapperClass = "" }) => {
    const cardRef = useRef(null);
    const theme = TIER_THEMES[index] ?? TIER_THEMES[0];

    // Scroll-fade-in animation
    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1";
                    el.style.transform = theme.isFeatured
                        ? "translateY(0) scale(1.05)"
                        : "translateY(0) scale(1)";
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        el.style.opacity = "0";
        el.style.transform = theme.isFeatured
            ? "translateY(32px) scale(1.05)"
            : "translateY(32px) scale(1)";
        el.style.transition = `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s, box-shadow 0.3s ease`;
        observer.observe(el);
        return () => observer.disconnect();
    }, [index, theme.isFeatured]);

    // Hover glow handlers
    const handleMouseEnter = (e) => {
        e.currentTarget.style.boxShadow = `0 0 40px ${theme.accentGlow}, 0 20px 60px rgba(0,0,0,0.5)`;
    };
    const handleMouseLeave = (e) => {
        e.currentTarget.style.boxShadow = theme.isFeatured
            ? `0 0 20px ${theme.accentGlow}, 0 8px 32px rgba(0,0,0,0.4)`
            : "0 8px 32px rgba(0,0,0,0.4)";
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative flex flex-col rounded-2xl overflow-hidden cursor-default w-full ${wrapperClass}`}
            style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${theme.accentBorder}`,
                borderTop: `4px solid ${theme.accent}`,
                boxShadow: theme.isFeatured
                    ? `0 0 20px ${theme.accentGlow}, 0 8px 32px rgba(0,0,0,0.4)`
                    : "0 8px 32px rgba(0,0,0,0.4)",
                transform: theme.isFeatured ? "scale(1.05)" : "scale(1)",
                zIndex: theme.isFeatured ? 10 : 1,
            }}
        >
            {/* "Most Popular" ribbon */}
            {theme.isFeatured && theme.featuredLabel && (
                <div
                    className="absolute top-0 right-0 font-custom text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 rounded-bl-lg"
                    style={{
                        background: theme.accentMuted,
                        border: `1px solid ${theme.accentBorder}`,
                        borderTop: "none",
                        borderRight: "none",
                        color: theme.accent,
                    }}
                >
                    {theme.featuredLabel}
                </div>
            )}

            {/* ── Card Header ── */}
            <div
                className="px-7 pt-8 pb-6"
                style={{
                    background: `linear-gradient(135deg, ${theme.accentMuted} 0%, transparent 70%)`,
                    borderBottom: `1px solid ${theme.accentBorder}`,
                }}
            >
                {/* Stage badge */}
                <div
                    className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
                    style={{
                        background: theme.badgeBg,
                        border: `1px solid ${theme.badgeBorder}`,
                    }}
                >
                    <span
                        className="font-custom text-[10px] tracking-[0.3em] uppercase"
                        style={{ color: theme.accent }}
                    >
                        Stage {tier.stageNumber}
                    </span>
                    <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: theme.accent }}
                    />
                    <span
                        className="font-custom text-[10px] tracking-[0.25em] uppercase"
                        style={{ color: theme.accent }}
                    >
                        {theme.badgeText}
                    </span>
                </div>

                {/* Tier name */}
                <h3
                    className="font-custom text-3xl md:text-3xl lg:text-4xl uppercase tracking-wide mb-3"
                    style={{ color: theme.accent }}
                >
                    {tier.title}
                </h3>

                {/* Requirement / subtitle */}
                {tier.requirement && (
                    <p className="text-white text-sm font-custom leading-relaxed mt-1">
                        {tier.requirement}
                    </p>
                )}
            </div>

            {/* ── Perks List ── */}
            <div className="flex-1 px-7 py-5">
                <p
                    className="font-custom text-[11px] tracking-[0.3em] uppercase mb-4"
                    style={{ color: theme.accentLight, opacity: 0.6 }}
                >
                    Includes
                </p>
                {tier.perks.map((perk, i) => (
                    <PerkItem key={i} perk={perk} theme={theme} />
                ))}
            </div>

            {/* ── CTA Button ── */}
            <div className="px-7 pb-8 pt-4">
                <a
                    href="#apply"
                    className="block w-full text-center font-custom text-xs tracking-[0.2em] uppercase py-3 rounded-lg transition-all duration-300"
                    style={{
                        background: theme.accentMuted,
                        border: `1px solid ${theme.accentBorder}`,
                        color: theme.accent,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme.accent;
                        e.currentTarget.style.color = "#060606";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = theme.accentMuted;
                        e.currentTarget.style.color = theme.accent;
                    }}
                >
                    Apply Now
                </a>
            </div>
        </div>
    );
};

/**
 * HeroSection — Cinematic split-layout hero for the Partnership page.
 * CMS fields: heroTitle, heroSubtitle, primaryButtonText, secondaryButtonText
 */
const HeroSection = ({ heroTitle, heroSubtitle, primaryButtonText, secondaryButtonText, tiers = [] }) => {
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
            className="relative min-h-screen py-32 flex items-center overflow-hidden bg-[#060606]"
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
            {/* <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#AA0000]/30 to-transparent hidden lg:block" /> */}

            <div className="relative z-10 w-full max-w-[1900px] mx-auto px-6 md:px-12 grid xl:grid-cols-[360px_1fr] 2xl:grid-cols-[400px_1fr] gap-10 xl:gap-24 items-center">

                {/* LEFT — Text content */}
                <div ref={contentRef} className="xl:sticky xl:top-40 self-start pt-16 xl:pt-0">
                    {/* Eyebrow label */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="h-px w-10 bg-[#AA0000]" />
                        <span className="font-custom text-[10px] tracking-[0.35em] text-[#AA0000] uppercase">
                            Partnerships
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="font-custom text-5xl md:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight mb-6 mt-4"
                        style={{ textShadow: "0 0 60px rgba(170,0,0,0.15)" }}
                    >
                        {heroTitle}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-400 font-custom text-base md:text-lg leading-relaxed max-w-[480px] mb-10 tracking-wide">
                        {heroSubtitle}
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            className="group relative inline-flex items-center gap-3 bg-[#AA0000] text-white font-custom text-xs tracking-[0.25em] uppercase px-8 py-4 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(170,0,0,0.5)] hover:scale-[1.02]"
                        >
                            <span className="relative z-10">{primaryButtonText}</span>
                            {/* Sweep hover effect */}
                            <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 ease-in-out skew-x-12" />
                        </button>

                        <a
                            href="#tiers"
                            className="inline-flex items-center gap-3 border border-white/20 text-white/70 font-custom text-xs tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300 hover:border-[#AA0000] hover:text-white"
                        >
                            {secondaryButtonText}
                            <svg className="w-3.5 h-3.5 rotate-90 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* RIGHT — Tiers panel */}
                <div id="tiers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start mt-10 xl:mt-0 xl:self-center">
                    {tiers.map((tier, i) => {
                        // Gold card (index 2) gets a negative margin on desktop to continue 
                        // the upward staircase effect started by the Silver card's scale(1.05).
                        const staggerClass = i === 2 ? "lg:-mt-12 xl:-mt-14" : "";
                        return (
                            <TierCard key={tier.stageNumber || i} tier={tier} index={i} wrapperClass={staggerClass} />
                        );
                    })}
                </div>
            </div>

            {/* Bottom edge fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none" />
        </section>
    );
};

export default HeroSection;
