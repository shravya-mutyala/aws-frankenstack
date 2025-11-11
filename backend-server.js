// Echoes of the Dead Web - Resurrection Engine Backend
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory storage for demo (replace with DynamoDB in production)
const resurrections = new Map();

// Wayback Machine CDX API endpoint
const WAYBACK_CDX_API = 'http://web.archive.org/cdx/search/cdx';
const WAYBACK_SNAPSHOT_URL = 'http://web.archive.org/web';

// ============================================
// RESURRECTION ENDPOINTS
// ============================================

// Initiate resurrection of a dead URL
app.post('/api/resurrect', async (req, res) => {
    const { url, timestamp } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'The spirits require a URL to summon...' });
    }

    const resurrectionId = `ghost_${Date.now()}`;

    try {
        // Query Wayback Machine for available snapshots
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
            snapshotUrl: `${WAYBACK_SNAPSHOT_URL}/${row[0]}/${row[1]}`
        }));

        if (snapshots.length === 0) {
            return res.status(404).json({
                error: 'The spirits are silent. No snapshots found in the archives.'
            });
        }

        // Store resurrection metadata
        resurrections.set(resurrectionId, {
            id: resurrectionId,
            url: url,
            status: 'summoning',
            snapshots: snapshots,
            selectedSnapshot: snapshots[0],
            createdAt: new Date().toISOString(),
            personality: generateGhostPersonality(url, snapshots[0].timestamp)
        });

        // Simulate resurrection process
        setTimeout(() => {
            const resurrection = resurrections.get(resurrectionId);
            if (resurrection) {
                resurrection.status = 'complete';
                broadcastUpdate({ type: 'resurrection_complete', data: resurrection });
            }
        }, 3000);

        res.json({
            resurrectionId,
            status: 'summoning',
            message: 'The séance begins...',
            snapshots: snapshots.slice(0, 5) // Return first 5 snapshots
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

// List all resurrections
app.get('/api/resurrections', (req, res) => {
    const allResurrections = Array.from(resurrections.values())
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ resurrections: allResurrections });
});

// Chat with a resurrected site ghost
app.post('/api/chat/:id', async (req, res) => {
    const { message } = req.body;
    const resurrection = resurrections.get(req.params.id);

    if (!resurrection) {
        return res.status(404).json({ error: 'This ghost has faded from memory...' });
    }

    // Simulate AI response (integrate with OpenAI/Anthropic in production)
    const ghostReply = generateGhostResponse(resurrection, message);

    res.json({
        ghost_reply: ghostReply,
        sources: [
            { text: 'Original content from ' + resurrection.selectedSnapshot.timestamp, url: resurrection.selectedSnapshot.snapshotUrl }
        ],
        personality: resurrection.personality
    });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateGhostPersonality(url, timestamp) {
    const year = parseInt(timestamp.substring(0, 4));

    // Handle URLs with or without protocol
    let domain = url;
    try {
        // Try to parse as URL if it has protocol
        if (url.includes('://')) {
            domain = new URL(url).hostname;
        } else {
            // Just use the domain as-is, remove any path
            domain = url.split('/')[0];
        }
    } catch (e) {
        // If parsing fails, just use the input
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

    // Simple response generation (replace with LLM in production)
    const responses = [
        `Ah, you ask about "${userMessage}"... In my time, ${personality.domain} was a beacon of the early web.`,
        `The memories are fragmented, but I recall... ${userMessage} was significant in the ${personality.era}.`,
        `*ghostly whisper* ${userMessage}... yes, I remember. The digital winds carried many such queries.`,
        `From beyond the veil of deleted servers, I sense your curiosity about ${userMessage}...`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}

// ============================================
// WEBSOCKET FOR REAL-TIME UPDATES
// ============================================

const server = app.listen(PORT, () => {
    const fs = require('fs');
    const bannerPath = require('path').join(__dirname, 'banner.txt');

    if (fs.existsSync(bannerPath)) {
        console.log(fs.readFileSync(bannerPath, 'utf8'));
    }

    console.log(`\n👻 Resurrection Engine awakened on port ${PORT}`);
    console.log(`🪦 The séance chamber is ready at http://localhost:${PORT}`);
    console.log(`🔮 Frontend should be running at http://localhost:5173`);
    console.log(`\n📡 Wayback Machine API: Connected`);
    console.log(`💾 In-memory storage: Active`);
    console.log(`🌐 WebSocket server: Listening`);
    console.log(`\n✨ Ready to summon the dead web...\n`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('🔮 New spirit medium connected');

    ws.on('message', (message) => {
        console.log('📡 Received:', message);
    });

    ws.on('close', () => {
        console.log('👋 Spirit medium disconnected');
    });
});

function broadcastUpdate(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🌙 The séance concludes...');
    server.close(() => {
        console.log('💀 Resurrection engine has returned to the void');
    });
});
