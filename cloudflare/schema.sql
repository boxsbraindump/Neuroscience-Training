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
    attempts INTEGER,
    correct_count INTEGER,
    incorrect_count INTEGER,
    accuracy INTEGER,
    daily_challenge_id TEXT,
    daily_instance_id TEXT,
    daily_task TEXT,
    daily_day TEXT,
    daily_variant TEXT,
    daily_completion TEXT,
    daily_duration INTEGER,
    source TEXT,
    click_label TEXT,
    click_role TEXT,
    click_x INTEGER,
    click_y INTEGER,
    click_x_percent INTEGER,
    click_y_percent INTEGER,
    user_agent TEXT,
    language TEXT,
    app_language TEXT,
    screen_width INTEGER,
    screen_height INTEGER
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_day
ON analytics_events (event_day);

CREATE INDEX IF NOT EXISTS idx_analytics_events_name_day
ON analytics_events (event_name, event_day);

CREATE INDEX IF NOT EXISTS idx_analytics_events_visitor_day
ON analytics_events (visitor_id, event_day);
