/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    if (!head) return head;
    let dummy = new ListNode(-1, head);
    // 找到 strat的倒数第step个节点
    function findDelNode(start, step) {
        let p1 = start;
        let p2 = start;
        for(let i=0;i<step;i++){
            p2 = p2.next
        }
        while(p2 !== null){
            p1=p1.next
            p2=p2.next
        }
        return p1
    }
    // dummy是虚拟头, 需要找到 第n个节点的前一个(n+1)的节点来删除
    let delNodePrev = findDelNode(dummy, n+1);
    // console.log(JSON.stringify(delNodePrev))
    delNodePrev.next = delNodePrev.next.next;
    return dummy.next;
};
// @lc code=end
