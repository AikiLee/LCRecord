/*
 * @lc app=leetcode.cn id=73 lang=javascript
 *
 * [73] 矩阵置零
 *
 * https://leetcode.cn/problems/set-matrix-zeroes/description/
 *
 * algorithms
 * Medium (70.02%)
 * Likes:    1217
 * Dislikes: 0
 * Total Accepted:    560K
 * Total Submissions: 793.6K
 * Testcase Example:  '[[1,1,1],[1,0,1],[1,1,1]]'
 *
 * 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
 * 输出：[[1,0,1],[0,0,0],[1,0,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
 * 输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == matrix.length
 * n == matrix[0].length
 * 1 <= m, n <= 200
 * -2^31 <= matrix[i][j] <= 2^31 - 1
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 一个直观的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
 * 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
 * 你能想出一个仅使用常量空间的解决方案吗？
 *
 *
 */

const { markRaw } = require("vue");

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    /* 
        读题：
        先思考暴力解：利用二重循环来处理。每当读到0时就把上下左右的值置为0.
        不对，直接读0并操作会影响原矩阵，只能记录，开一个二维矩阵，读0 后直接操作新开的二维矩阵
        
        使用二维举证记录0的位置太奢侈了，根本不需要记录所有的0元素，只需要记录扫描到的0的位置就行了。我们可以使用一个Set
        */
    const n = matrix.length;
    const m = matrix[0].length;
    // let zeroCount = 0;
    // const myMap = new Map();
    // for (let i = 0; i < n; i++) {
    //     for (let j = 0; j < m; j++) {
    //         if (matrix[i][j] === 0) {
    //             zeroCount++;
    //             // 记录0的位置,还是想保持顺序
    //             myMap.set(zeroCount, [i, j]);
    //         }
    //     }
    // }
    // for (let i = 1; i <= zeroCount; i++) {
    //     // 直接解构了
    //     const temp = myMap.get(i);
    //     const [x,y] = temp;
    //     for (let j = 0; j < m; j++) {
    //         matrix[x][j] = 0;
    //     }
    //     for (let j = 0; j < n; j++) {
    //         matrix[j][y] = 0;
    //     }
    // }
    // return matrix;

    /**
     *  我们为什么要用额外的空间来处理，就是怕更新的时候，将其他元素也变成0 ，导致错误判断
     * 
     */


};
// @lc code=end
console.log(
    setZeroes([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
    ])
);
console.log(
    setZeroes([
        [0, 1, 2, 0],
        [3, 4, 5, 2],
        [1, 3, 1, 5],
    ])
);
// md忘完了，这是对对象的解构
// const {x,y} = [1,1];
// console.log(x,y);
