/*
 * @lc app=leetcode.cn id=493 lang=javascript
 *
 * [493] 翻转对
 * 
 * 思路：利用归并， 在获取到左右有序子数组后， 遍历左子数组， 在对应的右子数组中查找是否存在符合条件的元素
 * 
 * 优化： 因为 left < i < mid ， 当左数组以及排好序时， 
 * 如果有 nums[i] 满足条件，则 nums[i+1] 都满足条件
 * 所以， 在 [mid+1, right]  中， 会存在一个 end，
 * 使得 [mid+1, end)内的元素都满足条件
 * 
 * 
 */

// @lc code=start

/**
 * @param {number[]} nums
 * @return {number}
 */
var V1 = function(nums) {
    const temp = new Array(nums.length)
    let count = 0; // 记录翻转对的个数
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

        // 在这里寻找符合条件的元素
        let end = mid+1
        for(let i = left; i<=mid; i++){
            while(end <= right && nums[i] > 2*nums[end]){
                end++
            }
            count += end - (mid+1)
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
    return count
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    return V1(nums)
};
// @lc code=end

