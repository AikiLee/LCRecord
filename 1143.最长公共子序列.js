/*
 * @lc app=leetcode.cn id=1143 lang=javascript
 *
 * [1143] 最长公共子序列
 *
 * https://leetcode.cn/problems/longest-common-subsequence/description/
 *
 * algorithms
 * Medium (66.37%)
 * Likes:    1744
 * Dislikes: 0
 * Total Accepted:    626.8K
 * Total Submissions: 941.1K
 * Testcase Example:  '"abcde"\n"ace"'
 *
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
 *
 * 一个字符串的 子序列
 * 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 *
 *
 * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
 *
 *
 * 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：text1 = "abcde", text2 = "ace"
 * 输出：3
 * 解释：最长公共子序列是 "ace" ，它的长度为 3 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：text1 = "abc", text2 = "abc"
 * 输出：3
 * 解释：最长公共子序列是 "abc" ，它的长度为 3 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：text1 = "abc", text2 = "def"
 * 输出：0
 * 解释：两个字符串没有公共子序列，返回 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * text1 和 text2 仅由小写英文字符组成。
 *
 *
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const s = text1.split(""); //转换为数组，便于操作
    const t = text2.split("");
    const n1 = s.length;
    const n2 = t.length;
    const memo = new Array(n1).fill(0).map(() => Array(n2).fill(-1));
    /* 
        读题：子序列，并不一定连续（子列,子串一般才要求连续）;求最大，需要Math.max,注意返回0/-Infinity，做好状态区分；
        这种线性dp问题dfs的两个变量就不是sequence，capacity了。而表示两边的sequence
        子问题：分别选取两个字符数组的一个元素，然后判断是否相同
        //简单排列组合可知，有四种情况 (i,j) 不选 （i-1,j) 选了，但是不同 ,(i,j-1) 选了，但是不同 (i-1,j-1) 选了且相同
        状态转移： dfs(i-1,j-1) + 1 or dfs(i-1,j) ,dfs(i,j-1)
        递归出口： i < 0 || j<0 
        递归入口： dfs(n,m);
    */
    // const dfs = (i, j) => {
    //     if (i < 0 || j < 0) return 0;
    //     if (memo[i][j] !== -1) return memo[i][j];
    //     if (t1[i] === t2[j]) return (memo[i][j] = dfs(i - 1, j - 1) + 1);
    //     return (memo[i][j] = Math.max(dfs(i - 1, j), dfs(i, j - 1)));
    // };
    // return dfs(n1 - 1, n2 - 1);

    // const f = new Array(n1+1).fill(0).map(() => Array(n2+1).fill(0));
    // for(let i = 0 ; i < n1 ;i++){
    //     for(let j = 0 ; j< n2; j++){
    //         f[i+1][j+1] = s[i] === t[j] ? f[i][j] + 1: Math.max(f[i][j+1] , f[i+1][j]);
    //     }
    // }
    // return f[n1][n2];

    // const f = new Array(n2 + 1).fill(0);
    // for (const x of s) {
    //     let pre = 0;
    //     for (let j = 0; j < n2; j++) {
    //         let tmp = f[j + 1];
    //         f[j + 1] = x === t[j] ? pre + 1 : Math.max(f[j + 1], f[j]);
    //         pre = tmp;
    //     }
    // }
    // return f[n2];
};
// @lc code=end
console.log(longestCommonSubsequence("abcde", "ace"));
