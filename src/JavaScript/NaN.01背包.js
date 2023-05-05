/*
 * @lc app=leetcode.cn id=474 lang=javascript
 *
 * [NaN] 01背包
 * 给你一个可装载重量为 W 的背包和 N 个物品，
 * 每个物品有重量和价值两个属性。
 * 其中第 i 个物品的重量为 wt[i]，价值为 val[i]，
 * 现在让你用这个背包装物品，最多能装的价值是多少？
 * 
 */

// @lc code=start

/**
 * @param {number} W
 * @param {number} N
 * @param {number[]} wt
 * @param {number[]} val
 * @return {number}
 */
var knapsack = function(W, wt, val) {
    let N = wt.length
    // 已初始化的base case
    // 定义如下：对于前 i 个物品，当前背包的容量为 w，这种情况下可以装的最大价值是 dp[i][w]。
    var dp = new Array(N + 1).fill().map(() => new Array(W + 1).fill(0));
    for (var i = 1; i <= N; i++) {
        for (var w = 1; w <= W; w++) {
            if (w - wt[i - 1] < 0) {
                // 这种情况下只能选择不装入背包
                dp[i][w] = dp[i - 1][w];
            } else {
                // 装入或者不装入背包，择优
                dp[i][w] = Math.max(
                    // 当装入val[i]的物品时,此时剩余的容量为 w-wt[i],
                    // 需要找到 剩余容量下，装入i-1个物品的价值
                    dp[i - 1][w - wt[i-1]] + val[i-1], // 因为dp是从1开始的， 所以有索引偏移，需要改成i-1
                    dp[i - 1][w]
                );
            }
        }
    }

    return dp[N][W];
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = knapsack;
// @after-stub-for-debug-end
