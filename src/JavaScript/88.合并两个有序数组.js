/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 * 思路：
 *  1. 使用三个指针从末尾开始向前遍历
 *   pointN1 指向 nums1的有num的末尾（m-1）
 *   pointN2 指向nums2的末尾（n-1）
 *   endPoint 指向 最终结果的末尾
 *  2.第一遍遍历：
 *      当   pointN1 和 pointN2 都没结束时
 *          若 pointN1 指向的数 大于 pointN2 指向的数
 *              末尾更新为 pointN1指向的数
 *              pointN1 向前移动 并且末尾向前移动
 *          若 pointN2 指向的数 大于等于 pointN1 指向的数
 *              末尾更新为 pointN2 指向的数
 *              pointN2 向前移动 并且末尾向前移动
 *  3. 第二遍遍历
 *      因为是在nums1中进行修改， 
 *          当 pointN2 <0 时，说明已经结束，
 *          当pointN2>=0 时，说明nums2还有剩余元素， nums1 插入完毕
 *      则遍历剩余的nums2 将其放入 endPoint指向的位置即可
 */

// @lc code=start
function V1({nums1, m, nums2, n}){
    let pointN1 = m-1;
    let pointN2 = n-1;
    let endPoint = m+n-1;
    // 两个指针一起移动
    while(pointN1 >=0 && pointN2 >=0 ){
        const num1 = nums1[pointN1]
        const num2 = nums2[pointN2]
        if( num1 > num2 ){ // n1 > n2 时
            nums1[endPoint] = num1 // n1 放到n1 的 位置
            --pointN1 // 指向n1 前面的一个数
            --endPoint // 末尾向前移动
        }else{ // n1 <= n2 时
            nums1[endPoint] = num2 // n2放在最末尾
            --pointN2 // 指向n2前面的一个数
            --endPoint // 末尾向前移动
        }
    }
    // 第二个数组还有剩余
    while(pointN2 >=0){
        nums1[endPoint] = nums2[pointN2] // 将剩余的n2放到 nums当前位置
        --pointN2
        --endPoint
    }
    return nums1
}

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// eslint-disable-next-line no-unused-vars
var merge = function(nums1, m, nums2, n) {
    const res = V1({nums1, m, nums2, n})
    return res
};
// @lc code=end

