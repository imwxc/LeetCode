package src;

import java.util.Scanner;

public class myDoubleLinkedList {
    /**
     * 双向链表，不是双向循环链表
     */
    HeroNode head;
    HeroNode last;

    myDoubleLinkedList() {
        this.head = new HeroNode();
        this.last = this.head;
    }

    boolean isEmpty() {
        return (this.head.next == null) ? true : false;
    }

    /**
     * 头插法
     * 
     * @param child
     * @return
     */
    HeroNode add_onHeadNode(HeroNode child) {
        this.head.next = child;
        child.prev = this.head;
        this.last = child;
        return this.head;
    }

    /**
     * 尾插法
     * 
     * @param child
     * @return
     */
    HeroNode add_onLastNode(HeroNode child) {
        this.last.next = child;
        child.prev = this.last;
        this.last = child;
        return this.head;
    }

    /**
     * 删除节点
     * 
     * @param no
     * @return
     */
    HeroNode delete(int no) {
        HeroNode temp = this.head.next;
        while (temp != null) {
            if (temp.no == no) {
                break;
            }
            temp = temp.next;
        }
        HeroNode pre = temp.prev;
        pre.next = temp.next;
        //考虑 当temp为最后一个节点的时候 temp.next == null
        // 需要加一个判断temp是否为最后一个节点
        if(temp.next!=null){
            temp.next.prev = pre;
        }
        return temp;
    }

    /**
     * 从前向后打印链表
     */
    void viewList_forward() {
        HeroNode temp = this.head.next;
        while (temp != null) {
            System.out.println(temp.toString());
            temp = temp.next;
        }
    }

    /**
     * 从后向前打印链表
     */
    void viewList_backward() {
        HeroNode temp = this.last;
        while (temp.prev != this.head) {
            System.out.println(temp.toString());
            temp = temp.prev;
        }
    }

    /**
     * 按顺序插入节点到链表中
     * 
     * @param node
     * @return
     */
    HeroNode insertByOrder(HeroNode node) {
        HeroNode temp = this.head.next;
        while (temp != null) {
            if (temp.no == node.no) {
                System.out.println("有重复no的节点！");
                return this.head;
            }
            if (temp.no > node.no) { // 找到了要插入的节点
                temp = temp.prev;
                temp.next.prev = node;
                node.next = temp.next;
                node.prev = temp;
                temp.next = node;
                System.out.println("插入成功！");
                return this.head;
            }
            temp = temp.next;
        }
        System.out.println("node 的 no 是最大值，在末尾插入");
        this.add_onLastNode(node);
        return this.head;
    }

    /**
     * 根据新节点的no修改
     */
    void change(HeroNode node) {
        if (isEmpty()) {
            return;
        }
        int no = node.no;
        HeroNode temp = this.head;
        while (no != temp.no && temp.next != null) {
            temp = temp.next;
        }
        if (temp.no == no) {
            temp.name = node.name;
            temp.nickName = node.nickName;
            return;
        } else {
            System.out.println("没找到所需的节点 是否改为插入？ ( y /n )");
            char key = new Scanner(System.in).next().charAt(0);
            if (key == 'y' || key == 'Y') {
                insertByOrder(node);
            } else {
                return;
            }
        }
    }


    public static void main(String[] args) {
        System.out.println("双向链表测试");
        HeroNode hero1 = new HeroNode(1,"宋江","及时雨");
        HeroNode hero2 = new HeroNode(2,"卢俊义","玉麒麟");
        HeroNode hero3 = new HeroNode(3,"吴用","智多星");
        HeroNode hero4 = new HeroNode(4,"林冲","豹子头");
        // HeroNode hero5 = new HeroNode(5,"宋江","及时雨");
        // HeroNode hero6 = new HeroNode(6,"宋江","及时雨");
        // HeroNode hero7 = new HeroNode(7,"宋江","及时雨");

        myDoubleLinkedList list = new myDoubleLinkedList();
        list.add_onLastNode(hero1);
        list.add_onLastNode(hero2);
        list.add_onLastNode(hero3);
        list.add_onLastNode(hero4);

        list.viewList_forward();

        // list.change(new HeroNode(4,"公孙胜","入云龙"));
        // System.out.println("修改后的链表");
        // list.viewList_forward();
        list.delete(3);
        System.out.println("删除后的链表情况");
        list.viewList_forward();

    }
}
