package src;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

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
        // String reversePolish="3 4 + 5 * 6 -";
        // ReversePolish myReversePolish=new ReversePolish(reversePolish);

        // System.out.println("\n"+reversePolish+" = "+myReversePolish.getResult());
        String expression="1+((2+3)*4)-5";
        System.out.println(expression+" = "+new ReversePolish_Calculator(expression).getResult());
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
    public ReversePolish(List<String> expression){
        this.expression = expression.toString();
        this.result =0;
        this.list=expression;
    }
    String expList_to_String(List<String> list){
        String res="";
        for(String str:list){
            res+=" "+str;
        }
        return res;
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

class ReversePolish_Calculator{
    ReversePolish rp;
    int result;
    ReversePolish_Calculator(String expression){
        rp = new ReversePolish(toReversePolish(expression));
        result=rp.getResult();
    }
    public int getResult() {
        return this.result;
    }
    /**
     * 中缀表达式转为后缀表达式
     * 为了遍历方便，将字符串变成对应的List
     *  
     * 1.初始化两个栈 s1存储运算符，s2存储中间结果
     * 2，从左到右扫描，遇到操作数时压入s2，
     *                 遇到运算符的时候比较与s1栈顶优先级，s1为空或栈顶为(时直接入栈
     *                      若优先级比栈顶高，直接压入
     *                      否则，将栈顶弹出压入s2，然后重新进行与新栈顶进行运算符比较
     * 3.遇到括号时：（直接入栈，
     *               ）需要依此弹出s2栈顶后压入s2直到遇到左括号位置，此时这一对括号丢弃
     * 4.重复上述步骤，直到扫描完毕，将s1中剩余的运算符都压入s2，将s2中依次pop 结果的逆序即为后缀
     * @param expression
     * @return
     */
    public String toReversePolish(String expression) {
        List<String> strList=toInfixExpressionList(expression);
        Stack<String> s1=new Stack();
        Stack<String> s2=new Stack();
        
        String result="";
        for(String str : strList){
            if(isOper(str)){ // 如果是运算符, 进行操作数比较
                operCompare(str, s1, s2);
            }else if(str.charAt(0)=='('){ // 左括号直接入栈
                s1.push(str);
            }else if(str.charAt(0)==')'){ // 右括号s1依次弹出 压入s2 直到遇到左括号为止，此时将这一对括号丢弃
                while(s1.peek().charAt(0)!='('){
                    s2.push(s1.pop());
                }
                if(s1.peek().charAt(0)=='('){
                    s1.pop();
                }
            }else{ // 如果是运算数，直接压入s2
                s2.push(str);
            }
        }
        // 扫描结束后将s1剩余都压入s2
        while(!s1.isEmpty()){
            s2.push(s1.pop());
        }
        String[] resultList=new String[s2.size()];
        for(int i=s2.size()-1;i>=0;i--){
            resultList[i]=s2.pop();
        }
        for(int i=0;i<resultList.length;i++){
            result+=" "+resultList[i];
        }
        return result;
    }
    /**
     * 判断操作符的优先级
     * @param oper
     * @return
     */
    public int priority(int oper){
        if(oper=='*' || oper=='/'){
            return 1;
        }else if(oper=='+'||oper=='-'){
            return 0;
        }else{
            return -1; //假定运算符号只有+-*/
        }
    }
    public void operCompare(String str ,Stack<String> s1,Stack<String> s2){
        if(s1.isEmpty() || s1.peek().charAt(0)=='('){ // 如果是栈空或者栈顶为（
            s1.push(str);
        }else if(priority(str.charAt(0))>priority(s1.peek().charAt(0))){
            // 如果str的优先级高于栈顶
            s1.push(str);
        }else{
            String top=s1.pop();
            s2.push(top);
            // 然后重新比较
            operCompare(str,s1,s2);
        }
    }
    /**
     * 将输入的中缀表达式变为
     * @param expression
     * @return
     */
    public static List<String> toInfixExpressionList(String expression) {
        List<String> ls = new ArrayList<String>();
        String str; // 用于实现对多位数的拼接
        for(int i=0; i<expression.length();){
            //如果非数字 直接入ls
            if((expression.charAt(i)<'9')||(expression.charAt(i)>'0')){
                ls.add(expression.substring(i,i+1));
                i++;
            }else{// 是数字的话需要考虑多位数问题
                str="";
                while ((i<expression.length())&&(expression.charAt(i)<'0')&&(expression.charAt(i)>'9')){
                    str+=expression.charAt(i);
                    i++;
                }
                ls.add(str);
            }
        }
        return ls;
    }
    /**
     * 判断是否为操作符
     * @param oper
     * @return
     */
    public boolean isOper( String str){
        char oper=str.charAt(0);
        return oper=='+'|| oper=='-'|| oper=='*'|| oper=='/';
    }
}