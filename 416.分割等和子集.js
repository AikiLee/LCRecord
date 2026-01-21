/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 *
 * https://leetcode.cn/problems/partition-equal-subset-sum/description/
 *
 * algorithms
 * Medium (53.25%)
 * Likes:    2343
 * Dislikes: 0
 * Total Accepted:    757.2K
 * Total Submissions: 1.4M
 * Testcase Example:  '[1,5,11,5]'
 *
 * 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,5,11,5]
 * 输出：true
 * 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3,5]
 * 输出：false
 * 解释：数组不能分割成两个元素和相等的子集。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    /* 
        读题：
            元素全为正数；非空；将数组分为两个子集，使得两个子集的元素和相等；考虑使用回溯，这里的c需要先通过求和来算出，之后按套路进行回溯

        回溯解法：
    
    
    */
    // const n = nums.length;
    // const sum = nums.reduce((a, b) => a + b, 0);
    // // 因为target肯定是整数，所以奇数的sum可以直接舍弃
    // if (sum % 2 !==0) return false;
    // const target = sum / 2;
    // const memo = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(-1));
    // const dfs = (i, curSum) => {
    //     if (i === nums.length || curSum > target) return false;
    //     if (curSum == target) {                    // 递归的出口
    //         return true;
    //     }
    //     if (memo[i][curSum] !== -1) {
    //         return memo[i][curSum];
    //     }
    //     return memo[i][curSum] = dfs(i + 1, curSum) || dfs(i + 1, curSum + nums[i]);
    // };
    // return dfs(0, 0);
    const n = nums.length;
    const sum = nums.reduce((a,b)=> a+b,0);
    if(sum %2 !== 0 ) return false;
    const target = sum /2;
    const memo = new Array(n+1).fill(0).map(() => Array(target+1).fill(-1));


    // 时间复杂度O(ns) ;空间复杂度O(ns);
    // const f = new Array(n+1).fill(0).map(()=> Array(target+1).fill(false));
    // f[0][0] = true;
    // for(let i = 0 ; i< n; i++){
    //     const x = nums[i];
    //     for(let j = 0 ; j<= target ; j++){
    //             f[i+1][j] =  j>= x && f[i][j-x] || f[i][j];
    //         }
    //     }
    
    // return f[n][target];

    // const n = nums.length;
    // const sum = nums.reduce((a, b) => a + b, 0);
    // if (sum % 2 !== 0) return false;
    // const target = sum / 2;
    // const memo = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(-1));
    // const dfs = (i, j) => {
    //     if (i < 0) return  j===0; //确保返回的是false
    //     if (memo[i][j] !== -1) {
    //         // 之前计算过
    //         return memo[i][j] === 1;
    //     }
    //     const res = (j >= nums[i] && dfs(i - 1, j - nums[i])) || dfs(i - 1, j);
    //     memo[i][j] = res ? 1 : 0; // 记忆化
    //     return res;
    // };
    // return dfs(n - 1, target);

    // 改写为递推
    // const n = nums.length;
    // const sum = nums.reduce((a, b) => a + b);
    // if(sum %2 !== 0) return false;
    // const target =sum / 2;
    // const f = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(0));
    // // 这里不是统计方案数，而是确定的值，所以还是从0开始
    // f[0][0] = true;
    // for (let i = 0; i < n; i++) {
    //     const x = nums[i];  //暂时存储nums[i]的值
    //     for (let j = 0; j <= target; j++) {
    //         f[i + 1][j] = j >= x && f[i][j - x] || f[i][j];
    //     }
    // }
    // return f[n][target];


};
// @lc code=end
// console.log(canPartition([1, 5, 11, 5]));
// console.log(canPartition([1, 2, 3, 5]));
// console.log(canPartition([1, 5, 11, 3]));
console.log(0|| -1);

