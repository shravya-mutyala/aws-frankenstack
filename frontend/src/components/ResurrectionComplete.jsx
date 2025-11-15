import { useEffect, useState } from 'react';
import './ResurrectionComplete.css';

function ResurrectionComplete({ onComplete }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 500);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={`resurrection-complete ${!visible ? 'fade-out' : ''}`}>
            <div className="complete-animation">
                <div className="success-circle">
                    <div className="checkmark">✓</div>
                </div>
                <h2 className="complete-title">RESURRECTION COMPLETE</h2>
                <p className="complete-message">The ghost awakens...</p>
                <div className="energy-burst"></div>
                <div className="energy-burst burst-2"></div>
                <div className="energy-burst burst-3"></div>
            </div>
        </div>
    );
}

export default ResurrectionComplete;
