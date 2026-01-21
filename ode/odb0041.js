/* 
题目：https://hydro.ac/d/coder_gather/p/odb0041
题目描述
给定一个数组，我们称其中连续的元素为连续子序列，称这些元素的和为连续子序列的和。数组中可能存在几组连续子序列，组内的连续子序列互不相交且有相同的和。求一组连续子序列，组内子序列的数目最多。输出这个数目。
输入：
10
8 8 9 1 9 6 3 9 1 0
10
-1 0 4 -3 6 5 -6 5 -7 -3

第一行为数组长度1<=N<=10^3，第二行为数组元素[-1e5,1e4]
预期输出：
4
3
这里可以复习一下前缀和：
1. 创建一个长度为N的数组，初始值为0。
2. 创建一个前缀和数组，前缀和数组的长度为N+1，前缀和数组的元素为0。

*/
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", function (line) {
    rl.on("line", function (line2) {
        const n = parseInt(line);
        const arr = line2.split(" ").map(Number);
        const prefixSum = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            // 计算前缀和: a[i] = a[i-1] + arr[i];
            prefixSum[i] = prefixSum[i - 1] + arr[i - 1];
        }
        // 可以使用O(N^2)的方法，统计固定区间的和，然后放入map中。但是题目还有限制，子序列之间没有重叠部分。
        const map = new Map();
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j <= n; j++) {
                const rangeSum = prefixSum[j] - prefixSum[i];
                const interval = {
                    start: i,
                    end: j - 1
                }
                // 新元素,开一个数组给后面元素加入
                if(!map.has(rangeSum)){
                    map.set(rangeSum,[]);
                }
                // 往区间数组中加入新区间
                map.get(rangeSum).push(interval);
                
            }
        }

        // 从map中找出最大的值
        let maxCount = 0;
        // 这里有问题，如果最大值不止一个，会跳过
        for (let [sum, intervals] of map) {
            let count = 0;
            let lastEnd = -1; //上一个区间的结束位置
            for(const {start, end} of intervals) {
                if(start > lastEnd) {
                    // 说明现在读取的不相交的区间
                    count++;
                    lastEnd = end;
                }
            }
            // 更新全局最大值
            if(count > maxCount) {
                maxCount = count;
            }

        }
        console.log(maxCount);

        rl.close();
    });
});
