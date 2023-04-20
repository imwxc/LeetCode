/*
 * @lc app=leetcode.cn id=154 lang=javascript
 *
 * [154] 寻找旋转排序数组中的最小值 II
 *  思路1： 暴力搞定
 *  思路2：二分查找法
 *  1. 首先确定最小值所在的区间
 *  2. 如果左右不相等，
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
function V1(nums){
    return nums.sort((a,b)=>(a-b))[0]
}
/**
 * @param {number[]} nums
 * @return {number}
 */
function V2(nums){
    let left = 0;
    let right = nums.length -1;
    // left == right 时说明最小值在left处
    while(left < right){
        const mid = left + Math.floor((right -left)/2);
        if(nums[mid] < nums[right]){
            //说明 [mid, right] 单调递增， 最小值在 [left, mid] 内
            right = mid
        }
        else if(nums[mid] > nums[right]){
            // 说明 [left, mid] 单调递增， 最小值在[mid+1, right] 内
            left = mid + 1
        }
        else if(nums[mid] == nums[right]){
            // 有重复元素时，无法确定 [mid, right] 的单调性， 需要 right-- 来排除重复元素
            right --
        }
    }
    return nums[left]
}
/**
 * @param {number[]} nums
 * @return {number}
 */
function V3(nums){
    return Array.from(new Set(nums)).sort((a,b)=>(a-b))[0]
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    return V2(nums)
};
// @lc code=end

