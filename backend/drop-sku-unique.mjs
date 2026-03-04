// Script to drop the unique DB constraint on sku from Neon
// Run: node drop-sku-unique.mjs  (from /backend folder)

import pg from 'pg';
const { Client } = pg;

const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_qxO2oQyp3BlT@ep-soft-art-a1lwus7c.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

async function run() {
    await client.connect();
    console.log('✅ Connected to Neon DB');

    // 1. Show all indexes on products
    const indexRes = await client.query(`
        SELECT indexname, indexdef
        FROM pg_indexes
        WHERE tablename = 'products'
        ORDER BY indexname;
    `);
    console.log('\n--- Indexes on products ---');
    indexRes.rows.forEach(r => console.log(' ', r.indexname));

    // 2. Drop any sku-related unique index
    for (const r of indexRes.rows) {
        if (r.indexname.toLowerCase().includes('sku')) {
            console.log(`\nDropping index: ${r.indexname}`);
            await client.query(`DROP INDEX IF EXISTS "${r.indexname}"`);
            console.log('✅ Done');
        }
    }

    // 3. Also check and drop unique constraints
    const conRes = await client.query(`
        SELECT con.conname, con.contype
        FROM pg_constraint con
        JOIN pg_class rel ON rel.oid = con.conrelid
        WHERE rel.relname = 'products' AND con.contype = 'u';
    `);
    console.log('\n--- Unique constraints on products ---');
    conRes.rows.forEach(r => console.log(' ', r.conname));

    for (const c of conRes.rows) {
        if (c.conname.toLowerCase().includes('sku')) {
            console.log(`Dropping constraint: ${c.conname}`);
            await client.query(`ALTER TABLE products DROP CONSTRAINT IF EXISTS "${c.conname}"`);
            console.log('✅ Done');
        }
    }

    await client.end();
    console.log('\nAll done.');
}

run().catch(e => {
    console.error('❌ Error:', e.message);
    process.exit(1);
});
