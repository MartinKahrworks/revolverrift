import fs from 'fs';
const path = './src/Components/Partners/HeroSection.jsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/font-mono/g, 'font-custom');
content = content.replace(/font-sans/g, 'font-custom');
fs.writeFileSync(path, content, 'utf8');
console.log('Done replacing fonts');
