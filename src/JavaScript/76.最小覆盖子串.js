/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 * 
 * 思路：
 *  滑动窗口求解：
 *  1： 两个指针 l r 从左向右移动，l比r慢
 *  2. 使用Map映射字符，key为字符， exist 表示是否在t中存在， num 表示字符缺少的数量
 *  3. 使用 String.property.include 判断 字符是否在t中存在
 *  4. 使用 String.property.indexOf + while 获取字符数量
 * 
 *  
 * 
 * 
 */
// 滑动窗口大致思路：
// eslint-disable-next-line no-unused-vars
function slideWindow(string=''){
    let right =0; // 定义窗口左边界
    let left = 0; // 定义窗口右边界
    const window = { 
        add(subStr){return subStr},
        remove(subStr){return subStr}
    }
    const updateWindowData = ()=>{} // 更新窗口数据
    const WindowNeedShrink = true;
    // 当左边界 < 右边界 && 右边界没有到头的时候
    while(left < right && right < string.length ){
        const addSub = string[right]
        window.add(addSub)// 添加右边界的内容
        updateWindowData();
        right++ // 右边界移动
        while(WindowNeedShrink){ // 当 窗口需要改变大小而定时候
            const removeSub = string[left]
            window.remove(removeSub) // 去掉左边界的内容
            left++ // 移动左边界
            updateWindowData()
        }
    }
}



// @lc code=start

function getTinfo(t=''){
    const Tinfo = {}
    for(let i =0; i<t.length; i++){
        let char = t[i]
        if(Tinfo[char]){
            Tinfo[char].need++
        }else{
            Tinfo[char] = {
                need: 1, // 需要多少个字符
                exist: 0, // 存在多少个字符 ， 0表示不存在
            }
        }
    }
    return Tinfo
}

function V1(s,t){
    const Tinfo = getTinfo(t)
    let left = 0;
    let right = 0;
    let vaild = 0; // 窗口中满足 need 条件的字符个数
    let start = 0;
    let subStrlength = Infinity
    // let showSub = ''
    const updateSubStr = ()=>{
        if(right - left < subStrlength){
            subStrlength = right - left // 当前子串的长度为窗口长度
            start = left // 子串开始点为 窗口左起点
        }
    }
    function needEqualExist(char){
        return Tinfo[char].exist == Tinfo[char].need
    }
    while(right < s.length){
        let c = s[right]
        right ++
        if(Tinfo[c]){ // t中有c字符
            Tinfo[c].exist++ // 更新 存在的字符数量
            if(needEqualExist(c)){ // 当t中的一个字符满足需求后
                //更新vaild
                vaild++
            }
        }
        // 当所有t的字符都满足后， 开始收缩窗口
        while(vaild === Object.keys(Tinfo).length){
            updateSubStr() //首先更新下左字符串
            let d = s[left] // 要移出去的字符
            left++ // 左边界更新
            // showSub = s.substr(start, subStrlength)
            // console.info('showSub: ',showSub)
            if(Tinfo[d]){ // 如果d在t内
                if(needEqualExist(d)){ // 如果d的数量满足t内d的数量
                    vaild-- // 满足的字符数量--
                }
                Tinfo[d].exist-- // t中d字符的存在数量--
            }
        }
    }
    const subStr = subStrlength == Infinity ? '' : s.substr(start, subStrlength)
    return subStr
}

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// eslint-disable-next-line no-unused-vars
var minWindow = function(s, t) {
    return V1(s, t)
};
// @lc code=end


// @after-stub-for-debug-begin
module.exports = minWindow;
// @after-stub-for-debug-end