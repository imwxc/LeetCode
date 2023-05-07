/*
 * @lc app=leetcode.cn id=474 lang=javascript
 *
 * [NaN] 实现一个优先级队列
 * 
 */



// @lc code=start
class PriorityQueue {
    val = []
    get size(){
        return this.val.length
    }
    compare;
    constructor(compare, _value){
        if(typeof compare !== 'function'){
            throw new Error('传入的compare 应该是个函数!')
        }
        this.compare = compare
        if(_value){
            this.val = _value
        }
    }
    parent(root){
        return Math.floor(root/2)
    }
    left(root){
        return root*2
    }
    right(root){
        return root*2+1
    }
    swap(a,b){
        let temp = this.val[b]
        this.val[b] = this.val[a]
        this.val[a] = temp
    }
    ALessB(a,b){
        if(a -b < 0){
            return true
        }
        return false
    }
    // 大根堆
    // 节点上浮
    swim(x){
        const { ALessB, parent, swap } = this
        while(x>1 && ALessB(x,parent(x))){
            swap(parent(x), x)
            x = parent(x)
        }
    }
    // 大根堆
    // 节点下沉
    sink(x){
        const { ALessB, swap, left, right, size } = this
        while(left(x) <= size ){
            // 首先默认左侧较大
            let max = left(x)
            // 如果右侧较大，就像max赋给右侧
            if (right(x) <= size && ALessB(max, right(x))){
                max = right(x)
            }
            // 如果max小于x则说明当前符合大根堆要求，退出循环
            if(ALessB(max, x)){
                break
            }
            // 否则交换x和max， 并继续下沉
            swap(x,max)
            x= max
        }
    }
    insert(element){
        this.val.push(element)
        this.swim(this.size)
    }

    delete(){
        // 先拿到最大元素
        let max = this.val[1]
        // 然后让堆底元素和最大元素对调
        this.swap(1, this.size)
        // 删除最大元素
        this.val.length-=1
        // 让堆底元素下沉到合适位置
        this.sink(1)
        return max
    }
}
// @lc code=end


// @after-stub-for-debug-begin
module.exports = PriorityQueue;
// @after-stub-for-debug-end
