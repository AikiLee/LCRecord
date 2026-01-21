/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 *
 * https://leetcode.cn/problems/container-with-most-water/description/
 *
 * algorithms
 * Medium (61.12%)
 * Likes:    5474
 * Dislikes: 0
 * Total Accepted:    1.7M
 * Total Submissions: 2.7M
 * Testcase Example:  '[1,8,6,2,5,4,8,3,7]'
 *
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 *
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 *
 * 返回容器可以储存的最大水量。
 *
 * 说明：你不能倾斜容器。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 *
 * 示例 2：
 *
 *
 * 输入：height = [1,1]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == height.length
 * 2 <= n <= 10^5
 * 0 <= height[i] <= 10^4
 *
 *
 */

const { max } = require("lodash");

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    const n = height.length;
    // let res = 0;
    // for (let i = 0; i < n; i++) {
    //     for (let j = i + 1; j < n; j++) {
    //         if (height[i] < height[j]) {
    //             // 取小一边的来计算面积
    //             const r = height[i] * (j - i);
    //             // 更新
    //             res = Math.max(r, res);
    //         } else {
    //             const r = height[j] * (j - i);
    //             res = Math.max(r, res);
    //         }
    //     }
    // }
    // return res;

    // o(n^2)会超时，考虑使用双指针优化
    let left = 0, right = n - 1;
    let res = 0;
    while(left < right){

        if(height[left] < height[right]){
            // ⬅左边小：取左，计算面积
            const r = height[left] * (right - left);
            res = Math.max(r, res);
            // 但是之后如何更新
            left++;
        }else{
            const r = height[right] * (right - left);
            res = Math.max(r, res);
            right--;
        }

    }
    return res;


};
// @lc code=end
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
