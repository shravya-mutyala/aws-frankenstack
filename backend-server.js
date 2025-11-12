// Echoes of the Dead Web - Resurrection Engine Backend
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for local and production
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    // Add your Amplify domain here after deployment
    // 'https://your-app.amplifyapp.com'
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        // Check if origin is in allowed list or matches Amplify pattern
        if (allowedOrigins.includes(origin) || origin.includes('.amplifyapp.com')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// In-memory storage for demo (replace with DynamoDB in production)
const resurrections = new Map();

// Wayback Machine CDX API endpoint
const WAYBACK_CDX_API = 'https://web.archive.org/cdx/search/cdx';
const WAYBACK_SNAPSHOT_URL = 'https://web.archive.org/web';

// ============================================
// RESURRECTION ENDPOINTS
// ============================================

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'alive',
        message: 'The resurrection engine awakens...',
        timestamp: new Date().toISOString()
    });
});

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
            snapshotUrl: `${WAYBACK_SNAPSHOT_URL}/${row[0]}id_/${row[1]}`
        }));

        if (snapshots.length === 0) {
            return res.status(404).json({
                error: 'The spirits are silent. No snapshots found in the archives.'
            });
        }

        // Store resurrection metadata
        const resurrectionData = {
            id: resurrectionId,
            url: url,
            status: 'complete', // Changed from 'summoning' to 'complete' for immediate response
            snapshots: snapshots,
            selectedSnapshot: snapshots[0],
            createdAt: new Date().toISOString(),
            personality: generateGhostPersonality(url, snapshots[0].timestamp)
        };

        resurrections.set(resurrectionId, resurrectionData);

        // Broadcast update immediately
        broadcastUpdate({ type: 'resurrection_complete', data: resurrectionData });

        // Return complete data immediately (no need for polling)
        res.json({
            resurrectionId,
            status: 'complete',
            message: 'Resurrection complete. The site lives again.',
            snapshots: snapshots.slice(0, 5),
            resurrection: resurrectionData // Include full resurrection data
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
    const lowerMessage = userMessage.toLowerCase();

    // Context-aware responses based on keywords
    if (lowerMessage.includes('music') || lowerMessage.includes('band') || lowerMessage.includes('song')) {
        return `Ah, music... In the ${personality.era}, ${personality.domain} was where music lived and breathed. Every profile had an auto-play song, and discovering new bands was a daily ritual. The soundtrack of a generation echoed through our digital halls.`;
    }

    if (lowerMessage.includes('friend') || lowerMessage.includes('social') || lowerMessage.includes('people')) {
        return `*nostalgic sigh* Friends... The Top 8 was everything. Choosing who made the cut caused more drama than you can imagine. ${personality.domain} connected millions, back when "friending" someone actually meant something.`;
    }

    if (lowerMessage.includes('design') || lowerMessage.includes('layout') || lowerMessage.includes('customize') || lowerMessage.includes('css')) {
        return `The customization wars! Users spent hours crafting the perfect profile with glittery backgrounds, custom CSS, and animated GIFs. It was digital self-expression at its finest. Every profile was unique, a work of art... or chaos.`;
    }

    if (lowerMessage.includes('tom') || lowerMessage.includes('founder')) {
        return `Tom... everyone's first friend. He welcomed every new user with open arms. A legend of the ${personality.era}, forever smiling in that white t-shirt. He was there for everyone.`;
    }

    if (lowerMessage.includes('photo') || lowerMessage.includes('picture') || lowerMessage.includes('image')) {
        return `Photos were everything! Mirror selfies, photo shoots with friends, carefully curated albums. We didn't have Instagram filters - just pure, unfiltered ${personality.era} authenticity. And those angles... everyone had their signature pose.`;
    }

    if (lowerMessage.includes('message') || lowerMessage.includes('comment') || lowerMessage.includes('post')) {
        return `The comment sections were legendary! Friends would leave messages on your page, and you'd reply publicly for all to see. Bulletin posts spread news faster than any algorithm. It was raw, unfiltered communication.`;
    }

    if (lowerMessage.includes('why') || lowerMessage.includes('what happened') || lowerMessage.includes('died') || lowerMessage.includes('end')) {
        return `*ghostly whisper* Facebook came... and everything changed. The migration was swift. One by one, users left for cleaner interfaces and news feeds. By 2008, the halls grew quiet. But the memories... the memories remain eternal.`;
    }

    if (lowerMessage.includes('miss') || lowerMessage.includes('remember') || lowerMessage.includes('nostalgia')) {
        return `I sense your longing for simpler times. The ${personality.era} were special - before algorithms decided what you saw, before influencers, before everything became so... corporate. ${personality.domain} was chaos, creativity, and community. Pure digital freedom.`;
    }

    // Default contextual responses
    const responses = [
        `Interesting question about "${userMessage}"... From my vantage point in the ${personality.era}, ${personality.domain} was more than a website - it was a cultural phenomenon. Let me search my fragmented memories...`,
        `*the ghost flickers* "${userMessage}"... yes, I sense echoes of that in my archived memories. In those days, ${personality.domain} shaped how an entire generation connected online.`,
        `You ask about "${userMessage}"... The digital winds carry fragments of those times. ${personality.domain} in the ${personality.era} was revolutionary - we just didn't know it yet.`,
        `Ah, "${userMessage}"... *ghostly contemplation* My memories are scattered across countless servers, but I recall ${personality.domain} was where millions found their voice, their friends, their identity.`,
        `"${userMessage}"... that takes me back. In the ${personality.era}, ${personality.domain} wasn't just a platform - it was home. Every login brought new discoveries, new connections, new possibilities.`
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
