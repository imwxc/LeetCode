/*
 * @lc app=leetcode.cn id=450 lang=javascript
 *
 * [450] 删除二叉搜索树中的节点
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
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
    function del(node, key){
        // 如果当前节点为 null, 则说明该节点不存在, 无需删除
        if(node == null) return null
        if(node.val < key){
            // 小于的时候向右查找
            node.right =  del(node.right, key)
        }else if(node.val > key){
            // 大于的时候向左查找
            node.left =  del(node.left, key)
        }else{
            // 相等的时候说明node为需要删除的节点
            // 有三种情况 1. node为叶子节点, 返回null 2. node的左子树或右子树为空， 返回其右子树或左子树 3. node有左右子树:需要找到其左右子树中的最大值，删除后， 将最大值的左右子树设置为node的左右子树
            if(node.right == null){
                // 右子树为空，返回左子树
                return node.left
            }else if(node.left==null){
                // 左子树为空，返回右子树
                return node.right
            }else{
                // 左右子树都不为空， 需要找到其右子树最小的元素作为新的root
                let rightMin = node.right
                rightMin = getMaxNode(rightMin)
                node.right = del(node.right, rightMin.val) 
                rightMin.left = node.left
                rightMin.right = node.right
                node = rightMin
            }
        }
        return node
    }
    function getMaxNode(node){
        let temp = node
        while(temp.left != null){
            temp = temp.left 
        }
        return temp
    }
    return del(root, key)
};
// @lc code=end
