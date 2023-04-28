/*
 * @lc app=leetcode.cn id=889 lang=javascript
 *
 * [889] 根据前序和后序遍历构造二叉树
 * 思路： 前序为根左右， 后序为左右根
 * 对于已知root， 需要确定其左右子树的元素数量
 * 其左子root 的值为 preorder[rootPreIdx +1]
 * 其右子root 的值为 postorder[rootPostIdx -1]
 * 确定左右子root后，可根据postorder来确定左右子树的范围
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
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var V1 = function(preorder, postorder) {
    let preIndexMap ={}
    let postIndexMap = {}
    // 先初始化一下索引map
    for(let i = 0; i<postorder.length; i++){
        preIndexMap[preorder[i]] = i
        postIndexMap[postorder[i]] = i
    }
    /**
     * @param {number[]} preorder
     * @param {number[]} postorder
     * @return {TreeNode}
     */
    function build(preorder, preStart, preEnd, postorder, postStart, postEnd){
        if(preStart>preEnd) return null
        if(preStart == preEnd) return new TreeNode(preorder[preStart])
        let root = preorder[preStart]
        let leftRoot = preorder[preStart+1]
        let rightRoot = postorder[postEnd-1]
        let leftNum = preIndexMap[rightRoot] - preIndexMap[leftRoot]
        const thisNode = new TreeNode(root, null ,null)
        thisNode.left = build(
            preorder,
            preStart+1,
            preStart+1 + (leftNum -1),// 从0开始计数
            postorder,
            postStart,
            postStart+ (leftNum - 1 ) // 从0开始计数
        )
        thisNode.right = build(
            preorder,
            preIndexMap[rightRoot],
            preEnd,
            postorder,
            postStart+leftNum,//postIndexMap[rightRoot] - (rightNum -1),
            postIndexMap[rightRoot]
        )
        return thisNode
    }
    return build(preorder, 0, preorder.length-1, postorder, 0, postorder.length-1)
};  

/**
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function(preorder, postorder) {
    return V1(preorder, postorder)
};
// @lc code=end

