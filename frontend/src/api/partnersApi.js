import bgImage from '../assets/Texturelabs_Grunge_353M.webp';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1337";

// ─── Helpers to parse Strapi Blocks without external libraries ──────────────

const extractParagraphs = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return [];
    return blocks
        .filter(b => b.type === 'paragraph' && Array.isArray(b.children))
        .map(b => b.children.map(c => c.text || "").join(""))
        .filter(text => text.trim() !== "");
};

const extractListItems = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return [];
    let items = [];
    blocks.forEach(block => {
        if (block.type === 'list' && Array.isArray(block.children)) {
            block.children.forEach(li => {
                if (li.type === 'list-item' && Array.isArray(li.children)) {
                    items.push(li.children.map(c => c.text || "").join(""));
                }
            });
        }
    });
    return items;
};

// ─── Fallback Data ────────────────────────────────────────────────────────────

export const FALLBACK_PARTNERS_DATA = {
    title: "Revolver Rift Partnership Program",
    intro_paragraphs: [
        "Become part of the Revolver Rift Community and join us on our journey to make this game a global success!",
        "Our partnership program offers exclusive benefits for content creators and streamers, divided into three tiers based on engagement and reach.",
        "Anyone can apply – whether you are a newcomer or an established streamer."
    ],
    outro_paragraphs: [
        "Everyone is welcome to apply for the partnership program.",
        "Once your application is received, our team will carefully review it to determine which tier is the best fit for you.",
        "Please note: The final decision rests solely with KAHRWORKS and may take 1–2 months"
    ],
    stages: [
        {
            title: "Stage 1 Creator",
            description: "For all streamers and content creators regardless of existing partnerships.",
            benefits: ["Access to all DLCs", "Drops for your community", "Your own custom server"]
        },
        {
            title: "Stage 2 Partner",
            description: "Requirement: At least *1 year of active streaming experience*.",
            benefits: [
                "All Stage 1 benefits",
                "Custom server with personal statistics",
                "Access to the Developer WhatsApp group for direct communication with our team",
                "Participation in the annual partner raffle with valuable prizes"
            ]
        },
        {
            title: "Stage 3 Ambassador",
            description: "The highest tier of our partnership program – exclusive and individually tailored.",
            benefits: [
                "All Stage 2 benefits",
                "Custom made graphic material for your stream, designed exclusively for you",
                "Monthly support provided by KAHRWORKS",
                "Additional hardware support",
                "Further conditions will be shared after an official request via email"
            ]
        }
    ],
    logos: [],
    backgroundImage: bgImage
};

// ─── API Fetcher ─────────────────────────────────────────────────────────────

export const getPartnersPageData = async () => {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/partners-page?populate[stages]=*&populate[logos][populate]=logo&populate[background_image]=*`
        );
        if (!res.ok) throw new Error("Strapi unavailable");

        const json = await res.json();
        const data = json.data;
        if (!data) return FALLBACK_PARTNERS_DATA;

        const imgUrl = data.background_image?.url;

        let introParagraphs = extractParagraphs(data.intro_text);
        if (introParagraphs.length === 0) introParagraphs = FALLBACK_PARTNERS_DATA.intro_paragraphs;

        let outroParagraphs = extractParagraphs(data.outro_text);
        if (outroParagraphs.length === 0) outroParagraphs = FALLBACK_PARTNERS_DATA.outro_paragraphs;

        const stages = Array.isArray(data.stages) && data.stages.length > 0
            ? data.stages.map(stage => ({
                id: stage.id,
                title: stage.title || "",
                description: stage.description || "",
                // Strapi benefits block parsing, failover to splitting newlines if string
                benefits: stage.benefits
                    ? extractListItems(stage.benefits)
                    : []
            }))
            : FALLBACK_PARTNERS_DATA.stages;

        const logos = Array.isArray(data.logos)
            ? data.logos.map(l => ({
                name: l.name || "",
                url: l.logo?.url ? (l.logo.url.startsWith("http") ? l.logo.url : `${STRAPI_URL}${l.logo.url}`) : null
            })).filter(l => l.url)
            : [];

        return {
            title: data.title || FALLBACK_PARTNERS_DATA.title,
            intro_paragraphs: introParagraphs,
            outro_paragraphs: outroParagraphs,
            stages,
            logos,
            backgroundImage: imgUrl ? (imgUrl.startsWith("http") ? imgUrl : `${STRAPI_URL}${imgUrl}`) : bgImage
        };
    } catch {
        return FALLBACK_PARTNERS_DATA;
    }
};
