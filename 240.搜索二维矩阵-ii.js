/*
 * @lc app=leetcode.cn id=240 lang=javascript
 *
 * [240] 搜索二维矩阵 II
 *
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/description/
 *
 * algorithms
 * Medium (55.27%)
 * Likes:    1663
 * Dislikes: 0
 * Total Accepted:    627.5K
 * Total Submissions: 1.1M
 * Testcase Example:  '[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n' +
  '5'
 *
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
 * 
 * 
 * 每行的元素从左到右升序排列。
 * 每列的元素从上到下升序排列。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：matrix =
 * [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],
 * target = 5
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：matrix =
 * [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],
 * target = 20
 * 输出：false
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == matrix.length
 * n == matrix[i].length
 * 1 <= n, m <= 300
 * -10^9 <= matrix[i][j] <= 10^9
 * 每行的所有元素从左到右升序排列
 * 每列的所有元素从上到下升序排列
 * -10^9 <= target <= 10^9
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    /**
     * 先简单做一下：以行为单位，若当前数大于当前行最后一个或小于第一个，直接跳到下一行
     *
     *
     *
     *  */
    const n = matrix.length;
    const m = matrix[0].length;
    /* 如何利用性质来优化，我们只是利用了性质一；
        我们可以先用两个数组把首尾读出来，之间锁定target在哪个区间，之后再判断. 哒咩，依然会超时。
        因为是有序数组考虑使用二分进行优化
    
    */

    // const binarySearch = (arr, target) => {
    //     let low = 0,
    //         high = arr.length - 1;
    //     while (low <= high) {
    //         const mid = low + Math.floor((high - low) / 2);
    //         // 正好找到，返回true
    //         if (arr[mid] === target) return true;
    //         else if (arr[mid] < target) {
    //             // arr[mid]小于target说明low需要右移
    //             low = mid + 1;
    //         } else {
    //             // arr[mid]大于target说明high需要左移
    //             high = mid - 1;
    //         }
    //     }
    //     // 没找到
    //     return false;
    // };
    // // 先判断target在哪个区间，之后再利用二分判断
    // for (const row of matrix) {
    //     const index = binarySearch(row, target);
    //     if (index) {
    //         return true;
    //     }
    // }
    // return false;

    /* 
    继续优化，对于col和row均有序的case，没有将条件用完。换一种想法，如果target不在这个位置，那个这一列就可以直接被排除了，因为列是递增的。我们直接可以使用两个指针来暂存位置。
    又因为结果唯一，当小于target时，我们可以找下一行的数，i++
    
    
    */
    let i = 0,  j = m - 1 ; 
    while (i < n && j < m) { 
        // 当i,j还在矩阵范围内部;每次处理
        if (matrix[i][j] === target) {
            return true;
        } else if (matrix[i][j] > target) {
            j--;
        } else {
            i++;
        }
    }
    return false;

};
// @lc code=end
console.log(
    searchMatrix(
        [
            [1, 4, 7, 11, 15],
            [2, 5, 8, 12, 19],
            [3, 6, 9, 16, 22],
            [10, 13, 14, 17, 24],
            [18, 21, 23, 26, 30],
        ],
        5
    )
); // expected true
console.log(
    searchMatrix(
        [
            [1, 4, 7, 11, 15],
            [2, 5, 8, 12, 19],
            [3, 6, 9, 16, 22],
            [10, 13, 14, 17, 24],
            [18, 21, 23, 26, 30],
        ],
        20
    )
); // expected false
