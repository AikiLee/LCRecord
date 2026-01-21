/*
 * @lc app=leetcode.cn id=994 lang=javascript
 *
 * [994] 腐烂的橘子
 *
 * https://leetcode.cn/problems/rotting-oranges/description/
 *
 * algorithms
 * Medium (53.87%)
 * Likes:    1019
 * Dislikes: 0
 * Total Accepted:    298.3K
 * Total Submissions: 549.3K
 * Testcase Example:  '[[2,1,1],[1,1,0],[0,1,1]]'
 *
 * 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：
 *
 *
 * 值 0 代表空单元格；
 * 值 1 代表新鲜橘子；
 * 值 2 代表腐烂的橘子。
 *
 *
 * 每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。
 *
 * 返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
 * 输出：-1
 * 解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[0,2]]
 * 输出：0
 * 解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10
 * grid[i][j] 仅为 0、1 或 2
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    const m = grid.length,
        n = grid[0].length;
    let time = 0; // 记录已经过的分钟数
    let q = [];
    let ans = 0; //记录当前剩余的新鲜橘子数量
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    /* 
        0：为空 ； 1：新鲜橘子 ； 2：腐烂的橘子
        这一题不是dfs，而是bfs。
    */
    const isAera = (i, j) => {
        return i >= 0 && i < m && j >= 0 && j < n;
    };
    // 分别统计新鲜和腐烂的橘子，将腐烂橘子放入队列额中
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const t = grid[i][j];
            if (t === 1) {
                ans++;
            } else if (t === 2) {
                q.push([i, j]);
            }
        }
    }
    while (q.length > 0) {
        if (ans === 0) return time; //新鲜橘子被消耗完了
        let qz = q.length;
        while (qz--) {
            const [x, y] = q.shift();
            for (const [dx, dy] of [
                [0, 1],
                [0, -1],
                [1, 0],
                [-1, 0],
            ]) {
                const i = x + dx;
                const j = y + dy;
                if (isAera(i, j) && grid[i][j] === 1) {
                    grid[i][j] = 2;
                    ans--;
                    q.push([i, j]);
                }
            }
            // 一轮腐烂完了，time++
        }
        time++;
    }
    return ans ? -1 : time;
};
// @lc code=end
console.log(
    orangesRotting([
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1],
    ])
); //expected 4
console.log(
    orangesRotting([
        [2, 1, 1],
        [0, 1, 1],
        [1, 0, 1],
    ])
); //expected -1
console.log(orangesRotting([[0, 2]])); //expected 0
