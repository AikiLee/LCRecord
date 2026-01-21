/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 *
 * https://leetcode.cn/problems/edit-distance/description/
 *
 * algorithms
 * Medium (63.53%)
 * Likes:    3672
 * Dislikes: 0
 * Total Accepted:    654K
 * Total Submissions: 1M
 * Testcase Example:  '"horse"\n"ros"'
 *
 * 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
 *
 * 你可以对一个单词进行如下三种操作：
 *
 *
 * 插入一个字符
 * 删除一个字符
 * 替换一个字符
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：word1 = "horse", word2 = "ros"
 * 输出：3
 * 解释：
 * horse -> rorse (将 'h' 替换为 'r')
 * rorse -> rose (删除 'r')
 * rose -> ros (删除 'e')
 *
 *
 * 示例 2：
 *
 *
 * 输入：word1 = "intention", word2 = "execution"
 * 输出：5
 * 解释：
 * intention -> inention (删除 't')
 * inention -> enention (将 'i' 替换为 'e')
 * enention -> exention (将 'n' 替换为 'x')
 * exention -> exection (将 'n' 替换为 'c')
 * exection -> execution (插入 'u')
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= word1.length, word2.length <= 500
 * word1 和 word2 由小写英文字母组成
 *
 *
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const s = word1.split("");
    const t = word2.split("");
    const n = s.length;
    const m = t.length;
    const memo = new Array(n + 1).fill(0).map(() => Array(m + 1).fill(-1));
    /* 
        读题：提供三种操作方式，增删换，对应的方案有六种，但经过思考，增和删是同一种，换和不选是同一种，所以降低为四种。
        子问题： 线性dp和背包问题不太一样，i,j分别对应着两个不同的数组。可以在dfs过程种进行比较
        状态转移：s[i] === t[j] 时，dfs(i-1,j-1)选和不选相同； min(dfs(i-1,j),dfs(i,j-1)) 
        举例：word1="" , word2="abc"; 返回j + 1；
        递归出口： i < 0 时，返回j+1； j < 0时，返回i+1
        递归入口： dfs(n,m)
    */
    // const dfs = (i, j) => {
    //     if (i < 0) return j + 1; //插入剩余字符
    //     if (j < 0) return i + 1;
    //     if (memo[i][j] !== -1) return memo[i][j];
    //     if (s[i] === t[j]) return (memo[i][j] = dfs(i - 1, j - 1));
    //     return (memo[i][j] = Math.min(dfs(i - 1, j - 1) + 1, Math.min(dfs(i, j - 1) + 1, dfs(i - 1, j) + 1)));
    // };
    // return dfs(n, m);
    // 转为递推
    // const f = new Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));
    // for (let j = 0; j < m; j++) {
    //     f[0][j + 1] = j + 1;
    // }
    // for (let i = 0; i < n; i++) {
    //     f[i][0] = i; //插入
    //     for (let j = 0; j <= m; j++) {
    //         f[i + 1][j + 1] = s[i] === t[j] ? f[i][j] : Math.min(f[i][j], Math.min(f[i][j + 1], f[i + 1][j])) + 1;
    //     }
    // }
    // return f[n][m];
    // 优化为一维数组
    


};
// @lc code=end
console.log(minDistance("horse", "ros"));
