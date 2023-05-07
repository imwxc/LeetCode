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
    // 使用优先级队列来进行存储,排序方式为升序排序
    let queue = new PriorityQueue({
        compare:(a,b)=>a.val-b.val
    })
    // 初始化虚拟头节点
    let dummy = new ListNode(-1)
    let p = dummy
    // 将每个链表的头节点放到优先级队列中
    for(let head of lists){
        // console.log(JSON.stringify(head))
        if(head){
            queue.enqueue(head, head.val)
        }
    }
    // 当优先级队列非空的时候
    while(!queue.isEmpty()){
        // 获得当前最小的节点
        let node = queue.dequeue()
        // 拼上去
        p.next = node;
        // 将下一个节点加入优先级队列,其可以自动排序
        if(node.next){
            queue.enqueue(node.next,node.next.val)
        }
        // p指向下一个
        p = p.next
    }
    return dummy.next
};
// @lc code=end

