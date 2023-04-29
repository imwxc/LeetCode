/*
 * @lc app=leetcode.cn id=701 lang=javascript
 *
 * [701] 二叉搜索树中的插入操作
 * 思路: 当前指向null的情况下, 说明 该位置为新节点的插入位置
 * 否则安装 BST的特性, 根据大小遍历对应的子树
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
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
    function insert(root, val){
        if(root == null){
            return new TreeNode(val)
        }
        if(val < root.val){
            root.left = insert(root.left, val)
        }else{
            root.right = insert(root.right, val)
        }
        return root
    }
    return insert(root, val)
};
// @lc code=end

