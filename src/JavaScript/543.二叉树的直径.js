/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
 * 思路：当前节点的直径为左右子树的最大深度之和,
 * 所以先求左右子树的深度，将其相加后和 已有的深度比较
 *  
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
 * @return {number}
 */
var V1 = function(root) {
    let maxLen = 0
    function trav(root){
        if(root == null) return 0
        let leftMax = trav(root.left)
        let rightMax = trav(root.right)
        maxLen = Math.max((leftMax + rightMax), maxLen)
        // 当前节点的最大深度为 1+左右子树深度较大的一个
        return 1+Math.max(leftMax, rightMax)
    }
    trav(root)
    return maxLen
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    return V1(root)
};
// @lc code=end

