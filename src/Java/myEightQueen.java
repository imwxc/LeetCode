public class myEightQueen {
    /**
     * (游戏:八皇后）
     * 经典的八皇后难题是要将八个皇后放在棋盘上，
     * 任何两个皇后都不能互相攻击
     * （即没有两个皇后是在同一行、同一列或者同一对角上)。
     * 
     * 
     * 1.首先第一个皇后在（1，1）
     * 2.第二个皇后在（2，1）判断，false就移位置 直到有一个true
     * 3.第三个皇后-第8个皇后依此类推，直到有一个正确解
     * 4.当有一个正解的时候，在递归回退的时候会得到所有正解，这是一个摆放方式
     * 5.将第一个皇后放在其他位置，获得所有摆放方式。
     * 
     * 可以利用一个一维数组就解决问题,
     * 数组下标代表行和第几个皇后，数组内容代表列（利用了任意两个皇后不能同一行同一列）
     */
    
    public static void main(String[] args){
        myEightQueen q8= new myEightQueen();
        q8.check(0);
        System.out.printf("一共有%d种解法\n",q8.count);
        System.out.printf("一共判断了%d次\n",q8.judge_count);
    }
    int max;
    static int count=0;
    static int judge_count=0;
    int queens[]; //保存最后皇后放置的位置


    myEightQueen(int max){
        this.max =max;
        this.queens=new int[max];
    }
    myEightQueen(){
        this.max=8;
        this.queens=new int[max];

    }
    
    /**
     * 将皇后摆放的位置打印
     */
    public void show_result(){
        this.count++;
        for(int i=0;i<this.queens.length;i++){
            System.out.printf(queens[i]+" ");
        }
        System.out.println("\n================");
     }
     /**
      * 检查皇后放置的位置是否冲突,n 表示第n个皇后
      * queens[i]==queens[n] 判断第n个皇后是否和前面n-1个皇后在同一列
      * abs(n-i)==abs(queens[n]-queens[i]) 判断是否在同一斜线上 
      * 二者连线为45度或135度时，x轴间距==y轴间距 n-i 为行差 queens[n]-queens[i] 为列差
      * @param n 表示第n个皇后
      */
     boolean checkPoision(int n){
         for(int i=0;i<n;i++){// n 行数一直递增，所以无需判断是否在同一行
             if(queens[i]==queens[n] || Math.abs(n-i)==Math.abs(queens[n]-queens[i])){
                 this.judge_count++;
                return false;
             }
         }
         this.judge_count++;
         return true;
     }
     /**
      * 放置第n个皇后,每次递归进入check(n)的时候都会有一个for循环，
      * 所以在遍历的时候会通过for来讲所有的情况都递归到
      * @param n
      */
     void check(int n){
         if(n==max){//n==8的时候皇后都放好了
            show_result();
            return;
         }else{
             for(int i=0;i<max;i++){
                 queens[n]=i;
                 if(checkPoision(n)){//不冲突就放置n+1个皇后
                    check(n+1);
                 }
                //如果冲突继续执行循环，将皇后放置在本行的后一个位置
             }
         }
     }
}
