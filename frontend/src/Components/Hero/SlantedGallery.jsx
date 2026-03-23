import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Local fallback images ─────────────────────────────────────────────────────
import char2 from '../../assets/newassets/char2.png';
import gun2 from '../../assets/newassets/GUN2.png';
import gun3 from '../../assets/newassets/GUN3.png';
import gun4 from '../../assets/newassets/GUN4.png';
import { getHomePage } from '../../api/homeApi';

// ── 4 fixed fallback slots — always the safety net ───────────────────────────
const PANEL_COUNT = 4;

const FALLBACK_SLOTS = [
    { slot: 1, title: 'NEWS', link: '/news', openInNewTab: false, buttonText: 'Explore', image: char2, position: 'center 20%' },
    { slot: 2, title: 'SHOWCASE', link: '/showcase', openInNewTab: false, buttonText: 'Explore', image: gun2, position: 'center' },
    { slot: 3, title: 'GAME DEMO', link: '#', openInNewTab: false, buttonText: 'Explore', image: gun3, position: 'center' },
    { slot: 4, title: 'BLOGS', link: '/blogs', openInNewTab: false, buttonText: 'Explore', image: gun4, position: 'center' },
];

// ── Slot-based merge ──────────────────────────────────────────────────────────
// Rules:
//   - Always returns exactly PANEL_COUNT (4) panels
//   - CMS item with order=N overrides slot N (1–4 only; 5+ ignored)
//   - If CMS slot has no image → keep fallback image for that slot
//   - Client can't accidentally add a 5th panel
const buildPanels = (cmsItems = []) => {
    // Deep-copy the 4 fallback slots as base
    const panels = FALLBACK_SLOTS.map((s) => ({ ...s }));

    cmsItems.forEach((cmsItem) => {
        const slotNum = cmsItem.order;
        if (!slotNum || slotNum < 1 || slotNum > PANEL_COUNT) return; // ignore out-of-range

        const idx = slotNum - 1;
        panels[idx] = {
            ...panels[idx],                                     // fallback base
            slot: slotNum,
            title: cmsItem.title || panels[idx].title,
            link: cmsItem.link || panels[idx].link,
            openInNewTab: cmsItem.openInNewTab,
            buttonText: cmsItem.buttonText || panels[idx].buttonText,
            // Use CMS image if available, else keep the fallback local image
            image: cmsItem.imageUrl || panels[idx].image,
            position: cmsItem.imageUrl ? 'center' : panels[idx].position,
        };
    });

    return panels; // always exactly 4
};

// ── Component ─────────────────────────────────────────────────────────────────
const SlantedGallery = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    // Always 4 panels — starts with all fallback, CMS overrides slots on load
    const [panels, setPanels] = useState(() => buildPanels([]));

    useEffect(() => {
        getHomePage().then((data) => {
            // data.galleryItems is always an array ([] if empty)
            // buildPanels merges CMS items into slots, caps at 4
            setPanels(buildPanels(data?.galleryItems ?? []));
        });
    }, []);

    const handleExplore = (e, panel) => {
        e.stopPropagation();
        if (!panel.link || panel.link === '#') return;

        if (panel.openInNewTab) {
            window.open(panel.link, '_blank', 'noopener,noreferrer');
        } else if (panel.link.startsWith('http')) {
            window.location.href = panel.link;
        } else {
            navigate(panel.link);
        }
    };

    return (
        <section className="relative w-full overflow-hidden bg-black flex flex-col md:flex-row" style={{ height: 'min(100dvh, 600px)' }}>
            {panels.map((panel, index) => {
                const isHovered = hoveredIndex === index;
                const isOtherHovered = hoveredIndex !== null && !isHovered;
                const slotLabel = String(panel.slot).padStart(2, '0');

                return (
                    <div
                        key={panel.slot}
                        className={`
                            relative flex-1 min-h-0 md:h-full
                            transition-[flex-grow,opacity] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                            group
                            border-b-[3px] md:border-b-0 md:border-r-[15px] border-black
                            overflow-hidden md:skew-x-[-15deg]
                            ${isHovered ? 'flex-[3] md:flex-[4]' : 'flex-[1]'}
                            ${isOtherHovered ? 'opacity-60' : 'opacity-100'}
                        `}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setHoveredIndex(isHovered ? null : index)}
                    >
                        {/* Background image — counter-skewed */}
                        <div className="absolute inset-0 w-full h-full md:skew-x-[15deg] md:scale-x-125 overflow-hidden origin-center bg-black">
                            <div
                                className="absolute inset-0 md:inset-[-20%] w-full md:w-[140%] h-full transition-transform duration-700 ease-out group-hover:scale-110"
                                style={{
                                    backgroundImage: panel.image ? `url(${panel.image})` : 'none',
                                    backgroundColor: panel.image ? undefined : '#111',
                                    backgroundSize: 'cover',
                                    backgroundPosition: panel.position || 'center',
                                }}
                            >
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />
                            </div>
                        </div>

                        {/* Content — counter-skewed */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none md:skew-x-[15deg] px-2 text-center">

                            {/* Slot number */}
                            <span className={`
                                font-vintage text-white/20 font-black
                                transition-all duration-500
                                ${isHovered ? 'text-4xl md:text-7xl mb-1 text-white/10' : 'text-2xl md:text-5xl mb-0'}
                            `}>
                                {slotLabel}
                            </span>

                            {/* Title */}
                            <h2 className={`
                                font-black font-vintage uppercase tracking-widest
                                drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] text-white select-none
                                transition-all duration-500 transform
                                ${isHovered
                                    ? 'text-xl md:text-4xl scale-110 mb-3'
                                    : hoveredIndex === null
                                        ? 'text-sm md:text-2xl'
                                        : 'text-xs md:text-lg'}
                            `}>
                                {panel.title}
                            </h2>

                            {/* Explore button */}
                            {panel.link !== '#' && (
                                <button
                                    onClick={(e) => handleExplore(e, panel)}
                                    className={`
                                        px-5 py-2 md:px-8 md:py-3 bg-white text-black
                                        font-black text-[10px] md:text-sm uppercase tracking-[0.2em]
                                        hover:bg-[#ff3333] hover:text-white transition-all duration-300
                                        pointer-events-auto shadow-lg
                                        ${isHovered
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-4 pointer-events-none'}
                                    `}
                                >
                                    {panel.buttonText || 'Explore'}
                                    {panel.openInNewTab && (
                                        <span className="ml-1.5 text-[10px] align-super">↗</span>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default SlantedGallery;
