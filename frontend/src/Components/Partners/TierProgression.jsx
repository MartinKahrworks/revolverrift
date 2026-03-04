import React, { useEffect, useRef } from "react";

// ─── Individual Perk Row ──────────────────────────────────────────────────────
const PerkRow = ({ perk, isAmbassador }) => (
    <div className="flex gap-4 items-start group py-3 border-b border-white/[0.04] last:border-0">
        {/* Icon bubble */}
        <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center text-base rounded-sm mt-0.5
            ${isAmbassador
                ? "bg-[#c9a84c]/10 border border-[#c9a84c]/25"
                : "bg-[#AA0000]/10 border border-[#AA0000]/20"
            }`}
        >
            <span className="leading-none">{perk.icon || "◆"}</span>
        </div>

        {/* Text */}
        <div>
            <p className={`font-mono text-[11px] uppercase tracking-[0.18em] mb-1 transition-colors
                ${isAmbassador ? "text-[#c9a84c]" : "text-white/80 group-hover:text-white"}`}
            >
                {perk.title}
            </p>
            {perk.description && (
                <p className="text-gray-500 text-xs leading-relaxed">{perk.description}</p>
            )}
        </div>
    </div>
);

// ─── Single Tier Row ──────────────────────────────────────────────────────────
const TierRow = ({ tier, index }) => {
    const rowRef = useRef(null);
    const isAmbassador = index === 2;

    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        el.style.opacity = "0";
        el.style.transform = "translateY(28px)";
        el.style.transition = `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`;
        observer.observe(el);
        return () => observer.disconnect();
    }, [index]);

    return (
        <div
            ref={rowRef}
            className={`relative w-full transition-all duration-300
                ${isAmbassador ? "bg-[#090909]/80" : ""}
            `}
        >
            {/* Ambassador prestige glow */}
            {isAmbassador && (
                <div
                    className="pointer-events-none absolute -left-8 top-0 bottom-0 w-1 rounded-full"
                    style={{ background: "linear-gradient(to bottom, transparent, #c9a84c, transparent)" }}
                />
            )}

            <div className={`max-w-[1200px] mx-auto px-6 md:px-12 grid lg:grid-cols-[300px_1fr] gap-12 items-start
                ${isAmbassador ? "py-20" : "py-16"}`}
            >
                {/* LEFT — Stage identity */}
                <div className="flex flex-row lg:flex-col gap-6 lg:gap-0">
                    {/* Stage number */}
                    <div className="relative">
                        <span
                            className={`font-custom font-bold select-none leading-none
                                ${isAmbassador ? "text-[130px] text-[#c9a84c]/[0.08]" : "text-[130px] text-[#AA0000]/[0.07]"}
                                absolute -top-6 -left-2 pointer-events-none`}
                            aria-hidden="true"
                        >
                            {tier.stageNumber}
                        </span>
                        <span className={`relative font-mono text-[11px] tracking-[0.3em] uppercase
                            ${isAmbassador ? "text-[#c9a84c]" : "text-[#AA0000]"}`}
                        >
                            Stage {tier.stageNumber}
                        </span>
                    </div>

                    {/* Tier title */}
                    <div className="mt-10 lg:mt-14">
                        <h3 className={`font-custom text-3xl md:text-4xl tracking-wide uppercase
                            ${isAmbassador ? "text-[#c9a84c]" : "text-white"}`}
                        >
                            {tier.title}
                        </h3>

                        {tier.requirement && (
                            <p className="text-gray-500 text-xs font-mono leading-relaxed mt-3 max-w-[220px]">
                                {tier.requirement}
                            </p>
                        )}

                        {/* Ambassador badge */}
                        {isAmbassador && (
                            <div className="inline-flex items-center gap-2 mt-5 border border-[#c9a84c]/30 px-3 py-1.5">
                                <span className="text-[#c9a84c] text-[8px]">★★★</span>
                                <span className="font-mono text-[9px] tracking-[0.25em] text-[#c9a84c] uppercase">Prestige Tier</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vertical divider — desktop */}
                <div className="hidden lg:flex absolute left-[calc((100%-1176px)/2+300px+48px)] top-0 bottom-0 items-stretch pointer-events-none">
                    <div className={`w-px h-full mx-auto
                        ${isAmbassador
                            ? "bg-gradient-to-b from-transparent via-[#c9a84c]/30 to-transparent"
                            : "bg-gradient-to-b from-transparent via-[#AA0000]/25 to-transparent"
                        }`}
                    />
                </div>

                {/* RIGHT — Perks list */}
                <div className="flex flex-col">
                    {tier.perks.map((perk, i) => (
                        <PerkRow key={i} perk={perk} isAmbassador={isAmbassador} />
                    ))}
                </div>
            </div>

            {/* Bottom divider */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="h-px bg-white/[0.05]" />
            </div>
        </div>
    );
};

// ─── Main TierProgression Component ──────────────────────────────────────────
const TierProgression = ({ tiersHeading, tiers = [] }) => (
    <section id="tiers" className="bg-[#060606] relative">
        {/* Section header */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-24 pb-16">
            <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-10 bg-[#AA0000]" />
                <span className="font-mono text-[10px] tracking-[0.35em] text-[#AA0000] uppercase">
                    Access Levels
                </span>
            </div>
            <h2 className="font-custom text-4xl md:text-5xl text-white tracking-wide uppercase">
                {tiersHeading}
            </h2>
        </div>

        {/* Tier rows */}
        {tiers.map((tier, i) => (
            <TierRow key={tier.stageNumber || i} tier={tier} index={i} />
        ))}
    </section>
);

export default TierProgression;
