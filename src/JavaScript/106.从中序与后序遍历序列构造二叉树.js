/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
 * 思路： 中序为左根右， 后序为左右根
 * 对于当前节点， root为 postEnd, 
 * 通过root在中序的index：rootInIdx 来计算出左右子树的数量
 * 左为：leftNum = rootInIdx - inStart
 * 右为：inEnd - rootInIdx
 * 所以
 * 左子树在后序中的左根index为 postStart + leftNum
 * 右子树在后序的右根Index 为 postStart + leftNum + rightNum
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
var TreeNode = TreeNode ? TreeNode :function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var V1 = function(inorder, postorder) {
    let inorderIndexMap = {}
    for(let i =0; i<inorder.length; i++){
        inorderIndexMap[inorder[i]] = i
    }
    /**
     * @param {number[]} inorder
     * @param {number[]} postorder
     * @return {TreeNode}
     */
    function build(postorder, postStart, postEnd, inorder, inStart, inEnd){
        if(inStart > inEnd ) return null
        let root = postorder[postEnd]
        let rootInIdx = inorderIndexMap[root]
        let leftChildNum = rootInIdx - inStart
        // let rightChildNum = inEnd - rootInIdx
        let leftPostIdx = postStart + (leftChildNum - 1) // 相当于从0开始算
        let rightpostIdx = postEnd - 1
        let thisNode = new TreeNode(root, null,null)
        thisNode.left = build(
            postorder,
            postStart,
            leftPostIdx,
            inorder,
            inStart,
            rootInIdx-1
        )
        thisNode.right = build(
            postorder,
            leftPostIdx+1,
            rightpostIdx,
            inorder,
            rootInIdx+1,
            inEnd
        )
        return thisNode

    }
    return build(postorder, 0, postorder.length-1, inorder, 0, inorder.length -1)
};
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    return V1(inorder, postorder)
};
// @lc code=end

