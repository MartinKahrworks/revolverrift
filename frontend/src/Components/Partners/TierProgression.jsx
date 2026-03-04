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
                ? <span className="text-[11px] leading-none">{perk.icon}</span>
                : <span className="text-[10px] font-bold leading-none">✓</span>
            }
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
            <p
                className="font-mono text-[11px] uppercase tracking-[0.15em] mb-0.5 transition-colors"
                style={{ color: theme.accent }}
            >
                {perk.title}
            </p>
            {perk.description && (
                <p className="text-gray-500 text-xs leading-relaxed">{perk.description}</p>
            )}
        </div>
    </div>
);

// ─── Single Pricing Card ───────────────────────────────────────────────────────
const TierCard = ({ tier, index }) => {
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
            className="relative flex flex-col rounded-2xl overflow-hidden cursor-default"
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
                    className="absolute top-0 right-0 font-mono text-[9px] tracking-[0.25em] uppercase px-3 py-1 rounded-bl-lg"
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
                    className="inline-flex items-center gap-2 mb-4 px-2.5 py-1 rounded-full"
                    style={{
                        background: theme.badgeBg,
                        border: `1px solid ${theme.badgeBorder}`,
                    }}
                >
                    <span
                        className="font-mono text-[9px] tracking-[0.3em] uppercase"
                        style={{ color: theme.accent }}
                    >
                        Stage {tier.stageNumber}
                    </span>
                    <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: theme.accent }}
                    />
                    <span
                        className="font-mono text-[9px] tracking-[0.25em] uppercase"
                        style={{ color: theme.accent }}
                    >
                        {theme.badgeText}
                    </span>
                </div>

                {/* Tier name */}
                <h3
                    className="font-custom text-3xl md:text-4xl uppercase tracking-wide mb-3"
                    style={{ color: theme.accent }}
                >
                    {tier.title}
                </h3>

                {/* Requirement / subtitle */}
                {tier.requirement && (
                    <p className="text-gray-500 text-xs font-mono leading-relaxed">
                        {tier.requirement}
                    </p>
                )}
            </div>

            {/* ── Perks List ── */}
            <div className="flex-1 px-7 py-5">
                <p
                    className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3"
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
                    className="block w-full text-center font-mono text-xs tracking-[0.2em] uppercase py-3 rounded-lg transition-all duration-300"
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

// ─── Main TierProgression Component ───────────────────────────────────────────
const TierProgression = ({ tiersHeading, tiers = [] }) => (
    <section id="tiers" className="bg-[#060606] relative overflow-hidden">
        {/* Subtle background radial glow */}
        <div
            className="pointer-events-none absolute inset-0"
            style={{
                background:
                    "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(170,0,0,0.04) 0%, transparent 70%)",
            }}
        />

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 pt-24 pb-28">
            {/* Section header */}
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                    <span className="h-px w-10 bg-[#AA0000]" />
                    <span className="font-mono text-[10px] tracking-[0.35em] text-[#AA0000] uppercase">
                        Tiers
                    </span>
                </div>
                <h2 className="font-custom text-4xl md:text-5xl text-white tracking-wide uppercase">
                    {tiersHeading}
                </h2>
                <p className="text-gray-500 font-mono text-sm mt-4 max-w-lg">
                    Choose the tier that matches your content and reach.
                </p>
            </div>

            {/* Cards grid — 3 col desktop, stack on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {tiers.map((tier, i) => (
                    <TierCard key={tier.stageNumber || i} tier={tier} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default TierProgression;
