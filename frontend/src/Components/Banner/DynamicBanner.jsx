// ============================================================
//  DynamicBanner.jsx
//  Reusable banner section for dynamic lore pages
// ============================================================
import React from "react";
import bgImage from "../../assets/Texturelabs_Grunge_353M.jpg";

const DynamicBanner = ({ section }) => {
    const navbarHeight = 80;

    // Extract text from Strapi "blocks" format
    const renderText = () => {
        if (!section.body || !Array.isArray(section.body)) return null;

        return section.body.map((block, idx) => {
            if (block.type !== "paragraph") return null;
            const textNode = block.children?.[0]?.text;
            if (!textNode) return null;

            // Parse basic bold tags for specific highlights if needed or raw text
            const isBold = textNode.includes("16 compounds");

            return (
                <p key={idx}>
                    {isBold ? (
                        <span dangerouslySetInnerHTML={{ __html: textNode.replace("16 compounds", '<span class="font-bold text-[#AA0000]">16 compounds</span>') }} />
                    ) : (
                        textNode
                    )}
                </p>
            );
        });
    };

    const isLeft = section.align_text === "left";
    const isCenter = section.align_text === "center";

    return (
        <div
            className="relative w-full bg-black h-screen bg-cover bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: `url(${section.background_image})`,
                backgroundPosition: section.bg_position || "center center",
                height: `calc(100vh - ${navbarHeight}px)`,
            }}
        >
            {/* Texture Overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                }}
            />

            {/* Enhanced Vignettes for seamless vertical blending */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(circle at center, rgba(0,0,0,0) 70%, rgba(0,0,0,0.65) 100%)" }}
                />
                <div
                    className="absolute top-0 left-0 w-full h-[30%]"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)" }}
                />
                <div
                    className="absolute bottom-0 left-0 w-full h-[30%]"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}
                />
            </div>

            <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 h-full flex items-center relative z-10">
                <div className={`grid grid-cols-1 ${isCenter ? '' : 'lg:grid-cols-2'} gap-20 lg:gap-28 items-center w-full`}>

                    {/* Empty column if text needs to go right */}
                    {!isLeft && !isCenter && <div className="hidden lg:block"></div>}

                    {/* Text Content */}
                    <div className={`flex items-center justify-center h-full px-2 ${isLeft ? 'lg:pr-10' : 'lg:pl-10'}`}>
                        <div className="space-y-6 text-center max-w-lg">
                            <div
                                data-aos-delay="500"
                                className="text-base md:text-lg leading-relaxed text-gray-300 space-y-4"
                            >
                                <p className="font-semibold font-custom text-[#e4d6c3] text-3xl md:text-4xl lg:text-5xl">
                                    {section.title}
                                </p>
                                {renderText()}
                            </div>
                        </div>
                    </div>

                    {/* Empty column if text needs to go left */}
                    {isLeft && !isCenter && <div className="hidden lg:block"></div>}
                </div>
            </div>
        </div>
    );
};

export default DynamicBanner;
