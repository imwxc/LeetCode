/*
 * @lc app=leetcode.cn id=652 lang=javascript
 *
 * [652] 寻找重复的子树
 * 思路： 
 * 首先 对于每个节点需要知道自己的结构（通过序列化方式可完成）
 * 然后需要知道是否存在其他子树结构和当前的节点子树结构相同（通过Map存储序列化的结果和其出现次数完成）
 * 
 * 
 * 优化思路：
 *  子树结构可以使用一个序号来表示，当两个子树相同时，其 根， 左， 右 的序号都相同
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
const NULL = 'null'
const SEP = ','
/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var V1 = function(root) {
    // 使用后序方式获取当前节点的序列化
    const result = new Set();
    const nodeResMap = new Map()
    function serialize(root){
        if(root == null){
            return NULL
        }
        let thisStr = ''
        let leftRes = serialize(root.left)
        let rightRes = serialize(root.right)
        thisStr += leftRes +SEP +rightRes+ SEP + root.val //分割符的方式需要注意
        console.log('&&&: ', thisStr)
        if(nodeResMap.has(thisStr)){
            result.add(nodeResMap.get(thisStr))
        }else{
            nodeResMap.set(thisStr, root)
        }
        return thisStr
    }
    serialize(root)
    return [...result]
};
/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var V2 = function(root) {
    // 使用后序方式获取当前节点的序列化
    const result = new Set();
    const nodeResMap = new Map()
    let idx = 0;
    function serialize(root){
        if(root == null){
            return -999 // -200 < val < 200
        }
        
        let leftRes = serialize(root.left)
        let rightRes = serialize(root.right)
        let thisTrip = [root.val, leftRes, rightRes].toString()
        if(nodeResMap.has(thisTrip)){
            let res = nodeResMap.get(thisTrip)
            result.add(res[0])
            return res[1]
        }else{
            nodeResMap.set(thisTrip, [root, ++idx])
            return idx
        }
    }
    serialize(root)
    return [...result]
};



/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
    // return V1(root)
    return V2(root)
};
// @lc code=end

