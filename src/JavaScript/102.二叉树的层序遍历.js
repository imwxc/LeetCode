/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    let res= []
    if(!root) return res
    let queue = []
    queue.push(root)
    while(queue.length){
        let thisLayer = []
        let n = queue.length
        for(let i=0;i<n;i++){
            let shiftNode = queue.shift()
            thisLayer.push(shiftNode.val)
            if(shiftNode.left) queue.push(shiftNode.left)
            if(shiftNode.right) queue.push(shiftNode.right)
        }
        res.push(thisLayer)
    }
    return res
};
// @lc code=end

