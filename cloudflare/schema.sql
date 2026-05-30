CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT NOT NULL,
    event_name TEXT NOT NULL,
    event_day TEXT NOT NULL,
    event_at TEXT NOT NULL,
    path TEXT,
    session_id TEXT,
    task TEXT,
    mode TEXT,
    score INTEGER,
    duration_seconds INTEGER,
    source TEXT,
    user_agent TEXT,
    language TEXT,
    screen_width INTEGER,
    screen_height INTEGER
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_day
ON analytics_events (event_day);

CREATE INDEX IF NOT EXISTS idx_analytics_events_name_day
ON analytics_events (event_name, event_day);

CREATE INDEX IF NOT EXISTS idx_analytics_events_visitor_day
ON analytics_events (visitor_id, event_day);
