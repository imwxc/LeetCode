/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 * 思路： 前序遍历为根左右，中序遍历为左根右
 *  构造当前节点可以直接根据前序遍历将根确定，
 *  中序数组中，根元素的左侧均为其左子树元素，右侧均为其右子树元素
 *  前序数组中， 根元素在当前子数组的第0个，左根在第1个，右根在左子树元素数+1个位置
 *
 *  preorder 和 inorder 均 无重复 元素 所以直接for找index即可
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
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var V1 = function (preorder, inorder) {
    let inOrderIndxMap = {}
    for(let i =0; i<inorder.length;i++){
        inOrderIndxMap[inorder[i]] = i
    }
    function build(preorder, preStart, preEnd, inorder, inStart, inEnd) {
        if(preStart > preEnd || inStart > inEnd) return null
        let root = preorder[preStart];
        let thisNode = new TreeNode(root, null,null)
        let leftPreIdx = preStart+1
        // let leftChild = preorder[leftPreIdx]
        let rootIdxIn = inOrderIndxMap[root];
        let leftChildNum = rootIdxIn - inStart;
        let rightPreIdx = preStart + 1 + leftChildNum
        // let rightChild = preorder[preStart + leftChildNum]
        // let rightChildNum = preorder.length - preStart - leftChildNum -1
        thisNode.left = build(
            preorder, 
            leftPreIdx, 
            preStart+leftChildNum, 
            inorder,
            inStart,
            rootIdxIn -1
        )
        thisNode.right = build(
            preorder,
            rightPreIdx,
            preEnd,
            inorder,
            rootIdxIn +1,
            inEnd
        )
        return thisNode
    }
    return build(preorder, 0, preorder.length-1,inorder, 0, inorder.length-1);
};

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    return V1(preorder, inorder);
};
// @lc code=end
