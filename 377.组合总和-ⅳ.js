/*
 * @lc app=leetcode.cn id=377 lang=javascript
 *
 * [377] 组合总和 Ⅳ
 *
 * https://leetcode.cn/problems/combination-sum-iv/description/
 *
 * algorithms
 * Medium (53.74%)
 * Likes:    1133
 * Dislikes: 0
 * Total Accepted:    265.5K
 * Total Submissions: 493.6K
 * Testcase Example:  '[1,2,3]\n4'
 *
 * 给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数。
 * 
 * 题目数据保证答案符合 32 位整数范围。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [1,2,3], target = 4
 * 输出：7
 * 解释：
 * 所有可能的组合为：
 * (1, 1, 1, 1)
 * (1, 1, 2)
 * (1, 2, 1)
 * (1, 3)
 * (2, 1, 1)
 * (2, 2)
 * (3, 1)
 * 请注意，顺序不同的序列被视作不同的组合。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [9], target = 3
 * 输出：0
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 1 
 * nums 中的所有元素 互不相同
 * 1 
 * 
 * 
 * 
 * 
 * 进阶：如果给定的数组中含有负数会发生什么？问题会产生何种变化？如果允许负数出现，需要向题目中添加哪些限制条件？
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 读题：有点像全排列，不同的排列视为不同的组合(1,2),(2,1)并不相同。这一题感觉暴力都可以做，但是估计会超时
 * 1.子问题分析：
 *     - 这题很明显应该是如何枚举，因为可以重复，所以每一次都选一个数知道最后加到target为止。
 * 2.状态转移方程：
 *     - 由于对顺序没有限制，直接枚举即可。
 * 3. 递归入口：dfs(target)
 * 4. 优化：记忆话搜索
 */
var combinationSum4 = function(nums, target) {
    // 这里的res是记录成功dfs(i)对应的结果数量
    const memo = new Array(target + 1).fill(-1);
    let res = 0;
    const dfs = (i) => {
        if(i === 0) return 1;
        if(memo[i] !== -1) return memo[i];
        for(let num of nums){
            // 没有理解这么做的原理
            if(i - num >= 0) res += dfs(i - num);
        }
        return memo[i] = res;
    }
    return dfs(target);
};
// @lc code=end

console.log(combinationSum4([1,2,3],4));