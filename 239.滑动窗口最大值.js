/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 *
 * https://leetcode.cn/problems/sliding-window-maximum/description/
 *
 * algorithms
 * Hard (49.42%)
 * Likes:    3132
 * Dislikes: 0
 * Total Accepted:    856.5K
 * Total Submissions: 1.7M
 * Testcase Example:  '[1,3,-1,-3,5,3,6,7]\n3'
 *
 * 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k
 * 个数字。滑动窗口每次只向右移动一位。
 *
 * 返回 滑动窗口中的最大值 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
 * 输出：[3,3,5,5,6,7]
 * 解释：
 * 滑动窗口的位置                最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 * ⁠1 [3  -1  -3] 5  3  6  7       3
 * ⁠1  3 [-1  -3  5] 3  6  7       5
 * ⁠1  3  -1 [-3  5  3] 6  7       5
 * ⁠1  3  -1  -3 [5  3  6] 7       6
 * ⁠1  3  -1  -3  5 [3  6  7]      7
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1], k = 1
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 1 <= k <= nums.length
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    /* 
        读题：整数数组，没说明正负；窗口大小固定，考虑定长滑动窗口；
        滑动窗口三步：
        1. 确定初始位置
        2. 更新：left++ ， right++，移动 n - k + 1次
        3. out
        这题还是最好维护一个单调队列
   */
    // const q = [];
    // let ans = []; //记录每个窗口的最大值
    // 用这种方法：时间复杂度O(N klog(k)) 超时
    // if(nums.length <= k){
    //     return [nums.slice().sort((a,b) => b-a)];
    // }
    // // 考虑维护单调队列
    // for (let i = 0; i < nums.length; i++) {
    //     q.push(nums[i]);
    //     if (i - k + 1 < 0) {
    //         continue;
    //     } else {
    //         const res = q.slice().sort((a,b) => b-a)[0];
    //         ans.push(res);
    //         q.shift();
    //     }
    // }
    // return ans;
    // O(nk)依然超时
    // const res = [];
    // if (nums.length <= k) {
    //     return [nums.slice().sort((a, b) => b - a)[0]];
    // }
    // for (let i = 0; i < nums.length - k; i++) {
    //     let maxValue = -Infinity;
    //     for (let j = i; j < i + k; j++) {
    //         maxValue = Math.max(maxValue, nums[j]);
    //     }
    //     res.push(maxValue);
    // }
    // return res;

    // 


};
// @lc code=end
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
console.log(maxSlidingWindow([1], 1));
