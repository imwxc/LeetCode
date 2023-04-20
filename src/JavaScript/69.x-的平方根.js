/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根 
 *  思路：二分查找
 * 将x处理成一个数组，在数组内二分查找
 * 求 fx = x^2 -a = 0 的解， fx 单调递增
 * 
 * 
 * 思路2： 采用牛顿迭代法：
 *  fx = x^2 - a = 0
 *  
 * 设 求解 gx = 0
 *  xn+1 = xn - gx/ g'x
 * 
 * 所以 fx 的迭代公式为
 *  xn+1 = （xn + a/xn）/2
 */

// @lc code=start
function V1(x=0){
    if(!x) return 0
    const end = x
    let i = 1;
    let j = end;
    let mid = i;
    let sqrt = i;
    while(i<=j){
        mid = i+(j-i)/2
        sqrt = x/mid
        if( sqrt == mid ){
            return mid // 相等时 mid就是平方根
        }
        if( mid > sqrt){
            j = Math.ceil(mid) - 1 // mid > sqrt 时， 说明当前区间的中间 大于 平方根，需要将右边界减少
        }else{
            i = Math.floor(mid) + 1 // mid < sqrt 时， 说明区间mid 小于平方根， 需要将左边界增大
        }
    }
    return j
}

function V2(a){
    let x = a;
    function limit(x){
        return Math.floor(x)
    }
    while(x*x > a){
        // 迭代时需要考虑到计算机精度问题，
        // x为小数会不断逼近但是永远无法 > a 
        x = limit(( x+a/x )/2)
    }
    return x
}
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    // return V1(x)
    return V2(x)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = mySqrt;
// @after-stub-for-debug-end