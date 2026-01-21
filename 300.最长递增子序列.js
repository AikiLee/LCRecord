/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 *
 * https://leetcode.cn/problems/longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (57.13%)
 * Likes:    3971
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 2.1M
 * Testcase Example:  '[10,9,2,5,3,7,101,18]'
 *
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 *
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7]
 * 的子序列。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [10,9,2,5,3,7,101,18]
 * 输出：4
 * 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1,0,3,2,3]
 * 输出：4
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [7,7,7,7,7,7,7]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 2500
 * -10^4 <= nums[i] <= 10^4
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你能将算法的时间复杂度降低到 O(n log(n)) 吗?
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    /**
        读题：
            整数数组；严格递增；求最长子序列，序列需要连续，考虑使用Math.max注意递归出口的返回条件；这一题不是严格的01或背包问题，就是动态规划
        回溯：
            1. 子问题：
                将元素依次加入，每个元素只能选一次；是否需要维护一个递增数组？不需要，直接可以用一个preValue作为参数替代；
            2. 状态转移： 这里需要考虑的仅是prevalue < nums[i]的情况（其他情况直接被筛选），两种case
             - 和preValue相同，不选，但是i-1
             - 和preValue不同，选，更新max和preValue
            3. 递归出口:
                - i<0 递归结束
            4. 递归入口dfs(n-1, Infinity, n)

     */
    const n = nums.length;
    // const memo = new Array(n).fill(0).map(() => Array(n + 1).fill(-1));
    // const dfs = (i, max, index) => {
    //     if (i < 0) return 0;
    //     if (memo[i][index] !== -1) return memo[i][index];
    //     if (max > nums[i]) {
    //         // 分别对应着选不同和选相同
    //         const length = Math.max(dfs(i - 1, nums[i], i) + 1, dfs(i - 1, max, index));
    //         return (memo[i][index] = length);
    //     }
    //     const length = dfs(i - 1, max, index);
    //     return (memo[i][index] = length);
    // };
    // return dfs(n - 1, Infinity, n);

    // 改为dp
    // const f = new Array(n + 1).fill(1);
    // for (let i = 0; i < n; i++) {
    //     for (let j = 0; j < i; j++) {
    //         //如果满足上升条件，更新dp数组
    //         if (nums[i] > nums[j]) {
    //             f[i] = Math.max(f[i], f[j] + 1);
    //         }
    //     }

    // }
    // return Math.max(...f);
    // const memo = new Array(n).fill(-1);
    // // 还是不要记录下标，太容易出错了；这里直接循环+记录就搞定了
    // const dfs = (i) => {
    //     if (memo[i] !== -1) return memo[i];
    //     let maxLen = 1;
    //     for (let j = 0; j < i; j++) {
    //         if (nums[i] > nums[j]) {
    //             maxLen = Math.max(maxLen, dfs(j) + 1);
    //         }
    //     }
    //     return (memo[i] = maxLen); //保留计算结果
    // };
    // let result = 0;
    // for (let i = 0; i < n; i++) {
    //     result = Math.max(result, dfs(i));
    // }
    // return result;

    // 改为dp

};
// @lc code=end
// console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));
