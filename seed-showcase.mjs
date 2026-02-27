// ============================================================
//  seed-showcase.mjs
//  Uploads the 15 hardcoded Showcase Gallery cards to Strapi.
//
//  Usage:  node seed-showcase.mjs
// ============================================================

const STRAPI_URL = "http://127.0.0.1:1337";
const STRAPI_TOKEN = "47cbef47f56a91d65165933b84d051a6e4116da29c3c2ba5c7097cace8fd45eccf4c6efa34b706c4e97d0ada7d164554ed4fb102c9f66dc38020de978912a2419da78f74545827aed1520e3aa8ff70fc66772786712d3ebc53d2b7b41be27abea5f68357a036096c0d24a14ed050fc7cbdb8a56154c826b072f0af2c6223c871";

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_TOKEN}`,
};

const galleryItems = [
    { title: "Combat Scene 1", category: "screenshot", orientation: "landscape", featured: true, order: 1 },
    { title: "Combat Scene 2", category: "screenshot", orientation: "landscape", featured: false, order: 2 },
    { title: "Character Detail", category: "artwork", orientation: "portrait", featured: false, order: 3 },
    { title: "Character Action", category: "artwork", orientation: "portrait", featured: false, order: 4 },
    { title: "Environment 1", category: "environment", orientation: "square", featured: false, order: 5 },
    { title: "Gameplay 1", category: "screenshot", orientation: "landscape", featured: false, order: 6 },
    { title: "Gameplay 2", category: "screenshot", orientation: "landscape", featured: false, order: 7 },
    { title: "Gameplay 3", category: "screenshot", orientation: "landscape", featured: false, order: 8 },
    { title: "Gameplay 4", category: "screenshot", orientation: "panoramic", featured: false, order: 9 },
    { title: "Mosin Nagant", category: "weapon", orientation: "portrait", featured: false, order: 10 },
    { title: "Winchester", category: "weapon", orientation: "landscape", featured: false, order: 11 },
    { title: "Colt 1911", category: "weapon", orientation: "square", featured: false, order: 12 },
    { title: "Ice Pick", category: "weapon", orientation: "portrait", featured: false, order: 13 },
    { title: "P08 Luger", category: "weapon", orientation: "square", featured: false, order: 14 },
    { title: "Trench Gun", category: "weapon", orientation: "portrait", featured: false, order: 15 },
];

async function seedShowcaseItems() {
    console.log("\n📷 Seeding Showcase Gallery Items into Strapi...");
    console.log(`   Strapi at: ${STRAPI_URL}\n`);

    for (const item of galleryItems) {
        const payload = {
            ...item,
            publishedAt: new Date().toISOString(),
        };

        const res = await fetch(`${STRAPI_URL}/api/showcase-galleries`, {
            method: "POST",
            headers,
            body: JSON.stringify({ data: payload }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error(`❌ Failed to create "${item.title}": ${res.status} ${res.statusText}`);
            console.error(err);
            continue;
        }

        const json = await res.json();
        console.log(`✅ Created: "${item.title}"`);
    }

    // Also seed the showcase page
    console.log("\n📄 Seeding Showcase Page config...");
    const pagePayload = {
        page_title: "MEDIA GALLERY",
        subtitle: "// Visual Field Reports",
        publishedAt: new Date().toISOString(),
    };

    // We will just PUT to update if exists, or fetch will create if it's single type. 
    // Single types are usually PUT.
    const pageRes = await fetch(`${STRAPI_URL}/api/showcase-page`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ data: pagePayload }),
    });

    if (pageRes.ok) {
        console.log(`✅ Showcase Page created/updated!`);
    } else {
        console.log(`❌ Failed to seed showcase-page.`);
    }

    console.log("\n📋 Next steps in Strapi Admin:");
    console.log("   1. Open Strapi Admin → Content Manager (NOT Content-Type Builder)");
    console.log("   2. Go to 'showcase-gallery' and upload the images for each row");
    console.log("   3. Settings → Roles → Public → check 'find' and 'findOne' for both showcase-gallery and showcase-page\n");
}

seedShowcaseItems().catch(console.error);
