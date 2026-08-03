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
        appTitle: "前额叶实验室 6.1.7",
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
        updateVersion: "Version 6.1.7",
        updateButton: "知道了，这就去练脑",
        startTraining: "开始训练",
        firstPlayKicker: "\u7b2c\u4e00\u6b21\u6765\uff1f",
        firstPlayTitle: "\u5148\u8bd5\u8bd5 60 \u79d2\u8212\u5c14\u7279",
        firstPlayBody: "\u4ece 1 \u70b9\u5230 25 \u70b9\uff0c\u627e\u5230\u8282\u594f\u5c31\u4e0a\u624b\u3002",
        firstPlayStart: "\u5f00\u59cb\u7b2c\u4e00\u5c40",
        firstPlayLater: "\u5148\u770b\u770b",
        navTrain: "训练",
        navDaily: "每日挑战",
        navArena: "竞技",
        navAnalytics: "分析",
        settings: "我的",
        settingsLanguage: "语言",
        settingsSound: "音效",
        settingsSoundOn: "开启",
        settingsSoundOff: "关闭",
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
        dailyGoal: "60 秒限时挑战",
        dailyGoalFinish: "完成目标",
        dailyGoalTimed: "限时挑战",
        dailyReward: "完成后点亮今天的打卡记录",
        dailyReplay: "再冲一次",
        dailyDays: "天",
        dailyFinishedTitle: "今日已打卡",
        dailyFinishedSub: "今日已点亮，明天回来保持火苗。",
        dailyTomorrow: "明天解锁新挑战",
        dailyWeeklyGoal: "本周目标",
        dailyWeeklyDone: "本周徽章已点亮",
        dailyWeeklyReward: "5/5",
        dailyWeeklyNext: "明天继续点亮下一格",
        dailyTomorrowPreview: "明日预告",
        dailyTomorrowLocked: "完成今日挑战后查看明日预告",
        dailyTomorrowPrefix: "明天",
        dailySeeTomorrow: "明天见",
        dailyPracticeAgain: "再练一次",
        dailyResultNote: "今天完成了一次专注训练，明天回来继续累积你的记录。",
        dailyCategories: {
            schulte: "视觉搜索挑战",
            stroop: "反应控制挑战",
            nback: "记忆类挑战",
            setgame: "逻辑挑战",
            neuroncount: "计数挑战"
        },
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
        resultAccuracy: "正确率",
        resultTime: "用时",
        resultCorrect: "答对",
        resultMistakes: "错误",
        resultTimes: "次",
        backHome: "返回大厅"
    },
    en: {
        appTitle: "Prefrontal Lab 6.1.7",
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
        updateVersion: "Version 6.1.7",
        updateButton: "Got it, start training",
        startTraining: "Start Training",
        firstPlayKicker: "New here?",
        firstPlayTitle: "Start with a 60-second Schulte run",
        firstPlayBody: "Find 1 to 25 in order. It is the quickest way to get a feel for the lab.",
        firstPlayStart: "Start first run",
        firstPlayLater: "Just look around",
        navTrain: "Train",
        navDaily: "Daily",
        navArena: "Arena",
        navAnalytics: "Analytics",
        settings: "My Lab",
        settingsLanguage: "Language",
        settingsSound: "Sound",
        settingsSoundOn: "On",
        settingsSoundOff: "Off",
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
        dailyGoal: "60-second challenge",
        dailyGoalFinish: "Goal clear",
        dailyGoalTimed: "Timed run",
        dailyReward: "Finish to light up today's check-in",
        dailyReplay: "Try again",
        dailyDays: "days",
        dailyFinishedTitle: "Daily checked in",
        dailyFinishedSub: "Today is lit. Come back tomorrow to keep the spark alive.",
        dailyTomorrow: "New challenge tomorrow",
        dailyWeeklyGoal: "Weekly goal",
        dailyWeeklyDone: "Weekly badge lit",
        dailyWeeklyReward: "5/5",
        dailyWeeklyNext: "Light another tile tomorrow",
        dailyTomorrowPreview: "Tomorrow preview",
        dailyTomorrowLocked: "Finish today to reveal tomorrow",
        dailyTomorrowPrefix: "Tomorrow",
        dailySeeTomorrow: "See you tomorrow",
        dailyPracticeAgain: "Practice again",
        dailyResultNote: "One focused session is in the record. Come back tomorrow and keep building your rhythm.",
        dailyCategories: {
            schulte: "visual search challenge",
            stroop: "reaction control challenge",
            nback: "memory challenge",
            setgame: "logic challenge",
            neuroncount: "counting challenge"
        },
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
        resultAccuracy: "Accuracy",
        resultTime: "Time",
        resultCorrect: "Correct",
        resultMistakes: "Mistakes",
        resultTimes: "",
        backHome: "Back to Lobby"
    }
};

const UPDATE_LINES = {
    zh: [
        "重新设计了“我的”页面：将训练记录、周报和数据入口集中到一个独立界面，让训练进度更清晰、更容易查看。",
        "新增训练记录与周报：查看训练天数、完成局数、最高分、准确率和训练偏好。",
        "训练节奏支持按月查看：可用箭头或左右滑动浏览历史月份，点击日期查看当天记录。",
        "优化记录页解锁逻辑：训练记录不足时也能查看已有内容，不会被空白页面挡住。",
        "优化热力图可读性：训练日与无训练日区分更清楚，月份切换箭头行为更直观。",
        "修复电脑端“我的”页面顶部错位和内容遮挡，并改善移动端训练记录浏览体验。"
    ],
    en: [
        "Redesigned My Lab as a dedicated space for Training Records, Weekly Reports, and personal data, making progress easier to follow.",
        "Added Training Records and Weekly Reports for training days, sessions, best scores, accuracy, and preferences.",
        "Training Rhythm now supports monthly browsing with arrows or horizontal swipes, plus daily record details.",
        "Improved record access so existing training history remains viewable even with limited training days.",
        "Made the heatmap easier to read with clearer training-day colors and more intuitive month navigation.",
        "Fixed desktop My Lab header overlap and improved mobile browsing across Training Records."
    ]
};

const RESULT_TEXT = {
    zh: [
        { label: "正在慢慢找到感觉", sub: "没关系，大脑也需要一点热身时间，我们下一局再试试。", color: "text-slate-500" },
        { label: "稳稳地完成了", sub: "每一步都很认真。下一局可以放心地快一点点。", color: "text-indigo-500" },
        { label: "冲劲满满", sub: "速度已经很棒啦，下次稍微稳一点，会更接近完美。", color: "text-blue-500" },
        { label: "这局又快又稳", sub: "节奏和准确度都很好，这一局完成得很漂亮。", color: "text-purple-600" },
        { label: "这次比之前更进一步", sub: "你的进步已经看得见了，保持这个节奏就很好。", color: "text-emerald-600" }
    ],
    en: [
        { label: "Finding Your Rhythm", sub: "No worries. Your brain may just need a little warm-up. Let's try another round.", color: "text-slate-500" },
        { label: "Steady All the Way", sub: "Every step was thoughtful. Next round, you can gently pick up the pace.", color: "text-indigo-500" },
        { label: "Full of Momentum", sub: "Your speed is already great. A touch more control will bring it even closer to perfect.", color: "text-blue-500" },
        { label: "Fast and Steady", sub: "Your rhythm and accuracy worked beautifully together this round.", color: "text-purple-600" },
        { label: "A Step Further Than Before", sub: "Your progress is showing. Keeping this rhythm is more than enough.", color: "text-emerald-600" }
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

const SET_FILL_LEVELS = [1, 0.4];

const RETENTION_STORAGE_KEY = 'prefrontal_lab_retention_v1';
const RETENTION_VISITOR_KEY = 'prefrontal_lab_visitor_id';
const OWNER_TOKEN_KEY = 'prefrontal_lab_owner_token';
const DAILY_STORAGE_KEY = 'prefrontal_lab_daily_v4';
const SOUND_STORAGE_KEY = 'prefrontal_lab_sound_enabled';
const WEEKLY_DAILY_GOAL = 5;
const CLOUD_ANALYTICS_ENDPOINT = window.PFL_ANALYTICS_ENDPOINT || (window.location.hostname === 'boxsbraindump.github.io' ? '' : '/api/retention');
const GAME_CLICK_LABELS = {
    daily: 'Daily Challenge',
    arena: 'Cognitive Arena',
    schulte: 'Schulte Grid',
    stroop: 'Stroop Test',
    setgame: 'SET Logic',
    nback: 'N-Back Memory',
    neuroncount: 'Neuron Counting'
};

const SEO_TITLE = {
    zh: '前额叶实验室 | 认知训练小游戏',
    en: 'Prefrontal Lab | Cognitive Training Games'
};

const createSoundEngine = () => {
    let ctx = null;
    let master = null;

    const getContext = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return null;

        if (!ctx) {
            ctx = new AudioContext();
            master = ctx.createGain();
            master.gain.value = 0.86;
            master.connect(ctx.destination);
        }

        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        return ctx;
    };

    const tone = ({ freq, start = 0, duration = 0.08, type = 'sine', gain = 0.08, filter = 2400 }) => {
        const audio = getContext();
        if (!audio || !master) return;

        const now = audio.currentTime + start;
        const oscillator = audio.createOscillator();
        const amp = audio.createGain();
        const lowpass = audio.createBiquadFilter();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(freq, now);
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(filter, now);
        amp.gain.setValueAtTime(0.0001, now);
        amp.gain.exponentialRampToValueAtTime(gain, now + 0.012);
        amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        oscillator.connect(lowpass);
        lowpass.connect(amp);
        amp.connect(master);
        oscillator.start(now);
        oscillator.stop(now + duration + 0.02);
    };

    const noise = ({ start = 0, duration = 0.08, gain = 0.025, filter = 1800 }) => {
        const audio = getContext();
        if (!audio || !master) return;

        const buffer = audio.createBuffer(1, Math.max(1, Math.floor(audio.sampleRate * duration)), audio.sampleRate);
        const samples = buffer.getChannelData(0);
        for (let i = 0; i < samples.length; i += 1) {
            samples[i] = (Math.random() * 2 - 1) * (1 - i / samples.length);
        }

        const now = audio.currentTime + start;
        const source = audio.createBufferSource();
        const amp = audio.createGain();
        const lowpass = audio.createBiquadFilter();
        source.buffer = buffer;
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(filter, now);
        amp.gain.setValueAtTime(gain, now);
        amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        source.connect(lowpass);
        lowpass.connect(amp);
        amp.connect(master);
        source.start(now);
        source.stop(now + duration);
    };

    const buzz = (pattern) => { try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { } };

    return {
        play(kind, enabled = true) {
            if (!enabled) return;
            getContext();

            if (kind === 'tap') {
                tone({ freq: 760, duration: 0.045, type: 'triangle', gain: 0.035, filter: 3200 });
            } else if (kind === 'scoreTick') {
                tone({ freq: 520, duration: 0.055, type: 'sine', gain: 0.04, filter: 1800 });
            } else if (kind === 'scoreTickHigh') {
                tone({ freq: 700, duration: 0.055, type: 'sine', gain: 0.042, filter: 2200 });
            } else if (kind.startsWith('reportStep')) {
                const step = Math.min(5, Math.max(1, Number(kind.replace('reportStep', '')) || 1));
                const baseFreq = 500 + ((step - 1) * 72);
                const gain = 0.03 + (step * 0.006);
                tone({ freq: baseFreq, duration: 0.05, type: 'triangle', gain, filter: 2400 + (step * 120) });
                tone({ freq: baseFreq + 220, start: 0.035, duration: 0.08, type: 'sine', gain: gain + 0.004, filter: 3000 + (step * 140) });
                if (step === 5) tone({ freq: 1260, start: 0.075, duration: 0.13, type: 'sine', gain: 0.058, filter: 3800 });
            } else if (kind === 'start') {
                tone({ freq: 520, duration: 0.055, type: 'triangle', gain: 0.04 });
                tone({ freq: 780, start: 0.045, duration: 0.07, type: 'triangle', gain: 0.045 });
            } else if (kind === 'success') {
                tone({ freq: 660, duration: 0.07, type: 'sine', gain: 0.055 });
                tone({ freq: 990, start: 0.045, duration: 0.12, type: 'sine', gain: 0.055 });
            } else if (kind === 'error') {
                tone({ freq: 180, duration: 0.08, type: 'triangle', gain: 0.108, filter: 900 });
                noise({ start: 0.01, duration: 0.05, gain: 0.034, filter: 700 });
            } else if (kind === 'complete') {
                tone({ freq: 523, duration: 0.08, type: 'sine', gain: 0.048 });
                tone({ freq: 784, start: 0.065, duration: 0.10, type: 'sine', gain: 0.052 });
                tone({ freq: 1046, start: 0.14, duration: 0.16, type: 'sine', gain: 0.05 });
                noise({ start: 0.12, duration: 0.12, gain: 0.012, filter: 3600 });
            } else if (kind === 'daily') {
                tone({ freq: 392, duration: 0.08, type: 'triangle', gain: 0.05 });
                tone({ freq: 659, start: 0.055, duration: 0.1, type: 'sine', gain: 0.052 });
                tone({ freq: 988, start: 0.13, duration: 0.18, type: 'sine', gain: 0.05 });
                noise({ start: 0.05, duration: 0.16, gain: 0.016, filter: 2800 });
            }

            // 触感反馈:只在有意义的时刻震动(tap/scoreTick 太频繁,不震)。与音效同开关。
            // Android Chrome 支持;iOS Safari 不支持振动 API,会静默跳过。
            const HAPTICS = {
                success: 12,                       // 答对:轻脆一下
                error: [25, 30, 25],               // 答错:双段闷震="不对"
                complete: [15, 30, 15, 30, 50],    // 完成:庆祝节奏
                daily: [12, 25, 12, 25, 12, 25, 60], // 每日打卡:更长的庆祝
                start: 8                           // 开始:极轻
            };
            if (HAPTICS[kind]) buzz(HAPTICS[kind]);
        }
    };
};

const getInitialLanguage = () => {
    try {
        const stored = localStorage.getItem('prefrontal_lab_lang');
        if (stored === 'zh' || stored === 'en') return stored;
    } catch (error) {
        // Language detection still works when browser storage is unavailable.
    }

    const browserLanguages = navigator.languages?.length
        ? navigator.languages
        : [navigator.language || ''];

    return browserLanguages.some(language => language.toLowerCase().startsWith('zh'))
        ? 'zh'
        : 'en';
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
    },
    {
        id: 'schulte-letters',
        task: 'schulte',
        variant: 'letters',
        completion: 'finish-grid',
        duration: 90,
        ruleLabel: { zh: '完成目标', en: 'Goal clear' },
        theme: {
            zh: { title: '字母迷阵', subtitle: '把数字换成字母,重新校准你的搜索路径。', goal: '按 A 到 Y 的顺序完成字母舒尔特。' },
            en: { title: 'Letter Maze', subtitle: 'Swap numbers for letters and recalibrate your scan.', goal: 'Clear the letter grid from A to Y.' }
        }
    },
    {
        id: 'schulte-grid6',
        task: 'schulte',
        variant: 'grid6',
        completion: 'finish-grid',
        duration: 120,
        ruleLabel: { zh: '完成目标', en: 'Goal clear' },
        theme: {
            zh: { title: '扩容网格', subtitle: '6×6 更大的视野,更强的专注。', goal: '按 1 到 36 的顺序完成 6×6 舒尔特。' },
            en: { title: 'Expanded Grid', subtitle: 'A bigger 6×6 field for wider focus.', goal: 'Clear the 6×6 grid from 1 to 36.' }
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
    // 按日期循环整个挑战池:不再按星期几锁死(每周一都一样),而是每天顺着池子走,池子多大就多少天一循环。
    // 仍然是"同一天全球同一个挑战"(按日期确定),满足共享挑战的设计。
    // 参考日对齐:让 2026-07-13(周一)= 字母迷阵、07-14(周二)= 6×6 扩容,方便上线当天就有新挑战。
    const ref = Date.UTC(2026, 6, 7);
    const cur = new Date(`${day}T00:00:00Z`).getTime();
    const daysSince = Math.floor((cur - ref) / 86400000);
    const len = DAILY_CHALLENGES.length;
    return ((daysSince % len) + len) % len;
};

const getDailySpec = (day = getDayKey()) => {
    const challengeIndex = getDailyChallengeIndex(day);
    let challenge = DAILY_CHALLENGES[challengeIndex % DAILY_CHALLENGES.length];
    // 测试用:?daily=<id> 强制预览指定的每日挑战(如 schulte-letters / schulte-grid6)
    try {
        const forced = new URLSearchParams(window.location.search).get('daily');
        if (forced) {
            const found = DAILY_CHALLENGES.find(c => c.id === forced);
            if (found) challenge = found;
        }
    } catch (e) { }
    return {
        instanceId: `daily-${day}`,
        day,
        challengeIndex,
        ...challenge,
        level: 'daily'
    };
};

const getOffsetDayKey = (day, offset) => {
    const date = new Date(`${day}T00:00:00`);
    date.setDate(date.getDate() + offset);
    return getDayKey(date);
};

const getVisitorId = () => {
    let visitorId = null;
    try { visitorId = localStorage.getItem(RETENTION_VISITOR_KEY); } catch (error) { }
    if (!visitorId) {
        const randomPart = window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        visitorId = `pfl-${randomPart}`;
        try { localStorage.setItem(RETENTION_VISITOR_KEY, visitorId); } catch (error) { }
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
    try { localStorage.setItem(RETENTION_STORAGE_KEY, JSON.stringify(data)); } catch (error) { }
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
    try { localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(data)); } catch (error) { }
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

const formatWeeklySeconds = (seconds, isEnglish) => {
    const value = Number(seconds);
    if (!Number.isFinite(value) || value <= 0) return isEnglish ? '-' : '-';
    return isEnglish ? `${value}s` : `${value}秒`;
};

const getWeeklyBrainReportEvents = (retentionData, dailyProgress, today, preview = false) => {
    if (preview) {
        const recentDays = Array.from({ length: 6 }, (_, index) => getOffsetDayKey(today, -(5 - index)));
        return [
            { name: 'game_complete', day: recentDays[0], task: 'schulte', dailyTask: 'schulte', score: 420, durationSeconds: 68, correct: 24, incorrect: 2 },
            { name: 'game_complete', day: recentDays[1], task: 'stroop', dailyTask: 'stroop', score: 510, durationSeconds: 60, correct: 27, incorrect: 3 },
            { name: 'game_complete', day: recentDays[2], task: 'schulte', dailyTask: 'schulte', score: 560, durationSeconds: 54, correct: 25, incorrect: 0 },
            { name: 'game_complete', day: recentDays[3], task: 'nback', dailyTask: 'nback', score: 360, durationSeconds: 60, correct: 11, incorrect: 2 },
            { name: 'game_complete', day: recentDays[4], task: 'schulte', dailyTask: 'schulte', score: 640, durationSeconds: 47, correct: 25, incorrect: 0 },
            { name: 'game_complete', day: recentDays[4], task: 'setgame', dailyTask: 'setgame', score: 300, durationSeconds: 60, correct: 6, incorrect: 1 },
            { name: 'game_complete', day: recentDays[5], task: 'stroop', dailyTask: 'stroop', score: 580, durationSeconds: 52, correct: 31, incorrect: 2 },
            { name: 'game_complete', day: recentDays[5], task: 'schulte', dailyTask: 'schulte', score: 1130, durationSeconds: 44, correct: 25, incorrect: 0 }
        ];
    }

    return (retentionData.events || []).filter(event => event.name === 'game_complete');
};

const getTrainingRecordEventDay = (event) => event.dailyDay || event.day || (event.at ? getDayKey(new Date(event.at)) : null);

const buildTrainingRecordData = ({ retentionData, dailyProgress, today, taskTitle, isEnglish, range = 'week', preview = false, monthOffset = 0 }) => {
    const todayKey = typeof today === 'string' ? today : getDayKey(today);
    const todayDate = new Date(`${todayKey}T00:00:00`);
    let periodStart = new Date(todayDate);
    let periodEnd = new Date(todayDate);

    if (range === 'week') {
        const week = getWeeklyDailyDays({}, todayKey);
        periodStart = new Date(`${week[0].day}T00:00:00`);
        periodEnd = new Date(`${week[6].day}T00:00:00`);
    } else if (range === 'month') {
        periodStart = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
        periodEnd = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0);
    }

    const startKey = getDayKey(periodStart);
    const endKey = getDayKey(periodEnd);
    const allEvents = getWeeklyBrainReportEvents(retentionData, dailyProgress, todayKey, preview)
        .filter(event => getTrainingRecordEventDay(event));
    const events = allEvents.filter(event => {
        const day = getTrainingRecordEventDay(event);
        return day >= startKey && day <= endKey;
    });
    const completedDays = new Set([
        ...events.map(getTrainingRecordEventDay),
        ...Object.entries(dailyProgress.days || {})
            .filter(([day, value]) => value?.completed && day >= startKey && day <= endKey)
            .map(([day]) => day)
    ]).size;
    const totalCorrect = events.reduce((sum, event) => sum + (Number(event.correct) || 0), 0);
    const totalIncorrect = events.reduce((sum, event) => sum + (Number(event.incorrect) || 0), 0);
    const attempts = totalCorrect + totalIncorrect;
    const accuracy = attempts ? Math.round((totalCorrect / attempts) * 100) : 0;
    const scoreValues = events
        .map(event => Number(event.score || 0))
        .filter(value => Number.isFinite(value) && value > 0);
    const durationSeconds = events.reduce((sum, event) => sum + (Number(event.durationSeconds) || 0), 0);
    const taskCounts = events.reduce((acc, event) => {
        const task = event.dailyTask || event.task || 'training';
        acc[task] = (acc[task] || 0) + 1;
        return acc;
    }, {});
    const taskMix = Object.entries(taskCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([task, count]) => ({ task, count, name: taskTitle(task) }));
    const taskPerformance = Object.entries(taskCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([task, count]) => {
            const taskEvents = events.filter(event => (event.dailyTask || event.task || 'training') === task);
            const taskCorrect = taskEvents.reduce((sum, event) => sum + (Number(event.correct) || 0), 0);
            const taskIncorrect = taskEvents.reduce((sum, event) => sum + (Number(event.incorrect) || 0), 0);
            const taskAttempts = taskCorrect + taskIncorrect;
            const taskScores = taskEvents.map(event => Number(event.score || 0)).filter(value => Number.isFinite(value) && value > 0);
            const taskTimes = taskEvents.map(event => Number(event.durationSeconds || 0)).filter(value => value > 0);
            const metric = task === 'schulte' && taskTimes.length
                ? { value: Math.min(...taskTimes), type: 'time' }
                : taskAttempts
                    ? { value: Math.round((taskCorrect / taskAttempts) * 100), type: 'accuracy' }
                    : taskScores.length
                        ? { value: Math.max(...taskScores), type: 'score' }
                        : { value: count, type: 'sessions' };
            return { task, count, name: taskTitle(task), metric };
        });
    const schulteTimes = events
        .filter(event => (event.dailyTask || event.task) === 'schulte')
        .map(event => Number(event.durationSeconds || 0))
        .filter(value => value > 0);

    const heatmapMonthDate = new Date(todayDate.getFullYear(), todayDate.getMonth() + monthOffset, 1);
    const heatmapDataStartDate = new Date(heatmapMonthDate.getFullYear(), heatmapMonthDate.getMonth(), 1);
    const heatmapDataEndDate = new Date(heatmapMonthDate.getFullYear(), heatmapMonthDate.getMonth() + 1, 0);
    const heatmapDataStartKey = getDayKey(heatmapDataStartDate);
    const heatmapDataEndKey = getDayKey(heatmapDataEndDate);
    const heatmapCounts = allEvents.reduce((acc, event) => {
        const day = getTrainingRecordEventDay(event);
        if (day && day >= heatmapDataStartKey && day <= todayKey && day <= heatmapDataEndKey) acc[day] = (acc[day] || 0) + 1;
        return acc;
    }, {});
    Object.entries(dailyProgress.days || {}).forEach(([day, value]) => {
        if (value?.completed && day >= heatmapDataStartKey && day <= todayKey && day <= heatmapDataEndKey) {
            heatmapCounts[day] = Math.max(1, heatmapCounts[day] || 0);
        }
    });
    const heatmapLeadingBlanks = (heatmapDataStartDate.getDay() + 6) % 7;
    const heatmapDayCount = heatmapDataEndDate.getDate();
    const heatmapSlotCount = Math.ceil((heatmapLeadingBlanks + heatmapDayCount) / 7) * 7;
    const heatmap = Array.from({ length: heatmapSlotCount }, (_, index) => {
        if (index < heatmapLeadingBlanks || index >= heatmapLeadingBlanks + heatmapDayCount) {
            return { day: null, count: null, level: -1, empty: true };
        }
        const date = new Date(heatmapDataStartDate);
        date.setDate(date.getDate() + (index - heatmapLeadingBlanks));
        const day = getDayKey(date);
        const isFuture = day > todayKey;
        const count = isFuture ? null : (heatmapCounts[day] || 0);
        return {
            day,
            count,
            level: isFuture ? -1 : (count === 0 ? 0 : Math.min(4, count)),
            empty: false
        };
    });
    const heatmapCompletedDays = heatmap.filter(cell => cell.count > 0).length;
    const heatmapSessions = heatmap.reduce((sum, cell) => sum + (cell.count || 0), 0);
    const lifetimeTrainingDays = new Set([
        ...allEvents.map(getTrainingRecordEventDay).filter(Boolean),
        ...Object.entries(dailyProgress.days || {})
            .filter(([, value]) => value?.completed)
            .map(([day]) => day)
    ]).size;
    const dayDetails = allEvents.reduce((acc, event) => {
        const day = getTrainingRecordEventDay(event);
        if (!day) return acc;
        if (!acc[day]) acc[day] = { sessions: 0, durationSeconds: 0, correct: 0, incorrect: 0, bestScore: 0, tasks: {} };
        const detail = acc[day];
        const task = event.dailyTask || event.task || 'training';
        const score = Number(event.score || 0);
        detail.sessions += 1;
        detail.durationSeconds += Number(event.durationSeconds) || 0;
        detail.correct += Number(event.correct) || 0;
        detail.incorrect += Number(event.incorrect) || 0;
        detail.bestScore = Math.max(detail.bestScore, Number.isFinite(score) ? score : 0);
        detail.tasks[task] = (detail.tasks[task] || 0) + 1;
        return acc;
    }, {});
    Object.entries(dailyProgress.days || {}).forEach(([day, value]) => {
        if (value?.completed && !dayDetails[day]) dayDetails[day] = { sessions: 1, durationSeconds: 0, correct: 0, incorrect: 0, bestScore: 0, tasks: { [value.task || 'daily']: 1 } };
    });
    Object.values(dayDetails).forEach(detail => {
        const detailAttempts = detail.correct + detail.incorrect;
        detail.accuracy = detailAttempts ? Math.round((detail.correct / detailAttempts) * 100) : null;
        detail.topTask = Object.entries(detail.tasks).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    });
    let heatmapStreak = 0;
    const heatmapStreakAnchor = heatmapDataEndDate < todayDate ? heatmapDataEndDate : todayDate;
    for (let offset = 0; offset < 31; offset += 1) {
        const date = new Date(heatmapStreakAnchor);
        date.setDate(date.getDate() - offset);
        if (date < heatmapDataStartDate) break;
        if ((heatmapCounts[getDayKey(date)] || 0) > 0) heatmapStreak += 1;
        else break;
    }
    const inBounds = (day, start, end) => day >= getDayKey(start) && day <= getDayKey(end);
    let buckets = [];
    if (range === 'day') {
        buckets = Array.from({ length: 7 }, (_, index) => {
            const date = new Date(todayDate);
            date.setDate(date.getDate() - (6 - index));
            const day = getDayKey(date);
            return { key: day, label: day.slice(5).replace('-', '/'), start: date, end: date };
        });
    } else if (range === 'week') {
        buckets = Array.from({ length: 4 }, (_, index) => {
            const anchor = getOffsetDayKey(todayKey, -(3 - index) * 7);
            const week = getWeeklyDailyDays({}, anchor);
            return {
                key: week[0].day,
                label: isEnglish ? `W${index + 1}` : `第${index + 1}周`,
                start: new Date(`${week[0].day}T00:00:00`),
                end: new Date(`${week[6].day}T00:00:00`)
            };
        });
    } else {
        buckets = Array.from({ length: 6 }, (_, index) => {
            const date = new Date(todayDate.getFullYear(), todayDate.getMonth() - (5 - index), 1);
            const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            return {
                key: getDayKey(date),
                label: isEnglish ? date.toLocaleString('en-US', { month: 'short' }) : `${date.getMonth() + 1}月`,
                start: date,
                end
            };
        });
    }

    const bars = buckets.map(bucket => ({
        ...bucket,
        count: allEvents.filter(event => inBounds(getTrainingRecordEventDay(event), bucket.start, bucket.end)).length
    }));
    const maxBar = Math.max(1, ...bars.map(item => item.count));
    const performanceBars = buckets.map(bucket => {
        const bucketEvents = allEvents.filter(event => inBounds(getTrainingRecordEventDay(event), bucket.start, bucket.end));
        const correct = bucketEvents.reduce((sum, event) => sum + (Number(event.correct) || 0), 0);
        const incorrect = bucketEvents.reduce((sum, event) => sum + (Number(event.incorrect) || 0), 0);
        const bucketAttempts = correct + incorrect;
        const accuracy = bucketAttempts ? Math.round((correct / bucketAttempts) * 100) : 0;
        return {
            ...bucket,
            accuracy,
            percent: bucketAttempts ? accuracy : 0,
            hasData: bucketAttempts > 0
        };
    });
    const hasData = events.length > 0 || completedDays > 0;
    const todaySessions = heatmapCounts[todayKey] || 0;
    const topTask = taskMix[0] || null;
    const growthHeadline = isEnglish
        ? (todaySessions ? `${todaySessions} session${todaySessions === 1 ? '' : 's'} today` : `${heatmapCompletedDays} active day${heatmapCompletedDays === 1 ? '' : 's'} this month`)
        : (todaySessions ? `今天完成 ${todaySessions} 局训练` : `本月已经训练 ${heatmapCompletedDays} 天`);
    const growthSummary = isEnglish
        ? (heatmapStreak >= 3 ? `${heatmapStreak} days in a row. Your rhythm is becoming a habit.` : 'Small, repeatable sessions are how progress starts to show.')
        : (heatmapStreak >= 3 ? `已经连续 ${heatmapStreak} 天，你正在把训练变成习惯。` : '稳定地完成几次短训练，变化就会慢慢显现。');
    const preferenceSummary = topTask
        ? (isEnglish ? `You return to ${topTask.name} most often.` : `你最近最常回到「${topTask.name}」。`)
        : (isEnglish ? 'Complete a few games to reveal your training preference.' : '完成几局训练后，这里会显示你的训练偏好。');
    const effectSummary = !hasData
        ? (isEnglish ? 'Complete a game to reveal your performance pattern.' : '完成一局训练后，这里会显示你的表现变化。')
        : accuracy >= 90
            ? (isEnglish ? 'Your responses are staying steady.' : '你的答题状态正在变得稳定。')
            : accuracy >= 75
                ? (isEnglish ? 'Your rhythm is taking shape. Keep one clean session going.' : '你的训练节奏正在成形，再保持一局干净的训练。')
                : (isEnglish ? 'A little more consistency will make this pattern clearer.' : '再多一点稳定性，你的变化会更清楚。');

    return {
        startKey,
        endKey,
        completedDays,
        totalSessions: events.length,
        totalMinutes: Math.round(durationSeconds / 60),
        accuracy,
        bestScore: scoreValues.length ? Math.max(...scoreValues) : 0,
        taskMix,
        taskPerformance,
        schulteFastest: schulteTimes.length ? Math.min(...schulteTimes) : 0,
        heatmap,
        heatmapCompletedDays,
        heatmapSessions,
        lifetimeTrainingDays,
        heatmapStreak,
        dayDetails,
        todaySessions,
        growthHeadline,
        growthSummary,
        preferenceSummary,
        monthLabel: isEnglish
            ? heatmapMonthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })
            : `${heatmapMonthDate.getFullYear()}年${heatmapMonthDate.getMonth() + 1}月`,
        heatmapSummaryLabel: monthOffset === 0
            ? (isEnglish ? 'This month' : '本月')
            : (isEnglish ? 'Selected month' : '所选月份'),
        bars: bars.map(item => ({ ...item, percent: Math.round((item.count / maxBar) * 100) })),
        performanceBars,
        effectSummary,
        hasData
    };
};

const buildWeeklyBrainReport = ({ retentionData, dailyProgress, today, taskTitle, isEnglish, preview = false }) => {
    const weekDays = getWeeklyDailyDays(dailyProgress.days, today);
    const weekStart = weekDays[0]?.day || today;
    const previousWeekDays = getWeeklyDailyDays(dailyProgress.days, getOffsetDayKey(weekStart, -1));
    const weekSet = new Set(weekDays.map(item => item.day));
    const previousWeekSet = new Set(previousWeekDays.map(item => item.day));
    const allCompletions = getWeeklyBrainReportEvents(retentionData, dailyProgress, today, preview);
    const weekCompletions = allCompletions.filter(event => {
        const eventDay = event.dailyDay || event.day || (event.at ? getDayKey(new Date(event.at)) : null);
        return eventDay && weekSet.has(eventDay);
    });
    const previousWeekCompletions = preview
        ? [
            { name: 'game_complete', day: getOffsetDayKey(weekStart, -7), task: 'schulte', score: 380, durationSeconds: 52, correct: 22, incorrect: 3 },
            { name: 'game_complete', day: getOffsetDayKey(weekStart, -6), task: 'stroop', score: 420, durationSeconds: 60, correct: 22, incorrect: 5 },
            { name: 'game_complete', day: getOffsetDayKey(weekStart, -4), task: 'schulte', score: 480, durationSeconds: 51, correct: 24, incorrect: 2 }
        ]
        : allCompletions.filter(event => {
            const eventDay = event.dailyDay || event.day || (event.at ? getDayKey(new Date(event.at)) : null);
            return eventDay && previousWeekSet.has(eventDay);
        });
    const completedDays = preview
        ? 6
        : weekDays.filter(item => item.completed).length;
    const activeTrainingDays = new Set(weekCompletions.map(event => event.dailyDay || event.day).filter(Boolean)).size;
    const taskCounts = weekCompletions.reduce((acc, event) => {
        const task = event.dailyTask || event.task || 'schulte';
        acc[task] = (acc[task] || 0) + 1;
        return acc;
    }, {});
    const topTaskEntry = Object.entries(taskCounts).sort((a, b) => b[1] - a[1])[0];
    const topTask = topTaskEntry?.[0] || null;
    const topTaskCount = topTaskEntry?.[1] || 0;
    const scoreValues = weekCompletions.map(event => Number(event.score || 0)).filter(value => Number.isFinite(value) && value > 0);
    const bestScore = scoreValues.length ? Math.max(...scoreValues) : 0;
    const totalCorrect = weekCompletions.reduce((sum, event) => sum + (Number(event.correct) || 0), 0);
    const totalIncorrect = weekCompletions.reduce((sum, event) => sum + (Number(event.incorrect) || 0), 0);
    const schulteTimes = weekCompletions
        .filter(event => (event.dailyTask || event.task) === 'schulte')
        .map(event => Number(event.durationSeconds || 0))
        .filter(value => Number.isFinite(value) && value > 0);
    const fastestSchulte = schulteTimes.length ? Math.min(...schulteTimes) : 0;
    const avgSchulte = schulteTimes.length
        ? Math.round(schulteTimes.reduce((sum, value) => sum + value, 0) / schulteTimes.length)
        : 0;
    let topTaskName = isEnglish ? 'Training' : '训练';
    if (topTask && taskTitle) {
        try {
            topTaskName = taskTitle(topTask);
        } catch (error) {
            topTaskName = isEnglish ? 'Training' : '训练';
        }
    }
    const weekEnd = weekDays[6]?.day || today;
    const previousCompletedDays = preview
        ? 3
        : previousWeekDays.filter(item => item.completed).length;
    const previousScoreValues = previousWeekCompletions
        .map(event => Number(event.score || 0))
        .filter(value => Number.isFinite(value) && value > 0);
    const previousBestScore = previousScoreValues.length ? Math.max(...previousScoreValues) : 0;
    const previousSchulteTimes = previousWeekCompletions
        .filter(event => (event.dailyTask || event.task) === 'schulte')
        .map(event => Number(event.durationSeconds || 0))
        .filter(value => Number.isFinite(value) && value > 0);
    const previousFastestSchulte = previousSchulteTimes.length ? Math.min(...previousSchulteTimes) : 0;
    const previousTopTaskCounts = previousWeekCompletions.reduce((acc, event) => {
        const task = event.dailyTask || event.task || 'schulte';
        acc[task] = (acc[task] || 0) + 1;
        return acc;
    }, {});
    const previousTopTaskEntry = Object.entries(previousTopTaskCounts).sort((a, b) => b[1] - a[1])[0];
    const previousTopTask = previousTopTaskEntry?.[0] || null;
    let comparison;
    if (fastestSchulte && previousFastestSchulte) {
        const delta = previousFastestSchulte - fastestSchulte;
        comparison = delta > 0
            ? (isEnglish ? `${delta}s faster on Schulte` : `舒尔特比上周快了 ${delta} 秒`)
            : delta < 0
                ? (isEnglish ? `${Math.abs(delta)}s to go on Schulte` : `舒尔特距离上周还差 ${Math.abs(delta)} 秒`)
                : (isEnglish ? 'Schulte time held steady' : '舒尔特用时和上周持平');
    } else if (bestScore && previousBestScore) {
        const delta = bestScore - previousBestScore;
        comparison = delta > 0
            ? (isEnglish ? `Best score up ${delta} points` : `最高分比上周高了 ${delta} 分`)
            : delta < 0
                ? (isEnglish ? `Best score is ${Math.abs(delta)} points away` : `最高分距离上周还差 ${Math.abs(delta)} 分`)
                : (isEnglish ? 'Best score held steady' : '最高分和上周持平');
    } else if (completedDays !== previousCompletedDays) {
        const delta = completedDays - previousCompletedDays;
        comparison = delta > 0
            ? (isEnglish ? `${delta} more return day${delta === 1 ? '' : 's'}` : `比上周多回来了 ${delta} 天`)
            : (isEnglish ? `${Math.abs(delta)} more day${Math.abs(delta) === 1 ? '' : 's'} to match last week` : `距离上周还差 ${Math.abs(delta)} 天`);
    } else {
        comparison = isEnglish ? 'A steady week is still a real week.' : '稳定完成，本身就是进步。';
    }

    const hasData = weekCompletions.length > 0 || completedDays > 0;
    let persona;
    if (!hasData) persona = isEnglish ? 'First page is waiting' : '第一份报告待生成';
    else if (completedDays >= WEEKLY_DAILY_GOAL) persona = isEnglish ? 'Steady brain ritual' : '稳定回访型大脑';
    else if (fastestSchulte) persona = isEnglish ? 'Visual search is waking up' : '视觉搜索正在升温';
    else if (totalIncorrect <= 2 && weekCompletions.length >= 3) persona = isEnglish ? 'Careful and steady' : '稳稳推进型';
    else persona = isEnglish ? 'Momentum is building' : '节奏正在建立';

    const summary = !hasData
        ? (isEnglish
            ? 'Finish a few rounds this week and your report will turn them into a small growth story.'
            : '本周完成几局训练后，这里会把记录整理成一份小小的成长报告。')
        : (isEnglish
            ? `This week you trained on ${Math.max(completedDays, activeTrainingDays)} day${Math.max(completedDays, activeTrainingDays) === 1 ? '' : 's'}. Your most repeated task was ${topTaskName}.`
            : `本周你训练了 ${Math.max(completedDays, activeTrainingDays)} 天，最常练的是「${topTaskName}」。`);
    const highlight = fastestSchulte
        ? (isEnglish
            ? `Your fastest Schulte run was ${formatWeeklySeconds(fastestSchulte, isEnglish)}. Time is the clearest signal for visual search growth.`
            : `舒尔特最快完成用时是 ${formatWeeklySeconds(fastestSchulte, isEnglish)}，这是目前最直观的视觉搜索成长信号。`)
        : bestScore
            ? (isEnglish
                ? `Your best score this week was ${bestScore}. A few more sessions will make the pattern clearer.`
                : `本周最高分是 ${bestScore}。再多几次记录后，成长曲线会更清楚。`)
            : (isEnglish
                ? 'Daily check-ins are ready. The report gets more useful after the first completed game.'
                : '每日打卡已经准备好。完成第一局后，报告会更有内容。');
    const suggestion = !hasData
        ? (isEnglish ? 'Start with today’s Daily. One clean record is enough to begin.' : '先从今天的 Daily 开始，一条干净记录就够开启报告。')
        : completedDays < 3
            ? (isEnglish ? 'Next week, aim for 3 return days before chasing high scores.' : '下周先把回访稳定到 3 天，再追高分会更有感觉。')
            : fastestSchulte
                ? (isEnglish ? 'Next week, watch whether your Schulte time can drop by another 2 seconds.' : '下周可以观察舒尔特用时能不能再少 2 秒。')
                : (isEnglish ? 'Keep the same rhythm and compare yourself with last week, not with everyone else.' : '保持现在的节奏，先和上周的自己比，不急着和别人比。');

    return {
        hasData,
        weekStart,
        weekEnd,
        completedDays,
        activeTrainingDays,
        totalSessions: weekCompletions.length,
        topTask,
        topTaskName,
        topTaskCount,
        bestScore,
        totalCorrect,
        totalIncorrect,
        fastestSchulte,
        avgSchulte,
        previousSessions: previousWeekCompletions.length,
        previousCompletedDays,
        previousBestScore,
        previousFastestSchulte,
        previousTopTask,
        comparison,
        persona,
        summary,
        highlight,
        suggestion
    };
};

function App() {
    const DEFAULT_TASK_BESTS = { schulte: 0, stroop: 0, nback: 0, setgame: 0, neuroncount: 0 };
    const urlParams = new URLSearchParams(window.location.search);
    const isTestRepo = window.location.hostname === 'boxsbraindump.github.io' && window.location.pathname.startsWith('/prefrontal-test');
    // Test now behaves like a real local-data build by default. Add ?demoData=1 only when a scripted demo is needed.
    const isTestDemoBuild = isTestRepo && urlParams.has('demoData');
    const resetTestDataToken = urlParams.get('resetTestData');
    if (isTestRepo && resetTestDataToken) {
        const resetMarker = `pfl_test_reset_${resetTestDataToken}`;
        try {
            if (!sessionStorage.getItem(resetMarker)) {
                const keepKeys = new Set(['prefrontal_lab_lang', 'prefrontal_lab_sound_enabled']);
                for (let index = localStorage.length - 1; index >= 0; index -= 1) {
                    const key = localStorage.key(index);
                    if (key && !keepKeys.has(key) && (key.startsWith('pfl_') || key.startsWith('prefrontal_lab_') || key.startsWith('brain_train_pro_'))) {
                        localStorage.removeItem(key);
                    }
                }
                sessionStorage.setItem(resetMarker, '1');
            }
        } catch (error) {
            // A blocked storage context should still be able to open the test app.
        }
    }
    // 归因:接住 ?from= 参数(小红书链接 UTM)。首次带 from 到访即记住(首触归因),之后沿用。
    const acquisitionSource = (() => {
        try {
            const fromParam = urlParams.get('from');
            if (fromParam) {
                if (!localStorage.getItem('pfl_acq_src')) localStorage.setItem('pfl_acq_src', fromParam.slice(0, 60));
                return fromParam.slice(0, 60);
            }
            return localStorage.getItem('pfl_acq_src') || null;
        } catch (e) { return null; }
    })();
    const [isOwner, setIsOwner] = useState(() => urlParams.get('owner') === '1');
    const [view, setView] = useState(() => {
        if (urlParams.has('analytics') && urlParams.get('owner') === '1') return 'analytics';
        if (urlParams.has('trainingRecordsPreview') || urlParams.has('recordsDemo')) return 'training-records';
        if (urlParams.has('my-page-preview') || urlParams.has('myPagePreview')) return 'settings';
        if (urlParams.has('weeklyReportDemo') || urlParams.has('weeklyReportGatePreview')) return 'weekly-report';
        return 'home';
    });
    const [mode, setMode] = useState('normal');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [lastScore, setLastScore] = useState(0);
    const [animatedScore, setAnimatedScore] = useState(0);
    const [lastRunStats, setLastRunStats] = useState(null);
    const [isError, setIsError] = useState(false);
    const [answerFeedback, setAnswerFeedback] = useState(null);
    const [showInfo, setShowInfo] = useState(null);
    const [weeklyReceiptOpen, setWeeklyReceiptOpen] = useState(false);
    const [weeklyReportStep, setWeeklyReportStep] = useState(0);
    const [weeklyReportCount, setWeeklyReportCount] = useState(0);
    const [weeklyReportScore, setWeeklyReportScore] = useState(0);
    const weeklyReportSoundTickRef = useRef({ count: 0, scoreStep: -1, lastAt: 0 });
    const [weeklyReportScope, setWeeklyReportScope] = useState('current');
    const [weeklyReportReturnView, setWeeklyReportReturnView] = useState('settings');
    const [recordsRange, setRecordsRange] = useState('week');
    const [heatmapMonthOffset, setHeatmapMonthOffset] = useState(0);
    const heatmapTouchStartRef = useRef(null);
    const [selectedTrainingDay, setSelectedTrainingDay] = useState(null);
    const [showWeeklyReportPrompt, setShowWeeklyReportPrompt] = useState(false);
    const [showFirstPlayNudge, setShowFirstPlayNudge] = useState(() => {
        if (urlParams.has('firstPlayPreview')) return true;
        try { return !localStorage.getItem('pfl_first_play_nudge_done'); } catch (e) { return false; }
    });
    const [lang, setLang] = useState(() => getInitialLanguage());
    const [retentionData, setRetentionData] = useState(() => readRetentionData());
    const [dailyProgress, setDailyProgress] = useState(() => readDailyProgress());
    const [dailyWeekAdvance, setDailyWeekAdvance] = useState(null);
    const [cloudSummary, setCloudSummary] = useState(null);
    const [cloudStatus, setCloudStatus] = useState('idle');
    const [ownerToken, setOwnerToken] = useState(() => {
        try { return localStorage.getItem(OWNER_TOKEN_KEY) || ''; } catch (error) { return ''; }
    });
    const [showSettings, setShowSettings] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(() => {
        try {
            return localStorage.getItem(SOUND_STORAGE_KEY) !== 'off';
        } catch (error) {
            return true;
        }
    });
    const ui = UI_TEXT[lang];
    const isEnglish = lang === 'en';
    const isGameView = !['home', 'result', 'analytics', 'settings', 'settings-daily', 'weekly-report', 'training-records'].includes(view);
    const isDailyMode = mode === 'daily';
    const isInfiniteMode = mode === 'infinite';
    const isChallengeDifficulty = mode === 'hard' || mode === 'comp' || isDailyMode;
    const dailySpec = getDailySpec();
    const dailyRecord = dailyProgress.days?.[dailySpec.day] || {};
    const dailyStreak = getDailyStreak(dailyProgress.days, dailySpec.day);
    const dailyWeekDays = getWeeklyDailyDays(dailyProgress.days, dailySpec.day);
    const dailyPreviewParams = new URLSearchParams(window.location.search);
    const isDailyRewardPreview = dailyPreviewParams.has('dailyRewardPreview');
    const isDailyCelebratePreview = dailyPreviewParams.has('dailyCelebratePreview');
    const weeklyReportGatePreview = dailyPreviewParams.has('weeklyReportGatePreview');
    const isWeeklyReportPreview = isTestDemoBuild || dailyPreviewParams.has('weeklyReportPreview') || dailyPreviewParams.has('weeklyReportPopupPreview') || dailyPreviewParams.has('weeklyReportDemo');
    const weeklyReportGoal = weeklyReportGatePreview ? 7 : (isWeeklyReportPreview ? 6 : WEEKLY_DAILY_GOAL);
    const previewDailyWeekDays = isDailyRewardPreview
        ? dailyWeekDays.map((day, index) => ({ ...day, completed: index < WEEKLY_DAILY_GOAL }))
        : dailyWeekDays;
    const dailyWeeklyCount = previewDailyWeekDays.filter(day => day.completed).length;
    const dailyWeeklyGoalCount = Math.min(dailyWeeklyCount, WEEKLY_DAILY_GOAL);
    const dailyWeeklyGoalComplete = dailyWeeklyCount >= WEEKLY_DAILY_GOAL;
    const dailyWeeklyProgress = Math.min(100, (dailyWeeklyGoalCount / WEEKLY_DAILY_GOAL) * 100);
    const activeDailyWeekAdvance = (dailyWeekAdvance?.day === dailySpec.day && dailyWeekAdvance.to === dailyWeeklyGoalCount) || isDailyCelebratePreview;
    const dailyWeekAdvanceFrom = isDailyCelebratePreview ? WEEKLY_DAILY_GOAL - 1 : (dailyWeekAdvance?.from ?? dailyWeeklyGoalCount);
    const dailyWeekAdvanceTo = isDailyCelebratePreview ? WEEKLY_DAILY_GOAL : (dailyWeekAdvance?.to ?? dailyWeeklyGoalCount);
    const shouldCelebrateWeeklyGoal = activeDailyWeekAdvance && dailyWeekAdvanceTo >= WEEKLY_DAILY_GOAL;
    const dailyWeekProgressStyle = activeDailyWeekAdvance
        ? {
            '--daily-week-from': `${Math.min(100, (dailyWeekAdvanceFrom / WEEKLY_DAILY_GOAL) * 100)}%`,
            '--daily-week-to': `${Math.min(100, (dailyWeekAdvanceTo / WEEKLY_DAILY_GOAL) * 100)}%`
        }
        : undefined;
    const tomorrowSpec = getDailySpec(getOffsetDayKey(dailySpec.day, 1));
    const tomorrowCategory = ui.dailyCategories?.[tomorrowSpec.task] || (isEnglish ? TASK_TRANSLATIONS[tomorrowSpec.task]?.title : TASK_DATA[tomorrowSpec.task]?.title) || tomorrowSpec.task;
    const dailyTheme = dailySpec.theme?.[lang] || dailySpec.theme?.en;
    const tomorrowTheme = tomorrowSpec.theme?.[lang] || tomorrowSpec.theme?.en;
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
        playSound('tap');
        setLang(nextLang);
        try {
            localStorage.setItem('prefrontal_lab_lang', nextLang);
        } catch (error) {
            // Keep the current session usable even if storage is blocked.
        }
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
        let base = { bestScore: 0, bestCompScore: 0, isHardUnlocked: false, taskBestScores: DEFAULT_TASK_BESTS };

        let v2DataRaw = null;
        let v1DataRaw = null;
        try {
            v1DataRaw = localStorage.getItem('brain_train_pro_data');
            v2DataRaw = localStorage.getItem('brain_train_pro_v5');
        } catch (error) {
            return base;
        }

        // 如果有 2.0 数据，直接用
        if (v2DataRaw) {
            try {
                const v2 = JSON.parse(v2DataRaw);
                if (v2 && typeof v2 === 'object') {
                    return {
                        ...base,
                        ...v2,
                        taskBestScores: { ...DEFAULT_TASK_BESTS, ...(v2.taskBestScores || {}) }
                    };
                }
            } catch (error) {
                // 保留原始 localStorage，不让损坏的旧记录阻断应用启动。
                try { localStorage.setItem('brain_train_pro_v5_recovery_backup', v2DataRaw); } catch (backupError) { }
            }
        }

        // 如果没有 2.0 但有 1.0 数据，进行搬运
        if (v1DataRaw) {
            try {
                const v1 = JSON.parse(v1DataRaw);
                if (v1 && typeof v1 === 'object') {
                    base.bestScore = v1.bestScore || 0;
                    base.isHardUnlocked = v1.isHardUnlocked || false;
                }
            } catch (error) {
                // 旧版本数据格式异常时，继续使用安全的默认结构。
                try { localStorage.setItem('brain_train_pro_data_recovery_backup', v1DataRaw); } catch (backupError) { }
            }
        }
        return base;
    });

    const displayedBestScore = isTestDemoBuild
        ? Math.max(1130, Number(history.bestScore) || 0)
        : (Number(history.bestScore) || 0);

    // ==========================================
    // ✨ 在这里插入：更新公告状态管理
    // ==========================================
    const [showUpdateNote, setShowUpdateNote] = useState(() => {
        // 检查本地存储，如果这个版本的 Key 不存在，说明是第一次见，返回 true
        const shouldPreviewUpdate = new URLSearchParams(window.location.search).has('showUpdate');
        try { return shouldPreviewUpdate || !localStorage.getItem('prefrontal_lab_v6.1.7_update'); } catch (error) { return shouldPreviewUpdate; }
    });

    const closeUpdateNote = () => {
        playSound('tap');
        // 玩家点击按钮后，在本地存入 'true'，下次刷新就不会再弹了
        localStorage.setItem('prefrontal_lab_v6.1.7_update', 'true');
        setShowUpdateNote(false);
    };

    const closeFirstPlayNudge = (shouldStart = false) => {
        playSound('tap');
        try { localStorage.setItem('pfl_first_play_nudge_done', 'true'); } catch (e) { }
        setShowFirstPlayNudge(false);
        if (shouldStart) {
            setMode('normal');
            startChallenge('schulte');
        }
    };

    const markWeeklyReportPromptSeen = () => {
        try {
            localStorage.setItem(`pfl_weekly_report_prompt_${dailySpec.day}`, 'seen');
        } catch (error) { }
        setShowWeeklyReportPrompt(false);
    };

    const openWeeklyReportPrompt = () => {
        playSound('reportStep1');
        markWeeklyReportPromptSeen();
        setWeeklyReportScope('previous');
        setWeeklyReportReturnView('home');
        setView('weekly-report');
    };

    const goHomeMode = (nextMode) => {
        if (nextMode === 'hard' && !history.isHardUnlocked) {
            playSound('error');
            return;
        }
        playSound('tap');
        setMode(nextMode);
        setView('home');
    };

    const shiftHeatmapMonth = (direction) => {
        const nextOffset = Math.max(-12, Math.min(0, heatmapMonthOffset + direction));
        if (nextOffset === heatmapMonthOffset) return;
        playSound('tap');
        setHeatmapMonthOffset(nextOffset);
        setSelectedTrainingDay(null);
    };

    const handleHeatmapTouchStart = (event) => {
        const touch = event.touches?.[0];
        heatmapTouchStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
    };

    const handleHeatmapTouchEnd = (event) => {
        const start = heatmapTouchStartRef.current;
        const touch = event.changedTouches?.[0];
        heatmapTouchStartRef.current = null;
        if (!start || !touch) return;
        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;
        if (Math.abs(deltaX) < 44 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        shiftHeatmapMonth(deltaX > 0 ? 1 : -1);
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
        {
            key: 'settings',
            label: ui.settings,
            icon: 'circle-user-round',
            active: view === 'settings' || view === 'settings-daily' || view === 'training-records',
            onClick: () => {
                playSound('tap');
                setView('settings');
            }
        }
    ];

    useEffect(() => {
        if (view === 'analytics' && !isOwner) {
            setView('home');
        }
    }, [view, isOwner]);

    const renderSettingsControl = (className = '') => (
        <div className={`settings-control ${className}`}>
            <button
                type="button"
                onClick={() => {
                    playSound('tap');
                    setShowSettings(prev => !prev);
                }}
                className="settings-toggle"
                aria-label={ui.settings}
                aria-expanded={showSettings}
            >
                <Icon name="settings" className="w-5 h-5" />
            </button>
        </div>
    );

    const renderSettingsPanel = () => (
        <div className="settings-menu settings-panel" role="dialog" aria-label={ui.settings}>
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
                            aria-pressed={lang === option.key}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="settings-sound-row">
                <div className="settings-sound-label">
                    <Icon name={soundEnabled ? 'volume-2' : 'volume-x'} className="w-4 h-4" />
                    <span>{ui.settingsSound}</span>
                </div>
                <button
                    type="button"
                    onClick={toggleSound}
                    className={`settings-sound-toggle ${soundEnabled ? 'is-active' : ''}`}
                    aria-pressed={soundEnabled}
                >
                    {soundEnabled ? ui.settingsSoundOn : ui.settingsSoundOff}
                </button>
            </div>
            <div className="settings-sync-row">
                <Icon name="cloud" className="w-4 h-4" />
                <span>{ui.settingsData}</span>
                <strong>{ui.settingsSoon}</strong>
            </div>
        </div>
    );

    useEffect(() => {
        document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
        document.title = isEnglish ? SEO_TITLE.en : SEO_TITLE.zh;
    }, [isEnglish]);

    useEffect(() => {
        const shouldUsePageScroll = view === 'analytics' || view === 'settings' || view === 'settings-daily' || view === 'weekly-report' || view === 'training-records' || (view === 'home' && mode === 'daily');
        document.body.classList.toggle('is-app-scrollable', shouldUsePageScroll);
        document.documentElement.classList.toggle('is-app-scrollable', shouldUsePageScroll);
        return () => {
            document.body.classList.remove('is-app-scrollable');
            document.documentElement.classList.remove('is-app-scrollable');
        };
    }, [view, mode]);

    useEffect(() => {
        recordRetention('session_start', {
            sessionId: sessionIdRef.current,
            source: acquisitionSource || (document.referrer ? 'referral' : 'direct')
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

    const weeklyReport = buildWeeklyBrainReport({
        retentionData,
        dailyProgress,
        today: weeklyReportScope === 'previous' ? getOffsetDayKey(dailySpec.day, -1) : dailySpec.day,
        taskTitle: getTaskTitle,
        isEnglish,
        preview: isWeeklyReportPreview
    });
    const weeklyReportBasicUnlockDays = 3;
    const weeklyReportFullUnlockDays = 7;
    const weeklyReportHasBasicAccess = weeklyReport.completedDays >= weeklyReportBasicUnlockDays;
    const weeklyReportUnlocked = !weeklyReportGatePreview && weeklyReportHasBasicAccess;
    const weeklyReportLockIsFullStage = weeklyReportHasBasicAccess;
    const weeklyReportLockTarget = weeklyReportLockIsFullStage ? weeklyReportFullUnlockDays : weeklyReportBasicUnlockDays;
    const weeklyReportLockProgress = Math.min(weeklyReport.completedDays, weeklyReportLockTarget);
    const mondayWeeklyReport = buildWeeklyBrainReport({
        retentionData,
        dailyProgress,
        today: getOffsetDayKey(dailySpec.day, -1),
        taskTitle: getTaskTitle,
        isEnglish,
        preview: isWeeklyReportPreview
    });
    const isMonday = new Date(`${dailySpec.day}T12:00:00`).getDay() === 1;
    const isWeeklyReportPromptPreview = urlParams.has('weeklyReportPopupPreview');
    const isTrainingRecordsPreview = isTestDemoBuild || urlParams.has('trainingRecordsPreview') || urlParams.has('recordsDemo');
    const trainingRecords = buildTrainingRecordData({
        retentionData,
        dailyProgress,
        today: dailySpec.day,
        taskTitle: getTaskTitle,
        isEnglish,
        range: recordsRange,
        preview: isTrainingRecordsPreview,
        monthOffset: heatmapMonthOffset
    });
    const trainingRecordsUnlocked = !urlParams.has('recordsGatePreview');
    const trainingRecordsMaxTask = Math.max(1, ...trainingRecords.taskMix.map(item => item.count));
    const selectedTrainingDayDetail = selectedTrainingDay ? trainingRecords.dayDetails[selectedTrainingDay] : null;
    const selectedTrainingDayTask = selectedTrainingDayDetail?.topTask ? getTaskTitle(selectedTrainingDayDetail.topTask) : null;
    const weeklyReportScoreTarget = Math.max(0, Number(weeklyReport.bestScore) || 0);
    const weeklyReportText = isEnglish
        ? {
            title: 'Weekly Brain Report',
            eyebrow: 'Personal growth',
            emptyCta: 'Start with today',
            readyCta: 'View report',
            receiptKicker: 'WEEKLY RECAP',
            receiptTitle: 'Your brain receipt',
            receiptSubtitle: 'A small record of the work you put in this week.',
             receiptOpen: 'Open this week',
             receiptLockedTitle: 'Your report is taking shape',
             receiptLockedSubtitle: 'Keep a few more sessions going to unlock the full picture.',
             receiptLockedOpen: 'See unlock progress',
            receiptClose: 'Close receipt',
            reportPageKicker: 'WEEKLY RECAP',
            reportPageTitle: 'Your week in focus',
            reportPageIntro: 'A few signals from the time you gave your brain.',
            reportDaysLabel: 'Training days',
            reportDaysCopy: 'You came back and put in the work.',
            reportTaskLabel: 'Most practiced',
            reportTaskCopy: 'This was your most familiar challenge.',
            reportBestLabel: 'Best record',
            reportBestCopy: 'Your strongest score this week.',
            reportCompareLabel: 'Compared with last week',
            reportCompareCopy: 'Progress is easier to feel when you compare yourself with yourself.',
            reportLastWeek: 'Last week',
            reportThisWeek: 'This week',
            reportReady: 'Ready for next week?',
             reportReadyCopy: 'Keep the rhythm going. One small session is enough to return.',
             lockKicker: 'REPORT UNLOCK',
             lockTitleBasic: 'A few more sessions, then your report begins',
             lockTitleFull: 'One more training day for the full report',
             lockBodyBasic: 'Your training record is already being saved. Complete 3 training days to unlock your first weekly summary.',
             lockBodyFull: 'Your starter summary is ready. Complete 7 training days to unlock the full weekly trend and comparison view.',
             lockProgressLabelBasic: 'STARTER REPORT',
             lockProgressLabelFull: 'FULL WEEKLY REPORT',
             lockDaysLeftBasic: 'more training days to unlock your first summary',
             lockDaysLeftFull: 'more training day to unlock the full report',
             lockCta: "Start today's training",
            reportEnter: "Start Today's Challenge",
            reportViewDaily: "View Today's Challenge",
            days: 'days',
            sessions: 'sessions',
            best: 'Best',
            focus: 'Focus task',
            time: 'Schulte time',
            accuracy: 'Clean hits',
            note: 'Next tiny goal'
        }
        : {
            title: '本周脑力报告',
            eyebrow: '个人成长',
            emptyCta: '从今天开始',
            readyCta: '查看报告',
            receiptKicker: '本周记录',
            receiptTitle: '本周脑力收据',
            receiptSubtitle: '把这一周的每一次训练，收进一张小小的成长记录里。',
             receiptOpen: '打开本周记录',
             receiptLockedTitle: '本周周报还在积累中',
             receiptLockedSubtitle: '继续完成几次训练，解锁更完整的成长记录。',
             receiptLockedOpen: '查看解锁进度',
            receiptClose: '收起本周记录',
            reportPageKicker: '本周记录',
            reportPageTitle: '这一周，你的专注轨迹',
            reportPageIntro: '把你给大脑的时间，变成几条看得见的成长信号。',
            reportDaysLabel: '本周训练',
            reportDaysCopy: '你一次次回来了，也一次次完成了训练。',
            reportTaskLabel: '最常练习',
            reportTaskCopy: '这是这一周最熟悉的挑战。',
            reportBestLabel: '最高记录',
            reportBestCopy: '这是你本周最强的一次表现。',
            reportCompareLabel: '比起上周',
            reportCompareCopy: '和过去的自己比，进步会更清楚。',
            reportLastWeek: '上周',
            reportThisWeek: '本周',
            reportReady: '准备好进入下一周了吗？',
             reportReadyCopy: '保持现在的节奏，下一次回来就算继续前进。',
             lockKicker: '周报解锁进度',
             lockTitleBasic: '再完成几次训练，周报就开始生成',
             lockTitleFull: '再训练 1 天，解锁完整周报',
             lockBodyBasic: '你的训练记录会先被保留下来。完成 3 天训练后，就能看到第一份基础周报。',
             lockBodyFull: '基础摘要已经在积累中。完成 7 天训练后，就能看到完整的趋势和对比分析。',
             lockProgressLabelBasic: '基础周报',
             lockProgressLabelFull: '完整周报',
             lockDaysLeftBasic: '天训练后解锁第一份周报',
             lockDaysLeftFull: '天训练后解锁完整周报',
             lockCta: '开始今日训练',
            reportEnter: '开始今日挑战',
            reportViewDaily: '查看今日挑战',
            days: '天',
            sessions: '局',
            best: '最高分',
            focus: '最常练',
            time: '舒尔特用时',
            accuracy: '答对/误触',
            note: '下周小目标'
        };
    const weeklyReportIsPrevious = weeklyReportScope === 'previous';
    const weeklyReportPageKicker = weeklyReportIsPrevious ? (isEnglish ? 'LAST WEEK RECAP' : '上周记录') : weeklyReportText.reportPageKicker;
    const weeklyReportPageTitle = weeklyReportIsPrevious ? (isEnglish ? 'Your last week in focus' : '上周，你的专注轨迹') : weeklyReportText.reportPageTitle;
    const weeklyReportDaysLabel = weeklyReportIsPrevious ? (isEnglish ? 'Last week training' : '上周训练') : weeklyReportText.reportDaysLabel;
    const weeklyReportPreviousBarLabel = weeklyReportIsPrevious ? (isEnglish ? 'Week before' : '前一周') : weeklyReportText.reportLastWeek;
    const weeklyReportCurrentBarLabel = weeklyReportIsPrevious ? (isEnglish ? 'Last week' : '上周') : weeklyReportText.reportThisWeek;

    const settingsPageText = isEnglish
        ? {
            subtitle: 'Preferences, progress, and future account sync.',
            accountTitle: 'Save Progress',
            accountBody: 'Your records are saved on this device for now. Account sync will open later for cross-device progress.',
            accountCta: 'Coming soon',
            languageHint: 'Choose the default display language.',
            soundHint: 'Controls tap, success, error, score, and reward sounds.',
            dailyTitle: 'Training Records',
            dailyBody: 'View your daily, weekly, and monthly training progress.',
            dailyPageSubtitle: 'Your daily rhythm and weekly progress, in one place.',
            backToSettings: 'Back to Settings',
            dailyEnter: 'Open',
            recordsSubtitle: 'A clear view of your practice rhythm and progress.',
            recordsDay: 'Day',
            recordsWeek: 'Week',
            recordsMonth: 'Month',
            recordsTrend: 'Performance',
            recordsTrendHint: 'See how steady your responses are over time.',
            recordsEffect: 'Accuracy trend',
            recordsTrainingDays: 'Training days',
            recordsSessions: 'Completed',
            recordsMinutes: 'Minutes',
            recordsAccuracy: 'Accuracy',
            recordsBestScore: 'Best score',
            recordsFrequency: 'Training frequency',
            recordsHeatmap: 'Training rhythm',
            recordsLess: 'Less',
            recordsMore: 'More',
            recordsCurrentStreak: 'Current streak',
            recordsTaskMix: 'Your training preference',
            recordsPreferenceHint: 'The challenges you keep coming back to.',
            recordsSchulte: 'Schulte progress',
            recordsTodayCta: "Start today's challenge",
            recordsContinueCta: 'Continue training',
            recordsTodayHint: 'One focused session is enough to keep the rhythm going.',
            recordsDailyBridge: "Today's challenge",
            recordsDailyDone: 'Completed today',
            recordsDailyOpen: 'Open challenge',
            recordsDailyAgain: 'Try again',
            recordsSelectedDay: 'Day record',
            recordsNoSessions: 'No sessions recorded',
            recordsSessionCount: 'sessions',
            recordsTaskLabel: 'Most practiced',
            recordsPerformance: 'Task performance',
            recordsNoTaskData: 'Keep training to reveal how each challenge feels over time.',
            recordsNoData: 'Complete a game and your personal record will appear here.',
            recordsBack: 'Back to Settings',
            dailyCta: 'Open Daily',
            reportCta: 'View weekly report',
            dataTitle: 'Local Data',
            dataBody: 'Current records are stored locally. Cloud sync will be added after accounts are ready.',
            exportData: 'Export data',
            localOnly: 'Local only'
        }
        : {
            subtitle: '管理语言、音效、成长记录和未来同步。',
            accountTitle: '保存进度',
            accountBody: '目前记录会保存在这台设备上。之后开放账户后，可以同步 Daily streak 和历史记录。',
            accountCta: '即将开放',
            languageHint: '选择默认显示语言。',
            soundHint: '控制点击、答对、答错、计分和奖励音效。',
            dailyTitle: '训练记录',
            dailyBody: '查看每日、每周和每月的训练数据与变化。',
            dailyPageSubtitle: '查看每日挑战进度，也回顾这一周的成长轨迹。',
            backToSettings: '返回设置',
            dailyEnter: '进入',
            recordsSubtitle: '清楚看见自己的训练节奏和变化。',
            recordsDay: '日',
            recordsWeek: '周',
            recordsMonth: '月',
            recordsTrend: '训练效果',
            recordsTrendHint: '看看自己的状态是否变得更稳定。',
            recordsEffect: '正确率变化',
            recordsTrainingDays: '训练天数',
            recordsSessions: '完成次数',
            recordsMinutes: '训练分钟',
            recordsAccuracy: '平均正确率',
            recordsBestScore: '最高分',
            recordsFrequency: '训练频率',
            recordsHeatmap: '训练节奏',
            recordsLess: '少',
            recordsMore: '多',
            recordsCurrentStreak: '当前连续',
            recordsTaskMix: '你的训练偏好',
            recordsPreferenceHint: '看看哪些挑战让你最愿意一次次回来。',
            recordsSchulte: '舒尔特变化',
            recordsTodayCta: '开始今日挑战',
            recordsContinueCta: '继续训练',
            recordsTodayHint: '完成一局专注训练，就能继续保持现在的节奏。',
            recordsDailyBridge: '今日挑战',
            recordsDailyDone: '今天已完成',
            recordsDailyOpen: '进入挑战',
            recordsDailyAgain: '再挑战一次',
            recordsSelectedDay: '当天记录',
            recordsNoSessions: '这一天还没有训练记录',
            recordsSessionCount: '局',
            recordsTaskLabel: '最常练习',
            recordsPerformance: '各玩法表现',
            recordsNoTaskData: '继续完成几局训练后，这里会显示每个玩法的表现。',
            recordsNoData: '完成一局训练后，这里会出现你的个人记录。',
            recordsBack: '返回设置',
            dailyCta: '打开 Daily',
            reportCta: '查看本周周报',
            dataTitle: '本地数据',
            dataBody: '当前记录仅保存在本地。登录功能完成后再接入云端同步。',
            exportData: '导出数据',
            localOnly: '本地保存'
        };
    const weeklyReportPromptText = isEnglish
        ? {
            title: 'Last week’s record is ready',
            body: 'Take a quiet look at the work you put in last week.',
            primary: 'View last week’s record',
            secondary: 'Later'
        }
        : {
            title: '上周训练记录已生成',
            body: '看看上周的训练，给自己的进步留下一点记录。',
            primary: '查看上周记录',
            secondary: '稍后再看'
        };

    useEffect(() => {
        if (view !== 'weekly-report' || !weeklyReportUnlocked) {
            setWeeklyReportStep(0);
            setWeeklyReportCount(0);
            setWeeklyReportScore(0);
            return undefined;
        }

        setWeeklyReportStep(0);
        setWeeklyReportCount(0);
        setWeeklyReportScore(0);
        weeklyReportSoundTickRef.current = { count: 0, scoreStep: -1, lastAt: 0 };
        const timers = [
            setTimeout(() => { setWeeklyReportStep(1); playSound('reportStep1'); }, 260),
            setTimeout(() => { setWeeklyReportStep(2); playSound('reportStep2'); }, 1250),
            setTimeout(() => { setWeeklyReportStep(3); playSound('reportStep3'); }, 2200),
            setTimeout(() => { setWeeklyReportStep(4); playSound('reportStep4'); }, 3150),
            setTimeout(() => { setWeeklyReportStep(5); playSound('reportStep5'); }, 4100)
        ];
        const target = Math.max(0, Number(weeklyReport.completedDays) || 0);
        let count = 0;
        let countTimer;
        const countStartTimer = setTimeout(() => {
            countTimer = setInterval(() => {
                if (target <= 0) {
                    clearInterval(countTimer);
                    return;
                }
                count = Math.min(target, count + Math.max(1, Math.ceil(target / 8)));
                setWeeklyReportCount(count);
                playSound('scoreTick');
                if (count >= target) clearInterval(countTimer);
            }, 90);
        }, 300);
        let scoreTimer;
        const scoreStartTimer = setTimeout(() => {
            let currentScore = 0;
            scoreTimer = setInterval(() => {
                if (weeklyReportScoreTarget <= 0) {
                    clearInterval(scoreTimer);
                    return;
                }
                currentScore = Math.min(weeklyReportScoreTarget, currentScore + Math.max(1, Math.ceil(weeklyReportScoreTarget / 28)));
                setWeeklyReportScore(currentScore);
                const scoreStep = Math.floor((currentScore / weeklyReportScoreTarget) * 10);
                const now = Date.now();
                if (scoreStep !== weeklyReportSoundTickRef.current.scoreStep && now - weeklyReportSoundTickRef.current.lastAt > 58) {
                    weeklyReportSoundTickRef.current = { ...weeklyReportSoundTickRef.current, scoreStep, lastAt: now };
                    playSound(scoreStep > 6 ? 'scoreTickHigh' : 'scoreTick');
                }
                if (currentScore >= weeklyReportScoreTarget) clearInterval(scoreTimer);
            }, 34);
        }, 2140);

        return () => {
            timers.forEach(timer => clearTimeout(timer));
            clearTimeout(countStartTimer);
            if (countTimer) clearInterval(countTimer);
            clearTimeout(scoreStartTimer);
            if (scoreTimer) clearInterval(scoreTimer);
        };
    }, [view, weeklyReport.completedDays, weeklyReportScoreTarget, weeklyReportUnlocked]);

    useEffect(() => {
        if (view !== 'home' || showUpdateNote || (!isMonday && !isWeeklyReportPromptPreview)) return;
        if (!mondayWeeklyReport.hasData && !isWeeklyReportPromptPreview) return;
        const promptKey = `pfl_weekly_report_prompt_${dailySpec.day}`;
        try {
            if (localStorage.getItem(promptKey)) return;
        } catch (error) { }
        setShowWeeklyReportPrompt(true);
    }, [dailySpec.day, isMonday, isWeeklyReportPromptPreview, mondayWeeklyReport.hasData, showUpdateNote, view]);

    const [schulte, setSchulte] = useState({ grid: [], next: 1 });
    const [stroop, setStroop] = useState({ text: '', color: '', opts: [] });
    const [nback, setNback] = useState({ current: null, previous: null, isMatch: false, isReady: false, roundId: null, roundNumber: 0 });
    const [setGame, setSetGame] = useState({ cards: [], selected: [] });
    const [neuronCount, setNeuronCount] = useState({ items: [], target: {}, targetCount: 0, currentCount: 0 });
    const [controlPulse, setControlPulse] = useState(null);
    const nbackSeq = useRef([]);
    const nbackWarmupRef = useRef(false);
    const setgameWarmupRef = useRef(false);
    const feedbackTimer = useRef(null);
    const controlPulseTimer = useRef(null);
    const neuronMoveTimer = useRef(null);
    const resultScoreFrame = useRef(null);
    const resultScoreTickRef = useRef({ lastAt: 0, lastStep: 0 });
    const answerLock = useRef(false);
    const sessionIdRef = useRef(`session-${Date.now()}-${Math.random().toString(16).slice(2)}`);
    const currentRunRef = useRef(null);
    const runStatsRef = useRef({ task: null, attempts: 0, correct: 0, incorrect: 0, startedAtMs: 0 });
    const soundEngineRef = useRef(null);

    if (!soundEngineRef.current) {
        soundEngineRef.current = createSoundEngine();
    }

    const playSound = (kind, forceEnabled = false) => {
        soundEngineRef.current?.play(kind, forceEnabled || soundEnabled);
    };

    const toggleSound = () => {
        const nextEnabled = !soundEnabled;
        setSoundEnabled(nextEnabled);
        try {
            localStorage.setItem(SOUND_STORAGE_KEY, nextEnabled ? 'on' : 'off');
        } catch (error) {
            // Sound preference is nice-to-have; keep the app usable if storage is blocked.
        }
        if (nextEnabled) {
            soundEngineRef.current?.play('success', true);
        }
    };

    const getFeedback = (stats) => {
        const attempts = stats?.attempts || 0;
        const correct = stats?.correct || 0;
        const durationSeconds = Math.max(1, stats?.durationSeconds || 0);
        const accuracy = attempts ? (correct / attempts) * 100 : 0;
        const pace = (correct / durationSeconds) * 60;
        const task = stats?.task;
        const volumeTargets = { schulte: 25, stroop: 12, nback: 10, setgame: 3, neuroncount: 3, arena: 12 };
        const fastPaceTargets = { stroop: 28, nback: 24, setgame: 5, neuroncount: 5, arena: 18 };
        const hasEnoughVolume = correct >= (volumeTargets[task] || 8);
        const isFast = task === 'schulte'
            ? correct >= 25 && durationSeconds <= 45
            : pace >= (fastPaceTargets[task] || 18);

        let tier = 0;
        if (stats?.isImproved) tier = 4;
        else if (!hasEnoughVolume || attempts === 0) tier = 0;
        else if (isFast && accuracy >= 90) tier = 3;
        else if (isFast) tier = 2;
        else if (accuracy >= 90) tier = 1;

        return RESULT_TEXT[lang][tier];
    };

    const getResultPresentation = ({ isDailyResult, resultAccuracy }) => {
        if (isDailyResult) {
            return {
                icon: dailyStreak > 0 ? 'flame' : 'badge-check',
                className: 'is-daily'
            };
        }

        if (lastRunStats?.isImproved) {
            return { icon: 'trophy', className: 'is-record' };
        }

        if (resultAccuracy >= 92 && lastScore >= 500) {
            return { icon: 'sparkles', className: 'is-excellent' };
        }

        if (resultAccuracy >= 80) {
            return { icon: 'zap', className: 'is-sharp' };
        }

        if (resultAccuracy >= 60) {
            return { icon: 'badge-check', className: 'is-steady' };
        }

        return { icon: 'brain', className: 'is-warmup' };
    };

    const recordAttempt = (correct) => {
        const stats = runStatsRef.current;
        stats.attempts += 1;
        if (correct) stats.correct += 1;
        else stats.incorrect += 1;
    };

    const pulseControl = (target) => {
        if (controlPulseTimer.current) clearTimeout(controlPulseTimer.current);
        setControlPulse(target);
        controlPulseTimer.current = setTimeout(() => {
            setControlPulse(null);
            controlPulseTimer.current = null;
        }, 180);
    };

    const initGameCore = (type) => {
        const isHard = isChallengeDifficulty;
        if (type === 'schulte') {
            const variant = currentRunRef.current?.dailyVariant;
            const cols = variant === 'grid6' ? 6 : 5;
            const count = cols * cols; // 25 或 36
            const symbols = variant === 'letters'
                ? Array.from({ length: count }, (_, i) => String.fromCharCode(65 + i)) // A..Y
                : Array.from({ length: count }, (_, i) => i + 1);              // 1..N
            const sequence = variant === 'reverse' ? [...symbols].reverse() : symbols;
            const grid = [...symbols].sort(() => Math.random() - 0.5);
            setSchulte({ grid, sequence, index: 0, next: sequence[0], cols });
        } else if (type === 'stroop') {
            const colors = COLOR_LABELS;
            const validPairs = colors.flatMap((textColor, textIndex) =>
                colors
                    .map((fontColor, colorIndex) => ({ textColor, fontColor, textIndex, colorIndex }))
                    .filter(pair => pair.textIndex !== pair.colorIndex)
            );

            setStroop(previous => {
                const availablePairs = validPairs.filter(pair =>
                    pair.textColor.zh !== previous.textZh || pair.fontColor.val !== previous.color
                );
                const pair = availablePairs[Math.floor(Math.random() * availablePairs.length)];

                return {
                    roundId: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                    textZh: pair.textColor.zh,
                    textEn: pair.textColor.en,
                    color: pair.fontColor.val,
                    opts: [...colors].sort(() => Math.random() - 0.5)
                };
            });
        } else if (type === 'nback') {
            const level = isHard ? 2 : 1;
            const round = createNbackRound(nbackSeq.current, level);
            nbackSeq.current.push(round.current);
            setNback(previousRound => ({
                ...round,
                previous: previousRound.current,
                roundId: `${Date.now()}-${nbackSeq.current.length}`,
                roundNumber: nbackSeq.current.length
            }));
            // 在 initGameCore 的 setgame 分支中修改：
        } else if (type === 'setgame') {
            const shapes = ['circle', 'square', 'triangle'];
            const colors = ['#EF4444', '#3B82F6', '#10B981'];
            const isHard = isChallengeDifficulty;

            // 逻辑判定：0代表全同，1代表全异
            const logic = {
                color: Math.floor(Math.random() * 2),
                shape: Math.floor(Math.random() * 2),
                fill: 0 // 只有两档透明度,3 张凑不出"全不同",所以透明度只用"全同"
            };

            // 强制至少有一个属性是“全异”，否则三张牌长得一模一样
            if (Object.values(logic).every(v => v === 0)) logic.shape = 1;

            // 首玩带教三板:①颜色全同(同色不同形) ②图形全同(同形不同色) ③全异(都不同)
            if (setgameWarmupRef.current === 3) { logic.color = 0; logic.shape = 1; logic.fill = 0; }
            else if (setgameWarmupRef.current === 2) { logic.color = 1; logic.shape = 0; logic.fill = 0; }
            else if (setgameWarmupRef.current === 1) { logic.color = 1; logic.shape = 1; logic.fill = 0; }

            // 1. 生成正确解 (3张)。进阶:三张共用一个随机透明度(实心或半透明);基础:恒为实心
            const solutionFill = isHard ? SET_FILL_LEVELS[Math.floor(Math.random() * SET_FILL_LEVELS.length)] : SET_FILL_LEVELS[0];
            let solution = [];
            for (let i = 0; i < 3; i++) {
                solution.push({
                    color: logic.color === 0 ? colors[0] : colors[i],
                    shape: logic.shape === 0 ? shapes[0] : shapes[i],
                    fillLevel: solutionFill,
                    isSolution: true
                });
            }

            // 2. 生成干扰项 (6张)
            const fillers = Array.from({ length: 6 }, () => ({
                shape: shapes[Math.floor(Math.random() * 3)],
                color: colors[Math.floor(Math.random() * 3)],
                fillLevel: isHard ? SET_FILL_LEVELS[Math.floor(Math.random() * SET_FILL_LEVELS.length)] : SET_FILL_LEVELS[0],
                isSolution: false
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
        // 首玩引导:SET / N-Back 这类需要先懂规则的游戏,第一次玩先弹规则卡(竞技/每日不拦)。
        // storage 不可用时默认放行,避免卡住开局。
        if (type && (type === 'setgame' || type === 'nback') && mode !== 'comp' && mode !== 'daily') {
            let rulesSeen = true;
            try { rulesSeen = !!localStorage.getItem(`pfl_rules_seen_${type}`); } catch (e) { rulesSeen = true; }
            if (!rulesSeen) {
                playSound('tap');
                setShowInfo(type);
                return;
            }
        }
        playSound('start');
        clearAnswerFeedback();
        setScore(0);
        nbackSeq.current = [];
        const activeDailySpec = getDailySpec();
        const taskType = mode === 'daily' ? activeDailySpec.task : type;
        // N-Back 首玩带教:新手第一局基础 N-Back,前 3 个答题轮做脚手架(露出上一个数字 + 不扣分)。
        // 一次性,标记后永不再触发;进阶/竞技/每日不带教。storage 不可用时默认不带教。
        if (taskType === 'nback' && mode !== 'comp' && mode !== 'daily' && !isChallengeDifficulty) {
            let warmupDone = true;
            try { warmupDone = !!localStorage.getItem('pfl_nback_warmup_done'); } catch (e) { warmupDone = true; }
            nbackWarmupRef.current = !warmupDone;
            if (!warmupDone) { try { localStorage.setItem('pfl_nback_warmup_done', '1'); } catch (e) { } }
        } else {
            nbackWarmupRef.current = false;
        }
        // SET 首玩带教:新手第一局基础 SET,第一板给一个高亮的清晰范例 + 不扣分,解出后转正常。
        if (taskType === 'setgame' && mode !== 'comp' && mode !== 'daily') {
            const setKey = isChallengeDifficulty ? 'pfl_setgame_warmup_done_hard' : 'pfl_setgame_warmup_done';
            let setDone = true;
            try { setDone = !!localStorage.getItem(setKey); } catch (e) { setDone = true; }
            setgameWarmupRef.current = setDone ? 0 : 3; // 3=颜色全同, 2=图形全同, 1=全异, 0=转正常
            if (!setDone) { try { localStorage.setItem(setKey, '1'); } catch (e) { } }
        } else {
            setgameWarmupRef.current = 0;
        }
        const taskName = mode === 'comp' ? 'arena' : mode === 'daily' ? 'daily' : taskType;
        runStatsRef.current = {
            task: mode === 'comp' ? 'arena' : taskType,
            attempts: 0,
            correct: 0,
            incorrect: 0,
            startedAtMs: Date.now()
        };
        setLastRunStats(null);
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
        if (nextType === 'setgame' && !shouldAdvance) {
            setSetGame(previous => ({ ...previous, selected: [], errorIds: [] }));
        }
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
        recordAttempt(correct);
        playSound(correct ? 'success' : 'error');

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
            playSound('tap');
            initGameCore('nback');
            return;
        }
        const nbackAnswerable = nback.roundNumber - (isChallengeDifficulty ? 2 : 1);
        const isWarmup = nbackWarmupRef.current && !isChallengeDifficulty && nbackAnswerable >= 1 && nbackAnswerable <= 3;
        const isCorrect = answerIsMatch === nback.isMatch;
        showAnswerFeedback({
            correct: isCorrect,
            points: 30,
            penalty: isWarmup ? 0 : 10,
            nextType: 'nback',
            target: answerIsMatch ? 'match' : 'different',
            advance: true,
            event,
            flashError: false,
            duration: 220
        });
    };

    const getCurrentRunAnalytics = () => {
        const stats = runStatsRef.current || {};
        const durationSeconds = stats.startedAtMs
            ? Math.max(1, Math.round((Date.now() - stats.startedAtMs) / 1000))
            : 0;

        return {
            score,
            attempts: stats.attempts || 0,
            correct: stats.correct || 0,
            incorrect: stats.incorrect || 0,
            accuracy: stats.attempts ? Math.round(((stats.correct || 0) / stats.attempts) * 100) : 0,
            durationSeconds
        };
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
        const isComp = mode === 'comp';
        const isDaily = mode === 'daily';
        const isInfinite = mode === 'infinite';
        const previousBest = isComp
            ? (history.bestCompScore || 0)
            : isDaily
                ? (dailyRecord.bestScore || 0)
                : isInfinite
                    ? 0
                    : (history.taskBestScores?.[view] || 0);
        const runStats = {
            ...runStatsRef.current,
            isImproved: previousBest > 0 && currentFinalScore > previousBest,
            durationSeconds: runStatsRef.current.startedAtMs
                ? Math.max(1, Math.round((Date.now() - runStatsRef.current.startedAtMs) / 1000))
                : 0
        };
        setLastScore(currentFinalScore);
        setLastRunStats(runStats);

        const completedTask = currentRunRef.current?.task || (isComp ? 'arena' : view);
        recordRetention('game_complete', {
            sessionId: sessionIdRef.current,
            task: completedTask,
            mode,
            score: currentFinalScore,
            attempts: runStats.attempts,
            correct: runStats.correct,
            incorrect: runStats.incorrect,
            accuracy: runStats.attempts ? Math.round((runStats.correct / runStats.attempts) * 100) : 0,
            dailyChallengeId: currentRunRef.current?.dailyChallengeId || null,
            dailyInstanceId: currentRunRef.current?.dailyInstanceId || null,
            dailyTask: currentRunRef.current?.dailyTask || null,
            dailyDay: currentRunRef.current?.dailyDay || null,
            dailyVariant: currentRunRef.current?.dailyVariant || null,
            dailyCompletion: currentRunRef.current?.dailyCompletion || null,
            dailyDuration: currentRunRef.current?.dailyDuration || null,
            durationSeconds: runStats.durationSeconds
        });

        if (isDaily) {
            const day = currentRunRef.current?.dailyDay || getDayKey();
            const dailyTask = currentRunRef.current?.dailyTask || view;
            const previousDailyDays = dailyProgress.days || {};
            const previousDayRecord = previousDailyDays[day] || {};
            const previousWeeklyGoalCount = Math.min(
                getWeeklyDailyDays(previousDailyDays, day).filter(weekDay => weekDay.completed).length,
                WEEKLY_DAILY_GOAL
            );
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
            if (!previousDayRecord.completed) {
                setDailyWeekAdvance({
                    day,
                    from: previousWeeklyGoalCount,
                    to: Math.min(previousWeeklyGoalCount + 1, WEEKLY_DAILY_GOAL),
                    key: Date.now()
                });
            }
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
            if (resultScoreFrame.current) cancelAnimationFrame(resultScoreFrame.current);
        };
    }, []);

    // 测试用:URL 带 ?newbie 时清掉新手引导记录,让规则卡/带教重新出现
    useEffect(() => {
        try {
            if (new URLSearchParams(window.location.search).has('newbie')) {
                ['pfl_rules_seen_setgame', 'pfl_rules_seen_nback', 'pfl_nback_warmup_done', 'pfl_setgame_warmup_done', 'pfl_setgame_warmup_done_hard']
                    .forEach(k => localStorage.removeItem(k));
            }
        } catch (e) { }
    }, []);

    useEffect(() => {
        if (resultScoreFrame.current) {
            cancelAnimationFrame(resultScoreFrame.current);
            resultScoreFrame.current = null;
        }

        if (view !== 'result') {
            setAnimatedScore(0);
            return;
        }

        const targetScore = Math.max(0, Math.round(lastScore || 0));
        if (!targetScore || window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
            setAnimatedScore(targetScore);
            setTimeout(() => playSound(mode === 'daily' ? 'daily' : 'complete'), 120);
            return;
        }

        const duration = Math.min(920, Math.max(560, 460 + targetScore * 0.45));
        const startedAt = performance.now();
        resultScoreTickRef.current = { lastAt: 0, lastStep: -1 };

        const tick = (now) => {
            const progress = Math.min(1, (now - startedAt) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const nextScore = Math.round(targetScore * eased);
            setAnimatedScore(nextScore);

            const tickStep = Math.floor(progress * 10);
            if (soundEnabled && tickStep !== resultScoreTickRef.current.lastStep && now - resultScoreTickRef.current.lastAt > 58) {
                resultScoreTickRef.current = { lastAt: now, lastStep: tickStep };
                playSound(tickStep > 6 ? 'scoreTickHigh' : 'scoreTick');
            }

            if (progress < 1) {
                resultScoreFrame.current = requestAnimationFrame(tick);
            } else {
                resultScoreFrame.current = null;
                setTimeout(() => playSound(mode === 'daily' ? 'daily' : 'complete'), 90);
            }
        };

        setAnimatedScore(0);
        resultScoreFrame.current = requestAnimationFrame(tick);

        return () => {
            if (resultScoreFrame.current) {
                cancelAnimationFrame(resultScoreFrame.current);
                resultScoreFrame.current = null;
            }
        };
    }, [view, lastScore]);

    useEffect(() => {
        if (!dailyWeekAdvance || view !== 'home' || mode !== 'daily') return undefined;
        const clearDelay = dailyWeekAdvance.to >= WEEKLY_DAILY_GOAL ? 1800 : 1350;
        const timer = setTimeout(() => {
            setDailyWeekAdvance(null);
        }, clearDelay);

        return () => clearTimeout(timer);
    }, [dailyWeekAdvance, view, mode]);

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

    // N-Back 首玩带教:当前是否处于"露出上一张卡 + 不扣分"的热身答题轮(前 3 题)
    const nbackAnswerableIndex = nback.roundNumber - (isChallengeDifficulty ? 2 : 1);
    const isNbackWarmupRound = nbackWarmupRef.current && !isChallengeDifficulty && nback.isReady
        && nbackAnswerableIndex >= 1 && nbackAnswerableIndex <= 3;

    return (
        <div className={`app-shell h-full flex flex-col relative ${isGameView ? 'overflow-hidden' : 'overflow-y-auto'} transition-colors duration-200 ${isError ? 'arena-flash' : 'bg-slate-50'} text-slate-900 select-none`}>

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
                <>
                    <button
                        type="button"
                        className="settings-scrim"
                        aria-label="Close settings"
                        onClick={() => setShowSettings(false)}
                    />
                    {renderSettingsPanel()}
                </>
            )}

            {showWeeklyReportPrompt && view === 'home' && !showUpdateNote && (
                <div className="weekly-report-prompt fixed inset-0 z-[105] flex items-center justify-center p-5 backdrop-blur-md bg-slate-900/35">
                    <div className="weekly-report-prompt-card">
                        <div className="weekly-report-prompt-icon">
                            <Icon name="chart-no-axes-combined" className="w-6 h-6" />
                        </div>
                        <div className="weekly-report-prompt-kicker">WEEKLY RECORD</div>
                        <h2>{weeklyReportPromptText.title}</h2>
                        <p>{weeklyReportPromptText.body}</p>
                        <button type="button" className="weekly-report-prompt-primary" onClick={openWeeklyReportPrompt}>
                            <Icon name="arrow-right" className="w-4 h-4" />
                            {weeklyReportPromptText.primary}
                        </button>
                        <button type="button" className="weekly-report-prompt-secondary" onClick={() => {
                            playSound('tap');
                            markWeeklyReportPromptSeen();
                        }}>
                            {weeklyReportPromptText.secondary}
                        </button>
                    </div>
                </div>
            )}

            {showFirstPlayNudge && view === 'home' && mode === 'normal' && (!showUpdateNote || urlParams.has('suppressUpdate')) && (
                <div className="first-play-nudge fixed inset-0 z-[100] flex items-center justify-center p-5">
                    <div className="first-play-nudge-card" role="dialog" aria-modal="true">
                        <div className="first-play-nudge-icon"><Icon name="target" className="w-6 h-6" /></div>
                        <div className="first-play-nudge-kicker">{ui.firstPlayKicker}</div>
                        <h2>{ui.firstPlayTitle}</h2>
                        <p>{ui.firstPlayBody}</p>
                        <button type="button" className="first-play-nudge-primary" onClick={() => closeFirstPlayNudge(true)}>
                            <Icon name="play" className="w-4 h-4" />
                            {ui.firstPlayStart}
                        </button>
                        <button type="button" className="first-play-nudge-secondary" onClick={() => closeFirstPlayNudge(false)}>
                            {ui.firstPlayLater}
                        </button>
                    </div>
                </div>
            )}

            {(view === 'home' || view === 'analytics' || view === 'settings' || view === 'settings-daily') && (
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
                                {item.key === 'settings' ? (
                                    <span className="nav-avatar-glyph" aria-hidden="true" />
                                ) : (
                                    <Icon name={item.icon} className="w-5 h-5" />
                                )}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            )}

            {view === 'home' && (
                <div className={`home-screen app-content-screen p-6 pt-10 flex flex-col items-center h-full overflow-y-auto no-scrollbar relative ${mode === 'daily' ? 'is-daily-home' : mode === 'comp' ? 'is-arena-home' : 'is-training-home'}`}>
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
                                    <div className="score-value text-4xl font-black">{mode === 'comp' ? (history.bestCompScore || 0) : mode === 'infinite' ? '∞' : displayedBestScore}</div>
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
                                            if (isLocked) {
                                                playSound('error');
                                                return; // 拦截点击
                                            }
                                            playSound('tap');
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
                            <>
                                <div
                                    data-analytics-task="daily"
                                    data-analytics-label={GAME_CLICK_LABELS.daily}
                                    className="daily-challenge-card bg-white rounded-[1.8rem] border-2 border-emerald-100 shadow-md overflow-hidden"
                                >
                                    <div className={`daily-card-hero daily-theme-${dailySpec.task} p-5 text-white relative overflow-hidden`}>
                                        <div className={`daily-hero-motif is-${dailySpec.task}`} aria-hidden="true">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <div className="relative z-10 flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="text-[10px] font-black brand-text opacity-75">{ui.dailyTitle}</div>
                                                <div className="mt-1 text-2xl font-black leading-tight">{dailyTheme.title}</div>
                                                <div className="mt-1 text-xs font-extrabold opacity-95 leading-relaxed">{dailyTheme.subtitle}</div>
                                            </div>
                                            <div className="daily-hero-task-icon w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur">
                                                <Icon name={TASK_DATA[dailySpec.task].icon} className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <div className="absolute -right-8 -bottom-10 opacity-15">
                                            <Icon name="calendar-check" className="w-32 h-32" />
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="daily-goal-box">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="daily-task-icon w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
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

                                        <div
                                            className={`daily-week-panel ${dailyWeeklyGoalComplete ? 'is-rewarded' : ''} ${activeDailyWeekAdvance ? 'is-advancing' : ''} ${shouldCelebrateWeeklyGoal ? 'is-celebrating' : ''}`}
                                            style={dailyWeekProgressStyle}
                                        >
                                            {shouldCelebrateWeeklyGoal && (
                                                <div className="daily-week-confetti" aria-hidden="true">
                                                    {Array.from({ length: 24 }, (_, index) => <span key={index}></span>)}
                                                </div>
                                            )}
                                            <div className="daily-week-header">
                                                <div className="daily-week-heading">
                                                    <div>
                                                        <div className="daily-week-kicker">{ui.dailyWeek}</div>
                                                        <div className="daily-week-goal-main">{`${ui.dailyWeeklyGoal} ${dailyWeeklyGoalCount}/${WEEKLY_DAILY_GOAL}`}</div>
                                                    </div>
                                                </div>
                                                <div className="daily-week-goal-text">{`${dailyWeeklyGoalCount}/${WEEKLY_DAILY_GOAL}`}</div>
                                            </div>
                                            <div className="daily-week-progress" aria-hidden="true">
                                                <div style={{ width: activeDailyWeekAdvance ? 'var(--daily-week-to)' : `${dailyWeeklyProgress}%` }} />
                                            </div>
                                            <div className="daily-week-row">
                                                {previewDailyWeekDays.map(day => (
                                                    <div key={day.day} className="daily-week-item">
                                                        <div className={`daily-week-dot ${day.completed ? 'is-complete' : ''} ${day.isToday ? 'is-today' : ''}`}>
                                                            {day.completed ? <Icon name="check" className="w-3.5 h-3.5" /> : ''}
                                                        </div>
                                                        <div className="daily-week-label">{dailyWeekLabels[day.weekday]}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={`daily-tomorrow-panel ${dailyRecord.completed ? 'is-unlocked' : ''}`}>
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="daily-tomorrow-icon">
                                                    <Icon name={dailyRecord.completed ? TASK_DATA[tomorrowSpec.task].icon : 'lock'} className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] font-black brand-text text-slate-400">{ui.dailyTomorrowPreview}</div>
                                                    <div className="text-xs font-black text-slate-700 truncate">
                                                        {dailyRecord.completed
                                                            ? `${ui.dailyTomorrowPrefix}: ${tomorrowCategory}`
                                                            : ui.dailyTomorrowLocked}
                                                    </div>
                                                </div>
                                            </div>
                                            {dailyRecord.completed && (
                                                <div className="daily-tomorrow-chip">{tomorrowTheme.title}</div>
                                            )}
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
                            </>
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
                                        <button onClick={(event) => { event.stopPropagation(); playSound('tap'); setShowInfo(type); }} className="info-button p-2 ml-1 text-slate-300"><Icon name="info" className="w-5 h-5" /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {view === 'settings' && (
                <div className="settings-screen my-page-screen app-content-screen h-full overflow-y-auto no-scrollbar bg-slate-50 px-5 py-5">
                    <div className="settings-page-wrap">
                        <div className="settings-page-hero my-page-hero">
                            <div>
                                <h2>{ui.settings}</h2>
                                <p>{isEnglish ? 'Your training record and preferences.' : '\u4f60\u7684\u8bad\u7ec3\u8bb0\u5f55\u4e0e\u504f\u597d\u8bbe\u7f6e\u3002'}</p>
                            </div>
                        </div>

                        <div className="my-page-section-label">{isEnglish ? 'THIS WEEK' : '\u672c\u5468\u72b6\u6001'}</div>

                        <div className="my-progress-card">
                            <div className="my-progress-card-head">
                                <div>
                                    <span>{isEnglish ? 'Your rhythm so far' : '\u4f60\u7684\u8bad\u7ec3\u8282\u594f'}</span>
                                    <strong>{isEnglish ? `${trainingRecords.completedDays} training days` : `${trainingRecords.completedDays} \u5929\u8bad\u7ec3`}</strong>
                                </div>
                            </div>
                            <div className="my-progress-stats">
                                <div><strong>{trainingRecords.completedDays}</strong><span>{isEnglish ? 'Days' : '\u8bad\u7ec3\u5929\u6570'}</span></div>
                                <div><strong>{trainingRecords.totalSessions}</strong><span>{isEnglish ? 'Sessions' : '\u5b8c\u6210\u6b21\u6570'}</span></div>
                                <div><strong>{trainingRecords.bestScore || '-'}</strong><span>{isEnglish ? 'Best score' : '\u6700\u9ad8\u5206'}</span></div>
                            </div>
                            <button
                                type="button"
                                className="my-progress-link"
                                onClick={() => {
                                    playSound('tap');
                                    setView('training-records');
                                }}
                            >
                                <span>{settingsPageText.dailyTitle}</span>
                                <Icon name="chevron-right" className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="my-sync-note">
                            <div className="my-sync-note-icon"><Icon name="cloud" className="w-4 h-4" /></div>
                            <div className="settings-page-card-copy">
                                <div className="settings-page-card-title">{settingsPageText.accountTitle}</div>
                                <div className="settings-page-card-body">{settingsPageText.accountBody}</div>
                            </div>
                            <div className="settings-page-pill">{settingsPageText.accountCta}</div>
                        </div>

                        <div className="my-page-section-label">{isEnglish ? 'MORE' : '\u66f4\u591a\u529f\u80fd'}</div>

                        <div className="settings-page-card settings-page-group settings-my-features my-feature-list">
                            <div className="settings-page-group-row settings-page-row my-feature-row">
                                <div className="settings-page-card-icon settings-leaderboard-icon">
                                    <Icon name="trophy" className="w-5 h-5" />
                                </div>
                                <div className="settings-page-card-copy">
                                    <div className="settings-page-card-title">{isEnglish ? 'Leaderboard' : '排行榜'}</div>
                                    <div className="settings-page-card-body">{isEnglish ? 'Compare your best runs with the wider lab.' : '和实验室里的其他玩家比较最佳成绩。'}</div>
                                </div>
                                <div className="settings-page-pill">{ui.settingsSoon}</div>
                            </div>

                            <div className="settings-page-group-divider" />

                                <div className="settings-page-group-row settings-page-row my-feature-row">
                                    <div className="settings-page-card-icon settings-achievements-icon">
                                        <svg className="achievement-badge-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                                            <path d="M10 22.5 8.2 29l7.8-4.1L23.8 29 22 22.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                            <circle cx="16" cy="14" r="9" stroke="currentColor" strokeWidth="2" />
                                            <path d="m16 9.6 1.35 2.74 3.03.44-2.19 2.14.52 3.02L16 16.52l-2.71 1.42.52-3.02-2.19-2.14 3.03-.44L16 9.6Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                <div className="settings-page-card-copy">
                                    <div className="settings-page-card-title">{isEnglish ? 'Badges & achievements' : '勋章与成就'}</div>
                                    <div className="settings-page-card-body">{isEnglish ? 'Collect milestones as your training rhythm grows.' : '随着训练节奏成长，收集属于你的里程碑。'}</div>
                                </div>
                                <div className="settings-page-pill">{ui.settingsSoon}</div>
                            </div>
                        </div>

                        <div className="my-page-section-label">{isEnglish ? 'PREFERENCES' : '偏好设置'}</div>

                        <div className="settings-page-card settings-page-group settings-preferences-group">
                            <div className="settings-page-group-row settings-page-group-language">
                                <div className="settings-page-row-head">
                                    <div>
                                        <div className="settings-page-card-title">{ui.settingsLanguage}</div>
                                        <div className="settings-page-card-body">{settingsPageText.languageHint}</div>
                                    </div>
                                </div>
                                <div className="settings-language-group is-page">
                                    {[
                                        { key: 'zh', label: '中文' },
                                        { key: 'en', label: 'EN' }
                                    ].map(option => (
                                        <button
                                            key={option.key}
                                            type="button"
                                            onClick={() => setLanguage(option.key)}
                                            className={`settings-language-option ${lang === option.key ? 'is-active' : ''}`}
                                            aria-pressed={lang === option.key}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="settings-page-group-divider" />

                            <div className="settings-page-group-row settings-page-row">
                                <div className="settings-page-card-icon">
                                    <Icon name={soundEnabled ? 'volume-2' : 'volume-x'} className="w-5 h-5" />
                                </div>
                                <div className="settings-page-card-copy">
                                    <div className="settings-page-card-title">{ui.settingsSound}</div>
                                    <div className="settings-page-card-body">{settingsPageText.soundHint}</div>
                                </div>
                                <button
                                    type="button"
                                    onClick={toggleSound}
                                    className={`settings-sound-toggle is-page ${soundEnabled ? 'is-active' : ''}`}
                                    aria-pressed={soundEnabled}
                                >
                                    {soundEnabled ? ui.settingsSoundOn : ui.settingsSoundOff}
                                </button>
                            </div>

                            <div className="settings-page-group-row settings-page-row">
                                <div className="settings-page-card-icon">
                                    <Icon name="hard-drive" className="w-5 h-5" />
                                </div>
                                <div className="settings-page-card-copy">
                                    <div className="settings-page-card-title">{settingsPageText.dataTitle}</div>
                                    <div className="settings-page-card-body">{settingsPageText.dataBody}</div>
                                </div>
                                <div className="settings-page-pill">{settingsPageText.localOnly}</div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {view === 'training-records' && (
                <div className="training-records-screen app-content-screen overflow-y-auto no-scrollbar bg-slate-50">
                    <div className="training-records-wrap">
                        <div className="training-records-topbar">
                            <button
                                type="button"
                                className="settings-page-back"
                                aria-label={settingsPageText.recordsBack}
                                onClick={() => {
                                    playSound('tap');
                                    setView('settings');
                                }}
                            >
                                <Icon name="chevron-left" className="w-4 h-4" />
                            </button>
                            <h1>{settingsPageText.dailyTitle}</h1>
                            <span aria-hidden="true" />
                        </div>

                        {trainingRecordsUnlocked ? (
                            <>
                        <div className="training-records-growth-card">
                            <div className="training-records-growth-mark">
                                <Icon name="sparkles" className="w-4 h-4" />
                            </div>
                            <div className="training-records-growth-copy">
                                <span>{isEnglish ? 'YOUR MOMENTUM' : '你的训练节奏'}</span>
                                <strong>{trainingRecords.growthHeadline}</strong>
                                <p>{trainingRecords.growthSummary}</p>
                            </div>
                            <div className="training-records-growth-streak">
                                <strong>{trainingRecords.heatmapStreak}</strong>
                                <span>{settingsPageText.recordsCurrentStreak}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="training-records-report-button"
                            onClick={() => {
                                playSound('tap');
                                setWeeklyReportScope('current');
                                setWeeklyReportReturnView('training-records');
                                setView('weekly-report');
                                recordRetention('click', {
                                    clickRole: 'weekly_report',
                                    clickLabel: 'Open Weekly Brain Report from Training Records'
                                });
                            }}
                        >
                            <div className="training-records-report-copy">
                                <span>{isEnglish ? 'WEEKLY RECAP' : '本周回顾'}</span>
                                <strong>{settingsPageText.reportCta}</strong>
                            </div>
                            <span className="training-records-report-action" aria-hidden="true">
                                <Icon name="chevron-left" className="w-4 h-4 training-records-report-arrow" />
                            </span>
                        </button>

                        <div
                            className="training-records-heatmap-panel"
                            onTouchStart={handleHeatmapTouchStart}
                            onTouchEnd={handleHeatmapTouchEnd}
                        >
                            <div className="training-records-panel-head training-records-heatmap-head">
                                <div>
                                    <div className="training-records-panel-kicker">{settingsPageText.recordsHeatmap}</div>
                                    <strong>{trainingRecords.monthLabel}</strong>
                                </div>
                                <div className="training-records-month-controls" aria-label={isEnglish ? 'Change month' : '切换月份'}>
                                    <button
                                        type="button"
                                        aria-label={isEnglish ? 'Previous month' : '上个月'}
                                        title={isEnglish ? 'Previous month' : '上个月'}
                                        disabled={heatmapMonthOffset <= -12}
                                        onClick={() => shiftHeatmapMonth(-1)}
                                    >
                                        <Icon name="chevron-left" className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label={isEnglish ? (heatmapMonthOffset < 0 ? 'Current month' : 'Next month') : (heatmapMonthOffset < 0 ? '回到本月' : '下个月')}
                                        title={isEnglish ? (heatmapMonthOffset < 0 ? 'Current month' : 'Next month') : (heatmapMonthOffset < 0 ? '回到本月' : '下个月')}
                                        disabled={heatmapMonthOffset >= 0}
                                        onClick={() => shiftHeatmapMonth(1)}
                                    >
                                        <svg className="training-records-month-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="training-records-heatmap-layout">
                                <div className="training-records-heatmap" aria-label={settingsPageText.recordsHeatmap}>
                                    <div className="training-records-heatmap-body">
                                        <div className="training-records-heatmap-weekdays" aria-hidden="true">
                                            {(isEnglish ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['一', '二', '三', '四', '五', '六', '日']).map((label, index) => (
                                                <span key={`${label}-${index}`}>{label}</span>
                                            ))}
                                        </div>
                                        <div className="training-records-heatmap-cells">
                                            {trainingRecords.heatmap.map((cell, index) => (
                                                <button
                                                    type="button"
                                                    key={cell.day || `empty-${index}`}
                                                    className={`training-records-heatmap-cell ${cell.empty ? 'is-empty' : `level-${cell.level}`}`}
                                                    disabled={cell.empty || cell.count === null}
                                                    onClick={() => {
                                                        if (cell.empty || cell.count === null) return;
                                                        playSound('tap');
                                                        setSelectedTrainingDay(cell.day);
                                                    }}
                                                    title={cell.count === null || !cell.day ? '' : `${cell.day}: ${cell.count} ${isEnglish ? 'sessions' : '局'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="training-records-heatmap-legend">
                                        <span>{settingsPageText.recordsLess}</span>
                                        <i className="level-0" />
                                        <i className="level-1" />
                                        <i className="level-2" />
                                        <i className="level-3" />
                                        <i className="level-4" />
                                        <span>{settingsPageText.recordsMore}</span>
                                    </div>
                                </div>
                                <div className="training-records-heatmap-summary">
                                    <span>{trainingRecords.heatmapSummaryLabel}</span>
                                    <div>
                                        <strong>{trainingRecords.heatmapCompletedDays}</strong>
                                        <small>{settingsPageText.recordsTrainingDays}</small>
                                    </div>
                                    <div>
                                        <strong>{trainingRecords.heatmapSessions}</strong>
                                        <small>{settingsPageText.recordsSessions}</small>
                                    </div>
                                    <div>
                                        <strong>{trainingRecords.heatmapStreak}</strong>
                                        <small>{settingsPageText.recordsCurrentStreak}</small>
                                    </div>
                                </div>
                            </div>
                            {selectedTrainingDay && (
                                <div className="training-records-day-detail">
                                    <div>
                                        <span>{settingsPageText.recordsSelectedDay}</span>
                                        <strong>{selectedTrainingDay}</strong>
                                    </div>
                                    {selectedTrainingDayDetail ? (
                                        <div className="training-records-day-detail-stats">
                                            <div><strong>{selectedTrainingDayDetail.sessions}</strong><span>{settingsPageText.recordsSessionCount}</span></div>
                                            <div><strong>{selectedTrainingDayDetail.accuracy === null ? '-' : `${selectedTrainingDayDetail.accuracy}%`}</strong><span>{settingsPageText.recordsAccuracy}</span></div>
                                            <div><strong>{selectedTrainingDayTask || '-'}</strong><span>{settingsPageText.recordsTaskLabel}</span></div>
                                        </div>
                                    ) : (
                                        <p>{settingsPageText.recordsNoSessions}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="training-records-section-head">
                            <div>
                                <strong>{settingsPageText.recordsTrend}</strong>
                                <span>{settingsPageText.recordsTrendHint}</span>
                            </div>
                        </div>

                        <div className="training-records-range-tabs" role="tablist" aria-label={settingsPageText.recordsTrend}>
                            {[
                                { key: 'day', label: settingsPageText.recordsDay },
                                { key: 'week', label: settingsPageText.recordsWeek },
                                { key: 'month', label: settingsPageText.recordsMonth }
                            ].map(option => (
                                <button
                                    key={option.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={recordsRange === option.key}
                                    className={recordsRange === option.key ? 'is-active' : ''}
                                    onClick={() => {
                                        playSound('tap');
                                        setRecordsRange(option.key);
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        <div className="training-records-metrics">
                            <div className="training-records-metric">
                                <span>{settingsPageText.recordsMinutes}</span>
                                <strong>{trainingRecords.totalMinutes}</strong>
                            </div>
                            <div className="training-records-metric">
                                <span>{settingsPageText.recordsAccuracy}</span>
                                <strong>{trainingRecords.accuracy}%</strong>
                            </div>
                            <div className="training-records-metric">
                                <span>{settingsPageText.recordsBestScore}</span>
                                <strong>{trainingRecords.bestScore || '-'}</strong>
                            </div>
                        </div>

                        {!trainingRecords.hasData ? (
                            <div className="training-records-empty">
                                <Icon name="brain-circuit" className="w-6 h-6" />
                                <p>{settingsPageText.recordsNoData}</p>
                            </div>
                        ) : (
                            <>
                                <div className="training-records-panel">
                                    <div className="training-records-panel-head">
                                        <div>
                                            <div className="training-records-panel-kicker">{settingsPageText.recordsEffect}</div>
                                            <strong>{trainingRecords.accuracy}% {settingsPageText.recordsAccuracy}</strong>
                                        </div>
                                        <Icon name="activity" className="w-4 h-4" />
                                    </div>
                                    <div className="training-records-bars">
                                        {trainingRecords.performanceBars.map(bar => (
                                            <div className={`training-records-bar-column ${bar.hasData ? '' : 'is-empty'}`} key={bar.key}>
                                                <div className="training-records-bar-track">
                                                    <div className="training-records-bar-fill" style={{ height: `${Math.max(8, bar.percent)}%` }} />
                                                </div>
                                                <span>{bar.label}</span>
                                                <small>{bar.hasData ? `${bar.accuracy}%` : '-'}</small>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="training-records-effect-copy">{trainingRecords.effectSummary}</p>
                                </div>

                                <div className="training-records-panel">
                                    <div className="training-records-panel-head">
                                        <div>
                                            <div className="training-records-panel-kicker">{settingsPageText.recordsTaskMix}</div>
                                            <p className="training-records-preference-copy">{trainingRecords.preferenceSummary}</p>
                                        </div>
                                        <Icon name="layers-3" className="w-4 h-4" />
                                    </div>
                                    <div className="training-records-task-list">
                                        {trainingRecords.taskMix.length ? trainingRecords.taskMix.map(item => (
                                            <div className="training-records-task-row" key={item.task}>
                                                <div className="training-records-task-name">{item.name}</div>
                                                <div className="training-records-task-track"><i style={{ width: `${Math.round((item.count / trainingRecordsMaxTask) * 100)}%` }} /></div>
                                                <strong>{item.count}</strong>
                                            </div>
                                        )) : <p className="training-records-muted">-</p>}
                                    </div>
                                </div>

                                <div className="training-records-panel training-records-performance-panel">
                                    <div className="training-records-panel-head">
                                        <div>
                                            <div className="training-records-panel-kicker">{settingsPageText.recordsPerformance}</div>
                                            <strong>{isEnglish ? 'Different games, different strengths.' : '每个玩法，都有自己的进步方式。'}</strong>
                                        </div>
                                        <Icon name="trophy" className="w-4 h-4" />
                                    </div>
                                    {trainingRecords.taskPerformance.length ? (
                                        <div className="training-records-performance-list">
                                            {trainingRecords.taskPerformance.map(item => (
                                                <div className="training-records-performance-row" key={item.task}>
                                                    <div>
                                                        <strong>{item.name}</strong>
                                                        <span>{item.count} {isEnglish ? 'sessions' : '局'}</span>
                                                    </div>
                                                    <strong>
                                                        {item.metric.type === 'time'
                                                            ? formatWeeklySeconds(item.metric.value, isEnglish)
                                                            : item.metric.type === 'accuracy'
                                                                ? `${item.metric.value}%`
                                                                : item.metric.type === 'score'
                                                                    ? `${item.metric.value}${isEnglish ? ' pts' : ' 分'}`
                                                                    : `${item.metric.value} ${isEnglish ? 'sessions' : '局'}`}
                                                    </strong>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="training-records-performance-empty">{settingsPageText.recordsNoTaskData}</p>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="training-records-next-step daily-bridge-link">
                            <div>
                                <span>{isEnglish ? 'NEXT SMALL STEP' : '下一步'}</span>
                                <strong>{settingsPageText.recordsDailyBridge} · {getTaskTitle(dailySpec.task)}</strong>
                                <p>{dailyRecord.completed ? settingsPageText.recordsDailyDone : settingsPageText.recordsTodayHint}</p>
                            </div>
                            <button
                                type="button"
                                aria-label={dailyRecord.completed ? settingsPageText.recordsDailyAgain : settingsPageText.recordsDailyOpen}
                                onClick={() => {
                                    playSound('tap');
                                    setMode('daily');
                                    setView('home');
                                }}
                            >
                                <Icon name="chevron-left" className="w-5 h-5 training-records-next-step-arrow" />
                            </button>
                        </div>
                            </>
                        ) : (
                            <div className="training-records-locked-state">
                                <div className="training-records-locked-icon">
                                    <Icon name="lock-keyhole" className="w-6 h-6" />
                                </div>
                                <span className="training-records-locked-kicker">{isEnglish ? 'TRAINING RECORDS' : '训练记录'}</span>
                                <h2>{isEnglish ? 'Your record is still taking shape' : '你的训练记录还在积累中'}</h2>
                                <p>
                                    {isEnglish
                                        ? 'Complete one full week of training to unlock your personal rhythm and progress.'
                                        : '完成一周训练后，就可以查看你的训练节奏和成长变化。'}
                                </p>
                                <div className="training-records-locked-progress">
                                    <div className="training-records-locked-progress-head">
                                        <span>{isEnglish ? 'WEEKLY FOUNDATION' : '一周基础记录'}</span>
                                        <strong>{Math.min(7, trainingRecords.lifetimeTrainingDays)} / 7</strong>
                                    </div>
                                    <div className="training-records-locked-progress-track">
                                        <span style={{ width: `${Math.min(100, (trainingRecords.lifetimeTrainingDays / 7) * 100)}%` }} />
                                    </div>
                                    <small>{isEnglish ? `${Math.max(0, 7 - trainingRecords.lifetimeTrainingDays)} more training days to go` : `还需要 ${Math.max(0, 7 - trainingRecords.lifetimeTrainingDays)} 天训练`}</small>
                                </div>
                                <button
                                    type="button"
                                    className="training-records-locked-cta"
                                    onClick={() => {
                                        playSound('tap');
                                        setMode('daily');
                                        setView('home');
                                    }}
                                >
                                    <Icon name="calendar-check" className="w-4 h-4" />
                                    {isEnglish ? "Start today's training" : '开始今日训练'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {view === 'settings-daily' && (
                <div className="settings-screen settings-subpage app-content-screen h-full overflow-y-auto no-scrollbar bg-slate-50 px-5 py-5">
                    <div className="settings-page-wrap">
                        <button
                            type="button"
                            className="settings-page-back"
                            onClick={() => {
                                playSound('tap');
                                setView('settings');
                            }}
                        >
                            <Icon name="chevron-left" className="w-4 h-4" />
                            <span>{settingsPageText.backToSettings}</span>
                        </button>

                        <div className="settings-page-hero settings-subpage-hero">
                            <div className="settings-page-icon settings-daily-page-icon">
                                <Icon name="calendar-check" className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="settings-page-kicker">Prefrontal Lab</div>
                                <h2>{settingsPageText.dailyTitle}</h2>
                                <p>{settingsPageText.dailyPageSubtitle}</p>
                            </div>
                        </div>

                        <div className="settings-page-card settings-page-stack">
                            <div className="settings-page-row">
                                <div className="settings-page-card-icon settings-daily-card-icon">
                                    <Icon name="calendar-check" className="w-5 h-5" />
                                </div>
                                <div className="settings-page-card-copy">
                                    <div className="settings-page-card-title">{settingsPageText.dailyTitle}</div>
                                    <div className="settings-page-card-body">{settingsPageText.dailyBody}</div>
                                </div>
                            </div>
                            <div className="settings-action-row">
                                <button
                                    type="button"
                                    onClick={() => {
                                        playSound('tap');
                                        setMode('daily');
                                        setView('home');
                                    }}
                                >
                                    <span className="settings-action-link-copy">
                                        <Icon name="calendar-check" className="w-4 h-4" />
                                        <span>{settingsPageText.dailyCta}</span>
                                    </span>
                                    <Icon name="chevron-right" className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        playSound('tap');
                                        setWeeklyReportReturnView('settings-daily');
                                        setView('weekly-report');
                                        recordRetention('click', {
                                            clickRole: 'weekly_report',
                                            clickLabel: 'Weekly Brain Report Settings'
                                        });
                                    }}
                                >
                                    <span className="settings-action-link-copy">
                                        <Icon name="chart-no-axes-combined" className="w-4 h-4" />
                                        <span>{weeklyReportUnlocked ? settingsPageText.reportCta : weeklyReportText.receiptLockedOpen}</span>
                                    </span>
                                    <Icon name="chevron-right" className="w-4 h-4" />
                                </button>
                            </div>
                            {!weeklyReceiptOpen && (
                                <button
                                    type="button"
                                    className={`weekly-receipt-cover ${weeklyReportUnlocked ? '' : 'is-locked'}`}
                                    onClick={() => {
                                        playSound('complete');
                                        setWeeklyReportReturnView('settings-daily');
                                        setView('weekly-report');
                                        recordRetention('click', {
                                            clickRole: 'weekly_receipt_open',
                                            clickLabel: 'Open Weekly Brain Receipt'
                                        });
                                    }}
                                >
                                    <div className="weekly-receipt-cover-top">
                                        <div>
                                            <div className="weekly-receipt-kicker">{weeklyReportText.receiptKicker}</div>
                                            <div className="weekly-receipt-title">{weeklyReportUnlocked ? weeklyReportText.receiptTitle : weeklyReportText.receiptLockedTitle}</div>
                                            <div className="weekly-receipt-subtitle">{weeklyReportUnlocked ? weeklyReportText.receiptSubtitle : weeklyReportText.receiptLockedSubtitle}</div>
                                        </div>
                                        <div className="weekly-receipt-seal" aria-hidden="true">
                                            <Icon name={weeklyReportUnlocked ? 'sparkles' : 'lock-keyhole'} className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="weekly-receipt-cover-body">
                                        <div className="weekly-receipt-preview-line">
                                            <span>{isEnglish ? 'This week' : '本周完成'}</span>
                                            <strong>{weeklyReport.completedDays}/{weeklyReportGoal} {isEnglish ? 'days' : '天'}</strong>
                                        </div>
                                        <div className="weekly-receipt-open-cta">
                                            <Icon name={weeklyReportUnlocked ? 'gift' : 'lock-keyhole'} className="w-4 h-4" />
                                            <span>{weeklyReportUnlocked ? weeklyReportText.receiptOpen : weeklyReportText.receiptLockedOpen}</span>
                                            <Icon name="chevron-right" className="w-4 h-4" />
                                        </div>
                                    </div>
                                </button>
                            )}
                            {weeklyReceiptOpen && (
                                <div className="weekly-report-detail is-settings">
                                    <div className="weekly-report-persona">
                                        <div className="weekly-report-persona-icon">
                                            <Icon name="brain-circuit" className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="weekly-report-persona-label">{weeklyReportText.eyebrow}</div>
                                            <div className="weekly-report-persona-title">{weeklyReport.persona}</div>
                                        </div>
                                    </div>
                                    <p className="weekly-report-story">{weeklyReport.summary}</p>
                                    <div className="weekly-report-grid">
                                        <div className="weekly-report-metric">
                                            <span>{weeklyReportText.best}</span>
                                            <strong>{weeklyReport.bestScore || '-'}</strong>
                                        </div>
                                        <div className="weekly-report-metric">
                                            <span>{weeklyReportText.focus}</span>
                                            <strong>{weeklyReport.topTaskName}</strong>
                                        </div>
                                        <div className="weekly-report-metric">
                                            <span>{weeklyReportText.time}</span>
                                            <strong>{formatWeeklySeconds(weeklyReport.fastestSchulte || weeklyReport.avgSchulte, isEnglish)}</strong>
                                        </div>
                                        <div className="weekly-report-metric">
                                            <span>{weeklyReportText.accuracy}</span>
                                            <strong>{weeklyReport.totalCorrect || 0}/{weeklyReport.totalIncorrect || 0}</strong>
                                        </div>
                                    </div>
                                    <div className="weekly-report-highlight">
                                        <Icon name="sparkles" className="w-4 h-4" />
                                        <span>{weeklyReport.highlight}</span>
                                    </div>
                                    <div className="weekly-report-next">
                                        <span>{weeklyReportText.note}</span>
                                        <strong>{weeklyReport.suggestion}</strong>
                                    </div>
                                    <button
                                        type="button"
                                        className="weekly-receipt-close"
                                        onClick={() => setWeeklyReceiptOpen(false)}
                                    >
                                        {weeklyReportText.receiptClose}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {view === 'weekly-report' && (
                <div className="weekly-report-screen app-content-screen overflow-y-auto no-scrollbar">
                    <div className="weekly-report-screen-inner">
                        <button
                            type="button"
                            className="weekly-report-back"
                            onClick={() => {
                                playSound('tap');
                                setView(weeklyReportReturnView);
                            }}
                            aria-label={weeklyReportReturnView === 'training-records' ? settingsPageText.recordsBack : settingsPageText.backToSettings}
                        >
                            <Icon name="chevron-left" className="w-5 h-5" />
                        </button>

                        {!weeklyReportUnlocked ? (
                            <div className="training-records-locked-state weekly-report-locked-state">
                                <div className="training-records-locked-icon">
                                    <Icon name="lock-keyhole" className="w-6 h-6" />
                                </div>
                                <span className="training-records-locked-kicker">{weeklyReportText.lockKicker}</span>
                                <h2>{weeklyReportLockIsFullStage ? weeklyReportText.lockTitleFull : weeklyReportText.lockTitleBasic}</h2>
                                <p>{weeklyReportLockIsFullStage ? weeklyReportText.lockBodyFull : weeklyReportText.lockBodyBasic}</p>
                                <div className="training-records-locked-progress">
                                    <div className="training-records-locked-progress-head">
                                        <span>{weeklyReportLockIsFullStage ? weeklyReportText.lockProgressLabelFull : weeklyReportText.lockProgressLabelBasic}</span>
                                        <strong>{weeklyReportLockProgress} / {weeklyReportLockTarget}</strong>
                                    </div>
                                    <div className="training-records-locked-progress-track">
                                        <span style={{ width: `${Math.min(100, (weeklyReportLockProgress / weeklyReportLockTarget) * 100)}%` }} />
                                    </div>
                                    <small>
                                        {weeklyReportLockIsFullStage
                                            ? `${Math.max(0, weeklyReportLockTarget - weeklyReportLockProgress)} ${weeklyReportText.lockDaysLeftFull}`
                                            : `${Math.max(0, weeklyReportLockTarget - weeklyReportLockProgress)} ${weeklyReportText.lockDaysLeftBasic}`}
                                    </small>
                                </div>
                                <button
                                    type="button"
                                    className="training-records-locked-cta"
                                    onClick={() => {
                                        playSound('daily');
                                        setMode('daily');
                                        setView('home');
                                    }}
                                >
                                    <Icon name="calendar-check" className="w-4 h-4" />
                                    {weeklyReportText.lockCta}
                                </button>
                            </div>
                        ) : (
                            <>
                            <div className="weekly-report-screen-heading">
                                <div className="weekly-report-screen-kicker">{weeklyReportPageKicker}</div>
                                <h1>{weeklyReportPageTitle}</h1>
                                <p>{weeklyReportText.reportPageIntro}</p>
                            </div>

                            <div className="weekly-report-reveal-list">
                            <div className={`weekly-report-reveal-row ${weeklyReportStep >= 1 ? 'is-visible' : ''}`}>
                                <div className="weekly-report-reveal-index">01</div>
                                <div className="weekly-report-reveal-copy">
                                    <div className="weekly-report-reveal-label">{weeklyReportDaysLabel}</div>
                                    <div className="weekly-report-count-line">
                                        <strong>{weeklyReportCount}</strong>
                                        <span>{isEnglish ? 'days' : '天'}</span>
                                    </div>
                                    <p>{weeklyReportText.reportDaysCopy}</p>
                                </div>
                            </div>

                            <div className={`weekly-report-reveal-row ${weeklyReportStep >= 2 ? 'is-visible' : ''}`}>
                                <div className="weekly-report-reveal-index">02</div>
                                <div className="weekly-report-reveal-copy">
                                    <div className="weekly-report-reveal-label">{weeklyReportText.reportTaskLabel}</div>
                                    <div className="weekly-report-reveal-value">{weeklyReport.topTaskName}</div>
                                    <p>{weeklyReportText.reportTaskCopy}</p>
                                </div>
                            </div>

                            <div className={`weekly-report-reveal-row ${weeklyReportStep >= 3 ? 'is-visible' : ''}`}>
                                <div className="weekly-report-reveal-index">03</div>
                                <div className="weekly-report-reveal-copy">
                                    <div className="weekly-report-reveal-label">{weeklyReportText.reportBestLabel}</div>
                                    <div className="weekly-report-score-line">
                                        <strong>{weeklyReportScore}</strong>
                                        <span>{isEnglish ? 'points' : '分'}</span>
                                    </div>
                                    <p>{weeklyReportText.reportBestCopy}</p>
                                </div>
                            </div>

                            <div className={`weekly-report-reveal-row ${weeklyReportStep >= 4 ? 'is-visible' : ''} is-comparison`}>
                                <div className="weekly-report-reveal-index">04</div>
                                <div className="weekly-report-reveal-copy">
                                    <div className="weekly-report-reveal-label">{weeklyReportText.reportCompareLabel}</div>
                                    <div className="weekly-report-compare-value">{weeklyReport.comparison}</div>
                                    <div className="weekly-report-compare-strip">
                                        <span>{weeklyReportPreviousBarLabel} {weeklyReport.previousFastestSchulte ? formatWeeklySeconds(weeklyReport.previousFastestSchulte, isEnglish) : (weeklyReport.previousBestScore || '-')}</span>
                                        <Icon name="arrow-right" className="w-4 h-4" />
                                        <span>{weeklyReportCurrentBarLabel} {weeklyReport.fastestSchulte ? formatWeeklySeconds(weeklyReport.fastestSchulte, isEnglish) : (weeklyReport.bestScore || '-')}</span>
                                    </div>
                                    <p>{weeklyReportText.reportCompareCopy}</p>
                                </div>
                            </div>
                            </div>

                            <div className={`weekly-report-final ${weeklyReportStep >= 5 ? 'is-visible' : ''}`}>
                                <h2>{weeklyReportText.reportReady}</h2>
                                <p>{weeklyReportText.reportReadyCopy}</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        playSound('daily');
                                        setMode('daily');
                                        setView('home');
                                    }}
                                >
                                    <Icon name="calendar-check" className="w-4 h-4" />
                                    {dailyRecord.completed ? weeklyReportText.reportViewDaily : weeklyReportText.reportEnter}
                                </button>
                            </div>
                            </>
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
            {showUpdateNote && !urlParams.has('suppressUpdate') && view !== 'analytics' && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-xl bg-slate-900/60 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-sm max-h-[calc(100dvh-3rem)] rounded-[2.5rem] p-8 shadow-2xl animate-pop-center relative overflow-y-auto overscroll-contain">
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
                        <button onClick={() => { const t = showInfo; try { localStorage.setItem(`pfl_rules_seen_${t}`, '1'); } catch (e) { } setShowInfo(null); startChallenge(t); }} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg">{ui.startTraining}</button>
                    </div>
                </div>
            )}

            {isGameView && (
                <div className="game-screen flex-1 flex flex-col">
                    <div className="game-topbar h-14 px-4 flex-shrink-0 grid grid-cols-[1fr_auto_1fr] items-center bg-white border-b border-slate-100">
                        <div className="flex justify-start">
                            <button onClick={() => {
                                playSound('tap');
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
                                        ...getCurrentRunAnalytics(),
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
                            <div className={`grid gap-1.5 w-full max-w-sm aspect-square ${schulte.cols === 6 ? 'grid-cols-6' : 'grid-cols-5'}`}>
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
                                                pulseControl(`schulte-${n}`);
                                                const isCorrectClick = n === schulte.next;
                                                recordAttempt(isCorrectClick);
                                                playSound(isCorrectClick ? 'success' : 'error');
                                                // 只有点击“下一个正确数字”时才触发逻辑
                                                if (isCorrectClick) {
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
                                            className={`schulte-cell flex items-center justify-center font-bold ${schulte.cols === 6 ? 'text-sm' : 'text-lg'} rounded-lg border transition-all ${controlPulse === `schulte-${n}` ? 'is-tap-pulsing' : ''}
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
                                            pulseControl(`stroop-${o.val}`);
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
                                        }} className={`stroop-choice-button ${controlPulse === `stroop-${o.val}` ? 'is-tap-pulsing' : ''} ${answerFeedback?.target === o.val ? (answerFeedback.status === 'correct' ? 'is-correct' : 'is-wrong') : ''}`}>{(mode === 'normal' || mode === 'infinite') ? <div className="stroop-color-dot" style={{ backgroundColor: o.val }}></div> : (isEnglish ? o.en : o.zh)}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {view === 'nback' && (
                            <div className="flex flex-col items-center w-full">
                                <div className="nback-prompt-wrap mb-12">
                                    <div className="nback-round-progress">
                                        {!nback.isReady
                                            ? (isChallengeDifficulty
                                                ? (isEnglish ? `Memory ${nback.roundNumber}/2` : `记忆阶段 ${nback.roundNumber}/2`)
                                                : (isEnglish ? 'Memorize' : '记忆阶段'))
                                            : (isEnglish
                                                ? `Round ${nback.roundNumber - (isChallengeDifficulty ? 2 : 1)}`
                                                : `第 ${nback.roundNumber - (isChallengeDifficulty ? 2 : 1)} 题`)}
                                    </div>
                                    <div className={`nback-prompt-stack ${isNbackWarmupRound ? 'is-warmup' : ''}`}>
                                        {nback.previous !== null && (
                                            <div className="nback-prompt-card nback-prompt-card-previous" aria-hidden="true">
                                                {nback.previous}
                                            </div>
                                        )}
                                        <div key={nback.roundId || 'nback-initial'} className="nback-prompt-card nback-prompt-card-current">
                                            {nback.current}
                                        </div>
                                    </div>
                                    {isNbackWarmupRound && (
                                        <div className="nback-warmup-hint">{isEnglish ? 'Same as the card on the left?' : '右边这个，和左边那个一样吗？'}</div>
                                    )}
                                </div>
                                {nback.isReady ? (
                                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                                        <button disabled={!!answerFeedback} onClick={(event) => {
                                            pulseControl('nback-match');
                                            handleNbackAnswer(true, event);
                                        }} className={`nback-choice-button py-5 rounded-2xl font-bold shadow-lg transition-all duration-200 disabled:pointer-events-none ${controlPulse === 'nback-match' ? 'is-tap-pulsing' : ''} ${answerFeedback?.target === 'match' ? (answerFeedback.status === 'correct' ? 'bg-emerald-500 text-white scale-105 ring-4 ring-emerald-100' : 'bg-red-500 text-white ring-4 ring-red-100') : 'bg-indigo-600 text-white'}`}>{ui.match}</button>
                                        <button disabled={!!answerFeedback} onClick={(event) => {
                                            pulseControl('nback-different');
                                            handleNbackAnswer(false, event);
                                        }} className={`nback-choice-button py-5 rounded-2xl font-bold transition-all duration-200 disabled:pointer-events-none ${controlPulse === 'nback-different' ? 'is-tap-pulsing' : ''} ${answerFeedback?.target === 'different' ? (answerFeedback.status === 'correct' ? 'bg-emerald-500 text-white scale-105 ring-4 ring-emerald-100' : 'bg-red-500 text-white ring-4 ring-red-100') : 'bg-slate-200 text-slate-600'}`}>{ui.different}</button>
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
                                {setgameWarmupRef.current > 0 && (
                                    <div className="set-warmup-hint">{
                                        (setgameWarmupRef.current === 3
                                            ? (isEnglish ? 'Example 1 of 3 — same color, different shapes' : '示例 1/3:颜色相同、形状全不同')
                                            : setgameWarmupRef.current === 2
                                                ? (isEnglish ? 'Example 2 of 3 — same shape, different colors' : '示例 2/3:形状相同、颜色全不同')
                                                : (isEnglish ? 'Example 3 of 3 — all different' : '示例 3/3:颜色、形状全都不同'))
                                        + (isChallengeDifficulty ? (isEnglish ? ', same opacity' : '、透明度一致') : '')
                                        + (isEnglish ? ' — still a set' : ' —— 也是一组')
                                    }</div>
                                )}
                                {/* --- 游戏网格 --- */}
                                <div className="setgame-grid grid grid-cols-3 gap-2 w-full max-w-sm">
                                    {setGame.cards.map(card => (
                                        <button
                                            key={card.id}
                                            disabled={!!answerFeedback}
                                            onClick={(event) => {
                                                if (answerLock.current) return;
                                                pulseControl(`set-${card.id}`);
                                                const newSel = setGame.selected.includes(card.id) ? setGame.selected.filter(id => id !== card.id) : [...setGame.selected, card.id];
                                                if (newSel.length === 3) {
                                                    const selectedCards = newSel.map(id => setGame.cards.find(c => c.id === id));

                                                    // 核心判定逻辑：全同 或 全异
                                                    const checkProp = (p1, p2, p3) => (p1 === p2 && p2 === p3) || (p1 !== p2 && p2 !== p3 && p1 !== p3);

                                                    const isColorMatch = checkProp(selectedCards[0].color, selectedCards[1].color, selectedCards[2].color);
                                                    const isShapeMatch = checkProp(selectedCards[0].shape, selectedCards[1].shape, selectedCards[2].shape);
                                                    const isFillMatch = checkProp(selectedCards[0].fillLevel, selectedCards[1].fillLevel, selectedCards[2].fillLevel);

                                                    if (isColorMatch && isShapeMatch && isFillMatch) {
                                                        if (setgameWarmupRef.current > 0) setgameWarmupRef.current -= 1; // 解出一板,推进带教(2→1→0)
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
                                                        setSetGame(p => ({ ...p, selected: newSel, successIds: [], errorIds: newSel }));
                                                        showAnswerFeedback({
                                                            correct: false,
                                                            penalty: setgameWarmupRef.current ? 0 : 20,
                                                            showPenalty: !setgameWarmupRef.current,
                                                            nextType: 'setgame',
                                                            target: `set-${card.id}`,
                                                            advance: false,
                                                            position: getCenteredFeedbackPosition(event.currentTarget.closest('.setgame-grid')),
                                                            flashError: false
                                                        });
                                                    }
                                                } else {
                                                    setSetGame(p => ({ ...p, selected: newSel, successIds: [], errorIds: [] }));
                                                }
                                            }}
                                            className={`set-card-button relative overflow-hidden aspect-square rounded-3xl border-2 flex items-center justify-center transition-all duration-200 disabled:pointer-events-none ${controlPulse === `set-${card.id}` ? 'is-tap-pulsing' : ''} ${setgameWarmupRef.current > 0 && card.isSolution ? 'is-set-hint' : ''} ${setGame.successIds?.includes(card.id)
                                                ? 'is-set-success'
                                                : setGame.errorIds?.includes(card.id)
                                                    ? 'is-set-wrong'
                                                    : setGame.selected.includes(card.id)
                                                        ? 'border-indigo-500 bg-indigo-50 shadow-md scale-95'
                                                        : 'border-slate-100 bg-white shadow-sm'
                                                }`}
                                        >
                                            <div style={{ color: card.color, opacity: card.fillLevel || 1 }}>
                                                <Icon name={card.shape} className="w-10 h-10" />
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* --- 新增：无惩罚刷新按钮 --- */}
                                <button
                                    onClick={() => {
                                        playSound('tap');
                                        initGameCore('setgame');
                                    }}
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
                                            onClick={() => {
                                                playSound('tap');
                                                setNeuronCount(p => ({ ...p, currentCount: Math.max(0, p.currentCount - 1) }));
                                            }}
                                            className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl font-bold border border-indigo-100 active:scale-95 transition-transform flex items-center justify-center"
                                        >
                                            <Icon name="minus" className="w-5 h-5" />
                                        </button>
                                        <div className="flex-1 h-14 bg-indigo-600 text-white rounded-2xl shadow-md flex flex-col items-center justify-center">
                                            <div className="text-[9px] opacity-70 font-black brand-text leading-none mb-0.5">{ui.recorded}</div>
                                            <div className="text-3xl font-black font-mono leading-none">{neuronCount.currentCount}</div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                playSound('tap');
                                                setNeuronCount(p => ({ ...p, currentCount: p.currentCount + 1 }));
                                            }}
                                            className="w-14 h-14 bg-indigo-600 text-white rounded-2xl font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center"
                                        >
                                            <Icon name="plus" className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-[1fr_2fr] gap-2 mt-2">
                                        <button
                                            onClick={() => {
                                                playSound('tap');
                                                setNeuronCount(p => ({ ...p, currentCount: 0 }));
                                            }}
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
                const feedback = getFeedback(lastRunStats);
                const isDailyResult = mode === 'daily';
                const resultAccuracy = lastRunStats?.attempts
                    ? Math.round((lastRunStats.correct / lastRunStats.attempts) * 100)
                    : 0;
                const resultDuration = lastRunStats?.durationSeconds || 0;
                const showCompletionTime = lastRunStats?.task === 'schulte';
                const resultPresentation = getResultPresentation({ isDailyResult, resultAccuracy });
                return (
                    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-pop-center">
                        <div className={`result-icon-orb ${resultPresentation.className}`}>
                            <Icon name={resultPresentation.icon} className="w-10 h-10" />
                        </div>
                        <div className="text-[10px] font-black brand-text text-slate-400 mb-1">{isDailyResult ? ui.dailyFinishedTitle : ui.resultTitle}</div>
                        <div className={`result-score-counter text-6xl font-black mb-6 font-mono ${isDailyResult ? 'text-emerald-500' : 'text-indigo-600'}`}>{animatedScore}</div>
                        <div className={`text-xl font-black mb-1 ${isDailyResult ? 'text-emerald-600' : feedback.color}`}>{isDailyResult ? `${ui.dailyStreak} ${dailyStreak} ${ui.dailyDays}` : feedback.label}</div>
                        <div className="text-xs text-slate-500 mb-4 font-medium leading-relaxed max-w-[240px]">{isDailyResult ? ui.dailyFinishedSub : feedback.sub}</div>
                        <div className="result-metrics-grid w-full max-w-sm mb-6">
                            <div className="result-metric">
                                <span>{ui.resultAccuracy}</span>
                                <strong>{resultAccuracy}%</strong>
                            </div>
                            <div className="result-metric">
                                <span>{showCompletionTime ? ui.resultTime : ui.resultCorrect}</span>
                                <strong>{showCompletionTime ? `${resultDuration}s` : `${lastRunStats?.correct || 0}${ui.resultTimes}`}</strong>
                            </div>
                            <div className="result-metric">
                                <span>{ui.resultMistakes}</span>
                                <strong>{lastRunStats?.incorrect || 0}{ui.resultTimes}</strong>
                            </div>
                        </div>
                        {isDailyResult && (
                            <div className={`daily-result-momentum ${dailyWeeklyGoalComplete ? 'is-rewarded' : ''}`}>
                                {dailyWeeklyGoalComplete && (
                                    <div className="daily-result-reward">
                                        <span><Icon name="flame" className="w-4 h-4" /></span>
                                        <div>
                                            <strong>{ui.dailyWeeklyDone}</strong>
                                            <small>{ui.dailyWeeklyNext}</small>
                                        </div>
                                    </div>
                                )}
                                <div className="daily-result-row">
                                    <span>{ui.dailyWeeklyGoal}</span>
                                    <strong>{dailyWeeklyGoalCount}/{WEEKLY_DAILY_GOAL}</strong>
                                </div>
                                <div className="daily-result-row">
                                    <span>{ui.dailyTomorrowPreview}</span>
                                    <strong>{tomorrowCategory}</strong>
                                </div>
                            </div>
                        )}
                        {isDailyResult && (
                            <div className="daily-result-note">
                                <Icon name="sparkles" className="w-4 h-4" />
                                <span>{ui.dailyResultNote}</span>
                            </div>
                        )}
                        {!isDailyResult && <div className="mb-8" />}
                        {isDailyResult ? (
                            <div className="w-full max-w-sm flex flex-col gap-3">
                                <button onClick={() => { playSound('tap'); setMode('daily'); setView('home'); }} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg">{ui.dailySeeTomorrow}</button>
                                <button onClick={() => { playSound('tap'); startChallenge(dailySpec.task); }} className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black">{ui.dailyPracticeAgain}</button>
                            </div>
                        ) : (
                            <button onClick={() => { playSound('tap'); setView('home'); }} className="w-full max-w-sm py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg">{ui.backHome}</button>
                        )}
                    </div>
                );
            })()}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
