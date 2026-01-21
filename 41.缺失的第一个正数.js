/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 *
 * https://leetcode.cn/problems/first-missing-positive/description/
 *
 * algorithms
 * Hard (46.76%)
 * Likes:    2359
 * Dislikes: 0
 * Total Accepted:    551.4K
 * Total Submissions: 1.2M
 * Testcase Example:  '[1,2,0]'
 *
 * 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
 * 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,0]
 * 输出：3
 * 解释：范围 [1,2] 中的数字都在数组中。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,4,-1,1]
 * 输出：2
 * 解释：1 在数组中，但 2 没有。
 *
 * 示例 3：
 *
 *
 * 输入：nums = [7,8,9,11,12]
 * 输出：1
 * 解释：最小的正数 1 没有出现。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -2^31 <= nums[i] <= 2^31 - 1
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    // 清楚掉所有非正数
    const arr1 = nums.filter((item) => item > 0);
    // 从小到大排序
    arr1.sort((a, b) => a - b);
    const arr = arr1.reduce((accu, cur) => {
        return accu.includes(cur) ? accu : accu.concat(cur); // 1. 拼接方法
        // return accu.includes(cur) ? accu : [...accu, cur]; // 2. 扩展运算
    }, []);

    // 数组全为负数或第一个正数不为1
    if (arr.length === 0 || arr[0] > 1) return 1;
    // 判断数组是否连续
    let pos = 0;
    let isContinue = true;
    while (isContinue) {
        // 现在处理的是pos在哪个位置
        if (arr[pos] === pos + 1) {
            pos++;
        } else {
            break;
        }
    }
    return arr[pos - 1] + 1;
};
// @lc code=end
console.log(firstMissingPositive([1, 2, 0])); //expected 3
console.log(firstMissingPositive([3, 4, -1, 1])); //expected 2
console.log(firstMissingPositive([7, 8, 9, 11, 12])); //expected 1
console.log(firstMissingPositive([0,2,2,1,1])) //expected 3