/*
 * @lc app=leetcode.cn id=452 lang=javascript
 *
 * [452] 用最少数量的箭引爆气球
 *  一只 坐标为x的 箭可以击破所有 区间内的气球
 *  所以需要算出有多少个区间互相不重叠
 *  贪心策略:选择结尾最小且和前一个区间不重叠的区间
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    if(!points.length) return 0
    let sorted = points.sort((a,b)=>(a[1]-b[1])) // 先对末尾进行升序排列
    let res = 1 // 默认只射一只箭就能都打中
    let prevEnd = sorted[0][1]
    for(let i=1;i<sorted.length;i++){
        // console.info('--------------------------------------------')
        if(sorted[i][0] > prevEnd){ 
            // 如果当前区间的开头大于前一个区间的末尾, 
            //说明没有重叠 此时需要加一只箭
            // console.info('$$$$$$ 没找到重叠区间')
            // 
            prevEnd = sorted[i][1]
            ++res
        }
        // else{
        // console.info('##### 有一个区间重叠了)
        // }
    }
    // console.info('$$$$$$:', res)
    return res
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = findMinArrowShots;
// @after-stub-for-debug-end