# ⚡ Quick Start Guide - Echoes of the Dead Web

Get the séance chamber running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A text editor
- Chrome browser (for extension)

## 🚀 Fastest Path to Demo

### Step 1: Install (2 minutes)

```bash
# Clone or navigate to project directory
cd echoes-of-the-dead-web

# Install all dependencies
npm install
cd frontend && npm install && cd ..
```

### Step 2: Configure (1 minute)

```bash
# Copy environment template
cp .env.example .env

# Optional: Add API keys for full features
# For basic demo, you can skip this - Wayback Machine works without keys
```

### Step 3: Start (1 minute)

Open TWO terminal windows:

**Terminal 1 - Backend:**
```bash
npm run backend
```

Wait for: `👻 Resurrection Engine awakened on port 3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Wait for: `Local: http://localhost:5173`

### Step 4: Resurrect! (1 minute)

1. Open http://localhost:5173 in your browser
2. Enter a URL: `myspace.com`
3. Click `👻 Summon`
4. Watch the resurrection happen!

## 🎮 Try These URLs

**Best Demo Sites:**
- `myspace.com` - Social network from 2005
- `geocities.com` - Classic 90s personal pages
- `netscape.com` - Historic browser company
- `apple.com` - See Apple's evolution

**What Works Without API Keys:**
- ✅ URL resurrection from Wayback Machine
- ✅ Snapshot browsing
- ✅ Gothic CRT UI
- ✅ Real-time WebSocket updates
- ✅ Resurrection gallery

**What Needs API Keys:**
- ⚠️ AI ghost conversations (requires OpenAI/Anthropic)
- ⚠️ Semantic search (requires Pinecone)

## 🔧 Optional: Chrome Extension

1. Open Chrome: `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select the `chrome_extension/` folder
5. Navigate to any 404 page to see the summon button!

## 🐛 Troubleshooting

### Backend won't start
```bash
# Port 3001 might be in use
# Change PORT in .env or kill the process:
# Windows: netstat -ano | findstr :3001
# Mac/Linux: lsof -i :3001
```

### Frontend shows connection error
```bash
# Make sure backend is running first
# Check http://localhost:3001 in browser
# Should see: Cannot GET /
```

### No snapshots found
```bash
# Try a different URL
# Some sites have limited Wayback Machine coverage
# Best results: major sites from 2000-2015
```

## 📚 Next Steps

Once you have it running:

1. **Read HACKATHON_DEMO.md** - Full demo script and scenarios
2. **Read DEPLOYMENT.md** - Production deployment guide
3. **Explore .kiro/** - See how Kiro built this project
4. **Add API keys** - Enable AI ghost conversations

## 🎃 Demo Tips

**For Judges/Viewers:**
1. Start with MySpace - most impressive resurrection
2. Show the Chrome extension on a 404 page
3. Highlight the gothic CRT aesthetic
4. Point out the `.kiro/` directory structure
5. Emphasize the 80% AI-generated codebase

**For Development:**
1. Check `backend-server.js` for API endpoints
2. Modify `frontend/src/App.css` for theme changes
3. Update `.kiro/steering/gothic_archeologist.md` for tone
4. Add new hooks in `.kiro/hooks/` for automation

## 💡 Quick Customization

### Change the color scheme:
Edit `frontend/src/App.css`:
```css
:root {
  --phosphor-green: #00FF41;  /* Change this */
  --ghostly-blue: #4ECDC4;    /* And this */
}
```

### Add new loading messages:
Edit `backend-server.js`:
```javascript
const messages = [
  'Summoning spirits...',
  'Your custom message here...'
];
```

### Modify ghost personality:
Edit `backend-server.js` → `generateGhostPersonality()` function

## 🏆 Hackathon Checklist

Before submitting:
- [ ] Both servers running
- [ ] Can resurrect at least one site
- [ ] Chrome extension loaded
- [ ] Screenshots/video captured
- [ ] SUBMISSION.md reviewed
- [ ] GitHub repo public (if applicable)

---

**You're ready to summon the dead web! 👻**

**Need help?** Check DEPLOYMENT.md for detailed troubleshooting.

**Want to understand the architecture?** Read HACKATHON_DEMO.md.

**Ready to deploy?** Follow DEPLOYMENT.md for AWS setup.
