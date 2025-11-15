# 🧪 Testing Guide: New Features

## Quick Start

### 1. Start the Development Server
```bash
cd frontend
npm install
npm run dev
```

### 2. Test the Features

#### Test Resurrection Ritual (Loading Animation)
1. Enter any URL (e.g., "myspace.com")
2. Click "👻 Summon"
3. **Expected:** 
   - Pentagram appears and rotates
   - Runes spin around the circle
   - Code fragments float outward
   - Energy pulses expand
   - Phase messages cycle every 2 seconds
   - URL displays in center

#### Test Success Animation
1. Wait for resurrection to complete
2. **Expected:**
   - Full-screen overlay appears
   - Green circle grows with checkmark
   - "RESURRECTION COMPLETE" title
   - "The ghost awakens..." message
   - Energy bursts expand
   - Auto-dismisses after 3 seconds

#### Test Site Autopsy
1. After success animation dismisses
2. **Expected:**
   - Red-bordered autopsy report appears
   - Vital statistics section with domain, era, age, etc.
   - Tech stack tags appear with stagger animation
   - Cause of death certificate with stamp
   - Spirit essence with animated progress bar
   - Rotating official seal at bottom

## Visual Checklist

### Resurrection Ritual ✓
- [ ] Pentagram rotates smoothly (20s per rotation)
- [ ] Runes rotate in reverse (15s per rotation)
- [ ] 6 code fragments float outward
- [ ] 3 energy pulses expand from center
- [ ] Phase text changes every 2 seconds
- [ ] URL is visible and readable
- [ ] All elements glow with appropriate colors

### Success Animation ✓
- [ ] Appears as full-screen overlay
- [ ] Circle grows from 0 to full size
- [ ] Checkmark rotates in
- [ ] Title slides up
- [ ] Message fades in
- [ ] Energy bursts expand
- [ ] Dismisses after 3 seconds
- [ ] Smooth fade out

### Site Autopsy ✓
- [ ] Red border with glow effect
- [ ] Header has gradient background
- [ ] Skull icons pulse
- [ ] Vital statistics grid displays correctly
- [ ] Era badge has purple styling
- [ ] Tech tags appear with stagger
- [ ] Death certificate has rotated stamp
- [ ] Essence bar fills smoothly
- [ ] Official seal rotates
- [ ] Signature line present

## Test URLs

Try these for different eras:

### 90s Sites
- geocities.com
- angelfire.com
- tripod.com

### 2000s Sites
- myspace.com
- friendster.com
- digg.com

### 2010s Sites
- vine.co
- google.com/reader

## Browser Testing

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browser (responsive)

## Performance Checks

- [ ] Animations run smoothly (60fps)
- [ ] No console errors
- [ ] No memory leaks
- [ ] Responsive on mobile
- [ ] Works with slow connections

## Common Issues & Fixes

### Issue: Animations are choppy
**Fix:** Check if hardware acceleration is enabled in browser

### Issue: Pentagram doesn't appear
**Fix:** Check browser console for CSS loading errors

### Issue: Success animation doesn't show
**Fix:** Verify `showComplete` state is being set correctly

### Issue: Autopsy data is missing
**Fix:** Check that resurrection object has required fields:
- url
- personality.era
- personality.greeting
- snapshots array
- selectedSnapshot.timestamp

## Debug Mode

Add this to test components in isolation:

```jsx
// In App.jsx, temporarily add:
const [debugMode, setDebugMode] = useState(true);

// Then render components directly:
{debugMode && <ResurrectionRitual url="test.com" />}
{debugMode && <SiteAutopsy resurrection={mockData} />}
{debugMode && <ResurrectionComplete onComplete={() => {}} />}
```

## Mock Data for Testing

```javascript
const mockResurrection = {
    url: "myspace.com",
    personality: {
        era: "Early 2000s Web",
        greeting: "Yo, I'm like totally from 2003..."
    },
    snapshots: Array(127).fill({ timestamp: "2009-03-15" }),
    selectedSnapshot: {
        timestamp: "2009-03-15T10:30:00Z",
        snapshotUrl: "https://web.archive.org/web/20090315/myspace.com"
    }
};
```

## Success Criteria

✅ All animations run smoothly
✅ No console errors
✅ Responsive on mobile
✅ Gothic theme maintained throughout
✅ Data displays correctly
✅ User flow is intuitive
✅ Loading states are clear
✅ Success feedback is satisfying

## Next Steps After Testing

1. Test with real Wayback Machine API
2. Verify backend integration
3. Test error states
4. Add loading fallbacks
5. Optimize for production build
