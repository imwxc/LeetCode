/*
 * @lc app=leetcode.cn id=139 lang=javascript
 *
 * [139] 单词拆分
 */

// @lc code=start

/**
 * 动态规划解法
 * 对于一个s， 只要能在wordDict匹配到s[0 ~ k] == wordDict[j]，
 * 那么就可以尝试 在 s[k ~ slennth]中去继续匹配
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var V1 = function(s, wordDict) {
    let memo = new Array(s.length).fill(-1)
    // 定义 dp(i) 为在s[i ~ sLength]能否被拼出
    function dp(i){
        // baseCase
        if(i == s.length) return true
        if(memo[i] !== -1) return memo[i]
        // 状态转移
        // 匹配str的每个前缀， len表示前缀的长度
        for(let len = 1; i+len<=s.length; len++){
            let subStr = s.substring(i, i+len)
            // 如果前缀在 wordDict 则 开始判断子问题是否可以被解决， 可以的话return true
            if(wordDict.includes(subStr)){
                let subRes = dp(i+len)
                if(subRes){
                    memo[i] = subRes
                    return true
                }
            }
        }
        // 所有前缀都无法被匹配，return false
        memo[i] = false
        return false
    }
    return dp(0)
};

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    return V1(s, wordDict)
};
// @lc code=end

