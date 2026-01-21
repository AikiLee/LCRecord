/** 读题：
 * 环形字符串，首尾相连；找子串，子串中出现o次数最长的case的长度；
 * 长度比较大1e5 x 5 不能用回溯了。
 * 找子串，考虑滑动窗口；
 * 三步走：
 * 1. 初始状态：left =0， right = n - 1
 * 2. 更新： - 当读到非o字母，直接入，cnt++
 *          - 每次移动rigth--，再重新计算o的数量
 */

// alolobo expected:6

const { sum } = require("lodash");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// 因为是子数组，具有任意性，所以当o为奇数时至少移动一次。
rl.on("line", (line) => {
    const input = line;
    const n = input.length;
    let ctn = 0;
    for (let num of input) {
        if (num === "o") {
            ctn++;
        }
    }
    console.log(ctn % 2 === 0 ? n : n - 1);
    rl.close();
});
