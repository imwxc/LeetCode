/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 * 思路：
 * V1: 遍历数组，对每个x查找 target-x是否存在，时间 O(n^2)
 * V2：利用Map，遍历每个x时查找 对象中是否有 target-x，有则返回，没有则将x存入Map中
 */

// @lc code=start
function V1(nums,target){
    var fidx = -1
    var secIdx = -1
    var res = []
    nums.forEach((i,idx)=>{
        if(fidx !== -1 && secIdx !== -1){
            res = [fidx, secIdx]
            return
        }
        fidx = idx
        secIdx = nums.findIndex((j,jdx)=>(j===(target - i) && idx !== jdx))
    })
    return res
}
function V2(nums=[],target){
    var map = new Map()
    for(let i = 0;i<nums.length;i++){
        const currNum = nums[i];
        const targetNum = target - currNum;
        let targetNumIdx = -1;
        if(map.has(targetNum)){
            targetNumIdx = map.get(targetNum)
            return [targetNumIdx,i]
        }else{
            map.set(currNum,i)
        }
    }
}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // res = V1(nums,target)
    const res = V2(nums,target)
    return res
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = twoSum;
// @after-stub-for-debug-end