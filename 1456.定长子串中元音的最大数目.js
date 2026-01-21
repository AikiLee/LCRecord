/*
 * @lc app=leetcode.cn id=1456 lang=javascript
 *
 * [1456] 定长子串中元音的最大数目
 *
 * https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/
 *
 * algorithms
 * Medium (60.27%)
 * Likes:    170
 * Dislikes: 0
 * Total Accepted:    104.5K
 * Total Submissions: 172.3K
 * Testcase Example:  '"abciiidef"\n3'
 *
 * 给你字符串 s 和整数 k 。
 *
 * 请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。
 *
 * 英文中的 元音字母 为（a, e, i, o, u）。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "abciiidef", k = 3
 * 输出：3
 * 解释：子字符串 "iii" 包含 3 个元音字母。
 *
 *
 * 示例 2：
 *
 * 输入：s = "aeiou", k = 2
 * 输出：2
 * 解释：任意长度为 2 的子字符串都包含 2 个元音字母。
 *
 *
 * 示例 3：
 *
 * 输入：s = "leetcode", k = 3
 * 输出：2
 * 解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。
 *
 *
 * 示例 4：
 *
 * 输入：s = "rhythms", k = 4
 * 输出：0
 * 解释：字符串 s 中不含任何元音字母。
 *
 *
 * 示例 5：
 *
 * 输入：s = "tryhard", k = 4
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s 由小写英文字母组成
 * 1 <= k <= s.length
 *
 *
 */

const { max } = require("lodash");

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
    /* 
        读题：
            1. 将字符串转换为数组，然后使用    
            2. 利用array.indexOf来判断
    */
    // 超时了
    const yuan = ["a", "e", "i", "o", "u"];
    let maxY = 0;
    // for(let i = 0; i < s.length - k + 1; i++){
    //     // 暂存每轮比较中的最大值
    //     let temp = 0;
    //     for(let j = i; j < i+k;j++){
    //         // 暂存每次比较中最大值
    //         if(yuan.indexOf(s[j]) !== -1){
    //             temp++;
    //         }else{
    //             maxY = Math.max(maxY, temp);
    //             // continue;
    //         }

    //     }
    //     maxY = Math.max(maxY, temp);

    // }
    // return maxY;
    // 考虑使用双指针滑动窗口进行优化
    let ans = 0,
        vowels = 0;

    for (let i = 0; i < s.length; i++) {
        if (yuan.includes(s[i])) {
            // 这里只是单个判断，但如果对整体进行判断，该如何降低复杂度
            vowels++;
        }
        if (i < k - 1) {
            // 窗口没满
            continue;
        }
        // 更新
        ans = Math.max(ans, vowels);

        // 退出
        const out = s[i - k + 1];
        if (yuan.includes(out)) {
            // 退的是一个元音字母
            vowels--;
        }
    }
    return ans;
};
// @lc code=end
console.log(maxVowels("abciiidef", 3));
console.log(maxVowels("rhythms", 4));
console.log(maxVowels("tryhard", 4));
console.log(maxVowels("weallloveyou", 7)); //expected: 4
