/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文串 II
 *  思路：
 *  递归调用：
 *  当相等时， 去掉两个相等的字符，子字符递归判断
 *  当不相等时， count++，分别尝试去除左边子字符串和右边子字符串进行递归判断
 *      传入count值来终止递归
 *  双指针：
 *  因为只能去掉一个字符，所以无需递归调用
 * 辅助函数：循环判断当前字符串是否为回文
 *  第一次判断结束后
 *      如果有不一样的，就调用辅助函数去掉左边或者右边的字符试一下，将结果返回
 *   结束循环条件：left> right
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
function V1(s){
    function isRevStr(s='', num){
        let left =0;
        let right = s.length-1;
        let count = num;
        if(count >1 || !s.length || s.length == 1) 
            return count
        if(s[left] == s[right]){
            ++left
            --right
            let se = s.slice(left, right+1)
            count+= isRevStr(se, 0)
        }else{
            count ++
            if(count > 1) return count
            let sl = s.slice(left, right) // 删除了 右边的字符
            let sr = s.slice(left+1 , right + 1) // 删除了 左边的字符
            const slRes = isRevStr(sl, count)
            const srRes = isRevStr(sr, count)
            count = Math.min(slRes, srRes)
            return count
        }
        return count 
    }
    const res = isRevStr(s,0);
    return res <= 1
}

function V2(s){
    let left = 0;
    let right = s.length-1
    function isRevStr(s){
        let i=0;
        let j =s.length-1;
        if(s.length == 1) return true
        for(;i<j;i++,j--){
            if(s[i] != s[j]){
                return false
            }
        }
        return true
    }
    while(left < right){
        if(s[left] == s[right]){
            --right
            ++left
        }else{
            const srRes = isRevStr(s.slice(left, right))
            const slRes = isRevStr(s.slice(left+1 , right + 1))
            return srRes || slRes
        }
    }
    return true
}
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    // return V1(s)
    return V2(s)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = validPalindrome;
// @after-stub-for-debug-end