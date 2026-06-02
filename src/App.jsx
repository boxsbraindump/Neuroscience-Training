const { useState, useEffect, useRef } = React;
const { createNbackRound } = window.PFLGameLogic;



const Icon = ({ name, className = "w-6 h-6" }) => {
    const iconRef = useRef(null);
    useEffect(() => {
        if (window.lucide && iconRef.current) {
            iconRef.current.innerHTML = '';
            const iconEl = document.createElement('i');
            iconEl.setAttribute('data-lucide', name);
            iconEl.className = className;
            iconRef.current.appendChild(iconEl);
            window.lucide.createIcons();
        }
    }, [name, className]);
    return <span ref={iconRef} className="inline-flex items-center justify-center"></span>;
};

const LatexFmt = ({ text }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
            const raw = text.replace(/\$(.*?)\$/g, (match, p1) => {
                try { return katex.renderToString(p1, { throwOnError: false }); } catch (e) { return p1; }
            });
            containerRef.current.innerHTML = raw;
        }
    }, [text]);
    return <div ref={containerRef} className="inline leading-relaxed" />;
};

const UI_TEXT = {
    zh: {
        appTitle: "前额叶实验室 6.1.2",
        bestSynced: "历史最高 (已同步)",
        normal: "基础",
        hard: "进阶",
        hardLocked: "🔒 进阶",
        infinite: "无限",
        infiniteMode: "无限模式",
        infiniteScore: "自由练习",
        infinitePill: "不计入历史",
        comp: "竞技",
        arenaTitle: "全能认知竞技场",
        arenaShortTitle: "全能竞技",
        arenaSubtitle: "混合：舒尔特方格 / Stroop反应 / 快速SET / N-Back / 神经元计数",
        updateTitle: "实验室更新公告",
        updateVersion: "Version 6.1.2",
        updateButton: "知道了，这就去练脑",
        startTraining: "开始训练",
        navTrain: "训练",
        navDaily: "每日挑战",
        navArena: "竞技",
        navAnalytics: "分析",
        settings: "设置",
        settingsLanguage: "语言",
        settingsData: "数据与同步",
        settingsSoon: "稍后开放",
        dailyTitle: "每日挑战",
        dailyToday: "今日任务",
        dailyBest: "今日最好",
        dailyStreak: "连续",
        dailyDone: "今日已完成",
        dailyStart: "开始今日挑战",
        dailyCheckIn: "今日打卡",
        dailyWeek: "本周",
        dailyCompleted: "总打卡",
        dailyGoal: "60 秒限时挑战",
        dailyGoalFinish: "完成目标",
        dailyGoalTimed: "限时挑战",
        dailyReward: "完成后点亮今天的打卡记录",
        dailyReplay: "再冲一次",
        dailyDays: "天",
        dailyFinishedTitle: "今日已打卡",
        dailyFinishedSub: "连续记录保持中，明天会刷新新的挑战。",
        dailyTomorrow: "明天解锁新挑战",
        moduleLabel: "TRAINING MODULE",
        training: "TRAINING",
        arenaMode: "ARENA MODE",
        taskBest: "历史最高",
        retry: "再试一次",
        match: "匹配",
        different: "不同",
        continue: "继续",
        refreshSet: "找不到？换一批",
        neuronTarget: "目标图形",
        neuronInstruction: "数出所有相同图形",
        recorded: "已记录",
        reset: "清零",
        submit: "确认提交",
        resultTitle: "测试结束 - 最终得分",
        backHome: "返回大厅"
    },
    en: {
        appTitle: "Prefrontal Lab 6.1.2",
        bestSynced: "Personal Best",
        normal: "Basic",
        hard: "Advanced",
        hardLocked: "🔒 Advanced",
        infinite: "Endless",
        infiniteMode: "Endless Mode",
        infiniteScore: "Free Practice",
        infinitePill: "Not saved as best",
        comp: "Arena",
        arenaTitle: "Cognitive Arena",
        arenaShortTitle: "Arena",
        arenaSubtitle: "Mixed training: Schulte Grid / Stroop / SET / N-Back / Neuron Counting",
        updateTitle: "Lab Update",
        updateVersion: "Version 6.1.2",
        updateButton: "Got it, start training",
        startTraining: "Start Training",
        navTrain: "Train",
        navDaily: "Daily",
        navArena: "Arena",
        navAnalytics: "Analytics",
        settings: "Settings",
        settingsLanguage: "Language",
        settingsData: "Data & Sync",
        settingsSoon: "Coming soon",
        dailyTitle: "Daily Challenge",
        dailyToday: "Today's Task",
        dailyBest: "Today Best",
        dailyStreak: "Streak",
        dailyDone: "Done today",
        dailyStart: "Start Daily",
        dailyCheckIn: "Check in",
        dailyWeek: "This Week",
        dailyCompleted: "Total",
        dailyGoal: "60-second challenge",
        dailyGoalFinish: "Goal clear",
        dailyGoalTimed: "Timed run",
        dailyReward: "Finish to light up today's check-in",
        dailyReplay: "Try again",
        dailyDays: "days",
        dailyFinishedTitle: "Daily checked in",
        dailyFinishedSub: "Your streak is alive. A new challenge unlocks tomorrow.",
        dailyTomorrow: "New challenge tomorrow",
        moduleLabel: "TRAINING MODULE",
        training: "TRAINING",
        arenaMode: "ARENA MODE",
        taskBest: "Best",
        retry: "Try again",
        match: "Match",
        different: "Different",
        continue: "Continue",
        refreshSet: "No set? Shuffle",
        neuronTarget: "Target Shape",
        neuronInstruction: "Count every matching shape",
        recorded: "COUNT",
        reset: "Reset",
        submit: "Submit",
        resultTitle: "Training Complete - Final Score",
        backHome: "Back to Lobby"
    }
};

const UPDATE_LINES = {
    zh: [
        "新增每日挑战：固定周节奏、今日最好、连续打卡、本周打卡进度。",
        "新增无限模式：无倒计时自由练习，不影响历史最高分。",
        "优化网页/移动端导航、设置入口、Daily 与竞技页视觉层级。",
        "优化 Stroop、SET 等任务反馈，让答对状态更清楚。"
    ],
    en: [
        "Added Daily Challenge with weekday rotation, today best, streaks, and weekly check-ins.",
        "Added Endless Mode for no-timer free practice without changing personal bests.",
        "Refined responsive navigation, settings, Daily layout, and Arena visual hierarchy.",
        "Improved Stroop and SET feedback so correct answers feel clearer."
    ]
};

const RESULT_TEXT = {
    zh: [
        { max: 0, label: "实验室新人", sub: "别灰心，大脑正在热身！", color: "text-slate-400" },
        { max: 200, label: "初露锋芒", sub: "神经元开始活跃，继续保持。", color: "text-blue-500" },
        { max: 500, label: "脑力达人", sub: "专注力已经超过了 70% 的人！", color: "text-indigo-600" },
        { max: 800, label: "认知巅峰", sub: "极速反应！你的大脑放电非常快。", color: "text-purple-600" },
        { max: Infinity, label: "前额叶战神", sub: "你的大脑结构可能异于常人！", color: "text-amber-600" }
    ],
    en: [
        { max: 0, label: "Lab Rookie", sub: "No worries. Your brain is warming up.", color: "text-slate-400" },
        { max: 200, label: "Spark Starter", sub: "Your neurons are waking up. Keep going.", color: "text-blue-500" },
        { max: 500, label: "Focus Builder", sub: "Your attention is getting sharp.", color: "text-indigo-600" },
        { max: 800, label: "Cognitive Peak", sub: "Fast reactions. Your brain is firing cleanly.", color: "text-purple-600" },
        { max: Infinity, label: "Prefrontal Master", sub: "That was seriously impressive.", color: "text-amber-600" }
    ]
};

const TASK_TRANSLATIONS = {
    schulte: {
        title: "Schulte Grid",
        homeBasic: "Focus and visual span",
        homeHard: "Blind-spot mode",
        guide: {
            play: `<div class="space-y-4"><p class="text-slate-600 font-medium text-sm">Tap the numbers from <span class="text-blue-600 font-bold">1 to 25</span> in order.</p><div class="bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50 text-[11px] text-slate-500">Tip: keep your eyes near the center and use peripheral vision to catch nearby numbers.</div></div>`,
            playHard: `<div class="space-y-4"><p class="text-slate-600 font-medium text-sm"><span class="text-amber-600 font-bold">Advanced:</span> numbers disappear immediately after you tap them.</p><div class="bg-amber-50 p-4 rounded-3xl border border-amber-100 text-[11px] text-amber-700 leading-relaxed">Remember which positions are already cleared so you do not waste search time.</div></div>`
        }
    },
    stroop: {
        title: "Stroop Test",
        homeBasic: "Inhibition control",
        homeHard: "Double conflict",
        guide: {
            play: `<div class="space-y-4"><p class="text-slate-600 font-medium text-sm">Ignore the word meaning. Choose the button that matches the word's <span class="text-rose-600 font-bold">actual color</span>.</p><div class="bg-rose-50/50 p-3 rounded-2xl border border-rose-100/50 text-[11px] text-slate-500">Your brain wants to read the word first. Force attention onto the color.</div></div>`,
            playHard: `<div class="space-y-4"><p class="text-slate-600 font-medium text-sm"><span class="text-rose-600 font-bold">Advanced:</span> color blocks disappear. Tap the written color name instead.</p><div class="bg-rose-50 p-4 rounded-3xl border border-rose-100 text-[11px] text-rose-700 leading-relaxed">If the word RED is shown in blue, choose the button labeled BLUE.</div></div>`
        }
    },
    nback: {
        title: "N-Back Memory",
        homeBasic: "1-Back mode",
        homeHard: "2-Back challenge",
        guide: {
            play: `<div class="space-y-4"><p class="text-slate-600 font-medium text-sm">Decide whether the current number matches the number from <span class="text-indigo-600 font-bold">1 step ago</span>.</p><div class="font-mono tracking-widest text-center py-2 bg-white rounded-lg border border-slate-100 text-[11px]">2 → 5 → <span class="bg-green-100 px-1 rounded text-green-700 font-bold">5</span> = Match</div></div>`,
            playHard: `<div class="space-y-4"><p class="text-slate-600 font-medium text-sm">Decide whether the current number matches the number from <span class="text-purple-600 font-bold">2 steps ago</span>.</p><p class="text-[10px] text-center text-slate-400">Skip one number between the comparison and the current item.</p></div>`
        }
    },
    setgame: {
        title: "SET Logic",
        homeBasic: "Logical processing",
        homeHard: "Adds fill dimension",
        guide: {
            play: `<div class="space-y-4"><p class="text-slate-600 font-medium text-sm">Find 3 cards where each property is either <span class="text-indigo-600 font-bold">all the same</span> or <span class="text-indigo-600 font-bold">all different</span>.</p><div class="bg-indigo-50/50 p-2 rounded-xl border border-indigo-100/50 text-[10px] text-slate-500">Colors and shapes are both checked. Three circles in three different colors can still be valid.</div></div>`,
            playHard: `<div class="space-y-4"><p class="text-slate-600 font-medium text-[11px]">Advanced mode also checks <span class="text-green-600 font-bold">fill level</span>.</p><div class="bg-green-50 p-3 rounded-2xl border border-green-100 text-[10px] text-green-700">A valid set must satisfy the same/all-different rule across every active property.</div></div>`
        }
    },
    neuroncount: {
        title: "Neuron Counting",
        homeBasic: "Target count: circles",
        homeHard: "More distractions",
        guide: {
            play: `<div class="space-y-4"><p class="text-slate-600 font-medium text-sm">Count every target shape on the screen, then submit the number.</p><div class="bg-slate-50 p-4 rounded-3xl flex flex-col items-center border"><p class="text-[10px] text-slate-400">Count carefully before using the plus and minus buttons.</p></div></div>`,
            playHard: `<p class="text-slate-600 font-medium text-sm">Advanced mode adds more similar distractors and moving items.</p>`
        }
    }
};

const COLOR_LABELS = [
    { key: 'red', zh: '红', en: 'Red', val: '#EF4444' },
    { key: 'blue', zh: '蓝', en: 'Blue', val: '#3B82F6' },
    { key: 'green', zh: '绿', en: 'Green', val: '#10B981' },
    { key: 'yellow', zh: '黄', en: 'Yellow', val: '#F59E0B' }
];

const RETENTION_STORAGE_KEY = 'prefrontal_lab_retention_v1';
const RETENTION_VISITOR_KEY = 'prefrontal_lab_visitor_id';
const OWNER_ACCESS_KEY = 'prefrontal_lab_owner_access';
const OWNER_TOKEN_KEY = 'prefrontal_lab_owner_token';
const DAILY_STORAGE_KEY = 'prefrontal_lab_daily_v4';
const CLOUD_ANALYTICS_ENDPOINT = window.PFL_ANALYTICS_ENDPOINT || '/api/retention';
const GAME_CLICK_LABELS = {
    daily: 'Daily Challenge',
    arena: 'Cognitive Arena',
    schulte: 'Schulte Grid',
    stroop: 'Stroop Test',
    setgame: 'SET Logic',
    nback: 'N-Back Memory',
    neuroncount: 'Neuron Counting'
};

const DAILY_CHALLENGES = [
    {
        id: 'schulte-forward',
        task: 'schulte',
        variant: 'forward',
        completion: 'finish-grid',
        duration: 90,
        ruleLabel: { zh: '完成目标', en: 'Goal clear' },
        theme: {
            zh: { title: '视觉闪电', subtitle: '在数字网格里快速锁定目标。', goal: '按 1 到 25 的顺序完成舒尔特方格。' },
            en: { title: 'Visual Lightning', subtitle: 'Lock onto targets inside the number grid.', goal: 'Clear the Schulte grid from 1 to 25.' }
        }
    },
    {
        id: 'schulte-reverse',
        task: 'schulte',
        variant: 'reverse',
        completion: 'finish-grid',
        duration: 90,
        ruleLabel: { zh: '完成目标', en: 'Goal clear' },
        theme: {
            zh: { title: '倒序雷达', subtitle: '反向扫描数字，打破自动化顺序。', goal: '按 25 到 1 的顺序完成舒尔特方格。' },
            en: { title: 'Reverse Radar', subtitle: 'Scan numbers backward and break the default order.', goal: 'Clear the Schulte grid from 25 to 1.' }
        }
    },
    {
        id: 'stroop-color',
        task: 'stroop',
        variant: 'color-conflict',
        completion: 'timed-score',
        duration: 60,
        ruleLabel: { zh: '60 秒限时', en: '60s timed' },
        theme: {
            zh: { title: '颜色逆转日', subtitle: '压住本能阅读冲动，只相信颜色。', goal: '在 60 秒内完成颜色抑制挑战。' },
            en: { title: 'Color Override', subtitle: 'Suppress the reading impulse and trust the color.', goal: 'Complete a 60-second color inhibition challenge.' }
        }
    },
    {
        id: 'nback-2step',
        task: 'nback',
        variant: 'two-back',
        completion: 'timed-score',
        duration: 60,
        ruleLabel: { zh: '60 秒限时', en: '60s timed' },
        theme: {
            zh: { title: '记忆回路', subtitle: '持续刷新脑中的暂存信息。', goal: '完成 2-Back 工作记忆挑战。' },
            en: { title: 'Memory Loop', subtitle: 'Keep refreshing the sequence in working memory.', goal: 'Complete a 2-back working-memory challenge.' }
        }
    },
    {
        id: 'set-triad',
        task: 'setgame',
        variant: 'triad',
        completion: 'timed-score',
        duration: 60,
        ruleLabel: { zh: '60 秒限时', en: '60s timed' },
        theme: {
            zh: { title: '逻辑校准', subtitle: '在相同与不同之间找出隐藏结构。', goal: '完成进阶 SET 逻辑挑战。' },
            en: { title: 'Logic Calibration', subtitle: 'Find the hidden structure across same and different.', goal: 'Complete an advanced SET logic challenge.' }
        }
    },
    {
        id: 'neuron-storm',
        task: 'neuroncount',
        variant: 'storm',
        completion: 'timed-score',
        duration: 60,
        ruleLabel: { zh: '60 秒限时', en: '60s timed' },
        theme: {
            zh: { title: '神经风暴', subtitle: '在移动干扰中保持精确计数。', goal: '完成高干扰神经元计数挑战。' },
            en: { title: 'Neural Storm', subtitle: 'Keep counting precisely through moving distractions.', goal: 'Complete a high-distraction counting challenge.' }
        }
    }
];

const getDayKey = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getDailyChallengeIndex = (day) => {
    const weekday = new Date(`${day}T00:00:00`).getDay();
    return (weekday + 6) % 7;
};

const getDailySpec = (day = getDayKey()) => {
    const challengeIndex = getDailyChallengeIndex(day);
    const challenge = DAILY_CHALLENGES[challengeIndex % DAILY_CHALLENGES.length];
    return {
        instanceId: `daily-${day}`,
        day,
        challengeIndex,
        ...challenge,
        level: 'daily'
    };
};

const getVisitorId = () => {
    let visitorId = localStorage.getItem(RETENTION_VISITOR_KEY);
    if (!visitorId) {
        const randomPart = window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        visitorId = `pfl-${randomPart}`;
        localStorage.setItem(RETENTION_VISITOR_KEY, visitorId);
    }
    return visitorId;
};

const readRetentionData = () => {
    const visitorId = getVisitorId();
    const now = new Date();
    const fallback = {
        visitorId,
        firstSeen: now.toISOString(),
        lastSeen: now.toISOString(),
        activeDays: [],
        visitsByDay: {},
        sessions: [],
        events: []
    };

    try {
        const stored = JSON.parse(localStorage.getItem(RETENTION_STORAGE_KEY) || 'null');
        if (!stored) return fallback;
        return {
            ...fallback,
            ...stored,
            visitorId,
            activeDays: Array.isArray(stored.activeDays) ? stored.activeDays : [],
            visitsByDay: stored.visitsByDay || {},
            sessions: Array.isArray(stored.sessions) ? stored.sessions : [],
            events: Array.isArray(stored.events) ? stored.events : []
        };
    } catch (error) {
        return fallback;
    }
};

const writeRetentionData = (data) => {
    localStorage.setItem(RETENTION_STORAGE_KEY, JSON.stringify(data));
};

const readDailyProgress = () => {
    const fallback = { days: {}, updatedAt: new Date().toISOString() };
    try {
        const stored = JSON.parse(localStorage.getItem(DAILY_STORAGE_KEY) || 'null');
        if (!stored) return fallback;
        return {
            ...fallback,
            ...stored,
            days: stored.days || {}
        };
    } catch (error) {
        return fallback;
    }
};

const writeDailyProgress = (data) => {
    localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(data));
};

const getDailyStreak = (days, today = getDayKey()) => {
    const completedDays = new Set(
        Object.entries(days || {})
            .filter(([, value]) => value?.completed)
            .map(([day]) => day)
    );
    let streak = 0;
    const cursor = new Date(`${today}T00:00:00`);
    while (completedDays.has(getDayKey(cursor))) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
};

const getWeeklyDailyDays = (days, today = getDayKey()) => {
    const completedDays = new Set(
        Object.entries(days || {})
            .filter(([, value]) => value?.completed)
            .map(([day]) => day)
    );
    const todayDate = new Date(`${today}T00:00:00`);
    const monday = new Date(todayDate);
    const mondayOffset = (todayDate.getDay() + 6) % 7;
    monday.setDate(todayDate.getDate() - mondayOffset);

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);
        const day = getDayKey(date);
        return {
            day,
            weekday: index,
            completed: completedDays.has(day),
            isToday: day === today
        };
    });
};

const trackRetentionEvent = (eventName, payload = {}) => {
    const now = new Date();
    const day = getDayKey(now);
    const data = readRetentionData();
    const activeDays = Array.from(new Set([...data.activeDays, day])).sort();
    const events = [
        ...data.events,
        {
            name: eventName,
            at: now.toISOString(),
            day,
            path: window.location.pathname,
            ...payload
        }
    ].slice(-500);

    const nextData = {
        ...data,
        lastSeen: now.toISOString(),
        activeDays,
        visitsByDay: {
            ...data.visitsByDay,
            [day]: eventName === 'session_start' ? (data.visitsByDay[day] || 0) + 1 : (data.visitsByDay[day] || 0)
        },
        sessions: eventName === 'session_start'
            ? [
                ...data.sessions,
                {
                    id: payload.sessionId,
                    startedAt: now.toISOString(),
                    day,
                    source: payload.source || 'direct'
                }
            ].slice(-120)
            : data.sessions,
        events
    };

    writeRetentionData(nextData);
    sendCloudRetentionEvent(eventName, nextData.visitorId, nextData.firstSeen, payload);
    return nextData;
};

const sendCloudRetentionEvent = (eventName, visitorId, firstSeen, payload = {}) => {
    if (!CLOUD_ANALYTICS_ENDPOINT || !window.fetch) return;

    const now = new Date();
    const body = {
        name: eventName,
        visitorId,
        firstSeen,
        at: now.toISOString(),
        day: getDayKey(now),
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: {
            width: window.screen?.width,
            height: window.screen?.height
        },
        ...payload
    };

    fetch(`${CLOUD_ANALYTICS_ENDPOINT}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true
    }).catch(() => {});
};

const getDaysBetween = (startDay, endDay) => {
    const start = new Date(`${startDay}T00:00:00`);
    const end = new Date(`${endDay}T00:00:00`);
    return Math.round((end - start) / 86400000);
};

const getStreak = (activeDays, today = getDayKey()) => {
    const activeSet = new Set(activeDays);
    let streak = 0;
    const cursor = new Date(`${today}T00:00:00`);
    while (activeSet.has(getDayKey(cursor))) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
};

const buildRetentionSummary = (data) => {
    const activeDays = [...new Set(data.activeDays || [])].sort();
    const firstDay = activeDays[0] || getDayKey();
    const today = getDayKey();
    const gaps = activeDays.slice(1).map((day, index) => getDaysBetween(activeDays[index], day)).filter(gap => gap > 0);
    const completions = (data.events || []).filter(event => event.name === 'game_complete');
    const starts = (data.events || []).filter(event => event.name === 'game_start');
    const clicks = (data.events || []).filter(event => event.name === 'click' && event.clickRole === 'game_card');
    const taskCounts = completions.reduce((acc, event) => {
        const task = event.task || 'arena';
        acc[task] = (acc[task] || 0) + 1;
        return acc;
    }, {});
    const topTask = Object.entries(taskCounts).sort((a, b) => b[1] - a[1])[0];
    const clickCounts = clicks.reduce((acc, event) => {
        const label = event.clickLabel || event.clickRole || 'Unknown';
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});
    const topClicks = Object.entries(clickCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([label, count]) => ({ label, count }));
    const last7Days = Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - index));
        const day = getDayKey(date);
        return { day, visits: data.visitsByDay?.[day] || 0, active: activeDays.includes(day) };
    });

    return {
        firstDay,
        activeDays,
        totalVisits: Object.values(data.visitsByDay || {}).reduce((sum, count) => sum + count, 0),
        totalSessions: data.sessions?.length || 0,
        totalStarts: starts.length,
        totalCompletions: completions.length,
        completionRate: starts.length ? Math.round((completions.length / starts.length) * 100) : 0,
        currentStreak: getStreak(activeDays, today),
        averageReturnGap: gaps.length ? (gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length).toFixed(1) : '-',
        d1: activeDays.includes(getDayKey(new Date(new Date(`${firstDay}T00:00:00`).getTime() + 86400000))),
        d7: activeDays.includes(getDayKey(new Date(new Date(`${firstDay}T00:00:00`).getTime() + 7 * 86400000))),
        d30: activeDays.includes(getDayKey(new Date(new Date(`${firstDay}T00:00:00`).getTime() + 30 * 86400000))),
        topTask: topTask ? topTask[0] : '-',
        topTaskCount: topTask ? topTask[1] : 0,
        totalClicks: clicks.length,
        topClicks,
        last7Days
    };
};

function App() {
    const DEFAULT_TASK_BESTS = { schulte: 0, stroop: 0, nback: 0, setgame: 0, neuroncount: 0 };
    const urlParams = new URLSearchParams(window.location.search);
    const [isOwner, setIsOwner] = useState(() => {
        if (urlParams.get('owner') === '1') {
            localStorage.setItem(OWNER_ACCESS_KEY, 'true');
            return true;
        }
        if (urlParams.get('owner') === '0') {
            localStorage.removeItem(OWNER_ACCESS_KEY);
            return false;
        }
        return localStorage.getItem(OWNER_ACCESS_KEY) === 'true';
    });
    const [view, setView] = useState(() => (urlParams.has('analytics') && (urlParams.get('owner') === '1' || localStorage.getItem(OWNER_ACCESS_KEY) === 'true')) ? 'analytics' : 'home');
    const [mode, setMode] = useState('normal');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [lastScore, setLastScore] = useState(0);
    const [isError, setIsError] = useState(false);
    const [answerFeedback, setAnswerFeedback] = useState(null);
    const [showInfo, setShowInfo] = useState(null);
    const [lang, setLang] = useState(() => localStorage.getItem('prefrontal_lab_lang') || 'zh');
    const [retentionData, setRetentionData] = useState(() => readRetentionData());
    const [dailyProgress, setDailyProgress] = useState(() => readDailyProgress());
    const [cloudSummary, setCloudSummary] = useState(null);
    const [cloudStatus, setCloudStatus] = useState('idle');
    const [ownerToken, setOwnerToken] = useState(() => localStorage.getItem(OWNER_TOKEN_KEY) || '');
    const [showSettings, setShowSettings] = useState(false);
    const ui = UI_TEXT[lang];
    const isEnglish = lang === 'en';
    const isGameView = !['home', 'result', 'analytics'].includes(view);
    const isDailyMode = mode === 'daily';
    const isInfiniteMode = mode === 'infinite';
    const isChallengeDifficulty = mode === 'hard' || mode === 'comp' || isDailyMode;
    const dailySpec = getDailySpec();
    const dailyRecord = dailyProgress.days?.[dailySpec.day] || {};
    const dailyStreak = getDailyStreak(dailyProgress.days, dailySpec.day);
    const dailyWeekDays = getWeeklyDailyDays(dailyProgress.days, dailySpec.day);
    const dailyCompletedCount = Object.values(dailyProgress.days || {}).filter(day => day?.completed).length;
    const dailyTheme = dailySpec.theme?.[lang] || dailySpec.theme?.en;
    const dailyRuleLabel = dailySpec.ruleLabel?.[lang] || (dailySpec.completion === 'finish-grid' ? ui.dailyGoalFinish : ui.dailyGoalTimed);
    const dailyDurationLabel = `${dailySpec.duration || 60}s`;
    const dailyWeekLabels = isEnglish ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'] : ['一', '二', '三', '四', '五', '六', '日'];
    const localRetentionSummary = buildRetentionSummary(retentionData);
    const retentionSummary = cloudSummary || localRetentionSummary;
    const analyticsText = isEnglish
        ? {
            title: 'Retention Analyzer',
            subtitle: 'Local prototype for return visits and training completion.',
            back: 'Back',
            reset: 'Reset test data',
            export: 'Export',
            cloud: 'Cloud data',
            local: 'Local test data',
            password: 'Owner password',
            loadCloud: 'Load cloud',
            wrongPassword: 'Cloud data needs your owner password.',
            users: 'Users',
            clicks: 'Game clicks',
            topClicks: 'Top games',
            noClicks: 'No game clicks yet',
            firstSeen: 'First seen',
            activeDays: 'Active days',
            visits: 'Visits',
            streak: 'Current streak',
            avgGap: 'Avg return gap',
            completion: 'Completion',
            topTask: 'Top return task',
            d1: 'D1',
            d7: 'D7',
            d30: 'D30',
            last7: 'Last 7 days',
            starts: 'Starts',
            completes: 'Completes',
            days: 'days'
        }
        : {
            title: '留存分析',
            subtitle: '本地测试版：看同一设备是否回来、多久回来、回来后完成了什么训练。',
            back: '返回',
            reset: '清空测试数据',
            export: '导出',
            cloud: '云端数据',
            local: '本地测试数据',
            password: 'Owner 密码',
            loadCloud: '读取云端',
            wrongPassword: '云端数据需要你的 owner 密码。',
            users: '用户数',
            clicks: '游戏点击',
            topClicks: '最常点击的游戏',
            noClicks: '还没有游戏点击数据',
            firstSeen: '首次访问',
            activeDays: '活跃天数',
            visits: '访问次数',
            streak: '连续回访',
            avgGap: '平均间隔',
            completion: '完成率',
            topTask: '最常完成',
            d1: '次日',
            d7: '7日',
            d30: '30日',
            last7: '近7天',
            starts: '开始',
            completes: '完成',
            days: '天'
        };

    const setLanguage = (nextLang) => {
        localStorage.setItem('prefrontal_lab_lang', nextLang);
        setLang(nextLang);
        setShowSettings(false);
    };

    const refreshRetention = () => setRetentionData(readRetentionData());

    const recordRetention = (eventName, payload = {}) => {
        const nextData = trackRetentionEvent(eventName, payload);
        setRetentionData(nextData);
        return nextData;
    };

    const resetRetentionData = () => {
        localStorage.removeItem(RETENTION_STORAGE_KEY);
        const fresh = readRetentionData();
        writeRetentionData(fresh);
        setRetentionData(fresh);
    };

    const lockOwnerAccess = () => {
        localStorage.removeItem(OWNER_ACCESS_KEY);
        localStorage.removeItem(OWNER_TOKEN_KEY);
        setIsOwner(false);
        setOwnerToken('');
        setCloudSummary(null);
        setCloudStatus('idle');
        setView('home');
    };

    const exportRetentionData = async () => {
        const payload = JSON.stringify(cloudSummary || readRetentionData(), null, 2);
        try {
            await navigator.clipboard.writeText(payload);
        } catch (error) {
            const blob = new Blob([payload], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `prefrontal-retention-${getDayKey()}.json`;
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    const loadCloudRetentionSummary = async (token = ownerToken) => {
        if (!token) {
            setCloudStatus('locked');
            return;
        }

        setCloudStatus('loading');
        try {
            const response = await fetch(`${CLOUD_ANALYTICS_ENDPOINT}/summary`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 401 || response.status === 403) {
                setCloudStatus('locked');
                setCloudSummary(null);
                return;
            }

            if (!response.ok) throw new Error(`Cloud summary failed: ${response.status}`);

            const data = await response.json();
            setCloudSummary(data.summary);
            setCloudStatus('ready');
            localStorage.setItem(OWNER_TOKEN_KEY, token);
        } catch (error) {
            setCloudStatus('local');
            setCloudSummary(null);
        }
    };

    const getTaskTitle = (type) => isEnglish ? TASK_TRANSLATIONS[type]?.title || TASK_DATA[type].en : TASK_DATA[type].title;
    const getTaskHome = (type, hardMode) => (
        isEnglish
            ? TASK_TRANSLATIONS[type]?.[hardMode ? 'homeHard' : 'homeBasic']
            : TASK_DATA[type][hardMode ? 'homeHard' : 'homeBasic']
    );
    const getTaskGuide = (type) => {
        if (!isEnglish) {
            return isChallengeDifficulty
                ? (TASK_DATA[type].guide.playHard || TASK_DATA[type].guide.play)
                : TASK_DATA[type].guide.play;
        }

        const guide = TASK_TRANSLATIONS[type]?.guide;
        return isChallengeDifficulty ? (guide?.playHard || guide?.play) : guide?.play;
    };

    // --- 数据迁移逻辑：确保 1.0 数据同步到 5.0 ---
    const [history, setHistory] = useState(() => {
        const v1DataRaw = localStorage.getItem('brain_train_pro_data');
        const v2DataRaw = localStorage.getItem('brain_train_pro_v5');

        let base = { bestScore: 0, bestCompScore: 0, isHardUnlocked: false, taskBestScores: DEFAULT_TASK_BESTS };

        // 如果有 2.0 数据，直接用
        if (v2DataRaw) {
            const v2 = JSON.parse(v2DataRaw);
            return {
                ...base,
                ...v2,
                taskBestScores: { ...DEFAULT_TASK_BESTS, ...(v2.taskBestScores || {}) }
            };
        }

        // 如果没有 2.0 但有 1.0 数据，进行搬运
        if (v1DataRaw) {
            const v1 = JSON.parse(v1DataRaw);
            base.bestScore = v1.bestScore || 0;
            base.isHardUnlocked = v1.isHardUnlocked || false;
        }
        return base;
    });

    // ==========================================
    // ✨ 在这里插入：更新公告状态管理
    // ==========================================
    const [showUpdateNote, setShowUpdateNote] = useState(() => {
        // 检查本地存储，如果这个版本的 Key 不存在，说明是第一次见，返回 true
        const shouldPreviewUpdate = new URLSearchParams(window.location.search).has('showUpdate');
        return shouldPreviewUpdate || !localStorage.getItem('prefrontal_lab_v6.1.2_update');
    });

    const closeUpdateNote = () => {
        // 玩家点击按钮后，在本地存入 'true'，下次刷新就不会再弹了
        localStorage.setItem('prefrontal_lab_v6.1.2_update', 'true');
        setShowUpdateNote(false);
    };

    const goHomeMode = (nextMode) => {
        if (nextMode === 'hard' && !history.isHardUnlocked) return;
        setMode(nextMode);
        setView('home');
    };

    const navItems = [
        {
            key: 'train',
            label: ui.navTrain,
            icon: 'dumbbell',
            active: view === 'home' && mode !== 'comp' && mode !== 'daily',
            onClick: () => goHomeMode((mode === 'comp' || mode === 'daily') ? 'normal' : mode)
        },
        {
            key: 'daily',
            label: ui.navDaily,
            icon: 'calendar-check',
            active: view === 'home' && mode === 'daily',
            onClick: () => goHomeMode('daily')
        },
        {
            key: 'arena',
            label: ui.navArena,
            icon: 'swords',
            active: view === 'home' && mode === 'comp',
            onClick: () => goHomeMode('comp')
        },
        ...(isOwner ? [{
            key: 'analytics',
            label: ui.navAnalytics,
            icon: 'chart-no-axes-combined',
            active: view === 'analytics',
            onClick: () => { refreshRetention(); setView('analytics'); }
        }] : [])
    ];

    const renderSettingsControl = (className = '') => (
        <div className={`settings-control ${className}`}>
            <button
                type="button"
                onClick={() => setShowSettings(prev => !prev)}
                className="settings-toggle"
                aria-label={ui.settings}
                aria-expanded={showSettings}
            >
                <Icon name="settings" className="w-5 h-5" />
            </button>
            {showSettings && (
                <div className="settings-menu">
                    <div className="settings-menu-title">
                        <Icon name="settings" className="w-4 h-4" />
                        <span>{ui.settings}</span>
                    </div>
                    <div className="settings-menu-section">
                        <div className="settings-row-label">{ui.settingsLanguage}</div>
                        <div className="settings-language-group">
                            {[
                                { key: 'zh', label: '中文' },
                                { key: 'en', label: 'EN' }
                            ].map(option => (
                                <button
                                    key={option.key}
                                    type="button"
                                    onClick={() => setLanguage(option.key)}
                                    className={`settings-language-option ${lang === option.key ? 'is-active' : ''}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="settings-sync-row">
                        <Icon name="cloud" className="w-4 h-4" />
                        <span>{ui.settingsData}</span>
                        <strong>{ui.settingsSoon}</strong>
                    </div>
                </div>
            )}
        </div>
    );

    useEffect(() => {
        document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
        document.title = isEnglish ? 'Prefrontal Lab 6.1.2' : '前额叶实验室 6.1.2';
    }, [isEnglish]);

    useEffect(() => {
        recordRetention('session_start', {
            sessionId: sessionIdRef.current,
            source: document.referrer ? 'referral' : 'direct'
        });

        const markSessionEnd = () => {
            trackRetentionEvent('session_end', { sessionId: sessionIdRef.current });
        };

        window.addEventListener('pagehide', markSessionEnd);
        return () => {
            markSessionEnd();
            window.removeEventListener('pagehide', markSessionEnd);
        };
    }, []);

    useEffect(() => {
        recordRetention('view_change', { view });
        if (view === 'analytics' && isOwner) {
            loadCloudRetentionSummary();
        }
    }, [view]);

    useEffect(() => {
        if (view !== 'home') return undefined;

        const handleTrackedClick = (event) => {
            const taskCard = event.target?.closest?.('.task-card[data-analytics-task]');
            if (!taskCard) return;
            if (event.target?.closest?.('button, a, .info-button, .analytics-open, .settings-control')) return;

            const task = taskCard.dataset.analyticsTask;
            const clickLabel = taskCard.dataset.analyticsLabel || GAME_CLICK_LABELS[task] || task || 'Unknown game';
            const rect = taskCard.getBoundingClientRect();

            recordRetention('click', {
                sessionId: sessionIdRef.current,
                view,
                mode,
                task,
                clickLabel,
                clickRole: 'game_card',
                clickX: Math.round(event.clientX),
                clickY: Math.round(event.clientY),
                clickXPercent: rect.width ? Math.round(((event.clientX - rect.left) / rect.width) * 100) : null,
                clickYPercent: rect.height ? Math.round(((event.clientY - rect.top) / rect.height) * 100) : null
            });
        };

        document.addEventListener('click', handleTrackedClick, true);
        return () => document.removeEventListener('click', handleTrackedClick, true);
    }, [view, mode]);
    // ==========================================

    const TASK_DATA = {

        schulte: {
            title: "舒尔特方格", en: "Schulte Grid", icon: "grid", color: "text-blue-500", time: 60,
            homeBasic: "专注力与视觉宽度", homeHard: "盲点模式 (不显示已选)",
            guide: {
                goal: "提升视觉搜索效率与专注力",
                play: `
        <div class="space-y-4">
            <p class="text-slate-600 font-medium text-sm">按照数字 <span class="text-blue-600 font-bold">1 至 25</span> 的顺序，依次点击方格中的数字。</p>
            <div class="flex justify-center items-center gap-2 py-2">
                <div class="w-10 h-10 border-2 border-blue-500 rounded-xl flex items-center justify-center font-bold text-blue-600 bg-blue-50">1</div>
                <span class="text-slate-400">→</span>
                <div class="w-10 h-10 border-2 border-slate-200 rounded-xl flex items-center justify-center font-bold text-slate-400">2</div>
                <span class="text-slate-400">→</span>
                <div class="w-10 h-10 border-2 border-slate-200 rounded-xl flex items-center justify-center font-bold text-slate-400">3</div>
            </div>
            <div class="bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50 text-[11px] text-slate-500">
                💡 <span class="font-bold">秘诀：</span>尽量保持视线中心在网格中央，利用<span class="font-bold text-blue-600">余光</span>捕捉周围数字。
            </div>
        </div>`,
                playHard: `
        <div class="space-y-4">
            <p class="text-slate-600 font-medium text-sm"><span class="text-amber-600 font-bold">⚠️ 进阶规则：</span>点过的数字会<span class="text-amber-600 font-bold">立即消失</span>。</p>
            <div class="bg-amber-50 p-4 rounded-3xl border border-amber-100 text-[11px] text-amber-700 leading-relaxed">
                这是“盲点”挑战。你需要记住哪些位置已经点过了，避免在空位上浪费视觉搜索时间！
            </div>
        </div>`
            },
            effect: "增强视觉广度及快速信息处理能力。"
        },
        stroop: {
            title: "Stroop 干扰", en: "Stroop Test", icon: "palette", color: "text-rose-500", time: 60,
            homeBasic: "认知抑制控制", homeHard: "双重语义冲突",
            guide: {
                goal: "练习抑制本能反应的冲动",
                play: `
        <div class="space-y-4">
            <p class="text-slate-600 font-medium text-sm">忽略文字含义，点击与文字 <span class="text-rose-600 font-bold">物理颜色</span> 相符的按钮。</p>
            <div class="bg-slate-50 p-4 rounded-3xl flex flex-col items-center border border-slate-100">
                <span class="text-2xl font-black text-blue-500 mb-2">红 色</span>
                <div class="flex gap-2">
                    <div class="px-4 py-1.5 bg-rose-500 text-white text-[10px] font-bold rounded-full">点击红色 (❌)</div>
                    <div class="px-4 py-1.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">点击蓝色 (✅)</div>
                </div>
            </div>
            <div class="bg-rose-50/50 p-3 rounded-2xl border border-rose-100/50 text-[11px] text-slate-500">
                💡 <span class="font-bold text-rose-600">注意：</span>你的大脑会下意识想读字，请强制关注颜色本身！
            </div>
        </div>`,
                playHard: `
        <div class="space-y-4">
            <p class="text-slate-600 font-medium text-sm"><span class="text-rose-600 font-bold">⚠️ 进阶规则：</span>色块消失！改为点击对应的 <span class="text-rose-600 font-bold">文字内容</span>。</p>
            <div class="bg-rose-50 p-4 rounded-3xl border border-rose-100 text-[11px] text-rose-700 leading-relaxed">
                例：看到蓝色的“红”字，你必须在下方按钮中找出写着<span class="font-bold underline">“蓝”</span>字的那个。
            </div>
        </div>`
            },
            effect: "锻炼反应抑制和选择性注意力。"
        },
        nback: {
            title: "N-Back 记忆", en: "N-Back Task", icon: "brain", color: "text-indigo-500", time: 60,
            homeBasic: "1-Back模式", homeHard: "2-Back 双重难度",
            guide: {
                goal: "训练大脑不断更新暂存信息的能力",
                play: `
        <div class="space-y-4">
            <p class="text-slate-600 font-medium text-sm">判断当前数字，是否与 <span class="text-indigo-600 font-bold">前1步</span> 出现的数字相同。</p>
            <div class="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex items-center justify-center gap-4">
                <div class="flex flex-col items-center gap-1 opacity-40">
                    <div class="w-10 h-10 bg-white border rounded-xl flex items-center justify-center font-black">7</div>
                    <span class="text-[8px] font-bold">前1步</span>
                </div>
                <div class="text-indigo-400 font-black animate-pulse">＝?</div>
                <div class="flex flex-col items-center gap-1">
                    <div class="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-black text-white shadow-lg">7</div>
                    <span class="text-[8px] font-bold text-indigo-600">当前</span>
                </div>
            </div>
            <div class="font-mono tracking-widest text-center py-1 bg-white rounded-lg border border-slate-100 text-[11px]">
                2 → 5 → <span class="bg-green-100 px-1 rounded text-green-700 font-bold">5</span>(点!)
            </div>
        </div>`,
                playHard: `
        <div class="space-y-4">
            <p class="text-slate-600 font-medium text-sm">判断当前数字，是否与 <span class="text-purple-600 font-bold">前第 2 步</span> 相同。</p>
            <div class="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex justify-between items-center px-2">
                <div class="flex flex-col items-center gap-1">
                    <div class="w-9 h-9 bg-purple-500 rounded-lg flex items-center justify-center font-black text-white">4</div>
                    <span class="text-[8px] font-bold text-purple-600">对比项</span>
                </div>
                <div class="w-4 h-[1px] bg-slate-200"></div>
                <div class="opacity-20 flex flex-col items-center gap-1">
                    <div class="w-9 h-9 bg-white border rounded-lg flex items-center justify-center font-black">9</div>
                    <span class="text-[8px]">跳过</span>
                </div>
                <div class="w-4 h-[1px] bg-slate-200"></div>
                <div class="flex flex-col items-center gap-1">
                    <div class="w-9 h-9 bg-purple-500 rounded-lg flex items-center justify-center font-black text-white ring-4 ring-purple-100">4</div>
                    <span class="text-[8px] font-bold text-purple-600">当前</span>
                </div>
            </div>
            <p class="text-[10px] text-center text-slate-400">间隔一个数字，相同即点！</p>
        </div>`
            },
            effect: "提升流体智力和工作记忆容量。"
        },
        setgame: {
            title: "SET 逻辑", en: "Set Logic", icon: "shapes", color: "text-green-500", time: 60,
            homeBasic: "逻辑处理", homeHard: "增加填充度维度",
            guide: {
                goal: "识别属性的全同与全异",
                play: `
        <div class="space-y-4">
            <p class="text-slate-600 font-medium text-sm">找出 3 张牌，使它们的 <span class="text-indigo-600 font-bold">颜色</span> 和 <span class="text-indigo-600 font-bold">形状</span> 满足：</p>
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-slate-50 p-3 rounded-2xl flex flex-col items-center border">
                    <div class="flex gap-1 mb-1"><div class="w-2.5 h-2.5 rounded-full bg-indigo-500"></div><div class="w-2.5 h-2.5 rounded-full bg-indigo-500"></div><div class="w-2.5 h-2.5 rounded-full bg-indigo-500"></div></div>
                    <span class="text-[9px] font-bold text-slate-500 uppercase">全部相同</span>
                </div>
                <div class="bg-slate-50 p-3 rounded-2xl flex flex-col items-center border">
                    <div class="flex gap-1 mb-1"><div class="w-2.5 h-2.5 rounded-full bg-red-400"></div><div class="w-2.5 h-2.5 rounded-full bg-blue-400"></div><div class="w-2.5 h-2.5 rounded-full bg-green-400"></div></div>
                    <span class="text-[9px] font-bold text-slate-500 uppercase">全部不同</span>
                </div>
            </div>
            <div class="bg-indigo-50/50 p-2 rounded-xl border border-indigo-100/50 text-[10px] text-slate-500">
                💡 即使形状完全一样（三个圆），只要颜色互不相同（红/蓝/绿），也成立！
            </div>
        </div>`,
                playHard: `
        <div class="space-y-4">
            <p class="text-slate-600 font-medium text-[11px]">进阶模式下，<span class="text-green-600 font-bold">填充度</span> 也必须符合全同或全异原则。</p>
            <div class="bg-green-50 p-3 rounded-2xl border border-green-100 flex justify-center gap-2">
                <div class="w-6 h-6 rounded bg-green-500"></div>
                <div class="w-6 h-6 rounded bg-green-500 opacity-30"></div>
                <div class="w-6 h-6 rounded bg-green-500 opacity-10"></div>
            </div>
            <p class="text-[10px] text-center text-slate-400 tracking-tight">↑ 比如透明度“红/浅红/淡红”互不相同，成立 ✅</p>
        </div>`
            },
            effect: "提升前额叶的并行逻辑处理能力。"
        },
        //5/11新加入
        neuroncount: {
            title: "神经元计数", en: "Neuron Counting", icon: "binary", color: "text-amber-500", time: 60,
            homeBasic: "目标计数：圆圈", homeHard: "干扰物增加",
            guide: {
                goal: "在干扰中精确统计目标数量",
                play: `
    <div class="space-y-4">
        <p class="text-slate-600 font-medium text-sm">数出屏幕中 <span class="text-amber-600 font-bold">所有圆圈</span> 的数量。</p>
        <div class="bg-slate-50 p-4 rounded-3xl flex flex-col items-center border">
            <div class="flex gap-2 mb-3">
                <div class="w-6 h-6 rounded-full bg-amber-500"></div>
                <div class="w-6 h-6 bg-slate-300"></div>
                <div class="w-6 h-6 rounded-full bg-amber-500"></div>
            </div>
            <p class="text-[10px] text-slate-400">默数到 2，然后点击按钮 2 次</p>
        </div>
    </div>`,
                playHard: `<p class="text-slate-600 font-medium text-sm">目标与干扰项形状极其相似，且数量大幅增加。</p>`
            }
        },

    };

    const [schulte, setSchulte] = useState({ grid: [], next: 1 });
    const [stroop, setStroop] = useState({ text: '', color: '', opts: [] });
    const [nback, setNback] = useState({ current: null, isMatch: false, isReady: false });
    const [setGame, setSetGame] = useState({ cards: [], selected: [] });
    const [neuronCount, setNeuronCount] = useState({ items: [], target: {}, targetCount: 0, currentCount: 0 });
    const nbackSeq = useRef([]);
    const feedbackTimer = useRef(null);
    const neuronMoveTimer = useRef(null);
    const answerLock = useRef(false);
    const sessionIdRef = useRef(`session-${Date.now()}-${Math.random().toString(16).slice(2)}`);
    const currentRunRef = useRef(null);

    const getFeedback = (s) => {
        return RESULT_TEXT[lang].find(item => s <= item.max);
    };

    const initGameCore = (type) => {
        const isHard = isChallengeDifficulty;
        if (type === 'schulte') {
            const nums = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
            const sequence = currentRunRef.current?.dailyVariant === 'reverse'
                ? Array.from({ length: 25 }, (_, i) => 25 - i)
                : Array.from({ length: 25 }, (_, i) => i + 1);
            setSchulte({ grid: nums, sequence, index: 0, next: sequence[0] });
        } else if (type === 'stroop') {
            const colors = COLOR_LABELS;
            const t = Math.floor(Math.random() * 4);
            let c; do { c = Math.floor(Math.random() * 4); } while (c === t);
            setStroop({
                roundId: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                textZh: colors[t].zh,
                textEn: colors[t].en,
                color: colors[c].val,
                opts: [...colors].sort(() => Math.random() - 0.5)
            });
        } else if (type === 'nback') {
            const level = isHard ? 2 : 1;
            const round = createNbackRound(nbackSeq.current, level);
            nbackSeq.current.push(round.current);
            setNback(round);
            // 在 initGameCore 的 setgame 分支中修改：
        } else if (type === 'setgame') {
            const shapes = ['circle', 'square', 'triangle'];
            const colors = ['#EF4444', '#3B82F6', '#10B981'];
            const isHard = isChallengeDifficulty;

            // 逻辑判定：0代表全同，1代表全异
            const logic = {
                color: Math.floor(Math.random() * 2),
                shape: Math.floor(Math.random() * 2),
                fill: isHard ? Math.floor(Math.random() * 2) : 0 // 基础模式强制全同
            };

            // 强制至少有一个属性是“全异”，否则三张牌长得一模一样
            if (Object.values(logic).every(v => v === 0)) logic.shape = 1;

            // 1. 生成正确解 (3张)
            let solution = [];
            for (let i = 0; i < 3; i++) {
                solution.push({
                    color: logic.color === 0 ? colors[0] : colors[i],
                    shape: logic.shape === 0 ? shapes[0] : shapes[i],
                    // 只有 true (全色) 和 false (半透)
                    fill: logic.fill === 0 ? true : (i === 0 ? true : false) // 这里注意：两个分类无法实现“全异”，只能实现“全同”
                });
            }

            /** 
             * 逻辑修正：如果只有两个分类（全色/半透），在 3 张牌的情况下：
             * - “全同”是可以实现的（全是实心 或 全是半透）。
             * - “全异”逻辑上无法实现（因为只有两类，三张牌必有重复）。
             * 因此，填充度的逻辑将自动退化为：必须全同。
             **/
            if (logic.fill === 1 && isHard) {
                // 如果随机到了“全异”逻辑，由于只有两类，我们强制让解在填充度上“全同”但其他维度“全异”
                solution.forEach(s => s.fill = Math.random() > 0.5);
            }

            // 2. 生成干扰项 (6张)
            const fillers = Array.from({ length: 6 }, () => ({
                shape: shapes[Math.floor(Math.random() * 3)],
                color: colors[Math.floor(Math.random() * 3)],
                fill: isHard ? Math.random() > 0.5 : true
            }));

            const finalCards = [...solution, ...fillers]
                .sort(() => Math.random() - 0.5)
                .map((card, i) => ({ ...card, id: i }));

            setSetGame({ cards: finalCards, selected: [], successIds: [] });
        } else if (type === 'neuroncount') {
            const isHard = isChallengeDifficulty;
            const shapes = ['circle', 'square', 'triangle'];
            const colors = ['bg-amber-500', 'bg-blue-500', 'bg-rose-500', 'bg-green-500', 'bg-purple-500'];

            const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
            const targetColor = colors[Math.floor(Math.random() * colors.length)];

            const targetCount = isHard ? Math.floor(Math.random() * 6) + 7 : Math.floor(Math.random() * 4) + 4;
            const distractorCount = isHard ? Math.floor(Math.random() * 12) + 12 : Math.floor(Math.random() * 8) + 6;

            let items = [];
            for (let i = 0; i < targetCount; i++) {
                items.push({ id: `t_${i}`, shape: targetShape, color: targetColor, isTarget: true });
            }
            for (let i = 0; i < distractorCount; i++) {
                let dShape, dColor;
                do {
                    dShape = shapes[Math.floor(Math.random() * shapes.length)];
                    dColor = colors[Math.floor(Math.random() * colors.length)];
                } while (dShape === targetShape && dColor === targetColor);
                items.push({ id: `d_${i}`, shape: dShape, color: dColor, isTarget: false });
            }

            items = items.sort(() => Math.random() - 0.5);

            const columns = isHard ? 5 : 4;
            const rows = Math.ceil(items.length / columns);
            const positions = items.map((_, index) => {
                const col = index % columns;
                const row = Math.floor(index / columns);
                const cellW = 100 / columns;
                const cellH = 100 / rows;
                const jitterX = (Math.random() - 0.5) * Math.min(7, cellW * 0.35);
                const jitterY = (Math.random() - 0.5) * Math.min(6, cellH * 0.35);
                return {
                    x: Math.min(92, Math.max(8, (col + 0.5) * cellW + jitterX)),
                    y: Math.min(90, Math.max(10, (row + 0.5) * cellH + jitterY)),
                };
            }).sort(() => Math.random() - 0.5);

            const moverCount = Math.min(isHard ? 3 : 0, items.length);
            const moverIndexes = new Set(
                [...items.keys()]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, moverCount)
            );

            items = items.map((item, index) => ({
                ...item,
                x: positions[index].x,
                y: positions[index].y,
                rotate: isHard ? Math.floor(Math.random() * 360) : 0,
                scale: isHard ? (Math.random() * 0.5 + 0.7) : 1,
                popDelay: items.length > 1 ? (index / (items.length - 1)) * 1.6 : 0,
                isMover: moverIndexes.has(index)
            }));

            setNeuronCount({ items, target: { shape: targetShape, color: targetColor }, targetCount, currentCount: 0 });
        }
    };

    const switchArenaTask = () => {
        const tasks = ['schulte', 'stroop', 'setgame', 'neuroncount', 'nback'];
        const next = tasks[Math.floor(Math.random() * tasks.length)];
        initGameCore(next);
        setView(next);
    };

    const startChallenge = (type) => {
        clearAnswerFeedback();
        setScore(0);
        nbackSeq.current = [];
        const activeDailySpec = getDailySpec();
        const taskType = mode === 'daily' ? activeDailySpec.task : type;
        const taskName = mode === 'comp' ? 'arena' : mode === 'daily' ? 'daily' : taskType;
        currentRunRef.current = {
            task: taskName,
            dailyChallengeId: mode === 'daily' ? activeDailySpec.id : null,
            dailyInstanceId: mode === 'daily' ? activeDailySpec.instanceId : null,
            dailyTask: mode === 'daily' ? taskType : null,
            dailyDay: mode === 'daily' ? activeDailySpec.day : null,
            dailyVariant: mode === 'daily' ? activeDailySpec.variant : null,
            dailyCompletion: mode === 'daily' ? activeDailySpec.completion : null,
            dailyDuration: mode === 'daily' ? activeDailySpec.duration : null,
            mode,
            startedAt: new Date().toISOString()
        };
        recordRetention('game_start', {
            sessionId: sessionIdRef.current,
            task: taskName,
            mode,
            dailyChallengeId: mode === 'daily' ? activeDailySpec.id : null,
            dailyInstanceId: mode === 'daily' ? activeDailySpec.instanceId : null,
            dailyTask: mode === 'daily' ? taskType : null,
            dailyDay: mode === 'daily' ? activeDailySpec.day : null,
            dailyVariant: mode === 'daily' ? activeDailySpec.variant : null,
            dailyCompletion: mode === 'daily' ? activeDailySpec.completion : null,
            dailyDuration: mode === 'daily' ? activeDailySpec.duration : null
        });
        if (mode === 'comp') {
            setTimeLeft(90);
            switchArenaTask();
        } else if (mode === 'daily') {
            setTimeLeft(activeDailySpec.duration || TASK_DATA[taskType].time);
            initGameCore(taskType);
            setView(taskType);
        } else if (mode === 'infinite') {
            setTimeLeft(-1);
            initGameCore(taskType);
            setView(taskType);
        } else {
            setTimeLeft(TASK_DATA[taskType].time);
            initGameCore(taskType);
            setView(taskType);
        }
    };

    const handleArenaError = ({ flash = true } = {}) => {
        if (flash) {
            setIsError(true);
            setTimeout(() => setIsError(false), 400);
        }
        if (mode === 'comp') setTimeLeft(prev => Math.max(0, prev - 5));
    };

    const clearAnswerFeedback = () => {
        if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
        feedbackTimer.current = null;
        answerLock.current = false;
        setAnswerFeedback(null);
    };

    const finishAnswerFeedback = (nextType, shouldAdvance) => {
        setAnswerFeedback(null);
        answerLock.current = false;
        feedbackTimer.current = null;
        if (!shouldAdvance) return;
        mode === 'comp' ? switchArenaTask() : initGameCore(nextType);
    };

    const getAnswerFeedbackPosition = (event) => {
        if (!event?.currentTarget) return { x: window.innerWidth / 2, y: 96, side: 'top' };

        const rect = event.currentTarget.getBoundingClientRect();
        const gap = 10;
        const centerX = rect.left + rect.width / 2;

        return {
            x: Math.min(window.innerWidth - 60, Math.max(60, centerX)),
            y: rect.top - gap,
            side: 'top'
        };
    };

    const getCenteredFeedbackPosition = (element) => {
        const rect = element?.getBoundingClientRect();
        if (!rect) return { x: window.innerWidth / 2, y: 96, side: 'top' };

        return {
            x: rect.left + rect.width / 2,
            y: rect.top - 12,
            side: 'top'
        };
    };

    const showAnswerFeedback = ({ correct, points = 0, penalty = 0, showPenalty = false, nextType, target, advance = true, event, position, flashError = true, duration }) => {
        if (answerLock.current) return;
        answerLock.current = true;

        if (correct) {
            setScore(s => s + points);
        } else {
            if (penalty > 0) setScore(s => Math.max(0, s - penalty));
            handleArenaError({ flash: flashError });
        }

        setAnswerFeedback({ status: correct ? 'correct' : 'wrong', points, penalty, showPenalty, target, ...(position || getAnswerFeedbackPosition(event)) });
        if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
        feedbackTimer.current = setTimeout(() => finishAnswerFeedback(nextType, advance), duration || (correct ? 360 : 300));
    };

    const handleNbackAnswer = (answerIsMatch, event) => {
        if (!nback.isReady) {
            initGameCore('nback');
            return;
        }
        const isCorrect = answerIsMatch === nback.isMatch;
        showAnswerFeedback({
            correct: isCorrect,
            points: 30,
            penalty: 10,
            nextType: 'nback',
            target: answerIsMatch ? 'match' : 'different',
            advance: true,
            event,
            flashError: false
        });
    };

    const getNeuronDistance = (a, b) => {
        const dx = a.x - b.x;
        const dy = (a.y - b.y) * 1.45;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const hasNeuronCollision = (candidate, items, movingId) => (
        items.some(other => other.id !== movingId && getNeuronDistance(candidate, other) < 12)
    );

    const moveNeuronDistractors = () => {
        setNeuronCount(prev => {
            const nextItems = prev.items.map(item => ({ ...item }));

            nextItems.forEach(item => {
                if (!item.isMover) return item;

                for (let attempt = 0; attempt < 12; attempt++) {
                    const deltaX = (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 22);
                    const deltaY = (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 22);
                    const candidate = {
                        x: Math.min(90, Math.max(10, item.x + deltaX)),
                        y: Math.min(88, Math.max(12, item.y + deltaY)),
                    };

                    if (!hasNeuronCollision(candidate, nextItems, item.id)) {
                        item.x = candidate.x;
                        item.y = candidate.y;
                        return item;
                    }
                }

                return item;
            });

            return { ...prev, items: nextItems };
        });
    };

    const endGame = (finalScoreOverride) => {
        clearAnswerFeedback();
        const currentFinalScore = typeof finalScoreOverride === 'number' ? finalScoreOverride : score;
        setLastScore(currentFinalScore);

        const isComp = mode === 'comp';
        const isDaily = mode === 'daily';
        const isInfinite = mode === 'infinite';
        const completedTask = currentRunRef.current?.task || (isComp ? 'arena' : view);
        recordRetention('game_complete', {
            sessionId: sessionIdRef.current,
            task: completedTask,
            mode,
            score: currentFinalScore,
            dailyChallengeId: currentRunRef.current?.dailyChallengeId || null,
            dailyInstanceId: currentRunRef.current?.dailyInstanceId || null,
            dailyTask: currentRunRef.current?.dailyTask || null,
            dailyDay: currentRunRef.current?.dailyDay || null,
            dailyVariant: currentRunRef.current?.dailyVariant || null,
            dailyCompletion: currentRunRef.current?.dailyCompletion || null,
            dailyDuration: currentRunRef.current?.dailyDuration || null,
            durationSeconds: currentRunRef.current?.startedAt
                ? Math.max(0, Math.round((Date.now() - new Date(currentRunRef.current.startedAt).getTime()) / 1000))
                : null
        });

        if (isDaily) {
            const day = currentRunRef.current?.dailyDay || getDayKey();
            const dailyTask = currentRunRef.current?.dailyTask || view;
            setDailyProgress(prev => {
                const dayRecord = prev.days?.[day] || {};
                const nextData = {
                    ...prev,
                    updatedAt: new Date().toISOString(),
                    days: {
                        ...(prev.days || {}),
                        [day]: {
                            ...dayRecord,
                            completed: true,
                            challengeId: currentRunRef.current?.dailyChallengeId || null,
                            instanceId: currentRunRef.current?.dailyInstanceId || null,
                            variant: currentRunRef.current?.dailyVariant || null,
                            completion: currentRunRef.current?.dailyCompletion || null,
                            duration: currentRunRef.current?.dailyDuration || null,
                            task: dailyTask,
                            bestScore: Math.max(dayRecord.bestScore || 0, currentFinalScore),
                            lastScore: currentFinalScore,
                            completedAt: new Date().toISOString()
                        }
                    }
                };
                writeDailyProgress(nextData);
                return nextData;
            });
        }
        currentRunRef.current = null;

        setHistory(prev => {
            // 计算新的最高分
            const newBestScore = (isComp || isDaily || isInfinite) ? prev.bestScore : Math.max(prev.bestScore, currentFinalScore);
            const newBestCompScore = isComp ? Math.max(prev.bestCompScore || 0, currentFinalScore) : (prev.bestCompScore || 0);
            const taskBestScores = { ...DEFAULT_TASK_BESTS, ...(prev.taskBestScores || {}) };
            if (!isComp && !isDaily && !isInfinite && Object.prototype.hasOwnProperty.call(DEFAULT_TASK_BESTS, view)) {
                taskBestScores[view] = Math.max(taskBestScores[view] || 0, currentFinalScore);
            }

            // 核心修复：解锁条件必须基于【更新后】的最高分，或者已经是解锁状态
            const hasReachedThreshold = newBestScore >= 500;
            const updatedUnlockStatus = prev.isHardUnlocked || hasReachedThreshold;

            const newHist = {
                        ...prev,
                        bestScore: newBestScore,
                        bestCompScore: newBestCompScore,
                        taskBestScores,
                        isHardUnlocked: updatedUnlockStatus
                    };

            localStorage.setItem('brain_train_pro_v5', JSON.stringify(newHist));
            return newHist;
        });

        setView('result');
        setTimeLeft(0);
    };

    useEffect(() => {
        return () => {
            if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
            if (neuronMoveTimer.current) clearInterval(neuronMoveTimer.current);
        };
    }, []);

    useEffect(() => {
        if (neuronMoveTimer.current) {
            clearInterval(neuronMoveTimer.current);
            neuronMoveTimer.current = null;
        }

        if (view !== 'neuroncount') return undefined;

        const startDelay = setTimeout(() => {
            moveNeuronDistractors();
            neuronMoveTimer.current = setInterval(moveNeuronDistractors, 2000);
        }, 2200);

        return () => {
            clearTimeout(startDelay);
            if (neuronMoveTimer.current) {
                clearInterval(neuronMoveTimer.current);
                neuronMoveTimer.current = null;
            }
        };
    }, [view]);

    useEffect(() => {
        let timer;
        if (isGameView && !isInfiniteMode && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && isGameView && !isInfiniteMode) {
            endGame();
        }
        return () => clearInterval(timer);
    }, [timeLeft, view, isInfiniteMode]);

    return (
        <div className={`app-shell h-full flex flex-col relative overflow-hidden transition-colors duration-200 ${isError ? 'arena-flash' : 'bg-slate-50'} text-slate-900 select-none`}>

            {answerFeedback && (
                <div
                    className={`pointer-events-none fixed z-[80] feedback-pop-${answerFeedback.side || 'top'}`}
                    style={{ left: answerFeedback.x, top: answerFeedback.y }}
                >
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-xl text-white text-sm font-black whitespace-nowrap ${answerFeedback.status === 'correct' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                        <Icon name={answerFeedback.status === 'correct' ? 'check' : 'x'} className="w-5 h-5" />
                        <span>{answerFeedback.status === 'correct' ? `+${answerFeedback.points}` : (answerFeedback.showPenalty && answerFeedback.penalty > 0 ? `-${answerFeedback.penalty}` : ui.retry)}</span>
                    </div>
                </div>
            )}

            {showSettings && (
                <button
                    type="button"
                    className="settings-scrim"
                    aria-label="Close settings"
                    onClick={() => setShowSettings(false)}
                />
            )}

            {(view === 'home' || view === 'analytics') && (
                <nav className="app-nav" aria-label="Primary navigation">
                    <div className="app-nav-brand">
                        <div className="app-nav-logo">
                            <Icon name="brain-circuit" className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <div className="app-nav-title">{ui.appTitle}</div>
                            <div className="app-nav-subtitle">Prefrontal Lab</div>
                        </div>
                    </div>
                    <div className="app-nav-items">
                        {navItems.map(item => (
                            <button
                                key={item.key}
                                onClick={item.onClick}
                                disabled={item.disabled}
                                className={`app-nav-button is-${item.key} ${item.active ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''}`}
                            >
                                <Icon name={item.icon} className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                    {renderSettingsControl('app-nav-settings')}
                </nav>
            )}

            {view === 'home' && (
                <div className="home-screen app-content-screen p-6 pt-10 flex flex-col items-center h-full overflow-y-auto no-scrollbar relative">
                    {renderSettingsControl('home-settings-control')}
                    <div className="home-mini-brand hidden w-full max-w-sm items-center gap-2 shrink-0">
                        <div className="w-9 h-9 bg-indigo-600 text-white rounded-xl shadow-md flex items-center justify-center shrink-0">
                            <Icon name="brain-circuit" className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm font-black text-slate-800 leading-tight truncate">{ui.appTitle}</div>
                            <div className="text-[8px] font-bold text-slate-400 brand-text leading-tight">Prefrontal Lab</div>
                        </div>
                    </div>
                    <div className="home-header text-center mb-8 shrink-0">
                        <div className="home-logo inline-flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-xl"><Icon name="brain-circuit" /></div>
                        <h1 className="home-title text-2xl font-black text-slate-800 mt-4 mb-0.5">{ui.appTitle}</h1>
                        <div className="text-[10px] font-bold text-slate-400 brand-text">Prefrontal Lab</div>
                    </div>

                    <div className={`score-card mode-score-card w-full max-w-sm p-6 rounded-[2.2rem] mb-6 flex justify-between items-end relative overflow-hidden shrink-0 ${mode === 'daily' ? 'daily-score-card' : `text-white ${mode === 'comp' ? 'is-arena bg-amber-500' : mode === 'infinite' ? 'is-infinite bg-sky-500' : 'is-train bg-indigo-600'}`}`}>
                        {mode === 'daily' ? (
                            <div className="daily-score-summary z-10 w-full">
                                <div className="daily-best-block">
                                    <div className="text-[10px] opacity-70 font-bold uppercase tracking-widest">{ui.dailyBest}</div>
                                    <div className="score-value text-4xl font-black">{dailyRecord.bestScore || 0}</div>
                                </div>
                                <div className={`daily-score-streak ${dailyStreak > 0 ? 'is-lit' : ''}`}>
                                    <div className="daily-score-flame">
                                        <Icon name="flame" className={`w-5 h-5 ${dailyStreak > 0 ? 'is-solid-flame' : ''}`} />
                                    </div>
                                    <div>
                                        <div className="daily-score-streak-label">{ui.dailyStreak}</div>
                                        <div className="daily-score-streak-value">{dailyStreak}<span>{ui.dailyDays}</span></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="z-10">
                                    <div className="text-[10px] opacity-60 font-bold uppercase tracking-widest">{mode === 'infinite' ? ui.infiniteScore : ui.bestSynced}</div>
                                    <div className="score-value text-4xl font-black">{mode === 'comp' ? (history.bestCompScore || 0) : mode === 'infinite' ? '∞' : (history.bestScore || 0)}</div>
                                </div>
                                <div className="unlock-pill z-10 text-[10px] font-bold bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                                    {mode === 'infinite' ? ui.infinitePill : history.isHardUnlocked ? "🔓 Advanced On" : "🔒 500 Unlock"}
                                </div>
                            </>
                        )}
                        <div className="score-watermark absolute top-[-20px] right-[-20px] opacity-10 rotate-12"><Icon name="brain" className="w-32 h-32" /></div>
                    </div>

                    {mode !== 'daily' && mode !== 'comp' && (
                        <div className="mode-tabs flex w-full max-w-sm bg-slate-200 p-1 rounded-2xl mb-8 shrink-0">
                            {['normal', 'hard', 'infinite'].map(m => {
                                // 增加一个判定：如果是 hard 模式且没解锁，该按钮不可点（或者点不动）
                                const isLocked = m === 'hard' && !history.isHardUnlocked;

                                return (
                                    <button
                                        key={m}
                                        onClick={() => {
                                            if (isLocked) return; // 拦截点击
                                            setMode(m);
                                        }}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-bold transition-all 
                                    ${isLocked ? 'opacity-30 cursor-not-allowed' : ''} 
                                    ${mode === m ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                                    >
                                        {m === 'normal' ? ui.normal : m === 'infinite' ? ui.infinite : (isLocked ? ui.hardLocked : ui.hard)}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <div className="task-section w-full max-w-sm mb-12 shrink-0">
                        {mode === 'daily' ? (
                            <div
                                data-analytics-task="daily"
                                data-analytics-label={GAME_CLICK_LABELS.daily}
                                className="daily-challenge-card bg-white rounded-[1.8rem] border-2 border-emerald-100 shadow-md overflow-hidden"
                            >
                                <div className="daily-card-hero p-5 text-white relative overflow-hidden">
                                    <div className="relative z-10 flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="text-[10px] font-black brand-text opacity-75">{ui.dailyTitle}</div>
                                            <div className="mt-1 text-2xl font-black leading-tight">{dailyTheme.title}</div>
                                            <div className="mt-1 text-xs font-extrabold opacity-95 leading-relaxed">{dailyTheme.subtitle}</div>
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur">
                                            <Icon name={TASK_DATA[dailySpec.task].icon} className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="absolute -right-8 -bottom-10 opacity-15">
                                        <Icon name="calendar-check" className="w-32 h-32" />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="daily-total-row">
                                        <div className="daily-total-icon">
                                            <Icon name="badge-check" className="w-4 h-4" />
                                        </div>
                                        <span>{ui.dailyCompleted}</span>
                                        <strong>{dailyCompletedCount}</strong>
                                    </div>

                                    <div className="daily-goal-box">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                                <Icon name="target" className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-[10px] font-black text-emerald-600 brand-text">{ui.dailyToday}</div>
                                                <div className="text-sm font-black text-slate-800 leading-tight">{getTaskTitle(dailySpec.task)}</div>
                                                <div className="text-[11px] font-extrabold text-slate-600 mt-1">{dailyTheme.goal || ui.dailyGoal}</div>
                                                <div className="daily-rule-row">
                                                    <span><Icon name={dailySpec.completion === 'finish-grid' ? 'target' : 'timer'} className="w-3.5 h-3.5" />{dailyRuleLabel}</span>
                                                    <span><Icon name="clock-3" className="w-3.5 h-3.5" />{dailyDurationLabel}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`daily-status-pill ${dailyRecord.completed ? 'is-complete' : ''}`}>
                                            {dailyRecord.completed ? ui.dailyDone : ui.dailyCheckIn}
                                        </div>
                                    </div>

                                    <div className="daily-week-panel">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-[10px] font-black text-slate-400 brand-text">{ui.dailyWeek}</div>
                                            <div className="text-[10px] font-bold text-slate-400">{ui.dailyReward}</div>
                                        </div>
                                        <div className="daily-week-row">
                                            {dailyWeekDays.map(day => (
                                                <div key={day.day} className="daily-week-item">
                                                    <div className={`daily-week-dot ${day.completed ? 'is-complete' : ''} ${day.isToday ? 'is-today' : ''}`}>
                                                        {day.completed ? <Icon name="check" className="w-3.5 h-3.5" /> : ''}
                                                    </div>
                                                    <div className="daily-week-label">{dailyWeekLabels[day.weekday]}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        className={`daily-start-button ${dailyRecord.completed ? 'is-secondary' : ''}`}
                                        type="button"
                                        onClick={() => startChallenge(dailySpec.task)}
                                    >
                                        <Icon name={dailyRecord.completed ? 'rotate-cw' : 'play'} className="w-4 h-4" />
                                        {dailyRecord.completed ? ui.dailyReplay : ui.dailyStart}
                                    </button>
                                </div>
                            </div>
                        ) : mode === 'comp' ? (
                            <div
                                onClick={() => startChallenge()}
                                data-analytics-task="arena"
                                data-analytics-label={GAME_CLICK_LABELS.arena}
                                style={{ boxShadow: '0 16px 36px rgba(245, 158, 11, 0.06)' }}
                                className="task-card arena-task-card flex items-center p-5 bg-white rounded-[1.8rem] shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                            >
                                <div className="task-icon arena-task-icon w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-amber-50 text-amber-500">
                                    <Icon name="zap" className="w-7 h-7" />
                                </div>
                                <div className="task-copy flex-1">
                                    <div className="task-title font-bold text-lg text-slate-800">{ui.arenaTitle}</div>
                                    <div className="task-subtitle text-[11px] text-slate-500 font-medium">{ui.arenaSubtitle}</div>
                                </div>
                                <div className="arena-side-icon">
                                    <Icon name="swords" className="w-5 h-5" />
                                </div>
                            </div>
                        ) : (
                            <div className="task-list grid gap-3">
                                {Object.keys(TASK_DATA).map(type => (
                                    <div
                                        key={type}
                                        onClick={() => startChallenge(type)}
                                        data-analytics-task={type}
                                        data-analytics-label={GAME_CLICK_LABELS[type] || getTaskTitle(type)}
                                        className="task-card flex items-center p-5 bg-white rounded-[1.8rem] border border-slate-100 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                                    >
                                        <div className="flex items-center flex-1">
                                            <div className={`task-icon w-10 h-10 rounded-xl flex items-center justify-center mr-4 bg-slate-50 ${TASK_DATA[type].color}`}>
                                                <Icon name={TASK_DATA[type].icon} />
                                            </div>
                                            <div className="task-copy">
                                                <div className="task-title font-bold text-base text-slate-800">{getTaskTitle(type)}</div>
                                                <div className="task-subtitle text-[11px] text-slate-500 font-medium">{getTaskHome(type, mode === 'hard')}</div>
                                            </div>
                                        </div>
                                        <button onClick={(event) => { event.stopPropagation(); setShowInfo(type); }} className="info-button p-2 ml-1 text-slate-300"><Icon name="info" className="w-5 h-5" /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {view === 'analytics' && isOwner && (
                <div className="analytics-screen app-content-screen h-full overflow-y-auto no-scrollbar bg-slate-50 px-5 py-5">
                    <div className="w-full max-w-md mx-auto">
                        <div className="flex items-center justify-between mb-5">
                            <button
                                onClick={() => setView('home')}
                                className="w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-500 shadow-sm flex items-center justify-center"
                                aria-label={analyticsText.back}
                            >
                                <Icon name="chevron-left" className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={exportRetentionData}
                                    className="w-10 h-10 rounded-2xl bg-white border border-slate-100 text-indigo-600 shadow-sm flex items-center justify-center"
                                    aria-label={analyticsText.export}
                                >
                                    <Icon name="download" className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={resetRetentionData}
                                    className="w-10 h-10 rounded-2xl bg-white border border-slate-100 text-rose-500 shadow-sm flex items-center justify-center"
                                    aria-label={analyticsText.reset}
                                >
                                    <Icon name="trash-2" className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={lockOwnerAccess}
                                    className="w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-500 shadow-sm flex items-center justify-center"
                                    aria-label="Lock analytics"
                                >
                                    <Icon name="lock" className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-lg flex items-center justify-center mb-4">
                                <Icon name="chart-no-axes-combined" className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 leading-tight">{analyticsText.title}</h2>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2 max-w-sm">{analyticsText.subtitle}</p>
                            <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full text-[10px] font-black ${cloudSummary ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                                <Icon name={cloudSummary ? 'cloud' : 'hard-drive'} className="w-3.5 h-3.5" />
                                {cloudSummary ? analyticsText.cloud : analyticsText.local}
                            </div>
                            {!cloudSummary && (
                                <div className="mt-4 bg-white rounded-2xl border border-slate-100 p-3 shadow-sm">
                                    <div className="flex gap-2">
                                        <input
                                            value={ownerToken}
                                            onChange={(event) => setOwnerToken(event.target.value)}
                                            type="password"
                                            placeholder={analyticsText.password}
                                            className="min-w-0 flex-1 h-11 rounded-xl bg-slate-50 border border-slate-100 px-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-200"
                                        />
                                        <button
                                            onClick={() => loadCloudRetentionSummary(ownerToken)}
                                            className="h-11 px-4 rounded-xl bg-slate-900 text-white text-xs font-black"
                                        >
                                            {cloudStatus === 'loading' ? '...' : analyticsText.loadCloud}
                                        </button>
                                    </div>
                                    {cloudStatus === 'locked' && (
                                        <div className="text-[10px] font-bold text-rose-500 mt-2">{analyticsText.wrongPassword}</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="analytics-card bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 brand-text">{analyticsText.users}</div>
                                <div className="text-3xl font-black text-slate-900 mt-1">{retentionSummary.totalUsers || 1}</div>
                            </div>
                            <div className="analytics-card bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 brand-text">{analyticsText.visits}</div>
                                <div className="text-3xl font-black text-slate-900 mt-1">{retentionSummary.totalVisits}</div>
                            </div>
                            <div className="analytics-card bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 brand-text">{analyticsText.clicks}</div>
                                <div className="text-3xl font-black text-rose-500 mt-1">{retentionSummary.totalClicks || 0}</div>
                            </div>
                            <div className="analytics-card bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 brand-text">{analyticsText.activeDays}</div>
                                <div className="text-3xl font-black text-indigo-600 mt-1">{retentionSummary.activeDays.length}</div>
                            </div>
                            <div className="analytics-card bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 brand-text">{analyticsText.streak}</div>
                                <div className="text-3xl font-black text-emerald-600 mt-1">{retentionSummary.currentStreak}</div>
                            </div>
                            <div className="analytics-card bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 brand-text">{analyticsText.avgGap}</div>
                                <div className="text-3xl font-black text-amber-500 mt-1">{retentionSummary.averageReturnGap}</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm mb-3">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 brand-text">{analyticsText.firstSeen}</div>
                                    <div className="text-sm font-black text-slate-800 mt-1">{retentionSummary.firstDay}</div>
                                </div>
                                <div className="flex gap-2">
                                    {[
                                        { label: retentionSummary.d1Value ? `${analyticsText.d1} ${retentionSummary.d1Value}` : analyticsText.d1, active: retentionSummary.d1 },
                                        { label: retentionSummary.d7Value ? `${analyticsText.d7} ${retentionSummary.d7Value}` : analyticsText.d7, active: retentionSummary.d7 },
                                        { label: retentionSummary.d30Value ? `${analyticsText.d30} ${retentionSummary.d30Value}` : analyticsText.d30, active: retentionSummary.d30 }
                                    ].map(item => (
                                        <div key={item.label} className={`px-3 py-2 rounded-xl text-[10px] font-black ${item.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-2 h-20 items-end">
                                {retentionSummary.last7Days.map(day => (
                                    <div key={day.day} className="flex flex-col items-center gap-2 h-full justify-end">
                                        <div
                                            className={`w-full rounded-t-lg ${day.active ? 'bg-indigo-600' : 'bg-slate-200'}`}
                                            style={{ height: `${day.active ? Math.min(100, 28 + day.visits * 18) : 14}%` }}
                                        />
                                        <div className="text-[9px] font-bold text-slate-400">{day.day.slice(5).replace('-', '/')}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-[10px] font-black text-slate-400 brand-text mt-3">{analyticsText.last7}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pb-6">
                            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 brand-text">{analyticsText.completion}</div>
                                <div className="text-3xl font-black text-slate-900 mt-1">{retentionSummary.completionRate}%</div>
                                <div className="text-[10px] font-bold text-slate-400 mt-2">
                                    {analyticsText.starts} {retentionSummary.totalStarts} / {analyticsText.completes} {retentionSummary.totalCompletions}
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 brand-text">{analyticsText.topTask}</div>
                                <div className="text-lg font-black text-slate-900 mt-2 truncate">{retentionSummary.topTask}</div>
                                <div className="text-[10px] font-bold text-slate-400 mt-2">{retentionSummary.topTaskCount} {analyticsText.completes}</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-[10px] font-black text-slate-400 brand-text">{analyticsText.topClicks}</div>
                                <div className="text-[10px] font-black text-rose-400">{retentionSummary.totalClicks || 0}</div>
                            </div>
                            <div className="space-y-2">
                                {(retentionSummary.topClicks || []).length ? retentionSummary.topClicks.map((item, index) => (
                                    <div key={`${item.label}-${index}`} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
                                        <div className="min-w-0 flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-white text-slate-400 text-[10px] font-black flex items-center justify-center border border-slate-100">{index + 1}</div>
                                            <div className="truncate text-xs font-black text-slate-700">{item.label}</div>
                                        </div>
                                        <div className="text-xs font-black text-rose-500 shrink-0">{item.count}</div>
                                    </div>
                                )) : (
                                    <div className="rounded-xl bg-slate-50 px-3 py-3 text-xs font-bold text-slate-400">{analyticsText.noClicks}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 更新说明弹窗 */}
            {showUpdateNote && view !== 'analytics' && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-xl bg-slate-900/60 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-pop-center relative overflow-hidden">
                        {/* 背景装饰图层 */}
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Icon name="wrench" className="w-20 h-20" />
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Icon name="rocket" className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-slate-800">{ui.updateTitle}</h2>
                                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{ui.updateVersion}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            {UPDATE_LINES[lang].map((text, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{text}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={closeUpdateNote}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
                        >
                            {ui.updateButton}
                        </button>
                    </div>
                </div>
            )}

            {showInfo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40" onClick={() => setShowInfo(null)}>
                    <div className="bg-white w-full max-w-xs rounded-[2.8rem] p-8 relative animate-pop-center" onClick={e => e.stopPropagation()}>
                        <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 ${TASK_DATA[showInfo].color}`}><Icon name={TASK_DATA[showInfo].icon} className="w-7 h-7" /></div>
                        <h2 className="text-xl font-black mb-1">{getTaskTitle(showInfo)}</h2>
                        <div className="text-[9px] font-bold text-slate-400 brand-text mb-6">{isEnglish ? ui.moduleLabel : TASK_DATA[showInfo].en}</div>
                        <div className="text-xs text-slate-600 leading-relaxed font-medium mb-8"><LatexFmt text={getTaskGuide(showInfo)} /></div>
                        <button onClick={() => { startChallenge(showInfo); setShowInfo(null); }} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg">{ui.startTraining}</button>
                    </div>
                </div>
            )}

            {isGameView && (
                <div className="game-screen flex-1 flex flex-col">
                    <div className="game-topbar h-14 px-4 flex-shrink-0 grid grid-cols-[1fr_auto_1fr] items-center bg-white border-b border-slate-100">
                        <div className="flex justify-start">
                            <button onClick={() => {
                                clearAnswerFeedback();
                                if (mode === 'infinite') {
                                    endGame(score);
                                    return;
                                }
                                if (currentRunRef.current) {
                                    recordRetention('game_abandon', {
                                        sessionId: sessionIdRef.current,
                                        task: currentRunRef.current.task,
                                        mode,
                                        dailyChallengeId: currentRunRef.current.dailyChallengeId || null,
                                        dailyInstanceId: currentRunRef.current.dailyInstanceId || null,
                                        dailyTask: currentRunRef.current.dailyTask || null,
                                        dailyDay: currentRunRef.current.dailyDay || null,
                                        dailyVariant: currentRunRef.current.dailyVariant || null,
                                        dailyCompletion: currentRunRef.current.dailyCompletion || null,
                                        dailyDuration: currentRunRef.current.dailyDuration || null
                                    });
                                    currentRunRef.current = null;
                                }
                                setView('home');
                            }} className="p-2 text-slate-400"><Icon name="chevron-left" /></button>
                        </div>
                        <div className="text-center">
                            <div className={`text-[9px] font-black brand-text ${mode === 'daily' ? 'text-emerald-500' : mode === 'infinite' ? 'text-sky-500' : 'text-indigo-500'}`}>{mode === 'comp' ? ui.arenaMode : mode === 'daily' ? ui.dailyTitle : mode === 'infinite' ? ui.infiniteMode : ui.training}</div>
                            <div className="text-sm font-bold">{mode === 'comp' ? ui.arenaShortTitle : getTaskTitle(view)}</div>
                            {mode !== 'comp' && mode !== 'daily' && mode !== 'infinite' && TASK_DATA[view] && (
                                <div className="text-[9px] font-black text-slate-400 font-mono">{ui.taskBest} {history.taskBestScores?.[view] || 0}</div>
                            )}
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <div className={`text-xs font-mono font-bold px-2 py-1 rounded ${isError ? 'bg-red-500 text-white' : 'bg-slate-100'}`}>{mode === 'infinite' ? '∞' : `${timeLeft}s`}</div>
                            <div className="font-mono text-xl font-black text-indigo-600">{score}</div>
                        </div>
                    </div>
                    <div className="game-stage flex-1 flex items-center justify-center p-6">
                        {view === 'schulte' && (
                            <div className="grid grid-cols-5 gap-1.5 w-full max-w-sm aspect-square">
                                {schulte.grid.map(n => {
                                    // 核心逻辑：判断当前格子的状态
                                    const schulteSequence = schulte.sequence || Array.from({ length: 25 }, (_, i) => i + 1);
                                    const currentIndex = schulte.index || 0;
                                    const clickedNumbers = new Set(schulteSequence.slice(0, currentIndex));
                                    const isClicked = clickedNumbers.has(n); // 是否已经点过了
                                    const isHardMode = isChallengeDifficulty; // 是否是进阶或挑战模式

                                    return (
                                        <button
                                            key={n}
                                            onClick={() => {
                                                // 只有点击“下一个正确数字”时才触发逻辑
                                                if (n === schulte.next) {
                                                    if (currentIndex >= schulteSequence.length - 1) {
                                                        const finalScore = mode === 'infinite' ? score + 10 : score + 10 + (timeLeft * 10);
                                                        setScore(finalScore);
                                                        mode === 'comp' ? switchArenaTask() : mode === 'infinite' ? initGameCore('schulte') : endGame(finalScore);
                                                    } else {
                                                        setSchulte(p => {
                                                            const sequence = p.sequence || Array.from({ length: 25 }, (_, i) => i + 1);
                                                            const nextIndex = (p.index || 0) + 1;
                                                            return { ...p, index: nextIndex, next: sequence[nextIndex] };
                                                        });
                                                        setScore(s => s + 10);
                                                    }
                                                } else {
                                                    handleArenaError(); // 点错了闪红光
                                                }
                                            }}
                                            className={`flex items-center justify-center font-bold text-lg rounded-lg border transition-all 
    ${(isClicked && (mode === 'hard' || mode === 'daily')) // 竞技不使用盲点，Daily 使用进阶变体
                                                    ? 'bg-white text-slate-900 border-slate-100 shadow-sm' // 只有进阶模式是“盲点”
                                                    : (isClicked
                                                        ? 'bg-indigo-600 text-white opacity-20 border-transparent' // 竞技和基础模式：点过变蓝透明
                                                        : 'bg-white text-slate-900 border-slate-100 shadow-sm'
                                                    )
                                                }`}
                                        >
                                            {n}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                        {view === 'stroop' && (
                            <div className="flex flex-col items-center space-y-12 w-full">
                                <div className="text-7xl font-black" style={{ color: stroop.color }}>{isEnglish ? stroop.textEn : stroop.textZh}</div>
                                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                                    {stroop.opts.map(o => (
                                        <button key={`${stroop.roundId || 'stroop'}-${o.val}`} disabled={!!answerFeedback} onClick={(event) => {
                                            const isCorrect = o.val === stroop.color;
                                            showAnswerFeedback({
                                                correct: isCorrect,
                                                points: 30,
                                                nextType: 'stroop',
                                                target: o.val,
                                                advance: isCorrect,
                                                event,
                                                flashError: false
                                            });
                                        }} className={`stroop-choice-button ${answerFeedback?.target === o.val ? (answerFeedback.status === 'correct' ? 'is-correct' : 'is-wrong') : ''}`}>{answerFeedback?.target === o.val && answerFeedback.status === 'correct' && <span className="stroop-correct-badge"><Icon name="check" className="w-3.5 h-3.5" /></span>}{(mode === 'normal' || mode === 'infinite') ? <div className="stroop-color-dot" style={{ backgroundColor: o.val }}></div> : (isEnglish ? o.en : o.zh)}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {view === 'nback' && (
                            <div className="flex flex-col items-center w-full">
                                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-4xl font-black text-indigo-600 mb-12 border border-slate-100">{nback.current}</div>
                                {nback.isReady ? (
                                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                                        <button disabled={!!answerFeedback} onClick={(event) => {
                                            handleNbackAnswer(true, event);
                                        }} className={`py-5 rounded-2xl font-bold shadow-lg transition-all duration-200 disabled:pointer-events-none ${answerFeedback?.target === 'match' ? (answerFeedback.status === 'correct' ? 'bg-emerald-500 text-white scale-105 ring-4 ring-emerald-100' : 'bg-red-500 text-white ring-4 ring-red-100') : 'bg-indigo-600 text-white'}`}>{ui.match}</button>
                                        <button disabled={!!answerFeedback} onClick={(event) => {
                                            handleNbackAnswer(false, event);
                                        }} className={`py-5 rounded-2xl font-bold transition-all duration-200 disabled:pointer-events-none ${answerFeedback?.target === 'different' ? (answerFeedback.status === 'correct' ? 'bg-emerald-500 text-white scale-105 ring-4 ring-emerald-100' : 'bg-red-500 text-white ring-4 ring-red-100') : 'bg-slate-200 text-slate-600'}`}>{ui.different}</button>
                                    </div>
                                ) : (
                                    <button disabled={!!answerFeedback} onClick={() => {
                                        handleNbackAnswer(false);
                                    }} className="py-5 w-full max-w-xs bg-indigo-600 text-white rounded-2xl font-bold shadow-lg disabled:pointer-events-none">{ui.continue}</button>
                                )}
                            </div>
                        )}
                        {view === 'setgame' && (
                            <div className="setgame-layout flex flex-col items-center w-full animate-pop-center">
                                {/* --- 游戏网格 --- */}
                                <div className="setgame-grid grid grid-cols-3 gap-2 w-full max-w-sm">
                                    {setGame.cards.map(card => (
                                        <button
                                            key={card.id}
                                            disabled={!!answerFeedback}
                                            onClick={(event) => {
                                                if (answerLock.current) return;
                                                const newSel = setGame.selected.includes(card.id) ? setGame.selected.filter(id => id !== card.id) : [...setGame.selected, card.id];
                                                if (newSel.length === 3) {
                                                    const selectedCards = newSel.map(id => setGame.cards.find(c => c.id === id));

                                                    // 核心判定逻辑：全同 或 全异
                                                    const checkProp = (p1, p2, p3) => (p1 === p2 && p2 === p3) || (p1 !== p2 && p2 !== p3 && p1 !== p3);

                                                    const isColorMatch = checkProp(selectedCards[0].color, selectedCards[1].color, selectedCards[2].color);
                                                    const isShapeMatch = checkProp(selectedCards[0].shape, selectedCards[1].shape, selectedCards[2].shape);
                                                    const isFillMatch = checkProp(selectedCards[0].fill, selectedCards[1].fill, selectedCards[2].fill);

                                                    if (isColorMatch && isShapeMatch && isFillMatch) {
                                                        setSetGame(p => ({ ...p, selected: newSel, successIds: newSel }));
                                                        showAnswerFeedback({
                                                            correct: true,
                                                            points: 100,
                                                            nextType: 'setgame',
                                                            target: `set-${card.id}`,
                                                            position: getCenteredFeedbackPosition(event.currentTarget.closest('.setgame-grid')),
                                                            flashError: false,
                                                            duration: 520
                                                        });
                                                    } else {
                                                        showAnswerFeedback({
                                                            correct: false,
                                                            penalty: 20,
                                                            showPenalty: true,
                                                            nextType: 'setgame',
                                                            target: `set-${card.id}`,
                                                            advance: false,
                                                            position: getCenteredFeedbackPosition(event.currentTarget.closest('.setgame-grid')),
                                                            flashError: false
                                                        });
                                                        setSetGame(p => ({ ...p, selected: [] }));
                                                    }
                                                } else {
                                                    setSetGame(p => ({ ...p, selected: newSel, successIds: [] }));
                                                }
                                            }}
                                            className={`set-card-button relative overflow-hidden aspect-square rounded-3xl border-2 flex items-center justify-center transition-all duration-200 disabled:pointer-events-none ${setGame.successIds?.includes(card.id)
                                                ? 'is-set-success'
                                                : setGame.selected.includes(card.id)
                                                    ? 'border-indigo-500 bg-indigo-50 shadow-md scale-95'
                                                    : 'border-slate-100 bg-white shadow-sm'
                                                }`}
                                        >
                                            {setGame.successIds?.includes(card.id) && (
                                                <span
                                                    className="pointer-events-none absolute inset-0 rounded-3xl"
                                                    style={{
                                                        background: 'rgba(209, 250, 229, 0.72)',
                                                        boxShadow: 'inset 0 0 0 3px rgba(16, 185, 129, 0.42), 0 0 0 4px rgba(16, 185, 129, 0.12)'
                                                    }}
                                                />
                                            )}
                                            <div style={{ color: card.color, ...(setGame.successIds?.includes(card.id) ? { transform: 'scale(1.08)', position: 'relative', zIndex: 1 } : {}) }} className={card.fill ? 'opacity-100' : 'opacity-30'}>
                                                <Icon name={card.shape} className="w-10 h-10" />
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* --- 新增：无惩罚刷新按钮 --- */}
                                <button
                                    onClick={() => initGameCore('setgame')}
                                    className="flex items-center gap-2 mt-4 px-8 py-3 bg-white border border-slate-200 text-slate-400 rounded-2xl text-xs font-bold active:scale-95 transition-all shadow-sm"
                                >
                                    <Icon name="refresh-cw" className="w-3.5 h-3.5" />
                                    {ui.refreshSet}
                                </button>

                            </div>
                        )}
                        {view === 'neuroncount' && (
                            <div className="neuron-layout flex flex-col items-center w-full animate-pop-center min-h-0">
                                <div className="neuron-target flex-shrink-0 w-full max-w-sm mb-3 bg-white px-4 py-3 rounded-[1.5rem] border border-indigo-100 shadow-sm flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <Icon name="scan-search" className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-indigo-500 brand-text">{ui.neuronTarget}</div>
                                            <div className="text-sm font-black text-slate-700">{ui.neuronInstruction}</div>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                        <div
                                            className={`w-6 h-6 ${neuronCount.target.color}`}
                                            style={{
                                                ...(neuronCount.target.shape === 'circle' ? { borderRadius: '50%' } :
                                                    neuronCount.target.shape === 'triangle' ? { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } :
                                                        { borderRadius: '0.3rem' }),
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="neuron-board flex-1 w-full max-w-sm bg-white rounded-[2rem] border border-slate-100 shadow-inner p-4 relative overflow-hidden min-h-0">
                                    {neuronCount.items.map((item, index) => (
                                        <div key={item.id}
                                            style={{
                                                left: `${item.x}%`,
                                                top: `${item.y}%`,
                                                '--neuron-transform': `translate(-50%, -50%) rotate(${item.rotate}deg) scale(${item.scale})`,
                                                '--pop-delay': `${item.popDelay}s`,
                                                '--float-duration': `${2.5 + (index % 4)}s`,
                                                '--float-delay': `${item.popDelay + 0.45 + (index % 3) * 0.08}s`,
                                                ...(item.shape === 'circle' ? { borderRadius: '50%' } :
                                                    item.shape === 'triangle' ? { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } :
                                                        { borderRadius: '0.25rem' }),
                                            }}
                                            className={`neuron-item absolute w-7 h-7 ${item.color} ${item.isMover ? 'neuron-mover' : 'neuron-floater'} shadow-sm`}
                                        ></div>
                                    ))}
                                </div>

                                <div className="neuron-controls flex-shrink-0 w-full max-w-sm mt-3 bg-white rounded-[1.6rem] border border-indigo-100 shadow-sm p-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setNeuronCount(p => ({ ...p, currentCount: Math.max(0, p.currentCount - 1) }))}
                                            className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl font-bold border border-indigo-100 active:scale-95 transition-transform flex items-center justify-center"
                                        >
                                            <Icon name="minus" className="w-5 h-5" />
                                        </button>
                                        <div className="flex-1 h-14 bg-indigo-600 text-white rounded-2xl shadow-md flex flex-col items-center justify-center">
                                            <div className="text-[9px] opacity-70 font-black brand-text leading-none mb-0.5">{ui.recorded}</div>
                                            <div className="text-3xl font-black font-mono leading-none">{neuronCount.currentCount}</div>
                                        </div>
                                        <button
                                            onClick={() => setNeuronCount(p => ({ ...p, currentCount: p.currentCount + 1 }))}
                                            className="w-14 h-14 bg-indigo-600 text-white rounded-2xl font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center"
                                        >
                                            <Icon name="plus" className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-[1fr_2fr] gap-2 mt-2">
                                        <button
                                            onClick={() => setNeuronCount(p => ({ ...p, currentCount: 0 }))}
                                            className="h-11 bg-indigo-50 text-indigo-500 rounded-[1.1rem] font-bold border border-indigo-100 active:scale-95 transition-transform flex items-center justify-center gap-1 text-xs"
                                        >
                                            <Icon name="rotate-ccw" className="w-4 h-4" /> {ui.reset}
                                        </button>
                                        <button
                                            disabled={!!answerFeedback}
                                            onClick={(event) => {
                                                const isCorrect = neuronCount.currentCount === neuronCount.targetCount;
                                                showAnswerFeedback({
                                                    correct: isCorrect,
                                                    points: 80,
                                                    nextType: 'neuroncount',
                                                    target: 'neuron-submit',
                                                    advance: isCorrect,
                                                    event,
                                                    flashError: false
                                                });
                                                if (!isCorrect) {
                                                    setNeuronCount(p => ({ ...p, currentCount: 0 }));
                                                }
                                            }}
                                            className="h-11 bg-slate-900 text-white rounded-[1.1rem] font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1 text-sm"
                                        >
                                            <Icon name="check" className="w-5 h-5" /> {ui.submit}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {view === 'result' && (() => {
                const feedback = getFeedback(lastScore);
                const isDailyResult = mode === 'daily';
                return (
                    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-pop-center">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm ${isDailyResult ? 'bg-emerald-50 text-emerald-500' : 'bg-indigo-50 text-indigo-500'}`}>
                            <Icon name={isDailyResult ? 'badge-check' : 'sparkles'} className="w-10 h-10" />
                        </div>
                        <div className="text-[10px] font-black brand-text text-slate-400 mb-1">{isDailyResult ? ui.dailyFinishedTitle : ui.resultTitle}</div>
                        <div className={`text-6xl font-black mb-6 font-mono ${isDailyResult ? 'text-emerald-500' : 'text-indigo-600'}`}>{lastScore}</div>
                        <div className={`text-xl font-black mb-1 ${isDailyResult ? 'text-emerald-600' : feedback.color}`}>{isDailyResult ? `${ui.dailyStreak} ${dailyStreak} ${ui.dailyDays}` : feedback.label}</div>
                        <div className="text-xs text-slate-500 mb-4 font-medium leading-relaxed max-w-[240px]">{isDailyResult ? ui.dailyFinishedSub : feedback.sub}</div>
                        {isDailyResult && (
                            <div className="mb-10 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-black">
                                {ui.dailyTomorrow}
                            </div>
                        )}
                        {!isDailyResult && <div className="mb-8" />}
                        <button onClick={() => setView('home')} className="w-full max-w-sm py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg">{ui.backHome}</button>
                    </div>
                );
            })()}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
