/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var fidx = -1
    var secIdx = -1
    var res = []
    nums.forEach((i,idx)=>{
        if(fidx !== -1 && secIdx !== -1){
            res = [fidx, secIdx]
            return
        }
        fidx = idx
        secIdx = nums.findIndex((j,jdx)=>(j===(target - i) && idx !== jdx))
    })
    return res
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = twoSum;
// @after-stub-for-debug-end