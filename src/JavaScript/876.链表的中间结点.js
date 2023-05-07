/*
 * @lc app=leetcode.cn id=876 lang=javascript
 *
 * [876] 链表的中间结点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
/**
 * 思路:快慢指针实现
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
    let fast = head
    let slow = head
    // 当fast 存在且fast有下一个节点时
    while(fast!=null && fast.next!=null){
        slow = slow.next
        fast = fast.next.next
    }
    return slow
};
// @lc code=end
