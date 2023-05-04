/*
 * @lc app=leetcode.cn id=583 lang=javascript
 *
 * [583] 两个字符串的删除操作
 * 思路： word1 和 word2相同时， 为其公共子序列，
 * 最大公共子序列的操作步数最小， 所以只需求出LCS即可
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
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
    let long = V2(word1, word2)
    return word1.length - long + word2.length - long
};
// @lc code=end

