import bgImage from '../assets/Texturelabs_Grunge_353M.webp';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1337";

// ─── Fallback Data ─────────────────────────────────────────────────────────────

export const FALLBACK_PARTNERS_DATA = {
    heroTitle: "Partner Program",
    heroSubtitle: "Join the Revolver Rift creator program. Apply for a partnership tier that fits your content and reach.",
    primaryButtonText: "Apply Now",
    secondaryButtonText: "View Tiers",
    tiersHeading: "Partnership Tiers",
    tiers: [
        {
            stageNumber: "01",
            title: "Creator",
            requirement: "Open to all content creators and streamers regardless of existing partnerships.",
            perks: [
                { title: "Full DLC Access", description: "Access to all downloadable content, expansions, and future releases.", icon: "📦" },
                { title: "Community Drops", description: "Exclusive drops and rewards to share with your audience.", icon: "🎁" },
                { title: "Custom Server", description: "Your own dedicated server to host community events and matches.", icon: "🖥️" },
            ]
        },
        {
            stageNumber: "02",
            title: "Partner",
            requirement: "Requires at least 1 year of active streaming experience.",
            perks: [
                { title: "All Creator Benefits", description: "Everything included in the Creator tier.", icon: "✓" },
                { title: "Personal Statistics Dashboard", description: "Access to a custom server with your personal stream analytics.", icon: "📊" },
                { title: "Developer Direct Line", description: "Direct access to the developer WhatsApp group for real-time communication with our team.", icon: "💬" },
                { title: "Annual Partner Raffle", description: "Participation in the annual partner raffle featuring high-value prizes.", icon: "🏆" },
            ]
        },
        {
            stageNumber: "03",
            title: "Ambassador",
            requirement: "The highest tier — exclusive, individually tailored, and invitation-considered.",
            perks: [
                { title: "All Partner Benefits", description: "Everything included in the Partner tier, elevated.", icon: "✓" },
                { title: "Custom Stream Graphics", description: "Bespoke graphic material for your stream, designed exclusively for you by our team.", icon: "🎨" },
                { title: "Monthly Studio Support", description: "Dedicated monthly support directly from KAHRWORKS.", icon: "🤝" },
                { title: "Hardware Support", description: "Additional hardware support provided by the studio.", icon: "⚙️" },
                { title: "Exclusive Conditions", description: "Further Ambassador-exclusive conditions shared directly after an official request.", icon: "🔒" },
            ]
        }
    ],
    applicationHeading: "How to Apply",
    applicationSteps: [
        { stepNumber: "01", title: "Submit Application", description: "Fill in the application form with your channel details, reach, and content focus." },
        { stepNumber: "02", title: "Team Review", description: "Our team carefully evaluates each application. This may take up to 1–2 months." },
        { stepNumber: "03", title: "Tier Placement", description: "We determine the tier that best fits your profile and reach out with your offer." },
    ],
    applicationNote: "The final decision rests with KAHRWORKS. Review may take 1–2 months.",
    ctaTitle: "Interested in Partnering with Revolver Rift?",
    ctaButtonText: "Apply Now",
    ctaLink: "",
    featuredPartners: [],
    backgroundImage: bgImage,
};

// ─── API Fetcher ───────────────────────────────────────────────────────────────

const resolveUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
};

export const getPartnersPageData = async () => {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/partners-page?populate[tiers][populate][perks]=*&populate[applicationSteps]=*&populate[featuredPartners][populate]=logo&populate[background_image]=*`
        );
        if (!res.ok) throw new Error("Strapi unavailable");

        const json = await res.json();
        const d = json.data;
        if (!d) return FALLBACK_PARTNERS_DATA;

        const tiers = Array.isArray(d.tiers) && d.tiers.length > 0
            ? d.tiers.map(tier => ({
                stageNumber: tier.stageNumber || "",
                title: tier.title || "",
                requirement: tier.requirement || "",
                perks: Array.isArray(tier.perks)
                    ? tier.perks.map(p => ({
                        title: p.title || "",
                        description: p.description || "",
                        icon: p.icon || "◆"
                    }))
                    : []
            }))
            : FALLBACK_PARTNERS_DATA.tiers;

        const applicationSteps = Array.isArray(d.applicationSteps) && d.applicationSteps.length > 0
            ? d.applicationSteps.map(s => ({
                stepNumber: s.stepNumber || "",
                title: s.title || "",
                description: s.description || ""
            }))
            : FALLBACK_PARTNERS_DATA.applicationSteps;

        const featuredPartners = Array.isArray(d.featuredPartners)
            ? d.featuredPartners.map(p => ({
                name: p.name || "",
                url: resolveUrl(p.logo?.url)
            })).filter(p => p.url)
            : [];

        return {
            heroTitle: d.heroTitle || FALLBACK_PARTNERS_DATA.heroTitle,
            heroSubtitle: d.heroSubtitle || FALLBACK_PARTNERS_DATA.heroSubtitle,
            primaryButtonText: d.primaryButtonText || FALLBACK_PARTNERS_DATA.primaryButtonText,
            secondaryButtonText: d.secondaryButtonText || FALLBACK_PARTNERS_DATA.secondaryButtonText,
            tiersHeading: d.tiersHeading || FALLBACK_PARTNERS_DATA.tiersHeading,
            tiers,
            applicationHeading: d.applicationHeading || FALLBACK_PARTNERS_DATA.applicationHeading,
            applicationSteps,
            applicationNote: d.applicationNote || FALLBACK_PARTNERS_DATA.applicationNote,
            ctaTitle: d.ctaTitle || FALLBACK_PARTNERS_DATA.ctaTitle,
            ctaButtonText: d.ctaButtonText || FALLBACK_PARTNERS_DATA.ctaButtonText,
            ctaLink: d.ctaLink || FALLBACK_PARTNERS_DATA.ctaLink,
            featuredPartners,
            backgroundImage: resolveUrl(d.background_image?.url) || bgImage,
        };
    } catch {
        return FALLBACK_PARTNERS_DATA;
    }
};
