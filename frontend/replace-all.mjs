import fs from 'fs';
import path from 'path';

const dir = 'c:\\Users\\YASH\\Documents\\1.Projects\\revolverrift\\frontend\\src\\Components\\Partners';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('font-mono') || content.includes('font-sans')) {
        content = content.replace(/font-mono/g, 'font-custom');
        content = content.replace(/font-sans/g, 'font-custom');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
