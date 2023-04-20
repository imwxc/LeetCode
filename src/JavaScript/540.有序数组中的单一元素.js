/*
 * @lc app=leetcode.cn id=540 lang=javascript
 *
 * [540] 有序数组中的单一元素
 * 思路：
 *  1. 数组长度为奇数 
 *     mid 一定为整数
 *     在单独元素出现前， 成对元素的第一个下标为偶数， 第二个下标为奇数
 *      单独元素出现后， 上面的结论反转
 *  2. mid 为奇数时，判断 nums[mid] == nums[mid-1] 若成立， 则说明单独元素在 mid 右侧, 否则单独元素在mid左侧
 *     mid 为偶数时，判断 nums[mid] == nums[mid+1] 若成立， 则说明单独元素在mid 右侧， 否则单独元素在mid左侧
 *  
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
function V1(nums){
    let left = 0;
    let right = nums.length-1;
    while(left <= right){
        let mid = left + Math.floor((right - left)/2)
        if(nums[mid] !=nums[mid+1] && nums[mid]!=nums[mid-1]){
            return nums[mid]
        }
        if(mid%2){
            // 此时mid为奇数
            if(nums[mid] == nums[mid-1]){
                // 说明单独元素在mid右侧
                // 收缩左边界
                left = mid+1
            }else{
                // 说明 单独元素在mid左侧
                // 收缩右边界
                right = mid-1
            }
        }else{
            // 此时mid为偶数
            if(nums[mid] == nums[mid+1]){
                // 说明单独元素在mid右侧
                // 收缩左边界
                left = mid+1
            }else{
                // 说明 单独元素在mid左侧
                // 收缩右边界
                right = mid-1
            }
        }
    }
    return 0
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
    return V1(nums)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = singleNonDuplicate;
// @after-stub-for-debug-end