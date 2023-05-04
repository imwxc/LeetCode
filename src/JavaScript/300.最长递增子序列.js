/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 * 思路：
 * 子序列：有序即可，不要求连续
 * dp定义： dp[i] 为 nums[i]的元素结尾的子序列长度
 * dp[i] 初始为 1
 *
 * 最终结果为 dp数组中的最大值
 *
 * 数学归纳出状态转移方程：
 * 对于每个dp[0 ~ i-1], 想要知道dp[i]的值，
 * 需要找到小于nums[i]的元素中对应最大的dp即可
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var V1 = function (nums) {
    // dp[i] 为 nums[i]的元素结尾的子序列长度，
    // 对于每个nums[i] 可以认为最大的子序列都是他们自身
    let dp = new Array(nums.length).fill(1);
    let res = 0;
    // 外层遍历nums， 寻找所有的元素
    for (let i = 0; i < nums.length; i++) {
        // 只需找到nums[i] 之前小于 nums[i] 的元素，进行dp的对比即可
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    for (let i = 0; i < dp.length; i++) {
        res = Math.max(res, dp[i]);
    }
    return res;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var V2 = function (nums) {
    // 用来记录每张牌在那个牌推的顶部
    let top = new Array(nums.length).fill(0)
    var piles =0;
    for(let i=0; i<nums.length; i++){
        let poker = nums[i]
        // 在已有的牌推中进行二分查找
        let left = 0; let right = piles;
        while (left < right) {
            var mid = Math.floor((left + right) / 2);
            if (top[mid] > poker) { // 中间大于 poker时， 说明poker需要放到左侧区间
                right = mid;
            } else if (top[mid] < poker) { // 中间小于poker， poker需要放到右侧区间
                left = mid + 1;
            } else { // 和poker相等时，还是向左侧放
                right = mid;
            }
        }
        // 没有合适的牌堆就新建一个
        if (left == piles) piles++;
        // left指向了poker需要放的牌堆，更新此时牌堆顶部的牌
        top[left] = poker;
    }
    return piles
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    // return V1(nums)
    return V2(nums)
};
// @lc code=end
