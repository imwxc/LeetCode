/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 * 贪心策略: 给剩余孩子中饥饿度最小的孩子分配最小的能饱腹的饼干
 *  所以需要对孩子和饼干进行排序
 *  排序完成后, 对 孩子和饼干各遍历一遍, 
 *  当遍历之一结束时代表所有孩子都分配到了饼干 或者所有饼干都分配完了时
 *  此时被分配到饼干的孩子数量即为最大满足数量
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    let childNum =0;
    let cookie = 0;
    g.sort((a,b)=>(a-b));
    s.sort((a,b)=>(a-b));
    while( childNum<g.length && cookie<s.length ){
        if(g[childNum] <= s[cookie]) ++childNum;
        ++cookie
    }
    return childNum
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = findContentChildren;
// @after-stub-for-debug-end