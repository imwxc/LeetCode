/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 *
 * https://leetcode.cn/problems/linked-list-cycle-ii/description/
 *
 * 思路：
 *  v1： 遍历链表： 存储所有遍历过的节点，若有重复， 则return head
 *  v2： 利用快慢指针：
 *      每次fast前进两步， slow前进一步
 *      (需要注意： fast 和 slow进入循环时指针需要不一致)
 *      两指针第一次相遇时， 将fast移到起点，
 *      并让 两指针只前进一步，
 *      第二次相遇时，相遇的节点为环路起点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function V1(head){
    const set = new Set();
    while(head!==null){
        if(set.has(head)) return head
        set.add(head)
        head = head.next
    }
    return null
}

function V2(head){
    
    const start = head
    let slow = head;
    let fast = head;
    console.info(`fast: ${fast.val}, slow: ${slow.val}`)
    do{
        if(!fast || !fast.next) return null
        slow = slow.next;
        fast = fast.next.next;
        // console.info(`fast: ${fast.val}, slow: ${slow.val}`)
    }
    while(slow !== fast)
    fast = start
    while(slow !== fast){
        slow = slow.next
        fast = fast.next
        // console.info(`fast: ${fast.val}, slow: ${slow.val}`)
    }
    return fast
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// eslint-disable-next-line no-unused-vars
var detectCycle = function(head) {
    if(!head) return head
    // return V1(head)
    return V2(head)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = detectCycle;
// @after-stub-for-debug-end