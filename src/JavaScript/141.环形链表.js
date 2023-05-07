/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 思路:
 * 快慢指针:当两指针相同时,说明有环
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let fast = head
    let slow = head
    while(fast && fast.next){
        fast = fast.next.next
        slow = slow.next
        if(fast === slow) return true
    }
    return false
};
// @lc code=end

