/*
 * @lc app=leetcode.cn id=2787 lang=javascript
 *
 * [2787] 将一个数字表示成幂的和的方案数
 *
 * https://leetcode.cn/problems/ways-to-express-an-integer-as-sum-of-powers/description/
 *
 * algorithms
 * Medium (49.76%)
 * Likes:    32
 * Dislikes: 0
 * Total Accepted:    13.1K
 * Total Submissions: 26.3K
 * Testcase Example:  '10\n2'
 *
 * 给你两个 正 整数 n 和 x 。
 *
 * 请你返回将 n 表示成一些 互不相同 正整数的 x 次幂之和的方案数。换句话说，你需要返回互不相同整数 [n1, n2, ..., nk]
 * 的集合数目，满足 n = n1^x + n2^x + ... + nk^x 。
 *
 * 由于答案可能非常大，请你将它对 10^9 + 7 取余后返回。
 *
 * 比方说，n = 160 且 x = 3 ，一个表示 n 的方法是 n = 2^3 + 3^3 + 5^3^ 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 10, x = 2
 * 输出：1
 * 解释：我们可以将 n 表示为：n = 3^2 + 1^2 = 10 。
 * 这是唯一将 10 表达成不同整数 2 次方之和的方案。
 *
 *
 * 示例 2：
 *
 * 输入：n = 4, x = 1
 * 输出：2
 * 解释：我们可以将 n 按以下方案表示：
 * - n = 4^1 = 4 。
 * - n = 3^1 + 1^1 = 4 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 300
 * 1 <= x <= 5
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var numberOfWays = function (n, x) {
    const MOD = 1e9 + 7;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= n; i++) {
            let pow = Math.pow(i, x);
            if(pow > n) break;
        for (let j = n; j >= pow; j--) {
            dp[j] = (dp[j] + dp[j - pow]) % MOD;
        }
    }
    return dp[n];

};
// @lc code=end
console.log(numberOfWays(10, 2));
