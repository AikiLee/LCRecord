/*
 * @lc app=leetcode.cn id=2730 lang=javascript
 *
 * [2730] 找到最长的半重复子字符串
 *
 * https://leetcode.cn/problems/find-the-longest-semi-repetitive-substring/description/
 *
 * algorithms
 * Medium (51.99%)
 * Likes:    48
 * Dislikes: 0
 * Total Accepted:    22.5K
 * Total Submissions: 43.2K
 * Testcase Example:  '"52233"'
 *
 * 给你一个下标从 0 开始的字符串 s ，这个字符串只包含 0 到 9 的数字字符。
 * 
 * 如果一个字符串 t 中至多有一对相邻字符是相等的，那么称这个字符串 t 是 半重复的 。例如，"0010" 、"002020" 、"0123"
 * 、"2002" 和 "54944" 是半重复字符串，而 "00101022" （相邻的相同数字对是 00 和 22）和 "1101234883"
 * （相邻的相同数字对是 11 和 88）不是半重复字符串。
 * 
 * 请你返回 s 中最长 半重复 子字符串 的长度。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "52233"
 * 
 * 输出：4
 * 
 * 解释：
 * 
 * 最长的半重复子字符串是 "5223"。整个字符串 "52233" 有两个相邻的相同数字对 22 和 33，但最多只能选取一个。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "5494"
 * 
 * 输出：4
 * 
 * 解释：
 * 
 * s 是一个半重复字符串。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：s = "1111111"
 * 
 * 输出：2
 * 
 * 解释：
 * 
 * 最长的半重复子字符串是 "11"。子字符串 "111" 有两个相邻的相同数字对，但最多允许选取一个。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 50
 * '0' <= s[i] <= '9'
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestSemiRepetitiveSubstring = function(s) {
    /* 
        读题：数字字符串；子串，考虑使用滑动窗口；题目有点绕，半重复字符串 <=> 字符串中相邻的字符相同的情况仅能出现一次，可以全不相同；
        题目就可以转化为 窗口中相邻字符相同的情况最多出现一次，并求最大长度的子串
    
    */
    const n = s.length;
    let left = 0,right = 1;
    let ctn  = 0;
    let ans = 0 ;
    for(right; right < n; right++) {
        // 这样会越界
        if(s[right] === s[right-1]) {
            // 窗口中相邻字符相同
            ctn++;
        }
        if(ctn > 1 && left < right){
            // 当大于1时，left右移动
            left++;
            // 当出现重复字符之后，要跳过之前的重复字符
            while(s[left] !== s[left-1]){
                left++;
            }
            ctn = 1 ;
        }
        ans = Math.max(ans,right - left + 1);

    }
    return ans ;


};
// @lc code=end
console.log(longestSemiRepetitiveSubstring("52233")) //expected 4
console.log(longestSemiRepetitiveSubstring("111111")) //expected 2
console.log(longestSemiRepetitiveSubstring("5494")) //expected 4
