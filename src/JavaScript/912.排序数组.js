/*
 * @lc app=leetcode.cn id=912 lang=javascript
 *
 * [912] 排序数组
 * 思路：
 * V1: 快排实现
 * V2：归并排序实现
 */

// @lc code=start

var V1 = function(nums){
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
    if(nums.length == 1) return nums
    const random = randomList(nums)
    quickSort( random, 0, nums.length -1)
    return nums
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var V2 = function(nums){
    const temp = new Array(nums.length)
    /**
     * @param {number[]} nums
     * @param {number} left
     * @param {number} right
     * @return {number[]}
     */
    function sort(nums, left, right){
        if(left == right) return 
        let mid = left + Math.floor((right - left)/2)
        sort(nums,left, mid)
        sort(nums, mid+1, right)
        merge(nums, left, mid, right)
    }
    function merge(nums, left, mid, right){
        for(let i=left; i<=right; i++){
            temp[i] = nums[i]
        }
        let pl = left;
        let pr = mid+1;
        for(let p=left; p<=right; p++){
            if(pl == mid+1){
                // 左边完全合并了, 将右边的全部放进去
                nums[p] = temp[pr]
                pr++
            }else if(pr == right +1){
                // 右边完全合并了， 将左边的全部放进去
                nums[p] = temp[pl]
                pl++
            }else if( temp[pr] < temp[pl] ){
                // 右边比左边小时， 右边放前面, 然后右侧移动
                nums[p] = temp[pr]
                pr++
            }else if(temp[pr] >= temp[pl]){
                // 左边比右边小时， 左边放前面，然后左侧移动
                nums[p] = temp[pl]
                pl++
            }
        }
    }
    sort(nums, 0, nums.length-1)
    return nums
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    // return nums.sort((a,b)=>(a-b))
    // return V1(nums)
    return V2(nums)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = sortArray;
// @after-stub-for-debug-end