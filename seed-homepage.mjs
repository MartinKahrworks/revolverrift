// ============================================================
//  seed-homepage.mjs
//  Run once to push hardcoded home-page content into Strapi.
//
//  Usage:  node seed-homepage.mjs
//
//  ⚠️  Media fields (background_image, feature icons, trailer
//      thumbnail) must be uploaded manually in the Strapi admin
//      after running this script.
//
//  ⚠️  Ensure the Public role in Strapi has `find` permission
//      for `home-page` (Settings → Roles → Public).
// ============================================================

const STRAPI_URL = "http://localhost:1337";
const STRAPI_TOKEN = "47cbef47f56a91d65165933b84d051a6e4116da29c3c2ba5c7097cace8fd45eccf4c6efa34b706c4e97d0ada7d164554ed4fb102c9f66dc38020de978912a2419da78f74545827aed1520e3aa8ff70fc66772786712d3ebc53d2b7b41be27abea5f68357a036096c0d24a14ed050fc7cbdb8a56154c826b072f0af2c6223c871";

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_TOKEN}`,
};

// ─── Rich Text (blocks) helper ────────────────────────────────────────────────
const toBlocks = (text) => [
    {
        type: "paragraph",
        children: [{ type: "text", text }],
    },
];

// ─── Home page content (mirrors current hardcoded components) ─────────────────

const homepageData = {
    // ── Hero ──────────────────────────────────────────────────────────────────
    // background_image must be uploaded manually in admin (skull.png)
    hero: {
        title: "",         // Hero currently has no visible title text
        subtitle: "",      // Hero currently has no visible subtitle text
        button_text: "",   // Store logos are commented out; no CTA button yet
        button_link: "",
    },

    // ── Features ──────────────────────────────────────────────────────────────
    // feature.icon is a media field — upload icons manually in admin if needed
    features: {
        section_title: "Core Pillars",
        features: [
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
    },

    // ── About ─────────────────────────────────────────────────────────────────
    // 'about' is repeatable in Strapi — sent as an array
    about: [
        {
            title: "About The Game",
            description: toBlocks(
                "RevolverRift is a hardcore extraction shooter set in a fractured reality. " +
                "Navigate through cursed compounds, fight against anomalous entities, and " +
                "survive the wrath of other players. Your only goal: Extract the artifact " +
                "before the Rift collapses."
            ),
            statistics: [
                { number: 65, label: "Unique Classes" },
                { number: 145, label: "Epic Bosses" },
                { number: 35, label: "Zones" },
            ],
        },
    ],

    // ── Trailer ───────────────────────────────────────────────────────────────
    // 'trailer' is repeatable — sent as an array
    // thumbnail must be uploaded manually in admin (poster2.png)
    // video_url points to the local asset path (can be updated to a CDN URL later)
    trailer: [
        {
            video_url: "/assets/newassets/1.mp4",
        },
    ],
};

// ─── Push to Strapi ───────────────────────────────────────────────────────────
async function seedHomePage() {
    console.log("\n🏠 Seeding home-page single type...");
    console.log(`   Strapi at: ${STRAPI_URL}\n`);

    const res = await fetch(`${STRAPI_URL}/api/home-page`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
            data: {
                ...homepageData,
                publishedAt: new Date().toISOString(),
            },
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        console.error(`❌ Failed to seed home-page: ${res.status} ${res.statusText}`);
        console.error(err);
        return;
    }

    const json = await res.json();
    console.log("✅ home-page seeded successfully!");
    console.log(`   Document ID: ${json?.data?.documentId ?? json?.data?.id}`);

    console.log("\n📋 Next steps:");
    console.log("   1. Open Strapi admin → Content Manager → home-page");
    console.log("   2. Upload background image (skull.png) to the hero.background_image field");
    console.log("   3. Upload trailer thumbnail (poster2.png) to trailer[0].thumbnail");
    console.log("   4. Optionally upload icons for each feature item");
    console.log("   5. Ensure Public role has 'find' permission for home-page");
    console.log("      (Settings → Users & Permissions → Roles → Public)\n");
}

seedHomePage().catch(console.error);
