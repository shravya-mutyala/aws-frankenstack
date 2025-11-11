# 👻 Echoes of the Dead Web - Kiroween Hackathon Submission

## Project Information

**Project Name**: Echoes of the Dead Web  
**Primary Category**: 🧟 Resurrection  
**Bonus Categories**: 
- 🎨 Most Creative (Interactive digital séance UI)
- 🚀 Best Startup Project (Brand Resurrection as a Service)

**Tagline**: "Because the internet never forgets… it just needs a séance."

## 🎯 Concept Summary

Echoes of the Dead Web brings dead websites and lost internet knowledge back to life using Kiro's agentic AI, MCP extensions, and spec-driven development. It's a browser plugin + web app that lets users "converse with dead websites" like GeoCities, MySpace 2005, or defunct forums through AI reconstruction — blending digital archaeology and AI resurrection.

## 🏆 Why This Wins

### Resurrection Category Excellence
- **Literal Resurrection**: Brings genuinely dead websites back to life from Wayback Machine archives
- **AI Reconstruction**: Fills gaps in historical snapshots using contextual inference
- **Interactive Ghosts**: Chat with resurrected sites about their history and content
- **Semantic Memory**: Vector embeddings enable intelligent Q&A about lost content

### Potential Value
1. **Digital Preservation**: Resurrect historical content with AI context for researchers and historians
2. **Education**: Understand web history interactively through conversations with the past
3. **Entertainment**: Nostalgia-driven experience - "talk to 2000s websites"
4. **Commercial**: Brand Resurrection as a Service - help companies revive legacy pages for marketing

### Creative Design
- **Gothic CRT Terminal Theme**: Old-school phosphor green terminal with scanlines and flicker effects
- **Digital Séance UI**: Atmospheric "summoning" experience with mystical language
- **Ghost Personalities**: Each resurrected site has unique personality based on original content
- **Chrome Extension**: One-click resurrection from any dead link

## 🎃 Kiro Features Demonstrated

### ✅ Vibe Coding
- **Initial Concept**: "Hey Kiro, let's create a spooky CRT terminal UI for resurrecting dead websites"
- **Gothic Theme**: Entire atmospheric design generated through natural conversation
- **Rapid Iteration**: "Make it more mystical" → Added ghost cursor, flicker effects, séance language

### ✅ Spec-Driven Development
- **Resurrection Pipeline Spec**: `.kiro/specs/resurrection_pipeline.spec.yaml` defines:
  - Snapshot retrieval module
  - Semantic rebuilder
  - Ghost personality engine
  - Vector memory store
  - Contextual chat system
- **Benefit**: Complete backend architecture generated from spec
- **Endpoints**: All API routes auto-generated with proper error handling

### ✅ Steering Rules
- **Gothic Archaeologist Persona**: `.kiro/steering/gothic_archeologist.md`
- **Consistent Narrative**: All UI copy uses mystical language ("Summon" not "Load", "Ghost" not "Cache")
- **Auto-Applied**: Every generated component follows the atmospheric tone
- **Color Palette**: Phosphor green, ghostly blue, ethereal purple enforced throughout

### ✅ Agent Hooks
1. **Archive Rebuilder Hook**: Auto-generates dataset schemas when new dead website is selected
2. **Theme Switcher Hook**: Updates UI theme to match era of resurrected site (90s, 2000s, 2010s)
3. **Workflow Automation**: Eliminated manual configuration steps

### ✅ MCP Extensions
- **Wayback Machine MCP Tool**: Custom integration for snapshot retrieval
- **Semantic Embedding**: Vector storage for intelligent ghost conversations
- **Future Enhancement**: Real-time archive streaming via MCP

## 🛠️ Technical Stack

**Frontend**: React + Vite + Gothic CRT CSS theme  
**Backend**: Express.js + WebSocket for real-time updates  
**Data Sources**: Wayback Machine CDX API + Archive.org  
**AI Layer**: OpenAI/Anthropic (via MCP) for ghost conversations  
**Vector Store**: Pinecone for semantic memory  
**Storage**: AWS S3 + DynamoDB (via CDK)  
**Extension**: Chrome Extension for dead link detection  

## 📊 Demo Scenarios

### Scenario 1: MySpace Resurrection
```
1. Enter "myspace.com" in the séance chamber
2. Watch as Wayback Machine snapshots are retrieved
3. AI reconstructs the 2005 MySpace homepage
4. Chat: "What were the top bands in 2007?"
5. Ghost replies with data from original profiles
```

### Scenario 2: GeoCities Revival
```
1. Chrome extension detects dead GeoCities link
2. Click "Summon This Page from the Dead"
3. App opens with resurrection in progress
4. Explore animated GIFs, guestbook, and hit counter
5. Ask ghost about web design trends of the 90s
```

### Scenario 3: Brand Time Machine
```
1. Resurrect apple.com from 1998
2. Browse through multiple historical snapshots
3. Chat about the iMac launch and Steve Jobs era
4. Export resurrection for marketing campaign
```

## 🎬 3-Minute Demo Script

**[0:00-0:30] Opening - The Problem**
- Dark screen, CRT flicker
- "The internet is a graveyard. Millions of dead links. Lost knowledge."
- Show 404 page
- "But what if we could bring them back?"

**[0:30-1:15] The Resurrection**
- Open Echoes of the Dead Web app
- Enter "myspace.com" in gothic terminal
- Watch "Summoning spirits from the Wayback Machine..."
- Snapshots appear, AI reconstruction begins
- "The ghost awakens..."

**[1:15-2:00] Interactive Ghost Chat**
- Chat interface appears with ghost greeting
- Ask: "What was MySpace like in 2005?"
- Ghost responds with personality and historical data
- Show vector memory retrieving relevant content
- Demonstrate multiple conversations

**[2:00-2:30] Chrome Extension**
- Navigate to dead link
- Extension detects 404
- Click "Summon This Page from the Dead"
- Instant resurrection in new tab

**[2:30-3:00] Kiro Showcase + Closing**
- Quick tour of `.kiro/` directory
- Show specs, steering, hooks
- "Built entirely with Kiro's agentic AI"
- Fade to: "The Dead Web lives again."

## 🚀 Setup Instructions

```bash
# 1. Install dependencies
npm install
cd frontend && npm install && cd ..

# 2. Set up environment
cp .env.example .env
# Add API keys: OPENAI_API_KEY, PINECONE_API_KEY

# 3. Deploy AWS infrastructure (optional)
cd infrastructure
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cdk deploy --profile your-aws-profile
cd ..

# 4. Start backend (Terminal 1)
npm run backend

# 5. Start frontend (Terminal 2)
cd frontend
npm run dev

# 6. Load Chrome extension
# - Open chrome://extensions/
# - Enable "Developer mode"
# - Click "Load unpacked"
# - Select chrome_extension/ folder
```

## 📁 Repository Structure

```
echoes-of-the-dead-web/
├── .kiro/
│   ├── hooks/
│   │   ├── archive_rebuilder.hook.yaml
│   │   └── theme_switcher.hook.yaml
│   ├── specs/
│   │   └── resurrection_pipeline.spec.yaml
│   └── steering/
│       ├── aws-standards.md
│       └── gothic_archeologist.md
├── frontend/
│   ├── src/
│   │   ├── App.jsx (Gothic CRT UI)
│   │   └── App.css (Terminal theme)
│   └── package.json
├── chrome_extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── content.js
├── backend-server.js (Resurrection engine)
├── infrastructure/ (AWS CDK)
└── README.md
```

## 🎨 Visual Design Highlights

- **Phosphor Green Terminal**: Classic CRT aesthetic (#00FF41)
- **Scanline Effects**: Authentic retro monitor feel
- **Glitch Animations**: Title text with RGB split effect
- **Ghost Cursor**: Trailing effect on hover
- **Flicker States**: Loading animations with atmospheric text
- **Era-Specific Themes**: UI adapts to resurrected site's time period

## 💡 Startup Potential

**Brand Resurrection as a Service (BRaaS)**
- Help companies revive legacy websites for nostalgia marketing
- Archive important web history for institutions
- Interactive museum exhibits of internet history
- Educational tool for web design courses

**Revenue Model**:
- Free: 5 resurrections/month
- Pro: $19/month - unlimited resurrections + API access
- Enterprise: Custom pricing for brand archives

## 🏅 Category Fit

### Primary: Resurrection ✅
- Literally brings dead websites back to life
- Uses AI to fill gaps and reconstruct lost content
- Creates interactive "ghosts" of historical sites

### Bonus: Most Creative ✅
- Unique digital séance concept
- Gothic CRT terminal aesthetic
- Conversational ghosts with personality
- Chrome extension for dead link detection

### Bonus: Best Startup Project ✅
- Clear commercial value (BRaaS)
- Solves real problem (digital preservation)
- Scalable architecture
- Multiple revenue streams

## 📹 Demo Video

[YouTube Link - 3-minute cinematic experience]

## 🔗 Links

- **Live Demo**: http://localhost:5173 (local)
- **GitHub**: [Repository URL]
- **Chrome Extension**: Available in `/chrome_extension/`

---

**Built with Kiro's Agentic AI**  
Kiroween Hackathon 2025 🎃👻
