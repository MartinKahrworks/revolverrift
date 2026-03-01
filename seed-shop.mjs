import http from 'http';

const STRAPI_URL = "127.0.0.1";
const STRAPI_PORT = 1337;
const STRAPI_TOKEN = "47cbef47f56a91d65165933b84d051a6e4116da29c3c2ba5c7097cace8fd45eccf4c6efa34b706c4e97d0ada7d164554ed4fb102c9f66dc38020de978912a2419da78f74545827aed1520e3aa8ff70fc66772786712d3ebc53d2b7b41be27abea5f68357a036096c0d24a14ed050fc7cbdb8a56154c826b072f0af2c6223c871";

// ── Shop Page (Single Type) ────────────────────────────────────────────────

const shopPageData = {
    page_title: "THE ARMORY",
    subtitle: "// Official Merch & Gear",
    featured_section_title: "FEATURED DROPS",
    featured_section_subtitle: "// Limited. Lethal. Legendary.",
    show_category_filter: true,
    grid_columns: "col_4",
    empty_state_message: "// No items found in this category.",
    cart_cta_text: "ADD TO LOADOUT",
    sold_out_label: "SOLD OUT",
    coming_soon_label: "// COMING SOON"
};

// ── Categories ────────────────────────────────────────────────────────────

const categories = [
    { name: "Apparel",     slug: "apparel",     order: 1 },
    { name: "Accessories", slug: "accessories", order: 2 },
    { name: "Digital",     slug: "digital",     order: 3 },
    { name: "Collectibles",slug: "collectibles",order: 4 }
];

// ─── Helpers ──────────────────────────────────────────────────────────────

function putData(path, payload) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ data: { ...payload, publishedAt: new Date().toISOString() } });
        const options = {
            hostname: STRAPI_URL, port: STRAPI_PORT, path,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${STRAPI_TOKEN}`, 'Content-Length': Buffer.byteLength(data) },
            timeout: 5000
        };
        const req = http.request(options, (res) => { let b = ''; res.on('data', d => b += d); res.on('end', () => resolve({ status: res.statusCode, body: b })); });
        req.on('error', e => reject(e));
        req.on('timeout', () => { req.destroy(); reject(new Error("Timeout")); });
        req.write(data); req.end();
    });
}

function postData(path, payload) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ data: { ...payload, publishedAt: new Date().toISOString() } });
        const options = {
            hostname: STRAPI_URL, port: STRAPI_PORT, path,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${STRAPI_TOKEN}`, 'Content-Length': Buffer.byteLength(data) },
            timeout: 5000
        };
        const req = http.request(options, (res) => { let b = ''; res.on('data', d => b += d); res.on('end', () => resolve({ status: res.statusCode, body: b })); });
        req.on('error', e => reject(e));
        req.on('timeout', () => { req.destroy(); reject(new Error("Timeout")); });
        req.write(data); req.end();
    });
}

async function upsert(label, path, payload, method = 'PUT') {
    try {
        const fn = method === 'PUT' ? putData : postData;
        const res = await fn(path, payload);
        if (res.status >= 200 && res.status < 300) {
            console.log(`✅ ${label} seeded!`);
        } else if (res.status === 404 || res.status === 400) {
            console.log(`⚠️  ${label} PUT=${res.status}, trying POST...`);
            const r2 = await postData(path, payload);
            if (r2.status >= 200 && r2.status < 300) {
                console.log(`✅ ${label} created via POST!`);
            } else {
                console.log(`❌ ${label} failed: [${r2.status}] ${r2.body}`);
            }
        } else {
            console.log(`❌ ${label} failed: [${res.status}] ${res.body}`);
        }
    } catch (e) {
        console.log(`❌ ${label} error: ${e.message}`);
    }
}

// ─── Run ──────────────────────────────────────────────────────────────────

async function run() {
    console.log("🚀 Seeding Shop Page & Categories...\n");

    // 1. Shop page config
    await upsert("Shop Page", '/api/shop-page', shopPageData);

    // 2. Categories (POST each — they are collection type entries)
    for (const cat of categories) {
        await upsert(`Category [${cat.name}]`, '/api/product-categories', cat, 'POST');
    }

    console.log("\n✅ Done! Remember to:");
    console.log("   1. Enable Public permissions for: product, product-category, shop-page");
    console.log("   2. Add products via the Strapi Admin Panel");
}

run();
