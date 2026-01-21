/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 *
 * https://leetcode.cn/problems/4sum/description/
 *
 * algorithms
 * Medium (36.74%)
 * Likes:    2055
 * Dislikes: 0
 * Total Accepted:    697.6K
 * Total Submissions: 1.9M
 * Testcase Example:  '[1,0,-1,0,-2,2]\n0'
 *
 * 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a],
 * nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
 *
 *
 * 0 <= a, b, c, d < n
 * a、b、c 和 d 互不相同
 * nums[a] + nums[b] + nums[c] + nums[d] == target
 *
 *
 * 你可以按 任意顺序 返回答案 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,0,-1,0,-2,2], target = 0
 * 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2,2,2,2,2], target = 8
 * 输出：[[2,2,2,2]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 200
 * -10^9 <= nums[i] <= 10^9
 * -10^9 <= target <= 10^9
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    const res = [];
    const n = nums.length;
    nums.sort((a, b) => a - b);
    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        const x = nums[i];
        for (let j = i + 1; j < n - 1; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            const y = nums[j];
            let left = j + 1;
            let right = n - 1;
            while (left < right) {
                const sum = x + y + nums[left] + nums[right];
                if (sum > target) {
                    // 偏大，right--
                    right--;
                } else if (sum < target) {
                    // 偏小，left++
                    left++;
                } else {
                    // 为什么还是进入了死循环，
                    res.push([x, y, nums[left], nums[right]]);
                    left++;
                    while (left < right && nums[left] === nums[left - 1]) left++;
                    while (left < right && nums[right] === nums[right + 1]) right--;
                }
            }
        }
    }

    return res;
};
// @lc code=end
// console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
// exceed time limit
console.log(fourSum([2, 2, 2, 2, 2], 8));
