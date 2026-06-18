const json = (body, status = 200) => new Response(JSON.stringify(body), {
    status,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    }
});

const dayOffset = (day, offset) => {
    const date = new Date(`${day}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + offset);
    return date.toISOString().slice(0, 10);
};

const daysBetween = (startDay, endDay) => {
    const start = new Date(`${startDay}T00:00:00Z`);
    const end = new Date(`${endDay}T00:00:00Z`);
    return Math.round((end - start) / 86400000);
};

const getStreak = (activeDays) => {
    const activeSet = new Set(activeDays);
    let streak = 0;
    const cursor = new Date();
    while (activeSet.has(cursor.toISOString().slice(0, 10))) {
        streak += 1;
        cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    return streak;
};

const hashVisitorId = async (visitorId, salt = '') => {
    const input = new TextEncoder().encode(`${salt}:${visitorId}`);
    const hash = await crypto.subtle.digest('SHA-256', input);
    return [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2, '0')).join('');
};

const cleanText = (value, max = 200) => {
    if (typeof value !== 'string') return null;
    return value.slice(0, max);
};

const cleanNumber = (value) => Number.isFinite(value) ? value : null;

const handleEvent = async (request, env) => {
    const event = await request.json();
    if (!event?.visitorId || !event?.name) {
        return json({ ok: false, error: 'Missing visitorId or name' }, 400);
    }

    const at = cleanText(event.at, 40) || new Date().toISOString();
    const day = cleanText(event.day, 10) || at.slice(0, 10);
    const visitorId = await hashVisitorId(event.visitorId, env.VISITOR_SALT || '');

    await env.ANALYTICS_DB.prepare(`
        INSERT INTO analytics_events (
            visitor_id, event_name, event_day, event_at, path, session_id,
            task, mode, score, duration_seconds, attempts, correct_count,
            incorrect_count, accuracy, daily_challenge_id, daily_instance_id,
            daily_task, daily_day, daily_variant, daily_completion, daily_duration,
            source, click_label, click_role, click_x, click_y, click_x_percent,
            click_y_percent, user_agent, language, app_language, screen_width, screen_height
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
        visitorId,
        cleanText(event.name, 80),
        day,
        at,
        cleanText(event.path, 240),
        cleanText(event.sessionId, 120),
        cleanText(event.task, 80),
        cleanText(event.mode, 40),
        cleanNumber(event.score),
        cleanNumber(event.durationSeconds),
        cleanNumber(event.attempts),
        cleanNumber(event.correct),
        cleanNumber(event.incorrect),
        cleanNumber(event.accuracy),
        cleanText(event.dailyChallengeId, 120),
        cleanText(event.dailyInstanceId, 120),
        cleanText(event.dailyTask, 80),
        cleanText(event.dailyDay, 10),
        cleanText(event.dailyVariant, 80),
        cleanText(event.dailyCompletion, 80),
        cleanNumber(event.dailyDuration),
        cleanText(event.source, 80),
        cleanText(event.clickLabel, 200),
        cleanText(event.clickRole, 80),
        cleanNumber(event.clickX),
        cleanNumber(event.clickY),
        cleanNumber(event.clickXPercent),
        cleanNumber(event.clickYPercent),
        cleanText(event.userAgent, 500),
        cleanText(event.language, 40),
        cleanText(event.appLanguage, 20),
        cleanNumber(event.screen?.width),
        cleanNumber(event.screen?.height)
    ).run();

    return json({ ok: true });
};

const handleSummary = async (request, env) => {
    const token = request.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
    if (!env.ANALYTICS_READ_TOKEN || token !== env.ANALYTICS_READ_TOKEN) {
        return json({ ok: false, error: 'Unauthorized' }, 401);
    }

    const counts = await env.ANALYTICS_DB.prepare(`
        SELECT
            COUNT(DISTINCT visitor_id) AS totalUsers,
            SUM(CASE WHEN event_name = 'session_start' THEN 1 ELSE 0 END) AS totalVisits,
            SUM(CASE WHEN event_name = 'game_start' THEN 1 ELSE 0 END) AS totalStarts,
            SUM(CASE WHEN event_name = 'game_complete' THEN 1 ELSE 0 END) AS totalCompletions,
            SUM(CASE WHEN event_name = 'click' AND click_role = 'game_card' THEN 1 ELSE 0 END) AS totalClicks,
            MIN(event_day) AS firstDay
        FROM analytics_events
    `).first();

    const activeRows = await env.ANALYTICS_DB.prepare(`
        SELECT visitor_id, event_day
        FROM analytics_events
        GROUP BY visitor_id, event_day
        ORDER BY visitor_id, event_day
    `).all();

    const dailyRows = await env.ANALYTICS_DB.prepare(`
        SELECT
            event_day AS day,
            COUNT(DISTINCT visitor_id) AS users,
            SUM(CASE WHEN event_name = 'session_start' THEN 1 ELSE 0 END) AS visits
        FROM analytics_events
        GROUP BY event_day
        ORDER BY event_day DESC
        LIMIT 60
    `).all();

    const topTask = await env.ANALYTICS_DB.prepare(`
        SELECT COALESCE(task, 'arena') AS task, COUNT(*) AS count
        FROM analytics_events
        WHERE event_name = 'game_complete'
        GROUP BY COALESCE(task, 'arena')
        ORDER BY count DESC
        LIMIT 1
    `).first();

    const topClicks = await env.ANALYTICS_DB.prepare(`
        SELECT COALESCE(click_label, click_role, 'Unknown') AS label, COUNT(*) AS count
        FROM analytics_events
        WHERE event_name = 'click' AND click_role = 'game_card'
        GROUP BY COALESCE(click_label, click_role, 'Unknown')
        ORDER BY count DESC
        LIMIT 6
    `).all();

    const modeRows = await env.ANALYTICS_DB.prepare(`
        SELECT
            COALESCE(mode, 'unknown') AS mode,
            SUM(CASE WHEN event_name = 'game_start' THEN 1 ELSE 0 END) AS starts,
            SUM(CASE WHEN event_name = 'game_complete' THEN 1 ELSE 0 END) AS completes,
            ROUND(AVG(CASE WHEN event_name = 'game_complete' THEN score ELSE NULL END)) AS avgScore,
            ROUND(AVG(CASE WHEN event_name = 'game_complete' THEN accuracy ELSE NULL END)) AS avgAccuracy
        FROM analytics_events
        WHERE event_name IN ('game_start', 'game_complete')
        GROUP BY COALESCE(mode, 'unknown')
        ORDER BY starts DESC
    `).all();

    const taskRows = await env.ANALYTICS_DB.prepare(`
        SELECT
            COALESCE(CASE WHEN mode = 'daily' THEN daily_task ELSE task END, task, 'unknown') AS task,
            SUM(CASE WHEN event_name = 'game_start' THEN 1 ELSE 0 END) AS starts,
            SUM(CASE WHEN event_name = 'game_complete' THEN 1 ELSE 0 END) AS completes,
            ROUND(AVG(CASE WHEN event_name = 'game_complete' THEN score ELSE NULL END)) AS avgScore,
            ROUND(AVG(CASE WHEN event_name = 'game_complete' THEN duration_seconds ELSE NULL END)) AS avgDuration,
            ROUND(AVG(CASE WHEN event_name = 'game_complete' THEN accuracy ELSE NULL END)) AS avgAccuracy
        FROM analytics_events
        WHERE event_name IN ('game_start', 'game_complete')
        GROUP BY COALESCE(CASE WHEN mode = 'daily' THEN daily_task ELSE task END, task, 'unknown')
        ORDER BY starts DESC
        LIMIT 8
    `).all();

    const dailyChallengeRows = await env.ANALYTICS_DB.prepare(`
        SELECT
            COALESCE(daily_challenge_id, daily_variant, daily_task, 'daily') AS challenge,
            SUM(CASE WHEN event_name = 'game_start' THEN 1 ELSE 0 END) AS starts,
            SUM(CASE WHEN event_name = 'game_complete' THEN 1 ELSE 0 END) AS completes,
            ROUND(AVG(CASE WHEN event_name = 'game_complete' THEN score ELSE NULL END)) AS avgScore,
            ROUND(AVG(CASE WHEN event_name = 'game_complete' THEN accuracy ELSE NULL END)) AS avgAccuracy
        FROM analytics_events
        WHERE mode = 'daily' AND event_name IN ('game_start', 'game_complete')
        GROUP BY COALESCE(daily_challenge_id, daily_variant, daily_task, 'daily')
        ORDER BY starts DESC
        LIMIT 7
    `).all();

    const deviceRows = await env.ANALYTICS_DB.prepare(`
        SELECT
            CASE
                WHEN screen_width IS NULL THEN 'unknown'
                WHEN screen_width <= 700 THEN 'mobile'
                ELSE 'desktop'
            END AS device,
            COUNT(DISTINCT visitor_id) AS users,
            COUNT(*) AS events
        FROM analytics_events
        GROUP BY
            CASE
                WHEN screen_width IS NULL THEN 'unknown'
                WHEN screen_width <= 700 THEN 'mobile'
                ELSE 'desktop'
            END
        ORDER BY users DESC
    `).all();

    const languageRows = await env.ANALYTICS_DB.prepare(`
        SELECT COALESCE(app_language, language, 'unknown') AS language, COUNT(DISTINCT visitor_id) AS users
        FROM analytics_events
        GROUP BY COALESCE(app_language, language, 'unknown')
        ORDER BY users DESC
        LIMIT 6
    `).all();

    const activeByVisitor = new Map();
    for (const row of activeRows.results || []) {
        if (!activeByVisitor.has(row.visitor_id)) activeByVisitor.set(row.visitor_id, []);
        activeByVisitor.get(row.visitor_id).push(row.event_day);
    }

    const activeDays = [...new Set((activeRows.results || []).map(row => row.event_day))].sort();
    const gaps = [];
    let d1Count = 0;
    let d7Count = 0;
    let d30Count = 0;

    for (const days of activeByVisitor.values()) {
        const first = days[0];
        const daySet = new Set(days);
        if (daySet.has(dayOffset(first, 1))) d1Count += 1;
        if (daySet.has(dayOffset(first, 7))) d7Count += 1;
        if (daySet.has(dayOffset(first, 30))) d30Count += 1;

        days.slice(1).forEach((day, index) => {
            const gap = daysBetween(days[index], day);
            if (gap > 0) gaps.push(gap);
        });
    }

    const totalUsers = counts?.totalUsers || 0;
    const rate = count => totalUsers ? Math.round((count / totalUsers) * 100) : 0;
    const dailyMap = new Map((dailyRows.results || []).map(row => [row.day, row]));
    const last7Days = Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setUTCDate(date.getUTCDate() - (6 - index));
        const day = date.toISOString().slice(0, 10);
        const row = dailyMap.get(day);
        return { day, visits: row?.visits || 0, users: row?.users || 0, active: !!row };
    });

    const totalStarts = counts?.totalStarts || 0;
    const totalCompletions = counts?.totalCompletions || 0;
    const withRates = (rows = []) => rows.map(row => ({
        ...row,
        starts: row.starts || 0,
        completes: row.completes || 0,
        completionRate: row.starts ? Math.round((row.completes / row.starts) * 100) : 0,
        avgScore: row.avgScore || 0,
        avgDuration: row.avgDuration || 0,
        avgAccuracy: row.avgAccuracy || 0
    }));

    return json({
        ok: true,
        summary: {
            source: 'cloud',
            firstDay: counts?.firstDay || new Date().toISOString().slice(0, 10),
            activeDays,
            totalUsers,
            totalVisits: counts?.totalVisits || 0,
            totalSessions: counts?.totalVisits || 0,
            totalStarts,
            totalCompletions,
            completionRate: totalStarts ? Math.round((totalCompletions / totalStarts) * 100) : 0,
            currentStreak: getStreak(activeDays),
            averageReturnGap: gaps.length ? (gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length).toFixed(1) : '-',
            d1: d1Count > 0,
            d7: d7Count > 0,
            d30: d30Count > 0,
            d1Value: `${rate(d1Count)}%`,
            d7Value: `${rate(d7Count)}%`,
            d30Value: `${rate(d30Count)}%`,
            topTask: topTask?.task || '-',
            topTaskCount: topTask?.count || 0,
            totalClicks: counts?.totalClicks || 0,
            topClicks: topClicks.results || [],
            last7Days,
            modeBreakdown: withRates(modeRows.results || []),
            taskBreakdown: withRates(taskRows.results || []),
            dailyBreakdown: withRates(dailyChallengeRows.results || []),
            deviceBreakdown: deviceRows.results || [],
            languageBreakdown: languageRows.results || [],
            dailyStarts: (modeRows.results || []).find(row => row.mode === 'daily')?.starts || 0,
            dailyCompletions: (modeRows.results || []).find(row => row.mode === 'daily')?.completes || 0,
            infiniteStarts: (modeRows.results || []).find(row => row.mode === 'infinite')?.starts || 0,
            arenaStarts: (modeRows.results || []).find(row => row.mode === 'comp')?.starts || 0
        }
    });
};

export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') return json({ ok: true });

        const url = new URL(request.url);
        const isRetentionApi = url.pathname.startsWith('/api/retention');

        if (isRetentionApi && url.pathname.endsWith('/events') && request.method === 'POST') {
            return handleEvent(request, env);
        }
        if (isRetentionApi && url.pathname.endsWith('/summary') && request.method === 'GET') {
            return handleSummary(request, env);
        }

        if (env.ASSETS) {
            return env.ASSETS.fetch(request);
        }

        return json({ ok: false, error: 'Not found' }, 404);
    }
};
