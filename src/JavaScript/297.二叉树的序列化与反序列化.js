/*
 * @lc app=leetcode.cn id=297 lang=javascript
 *
 * [297] 二叉树的序列化与反序列化
 *  序列化： 通过遍历树，将树的节点保存为字符串
 *  反序列化： 通过遍历树的字符串，来将树还原
 *  要点： 只有一个数组时，只有前序遍历和后序遍历 + 包含null可以完成
 *         两个数组时，需要将树保存为两个不同遍历的序列， 可以不包含null
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const NUll = "null";
const SEP = ",";
var TreeNode = TreeNode
    ? TreeNode
    : function TreeNode(val) {
          this.val = val;
          this.left = this.right = null;
      };
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var preVersionSerialize = function(root){
    let res = "";
    function trav(root) {
        if (root == null) {
            res += NUll + SEP;
            return;
        }
        res += root.val + SEP;
        trav(root.left);
        trav(root.right);
    }
    trav(root)
    return res;
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var preVersionDeserialize = function(data){
    let arr = data.split(SEP);
    arr = arr
        .slice(0, arr[arr.length - 1] ? arr.length : arr.length - 1)
        .map(Number);
    function build(arr) {
        let root = arr.shift();
        if (isNaN(root)) return null;
        let node = new TreeNode(root);
        node.left = build(arr);
        node.right = build(arr);
        return node
    }
    let res = build(arr);
    return res
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var postVersionSerialize = function(root){
    let res = "";
    function trav(root) {
        if (root == null) {
            res += NUll + SEP;
            return;
        }
        trav(root.left);
        trav(root.right);
        res += root.val + SEP;
    }
    trav(root)
    // console.log('postVersionSerialize: ', res)
    return res;
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var postVersionDeserialize = function(data){
    let arr = data.split(SEP);
    arr = arr
        .slice(0, arr[arr.length - 1] ? arr.length : arr.length - 1)
        .map(Number);
    function build(arr) {
        let root = arr.pop();
        if (isNaN(root)) return null;
        let node = new TreeNode(root);
        node.right = build(arr);
        node.left = build(arr);
        return node
    }
    let res = build(arr);
    return res
}
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    // return preVersionSerialize(root)
    return postVersionSerialize(root)
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
    // return preVersionDeserialize(data)
    return postVersionDeserialize(data)
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end
