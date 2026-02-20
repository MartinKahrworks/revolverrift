import React, { useState, useEffect, useRef } from "react";
import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';
import FeatureImg from "../../assets/newassets/9.webp";
import CardImg1 from "../../assets/newassets/7.webp";

// --- UI Components ---
const Badge = ({ children, color = "bg-red-600" }) => (
    <span className={`inline-block rounded-sm ${color} px-3 py-1 text-[10px] tracking-widest font-bold uppercase text-black`}>
        {children}
    </span>
);

const ImgFill = ({ src, alt, className = "" }) => (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <img
            src={src}
            alt={alt}
            className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
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
                    <div className="space-y-4 text-gray-400 font-serif text-lg leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const NewsLanding = () => {
    const [openFeature, setOpenFeature] = useState(false);
    const [openRight, setOpenRight] = useState(false);

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center py-24 overflow-hidden">
            {/* Background Texture */}
            <div
                className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
            />

            <div className="container mx-auto px-6 z-10">
                {/* Header */}
                <div className="mb-20 text-center relative">
                    <div className="inline-block relative">
                        <h1 className="text-[clamp(3rem,8vw,7rem)] font-custom text-transparent bg-clip-text bg-gradient-to-b from-[#e4d6c3] to-[#8d7f6d] leading-none tracking-tighter uppercase relative z-10">
                            LATEST FROM THE RIFT
                        </h1>
                        <h1 className="text-[clamp(3rem,8vw,7rem)] font-custom text-red-600/20 absolute top-1 left-1 leading-none tracking-tighter uppercase z-0 blur-sm">
                            LATEST FROM THE RIFT
                        </h1>
                    </div>
                    <p className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs md:text-sm mt-4">
                        INTERESTING TIMES IN THE RIFT
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
                    {/* Main Featured Article (Left - Large) */}
                    <div
                        className="lg:col-span-8 group relative aspect-[16/10] lg:aspect-auto border border-white/10 bg-black/40 overflow-hidden cursor-pointer shadow-2xl"
                        onClick={() => setOpenFeature(true)}
                    >
                        <ImgFill src={FeatureImg} alt="Review" />

                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent">
                            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                <Badge>Feature Analysis</Badge>
                                <h2 className="mt-4 font-custom text-3xl md:text-5xl text-white uppercase leading-none group-hover:text-red-500 transition-colors duration-300">
                                    What Makes Revolver Rift Unique
                                </h2>
                                <p className="mt-4 text-gray-300 font-serif text-lg md:text-xl line-clamp-2 max-w-2xl group-hover:text-white transition-colors">
                                    This is not your typical shooter. A war-torn 1944 collides with the supernatural—two factions, evolving objectives, and choices with teeth.
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

                    {/* Secondary Article (Right - Vertical) */}
                    <div
                        className="lg:col-span-4 group relative aspect-[4/5] lg:aspect-auto border border-white/10 bg-black/40 overflow-hidden cursor-pointer"
                        onClick={() => setOpenRight(true)}
                    >
                        <ImgFill src={CardImg1} alt="Factions" />

                        <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                <Badge color="bg-[#e4d6c3]">Lore Deep Dive</Badge>
                                <h3 className="mt-4 font-custom text-2xl md:text-4xl text-white uppercase leading-none group-hover:text-[#e4d6c3] transition-colors">
                                    Two Forces. No Mercy.
                                </h3>
                                <p className="mt-3 text-gray-400 font-serif text-base line-clamp-3 group-hover:text-gray-200">
                                    When the Rift tore open in 1944, Heaven and Hell sent their own soldiers. Choose your side: The Clerics or The Hell Deputies.
                                </p>
                                <div className="mt-6 flex items-center gap-3 text-sm font-mono text-[#e4d6c3] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <span>Access File</span>
                                    <span className="w-8 h-[1px] bg-[#e4d6c3]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal
                open={openFeature}
                onClose={() => setOpenFeature(false)}
                title="What Makes Revolver Rift Unique"
                image={FeatureImg}
            >
                <p><strong>This is not your typical shooter:</strong></p>
                <ul className="list-disc pl-5 space-y-2 marker:text-red-500">
                    <li><strong className="text-white">Alternate History Warfare:</strong> Fight in a gritty, wartorn 1944 where the supernatural collides with World War II.</li>
                    <li><strong className="text-white">Light vs. Darkness:</strong> Choose your side—the righteous Cleric Deputys or the brutal Cursed Hell Deputys—each with unique playstyles, Perks, and twisted morality.</li>
                    <li><strong className="text-white">Catch the enemies:</strong> Track enemies by supernatural Perks, sound, skill, and strategy. Every fight is earned.</li>
                    <li><strong className="text-white">Dynamic Objectives:</strong> Artifacts, VIP rescues, demonic bosses, anomalies, Arena, Rift Royal, Warmup—only what you extract survives.</li>
                    <li><strong className="text-white">Risk & Power Systems:</strong> Devil’s Chair deals, Rift Storm chaos, and fate-shaping choices.</li>
                    <li><strong className="text-white">Style Meets Grit:</strong> WWII weapons meet supernatural gear. Blood, tension, and tactical decisions define every moment.</li>
                </ul>
                <p className="mt-6 text-red-500 font-custom text-xl">Enter the Rift. Fight for your soul. Extract or die trying.</p>
            </Modal>

            <Modal
                open={openRight}
                onClose={() => setOpenRight(false)}
                title="Choose Your Side"
                image={CardImg1}
            >
                <p>
                    When the Rift tore through reality in 1944, Heaven and Hell unleashed their own soldiers to claim what was left of Earth. Two factions now wage a brutal war for power, relics, and the fate of mankind.
                </p>

                <div className="mt-8 border-l-2 border-[#e4d6c3] pl-6">
                    <h4 className="font-custom text-2xl text-[#e4d6c3] uppercase">The Cleric Deputies</h4>
                    <p className="mt-2 text-sm text-gray-400">Holy doesn’t mean gentle. The Clerics are Heaven’s chosen—a militant order of righteous assassins sent to cleanse the Rift with fire, faith, and steel.</p>
                </div>

                <div className="mt-8 border-l-2 border-red-600 pl-6">
                    <h4 className="font-custom text-2xl text-red-600 uppercase">The Hell Deputies</h4>
                    <p className="mt-2 text-sm text-gray-400">Once damned souls, now Hell’s elite killers. The Hell Deputies are chaos made flesh—brutal enforcers of infernal will, driven by vengeance and power.</p>
                </div>
            </Modal>
        </section>
    );
};

export default NewsLanding;
