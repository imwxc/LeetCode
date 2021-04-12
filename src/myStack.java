package src;

import java.util.ArrayList;
import java.util.List;

public class myStack{
    /**
     * 应用：子程序调用，递归调用，中缀转后缀，二叉树遍历，dfs
     * 
     * 使用数组模拟
     */
    int MaxNum;

    int buttom;
    int top;
    HeroNode stack[];
    myStack(int maxNum){
        this.MaxNum=maxNum;
        stack = new HeroNode[this.MaxNum];
        this.top=-1;
        this.buttom=0;
    }

    boolean isEmpty(){
        return top==-1? true:false;
    }
    boolean isFull(){
        return top==this.MaxNum-1?true:false;
    }
    /**
     * 入栈
     * @param node
     */
    void push(HeroNode node){
        if(!isFull()){
            top++;
            stack[top]=node;
        }else{
            System.out.println("栈满!");
        }
    }

    void push(int no){
        HeroNode node =new HeroNode(no,"","");
        if(!isFull()){
            top++;
            stack[top]=node;
        }else{
            System.out.println("栈满!");
        }
    }
    /**
     * 出栈
     * @param args
     */
    HeroNode pop(){
        if(!isEmpty()){
            int i=top;
            top--;
            return stack[i];
        }
        throw new IllegalStateException("栈空！ 无法pop");
    }

    int pop_int(){
        if(!isEmpty()){
            int i=top;
            top--;
            return stack[i].no;
        }
        throw new IllegalStateException("栈空！ 无法pop");
    }

    /**
     * 遍历栈
     * @param args
     */
    void view_stack(){
        if(!isEmpty()){
            for(int i=this.top;i>=0;i--){
                System.out.println(stack[i].toString());
            }
        }else{
            System.out.println("栈空！");
        }
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

    public HeroNode peek(){
        return this.stack[this.top];
    }

    public int peek_num(){
        return this.stack[this.top].no;
    }

    public static void main(String[] args){
        myStack stack=new myStack(10);
        stack.push(new HeroNode(1,"宋江","及时雨"));
        stack.push(new HeroNode(2,"卢俊义","玉麒麟"));
        stack.push(new HeroNode(3,"吴用","智多星"));
        stack.push(new HeroNode(4,"林冲","豹子头"));
        System.out.println("查看栈");
        stack.view_stack();
        System.out.println("pop一个");
        stack.pop();
        stack.view_stack();

    }
}
/**
 * 使用栈来完成计算器
 */
class myCalculator{
    myStack numStack;
    myStack symbolStack;
    String expression;
    myCalculator(String expression){
        this.expression = expression;
        init(expression);
    }

    /**
     * 判断是否为操作符
     * @param oper
     * @return
     */
    public boolean isOper( char oper){
        return oper=='+'|| oper=='-'|| oper=='*'|| oper=='/';
    }

    /**
     * 构建数栈和符号栈
     * 
     * 如果扫描到数字就直接入栈
     * 
     * 如果扫描到符号：当符号栈为空时直接入栈，
     * 如果符号栈非空，需要比较栈顶和当前操作符优先级，：
     * if 当前的<=栈内的 需要pop两个数和一个符号 进行运算后 再入数栈，当前符号入符号栈
     * if 当前的>栈内的  直接入栈
     * 扫描完毕后，顺序pop 然后运算，算完入栈
     * 最后数栈只有一个数字 符号栈为空   
     * @param expression
     */
    private void init(String expression){
        int index=0;int num1=0;int num2=0;int oper=0; int res =0;String keepnum="";
        char ch=' ';//将得到的char保存到ch中
        while(index<=expression.length()){
            ch=expression.substring(index,index+1).charAt(0);
            //处理扫描到符号时
            if(isOper(ch)){
                if(!symbolStack.isEmpty()){
                    if(symbolStack.priority(ch)<=symbolStack.priority(symbolStack.peek_num())){
                        num1=numStack.pop_int();
                        num2=numStack.pop_int();
                        oper=symbolStack.pop_int();
                        res=calculate(num1,num2,oper);
                        numStack.push(res);
                    }else{
                        symbolStack.push(ch);
                    }
                }else{
                    //如果为空 直接入栈
                    symbolStack.push(ch);
                }
            // 处理扫描到数字时
            }else{
                //如果已经是最后一位，就直接入栈
                //如果后一位是运算符，就入栈，如果是数字，就拼接，然后continue到下一个index

                keepnum+=ch;
                if(index==expression.length()-1){
                    numStack.push(Integer.parseInt(keepnum));
                }
                else{
                    if(isOper(expression.substring(index+1,index+2).charAt(0))){
                        numStack.push(Integer.parseInt(keepnum));
                    }
                }
            }
            index++;
            if(index>=expression.length()){
                break;
            }
        }
        // 当扫描完表达式后，检查是否有未计算的操作符
        while(!symbolStack.isEmpty()){
            num1=numStack.pop_int();
            num2=numStack.pop_int();
            oper=symbolStack.pop_int();
            res=calculate(num1,num2,oper);
            numStack.push(res);
        }
        int result=numStack.pop_int();
        System.out.printf("%s = %d",expression,result);
    }

    /**
     * 将str中的数字提取出来并存到list中
     * @param 一个计算str
     * @return str中的数字
     */
    private List getNUM(String s){
        List<String> num = new ArrayList<String>();
        for(String sss:s.replaceAll("[^0-9]", ",").split(",")){
            if (sss.length()>0){
                num.add(sss);
            }
        }
        return num;
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