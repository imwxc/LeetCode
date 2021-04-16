
public class myRecursion {
    /** 
     * 递归：
     * 方法自己调用自己，每次调用时传入不同的变量
    */
    public static void main(String[] args){
        test(4);
    }
    public static void test(int n){
        if(n>2){
            test(n-1);
        }
        System.out.println("n="+n);
    }
}
