/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 *  *   let n = prices.length
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
    }.
    dp[i][k][0] = Math.max(sell(i,k), rest(i,k,0))
    dp[i][k][1] = Math.max(buy(i,k), rest(i,k,1))
    return dp[n-1][k][0]
 */

// @lc code=start
/**
 * 思路：由于k不受限制，所以k可以认为是+∞，此时k ~= k-1
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let n = prices.length
    // 定义：dp[i][0 or 1]为第i天，手上是否持有股票的利润
    let dp = new Array(n).fill(0).map(()=>({0:0,1:0}))
    // base case: 
    // 第1天时， 手上持有的话是买入了，此时利润为负数
    // 第1天时，手上没持有就是0
    dp[0][1] = -prices[0]
    dp[0][0] = 0
    const buy = (i)=>{
        return dp[i-1][0] - prices[i]
    }
    const sell = (i)=>{
        return dp[i-1][1] + prices[i]
    }
    const rest = (i, has)=>{
        return dp[i-1][has]
    }
    // 已经给出了第0天的base case，直接从第1天开始
    for(let i = 1; i<n; i++){
        dp[i][0] = Math.max(sell(i), rest(i,0))
        dp[i][1] = Math.max(buy(i), rest(i,1)) 
    }
    return dp[n-1][0]
};
// @lc code=end

