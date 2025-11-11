// Echoes of the Dead Web - Chrome Extension Popup
const API_URL = 'http://localhost:3001';

document.getElementById('summonBtn').addEventListener('click', async () => {
    const statusDiv = document.getElementById('status');
    statusDiv.style.display = 'block';
    statusDiv.textContent = '⏳ Summoning spirits...';

    try {
        // Get current tab URL
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = tab.url;

        // Send resurrection request
        const response = await fetch(`${API_URL}/api/resurrect`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (response.ok) {
            statusDiv.textContent = `✅ ${data.message}`;

            // Open the main app with the resurrection
            setTimeout(() => {
                chrome.tabs.create({
                    url: `http://localhost:5173?resurrection=${data.resurrectionId}`
                });
            }, 1000);
        } else {
            statusDiv.textContent = `❌ ${data.error}`;
        }
    } catch (error) {
        statusDiv.textContent = `❌ Connection failed: ${error.message}`;
    }
});

document.getElementById('openAppBtn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:5173' });
});
