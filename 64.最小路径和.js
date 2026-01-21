/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 *
 * https://leetcode.cn/problems/minimum-path-sum/description/
 *
 * algorithms
 * Medium (71.78%)
 * Likes:    1815
 * Dislikes: 0
 * Total Accepted:    764.2K
 * Total Submissions: 1.1M
 * Testcase Example:  '[[1,3,1],[1,5,1],[4,2,1]]'
 *
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 
 * 说明：每次只能向下或者向右移动一步。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
 * 输出：7
 * 解释：因为路径 1→3→1→1→1 的总和最小。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：grid = [[1,2,3],[4,5,6]]
 * 输出：12
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 200
 * 0 <= grid[i][j] <= 200
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    // 使用记忆化搜索优化
    const memo = Array(m).fill(0).map(() => new Array(n).fill(-1));
    // 一看题目最小，需要经过比较，所以就事先准备最大值，以便于能取到正确的值。    
    const dfs = (i,j,grid) => {
        // 为什么需要这个，因为是取小
        if(i<0 || j<0){
            return Number.MAX_VALUE;
        }
        // 回到出发点
        if(i == 0 && j == 0) return grid[i][j];
        if(memo[i][j] !== -1) return memo[i][j];
        // 往右和往下走，谁会更小
        return memo[i][j] = Math.min(dfs(i,j-1,grid),dfs(i-1,j,grid)) + grid[i][j];
        
    }
    return dfs(m-1,n-1,grid);
};
// @lc code=end
console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]));  //expected 7
