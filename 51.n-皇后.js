/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 *
 * https://leetcode.cn/problems/n-queens/description/
 *
 * algorithms
 * Hard (75.21%)
 * Likes:    2303
 * Dislikes: 0
 * Total Accepted:    541.7K
 * Total Submissions: 718K
 * Testcase Example:  '4'
 *
 * 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。
 *
 * n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 *
 * 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
 *
 *
 *
 * 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 4
 * 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 * 解释：如上图所示，4 皇后问题存在两个不同的解法。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1
 * 输出：[["Q"]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 9
 *
 *
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    /* 
        思路：
        1. 先理解题意：
            n个皇后不能互相攻击 <=> 皇后不能在同一行、同一列、同一斜线上 <=> 如判断，可以使用一个数组：col , [r,col[r]]表示皇后的位置。
            斜线比较特殊：行号 - 列号 = 固定值。diag1, diag2,
        2. 创建一个数组，保存皇后的位置。queens
        3. 
    
    */
    const queens = new Array(n).fill(0);
    const col = new Array(n).fill(0);
    const res = [];
    const diag1 = new Array(2 * n - 1).fill(0);
    const diag2 = new Array(2 * n - 1).fill(0);
    const dfs = (r) => {
        if (r === n) {
            res.push(queens.map((c) => ".".repeat(c) + "Q" + ".".repeat(n - c - 1)));
            return;
        }

        for (let c = 0; c < n; c++) {
            let rc = r - c + n - 1;
            if (!col[c] && !diag1[r + c] && !diag2[rc]) {
                queens[r] = c;
                col[c] = diag1[r + c] = diag2[rc] = 1;
                dfs(r + 1);
                col[c] = diag1[r + c] = diag2[rc] = 0;
            }
        }
    };
    dfs(0);
    return res;
};
// @lc code=end
console.log(solveNQueens(4));