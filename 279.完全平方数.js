/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 *
 * https://leetcode.cn/problems/perfect-squares/description/
 *
 * algorithms
 * Medium (67.97%)
 * Likes:    2169
 * Dislikes: 0
 * Total Accepted:    698.4K
 * Total Submissions: 1M
 * Testcase Example:  '12'
 *
 * 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
 *
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11
 * 不是。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 12
 * 输出：3
 * 解释：12 = 4 + 4 + 4
 *
 * 示例 2：
 *
 *
 * 输入：n = 13
 * 输出：2
 * 解释：13 = 4 + 9
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    const N = 10000;
    const memo = Array.from(Array(101).fill(-1),()=>Array(N+1).fill(-1));
    const dfs = (i,j) => {
        if(i <= 0) j===0 ? 0:Infinity;
        if(memo[i][j] !== -1) return memo[i][j];
        if(j < i*i) {
            memo = dfs(i-1,j);
        }else{
            memo[i][j] = Math.min(dfs(i-1,j),dfs(i,j-i*i)+1);
        }
        return memo[i][j];
    }

    return dfs(Math.floor(Math.sqrt(n)),n);
};
// @lc code=end
numSquares(12);
