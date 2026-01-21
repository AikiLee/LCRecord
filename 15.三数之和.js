/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 *
 * https://leetcode.cn/problems/3sum/description/
 *
 * algorithms
 * Medium (39.19%)
 * Likes:    7466
 * Dislikes: 0
 * Total Accepted:    2.3M
 * Total Submissions: 5.9M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j !=
 * k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 解释：
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
 * 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
 * 注意，输出的顺序和三元组的顺序并不重要。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1,1]
 * 输出：[]
 * 解释：唯一可能的三元组和不为 0 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [0,0,0]
 * 输出：[[0,0,0]]
 * 解释：唯一可能的三元组和为 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= nums.length <= 3000
 * -10^5 <= nums[i] <= 10^5
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const n = nums.length;
    nums.sort((a, b) => a - b);
    if (nums[n - 1] < 0 || nums[0] > 0) return [];
    const res = [];
    for (let i = 0; i < n - 1; i++) {
        const x = nums[i];
        if (x === 0 && x === nums[i - 1]) continue; //手动去重
        let left = i + 1;
        let right = n - 1;
        while (left < right) {
            const sum = nums[left] + nums[right] + x;
            if (sum > 0) {
                // 大于0，left右移
                left++;
            } else if (sum < 0) {
                // 小于0， right左移
                right--;
            } else {
                res.push([x, nums[left], nums[right]]);
                left++;
                while (left < right && nums[left] === nums[left - 1]) {
                    left++;
                }
                right--;
                while (left < right && nums[right] === nums[right + 1]) {
                    right--;
                }
            }
        }
    }
    return res === undefined ? [] : res;
};
// @lc code=end
// console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// sorted [,-4,-1,-1,0,1,2]
console.log(threeSum([1, -1, -1, 0]));
console.log(threeSum[(0, 0, 0, 0)]);
