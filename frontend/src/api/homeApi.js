import fallbackImage from "../assets/content1.webp";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

// ─── Promise cache — stores the in-flight/resolved Promise, not just the result ─
// All callers (Hero, Features, AboutGame, Trailer, CinematicSlider, SlantedGallery)
// await this same Promise — guarantees exactly ONE network request regardless of
// how many components mount simultaneously.
let _homePagePromise = null;

// ─── Image URL resolver ────────────────────────────────────────────────────────
const resolveImageUrl = (imageObj, fallback = fallbackImage) => {
    if (!imageObj) return fallback;

    // If a string (url) was passed directly by accident, handle it
    if (typeof imageObj === "string") {
        if (imageObj.startsWith("http")) return imageObj;
        return `${STRAPI_URL}${imageObj}`;
    }

    let url = imageObj.url;

    // Prefer compressed formats over the original uncompressed image size
    if (imageObj.formats) {
        if (imageObj.formats.large) url = imageObj.formats.large.url;
        else if (imageObj.formats.medium) url = imageObj.formats.medium.url;
    }

    if (!url) return fallback;
    if (url.startsWith("http")) return url;   // External URL/CDN
    return `${STRAPI_URL}${url}`;             // Local Strapi upload
};

// ─── Rich Text (blocks) → plain string ────────────────────────────────────────
const extractPlainText = (blocks) => {
    if (!blocks) return "";
    if (typeof blocks === "string") return blocks;
    if (!Array.isArray(blocks)) return "";
    return blocks
        .map((block) =>
            Array.isArray(block.children)
                ? block.children.map((c) => c.text || "").join("")
                : ""
        )
        .join(" ")
        .trim();
};

// ─── Fallback data (always shown until Strapi responds) ───────────────────────

export const FALLBACK_HERO = {
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    backgroundImage: fallbackImage,
    cinematicSlides: [],     // [] → CinematicSlider uses local gun images
};

export const FALLBACK_FEATURES = {
    sectionTitle: "Core Pillars",
    items: [
        {
            title: "THE 1942 OUTBREAK",
            description:
                "An anomaly tore reality apart in 1942, unleashing a demonic infestation across Europe that forced a global alliance.",
        },
        {
            title: "DEPUTY ABILITIES",
            description:
                "Harness unnatural Rift powers using special regulating cards to summon advanced weaponry and tactical traps.",
        },
        {
            title: "BLACKRISE TECHNOLOGY",
            description:
                "Utilize weapons infused with Rift energy, developed by the mysterious organization that built the last strongholds of humanity.",
        },
    ],
};

export const FALLBACK_ABOUT = {
    title: "About The Game",
    subtitle: "The Story",
    description:
        "RevolverRift is a hardcore extraction shooter set in a fractured reality. " +
        "Navigate through cursed compounds, fight against anomalous entities, and " +
        "survive the wrath of other players. Your only goal: Extract the artifact " +
        "before the Rift collapses.",
    statistics: [
        { number: 65, label: "Unique Classes" },
        { number: 145, label: "Epic Bosses" },
        { number: 35, label: "Zones" },
    ],
};

export const FALLBACK_TRAILER = {
    videoUrl: null,
    thumbnailUrl: fallbackImage,
};

// imageKey maps to local imports inside SlantedGallery.jsx
export const FALLBACK_GALLERY_ITEMS = [
    { id: 1, title: 'CHARACTERS', link: '/characters', openInNewTab: false, buttonText: 'Explore', imageKey: 'char2', position: 'center 20%' },
    { id: 2, title: 'SHOWCASE', link: '/showcase', openInNewTab: false, buttonText: 'Explore', imageKey: 'gun2', position: 'center' },
    { id: 3, title: 'GAME DEMO', link: '#', openInNewTab: false, buttonText: 'Explore', imageKey: 'gun3', position: 'center' },
    { id: 4, title: 'BLOGS', link: '/blogs', openInNewTab: false, buttonText: 'Explore', imageKey: 'gun4', position: 'center' },
];

export const FALLBACK_NEWS = [
    {
        id: "the-art-of-building-immersion",
        title: "The Art of Building Immersion",
        image: fallbackImage,
        description: "Creating a truly immersive experience isn’t just about visuals—it’s about the small details that pull players into another world.",
        fullDescription: "Creating a truly immersive experience isn’t just about visuals—it’s about the small details that pull players into another world. From ambient sounds to the way light filters through a room, these subtle touches invite players to feel like they’re not just playing a game, but living in it.",
        date: "2025-08-26",
        link: "the-art-of-building-immersion",
        category: "FEATURE ANALYSIS",
    },
    {
        id: "the-power-of-uncertainty",
        title: "The Power of Uncertainty: Creating Suspense",
        image: fallbackImage,
        description: "Suspense is the art of leaving players uncertain about what comes next. It’s not just the big moments that make players tense it’s the quiet ones too.",
        fullDescription: "Suspense is the art of leaving players uncertain about what comes next. It’s not just the big moments that make players tense it’s the quiet ones too. The moments of silence, slow pacing, and what players don’t see, often have the greatest impact.",
        date: "2025-08-20",
        link: "the-power-of-uncertainty",
        category: "LORE DEEP DIVE",
    },
    {
        id: "the-invisible-work",
        title: "The Invisible Work: Making the Game Feel Real",
        image: fallbackImage,
        description: "Some of the most important work in game design is invisible. It’s the subtle things.",
        fullDescription: "Some of the most important work in game design is invisible. It’s the subtle animations, ambient sounds, and interaction feedback that make the world feel real. Whether it’s a hand movement or the soft rustle of leaves, these small details are what create a living, breathing world.",
        date: "2025-08-15",
        link: "the-invisible-work",
        category: "DEVELOPMENT LOG",
    }
];

// ─── Internal fetch function ──────────────────────────────────────────────────
const _fetchHomePageData = async () => {
    try {
        // Parallel calls for speed, cached for subsequent renders
        const [homeRes, galleryRes, newsRes] = await Promise.all([
            fetch(
                `${STRAPI_URL}/api/home-page` +
                `?populate[hero][populate][background_image]=true` +
                `&populate[hero][populate][cinematic_slider]=true` +
                `&populate[features][populate][features]=true` +
                `&populate[about][populate][statistics]=true` +
                `&populate[trailer][populate][thumbnail]=true`
            ),
            fetch(`${STRAPI_URL}/api/gallery-items?populate=*&sort=order:asc`),
            fetch(`${STRAPI_URL}/api/blogs?populate=*&sort=publish_date:desc&pagination[limit]=3`)
        ]);

        if (!homeRes.ok) {
            if (import.meta.env.DEV) {
                console.error(`[homeApi] home-page fetch failed: ${homeRes.status} ${homeRes.statusText}`);
            }
            return null;
        }

        const homeJson = await homeRes.json();
        const galleryJson = galleryRes.ok ? await galleryRes.json() : { data: [] };
        const newsJson = newsRes.ok ? await newsRes.json() : { data: [] };

        const data = homeJson?.data;
        if (!data) return null;


        // ── Hero ──────────────────────────────────────────────────────────────
        // populate=* on home-page includes component fields + their direct media
        const hero = data.hero
            ? {
                title: data.hero.title || "",
                subtitle: data.hero.subtitle || "",
                buttonText: data.hero.button_text || "",
                buttonLink: data.hero.button_link || "",
                backgroundImage: resolveImageUrl(data.hero.background_image, FALLBACK_HERO.backgroundImage),
                cinematicSlides: Array.isArray(data.hero.cinematic_slider)
                    ? data.hero.cinematic_slider.map((img) => ({
                        id: img.id,
                        url: resolveImageUrl(img, FALLBACK_HERO.backgroundImage),
                        title: img.name || "",
                    }))
                    : [],
            }
            : FALLBACK_HERO;

        // ── Features ──────────────────────────────────────────────────────────
        let features = FALLBACK_FEATURES;
        if (data.features) {
            const rawItems = Array.isArray(data.features.features) ? data.features.features : [];
            features = {
                sectionTitle: data.features.section_title || FALLBACK_FEATURES.sectionTitle,
                items: rawItems.length > 0
                    ? rawItems.map((f) => ({ title: f.title || "", description: f.description || "" }))
                    : FALLBACK_FEATURES.items,
            };
        }

        // ── About ─────────────────────────────────────────────────────────────
        let about = FALLBACK_ABOUT;
        const rawAbout = Array.isArray(data.about) ? data.about[0] : null;
        if (rawAbout) {
            const rawStats = Array.isArray(rawAbout.statistics) ? rawAbout.statistics : [];
            about = {
                title: rawAbout.title || FALLBACK_ABOUT.title,
                subtitle: FALLBACK_ABOUT.subtitle,
                description: extractPlainText(rawAbout.description) || FALLBACK_ABOUT.description,
                statistics: rawStats.length > 0
                    ? rawStats.map((s) => ({ number: s.number, label: s.label }))
                    : FALLBACK_ABOUT.statistics,
            };
        }

        // ── Trailer ───────────────────────────────────────────────────────────
        let trailer = FALLBACK_TRAILER;
        const rawTrailer = Array.isArray(data.trailer) ? data.trailer[0] : null;
        if (rawTrailer) {
            trailer = {
                videoUrl: rawTrailer.video_url || null,
                thumbnailUrl: resolveImageUrl(rawTrailer.thumbnail, FALLBACK_TRAILER.thumbnailUrl),
            };
        }

        // ── Gallery Items — from separate /api/gallery-items?populate=* call ─
        // This reliably returns each item's image since it's a flat populate on
        // the collection directly (no nested bracket syntax needed)
        const rawGallery = Array.isArray(galleryJson?.data) ? galleryJson.data : [];
        const galleryItems = rawGallery.map((item, index) => ({
            id: item.id,
            order: typeof item.order === 'number' ? item.order : null,
            title: item.title || '',
            link: item.link || '#',
            openInNewTab: item.open_in_new_tab === true,
            buttonText: item.button_text || 'Explore',
            imageUrl: resolveImageUrl(item.image, FALLBACK_HERO.backgroundImage),
        }));
        // galleryItems may be [] — SlantedGallery falls back per-slot in that case

        // ── Latest News (Blogs) ───────────────────────────────────────────────
        const rawNews = Array.isArray(newsJson?.data) ? newsJson.data : [];
        const latestNews = rawNews.length > 0 ? rawNews.map((item, index) => ({
            id: item.documentId || item.id,
            title: item.title,
            link: item.slug,
            description: item.excerpt,
            fullDescription: item.content,
            image: resolveImageUrl(item.cover_image, FALLBACK_NEWS[index % FALLBACK_NEWS.length].image),
            date: item.publish_date,
            category: item.category || (index === 0 ? "FEATURE ANALYSIS" : index === 1 ? "LORE DEEP DIVE" : "DEVELOPMENT LOG")
        })) : FALLBACK_NEWS;

        _homePagePromise = Promise.resolve({ hero, features, about, trailer, galleryItems, latestNews });
        return { hero, features, about, trailer, galleryItems, latestNews };

    } catch (err) {
        console.error("[homeApi] getHomePage error:", err);
        return null;
    }
};

// ─── Auto-prefetch at module import time ──────────────────────────────────────
// Starts the fetch the moment homeApi.js is imported (before any component renders).
// By the time the loader finishes, Strapi data is already resolved in the Promise.
_homePagePromise = _fetchHomePageData();

// ─── Public API ───────────────────────────────────────────────────────────────
// Returns the same Promise to every caller — zero duplicate requests.
export const getHomePage = () => _homePagePromise;

// Call this to force a fresh fetch (e.g. after admin content update in same session)
export const clearHomePageCache = () => {
    _homePagePromise = _fetchHomePageData();
};
