// Script to drop the unique constraint on sku from the products table in Neon
// Run: node drop-sku-unique.mjs

import pg from 'pg';
const { Client } = pg;

const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_qxO2oQyp3BlT@ep-soft-art-a1lwus7c.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

async function run() {
    await client.connect();
    console.log('Connected to Neon DB');

    // List indexes on the products table
    const indexRes = await client.query(`
        SELECT indexname, indexdef
        FROM pg_indexes
        WHERE tablename = 'products'
        ORDER BY indexname;
    `);
    console.log('\n--- Current indexes on products table ---');
    indexRes.rows.forEach(r => console.log(r.indexname, '|', r.indexdef));

    // Drop the sku unique index if it exists
    const skuIdx = indexRes.rows.find(r => r.indexname.toLowerCase().includes('sku'));
    if (skuIdx) {
        console.log(`\nDropping index: ${skuIdx.indexname}`);
        await client.query(`DROP INDEX IF EXISTS "${skuIdx.indexname}"`);
        console.log('✅ Dropped successfully');
    } else {
        console.log('\nNo sku-specific index found — checking for unique constraints...');

        // Check constraints directly
        const constraintRes = await client.query(`
            SELECT conname, contype
            FROM pg_constraint
            WHERE conrelid = 'products'::regclass
            AND contype = 'u';
        `);
        console.log('Unique constraints:', constraintRes.rows);

        for (const c of constraintRes.rows) {
            if (c.conname.toLowerCase().includes('sku')) {
                console.log(`Dropping constraint: ${c.conname}`);
                await client.query(`ALTER TABLE products DROP CONSTRAINT IF EXISTS "${c.conname}"`);
                console.log('✅ Dropped');
            }
        }
    }

    await client.end();
    console.log('\nDone.');
}

run().catch(e => {
    console.error('Error:', e.message);
    process.exit(1);
});
