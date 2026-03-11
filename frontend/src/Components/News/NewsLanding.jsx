import React, { useState, useEffect, useRef } from "react";
import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';
import FeatureImg from "../../assets/newassets/9.webp";
import CardImg1 from "../../assets/newassets/7.webp";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

// ─── Fallback data (mirrors the two hardcoded cards) ───────────────────────────
const FALLBACK_NEWS_ITEMS = [
    {
        id: "what-makes-revolver-rift-unique",
        title: "What Makes Revolver Rift Unique",
        badge_label: "Feature Analysis",
        badge_color: "red",
        excerpt: "This is not your typical shooter. A war-torn 1944 collides with the supernatural—two factions, evolving objectives, and choices with teeth.",
        cover_image: null,
        order: 1,
        modalContent: [
            {
                type: "bullets",
                items: [
                    { label: "Alternate History Warfare", text: "Fight in a gritty, wartorn 1944 where the supernatural collides with World War II." },
                    { label: "Light vs. Darkness", text: "Choose your side—the righteous Cleric Deputies or the brutal Cursed Hell Deputies—each with unique playstyles, Perks, and twisted morality." },
                    { label: "Catch the enemies", text: "Track enemies by supernatural Perks, sound, skill, and strategy. Every fight is earned." },
                    { label: "Dynamic Objectives", text: "Artifacts, VIP rescues, demonic bosses, anomalies, Arena, Rift Royal, Warmup—only what you extract survives." },
                    { label: "Risk & Power Systems", text: "Devil's Chair deals, Rift Storm chaos, and fate-shaping choices." },
                    { label: "Style Meets Grit", text: "WWII weapons meet supernatural gear. Blood, tension, and tactical decisions define every moment." },
                ],
            },
        ],
    },
    {
        id: "two-forces-no-mercy",
        title: "Two Forces. No Mercy.",
        badge_label: "Lore Deep Dive",
        badge_color: "beige",
        excerpt: "When the Rift tore open in 1944, Heaven and Hell sent their own soldiers. Choose your side: The Clerics or The Hell Deputies.",
        cover_image: null,
        order: 2,
        modalContent: null,
    },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const getFallbackImage = (order) => {
    if (order === 1) return FeatureImg;
    if (order === 2) return CardImg1;
    return FeatureImg;
};

const resolveImage = (item, fallbackOrder) => {
    if (item?.cover_image?.url) {
        const url = item.cover_image.url;
        return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
    }
    return getFallbackImage(fallbackOrder);
};

// ─── UI Sub-components ─────────────────────────────────────────────────────────
const Badge = ({ children, color = "bg-red-600" }) => (
    <span className={`inline-block rounded-sm ${color} px-3 py-1 text-[10px] tracking-widest font-bold uppercase text-black`}>
        {children}
    </span>
);

const ImgFill = ({ src, alt, className = "", loading = "eager" }) => (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <img
            src={src}
            alt={alt}
            className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading={loading}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
    </div>
);

const Modal = ({ open, onClose, title, image, children }) => {
    const overlayRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
            <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(220,38,38,0.1)] rounded-sm overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 text-white/50 hover:text-red-500 transition-colors"
                >
                    ✕ ESC
                </button>
                <div className="md:w-1/2 h-64 md:h-auto relative">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay" />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                    <h3 className="font-custom text-3xl md:text-4xl text-[#e4d6c3] mb-6 uppercase leading-none">{title}</h3>
                    <div className="space-y-4 text-gray-400 text-lg leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const NewsLanding = () => {
    const [openFeature, setOpenFeature] = useState(false);
    const [openRight, setOpenRight] = useState(false);
    const [newsItems, setNewsItems] = useState(FALLBACK_NEWS_ITEMS);

    useEffect(() => {
        fetch(`${STRAPI_URL}/api/news-items?populate=*&sort=order:asc`)
            .then((res) => res.ok ? res.json() : null)
            .then((json) => {
                if (json?.data?.length > 0) {
                    const mapped = json.data.map((item, idx) => ({
                        ...item,
                        cover_image: item.cover_image ?? null,
                        order: item.order ?? idx + 1,
                        // Keep modal bullet content from fallback since CMS stores plain text
                        modalContent: FALLBACK_NEWS_ITEMS[idx]?.modalContent ?? null,
                    }));
                    setNewsItems(mapped);
                }
                // If Strapi returns empty or fails, FALLBACK_NEWS_ITEMS stay
            })
            .catch(() => {
                // Strapi unavailable — fallback already loaded
            });
    }, []);

    const main = newsItems[0];
    const side = newsItems[1];

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center py-24 overflow-hidden">
            {/* Background Texture */}
            <div
                className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
            />

            <div className="container mx-auto px-6 z-10">
                {/* Header */}
                <div className="mb-12 md:mb-20 text-center relative">
                    <div className="inline-block relative">
                        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-custom text-transparent bg-clip-text bg-gradient-to-b from-[#e4d6c3] to-[#8d7f6d] leading-none tracking-tighter uppercase relative z-10">
                            LATEST FROM THE RIFT
                        </h1>
                        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-custom text-red-600/20 absolute top-1 left-1 leading-none tracking-tighter uppercase z-0 blur-sm">
                            LATEST FROM THE RIFT
                        </h1>
                    </div>
                    <p className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs md:text-sm mt-4">
                        INTERESTING TIMES IN THE RIFT
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
                    {/* Main Featured Article (Left - Large) */}
                    {main && (
                        <div
                            className="lg:col-span-8 group relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto border border-white/10 bg-black/40 overflow-hidden cursor-pointer shadow-2xl"
                            onClick={() => setOpenFeature(true)}
                        >
                            <ImgFill src={resolveImage(main, 1)} alt={main.title} />

                            <div className="absolute inset-0 p-6 sm:p-8 md:p-12 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent">
                                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <Badge color={main.badge_color === 'beige' ? 'bg-[#e4d6c3]' : 'bg-red-600'}>
                                        {main.badge_label}
                                    </Badge>
                                    <h2 className="mt-4 font-custom text-3xl md:text-5xl text-white uppercase leading-none group-hover:text-red-500 transition-colors duration-300">
                                        {main.title}
                                    </h2>
                                    <p className="mt-4 text-gray-300 text-lg md:text-xl line-clamp-2 max-w-2xl group-hover:text-white transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                                        {main.excerpt}
                                    </p>
                                    <div className="mt-6 flex items-center gap-3 text-sm font-mono text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <span>Read Analysis</span>
                                        <span className="w-8 h-[1px] bg-red-500" />
                                    </div>
                                </div>
                            </div>
                            {/* Decorative Corners */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30" />
                        </div>
                    )}

                    {/* Secondary Article (Right - Vertical) */}
                    {side && (
                        <div
                            className="lg:col-span-4 group relative aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto border border-white/10 bg-black/40 overflow-hidden cursor-pointer"
                            onClick={() => setOpenRight(true)}
                        >
                            <ImgFill src={resolveImage(side, 2)} alt={side.title} />

                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <Badge color={side.badge_color === 'beige' ? 'bg-[#e4d6c3]' : 'bg-red-600'}>
                                        {side.badge_label}
                                    </Badge>
                                    <h3 className="mt-4 font-custom text-2xl md:text-4xl text-white uppercase leading-none group-hover:text-[#e4d6c3] transition-colors">
                                        {side.title}
                                    </h3>
                                    <p className="mt-3 text-gray-400 text-base line-clamp-3 group-hover:text-gray-200" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                                        {side.excerpt}
                                    </p>
                                    <div className="mt-6 flex items-center gap-3 text-sm font-mono text-[#e4d6c3] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <span>Access File</span>
                                        <span className="w-8 h-[1px] bg-[#e4d6c3]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {main && (
                <Modal
                    open={openFeature}
                    onClose={() => setOpenFeature(false)}
                    title={main.title}
                    image={resolveImage(main, 1)}
                >
                    {main.modalContent?.[0]?.items ? (
                        <>
                            <p><strong>This is not your typical shooter:</strong></p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-red-500">
                                {main.modalContent[0].items.map((item, i) => (
                                    <li key={i}><strong className="text-white">{item.label}:</strong> {item.text}</li>
                                ))}
                            </ul>
                            <p className="mt-6 text-red-500 font-custom text-xl">Enter the Rift. Fight for your soul. Extract or die trying.</p>
                        </>
                    ) : (
                        <p>{main.excerpt}</p>
                    )}
                </Modal>
            )}

            {side && (
                <Modal
                    open={openRight}
                    onClose={() => setOpenRight(false)}
                    title={side.title}
                    image={resolveImage(side, 2)}
                >
                    <p>
                        When the Rift tore through reality in 1944, Heaven and Hell unleashed their own soldiers to claim what was left of Earth. Two factions now wage a brutal war for power, relics, and the fate of mankind.
                    </p>

                    <div className="mt-8 border-l-2 border-[#e4d6c3] pl-6">
                        <h4 className="font-custom text-2xl text-[#e4d6c3] uppercase">The Cleric Deputies</h4>
                        <p className="mt-2 text-sm text-gray-400">Holy doesn&apos;t mean gentle. The Clerics are Heaven&apos;s chosen—a militant order of righteous assassins sent to cleanse the Rift with fire, faith, and steel.</p>
                    </div>

                    <div className="mt-8 border-l-2 border-red-600 pl-6">
                        <h4 className="font-custom text-2xl text-red-600 uppercase">The Hell Deputies</h4>
                        <p className="mt-2 text-sm text-gray-400">Once damned souls, now Hell&apos;s elite killers. The Hell Deputies are chaos made flesh—brutal enforcers of infernal will, driven by vengeance and power.</p>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default NewsLanding;
