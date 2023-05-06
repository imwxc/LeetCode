/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 */

// @lc code=start
/**
 * 动态规划递归解法
 *
 * @param {number[][]} grid
 * @return {number}
 */
var V1 = function (grid) {
    let m = grid.length,
        n = grid[0].length;
    let memo = {};
    // 定义：返回从0，0走到i，j的最小路径和
    function dp(i, j) {
        let key = `i${i}j${j}`;
        if (memo[key]) return memo[key];
        if (!i && !j) {
            memo[key] = grid[i][j];
            return memo[key];
        }
        if (i < 0 || j < 0) {
            return Number.MAX_SAFE_INTEGER;
        }
        memo[key] = Math.min(dp(i - 1, j), dp(i, j - 1)) + grid[i][j];
        return memo[key];
    }
    return dp(m - 1, n - 1);
};
/**
 * 动态规划迭代解法
 *
 * @param {number[][]} grid
 * @return {number}
 */
var V2 = function (grid) {
    let m = grid.length,
        n = grid[0].length;
    // 定义：dp[i][j] 表示从0,0到i,j的最小路径
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));

    // base case 0,0到0,0是其自身
    dp[0][0] = grid[0][0]

    // base case 0,0到i,0是 横向一路相加
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    // base case 0,0到0,j是 纵向一路相加
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // dp[i][j] 是其上方与左侧的最小值和当前格子路径相加
            dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1])+grid[i][j]
        }
    }
    return dp[m-1][n-1]
};
/**
 * 动态规划递归解法
 *
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    // return V1(grid);
    return V2(grid)
};
// @lc code=end
