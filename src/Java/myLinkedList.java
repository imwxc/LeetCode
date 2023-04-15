

import java.util.Scanner;

public class myLinkedList {
    /**
     * 链表在内存中以数组的形式存在(物理结构)，其逻辑结构为链式连续
     * 
     * 
     * 其分为data和next data存储数据，next保存下一个节点的地址，
     * 
     * 链表各节点可以非连续存储
     * 
     * 链表分为带头节点和不带头节点的
     */
    singleLinkedList slist = null;

    myLinkedList() {
        slist = new singleLinkedList();
    }

    void viewList(HeroNode head) {
        if (head.next != null) {
            HeroNode h = head;
            while (h != null) {
                System.out.println(h.toString());
                h = h.next;
            }
        } else {
            System.out.println("链表为空");
            return;
        }
    }

    public singleLinkedList singleLinkedList() {
        return this.slist;
    }

    public static void main(String[] args) {
        singleLinkedList slist = new myLinkedList().singleLinkedList();
        slist.add(new HeroNode(1, "Tom", "T"));
        slist.add(new HeroNode(2, "Jerry", "J"));
        slist.add(new HeroNode(3, "Mary", "M"));
        slist.add(new HeroNode(4, "John", "J"));
        boolean flag = true;
        char key = ' ';
        Scanner sc = new Scanner(System.in);
        while (flag) {
            System.out.println("v(view)   : 显示队列");
            System.out.println("e(exit)   : 退出程序");
            System.out.println("a(add)    : 添加数据");
            System.out.println("g(get)    : 取出指定节点");
            System.out.println("s(search) : 根据名字查找");
            System.out.println("i(insert) : 插入节点");
            key = sc.next().charAt(0);
            switch (key) {
            case 'v':
                try {
                    slist.viewList();
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
                break;
            case 'a':
                System.out.println("输入人物(no,name,nickName)");
                try {
                    slist.add(new HeroNode(sc.nextInt(), sc.nextLine(), sc.nextLine()));
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
                break;
            case 'g':
                try {
                    System.out.println("输入要删除的节点no");
                    System.out.println(slist.pop(sc.nextInt()).toString());
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
                break;
            case 'i':
                try {
                    System.out.println("输入人物(no,name,nickName)");
                    slist.insert(new HeroNode(sc.nextInt(), sc.nextLine(), sc.nextLine()));
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
            case 'e':
                sc.close();
                flag = false;
            default:
                break;
            }
        }
        // slist.search(no, "name");
        // slist.search(no, "nickName");
    }
}


class singleLinkedList {
    /**
     * 头节点不存储数据，表示单链表的头
     */
    HeroNode head = null; // 所有使用head的方法中 都需要用辅助变量来替代head
    HeroNode last = null;

    singleLinkedList() {
        init();
    }

    private void init() {
        this.head = new HeroNode(); // 创建头节点，表示单链表的头
        this.last = this.head.next;
    }

    /**
     * 添加一个新节点在最后 尾插法
     * 
     * @param node
     */
    void add(HeroNode node) {
        HeroNode newHero = node;
        if (isEmpty()) {
            this.head.next = newHero;
            this.last = this.head.next;
        } else {
            this.last.next = newHero;
            this.last=this.last.next;
        }
    }

    /**
     * 头插法（不保证节点按照no进行排序）
     * 
     * @param node
     */
    void addHead(HeroNode node) {
        node.next = this.head.next;
        this.head.next = node;
    }

    /**
     * 根据no关键词搜索
     * 
     * @param no
     * @return
     */
    HeroNode search(int no) {
        HeroNode h = this.head;
        while (h.next != null) {
            if (h.no == no) {
                return h;
            }
        }
        if (h.no == no) {
            return h;
        } else {
            System.out.println("找不到no为" + no + "的Hero");
        }
        return null;
    }

    /**
     * 根据name关键词搜索
     * 
     * @param no
     * @param type
     * @return
     */
    HeroNode search(String no, String type) {
        if (type == null) {
            type = "name";
        }
        if (type == "name") {
            HeroNode h = this.head;
            while (h.next != null) {
                if (h.name == no) {
                    return h;
                }
            }
            if (h.name == no) {
                return h;
            } else {
                System.out.println("找不到name为" + no + "的Hero");
            }
            return null;
        } else if (type == "nickName") {
            HeroNode h = this.head;
            while (h.next != null) {
                if (h.nickName == no) {
                    return h;
                }
            }
            if (h.nickName == no) {
                return h;
            } else {
                System.out.println("找不到nickName为" + no + "的Hero");
            }
            return null;
        }
        return null;
    }

    boolean isEmpty() {
        return (this.head.next == null) ? true : false;
    }

    void viewList() {
        if (!isEmpty()) {
            HeroNode temp = this.head.next;
            while (temp != this.last) {
                System.out.println(temp.toString());
                temp = temp.next;
            }
            System.out.println(temp.toString());
        } else {
            System.out.println("链表为空");
            return;
        }
    }

    /**
     * 按照no由小到大顺序插入
     * 
     * @param new_hero
     * @return
     */
    HeroNode insert(HeroNode new_hero) {
        HeroNode temp = this.head;
        if (isEmpty()) {
            return this.head;
        }
        // temp 指向插入位置的前一个节点
        // boolean flag = false; // 添加的节点编号如果存在就为true
        while (temp.next.no < new_hero.no && temp.next != null) {
            temp = temp.next;
        }
        if (temp.next == null) {
            temp.next = new_hero;
        } else {
            new_hero.next = temp.next;
            temp.next = new_hero;
        }
        return this.head;
    }

    HeroNode pop(int no) {
        if (!isEmpty()) {
            HeroNode temp = this.head;
            boolean flag = false;
            while (!flag) {
                if (temp.no == no) {
                    flag = true;
                    break;
                }
                temp = temp.next;
            }
        } else {
            System.out.println("链表为空");
        }
        return this.head;
    }

    HeroNode delte(HeroNode target) {
        if (isEmpty()) {
            System.out.println("链表为空！");
            return this.head;
        } else {
            HeroNode temp = this.head;
            while (temp.next != target) {
                temp = temp.next;
            }
            temp.next = target.next; // 将被删节点的前一个节点的next设置为被删节点的next
        }
        return target;
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
                insert(node);
            } else {
                return;
            }
        }
    }

    int length() {
        HeroNode temp = this.head.next;
        // 空链表返回0
        if (isEmpty()) {
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
}