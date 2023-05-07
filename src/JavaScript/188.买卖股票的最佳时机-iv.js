/*
 * @lc app=leetcode.cn id=188 lang=javascript
 *
 * [188] 买卖股票的最佳时机 IV
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
 * 动态规划思路
 * 状态：第n天，交易k次，是否持有股票
 * 
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(max_k, prices) {
    let n = prices.length
    let k = max_k
    // 每次交易会使用两天的时间, 所以k不应该超出n/2, 如果超出了,就相当于k没有限制
    if(k>Math.floor(n/2)){
        let dp = new Array(n).fill(0).map(()=>({0:0,1:0}))
        const buy = (i)=>{
            return dp[i-1][0] - prices[i]
        }
        const sell = (i)=>{
            return dp[i-1][1] + prices[i]
        }
        const rest = (i, has)=>{
            return dp[i-1][has]
        }
        for(let i = 0; i<n;i++){
            if(i-1 == -1){
                dp[i][0] = 0;
                dp[i][1] = -prices[i]
                continue
            }
            dp[i][0] = Math.max(sell(i), rest(i,0))
            dp[i][1] = Math.max(buy(i), rest(i,1))
        }
    return dp[n-1][0]
    }
    // 定义：dp[n][k][0 or 1] 为 第n天，剩余交易次数为k次，手上是否持有股票
    let dp = new Array(n).fill(0).map(()=>new Array(k+1).fill(0).map(()=>({0:0,1:0})))
    const buy = (i,k)=>{
        return dp[i-1][k-1][0] - prices[i]
    }
    const sell = (i,k)=>{
        return dp[i-1][k][1] + prices[i]
    }
    const rest = (i,k, has)=>{
        return dp[i-1][k][has]
    }
    for(let i = 0; i<n;i++){
        for(let j = k; j>=1; j--){
            if(i-1 == -1){
                dp[i][j][0] = 0;
                dp[i][j][1] = -prices[i]
                continue
            }
            dp[i][j][0] = Math.max(sell(i,j), rest(i,j,0))
            dp[i][j][1] = Math.max(buy(i,j), rest(i,j,1))
        }
    }
    return dp[n-1][k][0]
};
// @lc code=end

