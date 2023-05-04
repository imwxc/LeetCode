/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 *  思路： 对于s1 和s2 想要知道 转换的最少操作数， 可以将其
 * 
 */

// @lc code=start

/**
 * 暴力解法 + 备忘录
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var V1 = function(s1, s2) {
    let memo={}
    // 目标：将s1 变为s2
    // 定义， dp(i,j) 返回 s1[0, i], s2[0,j]的最小操作距离
    // i代表S1的指向， j代表s2的指向
    function dp(i,j){
        // 因为 i，j是从后向前， 所以 i，j为-1时说明此时遍历结束
        // 当i 走到头， 只能插入所有[0,j]的字符， 所以是j+1个操作步骤
        if(i == -1) return j+1 
        // 当j 走到头， 只能删除所有[0,i]的字符， 所以是i+1个操作步骤
        if(j == -1) return i+1 
        // 查一下备忘录
        let memoKey = `${i}-${j}`
        if(memo[memoKey]) return memo[memoKey]

        if(s1[i] == s2[j]){
            memo[memoKey] = dp(i-1, j-1) // 什么都不做， i--， j--计算下一个区间的距离
        }else{
            memo[memoKey] = Math.min(
                // 插入 s1在i上插入后， 需要用s1[i]匹配下一个s2的字符, 所以是j-1，
                // 因为用了一个插入操作， 所以 需要+1
                dp(i,j-1)+1, 
                // 删除 s1删除i后， 需用s2[j] 匹配下一个s1的字符， 所以是 i-1
                // 因为用了一个删除操作， 所以 +1
                dp(i-1,j)+1, 
                // 替换 s1[i]替换为s2[j]后， 需用 s1 的下一个字符匹配 s2的下一个字符
                // 所以是 i-1， j-1
                // 因为用了替换操作 ， 所以 +1
                dp(i-1,j-1)+1 
            ) 
        }
        return memo[memoKey]
    }

    // 查找 s1 和 s2 的匹配
    return dp(s1.length-1, s2.length-1)
};

/**
 * 迭代解法
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var V2 = function(s1, s2) {
    let m  = s1.length, n=s2.length;
    // 定义： dp[i][j] 存储了 s1[0 ~i-1] 变为 s2[0~j-1] 的最小距离,
    // 所以需要平移一下， 让dp[0][0]为取不到的case
    let dp = new Array(m+1).fill(0).map(()=>new Array(n+1).fill(0))
    // 初始化base case
    // 对于dp[i][0] j走到头了， 所以需要进行i个操作
    for(let i=1; i<m+1; i++){
        dp[i][0] = i 
    }
    // 对于dp[0][j] i走到头， 所以需要进行j个操作
    for(let j = 1; j<n+1; j++){
        dp[0][j] = j
    }

    for(let i = 1; i<m+1; i++){
        for(let j = 1; j <n +1; j++){
            // i和j在dp中向后移了一位， 所以在原先的串中需要-1
            if(s1[i-1] == s2[j-1]){
                dp[i][j] = dp[i-1][j-1]
            }else{
                dp[i][j] = Math.min(
                    dp[i-1][j]+1,
                    dp[i][j-1]+1,
                    dp[i-1][j-1]+1
                )
            }
        }
    }
    return dp[m][n]

};
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    // return V1(word1, word2)
    return V2(word1, word2)
};
// @lc code=end

