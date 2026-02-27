import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

// Simple argument parser
const parseArgs = (args) => {
    const parsed = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            const key = args[i].substring(2);
            parsed[key] = args[i + 1];
            i++;
        }
    }
    return parsed;
};

const options = parseArgs(args);

if (!options.name || !options.type) {
    console.error('Usage: node create-strapi-schema.mjs --name "<name>" --type "<collection|single|component>" [--category "<category>"] [--fields "<name:type,name:type>"]');
    console.error('Examples:');
    console.error('  node create-strapi-schema.mjs --name "Weapon" --type "collection" --fields "name:string,damage:integer"');
    console.error('  node create-strapi-schema.mjs --name "site-settings" --type "single" --fields "title:string"');
    console.error('  node create-strapi-schema.mjs --name "hero-banner" --type "component" --category "sections" --fields "title:string,image:media"');
    process.exit(1);
}

const name = options.name.toLowerCase().replace(/\s+/g, '-');
const type = options.type;
const category = options.category || 'default';
const fieldsRaw = options.fields || '';

// Parse fields string "name:string,damage:integer,image:media" into Strapi attributes object
const parseFields = (fieldsStr) => {
    const attributes = {};
    if (!fieldsStr) return attributes;

    const pairs = fieldsStr.split(',');
    pairs.forEach(pair => {
        const [fieldName, fieldType] = pair.split(':');
        if (!fieldName || !fieldType) return;

        let attrDef = { type: fieldType.trim() };

        // Special handling for media fields
        if (fieldType.trim() === 'media') {
            attrDef.multiple = false;
            attrDef.allowedTypes = ["images", "files", "videos", "audios"];
        }

        // Special handling for relations (simplified)
        // Format: relation:target-api (e.g. relation:api::blog.blog)
        if (fieldType.trim().startsWith('relation')) {
            const target = fieldType.split('|')[1];
            if (target) {
                attrDef = {
                    type: "relation",
                    relation: "oneToMany", // default simplistic assumption
                    target: target
                };
            } else {
                attrDef.type = "relation";
            }
        }

        attributes[fieldName.trim()] = attrDef;
    });

    return attributes;
};

const attributes = parseFields(fieldsRaw);
let dirPath = '';
let schemaContent = {};
let fileName = 'schema.json';

if (type === 'collection' || type === 'single') {
    const kind = type === 'collection' ? 'collectionType' : 'singleType';
    const singularName = name;
    // Basic pluralization (just adds 's' for simplicity in automated script, can be manually tweaked later)
    const pluralName = name.endsWith('s') ? name : name + 's';
    const collectionName = pluralName.replace(/-/g, '_');

    dirPath = path.join(process.cwd(), 'src', 'api', name, 'content-types', name);

    schemaContent = {
        kind: kind,
        collectionName: collectionName,
        info: {
            singularName: singularName,
            pluralName: pluralName,
            displayName: name
        },
        options: {
            draftAndPublish: true
        },
        pluginOptions: {},
        attributes: attributes
    };
} else if (type === 'component') {
    dirPath = path.join(process.cwd(), 'src', 'components', category);
    fileName = `${name}.json`;

    schemaContent = {
        collectionName: `components_${category}_${name.replace(/-/g, '_')}`,
        info: {
            displayName: name
        },
        options: {},
        attributes: attributes
    };
} else {
    console.error('Invalid type. Must be "collection", "single", or "component".');
    process.exit(1);
}

// Create directories recursively
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
}

const filePath = path.join(dirPath, fileName);

// Write the JSON file
fs.writeFileSync(filePath, JSON.stringify(schemaContent, null, 2), 'utf8');

console.log(`\n✅ Successfully created schemas at:`);
console.log(`📂 ${filePath}`);
console.log(`\nRestart Strapi (npm run develop) to apply the changes to the database!`);
