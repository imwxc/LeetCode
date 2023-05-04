/*
 * @lc app=leetcode.cn id=354 lang=javascript
 *
 * [354] 俄罗斯套娃信封问题
 * 思路： 对于每个信封， 需要找到当前信封前面比他宽高都小的信封（类似于lis）
 *  先将信封按照 宽度升序排序， 当宽度相同时，按照高度降序排列， 这样可以按照高度的维度进行LIS
 */

// @lc code=start

/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
    // 使用二分法的LIS查找可以降低时间复杂度
    function lengthOfLIS(nums) {
        // 用来记录每张牌在那个牌推的顶部
        let n = nums.length
        let top = new Array(n).fill(0)
        let piles =0;
        for(let i=0; i< n; i++){
            let poker = nums[i]
            // 在已有的牌推中进行二分查找，找到poker要放入的牌堆
            let left = 0; let right = piles;
            while (left < right) {
                var mid = left + Math.floor((right - left) / 2);
                if (top[mid] >= poker) { // 中间大于 poker时， 说明poker需要放到左侧区间
                    right = mid;
                }else{ // 中间小于poker， poker需要放到右侧区间
                    left = mid + 1;
                }
            }
            // 没有合适的牌堆就新建一个
            if (left == piles) piles++;
            // left指向了poker需要放的牌堆，更新此时牌堆顶部的牌
            top[left] = poker;
        }
        return piles
    }
    // 先对信封进行排序
    envelopes.sort((a,b)=>{
        if(a[0]==b[0]){
            return b[1]-a[1]
        }else{
            return a[0]-b[0]
        }
    })
    // 将高度拿出来进行LIS计算
    let hList = new Array(envelopes.length).fill(0).map((_,i)=>(envelopes[i][1]))
    
    return lengthOfLIS(hList)


};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = maxEnvelopes;
// @after-stub-for-debug-end