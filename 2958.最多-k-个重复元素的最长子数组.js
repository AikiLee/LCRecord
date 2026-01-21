/*
 * @lc app=leetcode.cn id=2958 lang=javascript
 *
 * [2958] 最多 K 个重复元素的最长子数组
 *
 * https://leetcode.cn/problems/length-of-longest-subarray-with-at-most-k-frequency/description/
 *
 * algorithms
 * Medium (62.67%)
 * Likes:    42
 * Dislikes: 0
 * Total Accepted:    21.3K
 * Total Submissions: 33.4K
 * Testcase Example:  '[1,2,3,1,2,3,1,2]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k 。
 *
 * 一个元素 x 在数组中的 频率 指的是它在数组中的出现次数。
 *
 * 如果一个数组中所有元素的频率都 小于等于 k ，那么我们称这个数组是 好 数组。
 *
 * 请你返回 nums 中 最长好 子数组的长度。
 *
 * 子数组 指的是一个数组中一段连续非空的元素序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3,1,2,3,1,2], k = 2
 * 输出：6
 * 解释：最长好子数组是 [1,2,3,1,2,3] ，值 1 ，2 和 3 在子数组中的频率都没有超过 k = 2 。[2,3,1,2,3,1] 和
 * [3,1,2,3,1,2] 也是好子数组。
 * 最长好子数组的长度为 6 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,1,2,1,2,1,2], k = 1
 * 输出：2
 * 解释：最长好子数组是 [1,2] ，值 1 和 2 在子数组中的频率都没有超过 k = 1 。[2,1] 也是好子数组。
 * 最长好子数组的长度为 2 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [5,5,5,5,5,5,5], k = 4
 * 输出：4
 * 解释：最长好子数组是 [5,5,5,5] ，值 5 在子数组中的频率没有超过 k = 4 。
 * 最长好子数组的长度为 4 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^9
 * 1 <= k <= nums.length
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function (nums, k) {
    /* 
    读题：整数数组，无序；求子数组元素均小于k的最大长度；考虑窗口滑动；
    滑动窗口三步：
        1. 当元素小于k，right右移
        2. 更新：当出现元素大于k，left++，ans = Math.max(ans, right - left+ 1)
        3. out：left++
   
   */
    const n = nums.length;
    let left = 0;
    let ans = 0;
    const ctn = new Map();
    for (let right = 0; right < n; right++) {
        const cur = nums[right];
        ctn.set(cur, (ctn.get(cur) ?? 0) + 1);
        while (ctn.get(cur) > k) {
            ctn.set(nums[left], ctn.get(nums[left]) - 1);
            left++;
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
};
// @lc code=end
console.log(maxSubarrayLength([1, 2, 3, 1, 2, 3, 1, 2], 2));
console.log(maxSubarrayLength([1,2,1,2,1,2,1,2], 1));
