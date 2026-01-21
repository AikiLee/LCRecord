/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为 K 的子数组
 *
 * https://leetcode.cn/problems/subarray-sum-equals-k/description/
 *
 * algorithms
 * Medium (44.77%)
 * Likes:    2763
 * Dislikes: 0
 * Total Accepted:    726.5K
 * Total Submissions: 1.6M
 * Testcase Example:  '[1,1,1]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。
 *
 * 子数组是数组中元素的连续非空序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,1], k = 2
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3], k = 3
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 2 * 10^4
 * -1000 <= nums[i] <= 1000
 * -10^7 <= k <= 10^7
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    /* 
    读题：子数组，要求连续，可以考虑滑动窗口；length=1e4 * 2太大，不考虑回溯方法；如何记录，存在数组当中
    滑动窗口三步：
        1. 基本还是left，right移动
        2. 更新：因为有正有负，所以需要一直找，直到找到末尾;找到后需要将left和right同时移动到新位置
        3. out：没有
   */
    /* 
        对于子数组，我们有好几种处理方法：前缀和，滑动窗口
        这里选用前缀和更加容易处理


    */
    const n = nums.length;
    const sums = new Array(n + 1).fill(0);
    // for(let i = 0 ; i <n; i++){
    //     sums[i+1] = sums[i] + nums[i];
    // }
    // let ans = 0;
    // const cnt = new Map();
    // for(const sj of sums){
    //     // 为什么要减去k？ 这里其实是一个变形，对于前缀和我们直到sj - si = k ，进行改写si = sj - k; 之后我们仅需要在map中寻找之前时候有计算过的si即可
    //     ans += cnt.get(sj - k) ?? 0;
    //     cnt.set(sj, (cnt.get(sj) ?? 0) + 1);
    // }
    // return ans;

    // okay,现在我们还可以一些计算前缀和一边来判断，用一次循环就搞定,这里就需要注意0也是一种case
    // const cnt = new Map();
    // let ans = 0,
    //     s = 0;
    // cnt.set(0, 1);
    // for (const c of nums) {
    //     s += c;
    //     ans += cnt.get(s - k) ?? 0;
    //     cnt.set(s, (cnt.get(s) ?? 0) + 1);
    // }
    // return ans;

    // 变形题：元素和等于k的最短数组？
    for (let i = 0; i < n; i++) {
        sums[i + 1] = sums[i] + nums[i];
    }
    let ans = Infinity;
    const cnt = new Map();
    for (let j = 0; j < n; j++) {
        // 为什么要减去k？ 这里其实是一个变形，对于前缀和我们直到sj - si = k ，进行改写si = sj - k; 之后我们仅需要在map中寻找之前时候有计算过的si即可
        const sj = sums[j];
        const si = sj- k;
        if (cnt.has(si)) {
            // 无法定位现在j可以确定，但是i无法确定位置,使用indexOf就无法处理重复的情况
            ans = Math.min(ans, j - nums.indexOf(si));
        }

        cnt.set(sj, (cnt.get(sj) ?? 0) + 1);
    }
    return ans;

};
// @lc code=end
console.log(subarraySum([1, 1, 1], 2));
console.log(subarraySum([1, 2, 3], 3));
console.log(subarraySum([1, -1, 0], 0));
