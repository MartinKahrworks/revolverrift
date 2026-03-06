import React, { useEffect, useRef } from "react";

// ─── Theme config for each tier ────────────────────────────────────────────────
const TIER_THEMES = [
    {
        accent: "#AA0000",
        accentLight: "#cc0000",
        accentMuted: "rgba(170,0,0,0.12)",
        accentBorder: "rgba(170,0,0,0.35)",
        accentGlow: "rgba(170,0,0,0.25)",
        badgeText: "",
        badgeBg: "rgba(170,0,0,0.15)",
        badgeBorder: "rgba(170,0,0,0.4)",
        isFeatured: false,
        featuredLabel: null,
    },
    {
        accent: "#C0C0C0",
        accentLight: "#e8e8e8",
        accentMuted: "rgba(192,192,192,0.10)",
        accentBorder: "rgba(192,192,192,0.35)",
        accentGlow: "rgba(192,192,192,0.20)",
        badgeText: "",
        badgeBg: "rgba(192,192,192,0.12)",
        badgeBorder: "rgba(192,192,192,0.40)",
        isFeatured: true,
        featuredLabel: "MOST POPULAR",
    },
    {
        accent: "#c9a84c",
        accentLight: "#e8c96a",
        accentMuted: "rgba(201,168,76,0.12)",
        accentBorder: "rgba(201,168,76,0.35)",
        accentGlow: "rgba(201,168,76,0.25)",
        badgeText: "",
        badgeBg: "rgba(201,168,76,0.12)",
        badgeBorder: "rgba(201,168,76,0.40)",
        isFeatured: false,
        featuredLabel: null,
    },
];

// ─── Perk Item ─────────────────────────────────────────────────────────────────
const PerkItem = ({ perk, theme }) => (
    <div className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0 group">
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

            {/* Card Header */}
            <div
                className="px-7 pt-8 pb-6"
                style={{
                    background: `linear-gradient(135deg, ${theme.accentMuted} 0%, transparent 70%)`,
                    borderBottom: `1px solid ${theme.accentBorder}`,
                }}
            >
                <div
                    className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
                    style={{
                        background: theme.badgeBg,
                        border: `1px solid ${theme.badgeBorder}`,
                    }}
                >
                    <span className="font-custom text-[10px] tracking-[0.3em] uppercase" style={{ color: theme.accent }}>
                        Stage {tier.stageNumber}
                    </span>
                </div>

                <h3
                    className="font-custom text-3xl md:text-3xl lg:text-4xl uppercase tracking-wide mb-3"
                    style={{ color: theme.accent }}
                >
                    {tier.title}
                </h3>

                {tier.requirement && (
                    <p className="text-white text-sm font-custom leading-relaxed mt-1">
                        {tier.requirement}
                    </p>
                )}
            </div>

            {/* Perks List */}
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

            {/* CTA Button */}
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

// ─── HeroSection ──────────────────────────────────────────────────────────────
const HeroSection = ({ heroTitle, heroSubtitle, primaryButtonText, secondaryButtonText, tiers = [] }) => {
    const titleRef = useRef(null);
    const subRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const els = [titleRef.current, subRef.current, ctaRef.current];
        els.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = "0";
            el.style.transform = "translateY(24px)";
            setTimeout(() => {
                el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, 120 + i * 160);
        });
    }, []);

    return (
        <section
            id="hero"
            className="relative bg-[#060606] overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24"
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

            {/* Ambient red glow — top center */}
            <div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] opacity-20"
                style={{
                    background: "radial-gradient(ellipse at center top, rgba(170,0,0,0.55) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-16 flex flex-col items-center gap-14">

                {/* 1. HEADING */}
                <div ref={titleRef} className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <span className="h-px w-10 bg-[#AA0000]" />
                        <span className="font-custom text-[10px] tracking-[0.4em] text-[#AA0000] uppercase">
                            Partnerships
                        </span>
                        <span className="h-px w-10 bg-[#AA0000]" />
                    </div>
                    <h1
                        className="font-custom text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-white leading-[1.05] tracking-tight"
                        style={{ textShadow: "0 0 80px rgba(170,0,0,0.18)" }}
                    >
                        {heroTitle}
                    </h1>
                </div>

                {/* 2. TIER CARDS */}
                <div
                    id="tiers"
                    className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start"
                >
                    {tiers.map((tier, i) => (
                        <TierCard key={tier.stageNumber || i} tier={tier} index={i} wrapperClass="" />
                    ))}
                </div>

                {/* 3. SUBTITLE */}
                <p
                    ref={subRef}
                    className="text-white/70 font-custom text-base md:text-lg leading-relaxed text-center max-w-[600px] tracking-wide"
                >
                    {heroSubtitle}
                </p>

            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none" />
        </section>
    );
};

export default HeroSection;
