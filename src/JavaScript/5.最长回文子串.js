/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * 思路：
 *
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    let sL = s.length;
    function palindrome(l, r) {
        while (l >= 0 && r < sL && s[r] == s[l]) {
            r++;
            l--;
        }
        return s.substring(l + 1, r);
    }
    let res = "";
    for (let i = 0; i < sL; i++) {
        let s1 = palindrome(i, i);
        let s2 = palindrome(i, i + 1);
        res = res.length >= s1.length ? res : s1;
        res = res.length >= s2.length ? res : s2;
    }
    return res;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = longestPalindrome;
// @after-stub-for-debug-end