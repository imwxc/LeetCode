/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if(!head) return null;
    let slow= head, fast = head;
    while(fast !=null){
        if(fast.val != slow.val){
            slow.next = fast
            slow = slow.next
        }
        fast = fast.next
    }
    slow.next = null // 结束循环后， slow后面的元素都不需要了
    return head
};
// @lc code=end

