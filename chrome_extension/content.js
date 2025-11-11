// Detect 404 pages and inject "Summon" button
(function () {
    // Check if page is a 404 or dead link
    const is404 = document.title.toLowerCase().includes('404') ||
        document.title.toLowerCase().includes('not found') ||
        document.body.textContent.toLowerCase().includes('page not found');

    if (is404) {
        injectSummonButton();
    }

    function injectSummonButton() {
        const button = document.createElement('div');
        button.id = 'dead-web-summon';
        button.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #0A0E27;
        border: 2px solid #00FF41;
        padding: 15px 25px;
        color: #00FF41;
        font-family: 'Courier New', monospace;
        cursor: pointer;
        z-index: 999999;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
        animation: pulse 2s infinite;
      ">
        👻 Summon This Page from the Dead
      </div>
    `;

        button.addEventListener('click', () => {
            chrome.runtime.sendMessage({ action: 'summon', url: window.location.href });
        });

        document.body.appendChild(button);

        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `;
        document.head.appendChild(style);
    }
})();
