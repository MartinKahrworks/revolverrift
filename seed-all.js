const http = require('http');

const STRAPI_URL = "127.0.0.1";
const STRAPI_PORT = 1337;
const STRAPI_TOKEN = "47cbef47f56a91d65165933b84d051a6e4116da29c3c2ba5c7097cace8fd45eccf4c6efa34b706c4e97d0ada7d164554ed4fb102c9f66dc38020de978912a2419da78f74545827aed1520e3aa8ff70fc66772786712d3ebc53d2b7b41be27abea5f68357a036096c0d24a14ed050fc7cbdb8a56154c826b072f0af2c6223c871";

const toBlocks = (text) => [{ type: "paragraph", children: [{ type: "text", text }] }];

const newsItems = [
    {
        title: "What Makes Revolver Rift Unique",
        badge_label: "Feature Analysis",
        badge_color: "red",
        excerpt: "This is not your typical shooter. A war-torn 1944 collides with the supernatural—two factions, evolving objectives, and choices with teeth.",
        content: toBlocks("This is not your typical shooter. A war-torn 1944 collides with the supernatural..."),
        publish_date: "2025-08-26",
        order: 1,
        publishedAt: new Date().toISOString(),
    },
    {
        title: "Two Forces. No Mercy.",
        badge_label: "Lore Deep Dive",
        badge_color: "beige",
        excerpt: "When the Rift tore open in 1944, Heaven and Hell sent their own soldiers. Choose your side: The Clerics or The Hell Deputies.",
        content: toBlocks("When the Rift tore through reality in 1944..."),
        publish_date: "2025-08-20",
        order: 2,
        publishedAt: new Date().toISOString(),
    }
];

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

function postData(path, payload) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ data: { ...payload, publishedAt: new Date().toISOString() } });

        const options = {
            hostname: STRAPI_URL,
            port: STRAPI_PORT,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${STRAPI_TOKEN}`,
                'Content-Length': Buffer.byteLength(data)
            },
            timeout: 5000 // 5 seconds timeout
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body }));
        });

        req.on('error', e => reject(e));
        req.on('timeout', () => { req.destroy(); reject(new Error("Timeout!")); });
        req.write(data);
        req.end();
    });
}

function putData(path, payload) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ data: { ...payload, publishedAt: new Date().toISOString() } });

        const options = {
            hostname: STRAPI_URL,
            port: STRAPI_PORT,
            path: path,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${STRAPI_TOKEN}`,
                'Content-Length': Buffer.byteLength(data)
            },
            timeout: 5000 // 5 seconds timeout
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body }));
        });

        req.on('error', e => reject(e));
        req.on('timeout', () => { req.destroy(); reject(new Error("Timeout!")); });
        req.write(data);
        req.end();
    });
}

async function run() {
    console.log("🚀 Starting seeding process...");
    let successCount = 0;

    // 1. Seed News Items
    for (const item of newsItems) {
        try {
            const res = await postData('/api/news-items', item);
            console.log(`News: [${res.status}] ${item.title}`);
            if (res.status === 200 || res.status === 201) successCount++;
        } catch (e) {
            console.log(`❌ Failed News: ${item.title} -> ${e.message}`);
        }
    }

    // 2. Seed Showcase Gallery
    for (const item of galleryItems) {
        try {
            const res = await postData('/api/showcase-galleries', item);
            console.log(`Gallery: [${res.status}] ${item.title}`);
            if (res.status === 200 || res.status === 201) successCount++;
        } catch (e) {
            console.log(`❌ Failed Gallery: ${item.title} -> ${e.message}`);
        }
    }

    // 3. Seed Showcase Page
    try {
        const pageRes = await putData('/api/showcase-page', {
            page_title: "MEDIA GALLERY",
            subtitle: "// Visual Field Reports"
        });
        console.log(`Showcase Page: [${pageRes.status}] Config Updated`);
    } catch (e) {
        console.log(`❌ Failed Showcase Page update -> ${e.message}`);
    }

    console.log(`\n🎉 Seeding complete. Successfully pushed ${successCount} items!`);
}

run();
