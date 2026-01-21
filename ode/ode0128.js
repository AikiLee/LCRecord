/* 
source:https://hydro.ac/d/coder_gather/p/ode0128

题目描述
一个有N个选手参加比赛，选手编号为1~N（3<=N<=100），有M（3<=M<=10）个评委对选手进行打分。

打分规则为每个评委对选手打分，最高分10分，最低分1分。

请计算得分最多的3位选手的编号。 如果得分相同，则得分高分值最多的选手排名靠前

(10分数量相同，则比较9分的数量，以此类推，用例中不会出现多个选手得分完全相同的情况)。

输入描述
第一行为半角逗号分割的两个正整数，第一个数字表示M（3<=M<=10）个评委，第二个数字表示N（3<=N<=100）个选手。

第2到M+1行是半角逗号分割的整数序列，表示评委为每个选手的打分，0号下标数字表示1号选手分数，1号下标数字表示2号选手分数，依次类推。

输出描述
选手前3名的编号。

注：若输入异常，输出-1，如M、N、打分不在范围内。

用例1
输入
4,5
10,6,9,7,6
9,10,6,7,5
8,10,6,5,10
9,10,8,4,9
输出
2,1,5

9943
9952

*/
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];
rl.on("line", (line) => {
    input.push(line.split(",").map(Number));
}).on("close", () => {
    const [M, N] = input[0];
    // 特殊情况处理
    if (M < 3 || M > 10 || N < 3 || N > 100) {
        console.log(-1);
        return;
    }
    // 分两种方式：按分数排序和按高分数
    const scores = [];
    // 记录选手各分数的数量
    const scoreCount = [];

    // 统计总分
    for (let i = 1; i <= M; i++) {
        if (input[i].length !== N) {
            console.log(-1);
            return;
        }
        for (const score of input[i]) {
            if (score < 1 || score > 10) {
                console.log(-1);
                return;
            }
        }

        for (let j = 0; j < N; j++) {
            if (!scores[j]) scores[j] = 0;
            if (!scoreCount[j]) scoreCount[j] = new Array(11).fill(0);
            scores[j] += input[i][j];
            scoreCount[j][input[i][j]]++;
        }
    }

    const players = [];
    for (let i = 0; i < N; i++) {
        players.push({
            id: i + 1,
            totalScore: scores[i],
            scoreCount: scoreCount[i],
        });
    }

    players.sort((a, b) => {
        // 首先按总分排名
        if (b.totalScore !== a.totalScore) {
            return b.totalScore - a.totalScore;
        }
        // 总分相同按高分数量排名
        for (let score = 10; score >= 1; score--) {
            if (b.scoreCount[score] !== a.scoreCount[score]) {
                return b.scoreCount[score] - a.scoreCount[score];
            }
        }

        return 0;
    });

    const top3 = players
        .slice(0, 3)
        .map((player) => player.id)
        .join(",");
    console.log(top3);
});
