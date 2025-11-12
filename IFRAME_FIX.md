# 🪦 Iframe Fix for Amplify Deployment

## The Problem
The resurrected websites weren't showing in production because AWS Amplify sets strict Content Security Policy (CSP) headers that block iframes from external domains like `web.archive.org`.

## The Solution

### 1. Updated `amplify.yml` with Custom Headers
Added CSP headers that allow iframes from the Wayback Machine:
- `frame-src 'self' https://web.archive.org http://web.archive.org`

### 2. Enhanced Iframe Security
Added sandbox attributes to the iframe for better security:
- `sandbox="allow-same-origin allow-scripts allow-popups allow-forms"`
- `referrerPolicy="no-referrer"`

### 3. Added Fallback Link
If the iframe still doesn't load (some Wayback snapshots have their own CSP), users can click a link to view it directly.

## Deployment Steps

1. **Commit and push the changes:**
   ```bash
   git add amplify.yml frontend/src/App.jsx frontend/src/App.css
   git commit -m "Fix: Allow Wayback Machine iframes in production"
   git push origin main
   ```

2. **Amplify will automatically redeploy** with the new headers.

3. **Wait 2-3 minutes** for the build to complete.

4. **Test the fix:**
   - Visit your Amplify URL
   - Summon yahoo.com
   - The ghost should now awaken! 👻

## Alternative: Manual Header Configuration

If the `amplify.yml` customHeaders don't work, you can also set headers in the Amplify Console:

1. Go to AWS Amplify Console
2. Select your app
3. Go to "Hosting" → "Custom headers"
4. Add the CSP header manually

## Why This Works

The Wayback Machine serves archived content from `web.archive.org`. By adding this domain to the `frame-src` directive in the CSP header, we explicitly allow iframes from this source while maintaining security for other resources.

## Troubleshooting

If the iframe still doesn't show:

1. **Check browser console** for CSP errors
2. **Verify headers are applied** - Open DevTools → Network → Select your page → Check Response Headers
3. **Some snapshots may refuse to load** - The Wayback Machine itself may have CSP headers that prevent embedding. In this case, use the fallback link.
4. **Try different snapshots** - Some years/versions may work better than others

## Gothic Archaeologist Says...
*"The spirits were trapped behind digital barriers. Now the séance chamber is properly configured, and the ghosts can manifest once more..."* 🔮
