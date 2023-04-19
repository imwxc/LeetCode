/*
 * @lc app=leetcode.cn id=524 lang=javascript
 *
 * [524] 通过删除字母匹配到字典里最长单词
 * 
 *  思路：
 *  1. 要求 返回长度最长 且 字母序最小的字符串，就要先排序一下：
 *  2. 可以通过删除s中某些字符得到的字符串，是s的子序列， 可以使用贪心算法来匹配
 */

// @lc code=start

function V1(s='', dictionary=[]){
    let res = []
    const sorted = dictionary.sort((a='',b='')=>{
        const res = 
        (b.length - a.length) ||
        (a.localeCompare(b))
        return res
    })
    sorted.forEach(str=>{
        let sPoint = 0;
        let strPoint = 0;
        // 匹配s 是否为str的子序列
        while(sPoint < s.length && strPoint < str.length){
            if(s[sPoint] == str[strPoint]){
                ++strPoint
            }
            ++sPoint
        }
        // 此时匹配完成， str是s的子序列
        if(strPoint == str.length){
            res.push(str)
        }
    })
    return res[0] || ""
}

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {string}
 */
var findLongestWord = function(s, dictionary) {
    return V1(s, dictionary)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = findLongestWord;
// @after-stub-for-debug-end