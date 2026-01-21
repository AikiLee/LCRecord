/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 *
 * https://leetcode.cn/problems/target-sum/description/
 *
 * algorithms
 * Medium (48.60%)
 * Likes:    2134
 * Dislikes: 0
 * Total Accepted:    554.2K
 * Total Submissions: 1.1M
 * Testcase Example:  '[1,1,1,1,1]\n3'
 *
 * 给你一个非负整数数组 nums 和一个整数 target 。
 *
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 *
 *
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 *
 *
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,1,1,1], target = 3
 * 输出：5
 * 解释：一共有 5 种方法让最终目标和为 3 。
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1], target = 1
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 20
 * 0 <= nums[i] <= 1000
 * 0 <= sum(nums[i]) <= 1000
 * -1000 <= target <= 1000
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findTargetSumWays(nums, target) {
    //转换为递推
    // const n = nums.length;
    // //
    // let sum = nums.reduce((a,b)=> a+b,0);
    // sum += Math.abs(target);
    // if(sum< 0 || sum %2 !== 0) return 0;
    // sum /= 2;
    // // const memo = new Array(n).fill(0).map(()=>new Array(sum+1).fill(-1));

    // const dfs = (i,c) => {
    //     // 正好找到
    //     if(i < 0 ) return c === 0 ? 1 : 0;
    //     // if(memo[i][c] !== -1) return memo[i][c];
    //     if(nums[i] > c) return  dfs(i-1,c);
    //     return  dfs(i-1,c) + dfs(i-1,c-nums[i]);
    // }
    // return dfs(n-1,sum);
    /* 
        这一题的关键其实是求背包容量：
        相当于将复杂的回溯问题转化为01背包求方案数问题
        如何建立这两者之间的联系：
            1.确定其满足背包问题： 即在一堆项目你可以不断选择
            2. 确定背包容量


        转化为递推
        1.如何记录，因为是01背包问题，一般需要开二维数组
        2.状态转移方程还是与回溯一致
        3.因为是求方案数，使用的是+
    */
    //    const n = nums.length;
    //    let sum = nums.reduce((a,b)=> a+b,0);
    //    sum -= Math.abs(target);
    //    if(sum < 0 || sum %2 !== 0) return 0;
    //    sum /= 2;
    //    const dp = new Array(n+1).fill(0).map(()=>new Array(sum+1).fill(0));
    //    dp[0][0] = 1 ;
    //    for(let i = 0 ; i< n; i++) {
    //     for(let c = 0 ; c <= sum; c++) {
    //         if(c < nums[i]) {
    //             // 没有剩余空间
    //             dp[i+1][c] = dp[i][c];
    //         } else {
    //             dp[i+1][c] = dp[i][c] + dp[i][c-nums[i]];
    //         }
    //     }
    //    }
    //    return dp[n][sum];
    //优化为1维数组
    const n = nums.length;
    let sum = nums.reduce((a, b) => a + b, 0);
    sum -= Math.abs(target);
    if (sum < 0 || sum % 2 !== 0) return 0;
    sum /= 2;
    m = sum;
    const f = new Array(m + 1).fill(0);
    f[0] = 1;
    for (let x of nums) {
        for (let c = m; c >= x; c--) {
            f[c] += f[c - x];
        }
    }

    return f[m];
}

// @lc code=end
console.log(findTargetSumWays([1, 1, 1, 1, 1], 3));
// console.log(findTargetSumWays([1,0],1))
