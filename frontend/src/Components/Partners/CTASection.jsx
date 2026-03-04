import React from "react";

/**
 * CTASection — Full-width dark CTA with red edge glow and sweep-fill button.
 * CMS fields: ctaTitle, ctaButtonText, ctaLink
 */
const CTASection = ({ ctaTitle, ctaButtonText, ctaLink = "" }) => (
    <section className="relative bg-[#060606] py-32 overflow-hidden border-t border-white/[0.04]">
        {/* Red glow edges */}
        <div
            className="pointer-events-none absolute inset-0"
            style={{
                background:
                    "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(170,0,0,0.12) 0%, transparent 70%)",
            }}
        />
        <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-1"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(170,0,0,0.4), transparent)" }}
        />
        <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-1"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(170,0,0,0.4), transparent)" }}
        />

        {/* Grain overlay */}
        <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
                backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: "180px",
            }}
        />

        <div className="relative z-10 text-center max-w-[720px] mx-auto px-6">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-8">
                <span className="h-px w-10 bg-[#AA0000]/50" />
                <span className="font-custom text-[10px] tracking-[0.4em] text-[#AA0000] uppercase">
                    Join the Program
                </span>
                <span className="h-px w-10 bg-[#AA0000]/50" />
            </div>

            {/* Title */}
            <h2
                className="font-custom text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-10"
                style={{ textShadow: "0 0 80px rgba(170,0,0,0.12)" }}
            >
                {ctaTitle}
            </h2>

            {/* Button */}
            <button
                className="group relative inline-flex items-center justify-center gap-3 border border-[#AA0000] text-white font-custom text-xs tracking-[0.3em] uppercase px-12 py-5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(170,0,0,0.4)] hover:scale-[1.02]"
            >
                {/* Fill sweep — left to right on hover */}
                <span className="absolute inset-0 bg-[#AA0000] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <span className="relative z-10">{ctaButtonText}</span>
                <svg
                    className="relative z-10 w-3.5 h-3.5 -rotate-90 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    </section>
);

export default CTASection;
