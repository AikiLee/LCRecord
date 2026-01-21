/* 
题目：https://hydro.ac/d/coder_gather/p/ode0046
部门准备举办一场王者荣耀表演赛，有10名游戏爱好者参与，分5为两队，每队5人。每位参与者都有一个评分，代表着他的游戏水平。为了表演赛尽可能精彩，我们需要把10名参赛者分为实力尽量相近的两队。一队的实力可以表示为这一队5名队员的评分总和。
现在给你10名参与者的游戏水平评分，请你根据上述要求分队最后输出这两组的实力差绝对值。
例: 10名参赛者的评分分别为5 1 8 3 4 6 7 10 9 2，分组为 (135 8 10) (24 679)，两组实力差最小，差值为1。有多种分法，但实力差的绝对值最小为1。
输入：
1 2 3 4 5 6 7 8 9 10
10个整数，范围在[1,10000]之间
预期输出：
1 
两组实力差的最小值

*/
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    const nums = line.split(" ").map(Number);

    rl.close();
    // 既然是求差值最小，可以先求总和，之后除2，再算出
    // 首先的思路也是dfs进行枚举
    // const total = input.reduce((a, b) => a + b, 0);
    // let minDiff = Infinity;

    // // time: O()
    // const dfs = (index, count, currentSum) => {
    //     if (count === 5) {
    //         // 计算差值
    //         const diff = Math.abs(total - 2 * currentSum);
    //         minDiff = Math.min(minDiff, diff);
    //         return;
    //     }
    //     for (let i = index; i < input.length; i++) dfs(i + 1, count + 1, currentSum + input[i]);
    // };
    // dfs(0, 0, 0);
    // console.log(minDiff);

    // 将上述代码改写为dp，这一题显然是如何如何枚举；
    const total = nums.reduce((a, b) => a + b, 0);
    const dp = Array.from({ length: 6 }, () => Array(total + 1).fill(false));
    const half = Math.floor(total / 2);
    dp[0][0] = true;

    for (const num of nums) {
        for (let count = 5; count >= 1; count--) {
            for (let sum = total; sum >= num; sum--) {
                if (dp[count - 1][sum - num]) {
                    //表示已经计算过
                    dp[count][sum] = true;
                }
            }
        }
    }
    // 寻找最接近half的合法和
    let minDiff = Infinity;
    for (let sum = 0; sum <= total; sum++) {
        if (dp[5][sum]) {
            const diff = Math.abs(total - 2 * sum);
            minDiff = Math.min(minDiff, diff);
        }
    }
    console.log(minDiff);
});
