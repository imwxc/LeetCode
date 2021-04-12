package src;


public class Josephu{

    int num,k,m;

    mySingleCircleList list;

    singleLinkedList Josephu_list;

    Josephu(int n ,int k ,int m){
        //用for 来创建 n 人的环形链表
        this.num = n;
        this.k = k;
        this.m = m;
        if(paramCheck(n,k,m)){
            // 创建链表
            list=creatList();
            Josephu_list=new singleLinkedList();
        }else{
            throw new IllegalStateException("请检查输入的参数！");
        }
    }
    Josephu(){}

    boolean paramCheck(int n, int k, int m){
        if(n<1){return false;}
        if(m<1){return false;}
        if(k<1 || k>n){return false;}
        return true;
    }
    mySingleCircleList creatList(){
        mySingleCircleList tempList=new mySingleCircleList();
        for(int i=1;i<=num;i++){
            tempList.addNode(new HeroNode(i,"",""));
        }
        return tempList;
    }
    void view_Orign(){
        this.list.view_list();
    }
    void view_Josephu(){
        getJosephu();
        this.Josephu_list.viewList();

    }
    /**
     * 报数前要将cur 和 pre 移动到 第k，k-1 个人的地方
     * @return 返回一个josephu 编号数组
     */
    void getJosephu(){
        HeroNode cur=list.firstNode; // 当前的
        HeroNode pre=list.lastNode;
        //报数前
        for (int i=1;i<k;i++){
            cur=cur.next;
            pre=pre.next;
        }
        //开始报数时 将 cur和pre 同时移动 m-1 次 然后出圈 直到圈中只有一个节点
        while(cur!=pre){
            for(int i=1;i<m;i++){
                cur=cur.next;
                pre=pre.next;
            }

            //手动删除不加入list的逻辑为:
            // System.out.println(cur.toString());
            // cur=cur.next;
            // pre.next = cur;
            // System.out.println("");


            
            this.Josephu_list.add(list.deleteNode(pre));
            //不知道为什么这里的cur在方法return的时候变为了原来的值 所以需要next一下
            cur=cur.next;


        }
        this.Josephu_list.add(list.firstNode);
        // System.out.println(cur.toString());
    }


    public static void main(String[] args){
        /**
         * 约瑟夫环问题：
         * 
         * 设编号为1-n的n个人围成一圈 ，约定编号为 K 的人从1开始报数，
         * 数到 M 的那个人出列，依此类推直到所有人出列为止。由此产生一个出队编号的序列
         * 
         * tips：使用一个不带头节点的循环链表，
         * 从K 计数 M 次 然后出链表，记录编号
         * 
         */

        //  System.out.println("请输入n：");
        //  Scanner sc=new Scanner(System.in);
        //  int n=sc.nextInt();
        //  System.out.println("请输入K");
        //  int k =sc.nextInt();
        //  System.out.println("请输入 M");
        //  int m =sc.nextInt();

        Josephu myJosephu=null;
        try {
            // myJosephu=new Josephu(n,k,m);
            myJosephu =new Josephu(5,1,2);
        } catch (Exception e) {
            //TODO: handle exception
            System.out.println(e.getMessage());
        }
        myJosephu.view_Orign();
        System.out.println("得到的Josephu结果为");
        myJosephu.view_Josephu();
        

    }
}
