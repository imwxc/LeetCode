public class myEightQueen {
    public static void main(String[] args){
        
    }
    int max;

    int queens[]; //保存最后皇后放置的位置


    myEightQueen(int max){
        this.max =max;
        queens=new int[max];
    }
    myEightQueen(){
        this.max=8;
        this.queens=new int[max];

    }
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

     public void show_result(){

     }
}
