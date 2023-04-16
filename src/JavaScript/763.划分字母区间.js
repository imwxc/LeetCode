/*
 * @lc app=leetcode.cn id=763 lang=javascript
 *
 * [763] 划分字母区间
 * 
 * 每个字母最多在一个片段中： 优先保证当前字母在一个片段
 * 
 * 
 * 
 */

// var partitionLabels = function(s) {
//     const last = new Array(26);
//     const length = s.length;
//     const codePointA = 'a'.codePointAt(0);
//     for (let i = 0; i < length; i++) {
//         last[s.codePointAt(i) - codePointA] = i;
//     }
//     const partition = [];
//     let start = 0, end = 0;
//     for (let i = 0; i < length; i++) {
//         end = Math.max(end, last[s.codePointAt(i) - codePointA]);
//         if (i == end) {
//             partition.push(end - start + 1);
//             start = end + 1;
//         }
//     }
//     return partition;
// };
// @lc code=start
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
	let sInfo = {}; 
    // 首先遍历字符串， 获取利用Object属性唯一的特性， 获取所有字母的最后出现的数组下标
    for (let i = 0; i < s.length; i++) {
        sInfo[s[i]]=i 
    }
	// console.info(sInfo);
	const partition = [];
	let start = 0,
		end = 0;
    /**
     * 遍历字符串，每个字母的数组下标即为该字母的片段结束位置
     * 通过max 计算出该字母结束位置是否比其他字母要小
     * 当访问到 该字母的数组下标时， 当前片段结束， 
     * 将 end-start+1（当前片段的长度） 放入结果中 
     *  然后设置开头为 start = end+1 查找下一个片段
     * 
     * 
     * 
     * 
     */

	for (let i = 0; i < s.length; i++) {
		end = Math.max(end, sInfo[s[i]]);
		if (i === end) {
			partition.push(end - start + 1);
			start = end + 1;
		}
	}

	return partition;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = partitionLabels;
// @after-stub-for-debug-end
