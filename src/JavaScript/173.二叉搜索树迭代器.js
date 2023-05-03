/*
 * @lc app=leetcode.cn id=173 lang=javascript
 *
 * [173] 二叉搜索树迭代器
 * 思路： 利用栈来模拟BST的中序遍历过程： 左子树push， 中间pop， 右子树push
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
 */
var BSTIterator = function(root) {
    this.stack = new Array();
    this.pushLeft2Stack = function(root){
        while(root !=null){
            this.stack.push(root)
            root = root.left
        }
    }
    this.pushLeft2Stack(root)
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    let node = this.stack.pop()
    this.pushLeft2Stack(node.right)
    return node.val
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return !!this.stack.length
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end

