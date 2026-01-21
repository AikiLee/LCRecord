/* 
题目描述
A、B两个人把苹果分为两堆，A希望按照他的计算规则等分苹果，他的计算规则是按照二进制加法计算，并且不计算进位
12+5=9（1100 + 0101 = 9），B的计算规则是十进制加法，包括正常进位，B希望在满足A的情况下获取苹果重量最多。

输入苹果的数量和每个苹果重量，输出满足A的情况下B获取的苹果总重量。

如果无法满足A的要求，输出-1。

数据范围

1 <= 总苹果数量 <= 20000
1 <= 每个苹果重量 <= 10000

3
3 5 6
输入描述
输入第一行是苹果数量：3

输入第二行是每个苹果重量：3 5 6

输出描述
输出第一行是B获取的苹果总重量：11

*/
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let n;
let weights = [];

rl.on("line", (line) => {
    if (!n) {
        n = parseInt(line);
    } else {
        weights = line.split(" ").map(Number);

        // 计算总重量和总异或值
        let total_xor = 0;
        let total_sum = 0;
        let min_weight = Infinity;

        for (const w of weights) {
            total_xor ^= w;
            total_sum += w;
            min_weight = Math.min(min_weight, w);
        }

        // 输出结果
        if (total_xor !== 0) {
            console.log(-1);
        } else {
            console.log(total_sum - min_weight);
        }

        rl.close();
    }
});
