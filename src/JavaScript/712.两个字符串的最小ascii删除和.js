/*
 * @lc app=leetcode.cn id=712 lang=javascript
 *
 * [712] 两个字符串的最小ASCII删除和
 */

// @lc code=start
/**
 * 动态规划递归方式
 * 思路：先找到LCS， 如果存在多个LCS， 则找到其ASCII和最大的那个LCS，
 * 删除和 = s1 ASCII和 + s2 ASCII和 - 2*lcs和
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var V1 = function (s1, s2) {
    const memo = {};
    // 定义: dp(i,j) 表示将s1[i...] s2[j...]删除成相同字符串时需要的最小的ACSII码
    function dp(i, j) {
        let res = 0;
        let m = s1.length,
            n = s2.length;
        if (memo[`i${i}j${j}`])
            return memo[`i${i}j${j}`];
        if (i == m) {
            // s1 到头了， s2的剩余所有字符都要删掉
            for (let k = j; k < n; k++) {
                res += s2.charCodeAt(k);
            }
            memo[`i${i}j${j}`] = res
            return res;
        }
        if (j == n) {
            // s2 到头了， s1剩余的所有字符都要删掉
            for (let k = i; k < m; k++) {
                res += s1.charCodeAt(k);
            }
            memo[`i${i}j${j}`] = res
            return res;
        }
        
        //如果s1[i] 和 s2[j]相等， 则不用删除， res = dp(i+1,j+1)
        if (s1.charAt(i) == s2.charAt(j)) {
            memo[`i${i}j${j}`] = dp(i + 1, j + 1);
        } else {
            memo[`i${i}j${j}`] = Math.min(
                (s1.charCodeAt(i) + dp(i + 1, j)),
                (s2.charCodeAt(j) + dp(i, j + 1))
            );
        }
        return memo[`i${i}j${j}`];
    }
    return dp(0, 0);
};
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
    return V1(s1, s2);
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = minimumDeleteSum;
// @after-stub-for-debug-end