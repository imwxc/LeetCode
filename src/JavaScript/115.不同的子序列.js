/*
 * @lc app=leetcode.cn id=115 lang=javascript
 *
 * [115] 不同的子序列
 * 子序列： 保证顺序的前提下可以不连续
 */

// @lc code=start
/**
 * 用s的每个字符来匹配t的字符，匹配到后开始匹配子序列
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var V1 = function (s, t) {
    let sl = s.length,
        tl = t.length;
    let memo = {};
    // 定义dp(i,j) 为 s[i...] 的子序列中 t[j...] 的出现次数
    function dp(i, j) {
        if (j == tl) return 1; // t全部被匹配完了， 返回1
        if (i < 0 || j < 0) return 0;
        if (sl - i < tl - j) return 0; // s[i...] 不能匹配 t[j...] 返回0
        if (memo[`${i}-${j}`]) return memo[`${i}-${j}`];
        let res = 0;
        //在t的视角， 当t[j] 匹配到s[i1] 和 s[i2]的时候，
        //相当于需要列出所有在 s(i1...] 和 s(i2...] 匹配 t[j+1]
        //dp(i,j) =  dp(i1+1, j+1) + dp(i2+1, j+1)
        for (let k = i; k < sl; k++) {
            if (t[j] == s[k]) {
                res += dp(k + 1, j + 1);
            }
        }
        memo[`${i}-${j}`] = res;
        return memo[`${i}-${j}`];
    }
    return dp(0, 0);
};
/**
 * 用t的每个字符来匹配s的字符，匹配到后开始匹配子序列, 比较奇怪， 
 * 从后向前递归可以ac，应该是从前向后的memo没有充分利用
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var V2 = function (s, t) {
    let sl = s.length,
        tl = t.length;
    let memo = new Array(sl).fill(0).map(() => new Array(tl).fill(-1));
    // console.log(memo)
    // 定义dp(i,j) 为 s[i...] 的子序列中 t[j...] 的出现次数
    function dp(i, j) {
        // console.log(`${i}-${j}`)
        if (j < 0) {
            return 1;
        }
        if (i < 0) {
            return 0;
        }
        if (memo[i][j] !== -1) return memo[i][j];
        let res = 0;
        // 在s的视角上， 当s[0]和t[0] 不匹配时， 直接进行s[1]和t[0]的匹配
        // 当s[0]和t[0]匹配时， 需要进行两种case的相加：
        // s[1]匹配t[1] 正常向后遍历
        // s[1]匹配t[0] 为了保证后一位可以匹配的上
        if (s[i] == t[j]) {
            res += dp(i - 1, j - 1) + dp(i - 1, j);
        } else {
            res += dp(i - 1, j);
        }
        memo[i][j] = res;
        return memo[i][j];
    }
    return dp(sl - 1, tl - 1);
};
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
    // return V1(s,t)
    return V2(s, t);
};
// @lc code=end
