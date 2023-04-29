/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 * 思路： 对于每个节点， 需要判断目标节点是否为该节点或者在该节点的子树上
 * 当其和要找的节点相等时， 说明它有可能是 公共组件， 直接返回该节点
 * 当其左右子树不为空时， 说明该节点为目标节点的公共祖先之一， 返回该节点
 * 否则返回 左子树的根节点或右子树的根节点（如果均为null， 则说明该节点的左右子树都不包含目标节点）
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var V1 = function(root, p, q) {
    let res = null;
    function find(root, p, q){
        if(root == null) return null
        if(root === p || root === q) return root

        let left = find(root.left, p, q)
        let right = find(root.right, p ,q)
        
        if(left != null && right != null){
            return root
        }
        return left ? left: right
    }
    res = find(root, p, q)
    return res
};

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    return V1(root, p, q)
};
// @lc code=end

