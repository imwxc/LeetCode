/*
 * @lc app=leetcode.cn id=654 lang=javascript
 *
 * [654] 最大二叉树
 * 思路： 分解问题模式
 *  需要先找到最大的数的位置，将其设置为根节点
 *  然后其左子节点为 左侧数组的递归返回值
 *   其右子节点为 右侧数组的递归返回值
 * 
 * 注意事项：
 *  1. 需要使用 index选择左右子数组，不然会有栈溢出的问题
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var V1 = function(nums) {
    function build(nums, left, right){
        if(left > right) return null
        let maxIndex = -1;
        let maxVal = Number.MIN_SAFE_INTEGER
        for(let i=left;i<=right;i++){
            if(nums[i]>maxVal){
                maxIndex = i;
                maxVal = nums[i]
            }
        }
        let root = new TreeNode(maxVal)
        root.left = build(nums, left, maxIndex-1)
        root.right = build(nums, maxIndex+1, right)
        return root
    }
    return build(nums, 0 , nums.length-1)
};



/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
    return V1(nums)
};
// @lc code=end

