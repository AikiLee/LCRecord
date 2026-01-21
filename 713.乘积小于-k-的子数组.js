/*
 * @lc app=leetcode.cn id=713 lang=javascript
 *
 * [713] 乘积小于 K 的子数组
 *
 * https://leetcode.cn/problems/subarray-product-less-than-k/description/
 *
 * algorithms
 * Medium (52.70%)
 * Likes:    855
 * Dislikes: 0
 * Total Accepted:    148.9K
 * Total Submissions: 280.9K
 * Testcase Example:  '[10,5,2,6]\n100'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你返回子数组内所有元素的乘积严格小于 k 的连续子数组的数目。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [10,5,2,6], k = 100
 * 输出：8
 * 解释：8 个乘积小于 100 的子数组分别为：[10]、[5]、[2]、[6]、[10,5]、[5,2]、[2,6]、[5,2,6]。
 * 需要注意的是 [10,5,2] 并不是乘积小于 100 的子数组。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3], k = 0
 * 输出：0
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 3 * 10^4
 * 1 <= nums[i] <= 1000
 * 0 <= k <= 10^6
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
    /* 
        读题：又是子数组的问题，考虑滑动窗口，注意判断条件;整数数组，1 <= nums[i] <= 1000;数组长度3 * 1e4还是别用dfs 了
    
    */
    const n = nums.length;
    let ans = 0;
    let left = 0,right = 0;
    let product = 1;
    // 这里少了很多case
    for(x of nums){
        product *= x;
        while(product >= k){
            product /= nums[left];
            left++;
        }
        // 这里可以直接使用特值法进行判断，当只有一个元素时，肯定需要加一。但是为什么使用这种方法可以直接计算出，而不会有重复
        ans += right - left + 1;
        right++;

    }
    return ans;
};
// @lc code=end
console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100));
