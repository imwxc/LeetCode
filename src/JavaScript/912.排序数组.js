/*
 * @lc app=leetcode.cn id=912 lang=javascript
 *
 * [912] 排序数组
 * 思路：
 * V1: 快排实现
 */

// @lc code=start

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    const res = nums.slice(0,nums.length)
    function swap(idx1, idx2, nums){
        const temp = nums[idx1];
        nums[idx1] = nums[idx2]
        nums[idx2] = temp
    }
    
    function randomList(nums){
        nums = nums.sort(()=>(Math.random() > 0.5 ? 1: -1))
        return nums
    }
    
    function part(nums, low, high){
        let p = nums[low] // 选取p作为待排序的元素
        // 需要寻找 left, right 使得[low,left) <= p, (right,high] > p
        let left = low +1
        let right = high
        while(left <= right ){
            // left < high 说明 left 没有遍历结束
            // num[left] < p 说明 i的数字在 p左侧 移动i
            while(left < high && nums[left] <= p){
                left++
            }
            // 退出上述循环后，left指向的数字比p大， 需要在p的右侧找一个比p小的元素
            while(right > low && nums[right] > p){
                right--
            }
            if(left >= right) break
            // 退出后 需要交换left ， right指向的数字，
            // 其他情况时，交换left， right 重新循环
            swap( left ,right, nums)
        }
        // 最后right指向 p 的位置，将p和该元素交换
        swap(low, right, nums);
        return right
    }
    
    function quickSort(nums, low, high){
        if(low>=high) return;
        let p = part(nums, low, high)
        quickSort(nums, low, p-1) // 因为p以及在正确位置了， 所以不用排
        quickSort(nums, p+1, high) // 因为p以及在正确位置了， 所以不用排
    }
    
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    function V1(nums){
        if(nums.length == 1) return nums
        const random = randomList(nums)
        quickSort( random, 0, nums.length -1)
        return nums
    }
    return V1(res)
    // return nums.sort((a,b)=>(a-b))
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = sortArray;
// @after-stub-for-debug-end