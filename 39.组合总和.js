/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 *
 * https://leetcode.cn/problems/combination-sum/description/
 *
 * algorithms
 * Medium (73.69%)
 * Likes:    3037
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 1.6M
 * Testcase Example:  '[2,3,6,7]\n7'
 *
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target
 * 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
 *
 * candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
 *
 * 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：candidates = [2,3,6,7], target = 7
 * 输出：[[2,2,3],[7]]
 * 解释：
 * 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
 * 7 也是一个候选， 7 = 7 。
 * 仅有这两种组合。
 *
 * 示例 2：
 *
 *
 * 输入: candidates = [2,3,5], target = 8
 * 输出: [[2,2,2,2],[2,3,3],[3,5]]
 *
 * 示例 3：
 *
 *
 * 输入: candidates = [2], target = 1
 * 输出: []
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= candidates.length <= 30
 * 2 <= candidates[i] <= 40
 * candidates 的所有元素 互不相同
 * 1 <= target <= 40
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    /* 
        输入：
        candidates = [2,3,6,7], target = 7
        输出：
        [[2,2,3],[7]]

        1. 先判断这是什么类型的问题：看起来很像完全背包
            既然是背包问题，先思考三步：
                - 选或不选/如何枚举
                    完全背包肯定是如何枚举；枚举方法就是遍历candidates，直到找到和为target的组合，当然这里做差会更加简单；
                - 状态转移 我需要记录所有组合，应该还需要一个res = []
                    dfs(i,c,res) = = dfs(i-1,sum,res) + dfs(i-1,sum-candidates[i],res)
                - 递归入口出口
                    入口： dfs(n-1,target,[])
                    出口： if sum === target break;
                    if sum < 0 return;
                - 优化：记忆化搜索
                    const memo = new Array(n).fill(0).map(() => new Array(target + 1).fill(-1));
    
    */
    const n = candidates.length;
    const res = [];
    const dfs = (i, sum, path) => {
        if (i < 0 || i >= n || sum < 0) return;
        if (sum === 0) {
            res.push([...path]);
            return;
        }
        for (let j = i; j < n; j++) {
            path.push(candidates[j]);
            dfs(j, sum - candidates[j], path);
            path.pop();
        }
    };
    dfs(0, target, []);
    return res;
};
// @lc code=end
console.log(combinationSum([2, 3, 6, 7], 7));
