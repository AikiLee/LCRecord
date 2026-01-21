/*
 * @lc app=leetcode.cn id=763 lang=typescript
 *
 * [763] 划分字母区间
 *
 * https://leetcode.cn/problems/partition-labels/description/
 *
 * algorithms
 * Medium (78.26%)
 * Likes:    1302
 * Dislikes: 0
 * Total Accepted:    360.9K
 * Total Submissions: 459.2K
 * Testcase Example:  '"ababcbacadefegdehijhklij"'
 *
 * 给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。例如，字符串 "ababcc" 能够被分为 ["abab",
 * "cc"]，但类似 ["aba", "bcc"] 或 ["ab", "ab", "cc"] 的划分是非法的。
 *
 * 注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s 。
 *
 * 返回一个表示每个字符串片段的长度的列表。
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "ababcbacadefegdehijhklij"
 * 输出：[9,7,8]
 * 解释：
 * 划分结果为 "ababcbaca"、"defegde"、"hijhklij" 。
 * 每个字母最多出现在一个片段中。
 * 像 "ababcbacadefegde", "hijhklij" 这样的划分是错误的，因为划分的片段数较少。
 *
 * 示例 2：
 *
 *
 * 输入：s = "eccbbbbdec"
 * 输出：[10]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 500
 * s 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
function partitionLabels(s: string): number[] {
    /**
        thought:
        1. anwser is continuous, we can use set/map to keep a collection to judge weather the letter is only in the paragraph. 
        2. how to generate the anwser: 
     */
    const n = s.length;
    // const last = new Array(26);
    // const res = [];
    // // similar to LC 56
    // let start = 0,
    //     end = 0;
    // for (let i = 0; i < n; i++) {
    //     // calculate the last index of each letter
    //     last[s[i].charCodeAt(0) - "a".charCodeAt(0)] = i;
    // }
    // for (let i = 0; i < n; i++) {
    //     end = Math.max(end, last[s[i].charCodeAt(0) - "a".charCodeAt(0)]);
    //     if (i === end) {
    //         // i === end means the paragraph is finished
    //         res.push(end - start + 1);
    //         start = i + 1;
    //     }
    // }
    // return res;
    /* 
        greedy method:
            1. count each character, 

    
    */
    const times = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        times[s[i].charCodeAt(0) - "a".charCodeAt(0)]++;
    }
    let count = 0 ;
    const res = [];
    const stk = new Set();
    for(const e of s){
        // 对应字符减一
        times[e.charCodeAt(0) - "a".charCodeAt(0)]--;
        if(times[e.charCodeAt(0) - "a".charCodeAt(0)] > 0)stk.add(e);
        else {
            // 没了
            if(stk.has(e)){
                stk.delete(e);
            }
        }
        // count account the length of substring
        count++;
        if(stk.size === 0){
            res.push(count);
            count = 0;
        }
    }
    return res;

}
// @lc code=end
console.log(partitionLabels("ababcbacadefegdehijhklij")); //expected [9,7,8]
