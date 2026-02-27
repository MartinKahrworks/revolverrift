// ============================================================
//  contentApi.js
//  Fetches full-bleed dynamic content sections from Strapi CMS.
//  Falls back to hardcoded local assets if Strapi is unavailable.
// ============================================================

import banner8Img from "../assets/content4.webp";
import banner9Img from "../assets/content3.webp";
import banner10Img from "../assets/content2.webp";

// A utility mapper roughly transforming Blocks to a simpler format for fallback
const toBlocks = (paragraphs) => {
    return paragraphs.map(text => ({
        type: "paragraph",
        children: [{ type: "text", text }]
    }));
};

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1337";

export const FALLBACK_LORE_SECTIONS = [
    {
        id: 1,
        title: "Cursed Compounds",
        body: toBlocks([
            "Scattered across the Rift are 16 compounds, each a crucible of combat.",
            "From sawmills to ironworks, these strongholds hold weapons, skill cards, and the path to the artifact or VIP.",
            "Enter them ready for war.",
            "Because inside, every team, every monster, and every shadow is your enemy."
        ]),
        background_image: banner8Img,
        align_text: "right",
        bg_position: "30% 80%",
        order: 1,
    },
    {
        id: 2,
        title: "Forsaken Villages",
        body: toBlocks([
            "The villages of Europe lie frozen in time, their streets patrolled by demons and restless dead.",
            "Every creaking cabin and abandoned barn hides danger, loot, or a rival waiting in the dark.",
            "Survival here demands stealth, courage, and a revolver ready to fire.",
            "Because silence never lasts long in the Rift."
        ]),
        background_image: banner9Img,
        align_text: "left",
        bg_position: "80% 50%",
        order: 2,
    },
    {
        id: 3,
        title: "Into the Abyss",
        body: toBlocks([
            "Beyond the compounds lies the abyss: swamps, forests, and caves where light struggles to survive.",
            "Here stalk the Anomaly, the Reaper, the Crower, and horrors whispered only in nightmares.",
            "Those who push this deep face the Rift at its cruelest but those who escape carry its greatest rewards."
        ]),
        background_image: banner10Img,
        align_text: "right",
        bg_position: "30% 80%",
        order: 3,
    }
];

export const getContentSections = () => {
    return [...FALLBACK_LORE_SECTIONS].sort((a, b) => a.order - b.order);
};

export const getContentSectionsFromStrapi = async () => {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/contents?populate=*&sort=order:asc`
        );
        if (!res.ok) throw new Error("Strapi unavailable");

        const json = await res.json();
        if (!json?.data?.length) throw new Error("Empty response");

        return json.data.map((item) => {
            const imgUrl = item.background_image?.url;
            return {
                id: item.documentId ?? item.id,
                title: item.title ?? "",
                body: item.body ?? [],
                background_image: imgUrl ? (imgUrl.startsWith("http") ? imgUrl : `${STRAPI_URL}${imgUrl}`) : null,
                align_text: item.align_text ?? "right",
                bg_position: item.bg_position ?? "center center",
                order: item.order ?? 99,
            };
        });
    } catch {
        return getContentSections();
    }
};
