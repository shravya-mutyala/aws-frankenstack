// Quick test script to verify Wayback Machine API integration
const axios = require('axios');

const WAYBACK_CDX_API = 'http://web.archive.org/cdx/search/cdx';

async function testResurrection(url) {
    console.log(`\n👻 Testing resurrection of: ${url}`);
    console.log('━'.repeat(50));

    try {
        console.log('📡 Querying Wayback Machine...');

        const response = await axios.get(WAYBACK_CDX_API, {
            params: {
                url: url,
                output: 'json',
                limit: 5,
                fl: 'timestamp,original,statuscode,mimetype'
            }
        });

        const snapshots = response.data.slice(1); // Skip header row

        if (snapshots.length === 0) {
            console.log('❌ No snapshots found. The spirits are silent.');
            return;
        }

        console.log(`✅ Found ${snapshots.length} snapshots!\n`);

        snapshots.forEach((snapshot, idx) => {
            const [timestamp, original, statusCode, mimeType] = snapshot;
            const year = timestamp.substring(0, 4);
            const month = timestamp.substring(4, 6);
            const day = timestamp.substring(6, 8);
            const snapshotUrl = `http://web.archive.org/web/${timestamp}/${original}`;

            console.log(`Snapshot ${idx + 1}:`);
            console.log(`  📅 Date: ${year}-${month}-${day}`);
            console.log(`  🔗 URL: ${snapshotUrl}`);
            console.log(`  📊 Status: ${statusCode}`);
            console.log(`  📄 Type: ${mimeType}`);
            console.log('');
        });

        console.log('🎉 Resurrection test successful!');
        console.log('💡 The backend server will use this same API.');

    } catch (error) {
        console.error('❌ Resurrection failed:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);
        }
    }
}

// Test with multiple URLs
async function runTests() {
    console.log('🪦 ECHOES OF THE DEAD WEB - API Test');
    console.log('Testing Wayback Machine integration...\n');

    const testUrls = [
        'myspace.com',
        'geocities.com',
        'netscape.com'
    ];

    for (const url of testUrls) {
        await testResurrection(url);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
    }

    console.log('\n✨ All tests complete!');
    console.log('🚀 Ready to start the resurrection engine.');
    console.log('\nNext steps:');
    console.log('  1. npm run backend');
    console.log('  2. cd frontend && npm run dev');
    console.log('  3. Open http://localhost:5173');
}

// Run if called directly
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { testResurrection };
