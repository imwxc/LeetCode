/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
 /**
 * @param {TreeNode} root
 * @param {TreeNode[]} nodes
 * @return {TreeNode}
 */
//  思路：类似于 236 只不过是将 两个节点换成了多个节点
var V1 = function(root, nodes) {
    function find(root, nodes){
        if(root == null) return null
        if(nodes.includes(root)) return root

        let left = find(root.left, nodes)
        let right = find(root.right, nodes)

        if(left != null && right != null){
            return root
        }
        return left ? left : right
    }
    const res = find(root, nodes)
    return res
};
/**
 * @param {TreeNode} root
 * @param {TreeNode[]} nodes
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, nodes) {
    return V1(root, nodes)
};