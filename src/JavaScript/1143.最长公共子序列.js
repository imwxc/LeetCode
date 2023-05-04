/*
 * @lc app=leetcode.cn id=1143 lang=javascript
 *
 * [1143] 最长公共子序列
 */

// @lc code=start
/** 动态规划递归方式 + 备忘录
 * 最后一个case需要特殊判断下
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var V1 = function(s1, s2) {
    let memo = {}
    let s1Set = new Set(s1.split(''))
    let s2Set = new Set(s2.split(''))
    if(s1Set.size == s2Set.size){
        let res = []
        s1Set.forEach(i=>{
            if(s2Set.has(i)){
                res.push(1)
            }else{
                res.push(0)
            }
        })
        if(!res.reduce((a,b)=>a+b,0)) return 0
    }
    // 定义： 返回 s1[i...] 和 s2[j...]的最长子序列
    // 状态转移： dp(i,j) = Math.max(dp(i+1,j), dp(i,j+1)) + s1[i] == s2[j] ? 1 : 0
    function dp(i,j){
        if(i === s1.length || j == s2.length) return 0;
        if(memo[`${i}${j}`]) return memo[`${i}${j}`]
        // 状态转移:
        if(s1[i] == s2[j]){
            memo[`${i}${j}`] = 1+dp(i+1,j+1)
        }else{
            memo[`${i}${j}`] = Math.max(
                dp(i+1,j), // s1[i]不在子序列中， s1[i+1]在
                dp(i,j+1), // s2[j]不在子序列中， s2[j+1]在
                // dp(i+1,j+1) // s1[i] 和 s2[j] 都不在子序列中， s1[i+1], s2[j+1]在
            )
        }
        return memo[`${i}${j}`]
    }
    return dp(0,0)
};
/** 动态规划迭代
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var V2 = function(s1, s2) {
    let m = s1.length
    let n = s2.length
    // 定义 dp[i][j] 表示 s1[i] 与 s2[j] 的LCS长度
    let dp = new Array(m+1).fill(0).map(()=>new Array(n+1).fill(0))
    for(let i = 1;i<=m;i++){
        for(let j = 1; j<=n;j++){
            if(s1[i-1] == s2[j-1]){
                dp[i][j] = 1 + dp[i-1][j-1]
            }else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
            }
        }
    }
    return dp[m][n]
};
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    // return V1(text1, text2)
    return V2(text1,text2)
};
// @lc code=end

