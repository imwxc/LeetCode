/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 *  选择保留区间的结尾越小,留给其他区间的空间就越大
 *  贪心策略: 有限保留结尾小且不相交的区间
 *  首先安装区间末尾大小进行排序,
 *  然后遍历区间,每次将当前区间和前一个区间进行比较,
 * 如果有重合(区间开头 < 上一个区间的末尾) 就去除数量+1
 * 如果不重合,就保留该区间,并更新上一个区间的末尾 为 当前区间的末尾
 * 
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    if(!intervals.length) return 0
    let sorted = intervals.sort((a,b)=>(a[1]-b[1]))
    let res=0
    let prev = sorted[0][1] // 第一个区间的末尾
    // for写法会节约一些时间 和 空间
    for(let i =1;i<sorted.length;i++){
        
        if(sorted[i][0] < prev){ // 如果当前区间的开头小于前一个区间的末尾,就将当前区间去除
            ++res
        }else{
            prev=sorted[i][1]
        }
    }
    // sorted.slice(1,sorted.length).forEach((i,index)=>{
    //     // if(!index) return
    //     if(i[0] < prev){ // 如果当前区间的开头小于前一个区间的末尾,就将当前区间去除
    //         ++res
    //     }else{
    //         prev=i[1]
    //     }
    // })
    return res
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = eraseOverlapIntervals;
// @after-stub-for-debug-end