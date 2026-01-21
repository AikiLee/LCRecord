/*
 * @lc app=leetcode.cn id=84 lang=javascript
 *
 * [84] 柱状图中最大的矩形
 *
 * https://leetcode.cn/problems/largest-rectangle-in-histogram/description/
 *
 * algorithms
 * Hard (47.10%)
 * Likes:    2930
 * Dislikes: 0
 * Total Accepted:    528.4K
 * Total Submissions: 1.1M
 * Testcase Example:  '[2,1,5,6,2,3]'
 *
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
 *
 * 求在该柱状图中，能够勾勒出来的矩形的最大面积。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入：heights = [2,1,5,6,2,3]
 * 输出：10
 * 解释：最大的矩形为图中红色区域，面积为 10
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入： heights = [2,4]
 * 输出： 4
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    /* 
        莫名很像接雨水，但是还是不一样；接雨水是可以将每一个柱子看成桶，然后累加算出。这里要求矩形，必须底部连续。考虑使用单调栈
            
    */

    const n = heights.length;
    let area = 0;

    // 先考虑暴力解，三重循环，分别对应left,right,height
    // for (let i = 0; i < n; i++) {
    //     for (let j = i; j < n; j++) {
    //         let minHeight = Infinity;
    //         for (let k = i; k <= j; k++) {
    //             minHeight = Math.min(minHeight, heights[k]);
    //         }
    //         area = Math.max(area, (j - i + 1) * minHeight);
    //     }
    // }
    // return area;
    // 优化为二重循环

    /* 
        有点看懂了，left和right数组就是空间换时间。为什么要设置为 -1 和 n,
        因为left[i]记录的是当前元素左边第一个比它大的元素，right[i]记录的是当前元素右边第一个比它小的元素。
    
    */
    //记录第一个比i的大的左边元素    
    const left = new Array(n).fill(-1);
    // 记录第一个比i小的右边元素
    const right = new Array(n).fill(n);
    const st = [];
    for(let i = 0 ; i < n; i++) {
        const h = heights[i];
        // 当st不为空，并且当前元素大于栈顶元素,主要还有可能出现间隔的case
        while(st.length && h <= heights[st[st.length - 1]]){
            st.pop();
            
        }
    }


};
// @lc code=end
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
// console.log(largestRectangleArea([2, 4]));
// console.log([1,2,3].reduce((a,b) => a*b , 1));