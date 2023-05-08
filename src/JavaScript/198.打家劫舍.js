/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * 动态规划递归方式
 * 思路:
 * 定义 dp[i] 为在当前i间房获取的金额
 * 状态: 第i建房子的收获
 * 选择: 抢第i间房子: nums[i] + dp(i+2)
 *      不抢第i间房子: dp(i+1)
 * @param {number[]} nums
 * @return {number}
 */
var V1 = function (nums) {
    if (!nums.reduce((a, b) => a + b, 0)) return 0;
    let memo = {};
    function dp(nums, start) {
        if (memo[start]) return memo[start];
        if (start < 0) {
            memo[start] = 0;
            return memo[start];
        }
        memo[start] = Math.max(
            dp(nums, start - 1),
            nums[start] + dp(nums, start - 2)
        );
        return memo[start];
    }
    let result = dp(nums, nums.length - 1);
    return result;
};
/**
 * 动态规划迭代方式
 * 思路:
 * 定义 dp[i] 为在当前i间房获取的金额
 * 状态: 第i建房子的收获
 * 选择: 抢第i间房子: nums[i] + dp(i+2)
 *      不抢第i间房子: dp(i+1)
 * @param {number[]} nums
 * @return {number}
 */
var V2 = function (nums) {
    let n = nums.length;
    // let dp = new Array(n+2).fill(0)
    let dp_i_1 = 0;
    let dp_i_2 = 0;
    let dp_i = 0;
    for (let i = n - 1; i >= 0; i--) {
        dp_i = Math.max(dp_i_1, nums[i] + dp_i_2);
        dp_i_2 = dp_i_1;
        dp_i_1 = dp_i;
    }
    return dp_i;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    // return V1(nums)
    return V2(nums);
};
// @lc code=end
