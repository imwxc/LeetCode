/*
 * @lc app=leetcode.cn id=931 lang=javascript
 *
 * [931] 下降路径最小和
 * dp定义：dp(i,j) 为 从 matrix[0 ~ ???] 的位置 落在 matrix[i][j]的路径最小和
 * 具体来说，位置 (row, col) 的下一个元素应当是 (row + 1, col - 1)、(row + 1, col) 或者 (row + 1, col + 1) 。
 * 所以 matrix[i][j] 的上一个状态应该是 matirx[i-1][j],matirx[i-1][j-1],matirx[i-1][j+1] 中最小的那个
 * /

// @lc code=start

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var V1 = function (matrix) {
    let n = matrix.length;
    let res = Number.MAX_SAFE_INTEGER;
    let memo = {}
    function dp(matrix, i, j) {
        // 当i，j越界时，返回一个无限大的距离
        if (i < 0 || j < 0|| i > n-1 || j > n-1) {
            return Number.MAX_SAFE_INTEGER;
        }
        let memoKey = `${i}-${j}`
        // 有备忘录就直接返回
        if(memo[memoKey]) return memo[memoKey]
        // 第一排的时候直接返回，没有上一个状态
        if(!i){
            memo[memoKey] =  matrix[i][j]
            return memo[memoKey]
        }
        memo[memoKey] = matrix[i][j]+ Math.min(
            dp(matrix,i-1,j),
            dp(matrix, i-1, j+1),
            dp(matrix, i-1, j-1)
        )
        return memo[memoKey]
    }
    for (let j = 0; j < n; j++) {
        res = Math.min(res, dp(matrix, n - 1, j));
    }
    return res
};

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
    return V1(matrix);
};
// @lc code=end
