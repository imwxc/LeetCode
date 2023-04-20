/*
 * @lc app=leetcode.cn id=153 lang=javascript
 *
 * [153] 寻找旋转排序数组中的最小值
 * 二分思路：
 * 当 中 小于 右时， 
 *      说明[mid-right]单调递增，min一定在左侧区间[left, mid]内 
*       此时收缩右侧向左找
 * 当 中 大于等于 右时，
 *      说明[left, mid]单调递增 且 min一定在右侧区间[mid, right]内 
 *      此时收缩左侧向右找
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var V1 = function(nums) {
    if(nums.length == 1) return nums[0]
    let left = 0;
    let right = nums.length -1;
    // 区间为 [left, right]
    let mid;
    // 当 left和right相等时，
    // 说明此时的 [left, right]只有一个元素，且为最小值
    while( left<right){
        // mid 是靠左
        mid = left + Math.floor((right - left)/2)
        // 收缩右侧向左找时，mid 不一定 就比
        if(nums[mid] < nums[right]){
            // 此时收缩右侧
            right = mid
        }
        // 
        else{
            // nums[mid] >= nums[right]
            // [left, mid] 单调递增， mid一定不是最小值，
            // 所以 left = mid + 1
            left = mid + 1
        }
    }
    return nums[left]
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    return V1(nums)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = findMin;
// @after-stub-for-debug-end