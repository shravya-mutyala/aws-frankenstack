import './EventFeed.css'

function EventFeed({ events }) {
    return (
        <div className="event-feed">
            <h2>🧠 Monster Reports</h2>
            <div className="events">
                {events.length === 0 ? (
                    <p className="no-events">The monster awaits... Click "Load Events" to see what it has consumed.</p>
                ) : (
                    events.map((event, idx) => (
                        <div key={idx} className="event-card">
                            <div className="event-header">
                                <span className="event-type">📁 {event.file}</span>
                                <span className="event-time">{event.timestamp}</span>
                            </div>
                            <div className="event-meta">
                                <span>Size: {event.size} bytes</span>
                            </div>
                            <p className="event-message">{event.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default EventFeed
