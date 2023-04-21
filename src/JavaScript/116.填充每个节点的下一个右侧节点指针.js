/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 * 思路：
 *  v1(遍历)：
 *      对于每两个节点的空隙，将这两个节点连接在一起， 
 *          然后将这两个节点各自的左右子节点 以及 节点1的右节点和节点2的左节点相连
 *      起始：root的左右节点
 *      
 *      
 * 
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
function V1(root){
    if(root == null) return root
    /**
     * @param {Node} node1
     * @param {Node} node2
     * @return {Node}
     */
    function trav(node1,node2){ // 默认node1 在 node2 左侧
        if(node1 == null || node2 == null) return 
        node1.next = node2
        // 将node1的左右相连
        trav(node1.left, node1.right)
        // 将node2的左右相连
        trav(node2.left, node2.right)
        // 将node1的右和node2的左相连
        trav(node1.right, node2.left)
    }
    trav(root.left, root.right)
    return root
}

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    return V1(root)
};
// @lc code=end

