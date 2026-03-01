import logo1 from "../assets/logo/Logo1.png";
import logo2 from "../assets/logo/Logo2.png";
import logo3 from "../assets/logo/Logo3.png";
import logo4 from "../assets/logo/Logo4.png";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1337";

const FALLBACK_SOCIAL_LINKS = [
    { href: 'https://discord.com/invite/QP6RmdUSA8', label: 'DISCORD', img: 'https://cdn-icons-png.flaticon.com/512/5968/5968756.png' },
    { href: 'https://reddit.com/RevolverRift', label: 'REDDIT', img: 'https://cdn-icons-png.flaticon.com/512/2111/2111589.png' },
    { href: 'https://www.youtube.com/@revolverrift', label: 'YOUTUBE', img: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png' },
    { href: 'https://x.com/RevolverRift', label: 'TWITTER', img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
    { href: 'https://facebook.com/revolverrift', label: 'FACEBOOK', img: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' },
    { href: 'https://www.instagram.com/revolverrift/', label: 'INSTAGRAM', img: 'https://cdn-icons-png.flaticon.com/512/1384/1384063.png' },
    { href: 'mailto:info@revolver-rift.com', label: 'MAIL', img: 'https://cdn-icons-png.flaticon.com/512/732/732200.png' },
    { href: '#', label: 'IMPRINT', img: 'https://cdn-icons-png.flaticon.com/512/2965/2965358.png', isImprintModal: true },
];

export const FALLBACK_FOOTER_DATA = {
    connectHeading: "Connect\nWith Us",
    socialLinks: FALLBACK_SOCIAL_LINKS,
    bottomLogos: [logo1, logo2, logo3, logo4],
    copyrightText: `© ${new Date().getFullYear()} KAHRWORKS GMBH — All rights reserved.`,
    companyUrl: "https://www.kahrworks.at"
};

export const getFooterData = async () => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/footer?populate[0]=bottomLogos&populate[1]=socialLinks.icon`);
        if (!res.ok) return FALLBACK_FOOTER_DATA;

        const json = await res.json();
        const data = json.data;
        if (!data) return FALLBACK_FOOTER_DATA;

        let parsedSocialLinks = FALLBACK_SOCIAL_LINKS;
        if (data.socialLinks && data.socialLinks.length > 0) {
            parsedSocialLinks = data.socialLinks.map(s => {
                const imgUrl = s.icon?.url;
                return {
                    href: s.href,
                    label: s.label,
                    isImprintModal: s.isImprintModal,
                    img: imgUrl ? (imgUrl.startsWith("http") ? imgUrl : `${STRAPI_URL}${imgUrl}`) : null
                };
            });
        }

        let parsedLogos = FALLBACK_FOOTER_DATA.bottomLogos;
        if (data.bottomLogos && data.bottomLogos.length > 0) {
            parsedLogos = data.bottomLogos.map(logo => {
                const imgUrl = logo.url;
                return imgUrl ? (imgUrl.startsWith("http") ? imgUrl : `${STRAPI_URL}${imgUrl}`) : null;
            }).filter(Boolean);
        }

        return {
            connectHeading: data.connectHeading?.replace(/\\n/g, '\n') || FALLBACK_FOOTER_DATA.connectHeading,
            socialLinks: parsedSocialLinks,
            bottomLogos: parsedLogos,
            copyrightText: data.copyrightText || FALLBACK_FOOTER_DATA.copyrightText,
            companyUrl: data.companyUrl || FALLBACK_FOOTER_DATA.companyUrl
        };

    } catch (e) {
        console.error("Failed fetching footer:", e);
        return FALLBACK_FOOTER_DATA;
    }
};
