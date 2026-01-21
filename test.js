const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    /**
    *  这种题，看起来是一点思路都没有，考虑暴力求解：
    1. 因为是四位数：直接遍历从0 - 10000，然后和guess的数据进行比对，
    如果符合所有条件，那么就任务这个结果是可以输出的，否则不输出
    2. 如何构造expect ，使用js提供的补零功能
    3. 如何统计数量，已经被A统计过的就不应该被B统计了，这里可以生成一个数组来处理
    */
    const N = parseInt(input[0]);
    const info = input.slice(1).map(item => item.split(" "));
    const ans = [];

    // 暴力枚举所有可能的四位数
    for (let i = 0; i < 10000; i++) {
        let flag = 0;
        const expect = i.toString().padStart(4, "0");

        // 遍历所有猜测与提示
        for (const [guess, hint] of info) {
            let countA = 0;
            let countB = 0;

            // 统计 A
            const guessFreq = Array(10).fill(0);
            const expectFreq = Array(10).fill(0);
            for (let j = 0; j < 4; j++) {
                if (guess[j] === expect[j]) {
                    countA++;
                } else {
                    guessFreq[parseInt(guess[j])]++;
                    expectFreq[parseInt(expect[j])]++;
                }
            }

            // 统计 B
            for (let k = 0; k < 10; k++) {
                countB += Math.min(guessFreq[k], expectFreq[k]);
            }

            // 构造结果并验证
            const result = `${countA}A${countB}B`;
            if (result === hint) {
                flag++;
            } else {
                break;
            }
        }

        // 如果满足所有提示，记录答案
        if (flag === N) {
            ans.push(expect);
        }
    }

    // 输出最终结果
    if (ans.length === 1) {
        console.log(ans[0]);
    } else {
        console.log("NA");
    }
});
