import { useEffect, useState } from 'react';
import './ResurrectionRitual.css';

function ResurrectionRitual({ url }) {
    const [phase, setPhase] = useState(0);
    const [runes, setRunes] = useState([]);

    const phases = [
        "Summoning spirits from the Wayback Machine...",
        "Reconstructing digital echoes...",
        "Channeling fragments from the past...",
        "The séance intensifies...",
        "The ghost stirs..."
    ];

    useEffect(() => {
        // Generate random runes
        const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];
        const generatedRunes = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            symbol: runeSymbols[Math.floor(Math.random() * runeSymbols.length)],
            angle: (i * 30) - 90
        }));
        setRunes(generatedRunes);

        // Cycle through phases
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % phases.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="resurrection-ritual">
            <div className="ritual-container">
                {/* Outer pentagram circle */}
                <div className="pentagram-circle outer-circle">
                    <svg viewBox="0 0 200 200" className="pentagram-svg">
                        <circle cx="100" cy="100" r="95" className="circle-glow" />
                        <path d="M 100 10 L 120 80 L 190 80 L 135 120 L 160 190 L 100 145 L 40 190 L 65 120 L 10 80 L 80 80 Z"
                            className="pentagram-star" />
                    </svg>
                </div>

                {/* Middle circle with runes */}
                <div className="rune-circle">
                    {runes.map(rune => (
                        <div
                            key={rune.id}
                            className="rune"
                            style={{
                                transform: `rotate(${rune.angle}deg) translateY(-120px) rotate(-${rune.angle}deg)`
                            }}
                        >
                            {rune.symbol}
                        </div>
                    ))}
                </div>

                {/* Inner core with URL */}
                <div className="ritual-core">
                    <div className="core-glow"></div>
                    <div className="url-fragment">{url}</div>
                    <div className="phase-text">{phases[phase]}</div>
                </div>

                {/* Floating code fragments */}
                <div className="code-fragments">
                    <span className="fragment" style={{ '--delay': '0s', '--x': '-50px', '--y': '-80px' }}>&lt;html&gt;</span>
                    <span className="fragment" style={{ '--delay': '0.5s', '--x': '60px', '--y': '-60px' }}>{'{'}</span>
                    <span className="fragment" style={{ '--delay': '1s', '--x': '-70px', '--y': '70px' }}>function()</span>
                    <span className="fragment" style={{ '--delay': '1.5s', '--x': '80px', '--y': '50px' }}>&lt;/&gt;</span>
                    <span className="fragment" style={{ '--delay': '2s', '--x': '0px', '--y': '-100px' }}>404</span>
                    <span className="fragment" style={{ '--delay': '2.5s', '--x': '-90px', '--y': '0px' }}>💀</span>
                </div>

                {/* Energy pulses */}
                <div className="energy-pulse pulse-1"></div>
                <div className="energy-pulse pulse-2"></div>
                <div className="energy-pulse pulse-3"></div>
            </div>
        </div>
    );
}

export default ResurrectionRitual;
