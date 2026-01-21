/*
 * @lc app=leetcode.cn id=2466 lang=javascript
 *
 * [2466] 统计构造好字符串的方案数
 *
 * https://leetcode.cn/problems/count-ways-to-build-good-strings/description/
 *
 * algorithms
 * Medium (48.71%)
 * Likes:    126
 * Dislikes: 0
 * Total Accepted:    31.2K
 * Total Submissions: 64.2K
 * Testcase Example:  '3\n3\n1\n1'
 *
 * 给你整数 zero ，one ，low 和 high ，我们从空字符串开始构造一个字符串，每一步执行下面操作中的一种：
 * 
 * 
 * 将 '0' 在字符串末尾添加 zero  次。
 * 将 '1' 在字符串末尾添加 one 次。
 * 
 * 
 * 以上操作可以执行任意次。
 * 
 * 如果通过以上过程得到一个 长度 在 low 和 high 之间（包含上下边界）的字符串，那么这个字符串我们称为 好 字符串。
 * 
 * 请你返回满足以上要求的 不同 好字符串数目。由于答案可能很大，请将结果对 10^9 + 7 取余 后返回。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：low = 3, high = 3, zero = 1, one = 1
 * 输出：8
 * 解释：
 * 一个可能的好字符串是 "011" 。
 * 可以这样构造得到："" -> "0" -> "01" -> "011" 。
 * 从 "000" 到 "111" 之间所有的二进制字符串都是好字符串。
 * 
 * 
 * 示例 2：
 * 
 * 输入：low = 2, high = 3, zero = 1, one = 2
 * 输出：5
 * 解释：好字符串为 "00" ，"11" ，"000" ，"110" 和 "011" 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= low <= high <= 10^5
 * 1 <= zero, one <= low
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number} 本题相当于70爬楼梯；这里理解需要注意，zero和one代表的含义：zero=2，one=1表示选择'0'可以爬两步，选择'1'可以爬一步。
 * 1. 子问题：
 *      - 很明显，结束条件不是很好想，可以从开头开始，例如选择0，
 */
var countGoodStrings = function(low, high, zero, one) {
    const MOD = 1e9 + 7;
    const memo = new Array(high + 1).fill(-1);
    const dfs = (i) => {
        // 首先需要确定递归中止条件
        
    }

};
// @lc code=end

