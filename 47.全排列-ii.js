/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    nums.sort((a,b) => a-b);
   const n = nums.length;
   const ans = [];
   const path =  new Array(n).fill(0); 
// 这一题是允许数字重复的
   const onPath = new Array(n).fill(false);
   const dfs = (i,s) => {
        if(i === n){
           ans.push(path.slice());
           return;
       }
    // 要进行剪枝
       for(let j = 0; j < onPath.length; j++){
            if(!onPath[j]){
                if(j > 0 && nums[j] === nums[j-1] && !onPath[j-1]) continue; // Skip duplicates
                path[i] = nums[j];
                onPath[j] = true;
                dfs(i+1);
                // 恢复现场
                onPath[j] = false;
            }
       }
   }
   dfs(0);
   return ans;
};
// @lc code=end

console.log(permuteUnique([1,1,2]));
