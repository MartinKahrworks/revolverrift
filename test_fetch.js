const fetch = require('node-fetch'); // wait node 18+ has fetch natively.
fetch('http://127.0.0.1:1337/api/shop-page')
  .then(res => res.text().then(text => console.log('STATUS:', res.status, 'BODY:', text)))
  .catch(err => console.error('Fetch Error:', err.message));
