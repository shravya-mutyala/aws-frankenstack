// Simple API endpoint to fetch DynamoDB events
import { execSync } from 'child_process';

export default function handler(req, res) {
    try {
        const result = execSync(
            'aws dynamodb scan --table-name ProjectStitchStack-LineageTableED19B650-P8ELGC76U2DZ --profile msr-aws --max-items 10',
            { encoding: 'utf-8' }
        );

        const data = JSON.parse(result);

        const events = data.Items.map(item => ({
            type: 'FILE_PROCESSED',
            timestamp: new Date(item.timestamp.S).toLocaleString(),
            message: item.summary.S,
            file: item.key.S,
            size: item.size.N
        }));

        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
