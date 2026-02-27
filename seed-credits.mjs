// ============================================================
// seed-credits.mjs  — Run ONCE to populate Strapi from code
// Usage:
//   node seed-credits.mjs
//
// Before running:
//   1. Make sure Strapi is running (npm run develop in /backend)
//   2. Go to Strapi Admin → Settings → API Tokens → Create new token
//      → Type: Full Access  → Copy the token
//   3. Paste the token below as STRAPI_TOKEN
// ============================================================

const STRAPI_URL = "http://localhost:1337";
const STRAPI_TOKEN = "47cbef47f56a91d65165933b84d051a6e4116da29c3c2ba5c7097cace8fd45eccf4c6efa34b706c4e97d0ada7d164554ed4fb102c9f66dc38020de978912a2419da78f74545827aed1520e3aa8ff70fc66772786712d3ebc53d2b7b41be27abea5f68357a036096c0d24a14ed050fc7cbdb8a56154c826b072f0af2c6223c871"; // <-- replace this

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_TOKEN}`,
};

// ─── Helper: wrap plain text in Strapi Blocks format ─────────────────────────
const toBlocks = (text) => [
    {
        type: "paragraph",
        children: [{ type: "text", text }],
    },
];

// ─── Quotes to seed ───────────────────────────────────────────────────────────
const quotesToSeed = [
    { name: "Lead Narrative Designer", role: "NARRATIVE_OP", order: 1, quote: "Sometimes we scream ideas across the room like maniacs and that's how a Devil Chair is born." },
    { name: "Game Programmer", role: "CODE_WIZARD", order: 2, quote: "Balance is important. But chaos? Chaos is beautiful." },
    { name: "Level Design Director", role: "WORLD_BUILDER", order: 3, quote: "We didn't want safe. We wanted unforgettable." },
    { name: "Creative Director", role: "VISIONARY", order: 4, quote: "Most games have lore. We've got an apocalypse. And trust me, it's a lot more fun than average bedtime story." },
    { name: "Combat Designer", role: "COMBAT_LOGIC", order: 5, quote: "You think this is a war? No. It's a blood feast. And you're invited, whether you're ready or not." },
    { name: "Game Director", role: "OVERLORD", order: 6, quote: "Designing Revolver Rift is like teaching a wolf to hunt. But instead of a wolf, it's a warlord. And instead of hunting... it's chaos. But it works." },
];

// ─── Step 1: Create all developer-quote entries ──────────────────────────────
async function seedQuotes() {
    console.log("\n📝 Seeding developer quotes...");
    const createdIds = [];

    for (const q of quotesToSeed) {
        const res = await fetch(`${STRAPI_URL}/api/developer-quotes`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                data: {
                    name: q.name,
                    role: q.role,
                    order: q.order,
                    quote: toBlocks(q.quote),
                    publishedAt: new Date().toISOString(), // auto-publish
                },
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error(`  ❌ Failed to create "${q.name}": ${err}`);
            continue;
        }

        const json = await res.json();
        const id = json?.data?.id;
        createdIds.push(id);
        console.log(`  ✅ Created "${q.name}" (id: ${id})`);
    }

    return createdIds;
}

// ─── Step 2: Create/update the credits-page Single Type ──────────────────────
async function seedCreditsPage(quoteIds) {
    console.log("\n🏠 Seeding credits-page single type...");

    // Single types use PUT to upsert
    const res = await fetch(`${STRAPI_URL}/api/credits-page`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
            data: {
                page_title: "DEVELOPER ARCHIVES",
                page_subtitle: "Echoes of Creation",
                developer_quotes: quoteIds, // link by ID
                publishedAt: new Date().toISOString(),
            },
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        console.error(`  ❌ Failed to update credits-page: ${err}`);
        return;
    }

    console.log(`  ✅ Credits page updated — linked ${quoteIds.length} quotes`);
}

// ─── Run ──────────────────────────────────────────────────────────────────────
(async () => {
    if (STRAPI_TOKEN === "PASTE_YOUR_API_TOKEN_HERE") {
        console.error("\n❌ ERROR: Please paste your Strapi API token into STRAPI_TOKEN before running.\n");
        process.exit(1);
    }

    console.log(`\n🚀 Connecting to Strapi at ${STRAPI_URL}...`);

    const quoteIds = await seedQuotes();

    if (quoteIds.length > 0) {
        await seedCreditsPage(quoteIds);
    }

    console.log("\n✅ Done! Open Strapi admin to see the seeded content.\n");
})();
