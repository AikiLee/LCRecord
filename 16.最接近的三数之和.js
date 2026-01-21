/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 *
 * https://leetcode.cn/problems/3sum-closest/description/
 *
 * algorithms
 * Medium (44.82%)
 * Likes:    1729
 * Dislikes: 0
 * Total Accepted:    630K
 * Total Submissions: 1.4M
 * Testcase Example:  '[-1,2,1,-4]\n1'
 *
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
 *
 * 返回这三个数的和。
 *
 * 假定每组输入只存在恰好一个解。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-1,2,1,-4], target = 1
 * 输出：2
 * 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2)。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,0,0], target = 1
 * 输出：0
 * 解释：与 target 最接近的和是 0（0 + 0 + 0 = 0）。
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= nums.length <= 1000
 * -1000 <= nums[i] <= 1000
 * -10^4 <= target <= 10^4
 *
 *
 */

const { sum } = require("lodash");

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    const n = nums.length;
    // 先排序一下，便于后续处理
    nums.sort((a, b) => a - b);
    let min = Infinity;
    let res = 0;
    for (let i = 0; i < n - 1; i++) {
        const x = nums[i];
        if (i > 0 && nums[i - 1] === x) continue;
        let left = i + 1;
        let right = n - 1;
        while (left < right) {
            const sum = x + nums[left] + nums[right];
            const dist = Math.abs(sum - target);
            if (dist === 0) return sum; //正好找到
            if (dist < min) {
                // 说明找到更小的,不应该将min的更新放在逻辑判断中
                min = dist;
                // 结果更新
                res = sum;
            }
            if (sum > target) {
                right--;
                while (left < right && nums[right] === nums[right + 1]) right--;
            } else {
                left++;
                while (left < right && nums[left] === nums[left - 1]) left++;
            }
            // 找到的更大，继续循环
        }
    }
    return res;
};
// @lc code=end
console.log(threeSumClosest([-1, 2, 1, -4], 1)); //ans: 2
console.log(threeSumClosest([0, 0, 0], 1));
console.log(threeSumClosest([0,1,2], 3));
console.log(threeSumClosest([1,1,1,1], 0));
console.log(threeSumClosest([10, 20, 30, 40, 50, 60, 70, 80, 90], 1));
console.log(threeSumClosest([1, 3, 4, 7, 8, 9], 15));
