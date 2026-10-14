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
        appTitle: "前额叶实验室 6.2.1",
        bestSynced: "历史最高 (已同步)",
        normal: "基础",
        hard: "进阶",
        infinite: "无限",
        infiniteMode: "无限模式",
        infiniteScore: "自由练习",
        infinitePill: "不计入历史",
        comp: "竞技",
        arenaTitle: "全能认知竞技场",
        arenaShortTitle: "全能竞技",
        arenaSubtitle: "混合：舒尔特方格 / Stroop反应 / 快速SET / N-Back / 神经元计数",
        updateTitle: "实验室更新公告",
        updateVersion: "Version 6.2.1",
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
        settingsAppearance: "外观",
        appearanceSystem: "跟随系统",
        appearanceLight: "浅色",
        appearanceDark: "深色",
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
        dailySeeTomorrow: "查看明日挑战",
        dailyPracticeAgain: "再冲一次",
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
        neuronInstruction: "形状和颜色都要相同",
        recorded: "已记录",
        reset: "清零",
        submit: "确认提交",
        codeFind: "找出隐藏密码",
        codeSubtitle3: "四条线索只会对应一个三位密码，首位不会是 0",
        codeSubtitle4: "四条线索只会对应一个四位密码，首位不会是 0",
        codeElapsed: "已用",
        codeDelete: "删除",
        codeSubmit: "提交",
        codeIncomplete3: "请输入完整的三位密码",
        codeIncomplete4: "请输入完整的四位密码",
        codeWrong: "还不对，请再试一次（本题 -10 分）",
        codeComplete: "题目完成",
        codePuzzle: "第 {n} 题",
        codePuzzleDone: "第 {n} 题完成",
        codeResultLine: "四条线索，锁定唯一密码。",
        codeResultCompleted: "完成题目",
        codeResultTime: "解题用时",
        codeResultIncorrect: "错误提交",
        resultTitle: "测试结束 - 最终得分",
        resultAccuracy: "正确率",
        resultTime: "用时",
        resultCorrect: "答对",
        resultMistakes: "错误",
        resultTimes: "次",
        backHome: "返回大厅"
    },
    en: {
        appTitle: "Prefrontal Lab 6.2.1",
        bestSynced: "Personal Best",
        normal: "Basic",
        hard: "Advanced",
        infinite: "Endless",
        infiniteMode: "Endless Mode",
        infiniteScore: "Free Practice",
        infinitePill: "Not saved as best",
        comp: "Arena",
        arenaTitle: "Cognitive Arena",
        arenaShortTitle: "Arena",
        arenaSubtitle: "Mixed training: Schulte Grid / Stroop / SET / N-Back / Neuron Counting",
        updateTitle: "Lab Update",
        updateVersion: "Version 6.2.1",
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
        settingsAppearance: "Appearance",
        appearanceSystem: "System",
        appearanceLight: "Light",
        appearanceDark: "Dark",
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
        dailySeeTomorrow: "See tomorrow",
        dailyPracticeAgain: "Try again",
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
        neuronTarget: "TARGET",
        neuronInstruction: "Match shape and color",
        recorded: "COUNT",
        reset: "Reset",
        submit: "Submit",
        codeFind: "Find the hidden code",
        codeSubtitle3: "Four clues resolve to one unique 3-digit code; the first digit is never 0",
        codeSubtitle4: "Four clues resolve to one unique 4-digit code; the first digit is never 0",
        codeElapsed: "Elapsed",
        codeDelete: "Delete",
        codeSubmit: "Submit",
        codeIncomplete3: "Enter all 3 digits",
        codeIncomplete4: "Enter all 4 digits",
        codeWrong: "Not yet — try again (-10 points)",
        codeComplete: "Puzzle complete",
        codePuzzle: "Puzzle {n}",
        codePuzzleDone: "Puzzle {n} complete",
        codeResultLine: "Four clues, one unique code.",
        codeResultCompleted: "Completed",
        codeResultTime: "Solve time",
        codeResultIncorrect: "Incorrect",
        resultTitle: "ROUND COMPLETE · FINAL SCORE",
        resultAccuracy: "Accuracy",
        resultTime: "Time",
        resultCorrect: "Correct",
        resultMistakes: "Mistakes",
        resultTimes: "",
        backHome: "Back to Lab"
    }
};

const UPDATE_LINES = {
    zh: [
        "新增深色模式：在「我的 → 外观」里选择，可以跟随系统，也可以固定用浅色或深色。",
        "深色不是把颜色反过来那么简单：卡片、文字、描边各有各的深色值，而游戏本身的颜色（Stroop 的字色、SET 的卡面、神经元的图形）一律不变，免得影响判断。",
        "舒尔特方格点错时，被点的那一格现在会闪红——以前只有顶栏的计时器会变色，而你的眼睛正盯着格子。",
        "震动反馈收敛为只在答对和答错时出现，并且关掉音效后依然有效（取决于设备与浏览器是否支持）。"
    ],
    en: [
        "Added dark mode: choose it under My Lab → Appearance, either following the system or fixed to light or dark.",
        "Dark mode is not an inversion: surfaces, text and strokes each get their own dark value, while the game colours themselves — Stroop's ink, the SET cards, the Neuron Counting shapes — do not move, because they are the answer.",
        "A wrong tap in the Schulte Grid now flashes the cell you tapped. Until now only the timer at the top changed colour, while your eyes were on the grid.",
        "Haptics are now limited to correct and wrong answers, and they keep working when sound is off (where the device and browser support them)."
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
        // 英文与 iOS ResultScreenCopy.swift 一致。
        { label: "Still finding your feet", sub: "No problem — everyone needs a warm-up round. Give it another go.", color: "text-slate-500" },
        { label: "Steady all the way through", sub: "Every step was careful. Next round you can safely pick up the pace.", color: "text-indigo-500" },
        { label: "Full of momentum", sub: "The speed is already there. Ease off a touch next time and it will be close to perfect.", color: "text-blue-500" },
        { label: "Fast and steady", sub: "Your pace and your accuracy were both good. Nicely played.", color: "text-purple-600" },
        { label: "Better than last time", sub: "You can see the progress. Keep this rhythm going.", color: "text-emerald-600" }
    ]
};

const TASK_TRANSLATIONS = {
    schulte: {
        title: "Schulte Grid",
        homeBasic: "Focus and visual span",
        homeHard: "Blind-spot mode",
    },
    stroop: {
        title: "Stroop Test",
        homeBasic: "Inhibition control",
        homeHard: "Double conflict",
    },
    nback: {
        title: "N-Back Memory",
        homeBasic: "1-Back mode",
        homeHard: "2-Back challenge",
    },
    setgame: {
        title: "SET Logic",
        homeBasic: "Logical processing",
        homeHard: "Adds fill dimension",
    },
    neuroncount: {
        title: "Neuron Counting",
        homeBasic: "Target count: shape + color",
        homeHard: "More distractions",
    },
    passwordlogic: {
        title: "Code Logic",
        homeBasic: "Three-digit deduction",
        homeHard: "Four-digit deduction",
    }
};

// --- 训练首页 i 按钮打开的规则弹窗 ---
// 对齐已发布的 iOS 1.0.2（a43b5fe）：各游戏 *TrainingFlow.swift 里的 *RulesSheet。
// 文案逐字照搬 iOS；示意图用下面的小组件画，不再用整段 HTML 字符串。
// 档位：只有「进阶」显示进阶版，基础和无限都显示基础版（与 iOS presentedRulesTier 相同）。
// rule 里的字符串原样显示，{ hl, tone } 是加粗高亮的一段。
const RULES_SHEET = {
    schulte: {
        subtitle: 'Schulte Grid', icon: 'grid', tone: 'schulte', tipTone: 'schulte', demoSpace: 12,
        basic: {
            zh: { lead: '提升视觉搜索效率与专注力', rule: ['按照数字 1 至 25 的顺序，依次点击方格中的数字。'], demo: 'schulte-basic', tip: '💡  秘诀：尽量保持视线中心在网格中央，利用余光捕捉周围数字。' },
            en: { lead: 'Train visual search and focus', rule: ['Tap numbers from 1 to 25 in order.'], demo: 'schulte-basic', tip: '💡 Tip: keep your gaze near the centre of the grid and catch the surrounding numbers with your peripheral vision.' }
        },
        advanced: {
            zh: { lead: '盲点模式：记住已经点击的位置', rule: ['⚠️ 进阶规则：点过的数字会立即消失。'], demo: 'schulte-blind', tip: '💡 记住已清空的位置，避免在空位上浪费搜索时间。' },
            en: { lead: 'Blind-spot mode: remember cleared positions', rule: ['Advanced: tapped numbers disappear immediately.'], demo: 'schulte-blind', tip: '💡 Remember cleared positions so empty cells do not cost search time.' }
        }
    },
    stroop: {
        subtitle: 'Stroop Test', icon: 'palette', tone: 'stroop', tipTone: 'stroop',
        basic: {
            zh: { lead: '练习抑制本能反应的冲动', rule: ['忽略文字含义，点击与文字物理颜色相符的按钮。'], demo: 'stroop-basic', tip: '💡  注意：你的大脑会下意识想读字，请强制关注颜色本身！' },
            en: { lead: 'Practice inhibiting automatic responses', rule: ['Ignore the word meaning. Choose its actual color.'], demo: 'stroop-basic', tip: '💡 Careful: your brain wants to read the word. Force your attention onto the colour itself.' }
        },
        advanced: {
            zh: { lead: '双重语义冲突', rule: ['⚠️ 进阶规则：色块消失，改为点击对应的文字内容。'], demo: 'stroop-advanced', tip: '💡 看到蓝色的“红”字时，找出写着“蓝”的按钮。' },
            en: { lead: 'Double conflict', rule: ['Advanced: color dots disappear. Tap the written color name instead.'], demo: 'stroop-advanced', tip: '💡 If RED is blue, choose the button labeled BLUE.' }
        }
    },
    // N-Back 没有提示框，示意图后面直接是按钮。
    nback: {
        subtitle: 'N-Back Task', icon: 'brain', tone: 'nback',
        basic: {
            zh: { lead: '训练大脑不断更新暂存信息的能力', rule: ['判断当前数字，是否与 ', { hl: '前1步', tone: 'indigo' }, ' 出现的数字相同。'], note: '答错扣除 3 秒。', demo: 'nback-one' },
            en: { lead: 'Train working-memory updating', rule: ['Does the current number match the one ', { hl: '1 step back', tone: 'indigo' }, '?'], note: 'Wrong answers cost 3 seconds.', demo: 'nback-one' }
        },
        advanced: {
            zh: { lead: '2-Back 双重难度', rule: ['判断当前数字，是否与 ', { hl: '前第 2 步', tone: 'indigo' }, ' 出现的数字相同。'], note: '答错扣除 3 秒。', demo: 'nback-two' },
            en: { lead: '2-Back challenge', rule: ['Does the current number match the one ', { hl: '2 steps back', tone: 'indigo' }, '?'], note: 'Wrong answers cost 3 seconds.', demo: 'nback-two' }
        }
    },
    setgame: {
        subtitle: 'Set Logic', icon: 'shapes', tone: 'set', tipTone: 'set',
        basic: {
            zh: { lead: '识别属性的全同与全异', rule: ['找出 3 张牌，使它们的颜色和形状满足：'], demo: 'set-basic', tip: '💡 即使形状完全一样（三个圆），只要颜色互不相同（红/蓝/绿），也成立！' },
            en: { lead: 'Recognize same and different properties', rule: ['Find 3 cards whose colour and shape are each:'], demo: 'set-basic', tip: '💡 Even if the shapes are identical (three circles), it still counts as long as the colours are all different (red / blue / green).' }
        },
        advanced: {
            zh: { lead: '填充度也必须全同或全异', rule: ['进阶模式下，填充度也必须符合全同或全异原则。'], demo: 'set-fill', tip: '↑ 填充度也必须符合全同或全异原则。' },
            en: { lead: 'Fill level is also a SET property', rule: ['Advanced mode also checks fill level.'], demo: 'set-fill', tip: '↑ Fill level must also be all-same or all-different.' }
        }
    },
    // 神经元计数也没有提示框；两档规则句相同，差别写在主旨句里。
    neuroncount: {
        subtitle: 'Neuron Counting', icon: 'binary', tone: 'neuron',
        basic: {
            zh: { lead: '在干扰中精确统计目标数量', rule: ['数出屏幕中 ', { hl: '形状和颜色都与目标相同', tone: 'amber' }, ' 的图形。'], demo: 'neuron-basic' },
            en: { lead: 'Count targets accurately among distractions', rule: ['Count targets: ', { hl: 'same shape and color', tone: 'amber' }, '.'], demo: 'neuron-basic' }
        },
        advanced: {
            zh: { lead: '更多相似干扰项与移动目标', rule: ['数出屏幕中 ', { hl: '形状和颜色都与目标相同', tone: 'amber' }, ' 的图形。'], demo: 'neuron-field' },
            en: { lead: 'More similar distractors and moving items', rule: ['Count targets: ', { hl: 'same shape and color', tone: 'amber' }, '.'], demo: 'neuron-field' }
        }
    },
    // 密码推理的头部和正文结构与其他五个不同（PasswordLogicRulesSheet）：副标题是档位名，按钮是「开始推理」。
    passwordlogic: {
        icon: 'lock-keyhole', tone: 'code', codeLogic: true,
        zh: {
            title: '密码推理', tiers: ['三位数字逻辑', '四位数字逻辑'], heading: '看懂线索的三种说法',
            example: (code) => `以密码 ${code} 为例：`,
            clues: ['1 个数字正确且位置正确', '1 个数字正确，但位置错误', '没有数字正确'],
            colorNote: '颜色仅用于示例；正式题请以右侧线索文字为准。',
            rules: ['四条线索要一起看；每题只有一个答案。数字不会重复，首位不会是 0。', '每次错误提交扣 10 分；可修改后再次提交。'],
            button: '开始推理', label: '密码推理训练规则'
        },
        en: {
            title: 'Code Logic', tiers: ['Three-digit deduction', 'Four-digit deduction'], heading: 'How to read each clue',
            example: (code) => `Using ${code} as the example code:`,
            clues: ['1 digit is correct and in the correct position', '1 digit is correct, but in the wrong position', 'No digits are correct'],
            colorNote: 'Colors are only used in this example; read the clue text on the right during play.',
            rules: ['Read all four clues together. Each puzzle has one answer. Digits do not repeat, and the first digit is never 0.', 'Each incorrect submission costs 10 points; edit and submit again.'],
            button: 'Start reasoning', label: 'Code Logic training rules'
        }
    }
};

// 舒尔特：40×40 的圆角数字格；选中格蓝字、蓝色 10% 底、2px 蓝边。
const RulesSchulteCell = ({ value, on }) => (
    <div className={`rs-cell${on ? ' is-on' : ''}`}>{value}</div>
);

const RulesSchulteBasicDemo = () => (
    <div className="rs-row rs-gap-8">
        <RulesSchulteCell value="1" on />
        <span className="rs-arrow">→</span>
        <RulesSchulteCell value="2" />
        <span className="rs-arrow">→</span>
        <RulesSchulteCell value="3" />
    </div>
);

// 舒尔特进阶：目标顺序 + 「已点（空）→ 当前 → 随后」三格。
const RulesSchulteBlindDemo = ({ en }) => {
    const cell = (value, caption) => (
        <div className="rs-col rs-gap-4">
            <RulesSchulteCell value={value} on={value === '2'} />
            <span className="rs-caption">{caption}</span>
        </div>
    );
    return (
        <div className="rs-box rs-box-warning rs-col rs-gap-10">
            <div className="rs-blind-order">{en ? 'Target order  1 → 2 → 3 … → 25' : '目标顺序  1 → 2 → 3 … → 25'}</div>
            <div className="rs-row rs-gap-8">
                {cell('', en ? 'cleared' : '已点')}
                <span className="rs-arrow">→</span>
                {cell('2', en ? 'next' : '当前')}
                <span className="rs-arrow">→</span>
                {cell('3', en ? 'then' : '随后')}
            </div>
        </div>
    );
};

const RulesStroopBasicDemo = ({ en }) => (
    <div className="rs-box rs-box-plain rs-col rs-gap-8">
        <div className="rs-stroop-word">{en ? 'RED' : '红 色'}</div>
        <div className="rs-row rs-gap-8">
            <span className="rs-pill rs-pill-red">{en ? 'Tap RED (❌)' : '点击红色 (❌)'}</span>
            <span className="rs-pill rs-pill-blue">{en ? 'Tap BLUE (✅)' : '点击蓝色 (✅)'}</span>
        </div>
    </div>
);

// Stroop 进阶：蓝色的「红色」+ 2×2 文字按钮，「蓝」为选中态。
const RulesStroopAdvancedDemo = ({ en }) => {
    const choices = [
        { key: 'red', zh: '红', en: 'Red' },
        { key: 'blue', zh: '蓝', en: 'Blue', on: true },
        { key: 'green', zh: '绿', en: 'Green' },
        { key: 'yellow', zh: '黄', en: 'Yellow' }
    ];
    return (
        <div className="rs-box rs-box-danger rs-col rs-gap-10">
            <div className="rs-stroop-word is-large">{en ? 'RED' : '红 色'}</div>
            <div className="rs-stroop-grid">
                {choices.map(choice => (
                    <span key={choice.key} className={`rs-stroop-choice rs-c-${choice.key}${choice.on ? ' is-on' : ''}`}>{en ? choice.en : choice.zh}</span>
                ))}
            </div>
        </div>
    );
};

// N-Back：40×40 数字格，variant 为 plain / bright（靛蓝）/ violet（紫）。
const RulesNumber = ({ value, variant = 'plain' }) => (
    <div className={`rs-num rs-num-${variant}`}>{value}</div>
);

const RulesNBackOneDemo = ({ en }) => (
    <>
        <div className="rs-box rs-box-page rs-pad-16 rs-row rs-gap-16">
            <div className="rs-col rs-gap-4 rs-faded-40">
                <RulesNumber value="7" />
                <span className="rs-caption rs-caption-ink">{en ? '1 back' : '前1步'}</span>
            </div>
            <span className="rs-nback-eq">＝?</span>
            <div className="rs-col rs-gap-4">
                <RulesNumber value="7" variant="bright" />
                <span className="rs-caption rs-caption-accent">{en ? 'Now' : '当前'}</span>
            </div>
        </div>
        <div className="rs-nback-strip">
            <span>2 → 5 →</span>
            <span className="rs-nback-hit">5</span>
            <span>{en ? '(tap!)' : '(点!)'}</span>
        </div>
    </>
);

const RulesNBackTwoDemo = ({ en }) => {
    const item = (value, caption, emphasized) => (
        <div className={`rs-col rs-gap-4${emphasized ? '' : ' rs-faded-20'}`}>
            <RulesNumber value={value} variant={emphasized ? 'violet' : 'plain'} />
            <span className="rs-caption rs-caption-violet">{caption}</span>
        </div>
    );
    return (
        <div className="rs-box rs-box-page rs-col rs-gap-10">
            <div className="rs-row rs-gap-10">
                {item('4', en ? 'compare' : '对比项', true)}
                <span className="rs-hline" />
                {item('9', en ? 'skip' : '跳过', false)}
                <span className="rs-hline" />
                {item('4', en ? 'current' : '当前', true)}
            </div>
            <div className="rs-nback-hint">{en ? 'Skip one number: match the one 2 steps back.' : '间隔一个数字，相同即点！'}</div>
        </div>
    );
};

const RulesSetBasicDemo = ({ en }) => (
    <div className="rs-row rs-gap-12 rs-stretch">
        <div className="rs-set-card">
            <div className="rs-row rs-gap-4"><span className="rs-dot rs-dot-indigo" /><span className="rs-dot rs-dot-indigo" /><span className="rs-dot rs-dot-indigo" /></div>
            <span className="rs-set-label">{en ? 'All the same' : '全部相同'}</span>
        </div>
        <div className="rs-set-card">
            <div className="rs-row rs-gap-4"><span className="rs-dot rs-dot-red" /><span className="rs-dot rs-dot-blue" /><span className="rs-dot rs-dot-green" /></div>
            <span className="rs-set-label">{en ? 'All different' : '全部不同'}</span>
        </div>
    </div>
);

// SET 进阶：三张小卡，绿色方块不透明度 1 / 0.30 / 0.10（照 iOS 示意图）。
const RulesSetFillDemo = ({ en }) => (
    <div className="rs-box rs-box-success rs-col rs-gap-9">
        <div className="rs-row rs-gap-10">
            {[1, 0.3, 0.1].map(opacity => (
                <div key={opacity} className="rs-fill-card"><span style={{ opacity }} /></div>
            ))}
        </div>
        <div className="rs-fill-caption">{en ? 'Solid · light fill · faint fill' : '实心 · 浅填充 · 淡填充'}</div>
    </div>
);

const RulesNeuronBasicDemo = ({ en }) => (
    <div className="rs-box rs-box-page rs-pad-16 rs-col rs-gap-12">
        <div className="rs-row rs-gap-8">
            <span className="rs-glyph rs-glyph-circle rs-c-amber" style={{ width: 24, height: 24 }} />
            <span className="rs-neuron-square" />
            <span className="rs-glyph rs-glyph-circle rs-c-amber" style={{ width: 24, height: 24 }} />
        </div>
        <div className="rs-neuron-caption">{en ? 'Count to 2, then tap the button twice' : '默数到 2，然后点击按钮 2 次'}</div>
    </div>
);

// 神经元进阶：缩小版计数场地。偏移量是相对场地中心的 (x, y)，与 iOS 相同。
const RULES_NEURON_FIELD = [
    { shape: 'circle', color: 'amber', size: 20, x: -56, y: -14 },
    { shape: 'square', color: 'amber', size: 18, x: -18, y: 16, rotate: 18 },
    { shape: 'triangle', color: 'blue', size: 20, x: 20, y: -13 },
    { shape: 'circle', color: 'amber', size: 19, x: 55, y: 13 },
    { shape: 'triangle', color: 'green', size: 17, x: 0, y: 13, rotate: -21 }
];

const RulesNeuronFieldDemo = ({ en }) => (
    <div className="rs-box rs-box-page rs-col rs-gap-8 rs-stretch" role="img" aria-label={en ? 'Advanced neuron counting example: count target circles among more similar moving shapes' : '进阶神经元计数示例：在更多会移动的相似图形中数出目标圆圈'}>
        <div className="rs-row rs-gap-6 rs-neuron-head">
            <span className="rs-neuron-target">{en ? 'TARGET' : '目标'}</span>
            <span className="rs-glyph rs-glyph-circle rs-c-amber" style={{ width: 17, height: 17 }} />
            <span className="rs-spacer" />
            <span className="rs-neuron-more">{en ? 'MORE · MOVING' : '更多 · 移动'}</span>
        </div>
        <div className="rs-neuron-field">
            {RULES_NEURON_FIELD.map((g, index) => (
                <span
                    key={index}
                    className={`rs-glyph rs-glyph-${g.shape} rs-c-${g.color}`}
                    style={{ width: g.size, height: g.size, transform: `translate(-50%, -50%) translate(${g.x}px, ${g.y}px) rotate(${g.rotate || 0}deg)` }}
                />
            ))}
            <span className="rs-neuron-move" style={{ transform: 'translate(-50%, -50%) translate(55px, -15px)' }}>↔</span>
        </div>
    </div>
);

const RULES_DEMOS = {
    'schulte-basic': RulesSchulteBasicDemo,
    'schulte-blind': RulesSchulteBlindDemo,
    'stroop-basic': RulesStroopBasicDemo,
    'stroop-advanced': RulesStroopAdvancedDemo,
    'nback-one': RulesNBackOneDemo,
    'nback-two': RulesNBackTwoDemo,
    'set-basic': RulesSetBasicDemo,
    'set-fill': RulesSetFillDemo,
    'neuron-basic': RulesNeuronBasicDemo,
    'neuron-field': RulesNeuronFieldDemo
};

// 提示框：主题色 6% 底、13% 描边；SET 用更小的一号（10 号字、内边距 10、圆角 12）。
const RulesTip = ({ tone, children }) => (
    <div className={`rs-tip rs-tip-${tone}`}>{children}</div>
);

// 密码推理的三行线索示例（PasswordLogicClueExamples，非紧凑版）。
const RulesCodeClues = ({ copy, advanced }) => {
    const rows = [
        { digits: advanced ? ['5', '8', '9', '0'] : ['5', '8', '9'], accent: 0, tone: 'exact' },
        { digits: advanced ? ['8', '5', '9', '0'] : ['8', '5', '9'], accent: 1, tone: 'misplaced' },
        { digits: advanced ? ['6', '4', '2', '0'] : ['7', '6', '4'], accent: -1, tone: 'absent' }
    ];
    return (
        <div className="rs-code-box">
            {rows.map((row, rowIndex) => (
                <div key={row.tone} className="rs-code-row">
                    <div className="rs-row rs-gap-4">
                        {row.digits.map((digit, index) => (
                            <span key={index} className={`rs-code-digit${index === row.accent ? ` is-${row.tone}` : ''}`}>{digit}</span>
                        ))}
                    </div>
                    <span className="rs-code-divider" />
                    <span className="rs-code-label">{copy.clues[rowIndex]}</span>
                </div>
            ))}
        </div>
    );
};

const RulesSheetCard = ({ type, advanced, en, title, onStart }) => {
    const sheet = RULES_SHEET[type];
    if (!sheet) return null;
    const lang = en ? 'en' : 'zh';

    if (sheet.codeLogic) {
        const copy = sheet[lang];
        return (
            <div className="rs-card" role="dialog" aria-modal="true" aria-label={copy.label} onClick={event => event.stopPropagation()}>
                <div className={`rs-icon rs-icon-${sheet.tone}`}><Icon name={sheet.icon} className="w-7 h-7" /></div>
                <h2 className="rs-title rs-code-title">{copy.title}</h2>
                <div className="rs-code-tier">{copy.tiers[advanced ? 1 : 0]}</div>
                <div className="rs-code-heading">{copy.heading}</div>
                <div className="rs-code-example">{copy.example(advanced ? '5 3 1 7' : '5 3 1')}</div>
                <RulesCodeClues copy={copy} advanced={advanced} />
                <div className="rs-code-note">{copy.colorNote}</div>
                <div className="rs-code-rule is-first">{copy.rules[0]}</div>
                <div className="rs-code-rule">{copy.rules[1]}</div>
                <button type="button" className="rs-start rs-start-code" onClick={onStart}>{copy.button}</button>
            </div>
        );
    }

    const copy = sheet[advanced ? 'advanced' : 'basic'][lang];
    const Demo = RULES_DEMOS[copy.demo];
    const space = sheet.demoSpace || 14;
    return (
        <div className="rs-card" role="dialog" aria-modal="true" aria-label={en ? `${title} rules` : `${title}训练规则`} onClick={event => event.stopPropagation()}>
            <div className={`rs-icon rs-icon-${sheet.tone}`}><Icon name={sheet.icon} className="w-7 h-7" /></div>
            <h2 className="rs-title">{title}</h2>
            <div className="rs-subtitle">{sheet.subtitle}</div>
            <div className="rs-lead">{copy.lead}</div>
            <div className="rs-rule">
                {copy.rule.map((part, index) => (
                    typeof part === 'string'
                        ? <React.Fragment key={index}>{part}</React.Fragment>
                        : <span key={index} className={`rs-hl rs-hl-${part.tone}`}>{part.hl}</span>
                ))}
            </div>
            {copy.note && <div className="rs-note">{copy.note}</div>}
            {Demo && <div className="rs-demo" style={{ paddingTop: space, paddingBottom: space }}><Demo en={en} /></div>}
            {copy.tip && <RulesTip tone={sheet.tipTone}>{copy.tip}</RulesTip>}
            <button type="button" className="rs-start" onClick={onStart}>{en ? 'Start Training' : '开始训练'}</button>
        </div>
    );
};

// 弹窗外壳：贴底、遮罩不模糊；进入和退出都是 160ms 的缩放 + 淡入淡出（iOS .scale(0.94) + .opacity）。
// type 变成 null 时先播退出动画再卸载；点「开始」直接卸载，不在游戏画面上播退出。
const RulesSheetLayer = ({ type, advanced, en, title, onClose, onStart }) => {
    // last：最近一次打开时的游戏、档位和标题，关闭后靠它把退出动画播完
    const [last, setLast] = useState(null);
    const startedRef = useRef(false);

    useEffect(() => {
        if (type) {
            setLast({ type, advanced, title });
            return undefined;
        }
        if (startedRef.current) {
            startedRef.current = false;
            setLast(null);
            return undefined;
        }
        const timer = setTimeout(() => setLast(null), 160);
        return () => clearTimeout(timer);
    }, [type]);

    useEffect(() => {
        if (!type) return undefined;
        const onKey = (event) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [type, onClose]);

    const leaving = !type;
    const shown = type ? { type, advanced: last && last.type === type ? last.advanced : advanced, title } : last;
    if (!shown || (leaving && startedRef.current)) return null;
    return (
        <div className={`rs-layer${leaving ? ' is-leaving' : ''}`} onClick={leaving ? undefined : onClose}>
            <RulesSheetCard
                type={shown.type}
                advanced={shown.advanced}
                en={en}
                title={shown.title}
                onStart={() => { if (leaving) return; startedRef.current = true; onStart(); }}
            />
        </div>
    );
};

// 训练卡片右侧的 i：19×19 细圈里一个小写 i（iOS InfoDot），点击区 48 宽。
const RulesInfoDot = () => (
    <span className="rs-info-dot" aria-hidden="true">i</span>
);

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
// 和 iOS 用同一个键名；index.html 的启动脚本也读它，在第一帧之前定好深浅色。
const APPEARANCE_STORAGE_KEY = 'pfl_appearance';
const APPEARANCE_OPTIONS = ['system', 'light', 'dark'];
const WEEKLY_DAILY_GOAL = 5;
// 离开 App 超过这么久，限时对局就结束而不是接着玩（iOS GameSession.maximumResumableAbsence）。
const MAX_RESUMABLE_ABSENCE_MS = 30000;
// 训练里的新手教学，规则和存储键与 iOS 相同（PlayerProfile.swift 的 shouldShowTutorial / markTutorialCompleted）：
// 总开关默认开；只在训练里触发，每日挑战和两档竞技都不触发；每个游戏做完一次就不再出现；
// 密码推理只在基础档教。
const TRAINING_TUTORIAL_TASKS = ['schulte', 'stroop', 'nback', 'setgame', 'neuroncount', 'passwordlogic'];
const TUTORIAL_MODE_STORAGE_KEY = 'pfl_tutorial_mode_enabled';
const TUTORIAL_DONE_STORAGE_KEY = 'pfl_completed_training_tutorials_v1';
// 密码推理的固定教学题，与 iOS CodeLogicPuzzleEngine.tutorialPuzzle 相同：密码 178。
const CODE_LOGIC_TUTORIAL = { secret: [1, 7, 8], guesses: [[1, 8, 9], [9, 2, 3], [8, 0, 6], [1, 7, 2]] };
const EMPTY_NBACK_ROUND = { current: null, previous: null, isMatch: false, isReady: false, roundId: null, roundNumber: 0 };
const CLOUD_ANALYTICS_ENDPOINT = window.PFL_ANALYTICS_ENDPOINT || (window.location.hostname === 'boxsbraindump.github.io' ? '' : '/api/retention');
const GAME_CLICK_LABELS = {
    daily: 'Daily Challenge',
    arena: 'Cognitive Arena',
    'arena-basic': 'Cognitive Arena (Basic)',
    schulte: 'Schulte Grid',
    stroop: 'Stroop Test',
    setgame: 'SET Logic',
    nback: 'N-Back Memory',
    neuroncount: 'Neuron Counting',
    passwordlogic: 'Code Logic'
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

    // 震动和声音是两条独立的输出通道：关掉音效、或者手机本来就静音的人，
    // 正是只剩震动这一个信号的人。所以震动放在 enabled 之前，不跟着音效一起关。
    // （iOS 的 AudioManager 也是这么分的，原因写在那边的注释里。）
    // 只有「答对」和「答错」两个结果信号带震动，和 iOS 一致。开始、完成、每日打卡
    // 原来也会震，现在去掉：它们是导航和氛围，处处都震的话「震=结果」就学不出来。
    const HAPTICS = {
        success: 12,                       // 答对：轻脆一下
        error: [25, 30, 25]                // 答错：双段闷震＝“不对”
    };

    // 防连发（与 iOS AudioManager.cooldown 一致）：每种音效各自计时，距上次同种音效不到间隔就整次丢弃，
    // 声音和震动一起丢。静音时也照样计时，所以连点产生的震动不会比声音多。其余音效不节流。
    const COOLDOWN_MS = { success: 70, error: 120, tap: 80, scoreTick: 58, scoreTickHigh: 58 };
    const lastPlayedAt = {};

    return {
        play(kind, enabled = true) {
            const cooldown = COOLDOWN_MS[kind];
            if (cooldown) {
                const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
                if (lastPlayedAt[kind] !== undefined && now - lastPlayedAt[kind] < cooldown) return;
                lastPlayedAt[kind] = now;
            }
            if (HAPTICS[kind]) buzz(HAPTICS[kind]);
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

    // 与 iOS 一致（PlayerProfile.swift systemPrefersChinese）：只看系统语言列表的第一项，
    // 语言子标签恰好是 zh 才用中文（zh-CN、zh-Hant-TW、zh 都算），其余一律英文。
    // 原先只要列表里任何一项是中文就判中文，英文在前、中文在后的设备会被错判。
    const firstLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || '';

    return firstLanguage.toLowerCase().split(/[-_]/)[0] === 'zh'
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

// —— 以下为与 iOS 1.0.2 对齐的每日挑战、周报、记录、「我的」页文案和小组件（ANDROID_PARITY 第 39–44 项）——
// 文案逐字取自 iOS：DailyChallengeHome.swift、DailyChallengeFlow.swift、RootView.swift。

// 每日任务卡只写「变体 · N秒」（DailyChallengeHome.swift:114-128）
const DAILY_VARIANT_LABELS = {
    reverse: { zh: '倒序', en: 'Reverse' },
    forward: { zh: '正序', en: 'Forward' },
    'color-conflict': { zh: '颜色冲突', en: 'Color conflict' },
    'two-back': { zh: '2-Back', en: '2-Back' },
    triad: { zh: '三元组', en: 'Triad' },
    storm: { zh: '高干扰', en: 'High distraction' },
    letters: { zh: '字母', en: 'Letters' },
    grid6: { zh: '6×6', en: '6×6' }
};

const getDailyTaskMetadata = (spec, isEnglish) => {
    const label = DAILY_VARIANT_LABELS[spec.variant] || { zh: '每日挑战', en: 'Daily' };
    return isEnglish ? `${label.en} · ${spec.duration}s` : `${label.zh} · ${spec.duration}秒`;
};

// 主卡副标题：只有 Stroop 颜色冲突换成专用说明，其余用挑战自己的副标题（DailyChallengeHome.swift:103-110）
const getDailyHeroSubtitle = (spec, theme, isEnglish) => {
    if (spec.task === 'stroop' && spec.variant === 'color-conflict') {
        return isEnglish
            ? 'Ignore the word and tap the answer matching its ink color.'
            : '忽略文字含义，选择与文字物理颜色相符的答案。';
    }
    return theme?.subtitle || '';
};

// 开始前规则卡的规则句（DailyChallengeFlow.swift:87-106）
const getDailyGateRule = (spec, isEnglish) => {
    if (spec.task === 'schulte') {
        if (spec.variant === 'reverse') return isEnglish ? 'Tap the numbers from 25 → 1 in order.' : '按 25 → 1 的顺序，依次点击方格中的数字。';
        if (spec.variant === 'letters') return isEnglish ? 'Tap the letters from A → Y in order.' : '按 A → Y 的顺序，依次点击方格中的字母。';
        if (spec.variant === 'grid6') return isEnglish ? 'Tap the 6×6 grid from 1 → 36 in order.' : '按 1 → 36 的顺序，依次点击 6×6 方格。';
        return isEnglish ? 'Tap the numbers from 1 → 25 in order.' : '按 1 → 25 的顺序，依次点击方格中的数字。';
    }
    if (spec.task === 'stroop') return isEnglish ? 'Ignore the word and tap the answer matching its ink color.' : '忽略文字含义，点击与文字物理颜色相符的答案。';
    if (spec.task === 'nback') return isEnglish ? 'Decide whether the current number matches the one 2 steps back.' : '判断当前数字是否与前第 2 步出现的数字相同。';
    if (spec.task === 'setgame') return isEnglish ? 'Choose 3 cards whose attributes are all the same or all different.' : '选择 3 张牌，让每项属性都全同或全异。';
    return isEnglish ? 'Count every shape that matches the target, then submit the total.' : '数出所有与目标相同的图形，然后提交数量。';
};

// 示意图的读屏说明（DailyChallengeFlow.swift:197-212）
const getDailyGateDemoLabel = (spec, isEnglish) => {
    if (spec.task === 'schulte') {
        if (spec.variant === 'reverse') return isEnglish ? 'Reverse Schulte example: tap 25, then 24, then 23' : '倒序舒尔特示例：依次点击二十五、二十四、二十三';
        return isEnglish ? 'Schulte Grid example: tap the cells in order' : '舒尔特方格示例：按顺序点击方格';
    }
    if (spec.task === 'stroop') return isEnglish ? 'Stroop example: a red word in blue ink; choose blue' : 'Stroop 示例：蓝色显示的红字，应选择蓝色';
    if (spec.task === 'nback') return isEnglish ? 'Two-back example: 4, 9, 4; the current number matches two steps back' : '二回溯示例：四、九、四，当前数字与前第二步相同';
    if (spec.task === 'setgame') return isEnglish ? 'SET example: three circle cards with all different colors form a valid set' : 'SET 示例：三张圆形卡片颜色全异，构成有效 SET';
    return isEnglish ? 'Neuron counting example: count the three target circles' : '神经元计数示例：数出三个目标圆形';
};

const DAILY_PARITY_TEXT = {
    zh: {
        tomorrow: '明日',
        gateKicker: '每日挑战',
        gateStart: '开始挑战',
        gateLater: '暂不挑战',
        resultNote: '完成每日挑战会点亮连续记录。',
        // 周报未解锁页（RootView.swift:1938-1967）
        lockKicker: '周报解锁',
        lockTitle: '再完成几次每日挑战，周报就会开始生成',
        lockBody: '训练记录已经在本机保存。完成 3 天每日挑战后，就可以查看第一份每周总结。',
        lockProgress: '入门周报',
        lockDaysLeft: (n) => `还需要 ${n} 天每日挑战`,
        lockCta: '开始今日挑战',
        mostImproved: '进步最大',
        language: '语言',
        tutorials: '新手教学',
        appearance: '外观',
        sound: '音效'
    },
    en: {
        tomorrow: 'Tomorrow',
        gateKicker: 'Daily Challenge',
        gateStart: 'Start challenge',
        gateLater: 'Not now',
        resultNote: 'Daily completion lights up your streak.',
        lockKicker: 'REPORT UNLOCK',
        lockTitle: 'A few more daily challenges, then your report begins',
        lockBody: 'Your training record is already being saved. Complete the daily challenge on 3 days to unlock your first weekly summary.',
        lockProgress: 'STARTER REPORT',
        lockDaysLeft: (n) => `${n} more days of the daily challenge`,
        lockCta: "Start today's challenge",
        mostImproved: 'Most improved',
        language: 'Language',
        tutorials: 'New Player Tutorials',
        appearance: 'Appearance',
        sound: 'Sound'
    }
};

// 周报结尾建议第 1 条要用到各游戏的目标，取自 iOS WebsiteContent.json（中文与 TASK_DATA.goal 相同；英文网页原本没有）
const TASK_GOALS_ZH = {
    schulte: '提升视觉搜索效率与专注力',
    stroop: '练习抑制本能反应的冲动',
    nback: '训练大脑不断更新暂存信息的能力',
    setgame: '识别属性的全同与全异',
    neuroncount: '在干扰中精确统计目标数量',
    passwordlogic: '从线索中推理出唯一密码'
};

const TASK_GOALS_EN = {
    schulte: 'Train visual search and focus',
    stroop: 'Practice inhibiting automatic responses',
    nback: 'Train working-memory updating',
    setgame: 'Recognize same and different properties',
    neuroncount: 'Count targets accurately among distractions',
    passwordlogic: 'Deduce one unique code from the clues'
};

const WEEKLY_SUGGESTION_ORDER = ['schulte', 'stroop', 'nback', 'setgame', 'neuroncount', 'passwordlogic'];

// 周报里按游戏归类：竞技基础档记作 arena-basic，与 iOS 一样并成 arena
const getWeeklyEventTask = (event) => {
    const task = event.dailyTask || event.task || 'schulte';
    return task === 'arena-basic' ? 'arena' : task;
};

// 规则卡里的小示意图，不可点，只是把玩法先画出来（DailyChallengeFlow.swift:229-340）
const DailyGateDemo = ({ spec, isEnglish }) => {
    if (spec.task === 'schulte') {
        const values = spec.variant === 'reverse' ? ['25', '24', '23'] : spec.variant === 'letters' ? ['A', 'B', 'C'] : ['1', '2', '3'];
        return (
            <div className="daily-gate-demo-row">
                {values.map((value, index) => (
                    <React.Fragment key={value}>
                        <span className={`daily-gate-schulte-cell ${index === 0 ? 'is-target' : ''}`}>{value}</span>
                        {index < values.length - 1 && (
                            <svg className="daily-gate-arrow" viewBox="0 0 15 12" aria-hidden="true">
                                <path d="M0 6H15M10 2L15 6L10 10" />
                            </svg>
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    }
    if (spec.task === 'stroop') {
        return (
            <div className="daily-gate-stroop">
                <div className="daily-gate-stroop-word">{isEnglish ? 'RED' : '红 色'}</div>
                <div className="daily-gate-demo-row is-tight">
                    <span className="daily-gate-color-choice is-red">{isEnglish ? 'Red' : '红色'}</span>
                    <span className="daily-gate-color-choice is-blue is-selected">{isEnglish ? 'Blue' : '蓝色'}</span>
                </div>
            </div>
        );
    }
    if (spec.task === 'nback') {
        const cards = [
            { number: '4', label: isEnglish ? '2 back' : '前第 2 步', active: true },
            { number: '9', label: isEnglish ? 'skip' : '跳过', active: false },
            { number: '4', label: isEnglish ? 'now' : '当前', active: true }
        ];
        return (
            <div className="daily-gate-demo-row is-nback">
                {cards.map((card, index) => (
                    <div key={index} className={`daily-gate-nback-card ${card.active ? 'is-active' : ''}`}>
                        <span>{card.number}</span>
                        <small>{card.label}</small>
                    </div>
                ))}
            </div>
        );
    }
    if (spec.task === 'setgame') {
        return (
            <div className="daily-gate-demo-row">
                {['#6366f1', '#ef4444', '#10b981'].map(color => (
                    <span key={color} className="daily-gate-set-card"><i style={{ background: color }} /></span>
                ))}
            </div>
        );
    }
    return (
        <div className="daily-gate-demo-row is-neuron">
            <div className="daily-gate-neuron-target">
                <i />
                <small>{isEnglish ? 'Target' : '目标'}</small>
            </div>
            <div className="daily-gate-neuron-field">
                <i /><b /><i /><i />
            </div>
            <span className="daily-gate-neuron-answer">3</span>
        </div>
    );
};

// 每日结算的绿色勾：实心圆里镂出一个勾形三角（与 iOS DailyResultMark 同一路径）
const DailyResultMark = () => (
    <svg viewBox="0 0 40 40" className="daily-result-mark" aria-hidden="true">
        <path fill="currentColor" fillRule="evenodd" d="M4.8 20a15.2 15.2 0 1 0 30.4 0a15.2 15.2 0 1 0-30.4 0Z M9.6 21.2L17.2 28.8L31.2 12.4Z" />
    </svg>
);

// 「我的」页的开关，照 iOS 系统开关画（轨道 51×31、白色滑块 27）
const ParitySwitch = ({ checked, onChange, label }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`parity-switch ${checked ? 'is-on' : ''}`}
        onClick={() => onChange(!checked)}
    >
        <span className="parity-switch-thumb" />
    </button>
);

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

    // —— 以下逐条照 iOS 1.0.2 周报（RootView.swift:2507-2691） ——
    // 第 01 行：按本周每日挑战天数分三档
    const daysCopy = completedDays < 5
        ? (isEnglish ? 'Enough to show a pattern. One or two more days makes it steadier.' : '刚好够看出规律。再多一两天，节奏会更稳。')
        : completedDays <= 6
            ? (isEnglish ? 'You came back on nearly every day this week.' : '这一周你几乎每天都回来了。')
            : (isEnglish ? 'A full week, without missing a day.' : '整整一周，一天没落。');

    const groupByTask = (list) => list.reduce((acc, event) => {
        const task = getWeeklyEventTask(event);
        (acc[task] = acc[task] || []).push(event);
        return acc;
    }, {});
    const weekByTask = groupByTask(weekCompletions);
    const previousByTask = groupByTask(previousWeekCompletions);
    // 两周都玩过的游戏，按字母序遍历（与 iOS 的 sorted() 一致，决定并列时取谁）
    const sharedTasks = Object.keys(weekByTask).filter(task => previousByTask[task]).sort();
    const positiveDurations = (list) => list.map(event => Number(event.durationSeconds || 0)).filter(value => Number.isFinite(value) && value > 0);
    const scoresOf = (list) => list.map(event => Number(event.score || 0)).filter(value => Number.isFinite(value));

    // 第 02 行「进步最大」：舒尔特看最快用时，其余看最高分，换成百分比后取最大的正值
    let mostImproved = null;
    sharedTasks.forEach(task => {
        const usesTime = task === 'schulte';
        let percent = null;
        if (usesTime) {
            const now = positiveDurations(weekByTask[task]);
            const then = positiveDurations(previousByTask[task]);
            if (now.length && then.length) {
                const nowBest = Math.min(...now);
                const thenBest = Math.min(...then);
                percent = Math.round(((thenBest - nowBest) / thenBest) * 100);
            }
        } else {
            const now = scoresOf(weekByTask[task]);
            const then = scoresOf(previousByTask[task]);
            if (now.length && then.length) {
                const nowBest = Math.max(...now);
                const thenBest = Math.max(...then);
                if (thenBest > 0) percent = Math.round(((nowBest - thenBest) / thenBest) * 100);
            }
        }
        if (percent === null || percent <= 0) return;
        if (!mostImproved || percent > mostImproved.percent) mostImproved = { task, percent, usesTime };
    });
    const mostImprovedCopy = mostImproved
        ? (mostImproved.usesTime
            ? (isEnglish ? `${mostImproved.percent}% faster than last week.` : `用时比上周快了 ${mostImproved.percent}%。`)
            : (isEnglish ? `${mostImproved.percent}% higher than last week.` : `最高分比上周高了 ${mostImproved.percent}%。`))
        : null;

    // 第 03 行：和上周最高分比
    const bestCopy = previousBestScore <= 0
        ? (isEnglish ? 'There is no score from last week to compare — this one sets the baseline.' : '上周还没有可比的成绩，这一条就是新的起点。')
        : bestScore > previousBestScore
            ? (isEnglish ? `${bestScore - previousBestScore} points above last week's ${previousBestScore}.` : `比上周的 ${previousBestScore} 分高了 ${bestScore - previousBestScore} 分。`)
            : bestScore < previousBestScore
                ? (isEnglish ? `Last week reached ${previousBestScore}. This time is ${previousBestScore - bestScore} short.` : `上周是 ${previousBestScore} 分，这次还差 ${previousBestScore - bestScore} 分。`)
                : (isEnglish ? 'The same as last week — holding steady counts too.' : '和上周持平，稳住也是一种结果。');

    // 第 04 行对比胶囊的数字滚动目标：两周都有舒尔特用时，或两周都有最高分时才滚动
    const comparisonCount = fastestSchulte && previousFastestSchulte
        ? { previous: previousFastestSchulte, current: fastestSchulte, unit: 'seconds' }
        : bestScore && previousBestScore
            ? { previous: previousBestScore, current: bestScore, unit: 'score' }
            : null;

    // 结尾建议：四条规则按顺序，先成立的生效
    const accuracyOf = (list) => {
        const correct = list.reduce((sum, event) => sum + (Number(event.correct) || 0), 0);
        const attempts = correct + list.reduce((sum, event) => sum + (Number(event.incorrect) || 0), 0);
        return attempts > 0 ? correct / attempts : null;
    };
    let decliningTask = null;
    let worstDrop = 0.05;
    sharedTasks.forEach(task => {
        const now = accuracyOf(weekByTask[task]);
        const then = accuracyOf(previousByTask[task]);
        if (now === null || then === null) return;
        const drop = then - now;
        if (drop >= worstDrop) {
            worstDrop = drop;
            decliningTask = task;
        }
    });
    // 从报告所在的那一周往前数，每周（周一到周日）至少有一局就算连续，最多 52 周
    const trainedDays = new Set([...allCompletions, ...previousWeekCompletions]
        .map(event => event.dailyDay || event.day || (event.at ? getDayKey(new Date(event.at)) : null))
        .filter(Boolean));
    let consecutiveWeeks = 0;
    let cursorWeekStart = weekStart;
    while (consecutiveWeeks < 52) {
        const start = cursorWeekStart;
        const hasSession = Array.from({ length: 7 }, (_, index) => getOffsetDayKey(start, index)).some(day => trainedDays.has(day));
        if (!hasSession) break;
        consecutiveWeeks += 1;
        cursorWeekStart = getOffsetDayKey(start, -7);
    }
    const playedTasks = Object.keys(weekByTask);
    let advice;
    const onlyTask = playedTasks.length === 1 ? playedTasks[0] : null;
    const suggestedTask = onlyTask ? WEEKLY_SUGGESTION_ORDER.find(task => task !== onlyTask) : null;
    const nameOf = (task) => {
        if (!taskTitle) return task;
        try { return taskTitle(task); } catch (error) { return task; }
    };
    if (suggestedTask) {
        advice = isEnglish
            ? `You stayed with one game this week. Next week, try ${nameOf(suggestedTask)}: ${TASK_GOALS_EN[suggestedTask]}.`
            : `这周你只练了一个项目。下周可以试试「${nameOf(suggestedTask)}」：${TASK_GOALS_ZH[suggestedTask]}。`;
    } else if (decliningTask) {
        advice = isEnglish
            ? `Your accuracy on ${nameOf(decliningTask)} slipped from last week. Slowing down usually helps more than speeding up.`
            : `「${nameOf(decliningTask)}」的正确率比上周低了一些。慢一点做，往往比快更有用。`;
    } else if (consecutiveWeeks >= 2) {
        advice = isEnglish ? `You have trained ${consecutiveWeeks} weeks in a row now.` : `你已经连续 ${consecutiveWeeks} 周保持训练了。`;
    } else {
        advice = isEnglish ? 'Keep the rhythm going. One small session is enough to return.' : '保持现在的节奏，下一次回来就算继续前进。';
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
        suggestion,
        daysCopy,
        mostImproved,
        mostImprovedCopy,
        bestCopy,
        comparisonCount,
        advice
    };
};

// 竞技一局总时长（秒）。记录时长按「总时长 − 剩余秒数」算，被罚掉的秒也计入（iOS ArenaSession.elapsedSeconds）。
const ARENA_DURATION_SECONDS = 90;
// 竞技专属文案（iOS ArenaTrainingFlow.swift 的 ArenaSet / ArenaResult）。
const ARENA_COPY = {
    zh: {
        setHint: '找出一组 SET：每个属性全同或全异',
        resultTitle: '竞技结束 - 最终得分',
        resultSubtitle: '全程混合挑战完成',
        accuracy: '正确率',
        correct: '答对',
        mistakes: '错误',
        backToArena: '返回竞技场'
    },
    en: {
        setHint: 'Find a SET: every property is all same or all different.',
        resultTitle: 'ARENA COMPLETE — FINAL SCORE',
        resultSubtitle: 'Mixed challenge complete',
        accuracy: 'Accuracy',
        correct: 'Correct',
        mistakes: 'Mistakes',
        backToArena: 'Back to Arena'
    }
};

function App() {
    const DEFAULT_TASK_BESTS = { schulte: 0, stroop: 0, nback: 0, setgame: 0, neuroncount: 0, passwordlogic: 0 };
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
    // 训练 tab 记住上次选的档位：去每日挑战或竞技转一圈再回来，仍是原来那一档（与 iOS 一致）。
    const lastTrainingModeRef = useRef('normal');
    useEffect(() => {
        if (mode === 'normal' || mode === 'hard' || mode === 'infinite') lastTrainingModeRef.current = mode;
    }, [mode]);
    const [arenaDifficulty, setArenaDifficulty] = useState('basic');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [lastScore, setLastScore] = useState(0);
    const [animatedScore, setAnimatedScore] = useState(0);
    // 密码推理结算页：分数、完成题目、用时、错误提交四个数共用这一个缓动进度（0→1），同步滚动。
    const [codeResultEase, setCodeResultEase] = useState(1);
    const [lastRunStats, setLastRunStats] = useState(null);
    const [isError, setIsError] = useState(false);
    // 竞技里五个模块答错都让计时胶囊闪红 400ms（iOS errorFlash），与整屏闪红（isError）分开。
    const [timerFlash, setTimerFlash] = useState(false);
    const [answerFeedback, setAnswerFeedback] = useState(null);
    const [showInfo, setShowInfo] = useState(null);
    const [weeklyReceiptOpen, setWeeklyReceiptOpen] = useState(false);
    const [weeklyReportStep, setWeeklyReportStep] = useState(0);
    const [weeklyReportCount, setWeeklyReportCount] = useState(0);
    const [weeklyReportScore, setWeeklyReportScore] = useState(0);
    // 周报第 04 行对比胶囊的滚动数字（与 iOS 一致）
    const [weeklyReportCompare, setWeeklyReportCompare] = useState({ previous: 0, current: 0 });
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
    // 每日挑战开始前的规则卡（iOS 每次开局、包括「再冲一次」都会先显示）
    const [dailyGateOpen, setDailyGateOpen] = useState(false);
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
    const [appearance, setAppearance] = useState(() => {
        try {
            const saved = localStorage.getItem(APPEARANCE_STORAGE_KEY);
            return APPEARANCE_OPTIONS.includes(saved) ? saved : 'system';
        } catch (error) {
            return 'system';
        }
    });
    const ui = UI_TEXT[lang];
    const isEnglish = lang === 'en';
    const isGameView = !['home', 'result', 'analytics', 'settings', 'settings-daily', 'weekly-report', 'training-records'].includes(view);
    const isDailyMode = mode === 'daily';
    const isInfiniteMode = mode === 'infinite';
    // 竞技场分两档，和 app 一致：进阶就是竞技场一直以来的玩法，
    // 基础换上每个模块自己的基础规则。这一个开关就是各游戏读的那个，
    // 所以两档的差异不需要在每个游戏里再写一遍。
    const isArenaAdvanced = arenaDifficulty === 'advanced';
    const isChallengeDifficulty = mode === 'hard' || (mode === 'comp' && isArenaAdvanced) || isDailyMode;
    // 埋点：mode 仍然是 comp（分析面板的竞技开局数按它统计），
    // 两档靠 task 区分，进阶沿用 arena 以免和历史数据断开。
    const arenaTaskKey = isArenaAdvanced ? 'arena' : 'arena-basic';
    const dailySpec = getDailySpec();
    const dailyRecord = dailyProgress.days?.[dailySpec.day] || {};
    const dailyStreak = getDailyStreak(dailyProgress.days, dailySpec.day);
    // 训练页顶部的每日挑战卡，四种状态与文案照搬 iOS（WebsiteTrainingHome.swift 的 streakState）。
    // dailyStreak 从今天往回数，今天没做就是 0；这里要显示的是「还活着的连续记录」，所以从昨天往回数。
    const trainingStreakState = (() => {
        const cost = isEnglish ? 'a minute or two' : '一到两分钟';
        const dayUnit = (count) => isEnglish ? (count === 1 ? 'day' : 'days') : '天';
        if (dailyRecord.completed) {
            return {
                eyebrow: isEnglish ? 'DAILY STREAK' : '连续挑战',
                figure: String(dailyStreak),
                unit: dayUnit(dailyStreak),
                status: isEnglish ? "Today's challenge is done — come back tomorrow." : '今日挑战已完成，明天回来继续。'
            };
        }
        const liveRun = getDailyStreak(dailyProgress.days, getOffsetDayKey(dailySpec.day, -1));
        if (liveRun > 0) {
            return {
                eyebrow: isEnglish ? 'DAILY STREAK' : '连续挑战',
                figure: String(liveRun),
                unit: dayUnit(liveRun),
                status: isEnglish
                    ? `${cost} — finish it and the run reaches day ${liveRun + 1}.`
                    : `${cost}，完成后连续记录就是第 ${liveRun + 1} 天。`
            };
        }
        const hasEverCompleted = Object.values(dailyProgress.days || {}).some(value => value?.completed);
        if (!hasEverCompleted) {
            return {
                eyebrow: isEnglish ? 'DAILY CHALLENGE' : '每日挑战',
                figure: isEnglish ? 'Start' : '开始',
                unit: null,
                status: isEnglish ? `${cost} — finish it and day 1 is yours.` : `${cost}，完成就点亮连续记录第 1 天。`
            };
        }
        // 连续记录断了不提，只说今天的挑战还没做。
        return {
            eyebrow: isEnglish ? 'DAILY CHALLENGE' : '每日挑战',
            figure: isEnglish ? 'To do' : '待完成',
            unit: null,
            status: isEnglish ? `${cost} — finish it and the run restarts at day 1.` : `${cost}，完成后连续记录从第 1 天重新开始。`
        };
    })();
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
    const dailyTheme = dailySpec.theme?.[lang] || dailySpec.theme?.en;
    const dailyParityText = isEnglish ? DAILY_PARITY_TEXT.en : DAILY_PARITY_TEXT.zh;
    const openDailyGate = () => {
        playSound('tap');
        setDailyGateOpen(true);
    };
    const tomorrowTheme = tomorrowSpec.theme?.[lang] || tomorrowSpec.theme?.en;
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

    const getTaskTitle = (type) => {
        // 基础竞技记为 arena-basic（埋点要和进阶分开），显示时同样是竞技场，不能落到「训练」。
        const fallback = (type === 'arena' || type === 'arena-basic')
            ? ui.arenaShortTitle
            : type === 'daily'
                ? ui.dailyTitle
                : (isEnglish ? 'Training' : '训练');
        return isEnglish
            ? TASK_TRANSLATIONS[type]?.title || TASK_DATA[type]?.en || fallback
            : TASK_DATA[type]?.title || TASK_TRANSLATIONS[type]?.title || fallback;
    };
    const getTaskHome = (type, hardMode) => (
        isEnglish
            ? TASK_TRANSLATIONS[type]?.[hardMode ? 'homeHard' : 'homeBasic']
            : TASK_DATA[type][hardMode ? 'homeHard' : 'homeBasic']
    );

    // --- 数据迁移逻辑：确保 1.0 数据同步到 5.0 ---
    const [history, setHistory] = useState(() => {
        let base = { bestScore: 0, bestCompScore: 0, bestCompBasicScore: 0, isHardUnlocked: false, taskBestScores: DEFAULT_TASK_BESTS };

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

    // 两档各记各的最高分，所以竞技页显示的永远是当前这一档的纪录。
    const arenaBestScore = isArenaAdvanced ? (history.bestCompScore || 0) : (history.bestCompBasicScore || 0);

    // ==========================================
    // ✨ 在这里插入：更新公告状态管理
    // ==========================================
    const [showUpdateNote, setShowUpdateNote] = useState(() => {
        // 这个版本的公告没见过就弹一次——但只对老玩家弹。新装的人（包括安卓包的所有首批用户）
        // 看到的会是一堆与他无关的「更新」，所以直接记为已读、不弹（与 iOS 计划的规则一致，见 docs/TODO.md 第 6 项）。
        const shouldPreviewUpdate = new URLSearchParams(window.location.search).has('showUpdate');
        if (shouldPreviewUpdate) return true;
        try {
            if (localStorage.getItem('prefrontal_lab_v6.2.1_update')) return false;
            const isReturningPlayer = ['brain_train_pro_v5', 'brain_train_pro_data', DAILY_STORAGE_KEY, RETENTION_STORAGE_KEY]
                .some(key => localStorage.getItem(key) !== null)
                || Object.keys(localStorage).some(key => /^prefrontal_lab_v[\d.]+_update$/.test(key));
            if (!isReturningPlayer) {
                localStorage.setItem('prefrontal_lab_v6.2.1_update', 'true');
                return false;
            }
            return true;
        } catch (error) { return false; }
    });

    const closeUpdateNote = () => {
        playSound('tap');
        // 玩家点击按钮后，在本地存入 'true'，下次刷新就不会再弹了
        localStorage.setItem('prefrontal_lab_v6.2.1_update', 'true');
        setShowUpdateNote(false);
    };

    const closeFirstPlayNudge = (shouldStart = false) => {
        playSound('tap');
        try { localStorage.setItem('pfl_first_play_nudge_done', 'true'); } catch (e) { }
        setShowFirstPlayNudge(false);
        if (shouldStart) {
            // 与 iOS 一致（WebsiteTrainingHome.swift startFirstPlaySchulte）：先切回基础，再开舒尔特。
            // startChallenge 读的是本次渲染里的 mode，在进阶/无限档直接调用会按旧档位开局，
            // 所以档位不是基础时，等 mode 真正变成 normal 之后再由下面的 effect 开局。
            if (mode === 'normal') {
                startChallenge('schulte');
            } else {
                pendingFirstPlayStartRef.current = true;
                setMode('normal');
            }
        }
    };

    const pendingFirstPlayStartRef = useRef(false);
    useEffect(() => {
        if (!pendingFirstPlayStartRef.current || mode !== 'normal') return;
        pendingFirstPlayStartRef.current = false;
        startChallenge('schulte');
    }, [mode]);

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

    // 进阶不再要 500 分解锁，与 iOS 一致（iOS 已删除这道门槛，见 docs/MONETIZATION_V1.md）。
    // 旧存档里的 isHardUnlocked 字段留着不读，不影响任何人。
    const goHomeMode = (nextMode) => {
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
            onClick: () => goHomeMode((mode === 'comp' || mode === 'daily') ? lastTrainingModeRef.current : mode)
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

    // 与 iOS 1.0.2 一致（RootView.swift tabPage / RootNavigationBar）：切 tab 时新页面从 ±18pt 淡入归位
    // （easeInOut 0.28s；减弱动态效果时只淡入 0.16s），选中 tab 的图标上跳一下（0.10s 上、0.14s 回）。
    // 往右边的 tab 切，新页面从右边进来。用 Web Animations 直接作用在当前页面根节点上，不改各页面的 JSX。
    const activeNavIndex = navItems.findIndex(item => item.active);
    const activeNavKey = activeNavIndex >= 0 ? navItems[activeNavIndex].key : null;
    const previousNavIndexRef = useRef(activeNavIndex);
    const [nudgedNavKey, setNudgedNavKey] = useState(null);
    React.useLayoutEffect(() => {
        const previousIndex = previousNavIndexRef.current;
        previousNavIndexRef.current = activeNavIndex;
        if (previousIndex < 0 || activeNavIndex < 0 || previousIndex === activeNavIndex) return undefined;
        const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        const page = document.querySelector('.app-content-screen');
        if (page && typeof page.animate === 'function') {
            const offset = reduceMotion ? 0 : (activeNavIndex > previousIndex ? 18 : -18);
            page.animate(
                [
                    { opacity: 0, transform: `translateX(${offset}px)` },
                    { opacity: 1, transform: 'translateX(0px)' }
                ],
                reduceMotion
                    ? { duration: 160, easing: 'ease-out' }
                    : { duration: 280, easing: 'cubic-bezier(0.42, 0, 0.58, 1)' }
            );
        }
        if (reduceMotion) return undefined;
        setNudgedNavKey(navItems[activeNavIndex].key);
        const timer = setTimeout(() => setNudgedNavKey(null), 240);
        return () => clearTimeout(timer);
    }, [activeNavIndex]);

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
            <div className="settings-menu-section">
                <div className="settings-row-label">{ui.settingsAppearance}</div>
                <div className="settings-language-group is-three">
                    {APPEARANCE_OPTIONS.map(option => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => chooseAppearance(option)}
                            className={`settings-language-option ${appearance === option ? 'is-active' : ''}`}
                            aria-pressed={appearance === option}
                        >
                            {appearanceLabel(option)}
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
                goal: "提升视觉搜索效率与专注力"
            },
            effect: "增强视觉广度及快速信息处理能力。"
        },
        stroop: {
            title: "Stroop 干扰", en: "Stroop Test", icon: "palette", color: "text-rose-500", time: 60,
            homeBasic: "认知抑制控制", homeHard: "双重语义冲突",
            guide: {
                goal: "练习抑制本能反应的冲动"
            },
            effect: "锻炼反应抑制和选择性注意力。"
        },
        nback: {
            title: "N-Back 记忆", en: "N-Back Task", icon: "brain", color: "text-indigo-500", time: 60,
            homeBasic: "1-Back模式", homeHard: "2-Back 双重难度",
            guide: {
                goal: "训练大脑不断更新暂存信息的能力"
            },
            effect: "提升流体智力和工作记忆容量。"
        },
        setgame: {
            title: "SET 逻辑", en: "Set Logic", icon: "shapes", color: "text-green-500", time: 60,
            homeBasic: "逻辑处理", homeHard: "增加填充度维度",
            guide: {
                goal: "识别属性的全同与全异"
            },
            effect: "提升前额叶的并行逻辑处理能力。"
        },
        //5/11新加入
        neuroncount: {
            title: "神经元计数", en: "Neuron Counting", icon: "binary", color: "text-amber-500", time: 60,
            homeBasic: "目标计数：同形同色", homeHard: "干扰物增加",
            guide: {
                goal: "在干扰中精确统计目标数量"
            }
        },
        // 密码推理是原生 App 先做的游戏，网页没有原版，所以这里以 iOS 为准：
        // 题库、难度带和线索措辞都来自 CodeLogicPuzzleEngine.swift。
        passwordlogic: {
            title: "密码推理", en: "Code Logic", icon: "lock-keyhole", color: "text-indigo-600", time: 0,
            homeBasic: "三位数字逻辑", homeHard: "四位数字逻辑",
            guide: {
                goal: "从线索中推理出唯一密码"
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
    const weeklyReportHasBasicAccess = weeklyReport.completedDays >= weeklyReportBasicUnlockDays;
    const weeklyReportUnlocked = !weeklyReportGatePreview && weeklyReportHasBasicAccess;
    // 对比胶囊滚动时的单位：舒尔特用时带「秒 / s」，最高分不带
    const weeklyReportCompareSuffix = weeklyReport.comparisonCount?.unit === 'seconds' ? (isEnglish ? 's' : '秒') : '';
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
    // 「我的」页标着「本周状态」，就永远只算本周，不跟着训练记录页的日 / 周 / 月切换走（与 iOS 一致）。
    const myWeekRecords = buildTrainingRecordData({
        retentionData,
        dailyProgress,
        today: dailySpec.day,
        taskTitle: getTaskTitle,
        isEnglish,
        range: 'week',
        preview: isTrainingRecordsPreview,
        monthOffset: 0
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
            appearanceHint: 'Follow the system, or keep it light or dark.',
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
            appearanceHint: '跟随系统，或固定使用浅色、深色。',
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
            setWeeklyReportCompare({ previous: 0, current: 0 });
            return undefined;
        }

        setWeeklyReportStep(0);
        setWeeklyReportCount(0);
        setWeeklyReportScore(0);
        setWeeklyReportCompare({ previous: 0, current: 0 });
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
        // 第 04 行对比胶囊：第 04 行出现时（3150ms）两边一起从 0 滚到实际值，每 34ms 一步、约 28 步，无音效（iOS RootView.swift:2220-2234）
        const compareTarget = weeklyReport.comparisonCount;
        let compareTimer;
        const compareStartTimer = compareTarget ? setTimeout(() => {
            let previous = 0;
            let current = 0;
            const previousStep = Math.max(1, Math.ceil(compareTarget.previous / 28));
            const currentStep = Math.max(1, Math.ceil(compareTarget.current / 28));
            compareTimer = setInterval(() => {
                previous = Math.min(compareTarget.previous, previous + previousStep);
                current = Math.min(compareTarget.current, current + currentStep);
                setWeeklyReportCompare({ previous, current });
                if (previous >= compareTarget.previous && current >= compareTarget.current) clearInterval(compareTimer);
            }, 34);
        }, 3150) : null;

        return () => {
            timers.forEach(timer => clearTimeout(timer));
            clearTimeout(countStartTimer);
            if (countTimer) clearInterval(countTimer);
            clearTimeout(scoreStartTimer);
            if (scoreTimer) clearInterval(scoreTimer);
            if (compareStartTimer) clearTimeout(compareStartTimer);
            if (compareTimer) clearInterval(compareTimer);
        };
    }, [view, weeklyReport.completedDays, weeklyReportScoreTarget, weeklyReportUnlocked, weeklyReport.comparisonCount?.previous, weeklyReport.comparisonCount?.current]);

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
    // 密码推理：puzzle 由 gameLogic.js 的引擎生成，entry 是当前输入的每一位。
    // roundIncorrect 只记本题的错误次数（决定这题得分），incorrect 记整局的。
    const [codeLogic, setCodeLogic] = useState({
        puzzle: null, entry: [], selected: 0, feedback: null, solved: 0, incorrect: 0, roundIncorrect: 0, elapsed: 0
    });
    const [controlPulse, setControlPulse] = useState(null);
    const [controlPulseIsError, setControlPulseIsError] = useState(false);
    const nbackSeq = useRef([]);
    const feedbackTimer = useRef(null);
    const controlPulseTimer = useRef(null);
    const neuronMoveTimer = useRef(null);
    const codeFeedbackTimer = useRef(null);
    const resultScoreFrame = useRef(null);
    const resultScoreTickRef = useRef({ lastAt: 0, lastStep: 0 });
    const answerLock = useRef(false);
    const sessionIdRef = useRef(`session-${Date.now()}-${Math.random().toString(16).slice(2)}`);
    const currentRunRef = useRef(null);
    const runStatsRef = useRef({ task: null, attempts: 0, correct: 0, incorrect: 0, startedAtMs: 0 });
    const awayMsRef = useRef(0);
    const hiddenAtRef = useRef(null);
    const gameLifecycleRef = useRef({});
    const [isAppHidden, setIsAppHidden] = useState(false);

    // ---- 新手教学 ----
    const [tutorialModeEnabled, setTutorialModeEnabledState] = useState(() => {
        try { return localStorage.getItem(TUTORIAL_MODE_STORAGE_KEY) !== 'false'; } catch (e) { return true; }
    });
    const [completedTutorials, setCompletedTutorials] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(TUTORIAL_DONE_STORAGE_KEY) || '[]');
            return Array.isArray(stored) ? stored : [];
        } catch (e) { return []; }
    });
    // 进行中的教学：{ task, correct, step }。回调里要同步读到最新值，所以另存一份在 ref 里。
    const [tutorial, setTutorialState] = useState(null);
    const tutorialRef = useRef(null);
    const setTutorial = (next) => {
        tutorialRef.current = next;
        setTutorialState(next);
    };
    // 教学结束到正式开局之间的交接画面：{ kind: 'countdown' | 'schulte' | 'codelogic', stage }。
    const [tutorialHandoff, setTutorialHandoff] = useState(null);
    const tutorialTimers = useRef([]);
    const clearTutorialTimers = () => {
        tutorialTimers.current.forEach(clearTimeout);
        tutorialTimers.current = [];
    };
    const updateCompletedTutorials = (update) => {
        setCompletedTutorials(previous => {
            const next = update(previous);
            try { localStorage.setItem(TUTORIAL_DONE_STORAGE_KEY, JSON.stringify(next)); } catch (e) { }
            return next;
        });
    };
    const setTutorialModeEnabled = (enabled) => {
        playSound('tap');
        // 与 iOS 一致：重新打开总开关，等于要求再看一次密码推理的首玩说明，其余五个游戏的完成状态不动。
        if (enabled && !tutorialModeEnabled) updateCompletedTutorials(list => list.filter(task => task !== 'passwordlogic'));
        setTutorialModeEnabledState(enabled);
        try { localStorage.setItem(TUTORIAL_MODE_STORAGE_KEY, enabled ? 'true' : 'false'); } catch (e) { }
    };
    // 「重新开启全部教学」只清完成记录，并确保总开关是开的；不开局，也不动分数和记录。
    const replayAllTutorials = () => {
        playSound('tap');
        updateCompletedTutorials(() => []);
        setTutorialModeEnabledState(true);
        try { localStorage.setItem(TUTORIAL_MODE_STORAGE_KEY, 'true'); } catch (e) { }
    };
    const shouldShowTutorial = (task) => tutorialModeEnabled
        && TRAINING_TUTORIAL_TASKS.includes(task)
        && mode !== 'daily'
        && mode !== 'comp'
        && !completedTutorials.includes(task)
        && (task !== 'passwordlogic' || mode === 'normal');
    const cancelTutorial = () => {
        clearTutorialTimers();
        if (tutorialRef.current) setTutorial(null);
        setTutorialHandoff(null);
    };
    const soundEngineRef = useRef(null);

    if (!soundEngineRef.current) {
        soundEngineRef.current = createSoundEngine();
    }

    const playSound = (kind, forceEnabled = false) => {
        soundEngineRef.current?.play(kind, forceEnabled || soundEnabled);
    };

    // 深浅色只由 <html> 上的 theme-dark 类决定，样式全在 theme-dark.css 里。
    // 选「跟随系统」时监听系统切换，这样白天晚上自动变，不用刷新页面。
    useEffect(() => {
        try {
            localStorage.setItem(APPEARANCE_STORAGE_KEY, appearance);
        } catch (error) {
            // Appearance is a preference; the page still works without storage.
        }
        const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
        const apply = () => {
            const isDark = appearance === 'dark' || (appearance === 'system' && !!media && media.matches);
            document.documentElement.classList.toggle('theme-dark', isDark);
            const themeColor = document.querySelector('meta[name="theme-color"]');
            if (themeColor) themeColor.setAttribute('content', isDark ? '#0f172a' : '#f8fafc');
        };
        apply();
        if (appearance !== 'system' || !media) return undefined;
        if (media.addEventListener) {
            media.addEventListener('change', apply);
            return () => media.removeEventListener('change', apply);
        }
        media.addListener(apply);
        return () => media.removeListener(apply);
    }, [appearance]);

    const chooseAppearance = (next) => {
        if (next === appearance) return;
        playSound('tap');
        setAppearance(next);
    };

    const appearanceLabel = (option) => (
        option === 'dark' ? ui.appearanceDark : option === 'light' ? ui.appearanceLight : ui.appearanceSystem
    );

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

        // 密码推理一局最多 100 分，够不到下面这些按几百分标定的阈值，
        // 而它的「正确率」是提交次数之比，也不说明什么。
        // 对它有意义的只有一件事：有没有一次就做对。
        if (lastRunStats?.task === 'passwordlogic') {
            return lastRunStats.incorrect === 0
                ? { icon: 'sparkles', className: 'is-excellent' }
                : { icon: 'badge-check', className: 'is-steady' };
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

    // isError 只有舒尔特用得上：其余游戏的对错已经由按钮自己的 is-correct /
    // is-wrong 状态表达了。一个标志位就够，因为同时只可能有一个格子在脉冲。
    const pulseControl = (target, isError = false) => {
        if (controlPulseTimer.current) clearTimeout(controlPulseTimer.current);
        setControlPulse(target);
        setControlPulseIsError(isError);
        controlPulseTimer.current = setTimeout(() => {
            setControlPulse(null);
            setControlPulseIsError(false);
            controlPulseTimer.current = null;
        }, 180);
    };

    const initGameCore = (type, { excludeCodeSecret = null } = {}) => {
        const isHard = isChallengeDifficulty;
        const tutorialTask = tutorialRef.current?.task;
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
            // 教学局左边那张卡是真正要比的那张：1-Back 是上一张，2-Back 是两张之前那张（iOS 相同）。
            const comparisonTarget = nbackSeq.current.length >= level ? nbackSeq.current[nbackSeq.current.length - level] : null;
            const round = createNbackRound(nbackSeq.current, level);
            nbackSeq.current.push(round.current);
            setNback(previousRound => ({
                ...round,
                previous: tutorialTask === 'nback' && comparisonTarget !== null ? comparisonTarget : previousRound.current,
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
            // 教学板固定为「颜色相同、形状各不相同」（iOS 的 warmupStage 3）。
            if (tutorialTask === 'setgame') { logic.color = 0; logic.shape = 1; logic.fill = 0; }

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

            // 教学局只有 1 个目标和 5 个干扰项，也不移动（iOS 相同）。
            const isNeuronTutorial = tutorialTask === 'neuroncount';
            const targetCount = isNeuronTutorial ? 1 : isHard ? Math.floor(Math.random() * 6) + 7 : Math.floor(Math.random() * 4) + 4;
            const distractorCount = isNeuronTutorial ? 5 : isHard ? Math.floor(Math.random() * 12) + 12 : Math.floor(Math.random() * 8) + 6;

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

            const moverCount = Math.min(isHard && !isNeuronTutorial ? 3 : 0, items.length);
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
        } else if (type === 'passwordlogic') {
            // 基础三位、进阶四位，无限沿用基础的三位——和 iOS 的分档一致。
            const codeLength = isChallengeDifficulty ? 4 : 3;
            const puzzle = tutorialTask === 'passwordlogic'
                ? window.PFLGameLogic.codeLogic.makePuzzle(CODE_LOGIC_TUTORIAL.secret, CODE_LOGIC_TUTORIAL.guesses)
                : window.PFLGameLogic.codeLogic.next(codeLength, excludeCodeSecret); // 取预生成好的题，不在开局时现算
            if (codeFeedbackTimer.current) clearTimeout(codeFeedbackTimer.current);
            setCodeLogic({
                puzzle,
                entry: new Array(codeLength).fill(null),
                selected: 0,
                feedback: null,
                solved: 0,
                incorrect: 0,
                roundIncorrect: 0,
                elapsed: 0
            });
        }
    };

    const showCodeLogicFeedback = (kind) => {
        if (codeFeedbackTimer.current) clearTimeout(codeFeedbackTimer.current);
        setCodeLogic(p => ({ ...p, feedback: kind }));
        codeFeedbackTimer.current = setTimeout(() => {
            setCodeLogic(p => (p.feedback === kind ? { ...p, feedback: null } : p));
        }, kind === 'incomplete' ? 850 : 720);
    };

    // 任何提示显示期间（答对、答错 720ms、没填完 850ms）输入全部锁住，与 iOS 一致；
    // 原先只在答对时锁，答错提示还在就能再交一次，会连扣两次 10 分。
    // 密码推理教学：只接受当前这一步引导的那个动作（点第几格 → 点哪个数字 → 提交），别的点击一律不响应（iOS 相同）。
    const codeTutorialAllows = (action) => {
        const current = tutorialRef.current;
        if (current?.task !== 'passwordlogic') return true;
        const step = current.step || {};
        if (action.type === 'slot') return step.kind === 'slot' && action.index === step.slot;
        if (action.type === 'digit') return step.kind === 'digit' && action.digit === step.digit;
        if (action.type === 'submit') return step.kind === 'submit';
        return false; // 教学里不能删除
    };

    const tapCodeSlot = (index) => {
        if (codeLogic.feedback || !codeTutorialAllows({ type: 'slot', index })) return;
        playSound('tap');
        setCodeLogic(p => (p.feedback ? p : { ...p, selected: index }));
        const current = tutorialRef.current;
        if (current?.task === 'passwordlogic') {
            setTutorial({ ...current, step: { kind: 'digit', slot: index, digit: CODE_LOGIC_TUTORIAL.secret[index] } });
        }
    };

    const skipCodeTutorial = () => {
        playSound('tap');
        finishTutorial('passwordlogic');
    };

    const enterCodeDigit = (digit) => {
        const current = tutorialRef.current;
        if (current?.task === 'passwordlogic') {
            playSound('tap');
            const step = current.step;
            setCodeLogic(p => {
                const entry = p.entry.slice();
                entry[step.slot] = digit;
                return { ...p, entry, selected: step.slot };
            });
            const nextSlot = step.slot + 1;
            setTutorial({ ...current, step: nextSlot < CODE_LOGIC_TUTORIAL.secret.length ? { kind: 'slot', slot: nextSlot } : { kind: 'submit' } });
            return;
        }
        // 提示期间输入被锁，按了也不出声。
        if (!codeLogic.puzzle || codeLogic.feedback) return;
        playSound('tap');
        setCodeLogic(p => {
            if (!p.puzzle || p.feedback) return p;
            const entry = p.entry.slice();
            entry[p.selected] = digit;
            // 填完一位后跳到下一个空位；没有空位就停在原地，方便继续改这一位。
            let selected = p.selected;
            for (let step = 1; step <= entry.length; step++) {
                const index = (p.selected + step) % entry.length;
                if (entry[index] === null) { selected = index; break; }
            }
            return { ...p, entry, selected };
        });
    };

    const deleteCodeDigit = () => {
        if (!codeLogic.puzzle || codeLogic.feedback) return;
        playSound('tap');
        setCodeLogic(p => {
            if (!p.puzzle || p.feedback) return p;
            const entry = p.entry.slice();
            if (entry[p.selected] !== null) {
                entry[p.selected] = null;
                return { ...p, entry };
            }
            const previous = Math.max(0, p.selected - 1);
            entry[previous] = null;
            return { ...p, entry, selected: previous };
        });
    };

    const nextCodeLogicPuzzle = () => {
        const codeLength = codeLogic.puzzle ? codeLogic.puzzle.codeLength : 3;
        const exclude = codeLogic.puzzle ? codeLogic.puzzle.secret.join('') : null;
        const puzzle = window.PFLGameLogic.codeLogic.next(codeLength, exclude); // 无限模式换题也取现成的
        setCodeLogic(p => ({
            ...p,
            puzzle,
            entry: new Array(codeLength).fill(null),
            selected: 0,
            feedback: null,
            roundIncorrect: 0
        }));
    };

    const submitCodeLogic = () => {
        const { puzzle, entry } = codeLogic;
        if (!puzzle || codeLogic.feedback) return;
        if (tutorialRef.current?.task === 'passwordlogic') {
            playSound('success');
            finishTutorial('passwordlogic');
            return;
        }
        if (entry.some(digit => digit === null)) {
            playSound('error');
            showCodeLogicFeedback('incomplete');
            return;
        }
        const isCorrect = entry.every((digit, index) => digit === puzzle.secret[index]);
        recordAttempt(isCorrect);
        if (isCorrect) {
            // iOS 的计分：本题每错一次少 10 分，下限 40。
            const gained = Math.max(40, 100 - codeLogic.roundIncorrect * 10);
            const nextScore = score + gained;
            setScore(nextScore);
            playSound('success');
            if (codeFeedbackTimer.current) clearTimeout(codeFeedbackTimer.current);
            setCodeLogic(p => ({ ...p, feedback: 'correct', solved: p.solved + 1 }));
            if (mode === 'infinite') {
                codeFeedbackTimer.current = setTimeout(() => nextCodeLogicPuzzle(), 560);
            } else {
                codeFeedbackTimer.current = setTimeout(() => endGame(nextScore), 560);
            }
            return;
        }
        setScore(Math.max(0, score - 10));
        playSound('error');
        setCodeLogic(p => ({ ...p, incorrect: p.incorrect + 1, roundIncorrect: p.roundIncorrect + 1 }));
        showCodeLogicFeedback('wrong');
    };

    const switchArenaTask = () => {
        const tasks = ['schulte', 'stroop', 'setgame', 'neuroncount', 'nback'];
        const next = tasks[Math.floor(Math.random() * tasks.length)];
        // 每次轮到 N-Back 都从头开始：清掉上一段的序列和底卡，重新走记忆阶段（与 iOS 一致）。
        // 原先沿用旧序列，第二次轮到时会直接进入答题，拿上一段的旧数字来比。
        if (next === 'nback') {
            nbackSeq.current = [];
            setNback({ current: null, previous: null, isMatch: false, isReady: false, roundId: null, roundNumber: 0 });
        }
        initGameCore(next);
        setView(next);
    };

    const startChallenge = (type) => {
        // 原先第一次玩 SET / N-Back 会先拦下来弹规则卡，并各带一次性热身；现在由游戏内教学取代，与 iOS 一致。
        clearAnswerFeedback();
        setScore(0);
        nbackSeq.current = [];
        const activeDailySpec = getDailySpec();
        const taskType = mode === 'daily' ? activeDailySpec.task : type;
        cancelTutorial();
        const runsTutorial = shouldShowTutorial(taskType);
        // 必须在 initGameCore 之前定下来：教学局的牌面（Stroop 首题、SET 示范板、神经元 1+5、密码 178）由它生成。
        if (runsTutorial) setTutorial({ task: taskType, correct: 0, step: taskType === 'passwordlogic' ? { kind: 'orientation' } : null });
        // 教学局不播开局音，正式开局时才播（iOS 同样如此）。
        if (!runsTutorial) playSound('start');
        const taskName = mode === 'comp' ? arenaTaskKey : mode === 'daily' ? 'daily' : taskType;
        runStatsRef.current = {
            task: mode === 'comp' ? arenaTaskKey : taskType,
            attempts: 0,
            correct: 0,
            incorrect: 0,
            startedAtMs: Date.now()
        };
        awayMsRef.current = 0;
        hiddenAtRef.current = null;
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
            setTimeLeft(ARENA_DURATION_SECONDS);
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
            setTimeLeft(taskType === 'passwordlogic' ? -1 : TASK_DATA[taskType].time);
            initGameCore(taskType);
            setView(taskType);
        }
        if (runsTutorial && taskType === 'stroop') {
            // Stroop 教学第一题固定为蓝色的「红」字，与 iOS 相同。
            const red = COLOR_LABELS.find(color => color.key === 'red');
            const blue = COLOR_LABELS.find(color => color.key === 'blue');
            setStroop({
                roundId: `${Date.now()}-tutorial`,
                textZh: red.zh,
                textEn: red.en,
                color: blue.val,
                opts: [...COLOR_LABELS].sort(() => Math.random() - 0.5)
            });
        }
        if (runsTutorial && taskType === 'passwordlogic') {
            // 先留 1.35 秒让人读一下「四条线索要一起看」，再开始引导点第 1 格。
            tutorialTimers.current.push(setTimeout(() => {
                const current = tutorialRef.current;
                if (current?.task === 'passwordlogic' && current.step?.kind === 'orientation') {
                    setTutorial({ ...current, step: { kind: 'slot', slot: 0 } });
                }
            }, 1350));
        }
    };

    // 教学最后一个动作做完：记为完成，换一盘新的，显示交接画面，交接结束才开始计时计分。
    const startScoredSession = () => {
        clearTutorialTimers();
        setTutorialHandoff(null);
        runStatsRef.current = { ...runStatsRef.current, attempts: 0, correct: 0, incorrect: 0, startedAtMs: Date.now() };
        awayMsRef.current = 0;
        hiddenAtRef.current = null;
        playSound('start');
    };

    const finishTutorial = (task) => {
        updateCompletedTutorials(list => (list.includes(task) ? list : [...list, task]));
        clearTutorialTimers();
        setTutorial(null);
        clearAnswerFeedback();
        setScore(0);
        if (task === 'nback') {
            nbackSeq.current = [];
            setNback(EMPTY_NBACK_ROUND);
        }
        initGameCore(task, { excludeCodeSecret: task === 'passwordlogic' ? CODE_LOGIC_TUTORIAL.secret.join('') : null });
        const kind = task === 'schulte' ? 'schulte' : task === 'passwordlogic' ? 'codelogic' : 'countdown';
        setTutorialHandoff({ kind, stage: 'complete' });
        const later = (ms, fn) => tutorialTimers.current.push(setTimeout(fn, ms));
        if (kind === 'countdown') {
            // iOS TutorialSessionHandoffOverlay：先停 340ms，再 3、2、1 各 420ms。
            later(340, () => setTutorialHandoff({ kind, stage: 3 }));
            later(760, () => setTutorialHandoff({ kind, stage: 2 }));
            later(1180, () => setTutorialHandoff({ kind, stage: 1 }));
            later(1600, startScoredSession);
        } else if (kind === 'schulte') {
            // 舒尔特不倒数：「从 1 开始」淡入 160ms、停 780ms、淡出 160ms，淡出完才开始计时。
            later(940, () => setTutorialHandoff({ kind, stage: 'fading' }));
            later(1100, startScoredSession);
        } else {
            // 密码推理：「现在开始正式推理」停 900ms。
            later(900, startScoredSession);
        }
    };

    const handleArenaError = ({ flash = true } = {}) => {
        if (flash) {
            setIsError(true);
            setTimeout(() => setIsError(false), 400);
        }
        if (mode === 'comp') {
            setTimeLeft(prev => Math.max(0, prev - 5));
            // 不看 flash：竞技里任何模块答错，计时胶囊都闪红（iOS applyArenaPenalty）。
            setTimerFlash(true);
            setTimeout(() => setTimerFlash(false), 400);
        }
    };

    const clearAnswerFeedback = () => {
        if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
        feedbackTimer.current = null;
        answerLock.current = false;
        // 密码推理答对后有 560ms 的提示，之后才结束本局或换下一题。
        // 玩家在这段时间里退出的话，这个 timer 会把已经回到首页的人再弹到结果页。
        if (codeFeedbackTimer.current) clearTimeout(codeFeedbackTimer.current);
        codeFeedbackTimer.current = null;
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
        const activeTutorial = tutorialRef.current;
        if (activeTutorial && activeTutorial.task === nextType) {
            // Stroop 和 N-Back 要答对 3 题，SET 和神经元答对 1 次，教学就结束。
            const correctCount = (activeTutorial.correct || 0) + 1;
            const needed = (nextType === 'stroop' || nextType === 'nback') ? 3 : 1;
            if (correctCount >= needed) {
                finishTutorial(nextType);
                return;
            }
            setTutorial({ ...activeTutorial, correct: correctCount });
        }
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
        // 教学局不计对错、不加分也不扣分，其余反馈照常。
        const inTutorial = !!tutorialRef.current;
        if (!inTutorial) recordAttempt(correct);
        playSound(correct ? 'success' : 'error');

        if (inTutorial) {
            // 不改分
        } else if (correct) {
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
        const isCorrect = answerIsMatch === nback.isMatch;
        // 教学局：答错停在原题重答（220ms），答对停 500ms 再进下一题；正式局对错都进下一题。
        const inTutorial = tutorialRef.current?.task === 'nback';
        // 限时模式答错再扣 3 秒（与 iOS 一致；教学、无限模式除外，竞技场有自己的扣 5 秒）。扣到 0 立即结束。
        if (!isCorrect && !inTutorial && mode !== 'infinite' && mode !== 'comp') {
            setTimeLeft(t => Math.max(0, t - 3));
        }
        showAnswerFeedback({
            correct: isCorrect,
            points: 30,
            penalty: 10,
            nextType: 'nback',
            target: answerIsMatch ? 'match' : 'different',
            advance: inTutorial ? isCorrect : true,
            event,
            flashError: false,
            duration: inTutorial && isCorrect ? 500 : 220
        });
    };

    const getCurrentRunAnalytics = () => {
        const stats = runStatsRef.current || {};
        // 竞技按「90 − 剩余秒数」计时长，罚掉的秒也算（iOS ArenaSession.elapsedSeconds）。
        const durationSeconds = !stats.startedAtMs
            ? 0
            : mode === 'comp'
                ? Math.max(1, ARENA_DURATION_SECONDS - Math.max(0, timeLeft))
                : Math.max(1, Math.round((Date.now() - stats.startedAtMs - awayMsRef.current) / 1000));

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
        cancelTutorial();
        const currentFinalScore = typeof finalScoreOverride === 'number' ? finalScoreOverride : score;
        const isComp = mode === 'comp';
        const isDaily = mode === 'daily';
        const isInfinite = mode === 'infinite';
        const previousBest = isComp
            ? arenaBestScore
            : isDaily
                ? (dailyRecord.bestScore || 0)
                : isInfinite
                    ? 0
                    : (history.taskBestScores?.[view] || 0);
        const runStats = {
            ...runStatsRef.current,
            isImproved: previousBest > 0 && currentFinalScore > previousBest,
            // 竞技按「90 − 剩余秒数」计时长，罚掉的秒也算（iOS ArenaSession.elapsedSeconds）。
            durationSeconds: !runStatsRef.current.startedAtMs
                ? 0
                : isComp
                    ? Math.max(1, ARENA_DURATION_SECONDS - Math.max(0, timeLeft))
                    : Math.max(1, Math.round((Date.now() - runStatsRef.current.startedAtMs - awayMsRef.current) / 1000))
        };
        setLastScore(currentFinalScore);
        setLastRunStats(runStats);

        const completedTask = currentRunRef.current?.task || (isComp ? arenaTaskKey : view);
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
            // 每一档各记各的，互不覆盖。旧的 bestCompScore 留给进阶，
            // 因为改版前的竞技场就是进阶难度，老用户的纪录仍然对得上。
            const isArenaAdvancedRun = isComp && isArenaAdvanced;
            const isArenaBasicRun = isComp && !isArenaAdvanced;
            const newBestCompScore = isArenaAdvancedRun ? Math.max(prev.bestCompScore || 0, currentFinalScore) : (prev.bestCompScore || 0);
            const newBestCompBasicScore = isArenaBasicRun ? Math.max(prev.bestCompBasicScore || 0, currentFinalScore) : (prev.bestCompBasicScore || 0);
            const taskBestScores = { ...DEFAULT_TASK_BESTS, ...(prev.taskBestScores || {}) };
            if (!isComp && !isDaily && !isInfinite && Object.prototype.hasOwnProperty.call(DEFAULT_TASK_BESTS, view)) {
                taskBestScores[view] = Math.max(taskBestScores[view] || 0, currentFinalScore);
            }

            const newHist = {
                        ...prev,
                        bestScore: newBestScore,
                        bestCompScore: newBestCompScore,
                        bestCompBasicScore: newBestCompBasicScore,
                        taskBestScores
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
            if (codeFeedbackTimer.current) clearTimeout(codeFeedbackTimer.current);
            if (resultScoreFrame.current) cancelAnimationFrame(resultScoreFrame.current);
        };
    }, []);

    // 测试用：URL 带 ?newbie 时清掉教学完成记录，六个游戏的教学重新出现。
    useEffect(() => {
        try {
            if (new URLSearchParams(window.location.search).has('newbie')) {
                ['pfl_rules_seen_setgame', 'pfl_rules_seen_nback', 'pfl_nback_warmup_done', 'pfl_setgame_warmup_done', 'pfl_setgame_warmup_done_hard']
                    .forEach(k => localStorage.removeItem(k));
                updateCompletedTutorials(() => []);
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
            setCodeResultEase(0); // 下次进结算页时四个数从 0 起，不先闪一下终值
            return;
        }

        const targetScore = Math.max(0, Math.round(lastScore || 0));
        const reduceMotion = !!window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

        // 密码推理（与 iOS PasswordLogicResult 一致）：进入即播完成音；四个数字一起从 0 滚到终值，
        // 固定 720ms 三次缓出，没有滴答音。分数为 0 时其他三个数照样滚。
        if (lastRunStats?.task === 'passwordlogic' && mode !== 'daily') {
            playSound('complete');
            if (reduceMotion) {
                setCodeResultEase(1);
                setAnimatedScore(targetScore);
                return;
            }
            const codeStartedAt = performance.now();
            const codeTick = (now) => {
                const progress = Math.min(1, (now - codeStartedAt) / 720);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCodeResultEase(eased);
                setAnimatedScore(Math.round(targetScore * eased));
                resultScoreFrame.current = progress < 1 ? requestAnimationFrame(codeTick) : null;
            };
            setCodeResultEase(0);
            setAnimatedScore(0);
            resultScoreFrame.current = requestAnimationFrame(codeTick);
            return () => {
                if (resultScoreFrame.current) {
                    cancelAnimationFrame(resultScoreFrame.current);
                    resultScoreFrame.current = null;
                }
            };
        }

        if (!targetScore || reduceMotion) {
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

    // 密码推理不倒计时：它是一道推理题，玩到解出为止，顶栏显示的是已用时间。
    // timeLeft 保持 -1，所以下面那条倒计时 effect 的两个分支都不会命中。
    useEffect(() => {
        if (view !== 'passwordlogic' || isAppHidden || tutorial || tutorialHandoff) return undefined;
        const timer = setInterval(() => {
            setCodeLogic(p => (p.feedback === 'correct' ? p : { ...p, elapsed: p.elapsed + 1 }));
        }, 1000);
        return () => clearInterval(timer);
    }, [view, isAppHidden, tutorial, tutorialHandoff]);

    useEffect(() => {
        let timer;
        // 教学和交接画面期间不计时：正式开局前表一直停在满格。
        if (isGameView && !isInfiniteMode && timeLeft > 0 && !isAppHidden && !tutorial && !tutorialHandoff) {
            timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && isGameView && !isInfiniteMode) {
            endGame();
        }
        return () => clearInterval(timer);
    }, [timeLeft, view, isInfiniteMode, isAppHidden, tutorial, tutorialHandoff]);

    // 离开 App（切后台、锁屏、切标签页）时的规则，与 iOS 一致（GameSession.swift 的 suspend / resume）：
    // 对局中离开即停表；回来时离开不超过 30 秒就接着玩，超过 30 秒本局直接结束，按实际玩的时长记录。
    // 密码推理是不限时的推理题，只停表，离开多久都不结束。离开的时间一律不算进本局时长。
    // 教学期间表没在走，离开多久都不算，也不会因此结束（iOS 的 clockIsRunning）。
    gameLifecycleRef.current = { isGameView: isGameView && !tutorial && !tutorialHandoff, view, endGame };
    useEffect(() => {
        const handleVisibility = () => {
            const { isGameView: inGame, view: currentView, endGame: finishRun } = gameLifecycleRef.current;
            if (document.hidden) {
                if (inGame && hiddenAtRef.current === null) hiddenAtRef.current = Date.now();
                setIsAppHidden(true);
                return;
            }
            setIsAppHidden(false);
            const leftAt = hiddenAtRef.current;
            hiddenAtRef.current = null;
            if (leftAt === null || !inGame) return;
            const away = Date.now() - leftAt;
            awayMsRef.current += away;
            if (currentView !== 'passwordlogic' && away > MAX_RESUMABLE_ABSENCE_MS) finishRun();
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    const isFirstPlayNudgeVisible = showFirstPlayNudge && view === 'home' && mode !== 'daily' && mode !== 'comp' && (!showUpdateNote || urlParams.has('suppressUpdate'));

    const tutorialTask = tutorial?.task || null;
    const isNbackTutorialCompare = tutorialTask === 'nback' && nback.isReady && nback.previous !== null;
    const neuronTutorialAction = tutorialTask !== 'neuroncount' ? null
        : neuronCount.currentCount < neuronCount.targetCount ? 'increment'
            : neuronCount.currentCount > neuronCount.targetCount ? 'decrement' : 'submit';
    const codeTutorialStep = tutorialTask === 'passwordlogic' ? tutorial.step : null;
    const isNbackWarmupRound = isNbackTutorialCompare;

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

            {/* 首玩引导：与 iOS 一致，训练页基础/进阶/无限三档都弹（WebsiteTrainingHome.swift showsFirstPlayNudge）。 */}
            {isFirstPlayNudgeVisible && (
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

            {/* 规则弹窗或首玩引导出现时 tab 栏淡出且不可点（与 iOS 一致：RootView.swift opacity 0，easeOut 0.12s）。 */}
            {(view === 'home' || view === 'analytics' || view === 'settings' || view === 'settings-daily') && (
                <nav
                    className={`app-nav ${(showInfo || isFirstPlayNudgeVisible) ? 'is-overlay-hidden' : ''}`}
                    aria-label="Primary navigation"
                    aria-hidden={(showInfo || isFirstPlayNudgeVisible) ? 'true' : undefined}
                    inert={(showInfo || isFirstPlayNudgeVisible) ? '' : undefined}
                >
                    <div className="app-nav-brand">
                        <div className="app-nav-logo">
                            <Icon name="brain-circuit" className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <div className="app-nav-title">{ui.appTitle}</div>
                            <div className="app-nav-subtitle">Prefrontal Lab</div>
                        </div>
                    </div>
                    <div className="app-nav-items" style={{ '--nav-count': navItems.length }}>
                        {/* 选中色块单独一层，切 tab 时滑过去（与 iOS matchedGeometryEffect 一致）。 */}
                        {activeNavIndex >= 0 && (
                            <span
                                className={`app-nav-indicator is-${activeNavKey}`}
                                style={{ '--nav-index': activeNavIndex }}
                                aria-hidden="true"
                            />
                        )}
                        {navItems.map(item => (
                            <button
                                key={item.key}
                                onClick={item.onClick}
                                disabled={item.disabled}
                                className={`app-nav-button is-${item.key} ${item.active ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''} ${nudgedNavKey === item.key ? 'is-nudging' : ''}`}
                            >
                                {/* 「我的」与 iOS 一样用圆圈头像图标（iOS 资源 lucide-person 即 circle-user-round）。 */}
                                <Icon name={item.icon} className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            )}

            {view === 'home' && (
                <div className={`home-screen app-content-screen p-6 pt-10 flex flex-col items-center h-full overflow-y-auto no-scrollbar relative ${mode === 'daily' ? 'is-daily-home' : mode === 'comp' ? 'is-arena-home' : 'is-training-home'}`}>
                    {/* 首页不放 logo 标题栏，页面直接从顶部卡片开始，与 iOS 一致。 */}

                    {mode !== 'daily' && mode !== 'comp' ? (
                        // 与 iOS 一致：训练页顶部是每日挑战卡，三档共用，整张可点，点了去每日挑战。
                        <button
                            type="button"
                            onClick={() => goHomeMode('daily')}
                            aria-label={`${trainingStreakState.eyebrow} ${trainingStreakState.figure}${trainingStreakState.unit ? ` ${trainingStreakState.unit}` : ''}. ${trainingStreakState.status}`}
                            className={`score-card mode-score-card home-streak-card is-train bg-indigo-600 text-white w-full max-w-sm flex items-stretch relative overflow-hidden shrink-0 text-left ${dailyRecord.completed ? 'is-done' : ''}`}
                        >
                            <div className="home-streak-copy z-10">
                                <div className="home-streak-eyebrow">{trainingStreakState.eyebrow}</div>
                                <div className="home-streak-figure">
                                    <span className="score-value">{trainingStreakState.figure}</span>
                                    {trainingStreakState.unit && <span className="home-streak-unit">{trainingStreakState.unit}</span>}
                                </div>
                                <div className="home-streak-status">{trainingStreakState.status}</div>
                            </div>
                            <div className="home-streak-chevron z-10"><Icon name="chevron-right" className="w-4 h-4" /></div>
                            <div className="score-watermark absolute top-[-20px] right-[-20px] opacity-10 rotate-12"><Icon name="brain" className="w-32 h-32" /></div>
                        </button>
                    ) : (
                    <div className={`score-card mode-score-card w-full max-w-sm p-6 rounded-[2.2rem] mb-6 flex justify-between items-end relative overflow-hidden shrink-0 ${mode === 'daily' ? 'daily-score-card' : 'text-white is-arena bg-amber-500'}${dailyRecord.completed ? ' is-done' : ''}`}>
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
                            <div className="z-10">
                                <div className="text-[10px] opacity-60 font-bold uppercase tracking-widest">{ui.bestSynced}</div>
                                <div className="score-value text-4xl font-black">{arenaBestScore}</div>
                            </div>
                        )}
                        <div className="score-watermark absolute top-[-20px] right-[-20px] opacity-10 rotate-12"><Icon name="brain" className="w-32 h-32" /></div>
                    </div>
                    )}

                    {mode === 'comp' && (
                        // 胶囊分段控件，样式在 parity-shell.css（与 iOS 1.0.2 RootView.swift arenaDifficultyControl 一致）。
                        <div className="mode-tabs flex w-full max-w-sm shrink-0">
                            {['basic', 'advanced'].map(tier => (
                                <button
                                    key={tier}
                                    onClick={() => { playSound('tap'); setArenaDifficulty(tier); }}
                                    className={`flex-1 ${arenaDifficulty === tier ? 'is-active' : ''}`}
                                >
                                    {tier === 'basic' ? ui.normal : ui.hard}
                                </button>
                            ))}
                        </div>
                    )}

                    {mode !== 'daily' && mode !== 'comp' && (
                        // 胶囊分段控件，样式在 parity-shell.css（与 iOS WebsiteTrainingHome.swift modeControl 一致）。
                        <div className="mode-tabs flex w-full max-w-sm shrink-0">
                            {['normal', 'hard', 'infinite'].map(m => (
                                <button
                                    key={m}
                                    onClick={() => {
                                        playSound('tap');
                                        setMode(m);
                                    }}
                                    className={`flex-1 ${mode === m ? 'is-active' : ''}`}
                                >
                                    {m === 'normal' ? ui.normal : m === 'infinite' ? ui.infinite : ui.hard}
                                </button>
                            ))}
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
                                                <div className="mt-1 text-xs font-extrabold opacity-95 leading-relaxed">{getDailyHeroSubtitle(dailySpec, dailyTheme, isEnglish)}</div>
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
                                                    {/* 与 iOS 一致：只写「变体 · N秒」，完整玩法交给开始前的规则卡 */}
                                                    <div className="text-[11px] font-extrabold text-slate-600 mt-1">{getDailyTaskMetadata(dailySpec, isEnglish)}</div>
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
                                                    <div className="text-[10px] font-black brand-text text-slate-400">{dailyParityText.tomorrow}</div>
                                                    <div className="text-xs font-black text-slate-700 truncate">
                                                        {dailyRecord.completed
                                                            ? getTaskTitle(tomorrowSpec.task)
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
                                            onClick={openDailyGate}
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
                                data-analytics-task={arenaTaskKey}
                                data-analytics-label={GAME_CLICK_LABELS[arenaTaskKey]}
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
                                        <button type="button" aria-label={isEnglish ? `${getTaskTitle(type)} rules` : `${getTaskTitle(type)}规则`} onClick={(event) => { event.stopPropagation(); playSound('tap'); setShowInfo(type); }} className="rs-info-button"><RulesInfoDot /></button>
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
                                    <strong>{isEnglish ? `${myWeekRecords.completedDays} training days` : `${myWeekRecords.completedDays} \u5929\u8bad\u7ec3`}</strong>
                                </div>
                            </div>
                            <div className="my-progress-stats">
                                <div><strong>{myWeekRecords.completedDays}</strong><span>{isEnglish ? 'Days' : '\u8bad\u7ec3\u5929\u6570'}</span></div>
                                <div><strong>{myWeekRecords.totalSessions}</strong><span>{isEnglish ? 'Sessions' : '\u5b8c\u6210\u6b21\u6570'}</span></div>
                                <div><strong>{myWeekRecords.bestScore || '-'}</strong><span>{isEnglish ? 'Best score' : '\u6700\u9ad8\u5206'}</span></div>
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

                        {/* 「保存进度」「排行榜」「勋章」三个「即将开放」占位已去掉，与 iOS 一致：功能做出来之前不先许诺。 */}

                        <div className="my-page-section-label">{isEnglish ? 'PREFERENCES' : '偏好设置'}</div>

                        {/* 偏好设置照 iOS 1.0.2（RootView.swift:801-986）：语言、新手教学、重新开启全部教学、外观、音效；都不带说明文字 */}
                        <div className="parity-prefs">
                            <div className="parity-prefs-row is-language">
                                <div className="parity-prefs-title">{dailyParityText.language}</div>
                                <div className="parity-language-control">
                                    {[
                                        { key: 'zh', label: '中文' },
                                        { key: 'en', label: 'EN' }
                                    ].map(option => (
                                        <button
                                            key={option.key}
                                            type="button"
                                            onClick={() => setLanguage(option.key)}
                                            className={lang === option.key ? 'is-active' : ''}
                                            aria-pressed={lang === option.key}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="parity-prefs-divider" />

                            <div className="parity-prefs-row">
                                <div className="parity-prefs-icon is-accent">
                                    <Icon name="lightbulb" className="w-5 h-5" />
                                </div>
                                <div className="parity-prefs-title">{dailyParityText.tutorials}</div>
                                <ParitySwitch
                                    checked={tutorialModeEnabled}
                                    onChange={setTutorialModeEnabled}
                                    label={dailyParityText.tutorials}
                                />
                            </div>

                            <div className="parity-prefs-divider" />

                            <div className="parity-prefs-replay-wrap">
                                <button type="button" className="tutorial-replay-button parity-prefs-replay" onClick={replayAllTutorials}>
                                    <Icon name="rotate-cw" className="w-[15px] h-[15px]" />
                                    <span>{isEnglish ? 'Replay all tutorials' : '重新开启全部教学'}</span>
                                </button>
                            </div>

                            <div className="parity-prefs-divider" />

                            <div className="parity-prefs-row">
                                <div className="parity-prefs-icon">
                                    <Icon name="palette" className="w-5 h-5" />
                                </div>
                                <div className="parity-prefs-title">{dailyParityText.appearance}</div>
                                <div className="parity-segmented" role="radiogroup" aria-label={dailyParityText.appearance}>
                                    {APPEARANCE_OPTIONS.map(option => (
                                        <button
                                            key={option}
                                            type="button"
                                            role="radio"
                                            aria-checked={appearance === option}
                                            onClick={() => chooseAppearance(option)}
                                            className={appearance === option ? 'is-active' : ''}
                                        >
                                            {appearanceLabel(option)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="parity-prefs-divider" />

                            <div className="parity-prefs-row">
                                <div className="parity-prefs-icon">
                                    <Icon name={soundEnabled ? 'volume-2' : 'volume-x'} className="w-5 h-5" />
                                </div>
                                <div className="parity-prefs-title">{dailyParityText.sound}</div>
                                <ParitySwitch
                                    checked={soundEnabled}
                                    onChange={() => toggleSound()}
                                    label={dailyParityText.sound}
                                />
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
                                <Icon name="activity" className="w-4 h-4" />
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

                        <div className="training-records-metrics is-one-card">
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
                                        <Icon name="trophy" className="w-4 h-4" />
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

            {/* 每日挑战开始前的规则卡（iOS DailyChallengeFlow.swift:17-182）。全屏一层盖住 tab 栏，点「开始挑战」才开局计时。 */}
            {dailyGateOpen && (
                <div className="daily-gate-screen" role="dialog" aria-modal="true" aria-label={isEnglish ? `${dailyTheme.title} daily challenge rules` : `${dailyTheme.title}每日挑战规则`}>
                    <div className="daily-gate-card">
                        <div className="daily-gate-icon">
                            <Icon name={TASK_DATA[dailySpec.task]?.icon || 'calendar-check'} className="w-7 h-7" />
                        </div>
                        <h2 className="daily-gate-title">{dailyTheme.title}</h2>
                        <div className="daily-gate-kicker">{dailyParityText.gateKicker}</div>
                        <p className="daily-gate-rule">{getDailyGateRule(dailySpec, isEnglish)}</p>
                        <div className="daily-gate-demo" role="img" aria-label={getDailyGateDemoLabel(dailySpec, isEnglish)}>
                            <DailyGateDemo spec={dailySpec} isEnglish={isEnglish} />
                        </div>
                        <p className="daily-gate-tip">{dailyTheme.subtitle}</p>
                        <button
                            type="button"
                            className="daily-gate-start"
                            onClick={() => {
                                setDailyGateOpen(false);
                                startChallenge(dailySpec.task);
                            }}
                        >
                            {dailyParityText.gateStart}
                        </button>
                        <button
                            type="button"
                            className="daily-gate-later"
                            onClick={() => {
                                playSound('tap');
                                setDailyGateOpen(false);
                                setMode('daily');
                                setView('home');
                            }}
                        >
                            {dailyParityText.gateLater}
                        </button>
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
                            <div className="weekly-lock">
                                {/* 未解锁页照 iOS：本周完成 3 天每日挑战即解锁，只有这一档（RootView.swift:1938-1967） */}
                                <div className="weekly-lock-icon">
                                    <Icon name="calendar-check" className="w-6 h-6" />
                                </div>
                                <span className="weekly-lock-kicker">{dailyParityText.lockKicker}</span>
                                <h2>{dailyParityText.lockTitle}</h2>
                                <p>{dailyParityText.lockBody}</p>
                                <div className="weekly-lock-progress">
                                    <div className="weekly-lock-progress-head">
                                        <span>{dailyParityText.lockProgress}</span>
                                        <strong>{Math.min(weeklyReport.completedDays, weeklyReportBasicUnlockDays)} / {weeklyReportBasicUnlockDays}</strong>
                                    </div>
                                    <div className="weekly-lock-progress-track">
                                        <span style={{ width: `${Math.min(100, (weeklyReport.completedDays / weeklyReportBasicUnlockDays) * 100)}%` }} />
                                    </div>
                                    <small>{dailyParityText.lockDaysLeft(Math.max(0, weeklyReportBasicUnlockDays - weeklyReport.completedDays))}</small>
                                </div>
                                <button
                                    type="button"
                                    className="weekly-lock-cta"
                                    onClick={() => {
                                        playSound('tap');
                                        setMode('daily');
                                        setView('home');
                                    }}
                                >
                                    <Icon name="calendar-check" className="w-4 h-4" />
                                    {dailyParityText.lockCta}
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
                                    <p>{weeklyReport.daysCopy}</p>
                                </div>
                            </div>

                            <div className={`weekly-report-reveal-row ${weeklyReportStep >= 2 ? 'is-visible' : ''}`}>
                                <div className="weekly-report-reveal-index">02</div>
                                <div className="weekly-report-reveal-copy">
                                    {/* 两周都玩过且有提升的游戏里取进步最大的；没有时仍是「最常练习」 */}
                                    <div className="weekly-report-reveal-label">{weeklyReport.mostImproved ? dailyParityText.mostImproved : weeklyReportText.reportTaskLabel}</div>
                                    <div className="weekly-report-reveal-value">{weeklyReport.mostImproved ? getTaskTitle(weeklyReport.mostImproved.task) : weeklyReport.topTaskName}</div>
                                    <p>{weeklyReport.mostImprovedCopy || weeklyReportText.reportTaskCopy}</p>
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
                                    <p>{weeklyReport.bestCopy}</p>
                                </div>
                            </div>

                            <div className={`weekly-report-reveal-row ${weeklyReportStep >= 4 ? 'is-visible' : ''} is-comparison`}>
                                <div className="weekly-report-reveal-index">04</div>
                                <div className="weekly-report-reveal-copy">
                                    <div className="weekly-report-reveal-label">{weeklyReportText.reportCompareLabel}</div>
                                    <div className="weekly-report-compare-value">{weeklyReport.comparison}</div>
                                    <div className="weekly-report-compare-strip">
                                        {/* 两周数值可比时，与 iOS 一样从 0 滚到实际值 */}
                                        <span>{weeklyReportPreviousBarLabel} {weeklyReport.comparisonCount ? `${weeklyReportCompare.previous}${weeklyReportCompareSuffix}` : (weeklyReport.previousFastestSchulte ? formatWeeklySeconds(weeklyReport.previousFastestSchulte, isEnglish) : (weeklyReport.previousBestScore || '-'))}</span>
                                        <Icon name="arrow-right" className="w-4 h-4" />
                                        <span>{weeklyReportCurrentBarLabel} {weeklyReport.comparisonCount ? `${weeklyReportCompare.current}${weeklyReportCompareSuffix}` : (weeklyReport.fastestSchulte ? formatWeeklySeconds(weeklyReport.fastestSchulte, isEnglish) : (weeklyReport.bestScore || '-'))}</span>
                                    </div>
                                    <p>{weeklyReportText.reportCompareCopy}</p>
                                </div>
                            </div>
                            </div>

                            <div className={`weekly-report-final ${weeklyReportStep >= 5 ? 'is-visible' : ''}`}>
                                <h2>{weeklyReportText.reportReady}</h2>
                                <p>{weeklyReport.advice}</p>
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

            <RulesSheetLayer
                type={showInfo}
                advanced={isChallengeDifficulty}
                en={isEnglish}
                title={showInfo ? getTaskTitle(showInfo) : ''}
                onClose={() => setShowInfo(null)}
                onStart={() => { const t = showInfo; setShowInfo(null); startChallenge(t); }}
            />

            {isGameView && (
                <div className="game-screen flex-1 flex flex-col">
                    <div className="game-topbar h-14 px-4 flex-shrink-0 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center bg-white border-b border-slate-100">
                        <div className="flex justify-start">
                            <button onClick={() => {
                                playSound('tap');
                                clearAnswerFeedback();
                                // 教学或交接中离开：直接回首页，不结算、不记录（教学没做完，下次还会出现）。
                                if (tutorialRef.current || tutorialHandoff) {
                                    cancelTutorial();
                                    currentRunRef.current = null;
                                    setView('home');
                                    return;
                                }
                                // 无限模式返回即结算；密码推理例外：返回键直接退出、不结算不记录（与 iOS 一致），
                                // 想结算要点顶栏的「结束本次训练」。
                                if (mode === 'infinite' && view !== 'passwordlogic') {
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
                            }} className="game-back-button text-slate-900" aria-label={isEnglish ? 'Back' : '返回'}><Icon name="chevron-left" className="w-[18px] h-[18px]" /></button>
                        </div>
                        <div className="text-center">
                            {/* 模式小标题：与 iOS 各 Flow 的顶栏一致——不转大写，训练/无限/每日各自的颜色；
                                密码推理任何模式都写「训练 / TRAINING」，竞技写「竞技模式 / ARENA MODE」。 */}
                            <div className={`game-topbar-eyebrow ${mode === 'daily' && view !== 'passwordlogic' ? 'is-daily' : mode === 'infinite' && view !== 'passwordlogic' ? 'is-endless' : 'is-training'}`}>{
                                view === 'passwordlogic'
                                    ? (isEnglish ? 'TRAINING' : '训练')
                                    : mode === 'comp'
                                        ? (isEnglish ? 'ARENA MODE' : '竞技模式')
                                        : mode === 'daily'
                                            ? ui.dailyTitle
                                            : mode === 'infinite'
                                                ? (isEnglish ? 'Endless' : '无限模式')
                                                : (isEnglish ? 'Training' : '训练')
                            }</div>
                            <div className="text-sm font-bold">{mode === 'comp' ? ui.arenaShortTitle : getTaskTitle(view)}</div>
                            {/* 历史最高：只在基础/进阶显示，标签和数字之间两个空格；密码推理顶栏没有这一行（iOS 相同）。 */}
                            {mode !== 'comp' && mode !== 'daily' && mode !== 'infinite' && view !== 'passwordlogic' && TASK_DATA[view] && (
                                <div className="text-[9px] font-black text-slate-400 font-mono whitespace-pre">{`${ui.taskBest}  ${history.taskBestScores?.[view] || 0}`}</div>
                            )}
                        </div>
                        {/* 右侧挤不下时（密码推理无限模式四样东西并排），只让「结束本次训练」省略，其余不缩。 */}
                        <div className="flex items-center justify-end gap-3 whitespace-nowrap min-w-0">
                            {view === 'passwordlogic' ? (
                                <>
                                    {/* 无限模式：第 n 题胶囊放在右侧（iOS puzzleProgressPill）。 */}
                                    {mode === 'infinite' && (
                                        <div className="code-topbar-puzzle-pill">{(() => {
                                            // 答对后的 560ms 提示期间还停在本题，换题后才 +1（iOS roundIndex 在换题时才加）。
                                            const n = codeLogic.solved + (codeLogic.feedback === 'correct' ? 0 : 1);
                                            return isEnglish ? `Puzzle ${n}` : `第 ${n} 题`;
                                        })()}</div>
                                    )}
                                    {/* 教学期间不显示已用时间（表还没开始走）。 */}
                                    {tutorialTask !== 'passwordlogic' && (
                                        <div className="game-topbar-timer code-topbar-elapsed">
                                            <span>{ui.codeElapsed}</span>
                                            <strong>{codeLogic.elapsed}s</strong>
                                        </div>
                                    )}
                                    {/* 结束本次训练：只在无限模式、且至少解出一题后出现；点了就结算。 */}
                                    {mode === 'infinite' && codeLogic.solved > 0 && tutorialTask !== 'passwordlogic' && (
                                        <button type="button" className="code-topbar-end-button" onClick={() => {
                                            playSound('tap');
                                            endGame(score);
                                        }}>{isEnglish ? 'End session' : '结束本次训练'}</button>
                                    )}
                                </>
                            ) : (
                                <div className={`game-topbar-timer ${(isError || timerFlash) ? 'is-error' : ''}`}>{mode === 'infinite' ? '∞' : `${timeLeft}s`}</div>
                            )}
                            <div className="font-mono text-xl font-black text-indigo-600 flex-shrink-0">{score}</div>
                        </div>
                    </div>
                    <div className="game-stage flex-1 flex items-center justify-center p-6">
                        {view === 'schulte' && (
                            <div className={`relative w-full max-w-sm ${mode === 'comp' ? 'arena-module-enter' : ''}`}>
                            {tutorialTask === 'schulte' && (schulte.index || 0) < 5 && (
                                <div className="schulte-tutorial-pill">{
                                    (schulte.index || 0) === 0
                                        ? (isEnglish ? 'Tap the numbers in order from 1 to 25. Start with 1.' : '按 1 → 25 的顺序，依次点击数字。先从 1 开始')
                                        : (isEnglish ? `Tap the numbers in order from 1 to 25. Next, find ${schulte.next}.` : `按 1 → 25 的顺序，依次点击数字。接着找到 ${schulte.next}`)
                                }</div>
                            )}
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
                                                const isCorrectClick = n === schulte.next;
                                                if (tutorialTask === 'schulte') {
                                                    // 教学：引导点前 5 个数字，不计分、不计时；点完第 5 个停 500ms，换一盘新的再交接（iOS 相同）。
                                                    if ((schulte.index || 0) >= 5) return;
                                                    pulseControl(`schulte-${n}`, !isCorrectClick);
                                                    playSound(isCorrectClick ? 'success' : 'error');
                                                    if (!isCorrectClick) {
                                                        handleArenaError();
                                                        return;
                                                    }
                                                    const nextIndex = (schulte.index || 0) + 1;
                                                    setSchulte(p => ({ ...p, index: nextIndex, next: (p.sequence || [])[nextIndex] }));
                                                    if (nextIndex >= 5) tutorialTimers.current.push(setTimeout(() => finishTutorial('schulte'), 500));
                                                    return;
                                                }
                                                pulseControl(`schulte-${n}`, !isCorrectClick);
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
                                            className={`schulte-cell flex items-center justify-center font-bold ${schulte.cols === 6 ? 'text-sm' : 'text-lg'} rounded-lg border transition-all ${tutorialTask === 'schulte' && n === schulte.next && (schulte.index || 0) < 5 ? 'is-tutorial-target' : ''} ${controlPulse === `schulte-${n}` ? `is-tap-pulsing ${controlPulseIsError ? 'is-tap-error' : ''}` : ''}
    ${(isClicked && (mode === 'hard' || mode === 'daily' || (mode === 'comp' && isArenaAdvanced))) // 进阶、每日（进阶变体）和进阶竞技用盲点：已点格不标记；基础竞技照常标记
                                                    ? 'bg-white text-slate-900 border-slate-100 shadow-sm' // 只有进阶模式是“盲点”
                                                    : (isClicked
                                                        // 竞技和基础模式：点过的格子只有底色是 20% 的靛蓝，数字不跟着变淡（与 iOS 一致）
                                                        ? 'bg-indigo-600/20 text-white border-transparent'
                                                        : 'bg-white text-slate-900 border-slate-100 shadow-sm'
                                                    )
                                                }`}
                                        >
                                            {n}
                                        </button>
                                    );
                                })}
                            </div>
                            </div>
                        )}
                        {view === 'stroop' && (
                            <div className={`flex flex-col items-center space-y-12 w-full ${mode === 'comp' ? 'arena-module-enter' : ''}`}>
                                {tutorialTask === 'stroop' && (
                                    <div className="tutorial-instruction">{isEnglish
                                        ? `Tutorial ${(tutorial.correct || 0) + 1}/3: Ignore the word. Choose the answer matching the word’s ink color.`
                                        : `教学 ${(tutorial.correct || 0) + 1}/3：忽略文字含义，选择文字填充颜色对应的答案。`}</div>
                                )}
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
                                                flashError: false,
                                                // 教学局答对多停一会儿（500ms），让人看清对在哪
                                                duration: tutorialTask === 'stroop' && isCorrect ? 500 : undefined
                                            });
                                        }} className={`stroop-choice-button ${tutorialTask === 'stroop' && !answerFeedback && o.val === stroop.color ? 'is-tutorial-target' : ''} ${controlPulse === `stroop-${o.val}` ? 'is-tap-pulsing' : ''} ${answerFeedback?.target === o.val ? (answerFeedback.status === 'correct' ? 'is-correct' : 'is-wrong') : ''}`}>{(mode === 'normal' || mode === 'infinite' || (mode === 'comp' && !isArenaAdvanced)) ? <div className="stroop-color-dot" style={{ backgroundColor: o.val }}></div> : (isEnglish ? o.en : o.zh)}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {view === 'nback' && (
                            <div className={`flex flex-col items-center w-full ${mode === 'comp' ? 'arena-module-enter' : ''}`}>
                                <div className="nback-prompt-wrap mb-12">
                                    <div className="nback-round-progress">
                                        {!nback.isReady
                                            ? (isChallengeDifficulty
                                                ? (isEnglish ? `Memory ${nback.roundNumber}/2` : `记忆阶段 ${nback.roundNumber}/2`)
                                                : (isEnglish ? 'Memorize' : '记忆阶段'))
                                            : (isEnglish
                                                // 英文：训练/每日写 Question N；竞技沿用 Round N（iOS ArenaTrainingFlow 同样如此）。
                                                ? `${mode === 'comp' ? 'Round' : 'Question'} ${nback.roundNumber - (isChallengeDifficulty ? 2 : 1)}`
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
                                    {tutorialTask === 'nback' && !nback.isReady && (
                                        <div className="tutorial-instruction nback-tutorial-memory">{isChallengeDifficulty
                                            ? (isEnglish ? 'Tutorial: remember this number; you will compare it with the number two cards back.' : '教学：先记住这张数字；稍后会和两张之前的数字比较。')
                                            : (isEnglish ? 'Tutorial: remember this number; you will compare it with the previous card.' : '教学：先记住这张数字；稍后会和上一张数字比较。')}</div>
                                    )}
                                    {isNbackWarmupRound && (
                                        <div className="nback-warmup-hint">{`${isEnglish ? 'Tutorial' : '教学'} ${(tutorial.correct || 0) + 1}/3${isEnglish ? ': ' : '：'}${isChallengeDifficulty
                                            ? (isEnglish ? 'Compare the current number with the number two cards back: same is Match, different is Different.' : '把当前数字和两张之前的数字比较：相同选「匹配」，不同选「不同」。')
                                            : (isEnglish ? 'Compare the current number with the previous number: same is Match, different is Different.' : '把当前数字和上一张数字比较：相同选「匹配」，不同选「不同」。')}`}</div>
                                    )}
                                </div>
                                {nback.isReady ? (
                                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                                        <button disabled={!!answerFeedback} onClick={(event) => {
                                            pulseControl('nback-match');
                                            handleNbackAnswer(true, event);
                                        }} className={`nback-choice-button py-5 rounded-2xl font-bold transition-all duration-200 disabled:pointer-events-none ${tutorialTask === 'nback' && !answerFeedback && nback.isMatch ? 'is-tutorial-target' : ''} ${controlPulse === 'nback-match' ? 'is-tap-pulsing' : ''} ${answerFeedback?.target === 'match' ? (answerFeedback.status === 'correct' ? 'is-feedback-correct bg-emerald-500 text-white scale-105' : 'is-feedback-wrong bg-red-500 text-white') : 'bg-indigo-600 text-white shadow-lg'}`}>{ui.match}</button>
                                        <button disabled={!!answerFeedback} onClick={(event) => {
                                            pulseControl('nback-different');
                                            handleNbackAnswer(false, event);
                                        }} className={`nback-choice-button py-5 rounded-2xl font-bold transition-all duration-200 disabled:pointer-events-none ${tutorialTask === 'nback' && !answerFeedback && !nback.isMatch ? 'is-tutorial-target' : ''} ${controlPulse === 'nback-different' ? 'is-tap-pulsing' : ''} ${answerFeedback?.target === 'different' ? (answerFeedback.status === 'correct' ? 'is-feedback-correct bg-emerald-500 text-white scale-105' : 'is-feedback-wrong bg-red-500 text-white') : 'bg-slate-200 text-slate-600'}`}>{ui.different}</button>
                                    </div>
                                ) : (
                                    <button disabled={!!answerFeedback} onClick={() => {
                                        handleNbackAnswer(false);
                                    }} className="py-5 w-full max-w-xs bg-indigo-600 text-white rounded-2xl font-bold shadow-lg disabled:pointer-events-none">{ui.continue}</button>
                                )}
                            </div>
                        )}
                        {/* 竞技里五个模块切换统一用 0.98 缩放 + 淡入（iOS ArenaGameStage）；训练里 SET、神经元仍用原来的弹出 */}
                        {view === 'setgame' && (
                            <div className={`setgame-layout flex flex-col items-center w-full ${mode === 'comp' ? 'arena-module-enter' : 'animate-pop-center'}`}>
                                {tutorialTask === 'setgame' && (
                                    <div className="set-warmup-hint">{isEnglish
                                        ? `Tutorial: find three cards. For ${isChallengeDifficulty ? 'color, shape, and fill level' : 'color and shape'}, each property must be all the same or all different.`
                                        : `教学：找出三个图形：${isChallengeDifficulty ? '颜色、形状和填充度' : '颜色和形状'}每一种属性都必须完全相同，或完全不同。`}</div>
                                )}
                                {mode === 'comp' && (
                                    // 竞技的 SET 牌面上方有一行规则提示，两档同文案（iOS ArenaSet）
                                    <div className="arena-set-hint">{ARENA_COPY[isEnglish ? 'en' : 'zh'].setHint}</div>
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
                                                            penalty: 20,
                                                            showPenalty: tutorialTask !== 'setgame',
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
                                            className={`set-card-button relative overflow-hidden aspect-square rounded-3xl border-2 flex items-center justify-center transition-all duration-200 disabled:pointer-events-none ${controlPulse === `set-${card.id}` ? 'is-tap-pulsing' : ''} ${tutorialTask === 'setgame' && card.isSolution && !answerFeedback ? 'is-tutorial-target' : ''} ${setGame.successIds?.includes(card.id)
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
                                        // 对错提示期间不响应，与 iOS 一致；原先答对后会被刷新两次。
                                        if (answerFeedback) return;
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
                            <div className={`neuron-layout flex flex-col items-center w-full min-h-0 ${mode === 'comp' ? 'arena-module-enter' : 'animate-pop-center'}`}>
                                {neuronTutorialAction && (
                                    <div className="tutorial-instruction neuron-tutorial-instruction">{
                                        neuronTutorialAction === 'increment'
                                            ? (isEnglish ? 'Tutorial: the target is highlighted; use the highlighted + control.' : '教学：目标已高亮，点击高亮的 + 记录数量')
                                            : neuronTutorialAction === 'decrement'
                                                ? (isEnglish ? 'Tutorial: the count is high; use the highlighted − control.' : '教学：数量多了，点击高亮的 − 调整')
                                                : (isEnglish ? 'Tutorial: the count is correct; submit with the highlighted control.' : '教学：数量正确，点击高亮的确认提交')
                                    }</div>
                                )}
                                <div className={`neuron-target flex-shrink-0 w-full max-w-sm mb-3 bg-white px-4 py-3 rounded-[1.5rem] border border-indigo-100 shadow-sm flex items-center justify-between gap-3 ${neuronTutorialAction ? 'is-tutorial-target' : ''}`}>
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
                                                // 对错提示期间 −/+/清零都不响应，与 iOS 一致。
                                                if (answerFeedback) return;
                                                playSound('tap');
                                                setNeuronCount(p => ({ ...p, currentCount: Math.max(0, p.currentCount - 1) }));
                                            }}
                                            className={`w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl font-bold border border-indigo-100 active:scale-95 transition-transform flex items-center justify-center ${neuronTutorialAction === 'decrement' ? 'is-tutorial-target' : ''}`}
                                        >
                                            <Icon name="minus" className="w-5 h-5" />
                                        </button>
                                        <div className="flex-1 h-14 bg-indigo-600 text-white rounded-2xl shadow-md flex flex-col items-center justify-center">
                                            <div className="text-[9px] opacity-70 font-black brand-text leading-none mb-0.5">{ui.recorded}</div>
                                            <div className="text-3xl font-black font-mono leading-none">{neuronCount.currentCount}</div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (answerFeedback) return;
                                                playSound('tap');
                                                setNeuronCount(p => ({ ...p, currentCount: p.currentCount + 1 }));
                                            }}
                                            className={`w-14 h-14 bg-indigo-600 text-white rounded-2xl font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center ${neuronTutorialAction === 'increment' ? 'is-tutorial-target' : ''}`}
                                        >
                                            <Icon name="plus" className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-[1fr_2fr] gap-2 mt-2">
                                        <button
                                            onClick={() => {
                                                if (answerFeedback) return;
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
                                                    flashError: false,
                                                    duration: neuronTutorialAction && isCorrect ? 500 : undefined
                                                });
                                                if (!isCorrect) {
                                                    setNeuronCount(p => ({ ...p, currentCount: 0 }));
                                                }
                                            }}
                                            className={`h-11 bg-slate-900 text-white rounded-[1.1rem] font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1 text-sm ${neuronTutorialAction === 'submit' ? 'is-tutorial-target' : ''}`}
                                        >
                                            <Icon name="check" className="w-5 h-5" /> {ui.submit}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {view === 'passwordlogic' && codeLogic.puzzle && (() => {
                            const codeLength = codeLogic.puzzle.codeLength;
                            const feedbackCopy = codeLogic.feedback === 'incomplete'
                                ? { text: codeLength === 4 ? ui.codeIncomplete4 : ui.codeIncomplete3, tone: 'is-incomplete' }
                                : codeLogic.feedback === 'wrong'
                                    ? { text: ui.codeWrong, tone: 'is-wrong' }
                                    : codeLogic.feedback === 'correct'
                                        ? {
                                            text: mode === 'infinite'
                                                ? ui.codePuzzleDone.replace('{n}', codeLogic.solved)
                                                : ui.codeComplete,
                                            tone: 'is-correct'
                                        }
                                        : null;
                            const keypadButton = (label, onClick, { primary = false, wide = false, action = null, highlighted = false } = {}) => (
                                <button
                                    key={label}
                                    onClick={() => {
                                        if (action && !codeTutorialAllows(action)) return;
                                        // 按键音由各自的处理函数在输入被接受后才播（iOS 相同）：
                                        // 数字、删除播点击音；提交不播点击音，只播答对/答错音；提示期间被锁的按键不出声。
                                        onClick();
                                    }}
                                    className={`code-key active:scale-95 transition-transform ${wide ? 'is-label' : ''} ${primary ? 'is-primary' : ''} ${highlighted ? 'is-code-tutorial-highlight' : ''}`}
                                >{label}</button>
                            );
                            return (
                                <div className="codelogic-layout flex flex-col w-full max-w-sm h-full min-h-0 animate-pop-center">
                                    <div className="flex-shrink-0 text-center">
                                        <div className="text-base font-black text-slate-800">{ui.codeFind}</div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-0.5 leading-snug px-2">{codeLength === 4 ? ui.codeSubtitle4 : ui.codeSubtitle3}</div>
                                    </div>

                                    {codeTutorialStep && (
                                        <div className="codelogic-tutorial-callout">
                                            <span>{
                                                codeTutorialStep.kind === 'orientation'
                                                    ? (isEnglish ? 'Read all four clues together. Each puzzle has one unique answer.' : '四条线索要一起看，每题只有一个唯一答案。')
                                                    : codeTutorialStep.kind === 'slot'
                                                        ? (codeTutorialStep.slot === 0
                                                            ? (isEnglish ? 'Fill a position once you know it. First, tap slot 1.' : '可以先填写你已经确定的位置。先点击第 1 格。')
                                                            : (isEnglish ? `Now tap slot ${codeTutorialStep.slot + 1}.` : `现在点击第 ${codeTutorialStep.slot + 1} 格。`))
                                                        : codeTutorialStep.kind === 'digit'
                                                            ? (isEnglish ? `Digit ${codeTutorialStep.slot + 1} is ${codeTutorialStep.digit}. Tap ${codeTutorialStep.digit}.` : `第 ${codeTutorialStep.slot + 1} 位已经确定为 ${codeTutorialStep.digit}，点击数字 ${codeTutorialStep.digit}。`)
                                                            : (isEnglish ? 'The code is complete. Tap Submit.' : '密码已填好，点击提交。')
                                            }</span>
                                            <button type="button" onClick={skipCodeTutorial} aria-label={isEnglish ? 'Skip Code Logic tutorial' : '跳过密码推理教学'}>{isEnglish ? 'Skip tutorial' : '跳过教学'}</button>
                                        </div>
                                    )}

                                    <div className={`code-slot-row flex-shrink-0 flex justify-center mt-3 ${codeLength === 4 ? 'is-four' : ''}`}>
                                        {codeLogic.entry.map((digit, index) => (
                                            <button
                                                key={index}
                                                onClick={() => tapCodeSlot(index)}
                                                className={`code-slot ${codeLength === 4 ? 'is-four' : ''} ${codeTutorialStep?.kind === 'slot' && codeTutorialStep.slot === index ? 'is-code-tutorial-highlight' : index === codeLogic.selected ? 'is-selected' : ''} ${digit === null ? 'is-empty' : ''}`}
                                            >{digit === null ? '–' : digit}</button>
                                        ))}
                                    </div>

                                    <div className="flex-shrink-0 h-7 mt-2 flex items-center justify-center">
                                        {feedbackCopy && (
                                            <span className={`code-feedback-pill ${feedbackCopy.tone}`}>{feedbackCopy.text}</span>
                                        )}
                                    </div>

                                    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2 py-1">
                                        {codeLogic.puzzle.clues.map((clue, index) => (
                                            <div key={index} className="flex items-center gap-2.5 px-3 py-2 min-h-[46px] bg-white rounded-2xl border border-slate-100">
                                                <span className="w-[22px] h-[22px] flex-shrink-0 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black font-mono flex items-center justify-center">{index + 1}</span>
                                                <span className="flex-shrink-0 font-mono font-black text-base text-slate-800 tracking-[0.12em]">{clue.guess.join('')}</span>
                                                <span className="flex-shrink-0 w-px h-6 bg-slate-100"></span>
                                                <span className="text-[11px] font-bold text-slate-500 leading-snug text-left">{window.PFLGameLogic.codeLogic.clueText(clue.evaluation, isEnglish)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="code-keypad flex-shrink-0 mt-2">
                                        {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, rowIndex) => (
                                            <div key={rowIndex} className="code-keypad-row">
                                                {row.map(digit => keypadButton(String(digit), () => enterCodeDigit(digit), { action: { type: 'digit', digit }, highlighted: codeTutorialStep?.kind === 'digit' && codeTutorialStep.digit === digit }))}
                                            </div>
                                        ))}
                                        <div className="code-keypad-row">
                                            {keypadButton(ui.codeDelete, deleteCodeDigit, { wide: true, action: { type: 'delete' } })}
                                            {keypadButton('0', () => enterCodeDigit(0), { action: { type: 'digit', digit: 0 }, highlighted: codeTutorialStep?.kind === 'digit' && codeTutorialStep.digit === 0 })}
                                            {keypadButton(ui.codeSubmit, submitCodeLogic, { primary: true, wide: true, action: { type: 'submit' }, highlighted: codeTutorialStep?.kind === 'submit' })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                    {tutorialHandoff?.kind === 'countdown' && (
                        <div className="tutorial-handoff" role="status" aria-label={isEnglish ? 'Tutorial complete. Now it’s your turn' : '教学完成。现在，轮到你了'}>
                            <div className="tutorial-handoff-title">{isEnglish ? 'Tutorial complete' : '教学完成'}</div>
                            <div className="tutorial-handoff-sub">{isEnglish ? 'Now it’s your turn' : '现在，轮到你了'}</div>
                            {typeof tutorialHandoff.stage === 'number' && (
                                <div key={tutorialHandoff.stage} className="tutorial-handoff-count">{tutorialHandoff.stage}</div>
                            )}
                        </div>
                    )}
                    {tutorialHandoff?.kind === 'schulte' && (
                        <div className={`tutorial-handoff is-schulte ${tutorialHandoff.stage === 'fading' ? 'is-fading' : ''}`} role="status">
                            <div className="schulte-handoff-pill">{isEnglish ? 'Start from 1' : '从 1 开始'}</div>
                        </div>
                    )}
                    {tutorialHandoff?.kind === 'codelogic' && (
                        <div className="tutorial-handoff is-codelogic" role="status">
                            <div className="codelogic-handoff-card">{isEnglish ? 'Now begin the real puzzle' : '现在开始正式推理'}</div>
                        </div>
                    )}
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
                // 密码推理一题 40~100 分，套不上按几百分写的五档评语，
                // 也没有「正确率」可言——它的指标和 iOS 结果页保持一致。
                const isCodeLogicResult = lastRunStats?.task === 'passwordlogic';
                const isCodeLogicTraining = isCodeLogicResult && !isDailyResult;
                const resultPresentation = getResultPresentation({ isDailyResult, resultAccuracy });
                // 竞技专属结算页（iOS ArenaResult）：双剑图标、固定副标题、不出评语和新纪录奖杯，
                // 指标不带「次」，按钮回竞技首页（mode 仍是 comp）。分数滚动沿用通用的 animatedScore。
                const isArenaResult = mode === 'comp';
                if (isArenaResult) {
                    const arenaCopy = ARENA_COPY[isEnglish ? 'en' : 'zh'];
                    return (
                        <div className="arena-result flex-1 flex flex-col items-center justify-center px-8 text-center animate-pop-center">
                            <div className="result-icon-orb is-arena">
                                <Icon name="swords" className="w-10 h-10" />
                            </div>
                            <div className="arena-result-title">{arenaCopy.resultTitle}</div>
                            <div className="result-score-counter text-6xl font-black mb-6 font-mono text-indigo-600">{animatedScore}</div>
                            <div className="arena-result-subtitle">{arenaCopy.resultSubtitle}</div>
                            <div className="result-metrics-grid arena-result-metrics w-full max-w-sm">
                                <div className="result-metric">
                                    <span>{arenaCopy.accuracy}</span>
                                    <strong>{resultAccuracy}%</strong>
                                </div>
                                <div className="result-metric">
                                    <span>{arenaCopy.correct}</span>
                                    <strong>{lastRunStats?.correct || 0}</strong>
                                </div>
                                <div className="result-metric">
                                    <span>{arenaCopy.mistakes}</span>
                                    <strong>{lastRunStats?.incorrect || 0}</strong>
                                </div>
                            </div>
                            <button onClick={() => { playSound('tap'); setView('home'); }} className="arena-result-button w-full max-w-sm">{arenaCopy.backToArena}</button>
                        </div>
                    );
                }
                // N-Back / SET / 神经元 / 密码推理的结算图标是固定的（iOS 各自的 Lucide 图标），
                // 舒尔特和 Stroop 仍按表现换图标；破纪录照旧显示奖杯。每日、竞技不走这里。
                const fixedResultIcon = (!isDailyResult && mode !== 'comp' && !lastRunStats?.isImproved)
                    ? ({ nback: 'brain', setgame: 'shapes', neuroncount: 'binary', passwordlogic: 'lock-keyhole' })[lastRunStats?.task] || null
                    : null;
                const resultOrbClass = !fixedResultIcon
                    ? resultPresentation.className
                    : isCodeLogicResult
                        ? 'is-fixed-icon is-codelogic'
                        // 图标颜色跟评语颜色；N-Back 正确率 ≥80 时底色用浅靛蓝，其余用页面底色。
                        : `is-fixed-icon ${feedback.color} ${lastRunStats?.task === 'nback' && resultAccuracy >= 80 ? 'is-fixed-accent' : ''}`;
                // 密码推理用时格式（iOS timeText）：中文「M分 S秒」/「S 秒」，英文「M:SS」/「Ss」。
                const formatCodeTime = (seconds) => {
                    const minutes = Math.floor(seconds / 60);
                    const rest = seconds % 60;
                    if (!isEnglish) return minutes > 0 ? `${minutes}分 ${rest}秒` : `${rest} 秒`;
                    return minutes > 0 ? `${minutes}:${String(rest).padStart(2, '0')}` : `${rest}s`;
                };
                // 用时取局内的已用时间：iOS 在接受答案那一刻停表，不含答对后 560ms 的提示。
                const codeElapsedSeconds = codeLogic.elapsed || resultDuration;
                const codeCountUp = (value) => Math.round((value || 0) * codeResultEase);
                return (
                    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-pop-center">
                        <div className={`result-icon-orb ${resultOrbClass}`}>
                            {/* 每日结算用 iOS 的绿色勾；其他按游戏用固定图标或按表现换图标 */}
                            {isDailyResult ? <DailyResultMark /> : <Icon name={fixedResultIcon || resultPresentation.icon} className="w-10 h-10" />}
                        </div>
                        <div className="text-[10px] font-black brand-text text-slate-400 mb-1">{isDailyResult ? ui.dailyFinishedTitle : isCodeLogicTraining ? (isEnglish ? 'TRAINING COMPLETE · SCORE' : '训练结束 · 最终得分') : ui.resultTitle}</div>
                        <div className={`result-score-counter text-6xl font-black ${isCodeLogicTraining ? 'mb-4' : 'mb-6'} font-mono ${isDailyResult ? 'text-emerald-500' : 'text-indigo-600'}`}>{animatedScore}</div>
                        {isCodeLogicResult ? (
                            <div className="text-[13px] font-bold text-slate-500 mb-[22px] max-w-[240px]">{ui.codeResultLine}</div>
                        ) : (
                            <>
                                <div className={`text-xl font-black mb-1 ${isDailyResult ? 'text-emerald-600' : feedback.color}`}>{isDailyResult ? `${ui.dailyStreak} ${dailyStreak} ${ui.dailyDays}` : feedback.label}</div>
                                <div className="text-xs text-slate-500 mb-4 font-medium leading-relaxed max-w-[240px]">{isDailyResult ? ui.dailyFinishedSub : feedback.sub}</div>
                            </>
                        )}
                        <div className="result-metrics-grid w-full max-w-sm mb-6">
                            {isCodeLogicResult ? (
                                <>
                                    <div className="result-metric">
                                        <span>{ui.codeResultCompleted}</span>
                                        <strong>{codeCountUp(lastRunStats?.correct)}</strong>
                                    </div>
                                    <div className="result-metric">
                                        <span>{ui.codeResultTime}</span>
                                        <strong>{formatCodeTime(codeCountUp(codeElapsedSeconds))}</strong>
                                    </div>
                                    <div className="result-metric">
                                        <span>{ui.codeResultIncorrect}</span>
                                        <strong>{codeCountUp(lastRunStats?.incorrect)}</strong>
                                    </div>
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
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
                                    <strong>{tomorrowTheme.title}</strong>
                                </div>
                            </div>
                        )}
                        {isDailyResult && (
                            <div className="daily-result-note is-parity">
                                <span>{dailyParityText.resultNote}</span>
                            </div>
                        )}
                        {!isDailyResult && <div className={isCodeLogicTraining ? 'mb-1' : 'mb-8'} />}
                        {isDailyResult ? (
                            <div className="w-full max-w-sm flex flex-col gap-3">
                                <button onClick={() => { playSound('tap'); setMode('daily'); setView('home'); }} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg">{ui.dailySeeTomorrow}</button>
                                {/* 与 iOS 一致：再冲一次先回到开始前的规则卡 */}
                                <button onClick={() => setDailyGateOpen(true)} className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black">{ui.dailyPracticeAgain}</button>
                            </div>
                        ) : (
                            <button onClick={() => { playSound('tap'); setView('home'); }} className="w-full max-w-sm py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg">{isCodeLogicTraining ? (isEnglish ? 'Back to Training' : '返回训练') : ui.backHome}</button>
                        )}
                    </div>
                );
            })()}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
