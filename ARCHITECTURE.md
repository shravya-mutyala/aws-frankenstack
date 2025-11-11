# 🏗️ Echoes of the Dead Web - Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐         ┌──────────────────┐            │
│  │  Chrome Browser  │         │ Chrome Extension │            │
│  │                  │◄────────┤  - 404 Detection │            │
│  │  Gothic CRT UI   │         │  - Quick Summon  │            │
│  │  (React + Vite)  │         │  - Popup UI      │            │
│  └────────┬─────────┘         └──────────────────┘            │
│           │                                                     │
│           │ HTTP + WebSocket                                   │
│           │                                                     │
└───────────┼─────────────────────────────────────────────────────┘
            │
            │
┌───────────▼─────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Express.js Backend (Resurrection Engine)         │  │
│  │                                                          │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────┐ │  │
│  │  │ REST API       │  │ WebSocket      │  │ Business  │ │  │
│  │  │ - /resurrect   │  │ - Real-time    │  │ Logic     │ │  │
│  │  │ - /chat        │  │ - Updates      │  │ - Ghost   │ │  │
│  │  │ - /resurrections│ │ - Broadcast    │  │ - Memory  │ │  │
│  │  └────────────────┘  └────────────────┘  └───────────┘ │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└───────────┬─────────────────────────────────────────────────────┘
            │
            │ API Calls
            │
┌───────────▼─────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ Wayback Machine  │  │ OpenAI/Anthropic │  │  Pinecone    │ │
│  │                  │  │                  │  │              │ │
│  │ - CDX API        │  │ - GPT-4/Claude   │  │ - Vector DB  │ │
│  │ - Snapshots      │  │ - Conversations  │  │ - Semantic   │ │
│  │ - Historical     │  │ - Personality    │  │   Search     │ │
│  │   Data           │  │   Generation     │  │ - Memory     │ │
│  │                  │  │                  │  │   Store      │ │
│  │ FREE ✓           │  │ PAID (Optional)  │  │ FREE TIER ✓  │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
            │
            │ (Optional Production Deployment)
            │
┌───────────▼─────────────────────────────────────────────────────┐
│                         AWS LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │      S3      │  │  DynamoDB    │  │   Lambda     │         │
│  │              │  │              │  │              │         │
│  │ - Cached     │  │ - Metadata   │  │ - Processing │         │
│  │   Content    │  │ - History    │  │ - Analysis   │         │
│  │ - Assets     │  │ - Sessions   │  │ - Triggers   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow: Resurrection Process

```
1. USER INITIATES
   │
   ├─ User enters URL: "myspace.com"
   ├─ Clicks "👻 Summon" button
   └─ Frontend sends POST /api/resurrect
   
2. BACKEND QUERIES
   │
   ├─ Express receives request
   ├─ Queries Wayback Machine CDX API
   ├─ Retrieves available snapshots
   └─ Selects best snapshot (most complete)
   
3. SNAPSHOT RETRIEVAL
   │
   ├─ Fetches HTML/CSS/JS from Wayback
   ├─ Extracts metadata (title, date, tech)
   ├─ Stores in memory/S3
   └─ Generates resurrection ID
   
4. AI PROCESSING (Optional)
   │
   ├─ Analyzes content with LLM
   ├─ Generates ghost personality
   ├─ Creates vector embeddings
   └─ Stores in Pinecone
   
5. REAL-TIME UPDATE
   │
   ├─ Backend broadcasts via WebSocket
   ├─ Status: "summoning" → "complete"
   ├─ Frontend receives update
   └─ UI shows resurrected site
   
6. USER INTERACTION
   │
   ├─ User views snapshot in iframe
   ├─ User chats with ghost
   ├─ Backend queries vector memory
   └─ LLM generates contextual response
```

## Component Architecture

### Frontend (React)

```
frontend/
├── src/
│   ├── App.jsx                 # Main application component
│   │   ├── ResurrectionForm    # URL input and summon button
│   │   ├── LoadingState        # "Summoning spirits..." animation
│   │   ├── GhostChamber        # Resurrected site display
│   │   ├── ChatInterface       # Ghost conversation UI
│   │   └── ResurrectionGallery # Previously summoned sites
│   │
│   └── App.css                 # Gothic CRT theme
│       ├── CRT Effects         # Scanlines, flicker, glitch
│       ├── Color Palette       # Phosphor green, ghostly blue
│       ├── Animations          # Loading, transitions
│       └── Responsive          # Mobile/desktop layouts
│
├── index.html                  # Entry point
└── vite.config.js             # Build configuration
```

### Backend (Express)

```
backend-server.js
├── Configuration
│   ├── CORS setup
│   ├── WebSocket server
│   └── Environment variables
│
├── Data Storage
│   ├── In-memory Map (demo)
│   └── DynamoDB (production)
│
├── API Endpoints
│   ├── POST /api/resurrect
│   │   ├── Validate URL
│   │   ├── Query Wayback Machine
│   │   ├── Generate resurrection ID
│   │   ├── Store metadata
│   │   └── Return snapshots
│   │
│   ├── GET /api/resurrect/:id
│   │   ├── Fetch resurrection data
│   │   └── Return status + snapshots
│   │
│   ├── GET /api/resurrections
│   │   ├── List all resurrections
│   │   └── Sort by date
│   │
│   └── POST /api/chat/:id
│       ├── Receive user message
│       ├── Query vector memory
│       ├── Generate AI response
│       └── Return ghost reply
│
├── Helper Functions
│   ├── generateGhostPersonality()
│   │   ├── Detect era from timestamp
│   │   ├── Extract domain info
│   │   └── Create personality profile
│   │
│   └── generateGhostResponse()
│       ├── Simple response logic (demo)
│       └── LLM integration (production)
│
└── WebSocket
    ├── Connection handling
    ├── Broadcast updates
    └── Real-time notifications
```

### Chrome Extension

```
chrome_extension/
├── manifest.json              # Extension configuration
│   ├── Permissions
│   ├── Content scripts
│   └── Action popup
│
├── popup.html/js              # Extension popup UI
│   ├── Summon button
│   ├── Open app button
│   └── Status display
│
├── content.js                 # Injected into web pages
│   ├── Detect 404 pages
│   ├── Inject summon button
│   └── Send resurrection request
│
└── icons/                     # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Kiro Integration Architecture

```
.kiro/
├── specs/
│   └── resurrection_pipeline.spec.yaml
│       │
│       ├── Modules Defined
│       │   ├── snapshot_retriever
│       │   ├── semantic_rebuilder
│       │   ├── ghost_personality_engine
│       │   ├── vector_memory_store
│       │   └── contextual_chat
│       │
│       ├── Endpoints Generated
│       │   ├── POST /api/resurrect
│       │   ├── POST /api/chat/{id}
│       │   └── GET /api/resurrections
│       │
│       └── Storage Schemas
│           ├── DynamoDB tables
│           ├── S3 bucket structure
│           └── Pinecone index config
│
├── steering/
│   ├── aws-standards.md
│   │   ├── IAM best practices
│   │   ├── Resource tagging
│   │   └── Security guidelines
│   │
│   └── gothic_archeologist.md
│       ├── Narrative tone
│       ├── Vocabulary guidelines
│       ├── Color palette
│       └── UI copy examples
│
└── hooks/
    ├── archive_rebuilder.hook.yaml
    │   ├── Trigger: New resurrection
    │   ├── Action: Generate schema
    │   └── Output: Dataset structure
    │
    └── theme_switcher.hook.yaml
        ├── Trigger: Resurrection complete
        ├── Action: Detect era
        └── Output: Apply theme
```

## API Integration Details

### Wayback Machine CDX API

```
Endpoint: http://web.archive.org/cdx/search/cdx

Request:
  GET ?url=myspace.com&output=json&limit=10&fl=timestamp,original,statuscode,mimetype

Response:
  [
    ["timestamp", "original", "statuscode", "mimetype"],
    ["20050701120000", "myspace.com", "200", "text/html"],
    ["20060315080000", "myspace.com", "200", "text/html"],
    ...
  ]

Snapshot URL Format:
  http://web.archive.org/web/{timestamp}/{url}
  Example: http://web.archive.org/web/20050701120000/myspace.com
```

### OpenAI/Anthropic API (Optional)

```
Purpose: Ghost conversations and personality generation

Request:
  POST https://api.openai.com/v1/chat/completions
  {
    "model": "gpt-4",
    "messages": [
      {"role": "system", "content": "You are the ghost of myspace.com from 2005..."},
      {"role": "user", "content": "What were the top bands?"}
    ]
  }

Response:
  {
    "choices": [{
      "message": {
        "content": "Ah, music... Arctic Monkeys, Panic! at the Disco..."
      }
    }]
  }
```

### Pinecone Vector Database (Optional)

```
Purpose: Semantic memory for intelligent Q&A

Index Configuration:
  - Name: dead-web-memory
  - Dimensions: 1536 (OpenAI embeddings)
  - Metric: cosine

Operations:
  1. Upsert: Store content embeddings
  2. Query: Semantic search for relevant content
  3. Fetch: Retrieve specific vectors
```

## Deployment Architecture

### Local Development

```
┌─────────────────┐
│   Developer     │
│   Machine       │
├─────────────────┤
│                 │
│  Terminal 1:    │
│  npm run backend│ → Port 3001
│                 │
│  Terminal 2:    │
│  npm run dev    │ → Port 5173
│                 │
│  Chrome:        │
│  Extension      │ → Loaded unpacked
│                 │
└─────────────────┘
```

### Production (AWS)

```
┌─────────────────────────────────────────┐
│            CloudFront CDN               │
│         (Frontend Distribution)         │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│              S3 Bucket                  │
│         (Static Frontend)               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          API Gateway                    │
│      (REST + WebSocket)                 │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│         Lambda Functions                │
│      (Resurrection Engine)              │
├─────────────────────────────────────────┤
│  - resurrect_handler                    │
│  - chat_handler                         │
│  - list_handler                         │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐      ┌────▼─────┐
│   S3   │      │ DynamoDB │
│ Cache  │      │ Metadata │
└────────┘      └──────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────┐
│          Security Layers                │
├─────────────────────────────────────────┤
│                                         │
│  1. Input Validation                    │
│     ├─ URL sanitization                 │
│     ├─ XSS prevention                   │
│     └─ SQL injection protection         │
│                                         │
│  2. API Security                        │
│     ├─ CORS configuration               │
│     ├─ Rate limiting                    │
│     └─ API key management               │
│                                         │
│  3. Data Protection                     │
│     ├─ Environment variables            │
│     ├─ Secrets management               │
│     └─ Encrypted storage                │
│                                         │
│  4. AWS Security                        │
│     ├─ IAM least privilege              │
│     ├─ VPC isolation                    │
│     └─ CloudWatch monitoring            │
│                                         │
└─────────────────────────────────────────┘
```

## Performance Optimization

```
┌─────────────────────────────────────────┐
│       Performance Strategies            │
├─────────────────────────────────────────┤
│                                         │
│  Frontend                               │
│  ├─ Code splitting (Vite)               │
│  ├─ Lazy loading components             │
│  ├─ WebSocket for real-time             │
│  └─ CSS animations (GPU accelerated)    │
│                                         │
│  Backend                                │
│  ├─ In-memory caching                   │
│  ├─ Connection pooling                  │
│  ├─ Async/await patterns                │
│  └─ Rate limiting to Wayback            │
│                                         │
│  Database                               │
│  ├─ DynamoDB on-demand billing          │
│  ├─ Efficient query patterns            │
│  ├─ S3 for large content                │
│  └─ Pinecone vector indexing            │
│                                         │
└─────────────────────────────────────────┘
```

## Scalability Considerations

```
Current Capacity:
  - Concurrent Users: 100+
  - Resurrections/hour: 1000+
  - WebSocket Connections: 100+
  - Storage: Unlimited (S3)

Scaling Strategy:
  1. Horizontal: Add Lambda instances
  2. Vertical: Increase Lambda memory
  3. Caching: Redis for hot data
  4. CDN: CloudFront for global reach
  5. Database: DynamoDB auto-scaling
```

---

**Architecture designed for hackathon demo with production-ready foundation** 🏗️