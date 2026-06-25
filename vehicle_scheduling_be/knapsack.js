function knapsack(tasks, mechanicHours) {
    const N = tasks.length;
    const K = mechanicHours;

    const dp = Array(N + 1)
        .fill()
        .map(() => Array(K + 1).fill(-1));

    for (let i = 0; i <= N; i++) {
        dp[i][0] = 0;
    }

    for (let j = 0; j <= K; j++) {
        dp[0][j] = 0;
    }

    for (let i = 1; i <= N; i++) {
        const duration = tasks[i - 1].Duration;
        const impact = tasks[i - 1].Impact;

        for (let j = 1; j <= K; j++) {

            let include = 0;
            let exclude = 0;

            exclude = dp[i - 1][j];

            if (j >= duration) {
                include =
                    dp[i - 1][j - duration] +
                    impact;
            }

            dp[i][j] = Math.max(include, exclude);
        }
    }

    return dp[N][K];
}