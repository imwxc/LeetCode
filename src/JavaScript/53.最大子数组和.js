/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * 动态规划递归解法
 * @param {number[]} nums
 * @return {number}
 */
var V1 = function(nums) {
    if(!nums.length) return 0;
    let temp = []
    let result = Number.MIN_SAFE_INTEGER
    // 返回以nums[i] 结尾的最大子数组的和
    function dp(i){
        if(i == -1)
        return 0;
        let res = Number.MIN_SAFE_INTEGER;
        let subRes = nums[i] + dp(i-1)
        res = Math.max(res, nums[i], subRes)
        temp.push(res)
        return res
    }
    dp(nums.length -1)
    for(let r of temp){
        result = Math.max(result, r)
    }
    return result
};
/**
 * 动态规划迭代解法
 * @param {number[]} nums
 * @return {number}
 */
var V2 = function(nums) {
    if(!nums.length) return 0;
    let dp = new Array(nums.length);
    dp[0] = nums[0]
    let result = Number.MIN_SAFE_INTEGER
    // 返回以nums[i] 结尾的最大子数组的和
    for(let i = 1; i<nums.length; i++){
        // 对于每个元素， 其最大子数组和 要么是他之前子数组加当前元素， 要么是当前元素
        dp[i] = Math.max(nums[i], nums[i] + dp[i-1])
    }
    // 求出每个元素的最大子数组和之后， 再遍历dp即可得到整个的最大值
    for(let r of dp){
        result = Math.max(result, r)
    }
    return result
};
/**
 * 滑动窗口解法
 * @param {number[]} nums
 * @return {number}
 */
var V3 = function(nums) {
    let left = 0, right = 0;
    let maxSum = Number.MIN_SAFE_INTEGER;
    let windowSum =0;
    while(right < nums.length){
        windowSum +=nums[right]
        right++
        maxSum = Math.max(windowSum, maxSum)
        // 当窗口和小于0时，
        // 若nums中均为负数， 则会遍历整个数组，此时满足条件
        // 若nums中有正有负， 
        // 则在 windowSum>=0时会增大窗口，试图让子数组和更大
        // 在 windowSum < 0 时， 会收缩窗口， 排除掉窗口内为负数的开头
        while(windowSum<0){
            windowSum -= nums[left]
            left++   
        }
    }
    return maxSum
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // return V1(nums)
    // return V2(nums)
    return V3(nums)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = maxSubArray;
// @after-stub-for-debug-end