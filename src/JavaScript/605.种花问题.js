/*
 * @lc app=leetcode.cn id=605 lang=javascript
 *
 * [605] 种花问题
 * 贪心策略: 遍历数组,尽可能种植更多的花
 * 如果 种植数量>给的花, 则返回true,否则返回false
 */

// @lc code=start
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {
    let i =0
    for (; i < flowerbed.length && n > 0;) { // 遍历数组
		if (flowerbed[i] == 1) { // 当前位置有花的时候 跳一格
			i += 2;
		} else if (i == flowerbed.length - 1 || flowerbed[i + 1] == 0) { // 当前位置没有花 && 当前位置为最后一个 or 下一个格子没有花时
			n--;    // 种一朵花
			i += 2; // 跳一格
		} else { // 当前位置没有花 && 当前位置不为最后一个格子 && 下一个格子有花 跳两格
			i += 3;
		}
	}
	return n <= 0;
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = canPlaceFlowers;
// @after-stub-for-debug-end