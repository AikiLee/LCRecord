/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
   const dfs = (i) => {
       if (i <= 1) return 1;
       return dfs(i - 1) + dfs(i - 2);
   } 
   return dfs(n);
};
// @lc code=end
