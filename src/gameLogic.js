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

    window.PFLGameLogic = {
        createNbackRound,
    };
})();
