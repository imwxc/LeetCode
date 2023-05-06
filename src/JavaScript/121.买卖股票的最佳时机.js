/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 *  *   let n = prices.length
    // 定义：dp[n][k][0 or 1] 为 第n天，剩余交易次数为k次，手上是否持有股票
    let dp = new Array(n).map(()=>new Array(k).map(()=>({0:0,1:0})))
    const buy = (i,k)=>{
        return dp[i-1][k-1][0] - prices[i]
    }
    const sell = (i,k)=>{
        return dp[i-1][k][1] + prices[i]
    }
    const rest = (i,k)=>{
        return dp[i-1][k][0]
    }.
    dp[i][k][0] = Math.max(sell(i,k), rest(i,k))
    dp[i][k][1] = Math.max(buy(i,k), sell(i,k))
    return dp[n-1][k][0]
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let n = prices.length
    // 定义：dp[n][1][0 or 1] 为 第n天，剩余交易次数为1次，手上是否持有股票
    let dp = new Array(n).fill(0).map(()=>({0:0,1:0}))

    // dp[i-1][0][0] 表示当前为第n天，
    // 允许交易的最大次数为0，手上没有股票， 所以直接简化为0
    const buy = (i)=>{
        return -prices[i]
    }

    const sell = (i)=>{
        return dp[i-1][1] + prices[i]
    }
    
    // 选择rest，i代表天数， has代表是否持有股票
    const rest = (i,has)=>{
        return dp[i-1][has]
    }

    for(let i=0;i<prices.length;i++){
        // console.log(dp)
        // 特殊判断数组越界的情况
        if(i-1 == -1){
            // 根据状态方程可以得出
            dp[i][0] = 0
            dp[i][1] = -prices[i]
            continue
        }
        dp[i][0] = Math.max(sell(i), rest(i,0))
        dp[i][1] = Math.max(buy(i), rest(i,1))
    }

    // console.log(dp)
    return dp[n-1][0]
};
// @lc code=end

