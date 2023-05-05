/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let left =0, right = numbers.length-1;
    let res = []
    while(left < right){
        let sum = numbers[left] + numbers[right]
        if(sum == target){
            res.push(left+1)
            res.push(right+1)
            return res
        }else if(sum < target){
            left++
        }else{
            right--
        }
    }
    return res
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = twoSum;
// @after-stub-for-debug-end