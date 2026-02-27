const http = require('http');

const STRAPI_URL = "127.0.0.1";
const STRAPI_PORT = 1337;
const STRAPI_TOKEN = "47cbef47f56a91d65165933b84d051a6e4116da29c3c2ba5c7097cace8fd45eccf4c6efa34b706c4e97d0ada7d164554ed4fb102c9f66dc38020de978912a2419da78f74545827aed1520e3aa8ff70fc66772786712d3ebc53d2b7b41be27abea5f68357a036096c0d24a14ed050fc7cbdb8a56154c826b072f0af2c6223c871";

const toBlocks = (paragraphs) => paragraphs.map(text => ({ type: "paragraph", children: [{ type: "text", text }] }));

const contentSections = [
    {
        title: "Cursed Compounds",
        body: toBlocks([
            "Scattered across the Rift are 16 compounds, each a crucible of combat.",
            "From sawmills to ironworks, these strongholds hold weapons, skill cards, and the path to the artifact or VIP.",
            "Enter them ready for war.",
            "Because inside, every team, every monster, and every shadow is your enemy."
        ]),
        align_text: "right",
        bg_position: "30% 80%",
        order: 1,
        publishedAt: new Date().toISOString()
    },
    {
        title: "Forsaken Villages",
        body: toBlocks([
            "The villages of Europe lie frozen in time, their streets patrolled by demons and restless dead.",
            "Every creaking cabin and abandoned barn hides danger, loot, or a rival waiting in the dark.",
            "Survival here demands stealth, courage, and a revolver ready to fire.",
            "Because silence never lasts long in the Rift."
        ]),
        align_text: "left",
        bg_position: "80% 50%",
        order: 2,
        publishedAt: new Date().toISOString()
    },
    {
        title: "Into the Abyss",
        body: toBlocks([
            "Beyond the compounds lies the abyss: swamps, forests, and caves where light struggles to survive.",
            "Here stalk the Anomaly, the Reaper, the Crower, and horrors whispered only in nightmares.",
            "Those who push this deep face the Rift at its cruelest but those who escape carry its greatest rewards."
        ]),
        align_text: "right",
        bg_position: "30% 80%",
        order: 3,
        publishedAt: new Date().toISOString()
    }
];

function postData(path, payload) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ data: payload });

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
            timeout: 5000
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
    console.log("🚀 Starting seeding process for Content Sections...");
    let successCount = 0;

    for (const section of contentSections) {
        try {
            const res = await postData('/api/contents', section);
            console.log(`Content Section: [${res.status}] ${section.title}`);
            if (res.status === 200 || res.status === 201) successCount++;
        } catch (e) {
            console.log(`❌ Failed Section: ${section.title} -> ${e.message}`);
        }
    }

    console.log(`\n🎉 Seeding complete. Successfully pushed ${successCount} content sections!`);
}

run();
