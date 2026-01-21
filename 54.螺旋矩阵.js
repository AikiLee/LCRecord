/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 *
 * https://leetcode.cn/problems/spiral-matrix/description/
 *
 * algorithms
 * Medium (53.05%)
 * Likes:    1929
 * Dislikes: 0
 * Total Accepted:    747.9K
 * Total Submissions: 1.4M
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == matrix.length
 * n == matrix[i].length
 * 1
 * -100
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    /* 
        读题：如何控制顺时针旋转。常规的循环很难做到，只能考虑dfs。
        实现思路：
        1. 需要确定是否访问过，新开一个visited二维数组，初始化全为false。
        2. 确定访问顺序，右 -> 下 -> 左 -> 上 
        3. 确定边界条件，当matrix为空时，返回空数组。
        还是不行，只能通过迭代的方式来做了。
        经过分析可以看出，这是一个从外到内的循环；每次都有四步：右 -> 下 -> 左 -> 上
        边界条件：top<=bottom && left<=right
        */
    const n = matrix.length,
        m = matrix[0].length;
    let top = 0,
        bottom = n - 1;
    let left = 0,
        right = m - 1;
    const res = [];
    while (left <= right && top <= bottom) {
        //分四步进行操作
        for (let i = left; i <= right; i++) {
            // 向右遍历
            res.push(matrix[top][i]);
        }
        top++;
        for (let i = top; i <= bottom; i++) {
            // 向下遍历
            res.push(matrix[i][right]);
        }
        right--;
        if (top <= bottom) {
            // 向左遍历
            for (let i = right; i >= left; i--) {
                res.push(matrix[bottom][i]);
            }
            bottom--;
        }
        if (left <= right) {
            // 向上遍历
            for (let i = bottom; i >= top; i--) {
                res.push(matrix[i][left]);
            }
            left++;
        }
    }
    return res;
};
// @lc code=end
// console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
// console.log(
//     spiralOrder([
//         [1, 2, 3, 4],
//         [5, 6, 7, 8],
//         [9, 10, 11, 12],
//     ])
// );  //expected [1,2,3,4,8,12,11,10,9,5,6,7]
console.log(
    spiralOrder([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
        [17, 18, 19, 20],
        [21, 22, 23, 24],
    ])
);  //expected [1,2,3,4,8,12,16,20,24,23,22,21,17,13,9,5,6,7,11,15,19,18,14,10]
