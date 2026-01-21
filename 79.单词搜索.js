/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 *
 * https://leetcode.cn/problems/word-search/description/
 *
 * algorithms
 * Medium (48.65%)
 * Likes:    2010
 * Dislikes: 0
 * Total Accepted:    692.5K
 * Total Submissions: 1.4M
 * Testcase Example:  '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"'
 *
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false
 * 。
 *
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
 * "ABCCED"
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
 * "SEE"
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
 * "ABCB"
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == board.length
 * n = board[i].length
 * 1
 * 1
 * board 和 word 仅由大小写英文字母组成
 *
 *
 *
 *
 * 进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？
 *
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    const m = board.length,
        n = board[0].length;
    const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));
    let flag = false;
    // 这里使用一个小小的优化，使用index来代替路径数组
    const dfs = (i, j, index) => {
        if (index === word.length) return true;
        if (i < 0 || i >= m || j < 0 || j > n || visited[i][j] === true || board[i][j] !== word[index]) {
            // 越界或者已经访问过的
            return false;
        }
        // 标记为已访问
        visited[i][j] = true;
        // 右下上左
        const res = dfs(i, j + 1, index + 1) || dfs(i + 1, j, index + 1) || dfs(i - 1, j, index + 1) || dfs(i, j - 1, index + 1);

        // 放弃选择
        visited[i][j] = false;
        return res;
    };
    // 这东西是多源dfs，还是以循环来开始
    const firstLetter = word[0];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === firstLetter && dfs(i, j, 0)) {
                return true;
            }
        }
    }
    return false;
};
// @lc code=end
console.log(
    exist(
        [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
        ],
        "ABCCED"
    )
); //expected true;

console.log(
    exist(
        [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
        ],
        "SEE"
    )
);  //expected true;
console.log(
    exist(
        [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
        ],
        "ABCB"
    )
);      //expected false;
