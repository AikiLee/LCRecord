/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 *
 * https://leetcode.cn/problems/coin-change/description/
 *
 * algorithms
 * Medium (50.52%)
 * Likes:    3047
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 2.1M
 * Testcase Example:  '[1,2,5]\n11'
 *
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 *
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 *
 * 你可以认为每种硬币的数量是无限的。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：coins = [1, 2, 5], amount = 11
 * 输出：3
 * 解释：11 = 5 + 5 + 1
 *
 * 示例 2：
 *
 *
 * 输入：coins = [2], amount = 3
 * 输出：-1
 *
 * 示例 3：
 *
 *
 * 输入：coins = [1], amount = 0
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= coins.length <= 12
 * 1 <= coins[i] <= 2^31 - 1
 * 0 <= amount <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// var coinChange = function (coins, amount) {
//     const memo = new Array(amount + 1).fill(Infinity);
//     const dfs = (coins, amount) => {
//         // 正好找到解
//         if (amount === 0) return 0;
//         // 找不到解
//         if (amount < 0) return -1;
//         if (memo[amount] !== Infinity) return memo[amount];
//         // 记录路径长度，找小
//         let res = Infinity;
//         for (let coin of coins) {
//             const sub = dfs(coins, amount - coin);
//             if (sub === -1) continue;
//             res = Math.min(res, sub + 1);
//         }
//         return (memo[amount] = res);
//     };
//     return dfs(coins, amount);
// };

var coinChange = function (coins, amount) {
    /* 
        改为动态规划：
        1. 如何转换：
        2. 状态转移方程：f[i] = Math.min(f[i],f[i-coins[j]]+1)
        3.如何变化，Math.min,初始状态设置为Infinity
    */
    /* 
        先考虑递归写法：
        1.思考子问题：循环+dfs
            选择一个硬币，将amount减去对应值，判断和是否为amount，如果是，记录方案；如果不是继续循环和递归
        2.状态转移：
            dfs(i) = Math.min(dfs(i-coins[j])+1,dfs(i-1));
            注意点： 由于是要求最小，可以初始化为Infinity
            
        3.入口
            dfs(amount)
        4.优化：
            记忆化搜索
    */
    const n = coins.length;

    // const dfs = (i,c) => {
    //     // 找不到就返回-1
    //     if(i===0) return c===amount?0:-1;
    //     for(let x of coins){
    //         if(c >= x) return Math.min(dfs(i-1,c),dfs(i-1,c-x))+1;
    //     }

    // }
    // return dfs(n-1,amount);

    const memo = new Array(n + 1).fill(-1).map(() => Array(amount + 1).fill(-1));
    // 数组递增才能这么干
    // const dfs = (i,c) => {
    //     if(i<0) return c===0 ? 1 : Infinity / 2 + 1;
    //     if(memo[i][c] !== -1 ) return memo[i][c];
    //     if(coins[i] > c) return memo[i][c] = dfs(i-1,c);
    //     return memo[i][c] = Math.min(dfs(i-1,c),dfs(i,c-coins[i])+1);
    // }
    // let ans = dfs(n-1,amount);
    // return ans === Infinity / 2 + 1 ? -1 : ans;

};

// @lc code=end
console.log(coinChange([1, 2, 5], 11));
