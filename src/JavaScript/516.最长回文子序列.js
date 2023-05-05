/*
 * @lc app=leetcode.cn id=516 lang=javascript
 *
 * [516] 最长回文子序列
 */

// @lc code=start
/**
 * 没看懂，下次再看
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
    // dp定义：dp[i][j]表示子串s[i~j]的最长回文序列
    let dp = new Array(s.length).fill(0).map(()=>(new Array(s.length).fill(0)))
    // base case 当i，j相等时，只有一个字符 所以是1， 需要i > j
    for(let i = 0;i<s.length;i++){
        dp[i][i] = 1
    }

    for(let i=s.length;i>=0;i--){
        for(let j =i+1;j<s.length;j++){
            // 状态转移
            if(s[i] == s[j]){
                dp[i][j] = dp[i+1][j-1] +2
            }else{
                dp[i][j] = Math.max(dp[i][j-1], dp[i+1][j])
            }
        }
    }
    return dp[0][s.length-1]
};
// @lc code=end

