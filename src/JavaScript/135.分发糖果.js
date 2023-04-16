/*
 * @lc app=leetcode.cn id=135 lang=javascript
 *
 * [135] 分发糖果
 * 排序会破坏原先孩子们的排列顺序,
 * 需要两边遍历:
 *  从左向右遍历: 右边孩子比左边高时,右边孩子的糖果 = 左边孩子糖果数+1
 *	从右向左遍历: 如果左边孩子的分数比右边高,并且左边孩子的糖果数量比右边孩子少,则 左边孩子的糖果 = 右边孩子的糖果 +1
 */

// @lc code=start
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
	let res = new Array(ratings.length).fill(1); // 创建 rating.length 长度的数组然后填满
	if(ratings.length <1) return res
	const max = (a,b)=>{
		if(a>b) return a
		if(a<=b) return b
	}
	// 从左向右遍历
	for(let i=1;i<=ratings.length;i++){
		if(ratings[i]>ratings[i-1]){
			res[i] = res[i-1]+1
		}
	}
	// 从右向左遍历
	for(let j=ratings.length-1;j>0;j--){
		if(ratings[j-1] > ratings[j]){
			res[j-1] = max(res[j-1], (res[j]+1))// 左边孩子的糖果数不大于右边孩子的
		}
		} 
	return res.reduce((prev, curr)=>(prev+curr),0)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = candy;
// @after-stub-for-debug-end