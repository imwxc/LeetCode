/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 *  
    let n = prices.length
    // 定义：dp[n][k][0 or 1] 为 第n天，剩余交易次数为k次，手上是否持有股票
    let dp = new Array(n).map(()=>new Array(k).map(()=>({0:0,1:0})))
    const buy = (i,k)=>{
        return dp[i-1][k-1][0] - prices[i]
    }
    const sell = (i,k)=>{
        return dp[i-1][k][1] + prices[i]
    }
    const rest = (i,k, has)=>{
        return dp[i-1][k][has]
    }
    dp[i][k][0] = Math.max(sell(i,k), rest(i,k,0))
    dp[i][k][1] = Math.max(buy(i,k), rest(i,k,1))
    return dp[n-1][k][0]
 */

// @lc code=start
var maxProfit_k_2 = function (prices) {
    var max_k = 2,
        n = prices.length;
    var dp = new Array(n)
        .fill(0)
        .map(() =>
            new Array(max_k + 1).fill(0).map(() => new Array(2).fill(0))
        );
    for (var i = 0; i < n; i++) {
        for (var k = max_k; k >= 1; k--) {
            if (i - 1 == -1) {
                // 处理 base case
                dp[i][k][0] = 0;
                dp[i][k][1] = -prices[i];
                continue;
            }
            dp[i][k][0] = Math.max(
                dp[i - 1][k][0],
                dp[i - 1][k][1] + prices[i]
            );
            dp[i][k][1] = Math.max(
                dp[i - 1][k][1],
                dp[i - 1][k - 1][0] - prices[i]
            );
        }
    }
    // 穷举了 n × max_k × 2 个状态，正确。
    return dp[n - 1][max_k][0];
};
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let n = prices.length;
    let max_k = 2;
    // 定义：dp[n][k][0 or 1] 为 第n天，剩余交易次数为k次，手上是否持有股票, 的利润
    let dp = new Array(n)
        .fill(0)
        .map(() =>
            new Array(max_k + 1).fill(0).map(() => new Array(2).fill(0))
        );
    const buy = (i, k) => {
        return dp[i - 1][k - 1][0] - prices[i];
    };
    const sell = (i, k) => {
        return dp[i - 1][k][1] + prices[i];
    };
    const rest = (i, k, has) => {
        return dp[i - 1][k][has];
    };
    // 由于需要处理k的状态, 所以basecase放到循环内进行判断
    for (let i = 0; i < n; i++) {
        // 倒着遍历是因为 dp[i][k][...] 
        // 不依赖dp[i][k-1][...], 而是dp[i-1][k-1][...]
        // dp[i-1][k-1][...]是上一步已经计算得出的
        for (let k = max_k; k >= 1; k--) {
            // 当i==0时, base case
            if (i - 1 == -1) {
                dp[i][k][0] = 0;
                dp[i][k][1] = -prices[i];
                continue;
            }
            dp[i][k][0] = Math.max(sell(i, k), rest(i, k, 0));
            dp[i][k][1] = Math.max(buy(i, k), rest(i, k, 1));
        }
    }

    return dp[n - 1][max_k][0];
    // return maxProfit_k_2(prices)
};
// @lc code=end
