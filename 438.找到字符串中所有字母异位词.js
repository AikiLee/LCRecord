/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 *
 * https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/
 *
 * algorithms
 * Medium (53.98%)
 * Likes:    1676
 * Dislikes: 0
 * Total Accepted:    687.6K
 * Total Submissions: 1.3M
 * Testcase Example:  '"cbaebabacd"\n"abc"'
 *
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "cbaebabacd", p = "abc"
 * 输出: [0,6]
 * 解释:
 * 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
 * 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "abab", p = "ab"
 * 输出: [0,1,2]
 * 解释:
 * 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
 * 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
 * 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= s.length, p.length <= 3 * 10^4
 * s 和 p 仅包含小写字母
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    /* 
        读题：如何判断异位词：
        简单来说对于p串的任意排列组合都是都是异位 "abc" -> "abc" , "acb" , "bac" , "bca" , "cab" , "cba"。那应该如何检测？
            1. 读出p数组长度，然后再s数组依次比较
            2. 具体每一段如何比较，

    
    */
    const n = s.length;
    // 制造模板字符串,你这样制造是不对的，这样只能判断字符串是p的子串而不一定是异位词
    //    const template = p.split('');
    // 正确的方案，是创建26位字母的数组，二者字母数组对应一致，才能表示为异位词
    const ans = [];
    const cntP = new Array(26).fill(0);
    const cntS = new Array(26).fill(0);
    for (const c of p) {
        // 读取p的字符
        cntP[c.charCodeAt() - "a".charCodeAt()]++;
    }
    for (let right = 0; right < s.length; right++) {
        cntS[s[right].charCodeAt() - "a".charCodeAt()]++;
        const left = right - p.length + 1;
        if (left < 0) continue;
        if (_.isEqual(cntS, cntP)) {
            ans.push(left);
        }
        cntS[s[left].charCodeAt() - "a".charCodeAt()]--;
    }
    return ans;
};
// @lc code=end
console.log(findAnagrams("cbaebabacd", "abc"))