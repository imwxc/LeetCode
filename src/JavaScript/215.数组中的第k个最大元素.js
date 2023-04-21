/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 *  思路：
 *  利用快排的方法， 找到一个 p， 
 *  使得p左边的元素数量为 k, 
 *  右边的元素数量为 nums.length -k
 */

// @lc code=start

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var V1 = function(nums, k) {
    if(nums.length == 1) return nums[0]
    // if(k == nums.length) return Math.min(nums[0], nums[1])
    const swap = (nums, low, high)=>{
        const temp = nums[high]
        nums[high] = nums[low]
        nums[low] = temp
    }
    const part = (nums, low, high)=>{
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
            // if(left < right){
            swap(nums, left ,right )
            // }
        }
        // 最后right指向 p 的位置，将p和该元素交换
        // console.info('before: ', nums, `low: ${low}, right: ${right}`)
        swap(nums,low,right);
        // console.info('after: ', nums, `low: ${low}, right: ${right}`)
        return right
    }
    let low = 0;
    let high = nums.length - 1
    let kIdx = nums.length - k
    // 当
    while(low<=high){
        let p = part(nums, low , high)
        // p 对应的元素 左右已经排好顺序了， 所以 nums[p] 是 第 nums.length -p 大的元素
        if( kIdx > p ){
            // 此时 第k大的元素在 [p+1, high]
            low = p+1
        }
        else if(kIdx < p){
            // 此时第k大的元素在[low, p-1]
            high = p-1
        }
        else if(kIdx == p){
            const res = nums[p]
            // console.info('res: ',res, '\np:', p, '\nnums:', nums)
            return res
        }
    }
    return undefined
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    return V1(nums.sort(()=>(Math.random()-0.5)),k)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = findKthLargest;
// @after-stub-for-debug-end