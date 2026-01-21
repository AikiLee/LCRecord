/*
 * @lc app=leetcode.cn id=518 lang=javascript
 *
 * [518] 零钱兑换 II
 *
 * https://leetcode.cn/problems/coin-change-ii/description/
 *
 * algorithms
 * Medium (68.98%)
 * Likes:    1401
 * Dislikes: 0
 * Total Accepted:    403.6K
 * Total Submissions: 588.4K
 * Testcase Example:  '5\n[1,2,5]'
 *
 * 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。
 *
 * 请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。
 *
 * 假设每一种面额的硬币有无限个。
 *
 * 题目数据保证结果符合 32 位带符号整数。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：amount = 5, coins = [1, 2, 5]
 * 输出：4
 * 解释：有四种方式可以凑成总金额：
 * 5=5
 * 5=2+2+1
 * 5=2+1+1+1
 * 5=1+1+1+1+1
 *
 *
 * 示例 2：
 *
 *
 * 输入：amount = 3, coins = [2]
 * 输出：0
 * 解释：只用面额 2 的硬币不能凑成总金额 3 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：amount = 10, coins = [10]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * coins 中的所有值 互不相同
 * 0
 *
 *
 */

// @lc code=start
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
    const n = coins.length;
    // const memo = new Array(n ).fill(0).map(() => new Array(amount + 1).fill(-1));
    // const dfs = (i, c) => {
    //     if (i < 0) return c === 0 ? 1 : 0;

    //     if (memo[i][c] !== -1) return memo[i][c];
    //     if(coins[i] > c) return  memo[i][c] = dfs(i - 1, c);
    //     return memo[i][c] = dfs(i - 1, c) + dfs(i, c - coins[i]);
    // };
    // return dfs(n - 1, amount);

    //翻译为递推
    const f = new Array(n + 1).fill(0).map(() => Array(amount + 1).fill(0));
    f[0][0] = 1;
    for (let i = 0; i < n; i++) {
        const x = coins[i];
        for (let c = 0; c <= amount; c++) {
            if (x > c) f[i + 1][c] = f[i][c];
            else f[i + 1][c] = f[i][c] + f[i + 1][c - x];
        }
    }
    return f[n][amount];
};
// @lc code=end

console.log(change(5, [1, 2, 5]));
