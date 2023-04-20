/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 * 
 * 思路：
 *  1. 使用二分查找
 *  2. 找开始位置即为找左边界， 找结束位置即为找右边界
 *  3. 使用左右闭区间方式套模板
 *  
 */

// @lc code=start
const TYPE = {
    LEFT: "left_border",
    BASE: 'base',
    RIGHT: "right_border"
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @param {string} type
 * @return {number[]}
 */
function template({nums, target, type}){
    // 前置兜底逻辑
    if(!nums.length) return -1;
    if(nums.length == 1 && nums[0] == target) return 0;

    let left = 0;
    let right = nums.length -1;
    let mid;
    let currnum;
    // 此时 为左右闭区间， 让区间内无搜索元素需要让 left > right 
    while(left <= right){
        mid = left + Math.floor((right - left)/2) // js需要手动取整
        currnum = nums[mid]
        if(currnum == target){
            //根据type的不同，做不同处理
            if(type ==TYPE.BASE){
                // 基本方式直接return
                return mid
            }
            // mid已经 == target了， 所以边界收缩后无需包含mid
            if( type == TYPE.LEFT){
                // 查找左边界时，将右边界收缩到mid左侧
                right = mid -1
            }
            if( type == TYPE.RIGHT){
                // 查找右边界时，将左边界收缩到mid右侧
                left = mid + 1
            }   
        }
        else if(currnum < target){
            // 当mid < target时， 说明 target在mid右侧，此时需要更新左边界
            left = mid + 1
        }
        else if(currnum > target){
            // 当mid > target时，说明 target在mid左侧， 此时需要更新右边界
            right = mid - 1
        }
    }
    // 循环结束后，此时 left = right
    // 特殊情况处理
    if(type == TYPE.BASE){
        // 基本查找时， 如果循环中没有return 说明不存在，直接return -1
        return -1
    }
    else if(type == TYPE.LEFT){
        // 左边界查找时， 如果 left == length 或者 num[left] != target 说明没找到
        if(left == nums.length || nums[left] != target) return -1
        return left
    }
    else if(type == TYPE.RIGHT){
        // 右边界查找时， 如果 mid < 0 了 或者  nums[mid] != target ，说明没找到
        // left = mid +1 --> mid = left -1
        // mid = left - 1
        if( right  < 0 || nums[right] !=target) return -1
        return right
    }
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

function V1(nums, target){
    const leftIdx = template({nums, target, type: TYPE.LEFT})
    const rightIdx = template({nums, target, type: TYPE.RIGHT})
    return [leftIdx, rightIdx]
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    return V1(nums, target)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = searchRange;
// @after-stub-for-debug-end