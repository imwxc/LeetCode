/*
 * @lc app=leetcode.cn id=140 lang=javascript
 *
 * [140] 单词拆分 II
 */

// @lc code=start
/** 动态规划解法
 * 对于一个前缀， 如果第一次匹配成功， 开始递归进行子问题的匹配， 如果都成功了， 则将其加入结果中
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
    const memo = new Map();
    const wordDictSet = new Set(wordDict)
    // 定义：返回用 wordDict 构成 s[i..] 的所有可能
    function dp(i){
        let res = []
        // base case
        if( i == s.length ){
            res.push('')
            return res
        }
        
        if(memo.has(i)) return memo.get(i)
        // j = s.length时 会进入兜底，substring的末端时开区间
        for(let j = i+1; j<=s.length;j ++){
            const prefix = s.substring(i ,j)
            if(wordDictSet.has(prefix)){
                const subRes = dp(j);
                subRes.forEach(element => {
                    const space = !element ? "" : " ";
                    res.push(prefix + space + element)
                });
            }
        }
        memo.set(i,res)
        return res
    }

    return dp(0)
};
// @lc code=end
// 
// 24K * 13 + 1000 * 12 + 24 * 2
// 6个月试用期，第一年可能无法调薪
// 7天年假 半天病假当月用，病假40%，事假0%