// ============================================================
//  galleryApi.js
//  Fetches showcase gallery media from Strapi CMS.
//  Falls back to hardcoded local assets if Strapi is unavailable.
// ============================================================

// Local fallback images
import image1 from "../assets/shot2.1.webp";
import image2 from "../assets/shot2.webp";
import image3 from "../assets/newassets/9.webp";
import image4 from "../assets/newassets/6.webp";
import image5 from "../assets/newassets/7.webp";
import image6 from "../assets/content1.webp";
import image7 from "../assets/content2.webp";
import image8 from "../assets/content3.webp";
import image9 from "../assets/content4.webp";
import image10 from "../assets/newassets/Mosin_Nagant_3.webp";
import image11 from "../assets/newassets/WINCHESTER1.webp";
import image12 from "../assets/newassets/colt 19111.webp";
import image13 from "../assets/newassets/ice pick 3.webp";
import image14 from "../assets/newassets/p08_2.webp";
import image15 from "../assets/newassets/trench_gun_3.webp";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

// ─── Fallback data (mirrors current hardcoded assets) ─────────────────────────
export const FALLBACK_GALLERY = [
    { id: "media-01", title: "Combat Scene 1", image: image1, category: "screenshot", orientation: "landscape", featured: true, order: 1 },
    { id: "media-02", title: "Combat Scene 2", image: image2, category: "screenshot", orientation: "landscape", featured: false, order: 2 },
    { id: "media-03", title: "Character Detail", image: image3, category: "artwork", orientation: "portrait", featured: false, order: 3 },
    { id: "media-04", title: "Character Action", image: image4, category: "artwork", orientation: "portrait", featured: false, order: 4 },
    { id: "media-05", title: "Environment 1", image: image5, category: "environment", orientation: "square", featured: false, order: 5 },
    { id: "media-06", title: "Gameplay 1", image: image6, category: "screenshot", orientation: "landscape", featured: false, order: 6 },
    { id: "media-07", title: "Gameplay 2", image: image7, category: "screenshot", orientation: "landscape", featured: false, order: 7 },
    { id: "media-08", title: "Gameplay 3", image: image8, category: "screenshot", orientation: "landscape", featured: false, order: 8 },
    { id: "media-09", title: "Gameplay 4", image: image9, category: "screenshot", orientation: "panoramic", featured: false, order: 9 },
    { id: "media-10", title: "Mosin Nagant", image: image10, category: "weapon", orientation: "portrait", featured: false, order: 10 },
    { id: "media-11", title: "Winchester", image: image11, category: "weapon", orientation: "landscape", featured: false, order: 11 },
    { id: "media-12", title: "Colt 1911", image: image12, category: "weapon", orientation: "square", featured: false, order: 12 },
    { id: "media-13", title: "Ice Pick", image: image13, category: "weapon", orientation: "portrait", featured: false, order: 13 },
    { id: "media-14", title: "P08 Luger", image: image14, category: "weapon", orientation: "square", featured: false, order: 14 },
    { id: "media-15", title: "Trench Gun", image: image15, category: "weapon", orientation: "portrait", featured: false, order: 15 },
];

// ─── Strapi fetch ─────────────────────────────────────────────────────────────
export const getGalleryMedia = () => {
    return [...FALLBACK_GALLERY].sort((a, b) => a.order - b.order);
};

export const getGalleryMediaFromStrapi = async () => {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/showcase-page?populate[gallery_items][populate]=image`
        );
        if (!res.ok) throw new Error("Strapi unavailable");

        const json = await res.json();
        const data = json.data;
        if (!data || !data.gallery_items || !data.gallery_items.length) throw new Error("Empty response");

        // Sort items by user-defined order to keep album curation intact
        const sortedItems = [...data.gallery_items].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

        return sortedItems.map((item) => {
            const imgUrl = item.image?.url;
            return {
                id: item.documentId ?? item.id,
                title: item.title ?? "",
                image: imgUrl ? (imgUrl.startsWith("http") ? imgUrl : `${STRAPI_URL}${imgUrl}`) : null,
                category: item.category ?? "screenshot",
                orientation: item.orientation ?? "landscape",
                featured: item.featured ?? false,
                order: item.order ?? 99,
            };
        });
    } catch {
        // Strapi unavailable — return local fallback
        return getGalleryMedia();
    }
};

// ─── Showcase page metadata ────────────────────────────────────────────────────
export const FALLBACK_SHOWCASE_PAGE = {
    page_title: "MEDIA GALLERY",
    subtitle: "// Visual Field Reports",
};

export const getShowcasePageData = async () => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/showcase-page`);
        if (!res.ok) throw new Error("Strapi unavailable");
        const json = await res.json();
        const d = json?.data;
        if (!d) throw new Error("Empty");
        return {
            page_title: d.page_title ?? FALLBACK_SHOWCASE_PAGE.page_title,
            subtitle: d.subtitle ?? FALLBACK_SHOWCASE_PAGE.subtitle,
        };
    } catch {
        return FALLBACK_SHOWCASE_PAGE;
    }
};
