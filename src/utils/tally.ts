export const tally = (currentScore: number, startTime: number | undefined) => {
    let newScore = currentScore;
    if (startTime !== undefined) {
        let timeSpent: number = (performance.now() - startTime) / 1000;
        if (timeSpent < 10) {
            newScore = currentScore + 100;
        } else if (timeSpent < 20) {
            newScore = currentScore + 75;
        } else if (timeSpent < 30) {
            newScore = currentScore + 50;
        } else {
            newScore = currentScore + 25;
        }
    }

    return newScore;
};