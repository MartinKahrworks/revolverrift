// ============================================================
//  seed-news-items.mjs
//  Uploads the two hardcoded NewsLanding cards to Strapi.
//
//  Usage:  node seed-news-items.mjs
//
//  ⚠️  Images (FeatureImg / CardImg1) must be uploaded manually
//      in Strapi Admin after running this script.
//
//  ⚠️  Ensure the Public role has `find` + `findOne` permissions
//      for the `news-item` collection
//      (Settings → Roles → Public → news-item).
// ============================================================

const STRAPI_URL = "http://127.0.0.1:1337";
// Reuse the same API token from seed-homepage.mjs
const STRAPI_TOKEN = "47cbef47f56a91d65165933b84d051a6e4116da29c3c2ba5c7097cace8fd45eccf4c6efa34b706c4e97d0ada7d164554ed4fb102c9f66dc38020de978912a2419da78f74545827aed1520e3aa8ff70fc66772786712d3ebc53d2b7b41be27abea5f68357a036096c0d24a14ed050fc7cbdb8a56154c826b072f0af2c6223c871";

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_TOKEN}`,
};

const toBlocks = (text) => [
    { type: "paragraph", children: [{ type: "text", text }] },
];

// ─── The two hardcoded cards from NewsLanding.jsx ─────────────────────────────
const newsItems = [
    {
        title: "What Makes Revolver Rift Unique",
        badge_label: "Feature Analysis",
        badge_color: "red",
        excerpt: "This is not your typical shooter. A war-torn 1944 collides with the supernatural—two factions, evolving objectives, and choices with teeth.",
        content: toBlocks(
            "This is not your typical shooter. A war-torn 1944 collides with the supernatural—two factions, evolving objectives, and choices with teeth. " +
            "Choose your side—the righteous Cleric Deputies or the brutal Cursed Hell Deputies—each with unique playstyles, Perks, and twisted morality. " +
            "Track enemies by supernatural Perks, sound, skill, and strategy. Every fight is earned. " +
            "Dynamic Objectives: Artifacts, VIP rescues, demonic bosses, anomalies, Arena, Rift Royal, Warmup—only what you extract survives. " +
            "Devil's Chair deals, Rift Storm chaos, and fate-shaping choices. WWII weapons meet supernatural gear."
        ),
        publish_date: "2025-08-26",
        order: 1,
        publishedAt: new Date().toISOString(),
    },
    {
        title: "Two Forces. No Mercy.",
        badge_label: "Lore Deep Dive",
        badge_color: "beige",
        excerpt: "When the Rift tore open in 1944, Heaven and Hell sent their own soldiers. Choose your side: The Clerics or The Hell Deputies.",
        content: toBlocks(
            "When the Rift tore through reality in 1944, Heaven and Hell unleashed their own soldiers to claim what was left of Earth. " +
            "Two factions now wage a brutal war for power, relics, and the fate of mankind. " +
            "The Cleric Deputies: Holy doesn't mean gentle. The Clerics are Heaven's chosen—a militant order of righteous assassins sent to cleanse the Rift with fire, faith, and steel. " +
            "The Hell Deputies: Once damned souls, now Hell's elite killers. Brutal enforcers of infernal will, driven by vengeance and power."
        ),
        publish_date: "2025-08-20",
        order: 2,
        publishedAt: new Date().toISOString(),
    },
];

// ─── Push each item to Strapi ─────────────────────────────────────────────────
async function seedNewsItems() {
    console.log("\n📰 Seeding News Items into Strapi...");
    console.log(`   Strapi at: ${STRAPI_URL}\n`);

    for (const item of newsItems) {
        const res = await fetch(`${STRAPI_URL}/api/news-items`, {
            method: "POST",
            headers,
            body: JSON.stringify({ data: item }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error(`❌ Failed to create "${item.title}": ${res.status} ${res.statusText}`);
            console.error(err);
            continue;
        }

        const json = await res.json();
        console.log(`✅ Created: "${item.title}"`);
        console.log(`   ID: ${json?.data?.documentId ?? json?.data?.id}`);
    }

    console.log("\n📋 Next steps:");
    console.log("   1. Open Strapi Admin → Content Manager → News Item");
    console.log("   2. Upload the cover_image for card 1 (the war/feature image - newassets/9.webp)");
    console.log("   3. Upload the cover_image for card 2 (the faction image - newassets/7.webp)");
    console.log("   4. Settings → Roles → Public → news-item → check 'find' and 'findOne'");
    console.log("   5. Refresh your frontend — NewsLanding will now pull from Strapi!\n");
}

seedNewsItems().catch(console.error);
