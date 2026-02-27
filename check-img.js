const sizeOf = require('image-size');
try {
    const dimensions = sizeOf('c:/Users/YASH/Documents/1.Projects/revolverrift/frontend/src/assets/newassets/7.webp');
    console.log('Dimensions:', dimensions.width, 'x', dimensions.height);
} catch (e) {
    console.error('Error:', e.message);
}
