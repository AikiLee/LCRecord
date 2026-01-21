/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (44.98%)
 * Likes:    3015
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 2.7M
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 *
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 *
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 6
 * 输出：[-1,-1]
 *
 * 示例 3：
 *
 *
 * 输入：nums = [], target = 0
 * 输出：[-1,-1]
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * nums 是一个非递减数组
 * -10^9 <= target <= 10^9
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    /* 
    读题：滑动窗口常用于解决子问题（要求连续）；nums非递减，说明有序；本题没有明确要求长度，因而是动态窗口；
    这里再回顾一下滑动窗口基本套路：
    1. 双指针的拓展：先定一left和right指针
    2. 更新
    3. 根据类型来判断是否需要out
   */
//   但是这里还是O(n)的时间复杂度。如何优化到logN,读题不仔细，没有对有序数组有应该的敏感度
    const n = nums.length;
    let left = 0,
        right = n - 1;
    let first = -1;
    let last = -1;
    const mid = ((left + right) / 2).toFixed(0);
    while (left <= right) {
        if (nums[left] === target) {
            first = left;
            break;
        }
        left++;
    }
    while (left <= right) {
        if (nums[right] === target) {
            last = right;
            break;
        }
        right--;
    }
    if(first === -1 && last === -1) return [-1,-1];
    else  return [first, last]; 
};
// @lc code=end
// console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
// console.log(searchRange([5, 7, 7, 8, 8, 10], 6));
// console.log(searchRange([], 6));
console.log(searchRange([1], 1));
