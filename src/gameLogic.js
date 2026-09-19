(function () {
    function randomDigit() {
        return Math.floor(Math.random() * 9) + 1;
    }

    function createNbackRound(sequence, level) {
        const canMatch = sequence.length >= level;
        const target = canMatch ? sequence[sequence.length - level] : null;
        const basicHasDoubleRepeat = level === 1
            && sequence.length >= 2
            && sequence[sequence.length - 1] === sequence[sequence.length - 2];
        const matchChance = 0.5;
        const shouldMatch = canMatch && !basicHasDoubleRepeat && Math.random() < matchChance;
        let current = randomDigit();

        if (shouldMatch) {
            current = target;
        } else if (canMatch) {
            do {
                current = randomDigit();
            } while (current === target);
        }

        return {
            current,
            isMatch: canMatch && current === target,
            isReady: canMatch,
        };
    }


    // ===== Code Logic =====
    // Ported from NativePrefrontalLab/PrefrontalLab/CodeLogicPuzzleEngine.swift.
    // Code Logic is the one game with no web original, so the app is the source
    // of truth: the curated banks, the difficulty band, the clue-composition
    // rule and the clue wording all come from there unchanged.

    // The curated Basic bank. Each entry is re-derived and re-proven unique at
    // build time by makeCodeLogicPuzzle, exactly as the app does.
    var CODE_LOGIC_BASIC_BANK = [
        { secret: [1, 7, 8], guesses: [[1, 8, 9], [9, 2, 3], [8, 0, 6], [1, 7, 2]] },
        { secret: [1, 9, 5], guesses: [[8, 1, 7], [2, 3, 5], [2, 1, 3], [3, 9, 5]] },
        { secret: [5, 3, 1], guesses: [[5, 3, 0], [8, 5, 1], [3, 2, 5], [4, 7, 5]] },
        { secret: [9, 6, 2], guesses: [[7, 0, 1], [7, 0, 2], [5, 2, 9], [9, 4, 6]] },
        { secret: [6, 9, 4], guesses: [[5, 7, 1], [1, 6, 5], [1, 8, 6], [2, 9, 4]] },
        { secret: [9, 2, 6], guesses: [[6, 2, 3], [3, 9, 7], [8, 3, 5], [1, 9, 4]] },
        { secret: [5, 2, 0], guesses: [[1, 2, 0], [6, 2, 0], [8, 5, 2], [2, 7, 8]] },
        { secret: [4, 3, 8], guesses: [[2, 1, 7], [4, 7, 9], [8, 4, 0], [4, 0, 3]] },
        { secret: [1, 6, 2], guesses: [[2, 6, 0], [1, 6, 5], [7, 4, 0], [3, 5, 2]] },
        { secret: [7, 8, 5], guesses: [[6, 5, 7], [4, 3, 8], [3, 6, 5], [6, 8, 5]] }
    ];

    // The curated Advanced bank. `metrics` are the app's numeric source values
    // as [exact, misplaced] per clue; they are never displayed, only checked
    // against the evaluator so a transcription slip cannot ship silently.
    var CODE_LOGIC_ADVANCED_BANK = [
        { secret: [4, 0, 2, 5], guesses: [[8, 7, 2, 3], [5, 7, 9, 1], [9, 1, 3, 6], [5, 0, 8, 6]], metrics: [[1, 0], [0, 1], [0, 0], [1, 1]] },
        { secret: [2, 4, 5, 3], guesses: [[6, 0, 7, 3], [0, 8, 4, 1], [6, 7, 8, 1], [2, 8, 4, 5]], metrics: [[1, 0], [0, 1], [0, 0], [1, 2]] },
        { secret: [9, 0, 5, 8], guesses: [[9, 4, 6, 2], [4, 7, 6, 5], [3, 2, 7, 1], [3, 0, 9, 8]], metrics: [[1, 0], [0, 1], [0, 0], [2, 1]] },
        { secret: [8, 5, 7, 9], guesses: [[3, 4, 7, 2], [6, 3, 4, 5], [0, 2, 6, 4], [8, 3, 9, 2]], metrics: [[1, 0], [0, 1], [0, 0], [1, 1]] },
        { secret: [3, 1, 0, 7], guesses: [[8, 5, 2, 7], [8, 9, 1, 2], [8, 2, 9, 6], [3, 9, 7, 0]], metrics: [[1, 0], [0, 1], [0, 0], [1, 2]] },
        { secret: [8, 7, 3, 5], guesses: [[8, 0, 4, 2], [0, 2, 4, 3], [6, 9, 1, 4], [6, 7, 1, 3]], metrics: [[1, 0], [0, 1], [0, 0], [1, 1]] },
        { secret: [6, 7, 2, 9], guesses: [[6, 8, 3, 5], [4, 2, 8, 1], [0, 5, 8, 3], [3, 2, 5, 9]], metrics: [[1, 0], [0, 1], [0, 0], [1, 1]] },
        { secret: [3, 1, 5, 8], guesses: [[4, 9, 7, 8], [2, 3, 6, 0], [2, 7, 6, 0], [6, 8, 5, 2]], metrics: [[1, 0], [0, 1], [0, 0], [1, 1]] },
        { secret: [1, 0, 3, 5], guesses: [[1, 6, 2, 4], [6, 2, 0, 8], [9, 8, 4, 7], [1, 5, 3, 4]], metrics: [[1, 0], [0, 1], [0, 0], [2, 1]] },
        { secret: [3, 7, 4, 9], guesses: [[6, 1, 4, 2], [2, 5, 7, 0], [6, 2, 0, 1], [3, 5, 7, 9]], metrics: [[1, 0], [0, 1], [0, 0], [2, 1]] }
    ];

    function evaluateCode(codeDigits, guessDigits) {
        var exact = 0;
        var i;
        for (i = 0; i < codeDigits.length; i++) {
            if (codeDigits[i] === guessDigits[i]) exact++;
        }
        var codeSet = new Set(codeDigits);
        var shared = 0;
        var seen = new Set();
        for (i = 0; i < guessDigits.length; i++) {
            var digit = guessDigits[i];
            if (seen.has(digit)) continue;
            seen.add(digit);
            if (codeSet.has(digit)) shared++;
        }
        var misplaced = shared - exact;
        return { exact: exact, misplaced: misplaced, absent: codeDigits.length - exact - misplaced };
    }

    function sameEvaluation(a, b) {
        return a.exact === b.exact && a.misplaced === b.misplaced;
    }

    function distinctDigitCodes(length, allowLeadingZero) {
        var codes = [];
        var walk = function (digits, used) {
            if (digits.length === length) {
                codes.push(digits);
                return;
            }
            for (var digit = 0; digit <= 9; digit++) {
                if (used[digit]) continue;
                if (digits.length === 0 && digit === 0 && !allowLeadingZero) continue;
                used[digit] = true;
                walk(digits.concat(digit), used);
                used[digit] = false;
            }
        };
        walk([], {});
        return codes;
    }

    // The verification space is every code a player could type: distinct
    // digits, leading zero allowed. It is deliberately wider than the answer
    // space (which bars a leading zero), because nothing on screen tells the
    // player that a code cannot start with zero, so a rival solution like `038`
    // still makes a puzzle ambiguous to them. Both spaces are built once.
    var verificationSpaceCache = {};
    var answerSpaceCache = {};

    function verificationSpace(length) {
        if (!verificationSpaceCache[length]) {
            verificationSpaceCache[length] = distinctDigitCodes(length, true);
        }
        return verificationSpaceCache[length];
    }

    function answerSpace(length) {
        if (!answerSpaceCache[length]) {
            answerSpaceCache[length] = distinctDigitCodes(length, false);
        }
        return answerSpaceCache[length];
    }

    function codeLogicSolutions(clues) {
        if (!clues.length) return [];
        var length = clues[0].guess.length;
        return verificationSpace(length).filter(function (candidate) {
            return clues.every(function (clue) {
                return sameEvaluation(evaluateCode(candidate, clue.guess), clue.evaluation);
            });
        });
    }

    // Every displayed clue is derived from the evaluator, and a clue set is
    // accepted only when the whole verification space holds exactly one
    // solution and that solution is the intended secret.
    function makeCodeLogicPuzzle(secret, guesses) {
        if (guesses.length !== 4) return null;
        var joined = guesses.map(function (guess) { return guess.join(''); });
        if (new Set(joined).size !== 4) return null;
        if (!guesses.every(function (guess) { return guess.length === secret.length; })) return null;
        var clues = guesses.map(function (guess) {
            return { guess: guess, evaluation: evaluateCode(secret, guess) };
        });
        var found = codeLogicSolutions(clues);
        if (found.length !== 1 || found[0].join('') !== secret.join('')) return null;
        return { secret: secret, clues: clues, codeLength: secret.length };
    }

    function remainingAfterThreeClues(puzzle) {
        return codeLogicSolutions(puzzle.clues.slice(0, 3)).length;
    }

    // Measured over the app's twenty curated puzzles, then trimmed at both
    // tails: below the band the fourth clue does no work, above it the last
    // step stops being deduction and becomes a search.
    function codeLogicDifficultyBand(codeLength) {
        return codeLength === 4 ? { min: 6, max: 24 } : { min: 4, max: 16 };
    }

    function codeLogicClueComposition(codeLength) {
        return codeLength === 4
            ? { requiresNoneCorrect: true, requiresMixed: true }
            : { requiresNoneCorrect: false, requiresMixed: false };
    }

    function satisfiesClueComposition(evaluations, codeLength) {
        var has = function (predicate) { return evaluations.some(predicate); };
        if (!has(function (e) { return e.exact >= 1; })) return false;
        if (!has(function (e) { return e.misplaced >= 1; })) return false;
        if (!has(function (e) { return e.exact + e.misplaced >= 2; })) return false;
        if (!has(function (e) { return e.exact + e.misplaced <= 1; })) return false;

        var counts = {};
        evaluations.forEach(function (e) {
            var key = e.exact + ':' + e.misplaced;
            counts[key] = (counts[key] || 0) + 1;
        });
        var keys = Object.keys(counts);
        // Three or more distinct shapes, none more than twice. This is what
        // stops four clues of the same kind, which carry information and still
        // force broad trial and error.
        if (keys.length < 3) return false;
        if (keys.some(function (key) { return counts[key] > 2; })) return false;

        var rule = codeLogicClueComposition(codeLength);
        if (rule.requiresNoneCorrect && !has(function (e) { return e.exact === 0 && e.misplaced === 0; })) return false;
        if (rule.requiresMixed && !has(function (e) { return e.exact >= 1 && e.misplaced >= 1; })) return false;
        return true;
    }

    // Requirements not yet met, so selection can steer toward a legal
    // composition instead of only filtering at the end.
    function unmetRequirements(chosen, codeLength) {
        var rule = codeLogicClueComposition(codeLength);
        var unmet = [];
        var need = function (predicate) {
            if (!chosen.some(predicate)) unmet.push(predicate);
        };
        if (rule.requiresNoneCorrect) need(function (e) { return e.exact === 0 && e.misplaced === 0; });
        if (rule.requiresMixed) need(function (e) { return e.exact >= 1 && e.misplaced >= 1; });
        need(function (e) { return e.exact >= 1; });
        need(function (e) { return e.misplaced >= 1; });
        need(function (e) { return e.exact + e.misplaced >= 2; });
        need(function (e) { return e.exact + e.misplaced <= 1; });
        return unmet;
    }

    function shuffled(list) {
        var copy = list.slice();
        for (var i = copy.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var swap = copy[i];
            copy[i] = copy[j];
            copy[j] = swap;
        }
        return copy;
    }

    function randomInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    // Clue selection aims *at* a difficulty rather than minimising candidates.
    // Always taking the most-narrowing guess drives every puzzle to a single
    // candidate after three clues — the easiest board the format allows, with a
    // redundant fourth row.
    function generateProcedural(codeLength) {
        var space = verificationSpace(codeLength);
        var answers = answerSpace(codeLength);
        if (!space.length || !answers.length) return null;
        var secret = answers[Math.floor(Math.random() * answers.length)];

        var band = codeLogicDifficultyBand(codeLength);
        var target = randomInt(band.min, band.max);
        var ratio = Math.pow(target / space.length, 1 / 3);
        var stepTargets = [1, 2, 3].map(function (step) {
            return space.length * Math.pow(ratio, step);
        });

        var secretKey = secret.join('');
        var pool = shuffled(space.filter(function (code) { return code.join('') !== secretKey; }));
        if (pool.length <= 4) return null;

        var chosen = [];
        var chosenEvaluations = [];
        var remaining = space;

        for (var step = 0; step < 3; step++) {
            // The first clue narrows the full space, where one guess is worth
            // about as much as another, so sampling widely there is wasted
            // work. Later clues cut a small set, where the choice decides the
            // difficulty and the sample is cheap.
            var sample = step === 0 ? 6 : 40;
            var unmet = unmetRequirements(chosenEvaluations, codeLength);
            var best = null;
            var bestPriority = Infinity;
            var bestDistance = Infinity;

            for (var i = 0; i < Math.min(sample, pool.length); i++) {
                var guess = pool[i];
                var result = evaluateCode(secret, guess);
                var narrowed = remaining.filter(function (candidate) {
                    return sameEvaluation(evaluateCode(candidate, guess), result);
                });
                if (!narrowed.length || narrowed.length >= remaining.length) continue;

                // Composition first, difficulty second: a clue that fills an
                // outstanding requirement wins, one that would make its shape
                // appear a third time loses, everything else is judged only on
                // how close it lands to this step's target.
                var sameShape = chosenEvaluations.filter(function (e) { return sameEvaluation(e, result); }).length;
                var priority = sameShape >= 2 ? 2 : (unmet.some(function (predicate) { return predicate(result); }) ? 0 : 1);
                var distance = Math.abs(narrowed.length - stepTargets[step]);
                if (priority < bestPriority || (priority === bestPriority && distance < bestDistance)) {
                    bestPriority = priority;
                    bestDistance = distance;
                    best = { guess: guess, narrowed: narrowed, result: result };
                }
            }

            if (!best) return null;
            chosen.push(best.guess);
            chosenEvaluations.push(best.result);
            remaining = best.narrowed;
            var usedKey = best.guess.join('');
            pool = pool.filter(function (code) { return code.join('') !== usedKey; });
        }

        if (remaining.length < band.min || remaining.length > band.max) return null;

        // The fourth clue has two jobs: separate the secret from the survivors,
        // and leave the finished set with a legal composition.
        var closing = null;
        for (var k = 0; k < pool.length; k++) {
            var candidateGuess = pool[k];
            var closingResult = evaluateCode(secret, candidateGuess);
            var survivors = remaining.filter(function (candidate) {
                return sameEvaluation(evaluateCode(candidate, candidateGuess), closingResult);
            });
            if (survivors.length !== 1) continue;
            if (!satisfiesClueComposition(chosenEvaluations.concat(closingResult), codeLength)) continue;
            closing = candidateGuess;
            break;
        }
        if (!closing) return null;

        // makeCodeLogicPuzzle re-proves uniqueness over the whole verification
        // space from scratch, so none of the narrowing above is taken on trust.
        return makeCodeLogicPuzzle(secret, chosen.concat([closing]));
    }

    var CODE_LOGIC_ATTEMPT_BUDGET = 80;
    var codeLogicBankCache = {};

    function codeLogicBank(codeLength) {
        if (!codeLogicBankCache[codeLength]) {
            var source = codeLength === 4 ? CODE_LOGIC_ADVANCED_BANK : CODE_LOGIC_BASIC_BANK;
            codeLogicBankCache[codeLength] = source.map(function (entry) {
                var puzzle = makeCodeLogicPuzzle(entry.secret, entry.guesses);
                if (!puzzle) throw new Error('Code Logic bank entry is not uniquely solvable: ' + entry.secret.join(''));
                return puzzle;
            });
        }
        return codeLogicBankCache[codeLength];
    }

    function codeLogicFallback(codeLength, excludeSecret) {
        var bank = codeLogicBank(codeLength);
        var selectable = bank.filter(function (puzzle) { return puzzle.secret.join('') !== excludeSecret; });
        var pool = selectable.length ? selectable : bank;
        return pool[Math.floor(Math.random() * pool.length)];
    }

    // Never fails: a generated puzzle when the budget allows, a curated bank
    // puzzle otherwise. A rare generation miss must not break play.
    function generateCodeLogicPuzzle(codeLength, excludeSecret) {
        for (var attempt = 0; attempt < CODE_LOGIC_ATTEMPT_BUDGET; attempt++) {
            var puzzle = generateProcedural(codeLength);
            if (!puzzle) continue;
            if (excludeSecret && puzzle.secret.join('') === excludeSecret) continue;
            return puzzle;
        }
        return codeLogicFallback(codeLength, excludeSecret);
    }

    function codeLogicClueText(evaluation, isEnglish) {
        var exact = evaluation.exact;
        var misplaced = evaluation.misplaced;
        var total = exact + misplaced;
        if (exact === 0 && misplaced === 0) {
            return isEnglish ? 'No digits are correct' : '没有数字正确';
        }
        if (exact === 0 && misplaced === 1) {
            return isEnglish ? '1 digit is correct, but in the wrong position' : '1 个数字正确，但位置错误';
        }
        if (exact === 1 && misplaced === 0) {
            return isEnglish ? '1 digit is correct and in the correct position' : '1 个数字正确且位置正确';
        }
        if (exact === 1 && misplaced === 1) {
            return isEnglish
                ? '2 digits are correct: 1 is in the correct position and 1 is in the wrong position'
                : '2 个数字正确：1 个位置正确，另 1 个位置错误';
        }
        if (exact === 0) {
            return isEnglish
                ? total + ' digits are correct, but all are in the wrong position'
                : total + ' 个数字正确，但位置都错误';
        }
        if (misplaced === 0) {
            return isEnglish
                ? total + ' digits are correct and in the correct position'
                : total + ' 个数字正确且位置正确';
        }
        return isEnglish
            ? total + ' digits are correct: ' + exact + ' in the correct position and ' + misplaced + ' in the wrong position'
            : total + ' 个数字正确：' + exact + ' 个位置正确，另 ' + misplaced + ' 个位置错误';
    }

    // Exhaustive check, run from the console rather than on every page load.
    function codeLogicSelfTest(generatedPerLength) {
        var rounds = generatedPerLength || 40;
        var report = { bank: {}, generated: {}, failures: [] };

        [3, 4].forEach(function (codeLength) {
            var source = codeLength === 4 ? CODE_LOGIC_ADVANCED_BANK : CODE_LOGIC_BASIC_BANK;
            source.forEach(function (entry) {
                if (!entry.metrics) return;
                entry.guesses.forEach(function (guess, index) {
                    var evaluation = evaluateCode(entry.secret, guess);
                    var metric = entry.metrics[index];
                    if (evaluation.exact !== metric[0] || evaluation.misplaced !== metric[1]) {
                        report.failures.push('metric mismatch ' + entry.secret.join('') + ' / ' + guess.join(''));
                    }
                });
            });

            var bank = codeLogicBank(codeLength);
            report.bank[codeLength] = bank.map(remainingAfterThreeClues).sort(function (a, b) { return a - b; });
            bank.forEach(function (puzzle) {
                if (codeLogicSolutions(puzzle.clues).length !== 1) {
                    report.failures.push('bank not unique ' + puzzle.secret.join(''));
                }
            });

            var band = codeLogicDifficultyBand(codeLength);
            var measured = [];
            for (var i = 0; i < rounds; i++) {
                var puzzle = generateCodeLogicPuzzle(codeLength);
                var key = puzzle.secret.join('');
                if (puzzle.codeLength !== codeLength) report.failures.push('wrong length ' + key);
                if (puzzle.secret[0] === 0) report.failures.push('leading zero secret ' + key);
                if (new Set(puzzle.secret).size !== codeLength) report.failures.push('repeated digit ' + key);
                if (codeLogicSolutions(puzzle.clues).length !== 1) report.failures.push('generated not unique ' + key);
                if (!satisfiesClueComposition(puzzle.clues.map(function (clue) { return clue.evaluation; }), codeLength)) {
                    report.failures.push('composition ' + key);
                }
                var remaining = remainingAfterThreeClues(puzzle);
                if (remaining < band.min || remaining > band.max) report.failures.push('band ' + key + ' = ' + remaining);
                measured.push(remaining);
            }
            measured.sort(function (a, b) { return a - b; });
            report.generated[codeLength] = {
                min: measured[0],
                median: measured[Math.floor(measured.length / 2)],
                max: measured[measured.length - 1]
            };
        });

        report.ok = report.failures.length === 0;
        return report;
    }

    window.PFLGameLogic = {
        createNbackRound,
        codeLogic: {
            evaluate: evaluateCode,
            solutions: codeLogicSolutions,
            makePuzzle: makeCodeLogicPuzzle,
            generate: generateCodeLogicPuzzle,
            bank: codeLogicBank,
            clueText: codeLogicClueText,
            difficultyBand: codeLogicDifficultyBand,
            remainingAfterThreeClues: remainingAfterThreeClues,
            selfTest: codeLogicSelfTest,
        },
    };
})();
