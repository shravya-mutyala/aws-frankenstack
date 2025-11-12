import { useState, useEffect, useRef } from 'react';
import './App.css';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').trim();
const WS_URL = API_URL.replace('https://', 'wss://').replace('http://', 'ws://');

function App() {
    const [url, setUrl] = useState('');
    const [resurrection, setResurrection] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [resurrections, setResurrections] = useState([]);
    const wsRef = useRef(null);

    useEffect(() => {
        // Connect to WebSocket for real-time updates
        wsRef.current = new WebSocket(WS_URL);

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'resurrection_complete') {
                setResurrection(data.data);
                setLoading(false);
            }
        };

        // Load previous resurrections
        fetchResurrections();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const fetchResurrections = async () => {
        try {
            const response = await fetch(`${API_URL}/api/resurrections`);
            const data = await response.json();
            setResurrections(data.resurrections);
        } catch (err) {
            console.error('Failed to fetch resurrections:', err);
        }
    };

    const handleResurrect = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResurrection(null);
        setChatHistory([]);

        try {
            const response = await fetch(`${API_URL}/api/resurrect`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Resurrection failed');
            }

            // Poll for completion (WebSocket will also update)
            const checkStatus = setInterval(async () => {
                const statusResponse = await fetch(`${API_URL}/api/resurrect/${data.resurrectionId}`);
                const statusData = await statusResponse.json();

                if (statusData.status === 'complete') {
                    setResurrection(statusData);
                    setLoading(false);
                    clearInterval(checkStatus);
                    fetchResurrections();
                }
            }, 1000);

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleChat = async (e) => {
        e.preventDefault();
        if (!chatMessage.trim() || !resurrection) return;

        const userMessage = { role: 'user', content: chatMessage };
        setChatHistory(prev => [...prev, userMessage]);
        setChatMessage('');

        try {
            const response = await fetch(`${API_URL}/api/chat/${resurrection.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: chatMessage })
            });

            const data = await response.json();
            const ghostMessage = { role: 'ghost', content: data.ghost_reply };
            setChatHistory(prev => [...prev, ghostMessage]);

        } catch (err) {
            console.error('Chat failed:', err);
        }
    };

    return (
        <div className="app">
            <div className="crt-overlay"></div>
            <div className="scanlines"></div>

            <header className="header">
                <h1 className="title glitch" data-text="ECHOES OF THE DEAD WEB">
                    ECHOES OF THE DEAD WEB
                </h1>
                <p className="tagline">Because the internet never forgets… it just needs a séance.</p>
            </header>

            <main className="main-content">
                {/* Resurrection Form */}
                <section className="resurrection-chamber">
                    <h2 className="section-title">🪦 Summon a Lost Site</h2>
                    <form onSubmit={handleResurrect} className="summon-form">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter a dead URL (e.g., myspace.com)"
                            className="url-input"
                            disabled={loading}
                        />
                        <button type="submit" className="summon-button" disabled={loading}>
                            {loading ? '⏳ Summoning...' : '👻 Summon'}
                        </button>
                    </form>

                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}

                    {loading && (
                        <div className="loading-state">
                            <div className="loading-text">
                                <p>Channeling fragments from the Wayback Machine...</p>
                                <p className="flicker">The séance begins...</p>
                            </div>
                        </div>
                    )}
                </section>

                {/* Resurrected Site Display */}
                {resurrection && (
                    <section className="ghost-chamber">
                        <div className="ghost-header">
                            <h2 className="section-title">👁️ The Ghost Awakens</h2>
                            <div className="ghost-info">
                                <p><strong>Domain:</strong> {resurrection.url}</p>
                                <p><strong>Era:</strong> {resurrection.personality.era}</p>
                                <p><strong>Snapshots Found:</strong> {resurrection.snapshots.length}</p>
                            </div>
                        </div>

                        {/* Snapshot Preview */}
                        <div className="snapshot-preview">
                            <div className="snapshot-url-debug">
                                Loading: <code>{resurrection.selectedSnapshot.snapshotUrl}</code>
                            </div>
                            <iframe
                                src={resurrection.selectedSnapshot.snapshotUrl}
                                title="Resurrected Site"
                                className="ghost-frame"
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
                                loading="eager"
                                onLoad={() => console.log('Iframe loaded successfully')}
                                onError={(e) => console.error('Iframe failed to load:', e)}
                            />
                            <div className="iframe-fallback">
                                <p>If the ghost doesn't appear, <a href={resurrection.selectedSnapshot.snapshotUrl} target="_blank" rel="noopener noreferrer">view it directly in the Wayback Machine</a></p>
                            </div>
                        </div>

                        {/* Chat Interface */}
                        <div className="chat-chamber">
                            <h3 className="chat-title">💬 Converse with the Ghost</h3>

                            {chatHistory.length === 0 && (
                                <div className="ghost-greeting">
                                    <p className="flicker">{resurrection.personality.greeting}</p>
                                </div>
                            )}

                            <div className="chat-history">
                                {chatHistory.map((msg, idx) => (
                                    <div key={idx} className={`chat-message ${msg.role}`}>
                                        <span className="message-label">
                                            {msg.role === 'user' ? '🧑 You' : '👻 Ghost'}:
                                        </span>
                                        <span className="message-content">{msg.content}</span>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleChat} className="chat-form">
                                <input
                                    type="text"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    placeholder="Ask the ghost about its past..."
                                    className="chat-input"
                                />
                                <button type="submit" className="chat-button">Send</button>
                            </form>
                        </div>
                    </section>
                )}

                {/* Resurrection Gallery */}
                {resurrections.length > 0 && (
                    <section className="resurrection-gallery">
                        <h2 className="section-title">🗂️ Previously Summoned</h2>
                        <div className="gallery-grid">
                            {resurrections.slice(0, 6).map((res) => (
                                <div key={res.id} className="gallery-item" onClick={() => setResurrection(res)}>
                                    <div className="gallery-domain">{res.url}</div>
                                    <div className="gallery-era">{res.personality.era}</div>
                                    <div className="gallery-status">{res.status}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <footer className="footer">
                <p>Kiroween Hackathon 2025 - Resurrection Category</p>
                <p className="flicker">Built with Kiro's agentic AI</p>
            </footer>
        </div>
    );
}

export default App;
