/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 输入一个节点 head，将「以 head 为起点」的链表反转，并返回反转之后的头结点。
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    function reverse(node){
        // base case 递归到末端时，返回末端节点
        if(!node || !node.next) return node
        // 获得node.next为起点的反转链表
        let lastNode = reverseList(node.next)
        // 开始反转当前节点和下一个节点的指向
        // node的下一个节点的next指向改为当前节点
        node.next.next = head
        // 当前节点的next改为空
        node.next = null

        return lastNode
    }
    return reverse(head)
};
// @lc code=end

