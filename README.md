# 👻 Echoes of the Dead Web

**Kiroween Hackathon 2025 - Resurrection Category**

> "Because the internet never forgets… it just needs a séance."

Bring dead websites and lost internet knowledge back to life using Kiro's agentic AI, MCP extensions, and spec-driven development. A browser plugin + web app that lets users "converse with dead websites" like GeoCities, MySpace 2005, or defunct forums through AI reconstruction — blending digital archaeology and AI resurrection.

## 🎯 Why This Wins

**Resurrection Category**: Brings the dead web back to life:
- Wayback Machine snapshot retrieval and reconstruction
- AI-powered content inference and gap-filling
- Interactive conversations with "ghost" websites
- Semantic memory of resurrected content via vector embeddings
- Real-time resurrection pipeline from URL to living ghost

**Potential Value**: 
- **Digital Preservation**: Resurrect historical content with AI context
- **Education & Research**: Understand web history interactively
- **Entertainment**: Nostalgia + storytelling ("talk to 2000s websites")
- **Brand Resurrection as a Service**: SaaS for brands to revive legacy pages

**Creative Design**: Spooky "CRT flicker" terminal theme with interactive digital séance UI. Each resurrected site becomes a conversational ghost with personality based on its original content.

## 🪦 Resurrection Features

- **Chrome Extension** - "Summon This Page" button on dead links
- **AI Reconstruction** - Rebuilds layouts, content, and context from Wayback snapshots
- **Ghost Chat** - Converse with resurrected websites using LLM + historical data
- **Vector Memory** - Pinecone stores semantic embeddings of all resurrected content
- **Gothic UI** - Old-school CRT terminal aesthetic with ghost cursor effects

## 📚 Documentation

**New here?** Check out [INDEX.md](INDEX.md) for a complete guide to all documentation.

**Quick Links**:
- 🚀 [QUICKSTART.md](QUICKSTART.md) - Get running in 5 minutes
- 🏆 [SUBMISSION.md](SUBMISSION.md) - Hackathon submission
- 🎬 [HACKATHON_DEMO.md](HACKATHON_DEMO.md) - Demo script
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) - Technical deep dive
- ✅ [HACKATHON_CHECKLIST.md](HACKATHON_CHECKLIST.md) - Pre-submission checklist

## 🚀 Quick Start

```bash
# Install dependencies
npm install
cd frontend && npm install

# Set up environment variables
cp .env.example .env
# Add your OpenAI/Anthropic API key and Pinecone credentials

# Deploy AWS infrastructure (for storage & processing)
cd infrastructure
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
cdk deploy --profile your-aws-profile

# Start backend resurrection engine
npm run backend

# Start frontend séance UI (separate terminal)
cd frontend
npm run dev

# Load Chrome extension (optional)
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the chrome_extension/ folder
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│  Chrome Extension (Dead Link Detector)      │
│  - Detects 404s and dead sites             │
│  - "Summon This Page" button               │
│  - Sends URL to resurrection engine        │
└──────┬──────────────────────────────────────┘
       │
┌──────▼──────────────────────────────────────┐
│  React Frontend (Digital Séance UI)         │
│  - Gothic CRT terminal theme                │
│  - Ghost chat interface                     │
│  - Resurrection progress visualization      │
│  - Historical snapshot browser              │
└──────┬──────────────────────────────────────┘
       │
┌──────▼──────────────────────────────────────┐
│  FastAPI Backend (Resurrection Engine)      │
│  - Wayback Machine API integration          │
│  - LangChain orchestration                  │
│  - Semantic reconstruction pipeline         │
│  - Ghost personality generation             │
└──────┬──────────────────────────────────────┘
       │
┌──────▼──────────────────────────────────────┐
│  Data & AI Layer                            │
│  ├─ Wayback Machine: Historical snapshots   │
│  ├─ Pinecone: Vector memory storage         │
│  ├─ OpenAI/Anthropic: Ghost conversations   │
│  ├─ S3: Cached resurrection data            │
│  └─ DynamoDB: Resurrection metadata         │
└─────────────────────────────────────────────┘
```

## 🎮 Features

- **One-Click Resurrection**: Enter any dead URL and watch it come back to life
- **AI Reconstruction**: Fills gaps in Wayback snapshots using contextual inference
- **Ghost Conversations**: Chat with resurrected sites about their history and content
- **Semantic Memory**: Vector embeddings enable intelligent Q&A about dead content
- **Visual Time Travel**: Browse through historical snapshots with smooth transitions
- **Personality Engine**: Each ghost has unique personality based on original site content
- **Resurrection Gallery**: Browse previously summoned sites

## 🎃 Kiro Features Demonstrated

- **Vibe Coding**: "Hey Kiro, let's create a spooky CRT terminal UI" → Entire gothic theme generated
- **Spec-Driven Development**: Resurrection pipeline defined in `.kiro/specs/resurrection_pipeline.spec.yaml`
- **Steering Rules**: Gothic-Archaeologist persona in `.kiro/steering/gothic_archeologist.md` ensures consistent narrative tone
- **Agent Hooks**: 
  - Auto-generate dataset schemas when new dead website is selected
  - Auto-update UI theme for each resurrection
- **MCP Extensions**: Custom Wayback Machine MCP tool for snapshot retrieval and embedding

## 📊 Demo Scenarios

1. **MySpace Resurrection**: Summon myspace.com from 2005, chat about top bands and profile customization
2. **GeoCities Revival**: Resurrect a GeoCities page, explore its animated GIFs and guestbook
3. **Dead Forum Séance**: Bring back a defunct forum, search through old discussions
4. **Brand Time Machine**: Show how a company's website evolved over decades

## 🏆 Hackathon Submission

- **Primary Category**: Resurrection (bringing dead websites back to life)
- **Bonus Categories**: 
  - Most Creative (interactive digital séance UI)
  - Best Startup Project (Brand Resurrection as a Service)
- **Video Demo**: [YouTube Link - 3min cinematic "séance" experience]
- **Live Demo**: [Deployment URL]
- **Chrome Extension**: Available in `/chrome_extension/`

## 🎥 Demo Video

[3-Minute Cinematic Demo - Coming Soon]

**Demo Highlights**:
- Opening: The problem of dead links and lost web history
- Resurrection: Watch MySpace come back to life from 2005
- Ghost Chat: Converse with resurrected websites
- Chrome Extension: One-click summoning from any dead link
- Kiro Showcase: How AI built 80% of the project

## 🏗️ Project Structure

```
echoes-of-the-dead-web/
├── .kiro/                          # Kiro configuration
│   ├── hooks/                      # Agent automation
│   │   ├── archive_rebuilder.hook.yaml
│   │   └── theme_switcher.hook.yaml
│   ├── specs/                      # Architecture specs
│   │   └── resurrection_pipeline.spec.yaml
│   └── steering/                   # AI guidance
│       ├── aws-standards.md
│       └── gothic_archeologist.md
├── frontend/                       # React + Vite
│   ├── src/
│   │   ├── App.jsx                # Gothic CRT UI
│   │   └── App.css                # Terminal theme
│   └── package.json
├── chrome_extension/               # Browser plugin
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── content.js
├── infrastructure/                 # AWS CDK
│   ├── app.py
│   └── stacks/
├── backend-server.js              # Resurrection engine
├── .env.example                   # Configuration template
├── DEPLOYMENT.md                  # Setup guide
├── HACKATHON_DEMO.md             # Demo script
└── SUBMISSION.md                  # Hackathon submission
```

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Follow the Gothic Archaeologist tone (see `.kiro/steering/`)
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file

## 🙏 Acknowledgments

- **Wayback Machine** - For preserving internet history
- **Kiro** - For making AI-assisted development magical
- **The Dead Web** - For inspiring this digital séance

---

**Built with 💚 (phosphor green) for Kiroween Hackathon 2025**

*"The internet never forgets... it just needs a séance."* 👻
