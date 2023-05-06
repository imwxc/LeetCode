/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并 K 个升序链表
 */
import {PriorityQueue} from '@datastructures-js/priority-queue'
// @lc code=start

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
 function ListNode(val, next) {
         this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
     }
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if(!lists.length) return null
    let queue = new PriorityQueue({
        compare:(a,b)=>a.val-b.val
    })
    let dummy = new ListNode(-1)
    let p = dummy
    for(let head of lists){
        // console.log(JSON.stringify(head))
        if(head){
            queue.enqueue(head, head.val)
        }
    }
    while(!queue.isEmpty()){
        let node = queue.dequeue()
        p.next = node;
        if(node.next){
            queue.enqueue(node.next,node.next.val)
        }
        p = p.next
    }
    return dummy.next
};
// @lc code=end

