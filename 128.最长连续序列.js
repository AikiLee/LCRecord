/*
 * @lc app=leetcode.cn id=128 lang=javascript
 *
 * [128] 最长连续序列
 *
 * https://leetcode.cn/problems/longest-consecutive-sequence/description/
 *
 * algorithms
 * Medium (50.36%)
 * Likes:    2630
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 2.4M
 * Testcase Example:  '[100,4,200,1,3,2]'
 *
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 *
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,3,7,2,5,8,4,6,0,1]
 * 输出：9
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,0,1,2]
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 *
 *
 */

// @lc code=start

/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    // 当然还可以使用hashset来处理,将数组查找问题转为在set中的查找问题
    // 因为
    const set = new Set(nums);
    let maxLen = 0 ; 
    for(const num of set) {
        if(!set.has(num-1)) {
            let curNum = num;
            let curLen = 1;
            while(set.has(curNum + 1)) {
                curLen++;
                curNum++;
            }
            maxLen = Math.max(maxLen,curLen);
        }
    }
    return maxLen;
};

// @lc code=end
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); //expected 4
console.log(longestConsecutive([1, 0, 1, 2])); //expected 3
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); //expected 2
