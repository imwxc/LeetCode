/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var V1 = function(nums, k) {
    if(k == 1 && nums.length == 1) return nums
    let map = new Map()
    let res = []
    for(let i = 0; i<nums.length; i++){
        if(map.has(nums[i])){
            map.set(nums[i], map.get(nums[i])+1)
        }else{
            map.set(nums[i], 1)
        }
    }
    // console.info(map.values())
    let bucket = Array.from(map)
    const swap = (nums, low, high)=>{
        const temp = nums[high]
        nums[high] = nums[low]
        nums[low] = temp
    }
    const part = (nums, low, high)=>{
        let p = nums[low][1] // 选取p作为待排序的元素
        // 需要寻找 left, right 使得[low,left) <= p, (right,high] > p
        let left = low +1
        let right = high
        while(left <= right ){
            // left < high 说明 left 没有遍历结束
            // num[left] < p 说明 i的数字在 p左侧 移动i
            while(left < high && nums[left][1] <= p){
                left++
            }
            // 退出上述循环后，left指向的数字比p大， 需要在p的右侧找一个比p小的元素
            while(right > low && nums[right][1] > p){
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
    for(let xx = 1; xx<=k;xx++){
        // 对频次进行快速查找
        let low = 0;
        let high = bucket.length - 1
        let kIdx = bucket.length - 1 // 对于每次循环， 因为上一次将 上轮的循环结果去除了，所以不用改变k
        console.info(`low: ${low}, high: ${high}, kIdx:${kIdx}`)
        while( low <=high){
            let p = part(bucket, low, high)
            if(kIdx > p){
                low = p+1
            }
            else if(kIdx < p){
                high = p-1
            }
            else if(kIdx == p){
                const tres = bucket[p][0]
                res.push(tres)
                bucket.splice(p,1) // 将本次得到的结果在下次搜索区间内去除
                break
            }
        }
    }
    // console.info(res)
    return res
};



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    return V1(nums, k)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = topKFrequent;
// @after-stub-for-debug-end