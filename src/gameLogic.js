(function () {
    function randomDigit() {
        return Math.floor(Math.random() * 9) + 1;
    }

    function createNbackRound(sequence, level) {
        const canMatch = sequence.length >= level;
        const target = canMatch ? sequence[sequence.length - level] : null;
        const shouldMatch = canMatch && Math.random() < 0.5;
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
