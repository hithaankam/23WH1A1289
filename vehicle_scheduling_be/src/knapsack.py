def knapsack(N, K, weights, values):
    dp = [[-1] * (K + 1) for _ in range(N + 1)]
    for i in range(N + 1):
        dp[i][0] = 0
    for i in range(K + 1):
        dp[0][i] = 0
    for i in range(1, N + 1):
        for j in range(1, K + 1):
            include, exclude = 0, 0
            exclude = dp[i - 1][j]
            if j >= weights[i - 1]:
                include = dp[i - 1][j - weights[i - 1]] + values[i - 1]
            dp[i][j] = max(include, exclude)
    #print(dp)
    return dp[N][K]
    
'''T = int(input())
for _ in range(T):
    s, n = map(int, input().split())
    weights = []
    values = []
    for i in range(n):
        w, v = map(int, input().split())
        weights.append(w)
        values.append(v)
    
    print(knapsack(n, s, weights, values))'''