import { useEffect, useState } from 'react';
import './SiteAutopsy.css';

function SiteAutopsy({ resurrection }) {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        // Dramatic reveal animation
        const timer = setTimeout(() => setRevealed(true), 500);
        return () => clearTimeout(timer);
    }, [resurrection]);

    // Parse tech stack from snapshots or personality
    const detectTechStack = () => {
        const era = resurrection.personality?.era || 'Unknown Era';
        const techs = [];

        if (era.includes('90s') || era.includes('1990')) {
            techs.push('HTML 3.2', 'CGI Scripts', 'Perl', 'Frames');
        } else if (era.includes('2000') || era.includes('early')) {
            techs.push('PHP 4', 'MySQL', 'Flash', 'JavaScript ES3');
        } else if (era.includes('2010')) {
            techs.push('HTML5', 'CSS3', 'jQuery', 'PHP 5');
        } else {
            techs.push('HTML', 'CSS', 'JavaScript');
        }

        return techs;
    };

    // Determine cause of death
    const causeOfDeath = () => {
        const snapshots = resurrection.snapshots || [];
        if (snapshots.length === 0) return 'Unknown - No traces remain';

        const lastSnapshot = snapshots[snapshots.length - 1];
        const lastYear = new Date(lastSnapshot.timestamp).getFullYear();
        const yearsSince = new Date().getFullYear() - lastYear;

        if (yearsSince > 15) return 'Abandoned - Lost to time';
        if (yearsSince > 10) return 'Domain expiration - Forgotten';
        if (yearsSince > 5) return 'Migration - Moved to new realm';
        return 'Recent death - Still warm';
    };

    // Calculate site vitals
    const vitals = {
        age: resurrection.snapshots?.length
            ? `${new Date().getFullYear() - new Date(resurrection.snapshots[0].timestamp).getFullYear()} years`
            : 'Unknown',
        lastSeen: resurrection.selectedSnapshot?.timestamp
            ? new Date(resurrection.selectedSnapshot.timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            : 'Unknown',
        snapshots: resurrection.snapshots?.length || 0,
        era: resurrection.personality?.era || 'Unknown Era',
        techStack: detectTechStack(),
        causeOfDeath: causeOfDeath()
    };

    return (
        <div className={`site-autopsy ${revealed ? 'revealed' : ''}`}>
            <div className="autopsy-header">
                <h3 className="autopsy-title">
                    <span className="skull-icon">💀</span>
                    DIGITAL AUTOPSY REPORT
                    <span className="skull-icon">💀</span>
                </h3>
                <div className="autopsy-subtitle">Post-Mortem Analysis</div>
            </div>

            <div className="autopsy-body">
                {/* Vital Statistics */}
                <div className="autopsy-section vitals">
                    <div className="section-header">
                        <span className="icon">📊</span>
                        <span>VITAL STATISTICS</span>
                    </div>
                    <div className="vitals-grid">
                        <div className="vital-item">
                            <span className="vital-label">Domain:</span>
                            <span className="vital-value">{resurrection.url}</span>
                        </div>
                        <div className="vital-item">
                            <span className="vital-label">Era:</span>
                            <span className="vital-value era-badge">{vitals.era}</span>
                        </div>
                        <div className="vital-item">
                            <span className="vital-label">Age at Death:</span>
                            <span className="vital-value">{vitals.age}</span>
                        </div>
                        <div className="vital-item">
                            <span className="vital-label">Last Seen:</span>
                            <span className="vital-value">{vitals.lastSeen}</span>
                        </div>
                        <div className="vital-item">
                            <span className="vital-label">Snapshots Preserved:</span>
                            <span className="vital-value snapshot-count">{vitals.snapshots}</span>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="autopsy-section tech-stack">
                    <div className="section-header">
                        <span className="icon">⚙️</span>
                        <span>TECHNOLOGICAL COMPOSITION</span>
                    </div>
                    <div className="tech-tags">
                        {vitals.techStack.map((tech, idx) => (
                            <span key={idx} className="tech-tag" style={{ animationDelay: `${idx * 0.1}s` }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="tech-note">
                        <em>This spirit speaks in the tongues of {vitals.era}</em>
                    </div>
                </div>

                {/* Cause of Death */}
                <div className="autopsy-section cause-of-death">
                    <div className="section-header">
                        <span className="icon">🪦</span>
                        <span>CAUSE OF DEATH</span>
                    </div>
                    <div className="death-certificate">
                        <div className="death-stamp">DECEASED</div>
                        <p className="death-cause">{vitals.causeOfDeath}</p>
                        <div className="death-details">
                            The digital remains show signs of {vitals.snapshots} preserved moments in time.
                            {vitals.snapshots > 50 && ' This was a well-documented life.'}
                            {vitals.snapshots < 10 && ' Few traces remain of this ephemeral existence.'}
                        </div>
                    </div>
                </div>

                {/* Spirit Personality */}
                {resurrection.personality?.greeting && (
                    <div className="autopsy-section spirit-essence">
                        <div className="section-header">
                            <span className="icon">👻</span>
                            <span>SPIRIT ESSENCE</span>
                        </div>
                        <div className="essence-reading">
                            <p className="spirit-quote">"{resurrection.personality.greeting}"</p>
                            <div className="essence-meter">
                                <div className="essence-bar" style={{ width: `${Math.min(vitals.snapshots * 2, 100)}%` }}></div>
                            </div>
                            <div className="essence-label">
                                Spirit Strength: {vitals.snapshots > 50 ? 'Strong' : vitals.snapshots > 20 ? 'Moderate' : 'Faint'}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="autopsy-footer">
                <div className="examiner-signature">
                    <span>Examined by: Digital Necromancer</span>
                    <span className="signature-line">~~~~~~~~~~~~~</span>
                </div>
                <div className="autopsy-seal">
                    <div className="seal-circle">
                        <span className="seal-text">OFFICIAL</span>
                        <span className="seal-subtext">WAYBACK</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SiteAutopsy;
