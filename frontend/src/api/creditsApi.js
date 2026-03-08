const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

// ─── URL helper ───────────────────────────────────────────────────────────────
const resolveImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${STRAPI_URL}${url}`;
};

// ─── Rich Text (Blocks) → plain string ────────────────────────────────────────
const extractPlainText = (blocks) => {
    if (!blocks) return "";
    if (typeof blocks === "string") return blocks;
    if (!Array.isArray(blocks)) return "";
    return blocks
        .map((block) =>
            Array.isArray(block.children)
                ? block.children.map((child) => child.text || "").join("")
                : ""
        )
        .join(" ")
        .trim();
};

const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999);

// ─── Fetch credits page data (3 independent calls, no nested populate) ────────
export const getCreditsPage = async () => {
    try {
        // 1️⃣  Credits page single type — page title & subtitle only
        const pageRes = await fetch(`${STRAPI_URL}/api/credits-page`);
        if (!pageRes.ok) {
            if (import.meta.env.DEV) {
                console.error(`credits-page fetch failed: ${pageRes.status}`);
            }
            return null;
        }
        const pageJson = await pageRes.json();
        const pageData = pageJson?.data ?? {};

        // 2️⃣  All developer quotes — populate=* handles media & simple fields
        const quotesRes = await fetch(
            `${STRAPI_URL}/api/developer-quotes?populate=*&sort=order:asc`
        );
        let quotes = [];
        if (quotesRes.ok) {
            const quotesJson = await quotesRes.json();
            quotes = (quotesJson?.data ?? [])
                .sort(byOrder)
                .map((q) => ({
                    id: q.id,
                    name: q.name || "",
                    role: q.role || "",
                    quote: extractPlainText(q.quote),
                    order: q.order,
                }));
        } else {
            console.error(`developer-quotes fetch failed: ${quotesRes.status}`);
        }

        // 3️⃣  Partner logos — populate=* handles the logo media field
        const logosRes = await fetch(
            `${STRAPI_URL}/api/partner-logos?populate=*&sort=order:asc`
        );
        let partners = [];
        if (logosRes.ok) {
            const logosJson = await logosRes.json();
            partners = (logosJson?.data ?? [])
                .sort(byOrder)
                .map((p) => ({
                    id: p.id,
                    name: p.name || "",
                    logoUrl: resolveImageUrl(p.logo?.url),
                    order: p.order,
                }));
        } else {
            console.error(`partner-logos fetch failed: ${logosRes.status}`);
        }

        return {
            pageTitle: pageData.page_title || "DEVELOPER ARCHIVES",
            pageSubtitle: pageData.page_subtitle || "Echoes of Creation",
            quotes,
            partners,
        };
    } catch (err) {
        console.error("getCreditsPage error:", err);
        return null;
    }
};
