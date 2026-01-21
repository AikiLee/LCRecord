/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 *
 * https://leetcode.cn/problems/product-of-array-except-self/description/
 *
 * algorithms
 * Medium (77.37%)
 * Likes:    2040
 * Dislikes: 0
 * Total Accepted:    703.5K
 * Total Submissions: 905.5K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 * 
 * 请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: nums = [-1,1,0,-3,3]
 * 输出: [0,0,9,0,0]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 2 <= nums.length <= 10^5
 * -30 <= nums[i] <= 30
 * 输入 保证 数组 answer[i] 在  32 位 整数范围内
 * 
 * 
 * 
 * 
 * 进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组 不被视为 额外空间。）
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    /* 不能使用除法，还要满足O(n)时间复杂度，考虑使用前后缀积，利用乘法结合律
    */
    const suf = new Array(nums.length).fill(1);
    const pre = new Array(nums.length).fill(1);
    const n = nums.length;
    for(let i = 1 ; i< n ; i++){
        // 计算前缀积
        pre[i] = pre[i-1] * nums[i-1];
    }
    for(let i = n-2 ; i>=0 ; i--){
        // 计算后缀积
        suf[i] = suf[i+1] * nums[i+1];
    }
    const res = new Array(n).fill(1);
    for(let i = 0; i < n; i++){
        res[i] = pre[i] * suf[i];
    }
    return  res;


};
// @lc code=end
// console.log(productExceptSelf([1,2,3,4]));
console.log(productExceptSelf([-1,1,0,-3,3])); //expected [0,0,9,0,0]
