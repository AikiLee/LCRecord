/*
 * @lc app=leetcode.cn id=139 lang=javascript
 *
 * [139] 单词拆分
 *
 * https://leetcode.cn/problems/word-break/description/
 *
 * algorithms
 * Medium (57.81%)
 * Likes:    2747
 * Dislikes: 0
 * Total Accepted:    784K
 * Total Submissions: 1.3M
 * Testcase Example:  '"leetcode"\n["leet","code"]'
 *
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
 *
 * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: s = "leetcode", wordDict = ["leet", "code"]
 * 输出: true
 * 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
 *
 *
 * 示例 2：
 *
 *
 * 输入: s = "applepenapple", wordDict = ["apple", "pen"]
 * 输出: true
 * 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
 * 注意，你可以重复使用字典中的单词。
 *
 *
 * 示例 3：
 *
 *
 * 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * 输出: false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 300
 * 1 <= wordDict.length <= 1000
 * 1 <= wordDict[i].length <= 20
 * s 和 wordDict[i] 仅由小写英文字母组成
 * wordDict 中的所有字符串 互不相同
 *
 *
 */

const { max } = require("lodash");

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    /* 基本思路
         先采用回溯算法： set + set.has来判
         1.思考子问题：选或不选 / ✅如何循环
         2. 如何进行状态转移：
         可以发现这个不是典型的dfs(i-1)+dfs(xxx)问题，这是需要达到一定条件之后才能继续往下走。

         3.递归入口
         dfs(s.length)
         4.优化
            使用记忆化搜索减少重复计算
    */
    // 寻找最大长度
    const maxLen = Math.max(...wordDict.map((word) => word.length));
    const words = new Set(wordDict);
    // // 记录计算结果
    // const memo = new Array(maxLen + 1);
    // // 先不使用记忆化搜索，纯回溯做法;
    // const dfs = (i) => {
    //     if (i === 0) {
    //         // 正好找到
    //         return true;
    //     }
    //     if (memo[i] !== undefined) return memo[i];
    //     // i开始是数组长度，所以j = i-1;

    //     for (let j = i - 1; j >= Math.max(i - maxLen, 0); j--) {
    //         if (words.has(s.slice(j, i)) && dfs(j)) {
    //             return (memo[i] = true); // 记忆化
    //         }
    //     }
    //     return (memo[i] = false);
    // };

    // return dfs(s.length);
    /* 
        改用递归来实现：
        1. 状态转移方程：
            
    
    */
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for(let i = 1 ; i<= n;i++){
        for(let j = i -1 ; j >= Math.max(i - maxLen, 0) ;j--){
            if(dp[j] && words.has(s.slice(j,i))){
                dp[i] = true;
                break;
            }

        }
    }
    return dp[n];

    



};
// @lc code=end
console.log(
    wordBreak(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"]
    )
);
// console.log(wordBreak("leetcode", ["leet", "code"]));
// console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"]))
