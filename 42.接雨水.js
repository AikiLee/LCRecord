/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 *
 * https://leetcode.cn/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (65.03%)
 * Likes:    5698
 * Dislikes: 0
 * Total Accepted:    1.3M
 * Total Submissions: 2M
 * Testcase Example:  '[0,1,0,2,1,0,1,3,2,1,2,1]'
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：height = [4,2,0,3,2,5]
 * 输出：9
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == height.length
 * 1 <= n <= 2 * 10^4
 * 0 <= height[i] <= 10^5
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    // 前缀和解法
    // const n = height.length;
    // const pre_max = new Array(n).fill(0);
    // const suf_max = new Array(n).fill(0);
    // pre_max[0] = height[0];
    // suf_max[n-1] = height[n-1];
    // for(let i = 1; i < n; i++){
    //     pre_max[i] = Math.max(pre_max[i-1], height[i]);
    // }
    // for(let i = n-2; i >= 0; i--){
    //     suf_max[i] = Math.max(suf_max[i+1], height[i]);
    // }
    // let ans = 0;
    // for(let i = 0; i < n; i++){
    //     ans += Math.min(pre_max[i], suf_max[i]) - height[i];
    // }
    // return ans;
    const  n  = height.length;
    let left = 0, right = n - 1;
    let ans =0 ;
    let left_max = 0, right_max = 0;
    while(left < right){
        left_max = Math.max(left_max, height[left]);
        right_max = Math.max(right_max, height[right]);
        if(height[left] < height[right]){
            // 左小于右，左指针右走
            ans += left_max - height[left];
            left++;
        }else{
            ans += right_max - height[right];
            right--;
        }
    }
    return ans;
    
};
// @lc code=end
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))
console.log(trap([4,2,0,3,2,5]))