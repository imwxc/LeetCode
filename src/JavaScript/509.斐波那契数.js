/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
// 利用memo优化的递归解法
var V1 = function(n){
    let memo = {}
    function fn(memo, n){
        if(n == 0 || n==1 ){
            memo[n] = n
            return memo[n]
        }
        if(memo[n] || memo[n] == 0) return memo[n]
        memo[n] = fn(memo, n-1) + fn(memo, n-2)
        return memo[n]
    }
    let res = fn(memo, n)
    return res
}

// 利用dp数组解法
var V2 = function(n){
    let dp = new Array(n+1).fill(0)
    dp[0] = 0; dp[1] = 1;
    for(let i =2; i<=n; i++){
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
}
// 优化空间的dp数组解法
var V3 = function(n){
    if(n == 0 || n== 1) return n
    let prev =0;// n-2
    let curr =1;// n-1
    for(let i =2; i<=n; i++){
        let sum = prev + curr
        prev = curr;
        curr = sum
    }  
    return curr
}
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    // return V1(n)
    // return V2(n)
    return V3(n)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = fib;
// @after-stub-for-debug-end