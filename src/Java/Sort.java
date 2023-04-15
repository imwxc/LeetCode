import java.util.Arrays;
import java.util.Date;
import java.util.function.Consumer;
public class Sort {
    /**
     * 内部排序:将数据加载到内存中全部排序
     * 插入（直接插入，希尔排序），选择（简单选择，堆排序），交换（冒泡，快排），归并，基数
     */

     /**
      * 外部排序：数据太多一次加载不进去，分多次加载
      */
    
      /**
       * 时间频度：算法中语句的执行次数和花费时间成正比，忽略常数项，忽略低次项，忽略系数
       * 时间复杂度：用T(n)表示基本操作语句的执行次数，f(n)表示lim{n->∞}(T(n)/f(n))=C 的辅助函数
       * 将T(n)=O(f(n))记为时间复杂度
       * 
       * 常见时间复杂度：O(1) < O(logn) < O(n) < O(nlogn) < O(n^2) < O(n^3) < O(n^k) < O(2^n) < O(n!) < O(n^n)
       * 
       * 常见排序的时间复杂度：
       * -----------------------------------------------------------------
       * 排序法  |   平均时间  |  最差时间  |  稳定度  |  额外空间  |  备注  |
       * -----------------------------------------------------------------
       * 冒泡    |   O(n^2)   |   O(n^2)  |  稳定    |    O(1)   |  n小时较好
       * -----------------------------------------------------------------
       * 交换    |   O(n^2)   |   O(n^2)  |  不稳定  |    O(1)   |  n小时较好
       * -----------------------------------------------------------------
       * 选择    |   O(n^2)   |   O(n^2)  |  不稳定  |    O(1)   |  n小时较好
       * -----------------------------------------------------------------
       * 插入    |   O(n^2)   |   O(n^2)  |  稳定    |    O(1)   |大部分已排序时较好
       * -----------------------------------------------------------------
       * 基数    | O(log_R^B) | O(log_R^B)|  稳定    |    O(n)   |B为真数，R为基数   
       * -----------------------------------------------------------------
       * 希尔    | O(nlogn)   |O(n^k) 1<k<2|  不稳定 |   O(1)    | k为所选分组
       * -----------------------------------------------------------------
       * 快排    | O(nlogn)   |  O(n^2)   |  不稳定  | O(nlogn)  | n大时较好 
       * -----------------------------------------------------------------
       * 归并    | O(nlogn)   | O(nlogn)  |   稳定   |    O(1)   | n大时较好
       * ----------------------------------------------------------------- 
       * 堆排    | O(nlogn)   | O(nlogn)  | 不稳定   |    O(1)   | n大时较好 
       * -----------------------------------------------------------------
       * 
       */
    public void swap(int[] sort,int i,int j) {
        int temp = sort[i];
        sort[i] = sort[j];
        sort[j] = temp;
        return;
    }
    public void print_sort(int[] sort) {
        System.out.println(Arrays.toString(sort));
    }
    public static void sort_time(Consumer<int[]> c,Object o){
        int[] arr=new int[800000];
        for(int i=0;i<arr.length;i++){
            arr[i] =(int)(Math.random()*800000);
        }
        long data1=System.currentTimeMillis();
        c.accept(arr);
        long data2=System.currentTimeMillis();
        System.out.println(o.getClass().getName()+"的排序时间为："+(data2-data1));
    }
    public static void BubbleSort(int[] sort,boolean sort_time){
        BubbleSort bs= new BubbleSort();
        bs.Sort(sort);
        if(sort_time){
            bs.show=!sort_time;
            sort_time(bs::Sort,bs);
        }
    }
    public static void SelectSort(int[] sort,boolean sort_time){
        SelectSort ss= new SelectSort();
        ss.Sort(sort);
        if(sort_time){
            ss.show=!sort_time;
            sort_time(ss::Sort,ss);
        }
    }
    public static void InsertSort(int[] sort,boolean sort_time){
        InsertSort ss= new InsertSort();
        ss.Sort(sort);
        if(sort_time){
            ss.show=!sort_time;
            sort_time(ss::Sort,ss);
        }

    }
    public static void ShellSort(int[] sort,boolean sort_time) {
        ShellSort ss= new ShellSort();
        // ss.Sort_swap(sort);
        ss.Sort_insert(sort);
        
    }
    public static void QuickSort(int[] sort,boolean sort_time) {
        QuickSort ss= new QuickSort();
        ss.Sort(sort);
    }
    public static void main(String[] args){
        // int sort[] = {3,9,-1,10,-2};
        int sort[]={8,9,1,7,2,3,5,4,6,0};
        int sort1[]={-2,-1,3,9,10};
        int sort2[]={0,3,5,7,8,5,2,5,3,4,7};
        boolean sort_time=true;
        // BubbleSort(sort,sort_time);//  1058943
        // SelectSort(sort,sort_time); 111816
        // InsertSort(sort, sort_time);
        // ShellSort(sort, sort_time);
        QuickSort(sort, sort_time);
    }
}
class BubbleSort extends Sort{
    /**
     * 通过对待排序序列从前向后依此比较相邻元素，逆序则交换，使值较大（小）逐渐向后移
     * 设置flag来判断元素是否有交换，减少不必要的比较
     */
    boolean show=true;
    BubbleSort(){
        super();
    }
    /**
     * 1.一共进行n-1次大循环
     * 2.每趟排序的比较次数减少
     * 3.在某趟排序中若无交换则提前结束
     */
    public void Sort(int[] sort){
        boolean flag = false; //判断是否有交换数字，若无交换，则为true
        for(int j=1; j<=sort.length-1;j++){//j 代表将第j大的数放在最后
            flag=true;
            for(int i=0;i<sort.length-j;i++){ // n-j 次大循环
                if(sort[i]>sort[i+1]){//前面的数比后面的数大，就交换
                    swap(sort,i,i+1);
                    flag = false;
                }
            }
            if(this.show){
                print_sort(sort);
            }
            if(flag){
                return;
            }
        }
    }
}
class SelectSort extends Sort{
    /**
     * 遍历n-1次，每次取sort[i]-sort[n-1]中的最小值和sort[i]交换
     * 
     * 就是每次将数组未排序的部分中的最小值放到未排序部分的最前面
     * 
     * 需要用for来查找最小值
     */
    boolean show;
    SelectSort(){
        super();
        this.show = true;
    }
    public void Sort(int[] sort) {
        for(int i=0;i<sort.length-1;i++){// 从 0 -> n-1 中选取最小进行排序
            int temp = i;
            for(int j=i;j<sort.length;j++){
                // j=i 是选取i-n-1 中的第一个元素，因为sort[i-1]已经是最小值
                if(sort[temp]>sort[j]){
                    temp = j;
                }
            }
            if(temp==i){
                print_sort(sort);
                return;
            }
            swap(sort, i, temp);
            if(this.show){
                print_sort(sort);
            }
        }
    }
}
class InsertSort extends Sort{
    boolean show;
    InsertSort(){
        super();
        this.show = true;
    }
    /**
     * 对欲排序的元素以插入的方式来找到其位置
     * 
     * 思想：将n个待排序的元素看为一个有序表和一个无序表，
     *      开始时无序表中有n-1个元素，有序表中有n个元素，
     *      排序时每次将无序表中的第一个元素取出，将其排序码与有序表中排序码比较，插入到适当位置
     * @param sort
     */
    public void Sort(int[] sort) {
        print_sort(sort);
        for(int i=1; i<sort.length; i++){ //sort[i] 到 sort[n] 为无序表
            int temp=sort[i];// 待插入的数
            boolean flag=true; // 如果没有移动就跳出 且不显示移动过程
            int j; // 遍历有序表并记录空出的位置
            for(j=i;j>0 && sort[j-1]>temp;j--){//sort[j-1] 到 sort[0] 为有序表
                sort[j] = sort[j-1];// 将有序表中大于temp的数字向后移动
                flag=false;
            }
            sort[j] =temp;//将temp插入到空出的位置
            if(flag){
                continue;
            }
            if(this.show){
                print_sort(sort);
            }
        }
    }
}
class ShellSort extends Sort{
    boolean show;
    ShellSort(){
        super();
        this.show =true;
    }

    /**
     * 将记录按下表的一定增量进行分组，对每组使用插排，
     * 随着增量的逐渐减少，每组包含的key越来越多，当增量为1时，排序结束
     * 
     * 希尔排序有两种插入方法一种为交换法，一种为移动法
     * @param sort
     */
    public void Sort_swap(int[] sort) {

        //交换法 速度较差
        for(int stride=sort.length/2; stride>0;stride/=2){ // n /=2 为logN  
            for(int i=stride;i<sort.length;i++){ // 这里有n轮交换
                for(int j=i-stride;j>=0;j-=stride){
                    if(sort[j]>sort[j+stride]){
                        swap(sort, j, j+stride);
                    }
                }
            }
            if(this.show){
                print_sort(sort);
            }
        }
    }

    public void Sort_insert(int[] sort){
        //移动法 速度较快，逐步缩小步长
        for(int stride=sort.length/2; stride>0;stride/=2){ // n /=2 为logN 
            //从stride个元素开始对其所在组进行插入排序 
            for(int i=stride;i<sort.length;i++){ // 这里有n轮移动
                int toInsert=i; // 待插入的位置
                int temp=sort[toInsert];// 待插入的值
                if(sort[toInsert]<sort[toInsert-stride]){// 如果子序列中后一个数小于前一个就进行插入操作, toinsert-stride 表示子序列前面的那个数
                    for(;toInsert-stride>=0 && sort[toInsert-stride]>temp;toInsert-=stride){//sort[toInsert-1] 到 sort[0] 为有序表,toinsert-stride=0时，子序列表示子序列有序了
                        sort[toInsert] = sort[toInsert-stride];// 将有序表中大于temp的数字向后移动
                    }
                    sort[toInsert] =temp;//将temp插入到空出的位置
                }
            }
            if(this.show){
                print_sort(sort);
            }
        }
    }
    public void Sort(int[] sort) {
        this.Sort_insert(sort);
    }
}
class QuickSort extends Sort{
    boolean show;
    QuickSort(){
        super();
        this.show=true;
    }
    /**
     * 基本思想：通过一趟排序将要排序的数据分成两部分，一部分中所有数据都比另外一部分的数据要小，
     * 然后再按此方法对这两部分数据分布进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列
     * 
     * 思路分析：
     * 
     * 
     * 
     * 
     * @param sort
     */
    public void sort(int[] sort,int low,int high) {

        int l=low;
        int r=high;

        if(l>r){
            return;
        }
        int  middle=sort[(low+high)/2];
        //将比middle小的值放到左边，将比middle大的值放到右边
        while(l<r){
            //low向右移动，在左边找到一个比基准大的数
            for(;sort[l]<middle;l++){}
            //high向左移动，在右边找到一个比基准小的数
            for(;middle<sort[r];r--){}
            if(l>=r){
                break;
            }
            //找到之后将两数交换
            swap(sort, l, r);
            print_sort(sort);
            //如果有和基数相同的数字存在时，没有下面的移动会导致low，high的位置不再改变形成死循环
            if(sort[l]==middle){//如果交换完毕后发现middle==sort[low]，则high--
                r--;
            }else if(sort[r]==middle){//如果交换完毕后发现middle==sort[high]，则low++
                l++;
            }
        }
        //此时递归对左右子序列进行排序,l==r的时候，表示基数左右排序完毕
        //移动后 l表示右子序列第一个，r表示左子序列最后一个
        if(l==r){
            l++; 
            r--;
        }
        if(low<r){//左边存在没有排序的子序列，就进行递归排序
            sort(sort, low, r);
        }
        if(high>l){//右边存在没有排序的子序列，进行递归排序
            sort(sort, l, high);
        }
        
    }
    public void Sort(int[] sort) {
        print_sort(sort);
        this.sort(sort,0,sort.length-1);
    }
}
class MergeSort extends Sort{
    boolean show;
    MergeSort(){
        super();
        this.show = true;
    }
    /**、
     * 采用分治法策略，将问题分为小问题然后递归求解，然后将小问题求解得到的答案合并到一起
     */
    public void Sort(int[] sort) {
        
    }
    void mergeSort(int[] sort,int i,int j){
        
    }
    /**
     * 
     */
    void merge(int[] sort,int left,int middle,int right){

    }
}