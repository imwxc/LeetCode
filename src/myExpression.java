package src;

import java.util.ArrayList;
import java.util.List;

public class myExpression {
    /***
     * 前缀表达式：一个表达式二叉树的先序遍历得到的表达式：其运算符位于数字之前
     * 前缀表达式的计算： 从右到左扫描（反向扫描相当于后缀表达式），
     *                  遇到数字将其push，遇到运算符弹出两个数运算后入栈
     *                  重复直到最左端
     */

     /**
      * 后缀表达式：前缀表达式的反转：运算符位于操作数之后
      * 后缀表达式的计算：从左到右，遇到数字将其push，遇到运算符弹出两个数运算后入栈
      *                 重复直到最👉端
      */
    public static void main(String[] args){
        //为了方便 将数
        String reversePolish="3 4 + 5 * 6 -";
        ReversePolish myReversePolish=new ReversePolish(reversePolish);
        System.out.println(""+myReversePolish.getResult());
    }

}
class ReversePolish{
    /**
     * 输入逆波兰表达式，使用Stack计算
     * 
     * 支持小括号的多位整数
     * 
     * 从左到右，遇到数字将其push，遇到运算符弹出两个数运算后入栈，重复直到最👉端
     * 
     * 将字符串放到ArrayList中，然后遍历ArrayList 配合 栈完成计算
     */
    int result;
    String expression;
    List<String> list;
    public ReversePolish(String expression){
        this.expression = expression;
        this.result =0;
        this.list=new ArrayList();
        for(String str:expression.split(" ")){
            list.add(str);
        }
    }
    public int getResult(){
        myStack stack=new myStack(this.list.size());
        for(String item:this.list){
            if(item.matches("\\d+")){
                stack.push(Integer.parseInt(item));
            }else{
                int num2=stack.pop_int();
                int num1=stack.pop_int();
                int oper=item.charAt(0);
                int result=0;
                result=calculate(num1,num2,oper);
                stack.push(result);
            }
        }
        this.result=stack.pop_int();
        return this.result;
    }
    public String getReversePolish(String expression){
        return " ";
    }
    public int calculate(int num1,int num2,int oper){
        int result = 0;
        switch(oper){
            case '+':
                result=num2+num1;
                break;
            case '-':
                result=num2-num1;
                break;
            case '*':
                result=num2*num1;
                break;
            case '/':
            try{
                result=num2/num1;
            }
            catch(Exception e){
                System.out.println(e.getMessage());
            }
                break;
            default:
                break;
        }
        return result;
    }
}