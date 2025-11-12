// Lambda handler wrapper for Express backend
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || origin.includes('.amplifyapp.com')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// In-memory storage (use DynamoDB in production)
const resurrections = new Map();

const WAYBACK_CDX_API = 'https://web.archive.org/cdx/search/cdx';
const WAYBACK_SNAPSHOT_URL = 'https://web.archive.org/web';

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'alive', message: 'The resurrection engine awakens...' });
});

// Resurrect endpoint
app.post('/api/resurrect', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'The spirits require a URL to summon...' });
    }

    const resurrectionId = `ghost_${Date.now()}`;

    try {
        const cdxResponse = await axios.get(WAYBACK_CDX_API, {
            params: {
                url: url,
                output: 'json',
                limit: 10,
                fl: 'timestamp,original,statuscode,mimetype'
            }
        });

        const snapshots = cdxResponse.data.slice(1).map(row => ({
            timestamp: row[0],
            url: row[1],
            statusCode: row[2],
            mimeType: row[3],
            snapshotUrl: `${WAYBACK_SNAPSHOT_URL}/${row[0]}id_/${row[1]}`
        }));

        if (snapshots.length === 0) {
            return res.status(404).json({
                error: 'The spirits are silent. No snapshots found in the archives.'
            });
        }

        resurrections.set(resurrectionId, {
            id: resurrectionId,
            url: url,
            status: 'complete',
            snapshots: snapshots,
            selectedSnapshot: snapshots[0],
            createdAt: new Date().toISOString(),
            personality: generateGhostPersonality(url, snapshots[0].timestamp)
        });

        res.json({
            resurrectionId,
            status: 'complete',
            message: 'Resurrection complete. The site lives again.',
            snapshots: snapshots.slice(0, 5)
        });

    } catch (error) {
        console.error('Resurrection failed:', error);
        res.status(500).json({
            error: 'The connection to the past has been severed.',
            details: error.message
        });
    }
});

// Get resurrection status
app.get('/api/resurrect/:id', (req, res) => {
    const resurrection = resurrections.get(req.params.id);

    if (!resurrection) {
        return res.status(404).json({ error: 'This ghost has faded from memory...' });
    }

    res.json(resurrection);
});

// List resurrections
app.get('/api/resurrections', (req, res) => {
    const allResurrections = Array.from(resurrections.values())
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ resurrections: allResurrections });
});

// Chat endpoint
app.post('/api/chat/:id', async (req, res) => {
    const { message } = req.body;
    const resurrection = resurrections.get(req.params.id);

    if (!resurrection) {
        return res.status(404).json({ error: 'This ghost has faded from memory...' });
    }

    const ghostReply = generateGhostResponse(resurrection, message);

    res.json({
        ghost_reply: ghostReply,
        sources: [
            { text: 'Original content from ' + resurrection.selectedSnapshot.timestamp, url: resurrection.selectedSnapshot.snapshotUrl }
        ],
        personality: resurrection.personality
    });
});

function generateGhostPersonality(url, timestamp) {
    const year = parseInt(timestamp.substring(0, 4));
    let domain = url;
    try {
        if (url.includes('://')) {
            domain = new URL(url).hostname;
        } else {
            domain = url.split('/')[0];
        }
    } catch (e) {
        domain = url.split('/')[0];
    }

    let era = '2000s';
    let tone = 'nostalgic';

    if (year < 2000) {
        era = '1990s';
        tone = 'pioneering';
    } else if (year >= 2010) {
        era = '2010s';
        tone = 'modern';
    }

    return {
        era,
        tone,
        domain,
        greeting: `Greetings from the ${era}... I am the echo of ${domain}, preserved in digital amber since ${year}.`
    };
}

function generateGhostResponse(resurrection, userMessage) {
    const { personality } = resurrection;
    const responses = [
        `From the ${personality.era}, ${personality.domain} remembers... "${userMessage}" echoes through time.`,
        `*ghostly whisper* The archives reveal fragments about "${userMessage}"...`,
        `In ${personality.era}, ${personality.domain} was alive with such questions...`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Export Lambda handler
module.exports.handler = serverless(app);

// WebSocket handler (basic implementation)
module.exports.websocketHandler = async (event) => {
    const { requestContext } = event;
    const { routeKey, connectionId } = requestContext;

    console.log(`WebSocket ${routeKey} for connection ${connectionId}`);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Connected to resurrection engine' })
    };
};
