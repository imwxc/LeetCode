/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 * 思路：
 * 状态：amount
 * 选择：coins中的所有面额
 * 函数定义：凑出amount的金额需要 helper(coins, amount)枚硬币
 * 状态转移方程：
 * helper(11) = 1 + min(helper(11-1), helper(11-2), hepler(11-5))
 */
var V1 = function(coins, amount) {
   let memo = {} // 使用memo存储已经计算过的值，简化递归
    function helper(coins, amount){
        let res = Number.MAX_SAFE_INTEGER
        if(!amount) return amount
        if(amount < 0) return -1
        for(let coin of coins){
            let subRes  = memo[amount - coin] ? memo[amount - coin] : helper(coins, amount - coin)
            if(!memo[amount - coin]) memo[amount - coin] = subRes
            if(subRes == -1) continue
            res = Math.min(res, subRes+1)
        }
        return res === Number.MAX_SAFE_INTEGER ? -1 : res
    }
    return helper(coins, amount)
};
var V2 = function(coins, amount) {
    // 初始化为 amount+1 因为这个值在问题中永远取不到
    let dp = new Array(amount + 1).fill(amount+1)
    // 初始状态
    dp[0] = 0;
    // 遍历所有的amount的取值
    for(let i =0; i< dp.length; i++){
        // 对所有可能的 amount - coin的取值找最小
        for(let coin of coins){
            // 当i-coin小于0时说明没有这个组合， 跳过
            if(i - coin < 0) continue
            // 成功了说明存在该组合，然后开始取最小值
            dp[i] = Math.min(dp[i], dp[i-coin]+1)
        }
    }
    // 最后判断下是否算出来了，没有的话返回-1
    return dp[amount] == amount+1 ? -1 : dp[amount]
 };
 
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    // return V1(coins, amount)
    return V2(coins, amount)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = coinChange;
// @after-stub-for-debug-end