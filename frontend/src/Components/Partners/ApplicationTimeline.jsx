import React, { useRef, useEffect } from "react";

// ─── Single Step Node ─────────────────────────────────────────────────────────
const StepNode = ({ step, index, total }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(el);
        return () => observer.disconnect();
    }, [index]);

    return (
        <div ref={ref} className="group relative flex flex-col items-center text-center flex-1 px-4">
            {/* Connector line — only between steps */}
            {index < total - 1 && (
                <div className="hidden md:block absolute top-[22px] left-[50%] w-full h-px bg-gradient-to-r from-[#AA0000]/60 to-[#AA0000]/20 z-0" />
            )}

            {/* Step number circle */}
            <div className="relative z-10 w-11 h-11 flex items-center justify-center rounded-full border border-[#AA0000]/50 bg-[#0d0d0d] mb-5 group-hover:border-[#AA0000] group-hover:shadow-[0_0_20px_rgba(170,0,0,0.3)] transition-all duration-300">
                <span className="font-mono text-[11px] text-[#AA0000] tracking-wider">{step.stepNumber}</span>
            </div>

            {/* Title */}
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white mb-2 group-hover:text-[#AA0000] transition-colors duration-300">
                {step.title}
            </h4>

            {/* Description */}
            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                {step.description}
            </p>
        </div>
    );
};

// ─── ApplicationTimeline ──────────────────────────────────────────────────────
const ApplicationTimeline = ({ applicationHeading, applicationSteps = [], applicationNote }) => (
    <section className="bg-[#060606] py-24 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">

            {/* Section header */}
            <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-10 bg-[#AA0000]" />
                <span className="font-mono text-[10px] tracking-[0.35em] text-[#AA0000] uppercase">
                    Process
                </span>
            </div>
            <h2 className="font-custom text-4xl md:text-5xl text-white tracking-wide uppercase mb-16">
                {applicationHeading}
            </h2>

            {/* Steps — Desktop: horizontal timeline; Mobile: vertical stack */}
            <div className="hidden md:flex items-start justify-between gap-0 relative">
                {applicationSteps.map((step, i) => (
                    <StepNode
                        key={step.stepNumber || i}
                        step={step}
                        index={i}
                        total={applicationSteps.length}
                    />
                ))}
            </div>

            {/* Steps — Mobile vertical */}
            <div className="flex flex-col gap-8 md:hidden">
                {applicationSteps.map((step, i) => (
                    <div key={step.stepNumber || i} className="flex gap-5 items-start group">
                        {/* Vertical line segment */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border border-[#AA0000]/50 bg-[#0d0d0d] group-hover:border-[#AA0000] group-hover:shadow-[0_0_20px_rgba(170,0,0,0.25)] transition-all duration-300">
                                <span className="font-mono text-[11px] text-[#AA0000]">{step.stepNumber}</span>
                            </div>
                            {i < applicationSteps.length - 1 && (
                                <div className="w-px flex-1 mt-2 bg-gradient-to-b from-[#AA0000]/40 to-transparent min-h-[40px]" />
                            )}
                        </div>
                        <div className="pt-2">
                            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white mb-1">
                                {step.title}
                            </h4>
                            <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Application note */}
            {applicationNote && (
                <p className="mt-14 text-center text-gray-600 font-mono text-[10px] tracking-[0.2em] uppercase max-w-xl mx-auto">
                    {applicationNote}
                </p>
            )}
        </div>
    </section>
);

export default ApplicationTimeline;
