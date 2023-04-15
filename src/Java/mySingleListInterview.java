

import java.util.Stack;

public class mySingleListInterview {
    /**
     * 求单链表有效节点个数
     * 
     * @param list
     * @return 有效个数
     */
    int nodeNums(singleLinkedList list) {
        HeroNode temp = list.head.next;
        // 空链表返回0
        if (list.isEmpty()) {
            return 0;
        }
        // 不统计头节点
        int length = 0;
        while (temp != null) {
            length++;
            temp = temp.next;
        }
        return length;
    }

    /**
     * 查找到单链表中倒数第K个节点： 先得到链表长度 len，再将遍历len-k即可得到
     * 
     * 另一种思路：空间换时间：建立一个长度为K的指针数组points points[k]指向head后第k个节点 然后一次遍历将数组指针整体后移
     * 直到points[k].next==null 此时points[0]即为倒数第k节点 空间O(k) 时间O(nk+k^2)
     * 
     * 快慢指针：利用两个指针每次跳的步数差查找到节点
     * 
     * @param list
     * @param K
     * @return 找到的节点 或 head(链表为空或K超出范围时)
     */
    HeroNode reciprocalKNode(singleLinkedList list, int K) {
        int length = list.length();
        if (K <= 0 || K > length) {
            System.out.println("K值不合法");
            return list.head;
        } else if (list.isEmpty()) {
            System.out.println("链表为空");
            return list.head;
        }
        int size = length - K;
        HeroNode temp = list.head.next;
        for (int i = 0; i < size; i++) {
            temp = temp.next;
        }
        return temp;
    }

    HeroNode reciprocalKNode_QSpoints(singleLinkedList list, int K) {
        if (list.isEmpty()) {
            System.out.println("链表为空！");
            return list.head;
        }
        HeroNode fast = list.head;
        HeroNode slow = list.head;
        for (int i = 0; i < K - 1; i++) {
            fast = fast.next;
        }
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        return slow.next;
    }

    /**
     * 单链表反转：
     * 
     * 头插法解决，定义一个reverseHead 遍历原来的链表，将遍历到的节点取出头插到reverseHead后
     * 最后head.next=recerseHead.next
     * 
     * 
     * @param list
     * @param list.head   原本的头节点
     * @param reversehead 反转链表的头节点
     * @return 反转后的链表头节点
     */
    singleLinkedList reverseLinkedList(singleLinkedList list) {
        if (list.isEmpty()) {
            System.out.println("链表为空");
            return list;
        }
        if (list.head.next.next == null) {
            System.out.println("链表只有一个节点无需反转");
            return list;
        }
        HeroNode reversehead = new HeroNode();
        HeroNode temp = list.head.next; // 指向当前节点
        while (temp != null) {
            list.head.next = temp.next; // 使用head.next 作为 当前节点的下一个节点
            temp.next = reversehead.next;
            reversehead.next = temp;
            temp = list.head.next;
        }
        list.head.next = reversehead.next;
        return list;
    }

    /**
     * 从尾到头打印单链表
     * 
     * 方法一：反转链表后再打印 (会破坏原来单链表结构)
     * 
     * 方法二：使用Stack(栈)来打印
     * 
     * @param list
     */
    void printList_Reverse(singleLinkedList list) {
        // reverseLinkedList(list).viewList(); // 方法一

        // 方法二
        if (list.head.next == null) {
            System.out.println("链表为空");
            return;
        }

        Stack<HeroNode> stack = new Stack();
        HeroNode temp = list.head.next;
        while (temp != null) {
            stack.push(temp);
            temp = temp.next;
        }
        while (stack.size() > 0) {
            System.out.println(stack.pop().toString());
        }
        return;
    }

    /**
     * 将两个链表合并 合并后的链表依然有序
     * 
     * 思路：首先，我们设定一个哨兵节点 out_list.head ，这可以在最后让我们比较容易地返回合并后的链表。
     * 
     * 我们维护一个 temp 指针，我们需要做的是调整它的 next 指针指向的位置。
     * 
     * 使用l1，l2指针来指向当前两链表中待比较节点。
     * 
     * 然后，我们重复比较和l1，l2指针滑动过程，直到 l1 或者 l2 指向了 null ：
     * 
     * 如果 l1 当前节点的值小于等于 l2 ，我们就把 l1 当前的节点接在 temp 节点的后面同时将 l1 指针往后移一位。
     * 
     * 否则，我们对 l2 做同样的操作。
     * 
     * 不管我们将哪一个元素接在了后面，我们都需要把 prev 向后移一位。
     * 
     * 在循环终止的时候， l1 和 l2 至多有一个是非空的。
     * 
     * 由于输入的两个链表都是有序的，
     * 
     * 所以不管哪个链表是非空的，它包含的所有元素都比前面已经合并链表中的所有元素都要大。
     * 
     * 这意味着我们只需要简单地将非空链表接在合并链表的后面，并返回合并链表即可。
     * 
     * @param list1
     * @param list2
     * @return
     */
    singleLinkedList concatList(singleLinkedList list1, singleLinkedList list2) {
        singleLinkedList out_list = new singleLinkedList();

        HeroNode temp = out_list.head;

        HeroNode l1 = list1.head.next; // 指向list1的第一个节点
        HeroNode l2 = list2.head.next; // 指向list2的第一个节点

        // 只要两个指针有一个为null 就可以认为有一个链表合并结束了
        while (l1 != null && l2 != null) {
            if (l1.no < l2.no) {
                temp.next = l1;
                l1 = l1.next;
            } else {
                temp.next = l2;
                l2 = l2.next;
            }
            temp = temp.next;// temp向后移动方便后续插入 （尾插法）
        }
        // 此时判断l1 和 l2 那个是空的 将非空的全部接在后面
        temp.next = (l1 == null) ? l2 : l1;
        return out_list;
    }

    public static void main(String[] args) {

    }
}
