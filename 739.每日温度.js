/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 *
 * https://leetcode.cn/problems/daily-temperatures/description/
 *
 * algorithms
 * Medium (69.51%)
 * Likes:    1962
 * Dislikes: 0
 * Total Accepted:    746.2K
 * Total Submissions: 1.1M
 * Testcase Example:  '[73,74,75,71,69,72,76,73]'
 *
 * 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i
 * 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
 * 输出: [1,1,4,2,1,1,0,0]
 *
 *
 * 示例 2:
 *
 *
 * 输入: temperatures = [30,40,50,60]
 * 输出: [1,1,1,0]
 *
 *
 * 示例 3:
 *
 *
 * 输入: temperatures = [30,60,90]
 * 输出: [1,1,0]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= temperatures.length <= 10^5
 * 30 <= temperatures[i] <= 100
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    // const n = temperatures.length;
    // const ans = new Array(n).fill(0);
    // // 单调栈
    // const st = [];
    // for (let i = n - 1; i >= 0; i--) {
    //     // 当当前元素的温度 >= 栈顶温度
    //     const t = temperatures[i];
    //     while (st.length && t >= temperatures[st[st.length - 1]]) {
    //         st.pop();
    //     }
    //     // 若栈非空，存储一个更高温度的日期
    //     if (st.length) {
    //         ans[i] = st[st.length - 1] - i;
    //     }
    //     // 将当前日期
    //     st.push(i);
    // }
    // return ans;

    /* 
        暴力解法：
        1. 双层循环，每次找到比当前元素大的值就停下
    
    
    */

    // const n = temperatures.length;
    // const ans = new Array(n).fill(0);
    // for (let i = 0; i < n; i++) {
    //     for (let j = i + 1; j < n; j++) {
    //         if (temperatures[j] > temperatures[i]) {
    //             ans[i] = j - i;
    //             break;
    //         }
    //     }
    // }
    // return ans;

    const stk = [];
    const n = temperatures.length;
    const res = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        // 当stk不为空 且 新元素值大于栈顶元素
        while (stk.length !== 0 && temperatures[i] > temperatures[stk[stk.length - 1]]){
            // 将旧的栈顶元素出栈，idx为下标位置
            let idx = stk.pop();
            // 计算差值
            res[idx] = i - idx;
        }
        // 将新元素入栈
        stk.push(i);
    }
    return res;
};
// @lc code=end
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
