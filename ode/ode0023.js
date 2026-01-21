/* 
    topic: https://hydro.ac/d/coder_gather/p/ode0023
    题目描述
    对于一个连续正整数组成的序列，可以将其拼接成一个字符串，再将字符串里的部分字符打乱顺序。如序列8 9 10 11 12，拼接成的字符串为89101112，打乱一部分字符后得到90811211，原来的正整数10就被拆成了0和1。

    现给定一个按如上规则得到的打乱字符的字符串，请将其还原成连续正整数序列，并输出序列中最小的数字。

    输入描述
    输入一行，为打乱字符的字符串和正整数序列的长度，两者间用空格分隔，字符串长度不超过200，正整数不超过1000，保证输入可以还原成唯一序列。

    输出描述
    输出一个数字，为序列中最小的数字。

    实例：
    输入：
    19801211 5
    输出：
    8

    读题： 其实这题是有题眼的，待还原数组是连续，并且窗口长度也是给定的。
*/
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 统计字符串 num 中的字符频次，放入map(count)中
function addNumberToMap(num, count) {
    for (let c of num.toString()) {
        count.set(c, (count.get(c) ?? 0) + 1);
    }
}

// 从统计 map 中移除一个数字的字符频次
function removeNumberFromMap(num, count) {
    for (let c of num.toString()) {
        count.set(c, count.get(c) - 1);
        if (count.get(c) === 0) {
            count.delete(c);
        }
    }
}

/**
 * 捋一下基本思路：
 * 1. 创建一个map用于统计个数字出现的次数
 * 2. 创建一个map充当滑动窗口
 * 
 */
rl.on("line", (line) => {
    let [s, k] = line.split(" ");
    k = parseInt(k);

    // 统计目标字符频次
    let base = new Map();
    for (let c of s) {
        base.set(c, (base.get(c) ?? 0) + 1);
    }

    // 滑动窗口：维护当前窗口的字符统计
    let count = new Map();

    // 初始化窗口（从 1 到 k）
    for (let i = 1; i <= k; i++) {
        addNumberToMap(i, count);
    }

    // 检查初始窗口是否匹配
    if (compareMaps(count, base)) {
        console.log(1);
        process.exit();
    }

    // 滑动窗口遍历 1 到 (1000 - k)
    for (let i = 2; i <= 1000 - k + 1; i++) {
        removeNumberFromMap(i - 1, count);
        addNumberToMap(i + k - 1, count);

        if (compareMaps(count, base)) {
            console.log(i);
            process.exit();
        }
    }
});

//! 比较两个 Map 是否相等。核心方法：取map1的所有[key,value)分别和map2进行比较。时间复杂度O(N)， 因为map取值为时间复杂度为O(1)
function compareMaps(map1, map2) {
    if (map1.size !== map2.size) return false;
    for (let [key, val] of map1) {
        if (val !== map2.get(key)) return false;
    }
    return true;
}
