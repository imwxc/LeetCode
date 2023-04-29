/*
 * @lc app=leetcode.cn id=315 lang=javascript
 *
 * [315] 计算右侧小于当前元素的个数
 * 思路：由于有重复的元素， 需要考虑重复的情况
 *  在归并merge时， 
 *  对于元素i， 若temp[i] < temp[j], 
 *  则小于temp[i]的元素个数为 p+1(nums当前的index)
 * 
 * 
 */

// @lc code=start

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var V1 = function(nums) {
    class Pair {
        constructor(val, id){
            this.val = val
            this.id = id
        }
    }
    const counts = new Array(nums.length).fill(0)
    const temp = new Array(nums.length)
    const arr = nums.map((val, id)=>(new Pair(val,id)))
    console.log('')
    function trav(arr, left, right){
        if(left == right) return
        let mid = left + Math.floor((right - left)/2)
        trav(arr, left, mid)
        trav(arr, mid+1, right)
        getEleNum(arr, left, mid, right)
    }
    function getEleNum(arr, left, mid, right){
        for(let i = left; i<=right; i++){
            temp[i] = arr[i]
        }

        let pl = left; 
        let pr = mid+1;
        for(let p = left; p<=right; p++){
            if(pl == mid+1){
                // 左侧全部完成
                arr[p] = temp[pr++]
            }else if(pr == right +1){
                // 右侧排完了，
                arr[p] = temp[pl++]
                // 右侧排完的时候，说明此时左侧的数字都是较大的， 更新该元素的数量
                let currBigger = arr[p] // 当前较大的元素
                counts[currBigger.id] += pr - mid -1 // 每次+=较大元素右侧小于它的元素数量，
                // 因为右侧开始为 mid+1， 所以右侧数组中小于的元素数量为 pr - (mid+1)
            }else if(temp[pr].val < temp[pl].val){
                arr[p] = temp[pr++]
            }else if(temp[pr].val >= temp[pl].val){
                arr[p] = temp[pl++]
                // 当右侧元素小于左侧，说明左侧的右边有比它小的元素，更新左侧元素的数量
                let currBigger = arr[p] // 当前较大的元素
                counts[currBigger.id] += pr - mid -1 // 每次+=较大元素右侧小于它的元素数量
                // 因为右侧开始为 mid+1， 所以右侧数组中小于的元素数量为 pr - (mid+1)
            }
        }
    }
    trav(arr, 0, arr.length -1)
    // let result = []
    // for(let item of counts){
    //     result.push(item)
    // }
    return counts
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function(nums) {
    return V1(nums)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = countSmaller;
// @after-stub-for-debug-end