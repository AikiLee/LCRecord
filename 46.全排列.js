/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const ans = [];
    const n = nums.length;
    const path = new Array(n).fill(0);
    const on_path = new Array(n).fill(false);
    const dfs = function(i){
        if(i === n){
            // 终止条件
            ans.push(path.slice());
            return;
        }
        for(let j = 0; j< n ; j++){
            for(const k of on_path){
                if(k === nums[j]){
                    // 说明已经访问过了
                    break;
                }
            }
            path.push(nums[j]);
            dfs(i+1);
            path.pop();
        }
    }
    dfs(1);
    return ans;


};
// @lc code=end

