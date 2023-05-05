/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let left = 0, right = s.length-1;
    function swap(a,b){
        let temp = s[a]
        s[a]=s[b]
        s[b] = temp
    }
    while(left < right){
        swap(left,right)
        left++
        right--
    }
    return s
};
// @lc code=end

