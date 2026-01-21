/* 
https://hydro.ac/d/coder_gather/p/odb0032
题目描述:
在一个大型体育场内举办了一场大型活动，由于疫情防控的需要，要求每位观众的必须间隔至少一个空位才允许落座。现在给出一排观众座位分布图，座位中存在已落座的观众，请计算出，在不移动现有观众座位的情况下，最多还能坐下多少名观众。
输入描述:
一个数组，用来标识某一排座位中，每个座位是否已经坐人。0表示该座位没有坐人，1表示该座位已经坐人。1 ≤ 数组长度 ≤ 10000。

输出描述:
整数，在不移动现有观众座位的情况下，最多还能坐下多少名观众。

输入：
10001

预期输出：
1

*/
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const N = 1e5;
rl.on("line", (line) => {
    const input = line.split("");
    // cases: 1 0 1 0； 0 1 0；0 1 0 1；
    /* 
    梳理情况：
    0 -> 1

    0 0 -> 1
    0 1 -> 0
    1 0 -> 0
    
    000 -> 2
    100 -> 1
    010 -> 1
    001 -> 1
    110 -> 0
    101 -> 0
    011 -> 0
    111 -> 0

    0000 ->  2
    1000 -> 1
    0100 -> 1
    0010 -> 1
    0001 -> 1

    10001 -> 1
    00000 -> 3
    */
    let count = 0;
    if (input.length === 1 && input[0] === "0") {
        console.log(1);
        rl.close();
        return;
    }
    if (input.length === 2 && input[0] === "0" && input[1] === "0") {
        console.log(1);
        rl.close();
        return;
    }
    if (input.length === 3) {
        for (let i = 0; i < input.length - 1; i++) {
            if (input[i] === "0" && input[i + 1] === "0") {
                count++;
                input[i] = "1";
            }
        }
        console.log(count);
        rl.close();
        return;
    }

    // len > 3
    for (let i = 0; i < input.length; i++) {
        if (i < 1 && input[i] === "0" && input[i + 1] === "0") {
            count++;
            input[i] = "1";
        } else if (input[i - 1] === "0" && input[i] === "0" && input[i + 1] === "0") {
            count++;
            input[i] = "1";
        } else if (i === input.length - 1 && input[input.length - 2] === "0" && input[input.length - 1] === "0") {
            count++;
            input[i] = "1";
        }
    }
    console.log(count);
    rl.close();
});
