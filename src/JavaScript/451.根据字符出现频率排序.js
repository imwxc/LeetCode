/*
 * @lc app=leetcode.cn id=451 lang=javascript
 *
 * [451] 根据字符出现频率排序
 */

// @lc code=start

/**
 * @param {string} s
 * @return {string}
 */
var V1 = function(str) {
    let s = Array.from(str)
    if(s.length == 1) return s
    let map = new Map()
    let res = []
    for(let i = 0; i<s.length; i++){
        if(map.has(s[i])){
            map.set(s[i], map.get(s[i])+1)
        }else{
            map.set(s[i], 1)
        }
    }
    let bucket = Array.from(map)
    const swap = (s, low, high)=>{
        const temp = s[high]
        s[high] = s[low]
        s[low] = temp
    }
    const part = (s, low, high)=>{
        let p = s[low][1] // 选取p作为待排序的元素
        // 需要寻找 left, right 使得[low,left) <= p, (right,high] > p
        let left = low +1
        let right = high
        while(left <= right ){
            // left < high 说明 left 没有遍历结束
            // num[left] < p 说明 i的数字在 p左侧 移动i
            while(left < high && s[left][1] <= p){
                left++
            }
            // 退出上述循环后，left指向的数字比p大， 需要在p的右侧找一个比p小的元素
            while(right > low && s[right][1] > p){
                right--
            }
            if(left >= right) break
            // 退出后 需要交换left ， right指向的数字，
            // 其他情况时，交换left， right 重新循环
            // if(left < right){
            swap(s, left ,right )
            // }
        }
        // 最后right指向 p 的位置，将p和该元素交换
        // console.info('before: ', s, `low: ${low}, right: ${right}`)
        swap(s,low,right);
        // console.info('after: ', s, `low: ${low}, right: ${right}`)
        return right
    }
    for(let xx = 1; xx<=s.length;xx++){
        // 对频次进行快速查找
        let low = 0;
        let high = bucket.length - 1
        let kIdx = bucket.length - 1 // 对于每次循环， 因为上一次将 上轮的循环结果去除了，所以不用改变k
        // console.info(`low: ${low}, high: ${high}, kIdx:${kIdx}`)
        while( low <=high){
            let p = part(bucket, low, high)
            if(kIdx > p){
                low = p+1
            }
            else if(kIdx < p){
                high = p-1
            }
            else if(kIdx == p){
                const tres = bucket[p][0]
                for(let i = bucket[p][1]; i>0;i--){
                    res.push(tres)
                }
                bucket.splice(p,1) // 将本次得到的结果在下次搜索区间内去除
                break
            }
        }
    }
    // console.info(res)
    return res.join('')
};

/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    return V1(s)
};
// @lc code=end

