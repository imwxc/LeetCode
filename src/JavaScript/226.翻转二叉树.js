/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
 * 思路：
 *  v1 遍历每个子节点，交换其左右子树
 *  v2 分解问题思路： 首先将当前节点左子树翻转，然后将右子树翻转， 最后交换当前节点的左右子树
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
 * @return {TreeNode}
 */
function V1(root){
    function trav(root){
        if(root == null){
            return null
        }
        const temp = root.left;
        root.left = root.right;
        root.right = temp;

        trav(root.left)
        trav(root.right)
    }
    trav(root)
    return root
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function V2(root){
    function swap(root){
        if(root == null) return null
        swap(root.left)
        swap(root.right)

        const temp = root.right
        root.right = root.left
        root.left = temp
    }
    swap(root)
    return root
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    // return V1(root)
    return V2(root)
};
// @lc code=end

