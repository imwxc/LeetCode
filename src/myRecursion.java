import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class myRecursion {
    /** 
     * 递归：
     * 方法自己调用自己，每次调用时传入不同的变量
     * 
     * 用途：八皇后，汉诺塔，阶乘，迷宫，球和篮子
     *      快排，归排，二分查，分治
     *      用栈解决的问题
     * 
     * 递归调用规则：
     * 当程序执行到一个方法时会开辟一个独立空间(栈)，空间内的变量暂时独立
     * 当递归栈内的没有方法时，会停止开辟递归栈，转而后续处理，处理完之后会返回上一个递归栈继续执行方法之后的代码
     * 依此类推直到所有递归栈执行完毕，（内存消耗较高）
     * 
     * 
     * 递归的使用规则：
     * 1）执行一个方法会创建一个独立空间
     * 2）方法的局部变量是独立的，不会互相影响
     * 3）如果方法中使用引用类型变量，会共享该引用类型的数据，因为指向了相同的内存空间
     * 4）递归必须向退出递归的条件（包含方法的if条件）逼近，否则会无限递归然后OOM
     * 5）当一个方法执行完毕，或者遇到return就会返回，遵循谁调用就返回给谁。
     * 
     * JVM 分为栈空间（方法使用），堆空间，代码区
    */
    public static void main(String[] args){
        Maze m =new Maze();
        m.show_map();
        System.out.println("--------------------------------------------\n");
        m.find_path_and_show_map();
        System.out.println("--------------------------------------------\n");
    }
}
class Maze extends myRecursion{
    int map[][]=new int[10][10]; // 模拟迷宫
    int wall=1;
    int path=2;
    int no_path=3;
    int empty=0;
    // 起点为（1，1），终点为（1，8）
    int start[]={1,1};
    int ending[]={8,1};
    List<Stack<Integer>> strategies;
    int rewards[];
    int meet_wall[];
    Maze(){
        super();
        
        init_map();
        // map[1][8]=wall;
    }

    //初始化墙壁，第0行，第0列，最后一列，最后一行是四个围墙
    //在第2行留出最后两列，在第4行留出前两列，在第6行留出最后两列
    void init_map(){
        for(int i=0;i<10;i++){ // i 为行
            for(int j=0;j<10;j++){ //j 为列
                if(i==0 || i==9){
                    map[i][j]=wall;
                }else if(j==0 || j==9){
                    map[i][j]=wall;
                }else if(i==2&&j<8){
                    map[i][j]=wall;
                }else if(i==4){
                    if(j>2){map[i][j]=wall;}
                }else if(i==6&&j<8){
                    map[i][j]=1;
                }else if(i==8){
                    if(j>2&&j<7){map[i][j]=wall;}
                }else{
                    map[i][j]=empty;
                }
            }
        }
    }

    public void show_map(){
        for(int i=0;i<10;i++){
            for(int j=0;j<10;j++){
                if(map[i][j]==no_path){
                    map[i][j]=empty;
                }
                System.out.printf(" "+map[i][j]);
            }
            System.out.println("\n");
        }
    }
    /**
     * 如果能到map[1][8]则找到，
     * 当map[i][j]==0 则没有走过，
     *   map[i][j]==1 为墙
     *   map[i][j]==2 为通路
     *   map[i][j]==3 为走过但是走不通
     * 
     * 策略：确定先向下，再向右，再向左，最后向上，走不通再回溯
     * @param map 地图
     * @param start  开始的位置
     * @return 找到通路返回true 没有找到返回false
     */
    public boolean find_path(int map[][],int i,int j){
        if(map[this.ending[0]][this.ending[1]]==path){//终点走到了 退出回溯
            System.out.println("走完了");
            return true;
        }else{
            if(map[i][j]==0){ // 没有走过
                map[i][j]=path;//假定可以走通
                if(find_path(map,i+1,j)){//向下走一部
                    System.out.printf("向（%d，%d）走\n",i+1,j);
                    return true;
                }else if(find_path(map,i,j+1)){ //  向右走
                    System.out.printf("向（%d，%d）走\n",i,j+1);
                    return true;
                }else if(find_path(map,i,j-1)){ // 向左走
                    System.out.printf("向（%d，%d）走\n",i,j-1);
                    return true;
                }else if(find_path(map,i-1,j)){ // 向上走
                    System.out.printf("向（%d，%d）走\n",i-1,j);
                    return true;
                }else{//此路不通
                    map[i][j]=no_path;
                    return false;
                }
            }else{// map[i][j]!=0 时可能为通路 2 ，或者是墙壁 1 ，或者是死路 3
                // show_map();
                // System.out.println("--------------------------------------------\n");
                return false;
            }
        }
    }
    public void find_path_and_show_map(){
        this.find_path(map, start[0], start[1]);
        boolean flag =true;
        if(map[ending[0]][ending[1]]==empty){
            System.out.println("没有通路");
            flag=false;
        }
        this.show_end_map(flag);
    }
    public void show_end_map(boolean flag){
        for(int i=0;i<10;i++){
            for(int j=0;j<10;j++){
                if(map[i][j]==wall || (flag?map[i][j]==no_path:flag)){
                    map[i][j]=empty;
                }
                System.out.printf(" "+map[i][j]);
            }
            System.out.println("\n");
        }
    }
    /**
     * 递归获取n个数字全排列
     * @param array
     * @param stack
     */
    public void perm(int[] array, Stack<Integer> stack) {
        this.strategies = new ArrayList();
        if(array.length <= 0) {
        	//进入了叶子节点，输出栈中内容
            System.out.println(stack);
            this.strategies.add(stack);
        } else {
            for (int i = 0; i < array.length; i++) {
            	//tmepArray是一个临时数组，用于就是Ri
            	//eg：1，2，3的全排列，先取出1，那么这时tempArray中就是2，3
                int[] tempArray = new int[array.length-1];
                System.arraycopy(array,0,tempArray,0,i);
                System.arraycopy(array,i+1,tempArray,i,array.length-i-1);
                stack.push(array[i]);
                perm(tempArray,stack);
                stack.pop();
            }
        }
    }

}
