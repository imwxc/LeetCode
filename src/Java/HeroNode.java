
class HeroNode {
    int no;
    String name;
    String nickName;
    HeroNode next;
    HeroNode prev;
    HeroNode lchild;
    HeroNode rchild;
    HeroNode parent;

    HeroNode(int no, String name, String nickName) {
        this.no = no;
        this.name = name;
        this.nickName = nickName;
        this.next = null;
        this.prev = null;
    }

    HeroNode() {
        this.no = -1;
        this.name = "HeadNode";
        this.nickName = "";
        this.next = null;
        this.prev = null;
    }

    public HeroNode copy(){
        HeroNode temp =new HeroNode(this.no,this.name,this.nickName);
        temp.next=this.next;
        temp.prev=this.prev;
        return temp;
    }

    public void setNext(HeroNode next){
        this.next=next;
    }
    
    public String toString() {
        return String.format("HeroNode [no = %d, name = %s, nickname = %s]", this.no, this.name, this.nickName);
    }

    public HeroNode getParent(){
        return this.parent;
    }
    public void setParent(HeroNode node){
        this.parent=node;
    }
    public HeroNode getLeftChild(){
        return this.lchild;
    }
    public void setLeftChild(HeroNode node){
        this.lchild=node;
    }
    public HeroNode getRightChild(){
        return this.rchild;
    }
    public void setRightChild(HeroNode node){
        this.rchild=node;
    }
}
