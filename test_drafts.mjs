import http from 'http';
const STRAPI_TOKEN = "47cbef47f56a91d65165933b84d051a6e4116da29c3c2ba5c7097cace8fd45eccf4c6efa34b706c4e97d0ada7d164554ed4fb102c9f66dc38020de978912a2419da78f74545827aed1520e3aa8ff70fc66772786712d3ebc53d2b7b41be27abea5f68357a036096c0d24a14ed050fc7cbdb8a56154c826b072f0af2c6223c871";

const req = http.request({
    hostname: '127.0.0.1',
    port: 1337,
    path: '/api/products?publicationState=preview',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
}, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => console.log('Products:', body));
});
req.end();
