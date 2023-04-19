/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 * 思路：
 *  1. 使用两个指针，从两个数组的末尾开始遍历
 *  2. 需要定位 较长数组的末尾 以便复制
 */

function V1({nums1, m, nums2, n}){
    let pointN1 = m-1;
    let pointN2 = n-1;
    let EndPoint = m+n-1;
    while(pointN1 >0 || pointN2 >0 ){
        const num1 = nums1[pointN1]
        const num2 = nums2[pointN2]
        if( num1 > num2 ){ // n1 > n2 时
            nums1[EndPoint] = num1 // n1 放在最末尾
            nums1[pointN1] = num2 // n1 放到n1 的 位置
            --pointN1 // 指向n1 前面的一个数
            --EndPoint // 末尾向前移动
        }
    }
    return nums1
}



// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    const res = V1({numms1, m, muns2, n})
    return res
};
// @lc code=end

