/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
// var reverseBetween = function(head, left, right) {
//     let successor = null; // 后驱节点
//     // 反转以 head 为起点的 n 个节点，返回新的头结点
//     function reverseN(head, n) {
//         if (n == 1) {
//             // 记录第 n + 1 个节点
//             successor = head.next;
//             return head;
//         }
//         // 以 head.next 为起点，需要反转前 n - 1 个节点
//         var last = reverseN(head.next, n - 1);

//         head.next.next = head;
//         // 让反转之后的 head 节点和后面的节点连起来
//         head.next = successor;
//         return last;
//     }
//     if(left == 1){
//         return reverseN(head, right)
//     }
//     head.next = reverseBetween(head.next, left-1, right-1)
//     return head
// };

var reverseBetween = function(head, m, n) {
    let successor = null;
    // 反转以 head 为起点的 n 个节点，返回新的头结点
    const reverseN = function(head, n) {
        if (n == 1) {
            // 记录第 n + 1 个节点
            successor = head.next;
            return head;
        }
        const last = reverseN(head.next, n - 1);
        head.next.next = head;
        // 让反转之后的 head 节点和后面的节点连起来
        head.next = successor;
        return last;


    };
    // base case
    if (m == 1) {
        return reverseN(head, n);
    }
    // 前进到反转的起点触发 base case
    head.next = reverseBetween(head.next, m - 1, n - 1);
    return head;
};
// @lc code=end

