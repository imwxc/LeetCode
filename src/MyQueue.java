package src;

import java.util.Scanner;

public class MyQueue {
    /**
     * 队列：先进先出
     * 
     * int front = -1; // 队列头
     * 
     * int rear=-1; // 队列尾
     * 
     * int MaxSize=10; //队列最大容量
     */
    arrayQueue aq = null;
    roundQueue rq = null;

    public arrayQueue aq() {
        return this.aq;
    }

    public roundQueue rq() {
        return this.rq;
    }

    MyQueue(int MaxSize) {
        this.aq = new arrayQueue(MaxSize);

        this.rq = new roundQueue(MaxSize + 1); // 有一个空位，所以要加一
    }

    public class arrayQueue {
        /**
         * 数组实现队列的方式
         * 
         */

        int front = -1; // 指向队列头得到前一个位置
        int rear = -1; // 指向队列尾
        int MaxSize = 0;
        int queue[] = null;

        public arrayQueue(int MaxSize) {
            this.MaxSize = MaxSize;
            this.queue = new int[MaxSize];
        }

        // 判空
        boolean isEmpty(int rear, int front) {
            if (rear == front) {
                return true;
            }
            return false;
        }

        // 判满
        boolean isFull(int rear, int MaxSize) {
            if (rear == MaxSize - 1) {
                return true;
            }
            return false;
        }

        // 将数据加入队列
        void addQueue(int value) {
            /**
             * 1.将rear后移，rear+1
             * 
             * 2.若rear< MaxSize-1 则无法存入数据
             * 
             */
            // 判满
            if (isFull(this.rear, this.MaxSize)) {
                throw new RuntimeException("队列满！");
            }
            this.rear++;
            this.queue[rear] = value;
        }

        int outQueue() {
            // 判空
            if (isEmpty(this.rear, this.front)) {
                System.out.println("队列空");
            }
            //
            this.front++;
            return this.queue[this.front];
        }

        void viewQueue() {
            if (isEmpty(this.rear, this.front)) {
                System.out.println("队列为空！");
                return;
            }
            for (int i = 0; i < this.queue.length; i++) {
                System.out.printf("arr[%d]=%d\n", i, this.queue[i]);
            }
        }

        int peek() {
            if (isEmpty(this.rear, this.front)) {
                throw new RuntimeException("队列空！");
            }
            return this.queue[front + 1];
        }
    }

    public class roundQueue {
        /**
         * 环形数组，用于解决原来的数组无法回收使用过的位置
         * 
         * 
         * 思路： front=rear=0
         * 
         * 1.判断前面有无空闲空间 --> front指向队列的第一个元素
         * 
         * 2. rear:指向队列最后一个元素 --> 指向队列最后一个元素的后一个位置 (空出一个空间做约定)
         * 
         * 3.队列满的条件改变 rear==MaxSize-1 --> (rear+1)% MaxSize == front 4.队列空的条件不变：
         * rear==front 5.此时队列中数据的个数; (rear+MaxSize-front)% MaxSize
         * 
         */
        int front = 0; // 指向队列头得到前一个位置
        int rear = 0; // 指向队列尾
        int MaxSize = 0;
        int queue[] = null;

        roundQueue(int MaxSize) {
            this.MaxSize = MaxSize;
            this.queue = new int[MaxSize];
        }

        boolean isEmpty() {
            if (this.rear == this.front) {
                return true;
            }
            return false;
        }

        boolean isFull() {
            if ((this.rear + 1) % this.MaxSize == this.front) {
                return true;
            }
            return false;
        }

        void addQueue(int value) {
            if (isFull()) {
                throw new RuntimeException("环队列满！");
            }
            this.queue[this.rear] = value;
            // 将rear后移(由于是环形队列需要考虑取模之后)
            this.rear = (this.rear + 1) % this.MaxSize;
        }

        int outQueue() {
            if (isEmpty()) {
                throw new RuntimeException("环队列空！");
            }
            int resout = this.queue[this.front];
            // 将front后移
            this.front = (this.front + 1) % this.MaxSize;
            return resout;
        }

        public int size() {
            return (this.rear + this.MaxSize - this.front) % this.MaxSize;

        }

        void viewQueue() {
            if (isEmpty()) {
                throw new RuntimeException("环队列为空！");
            }
            // 考虑到是环队列，从front遍历n次(n为队列中元素个数)
            // 由之前可知 n=(rear+MaxSize-front)%MaxSize
            // 将计算个数写为一个函数

            for (int i = this.front; i < this.front + this.size(); i++) {
                System.out.printf("arr[%d]=%d\n", i % this.MaxSize, this.queue[i % this.MaxSize]);
            }

        }

        int peek() {
            if (isEmpty()) {
                throw new RuntimeException("队列空！");
            }
            return this.queue[this.front];
        }
    }

    public static void main(String[] args) {
        int MaxSize = 4;
        MyQueue mq = new MyQueue(MaxSize);
        roundQueue aq = mq.rq();

        char key = ' ';
        Scanner sc = new Scanner(System.in);
        boolean loop = true;
        while (loop) {
            System.out.println("s(show) : 显示队列");
            System.out.println("e(exit) : 退出程序");
            System.out.println("a(add)  : 添加数据");
            System.out.println("g(get)  : 取出队尾数据");
            System.out.println("h(head) : 看队列头");
            key = sc.next().charAt(0);
            switch (key) {
            case 's':
                try {
                    aq.viewQueue();
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
                break;
            case 'a':
                System.out.println("输入数据(int)");
                try {
                    aq.addQueue(sc.nextInt());
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
                break;
            case 'g':
                try {
                    System.out.println("取出数据为： " + aq.outQueue());
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
                break;
            case 'h':
                try {
                    System.out.println("队列头部为： " + aq.peek());
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
                break;
            case 'e':
                sc.close();
                loop = false;
            default:
                break;
            }
        }
    }
}
