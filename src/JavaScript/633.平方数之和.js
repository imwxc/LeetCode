/*
 * @lc app=leetcode.cn id=633 lang=javascript
 *
 * [633] 平方数之和
 * 思路：
 *  1. 计算出c的开方
 *  2. c的开方的 ceil 值作为 列表最大的数
 *  3.双指针遍历列表，当指针相遇时还没有结果，则不存在
 */ 

// @lc code=start
function pow2(n){
    return Math.pow(n,2)
}
function V1(c){
    const numList = new Array(Math.ceil(Math.sqrt(c))+1).fill().map((i,idx)=>(idx))
    let left = 0;
    let right = numList.length-1;
    let hasRes = false;
    while(left <= right){
        let leftNum = numList[left]
        let rightNum = numList[right]
        if(pow2(leftNum) + pow2(rightNum) == c){
            hasRes = true
            break
        }
        if( pow2(leftNum) + pow2(right) > c){
            right--
        }else{
            left++
        }
    }
    return hasRes
}
/**
 * @param {number}
 * @return {boolean}
 */
// eslint-disable-next-line no-unused-vars
var judgeSquareSum = function(c) {
    return V1(c)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = judgeSquareSum;
// @after-stub-for-debug-end