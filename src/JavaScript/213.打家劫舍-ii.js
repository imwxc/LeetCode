/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var V1 = function(nums){
    let n = nums.length
    function rob(){
        if(n == 1) return nums[0]
        return Math.max(robRange(nums, 0,n-2), robRange(nums, 1,n-1))
    }
    function robRange(nums, start, end){
        let dp_i_1 = 0, dp_i_2 = 0;
        let dp_i = 0;
        for (let i = end; i >= start; i--) {
            dp_i = Math.max(dp_i_1, nums[i] + dp_i_2);
            dp_i_2 = dp_i_1;
            dp_i_1 = dp_i;
        }
    return dp_i;

    }
    return rob()
}
/**
 * 思路:
 * 1.首尾房间不能被抢
 * 2.第1间抢了最后一键不抢
 * 3.最后1间抢了,第1间不抢
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    return V1(nums)
};
// @lc code=end

