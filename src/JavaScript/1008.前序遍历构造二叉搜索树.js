/*
 * @lc app=leetcode.cn id=1008 lang=javascript
 *
 * [1008] 前序遍历构造二叉搜索树
 * 前序为根左右，在确定根节点后，利用BST的特性来确定左右子树的区间即可
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
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
    function build(preorder, start, end){
        if(start > end) return null
        let rootVal = preorder[start]
        // 找到左右子树的分界点
        let rightStart = start+1;
        while(rightStart<=end && preorder[rightStart] < rootVal){
            rightStart++
        }
        let leftStart = start+1;
        let leftEnd = rightStart -1
        let rightEnd = end
        let thisNode = new TreeNode(rootVal)
        thisNode.left = build(preorder, leftStart, leftEnd)
        thisNode.right = build(preorder, rightStart, rightEnd)
        return thisNode
    }
    let res = build(preorder, 0, preorder.length-1)
    return res
};
// @lc code=end
