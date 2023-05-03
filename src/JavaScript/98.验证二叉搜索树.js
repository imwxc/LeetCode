/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
 * 思路：一个结点为根的树为BST， 需要满足最大值>root>最小值， 
 * 且其左右子树均满足该条件
 */

// @lc code=start
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var V1 = function(root) {
    let res = false 
    function trav(root, min, max){
        if(root == null) return true
        // 当最小值非空时 且 root<= 最小值， 则不是BST
        if(min !=null && root.val <= min.val){
            return false
        }
        // 当最大值非空时 且 root >= 最大值， 则不是BST
        if(max != null && root.val >= max.val){
            return false
        }
        return trav(root.left, min, root) && trav(root.right, root, max)
    }
    res = trav(root, null, null)
    return res
};
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    return V1(root)
};
// @lc code=end

