// Quick script to view monster events from DynamoDB
const { execSync } = require('child_process');

console.log('🧟 FETCHING MONSTER EVENTS...\n');

try {
    const result = execSync(
        'aws dynamodb scan --table-name ProjectStitchStack-LineageTableED19B650-P8ELGC76U2DZ --profile msr-aws',
        { encoding: 'utf-8' }
    );

    const data = JSON.parse(result);

    console.log(`📊 Total Events: ${data.Count}\n`);
    console.log('='.repeat(80));

    data.Items.forEach((item, idx) => {
        console.log(`\n🧠 EVENT #${idx + 1}`);
        console.log(`📁 File: ${item.key.S}`);
        console.log(`📏 Size: ${item.size.N} bytes`);
        console.log(`🕐 Time: ${item.timestamp.S}`);
        console.log(`📝 Type: ${item.contentType.S}`);
        console.log(`\n🗣️ MONSTER SAYS:`);
        console.log(`"${item.summary.S}"`);
        console.log('='.repeat(80));
    });

} catch (error) {
    console.error('❌ Error:', error.message);
}
