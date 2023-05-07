/*
 * @lc app=leetcode.cn id=714 lang=javascript
 *
 * [714] 买卖股票的最佳时机含手续费
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
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
    let n = prices.length
    // 定义：dp[n][k][0 or 1] 为 第n天，剩余交易次数为k次，手上是否持有股票，
    // 由于不限制k的次数, 此时k=+∞, 所以k~k-1, k的状态可以不统计
    let dp = new Array(n).fill(0).map(()=>({0:0,1:0}))
    const buy = (i)=>{
        return dp[i-1][0] - prices[i] 
    }
    const sell = (i)=>{
        return dp[i-1][1] + prices[i] - fee
    }
    const rest = (i, has)=>{
        return dp[i-1][has]
    }

    // base case 
    // 第0天的情况
    dp[0][0] = 0
    dp[0][1] = -prices[0] //因为是在卖出时扣除手续费, 所以这里不用加 -fee

    for(let i = 1; i<n;i++){
        dp[i][0] = Math.max(sell(i), rest(i,0))
        dp[i][1] = Math.max(buy(i), rest(i,1))
    }
    return dp[n-1][0]
};
// @lc code=end

