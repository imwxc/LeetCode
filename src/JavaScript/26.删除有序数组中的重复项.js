/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * 快慢指针思路：
 * 快指针在前，慢指针在后，遇到一个不重复的元素就将fast赋给slow，并让lslow前进
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let slow = 0;
    let fast = 0;
    while(fast < nums.length){
        if(nums[fast] != nums[slow]){
            slow++
            // slow后面有重复元素，所以先移动一下再赋值
            nums[slow] = nums[fast]
        }
        fast++
    }
    return slow+1
};
// @lc code=end

