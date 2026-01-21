/* 
source:https://hydro.ac/d/coder_gather/p/ode0135
比赛的冠亚季军[100分]
题目描述
有N（3 ≤ N < 10000）个运动员，他们的id为0到N-1,他们的实力由一组整数表示。他们之间进行比赛，需要决出冠亚军。比赛的规则是0号和1号比赛，2号和3号比赛，以此类推，每一轮，相邻的运动员进行比赛，获胜的进入下一轮；实力值大的获胜，实力值相等的情况，id小的情况下获胜；轮空的直接进入下一轮。

输入描述
输入一行N个数字代表N的运动员的实力值(0<=实力值<=10000000000)。

输出描述
输出冠亚季军的id，用空格隔开。

用例1
输入
2 3 4 5
输出
3 1 2

手工推演一下：
2 3 4 5 
3 5 
5
winner: 5 3 4 -> 3 1 2
所以说
再具体看一下具体的运行过程：
1. 第一次运行promote
产生两个组ans[[冠军组3,5],[亚军组2,4]]
2. 如果冠军组不是一个人，那么晋级赛还需要继续，拿之前的冠军组继续比赛。那么会继续产生[[冠军组 5]，[亚军组 3]]
3. 此时ans = [[冠军组 5]， [亚军组 3]， [季军组 2，4]]


*/

/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    // 这里有一个小点，使用map产生的idx默认从1开始
    const sports = line
        .split(" ")
        .map(Number)
        .map((val, idx) => new Sport(idx, val));

    console.log(getResult(sports));
});

function getResult(sports) {
    // ans只记录三个组，依次是：冠军组，亚军组，季军组
    const ans = [];

    // 晋级赛
    promote(sports, ans);

    // 冠军组如果不是一个人，那么还需要取出冠军组继续进行晋级赛
    while (ans[0].length > 1) {
        promote(ans.shift(), ans);
    }

    // 冠军
    const first = ans[0][0].id;
    // 亚军
    const second = ans[1][0].id;

    // 季军
    ans[2].sort((a, b) => (a.strength != b.strength ? b.strength - a.strength : a.id - b.id));
    const third = ans[2][0].id;

    return `${first} ${second} ${third}`;
}

function promote(sports, ans) {
    // 记录获胜组
    const win = [];
    // 记录失败组
    const fail = [];

    for (let i = 1; i < sports.length; i += 2) {
        // 序号大的运动员
        const major = sports[i];
        // 序号小的运动员
        const minor = sports[i - 1];

        if (major.strength > minor.strength) {
            win.push(major);
            fail.push(minor);
        } else {
            // 如果序号大的运动员的实力 <= 序号小的运动员，则序号小的运动员获胜
            win.push(minor);
            fail.push(major);
        }
    }

    // 如果晋级赛中运动员个数是奇数个，那么最后一个运动员直接晋级
    if (sports.length % 2 != 0) {
        win.push(sports.at(-1));
    }

    // 依次头部压入失败组，获胜组，保证头部是获胜组
    ans.unshift(fail);
    ans.unshift(win);

    // 如果保留组个数超过3个，那么需要将超过部分的组去掉，因为这部分人已经无缘季军
    while (ans.length > 3) ans.pop();
}

class Sport {
    constructor(id, strength) {
        this.id = id; // 运动员的id
        this.strength = strength; // 运动员的实力
    }
}
