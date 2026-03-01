import http from 'http';

const STRAPI_URL = "127.0.0.1";
const STRAPI_PORT = 1337;
// Re-using the same dev token as seed-content.js
const STRAPI_TOKEN = "47cbef47f56a91d65165933b84d051a6e4116da29c3c2ba5c7097cace8fd45eccf4c6efa34b706c4e97d0ada7d164554ed4fb102c9f66dc38020de978912a2419da78f74545827aed1520e3aa8ff70fc66772786712d3ebc53d2b7b41be27abea5f68357a036096c0d24a14ed050fc7cbdb8a56154c826b072f0af2c6223c871";

const footerData = {
    connectHeading: "Connect\nWith Us",
    copyrightText: `© ${new Date().getFullYear()} KAHRWORKS GMBH — All rights reserved.`,
    companyUrl: "https://www.kahrworks.at",
    socialLinks: [
        { href: 'https://discord.com/invite/QP6RmdUSA8', label: 'DISCORD', isImprintModal: false },
        { href: 'https://reddit.com/RevolverRift', label: 'REDDIT', isImprintModal: false },
        { href: 'https://www.youtube.com/@revolverrift', label: 'YOUTUBE', isImprintModal: false },
        { href: 'https://x.com/RevolverRift', label: 'TWITTER', isImprintModal: false },
        { href: 'https://facebook.com/revolverrift', label: 'FACEBOOK', isImprintModal: false },
        { href: 'https://www.instagram.com/revolverrift/', label: 'INSTAGRAM', isImprintModal: false },
        { href: 'mailto:info@revolver-rift.com', label: 'MAIL', isImprintModal: false },
        { href: '#', label: 'IMPRINT', isImprintModal: true },
    ]
};

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
    console.log("🚀 Seeding Footer text structure...");
    try {
        const res = await putData('/api/footer', footerData);
        if (res.status === 200 || res.status === 201) {
            console.log(`✅ Footer successfully updated in Strapi!`);
            console.log(`NOTE: Media (icons and logos) must be uploaded manually via the Strapi Admin Panel.`);
        } else if (res.status === 404 || res.status === 403 || res.status === 400) {
            console.log(`⚠️ PUT returned ${res.status}, trying POST (initial creation)...`);
            const postRes = await postData('/api/footer', footerData);
            if (postRes.status >= 200 && postRes.status < 300) {
                console.log(`✅ Footer successfully created in Strapi!`);
                console.log(`NOTE: Media (icons and logos) must be uploaded manually via the Strapi Admin Panel.`);
            } else {
                console.log(`❌ Failed: [${postRes.status}] ${postRes.body}`);
            }
        } else {
            console.log(`❌ Failed: [${res.status}] ${res.body}`);
        }
    } catch (e) {
        console.log(`❌ Script Error: ${e.message}`);
    }
}

run();
