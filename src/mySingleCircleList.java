package src;

import java.util.Scanner;

public class mySingleCircleList {
    HeroNode firstNode;
    HeroNode lastNode;
    public mySingleCircleList(){
        this.firstNode=null;
        this.lastNode=null;
    }

    boolean isEmpty(){
        return (this.firstNode==null)? true: false;
    }

    HeroNode addNode(HeroNode node){
        if(isEmpty()){
            this.firstNode=node;
            this.lastNode=node;
        }else{
            this.lastNode.next=node;
            this.lastNode=node;
        }
        this.lastNode.next=this.firstNode;
        return this.firstNode;
    }

    void view_list(){
        HeroNode temp=this.firstNode;
        while(true){
            System.out.println(temp.toString());
            temp=temp.next;
            if(temp==this.firstNode){
                break;
            }
        }
    }

    HeroNode deleteNode(int no){
        HeroNode temp =this.lastNode;
        while(true){
            if(temp.next.no==no){
                HeroNode delNode =temp.next;
                if(delNode==this.firstNode){
                    this.firstNode=delNode.next;
                    
                }else if(delNode==this.lastNode){
                    this.lastNode=temp;
                }
                temp.next=delNode.next;
                this.lastNode.next = this.firstNode;
                return delNode;
            }
            temp=temp.next;
        }
    }
    HeroNode deleteNode(HeroNode pre){
        HeroNode cur = pre.next;
        HeroNode delNode=pre.next;
        if(cur==this.firstNode){
            this.firstNode=cur.next;
        }else if(cur==this.lastNode){
            this.lastNode=pre;
        }else{
            pre.next=cur.next;
        }
        this.lastNode.next = this.firstNode;
        return delNode;
    }

    public static void main(String[] args){
        mySingleCircleList list=new mySingleCircleList();
        HeroNode hero1 = new HeroNode(1,"宋江","及时雨");
        HeroNode hero2 = new HeroNode(2,"卢俊义","玉麒麟");
        HeroNode hero3 = new HeroNode(3,"吴用","智多星");
        HeroNode hero4 = new HeroNode(4,"林冲","豹子头");

        // Scanner sc=new Scanner(System.in);
        // System.out.println("请输入有多少人？");
        // int num=sc.nextInt();
        // for (int i=0;i<num;i++){
        //     list.addNode(new HeroNode(i,"",""));
        // }
        // int K =sc.nextInt();
        list.addNode(hero1);
        list.addNode(hero2);
        list.addNode(hero3);
        list.addNode(hero4);

        System.out.println("打印数组");
        list.view_list();
        System.out.println("删除2");
        list.deleteNode(2);
        list.view_list();
        System.out.println("删除4");
        list.deleteNode(4);
        list.view_list();
        System.out.println("删除1");
        list.deleteNode(1);
        list.view_list();
        System.out.println(list.firstNode.toString());
    }
}
