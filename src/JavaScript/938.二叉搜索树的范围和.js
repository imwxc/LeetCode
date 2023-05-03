/*
 * @lc app=leetcode.cn id=938 lang=javascript
 *
 * [938] 二叉搜索树的范围和
 * 当root.val在区间时， 搜索左右子树
 * 当 root.val 小于区间左端点， 则只遍历其右子树
 * 当root.val 大于区间右端点， 则只遍历其左子树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var V1 = function(root, low, high) {
    let res =0;
    if(root == null) return 0
    function trav(root, low, high){
        if(root == null) return 
        if(root.val < low){
            trav(root.right, low, high)
        }else if(root.val > high){
            trav(root.left, low, high)
        }else {
            res+=root.val
            trav(root.left, low, high)
            trav(root.right, low, high)
        }
    }
    trav(root, low, high)
    return res

};

/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function(root, low, high) {
    return V1(root, low, high)
};
// @lc code=end

