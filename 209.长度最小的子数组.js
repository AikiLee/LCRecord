/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 *
 * https://leetcode.cn/problems/minimum-size-subarray-sum/description/
 *
 * algorithms
 * Medium (47.05%)
 * Likes:    2451
 * Dislikes: 0
 * Total Accepted:    1M
 * Total Submissions: 2.2M
 * Testcase Example:  '7\n[2,3,1,2,4,3]'
 *
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 *
 * 找出该数组中满足其总和大于等于 target 的长度最小的 子数组 [numsl, numsl+1, ..., numsr-1, numsr]
 * ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 *
 *
 * 示例 2：
 *
 *
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= target <= 10^9
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^4
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。
 *
 *
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    /* 
     思路：暴力解法 双层循环，必定超时
     优化，利用条件正整数，可以使用滑动窗口的方法进行优化
     这里回顾一下滑动窗口的基本思路：
        1. 确定问题类型，一般求子问题都可以考虑使用滑动窗口
        2. 双指针的拓展：确定滑动窗口的左右边界，然后移动边界，直到满足题目要求
        3. 更新
        4. out，根据题目类型，如果是固定窗口就需要。


   */
    const n = nums.length;
    let left = 0,
        right = 0;
    let ans = n + 1;
    let sum = 0;
    for (x of nums) {
        sum += x;
        right++;
        if (sum >= target) {
            while (sum - nums[left] >= target) {
                // 缩小窗口,从左边
                sum -= nums[left];
                left++;
            }
            ans = Math.min(ans, right - left);
        }
    }
    if (sum >= target) return ans;
    /* 
        对于子问题，还可以考虑使用回溯/dp；但是这里数组长度为1e5，肯定会爆栈的
    
    */
    // const n = nums.length;
    // const ans = new Array();
    // let minLen = Infinity;

    // const dfs = (start, sum) => {
    //     // 这里相当于使用dfs来模拟了循环，效率自然很低，而且不好优化；仅做练习；
    //     if (sum >= target) return 0;
    //     let min = Infinity;
    //     for (let end = start; end < nums.length; end++) {
    //         sum += nums[end];
    //         if (sum >= target) {
    //             min = Math.min(min, end - start + 1);
    //             break;
    //         }
    //     }
    //     return min;
    // };
    // for(let i = 0; i<nums.length;i++){
    //     const currentMin = dfs(i, 0);
    //     if(currentMin!==Infinity){
    //         minLen = Math.min(minLen,currentMin);
    //     }
    // }
    // return minLen === Infinity ? 0 : minLen;
};
// @lc code=end
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
console.log(minSubArrayLen(4, [1, 4, 4]));
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]));
