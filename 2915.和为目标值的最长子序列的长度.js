/*
 * @lc app=leetcode.cn id=2915 lang=javascript
 *
 * [2915] 和为目标值的最长子序列的长度
 *
 * https://leetcode.cn/problems/length-of-the-longest-subsequence-that-sums-to-target/description/
 *
 * algorithms
 * Medium (51.79%)
 * Likes:    61
 * Dislikes: 0
 * Total Accepted:    21.4K
 * Total Submissions: 41.2K
 * Testcase Example:  '[1,2,3,4,5]\n9'
 *
 * 给你一个下标从 0 开始的整数数组 nums 和一个整数 target 。
 * 
 * 返回和为 target 的 nums 子序列中，子序列 长度的最大值 。如果不存在和为 target 的子序列，返回 -1 。
 * 
 * 子序列 指的是从原数组中删除一些或者不删除任何元素后，剩余元素保持原来的顺序构成的数组。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [1,2,3,4,5], target = 9
 * 输出：3
 * 解释：总共有 3 个子序列的和为 9 ：[4,5] ，[1,3,5] 和 [2,3,4] 。最长的子序列是 [1,3,5] 和 [2,3,4]
 * 。所以答案为 3 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [4,1,3,2,1,5], target = 7
 * 输出：4
 * 解释：总共有 5 个子序列的和为 7 ：[4,3] ，[4,1,2] ，[4,2,1] ，[1,1,5] 和 [1,3,2,1] 。最长子序列为
 * [1,3,2,1] 。所以答案为 4 。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [1,1,5,4,5], target = 3
 * 输出：-1
 * 解释：无法得到和为 3 的子序列。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 1000
 * 1 <= nums[i] <= 1000
 * 1 <= target <= 1000
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var lengthOfLongestSubsequence = function(nums, target) {
    // const n = nums.length;
    // const memo = new Array(n + 1).fill(-1).map(()=> Array(target+1).fill(-1))
    // const dfs = (i,c) => {
    //     if(i < 0) return c===0 ? 0 : -Infinity;
    //     if(c < nums[i]) return memo[i][c] = dfs(i-1,c);//不选
    //     if(memo[i][c]!==-1) return memo[i][c];
    //     return memo[i][c] = Math.max(dfs(i-1,c),dfs(i-1,c-nums[i])+1);
    // }
    // const ans = dfs(n-1,target);
    // if(ans=== -Infinity)return -1;
    // else return ans;
    

    // 改写成递推
    // const n = nums.length;
    // const f = new Array(n+1).fill(-1).map(()=> Array(target+1).fill(-Infinity));
    // // 这里现在有个问题：对于找不到结果的时候，无法返回-1
    // f[0][0] = 0;
    //  for(let i = 0; i< n ;i++){
    //     for(let c= 0; c <= target; c++){
    //         if(c < nums[i]) f[i+1][c] = f[i][c]; //不选
    //         else f[i+1][c] = Math.max(f[i][c],f[i][c-nums[i]]+1);
    //     }
    //  }
    //  const ans = f[n][target];
    //  if(ans=== -Infinity) return -1;
    //  else return ans;

    // 继续空间优化
    const n = nums.length;
    const f = new Array(target+1).fill(-Infinity);
    f[0] = 0;

    for(let i = 0; i< n ;i++){
        for(let c= target; c >= nums[i]; c--){
            f[c] = Math.max(f[c],f[c-nums[i]]+1);
        }
    }
    const ans = f[target];
    if(ans=== -Infinity) return -1;
    else return ans;

    // const f = new Array(n+1).fill(0).map(() => Array(target+1).fill(-Infinity));
    // f[0][0] = 0;
    // for(let i = 0 ; i<n; i++){
    //     for(let j = 0; j<= target; j++){
    //         if(nums[i] >j) f[i+1][j] = f[i][j]; //不选
    //         else f[i+1][j] = Math.max(f[i][j],f[i][j-nums[i]] + 1) ;
    //     }

    // }
    // const ans = f[n][target];
    // if(ans === -Infinity) return -1;
    // else return ans;

};
// @lc code=end

console.log(lengthOfLongestSubsequence([1,2,3,4,5], 9));
console.log(lengthOfLongestSubsequence([4,1,3,2,1,5], 7));
console.log(lengthOfLongestSubsequence([1,1,5,4,5], 3));
console.log(lengthOfLongestSubsequence([1000],1000));
console.log(lengthOfLongestSubsequence([3,7,6,7,2,2,2,10,7,10,8,7,7,10,7,3,1,2,8,3,5,1,5,8,4,8,8,7,6,2,4,8,10,9,5,9,2,3,1,7,4,10,7,5,2,8,6,5,1,3,5,9,9,10,6,10], 162))