import React from "react";

/**
 * FeaturedPartners — Optional grayscale logo marquee.
 * Renders only if featuredPartners array has items.
 */
const FeaturedPartners = ({ featuredPartners = [] }) => {
    if (!featuredPartners || featuredPartners.length === 0) return null;

    return (
        <section className="bg-[#060606] py-12 md:py-20 border-t border-white/[0.04]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">

                <p className="text-center font-custom text-[10px] tracking-[0.35em] text-gray-600 uppercase mb-12">
                    Current Partners
                </p>

                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16">
                    {featuredPartners.map((partner, i) => (
                        <div key={i} className="group relative">
                            <img
                                src={partner.url}
                                alt={partner.name}
                                loading="lazy"
                                className="h-12 md:h-16 w-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-lg"
                            />
                            {/* Hover underline */}
                            <div className="h-px w-0 bg-[#AA0000] group-hover:w-full mt-2 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPartners;
