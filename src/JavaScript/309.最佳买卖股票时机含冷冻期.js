/*
 * @lc app=leetcode.cn id=309 lang=javascript
 *
 * [309] 最佳买卖股票时机含冷冻期
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
    }
    dp[i][k][0] = Math.max(sell(i,k), rest(i,k,0))
    dp[i][k][1] = Math.max(buy(i,k), rest(i,k,1))
    return dp[n-1][k][0]
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let n = prices.length;
    if(!n || n==1) return 0 // 边界条件 一天的时候防止数组越界
    // 定义：dp[n][0 or 1] 为 第n天，手上是否持有股票
    let dp = new Array(n).fill(0).map(()=>({0:0,1:0}))
    // 购买时需要隔一天，且手上没有股票 所以是[i-2][0]
    const buy = (i)=>{
        return dp[i-2][0] - prices[i]
    }
    // 卖出时不用隔一天 且手上要有股票， 所以是[i-1][1]
    const sell = (i)=>{
        return dp[i-1][1] + prices[i]
    }
    const rest = (i,has)=>{
        return dp[i-1][has]
    }
    // base case 第0天
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    // base case 第1天 没有股票说明没交易或者卖掉了
    dp[1][0] = Math.max(sell(1), rest(1,0))
    // 有股票说明买了，或者没交易, 第1天买入的话是纯掏钱
    dp[1][1] = Math.max(-prices[1], rest(1,1)) 

    for(let i =2;i<n;i++){
        dp[i][0] = Math.max(sell(i), rest(i,0))
        dp[i][1] = Math.max(buy(i), rest(i,1))
    }
    return dp[n-1][0]
};
// @lc code=end

