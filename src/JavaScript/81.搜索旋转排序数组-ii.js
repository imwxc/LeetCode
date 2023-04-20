/*
 * @lc app=leetcode.cn id=81 lang=javascript
 *
 * [81] 搜索旋转排序数组 II
 *
 * 思路：
 *  由于 原数组是递增的，可以直接利用原数组进行二分查找
 *  首先双指针查找原数组中的最大值的下标， 通过最大值的下标得到原数组
 *  然后使用二分查找即可
 *  对于mid 若其值小于等于右端， 说明 右区间是排好序的， 
 *  反之则说明左区间是排好序的。
 *  若target在排好序的区间内， 则对该区间二分查找， 否则对另外一个区间二分查找
 *  
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
function V1(nums, target) {
    return nums.lastIndexOf(target) > -1;
}
function V2(nums, target) {
    const n = nums.length;
    if (n === 0) {
        return false;
    }
    if (n === 1) {
        return nums[0] === target;
    }
    let l = 0,
        r = n - 1;
    while (l <= r) {
        const mid = l + Math.floor((r-l)/2)
        if (nums[mid] === target) { 
            return true;
        }
        // 如果 左 中 右 相等， 此时无法确定递增区间， 则左右各移动一次
        if (nums[l] === nums[mid] && nums[mid] === nums[r]) { 
            ++l;
            --r;
        }
        // 左 小于等于中时， 说明左区间递增， 在左区间内二分查找
        else if (nums[l] <= nums[mid]) {
            // 如果左小于等于目标 && 右大于目标 说明目标在区间内
            // 此时移动右侧收缩区间
            if (nums[l] <= target && target < nums[mid]) {
                r = mid - 1;
            }
            // 否则说明 目标不在区间内， 将移动左侧更新搜索区间
            else {
                l = mid + 1;
            }
        }
        // 否则说明 右侧区间递增， 开始二分查找
        else {
            // 如果 中间 小于 target && target 小于等于 右
            // 说明右区间有目标值
            if (nums[mid] < target && target <= nums[r]) {
                l = mid + 1;
            }
            // 否则 收缩右区间， 在左侧查找 
            else {
                r = mid - 1;
            }
        }
    }
    return false;
}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
    // return V1(nums, target)
    return V2(nums, target);
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = search;
// @after-stub-for-debug-end
