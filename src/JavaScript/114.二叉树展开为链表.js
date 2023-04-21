/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
 * 思路：
 * V1（分解问题）: 对于当前节点，先将左子树展开，再将右子树展开，最后将右子树展开后的结果拼接到左子树的末尾和
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var V1 = function(root) {
    if(root == null) return

    function findLast(node){
        let res = node
        while(res.right != null){
            res = res.right
        }
        return res
    }
    /**
     * @param {TreeNode} root
     * @return {void} Do not return anything, modify root in-place instead.
     */
    function flatten(curr){ // 将一颗子树拉平
        if(curr == null) return
        flatten(curr.left)
        flatten(curr.right)
        // 左右都拉平后
        // 将右子树接到左子链表的最后
        // 将当前节点的右子节点更新
        const left = curr.left
        const right = curr.right
        curr.left = null
        curr.right = left
        // 找到原先左子树的末尾
        const leftEnd = findLast(curr)
        leftEnd.right = right

    }
    flatten(root)
    
};
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    V1(root)
};
// @lc code=end

