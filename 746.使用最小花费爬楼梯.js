/*
 * @lc app=leetcode.cn id=746 lang=javascript
 *
 * [746] 使用最小花费爬楼梯
 *
 * https://leetcode.cn/problems/min-cost-climbing-stairs/description/
 *
 * algorithms
 * Easy (67.86%)
 * Likes:    1654
 * Dislikes: 0
 * Total Accepted:    558.6K
 * Total Submissions: 822.4K
 * Testcase Example:  '[10,15,20]'
 *
 * 给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。
 * 
 * 你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
 * 
 * 请你计算并返回达到楼梯顶部的最低花费。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：cost = [10,15,20]
 * 输出：15
 * 解释：你将从下标为 1 的台阶开始。
 * - 支付 15 ，向上爬两个台阶，到达楼梯顶部。
 * 总花费为 15 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：cost = [1,100,1,1,1,100,1,1,100,1]
 * 输出：6
 * 解释：你将从下标为 0 的台阶开始。
 * - 支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。
 * - 支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。
 * - 支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。
 * - 支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。
 * - 支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。
 * - 支付 1 ，向上爬一个台阶，到达楼梯顶部。
 * 总花费为 6 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 2 <= cost.length <= 1000
 * 0 <= cost[i] <= 999
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} cost
 * @return {number}
 * 理解题意：这里的总阶梯数 = cost.length；每一步可以爬1或2个阶梯，起点可以是0/1，求最少花费；这里举例：cost = [10,15,20],总阶梯数可以理解为0，1，2，3，可以直接从1开始，跨2个阶梯，到达顶部，总花费为15。
 * dp回溯之类的问题，都需要先从初始或者结束来考虑问题，很明显本题需要从末尾考虑
 *     1. 考虑子问题：（选或不选/✅怎么枚举）
 *          - 当最后一步选择1，问题就缩小为：从0/1开始，爬到n-1的台阶的最小花费
 *          - 当最后一步选择2，问题缩小为：从0/1开始，爬到n-2的台阶的最小花费
 *     2. 考虑状态转移方程：
 *          这题状态转移方程比较好找：dfs(i) = Math.min(dfs(i-1)+cost[i-1],dfs(i-2)+cost[i-2])
 *     3. 递归入口：
 *          dfs(n) 
 *     4. 优化，使用记忆化搜索减少重复计算
 *          const memo = new Array(len).fill(-1);
 * 
 */
var minCostClimbingStairs = function(cost) {
    const memo = new Array(len+1).fill(-1);
   const len = cost.length;
   const dfs = (i) => {
       if(i<=1) return 0;
       if(memo[i]!==-1) return memo[i];
       return memo[i] = Math.min(dfs(i-1)+cost[i-1],dfs(i-2)+cost[i-2]); 
   }
   return dfs(len);
   
};
// @lc code=end
console.log(minCostClimbingStairs([10,15,20]));
