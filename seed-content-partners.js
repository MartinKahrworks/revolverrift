const http = require('http');

const STRAPI_URL = "127.0.0.1";
const STRAPI_PORT = 1337;
const STRAPI_TOKEN = "47cbef47f56a91d65165933b84d051a6e4116da29c3c2ba5c7097cace8fd45eccf4c6efa34b706c4e97d0ada7d164554ed4fb102c9f66dc38020de978912a2419da78f74545827aed1520e3aa8ff70fc66772786712d3ebc53d2b7b41be27abea5f68357a036096c0d24a14ed050fc7cbdb8a56154c826b072f0af2c6223c871";

const toBlocksParagraphs = (paragraphs) => {
    return paragraphs.map(text => ({
        type: "paragraph",
        children: [{ type: "text", text }]
    }));
};

const toBlockList = (items) => {
    return [
        {
            type: "list",
            format: "unordered",
            children: items.map(text => ({
                type: "list-item",
                children: [{ type: "text", text }]
            }))
        }
    ];
};

const contentPageData = {
    title: "WELCOME TO THE RIFT",
    description1: "A hardcore PvPvE Extraction Shooter with tactical depth and hellish stakes.",
    description2: "Every match is a sandbox of deadly choices: drop into war-torn 1944, loot powerful artifacts, and face demons, undead, and rival players before the Rift collapses.",
    hud_text: "// Use period weapons, perks, and gadgets to build your loadout, track enemies, and ambush with precision.",
    warning_text: "But remember only what you extract survives. High risk. High reward. No second chances.",
    lore_sections: [
        {
            title: "Cursed Compounds",
            body: toBlocksParagraphs([
                "Scattered across the Rift are 16 compounds, each a crucible of combat.",
                "From sawmills to ironworks, these strongholds hold weapons, skill cards, and the path to the artifact or VIP.",
                "Enter them ready for war.",
                "Because inside, every team, every monster, and every shadow is your enemy."
            ]),
            align_text: "right",
            bg_position: "30% 80%"
        },
        {
            title: "Forsaken Villages",
            body: toBlocksParagraphs([
                "The villages of Europe lie frozen in time, their streets patrolled by demons and restless dead.",
                "Every creaking cabin and abandoned barn hides danger, loot, or a rival waiting in the dark.",
                "Survival here demands stealth, courage, and a revolver ready to fire.",
                "Because silence never lasts long in the Rift."
            ]),
            align_text: "left",
            bg_position: "80% 50%"
        },
        {
            title: "Into the Abyss",
            body: toBlocksParagraphs([
                "Beyond the compounds lies the abyss: swamps, forests, and caves where light struggles to survive.",
                "Here stalk the Anomaly, the Reaper, the Crower, and horrors whispered only in nightmares.",
                "Those who push this deep face the Rift at its cruelest but those who escape carry its greatest rewards."
            ]),
            align_text: "right",
            bg_position: "30% 80%"
        }
    ]
};

const partnerPageData = {
    title: "Revolver Rift Partnership Program",
    intro_text: toBlocksParagraphs([
        "Become part of the Revolver Rift Community and join us on our journey to make this game a global success!",
        "Our partnership program offers exclusive benefits for content creators and streamers, divided into three tiers based on engagement and reach.",
        "Anyone can apply – whether you are a newcomer or an established streamer."
    ]),
    outro_text: toBlocksParagraphs([
        "Everyone is welcome to apply for the partnership program.",
        "Once your application is received, our team will carefully review it to determine which tier is the best fit for you.",
        "Please note: The final decision rests solely with KAHRWORKS and may take 1–2 months"
    ]),
    stages: [
        {
            title: "Stage 1 Creator",
            description: "For all streamers and content creators regardless of existing partnerships.",
            benefits: toBlockList([
                "Access to all DLCs",
                "Drops for your community",
                "Your own custom server"
            ])
        },
        {
            title: "Stage 2 Partner",
            description: "Requirement: At least *1 year of active streaming experience*.",
            benefits: toBlockList([
                "All Stage 1 benefits",
                "Custom server with personal statistics",
                "Access to the Developer WhatsApp group for direct communication with our team",
                "Participation in the annual partner raffle with valuable prizes"
            ])
        },
        {
            title: "Stage 3 Ambassador",
            description: "The highest tier of our partnership program – exclusive and individually tailored.",
            benefits: toBlockList([
                "All Stage 2 benefits",
                "Custom made graphic material for your stream, designed exclusively for you",
                "Monthly support provided by KAHRWORKS",
                "Additional hardware support",
                "Further conditions will be shared after an official request via email"
            ])
        }
    ]
};

function putData(path, payload) {
    return new Promise((resolve, reject) => {
        // Ensure data is wrapped as Strapi structure and marked as published
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
    console.log("🚀 Seeding hardcoded fallback data into Content Page and Partners Page...");

    try {
        // Since single types initially might not exist but PUT creates/updates them
        // Let's try PUTting to the main APIs
        const contentRes = await putData('/api/content-page', contentPageData);
        if (contentRes.status >= 200 && contentRes.status < 300) {
            console.log(`✅ Successfully updated Content Page!`);
        } else if (contentRes.status === 404 || contentRes.status === 403) {
            // Let's try POST if PUT fails and the endpoint might require it? Single types use PUT usually.
            console.log(`⚠️ PUT returned ${contentRes.status}, trying POST...`);
            const postRes = await postData('/api/content-page', contentPageData);
            console.log(`   POST status: ${postRes.status}`);
        } else {
            console.log(`❌ Failed to update Content Page. Status: ${contentRes.status} Error: ${contentRes.body}`);
        }

        const partnersRes = await putData('/api/partners-page', partnerPageData);
        if (partnersRes.status >= 200 && partnersRes.status < 300) {
            console.log(`✅ Successfully updated Partners Page!`);
        } else if (partnersRes.status === 404 || partnersRes.status === 403) {
            console.log(`⚠️ PUT returned ${partnersRes.status}, trying POST...`);
            const postRes = await postData('/api/partners-page', partnerPageData);
            console.log(`   POST status: ${postRes.status}`);
        } else {
            console.log(`❌ Failed to update Partners Page. Status: ${partnersRes.status} Error: ${partnersRes.body}`);
        }
    } catch (e) {
        console.error("Critical Failure: ", e.message);
        console.error("Make sure your Strapi backend is running on port 1337 and the Token hasn't changed!");
    }
}

run();
