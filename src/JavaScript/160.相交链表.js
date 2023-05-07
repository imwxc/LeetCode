/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
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
 * 使用map记录
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var V1 = function(headA, headB) {
    let map = new Map()
    let p1 = headA,p2=headB;
    while(p1){
        map.set(p1,true)
        p1=p1.next
    }
    while(p2){
        if(map.has(p2)) return p2
        map.set(p2,true)
        p2=p2.next
    }
    return null
};
/**
 * 使用快慢指针
 * 当p1走完a链表后,将p1赋值到b的head开始走
 * 当p2走完b链表后,将p2赋值到a的head开始走
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var V2 = function(headA, headB) {
    let p1 = headA,p2=headB;
    while(p1 !== p2){
        if(p1 == null) p1 = headB;
        else p1 = p1.next
        if(p2 == null) p2 = headA
        else p2 = p2.next
    }
    return p1
};
/**
 * 使用快慢指针
 * 将链表末端连接到另外一个链表的头部形成环路,
 * 然后使用环路方法来找出,
 * 最后将链接断开
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var V3 = function(headA, headB) {
    let end = headA;
    while(end.next!==null){
        end=end.next
    }
    end.next = headB
    function getCircleBegin(head){
    
        const start = head
        let slow = head;
        let fast = head;
        // console.info(`fast: ${fast.val}, slow: ${slow.val}`)
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
    let res = getCircleBegin(headA)
    end.next = null
    return res
};
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    // return V1(headA,headB)
    // return V2(headA,headB)
    return V3(headA,headB)
};
// @lc code=end

