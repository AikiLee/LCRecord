const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/* 
    test case: 运行程序之后直接粘贴，然后ctrl + D 结束输入;或者使用文件流：node  ode0004.js < test.txt;
    5 7
    1 2 0
    4 5 0
    2 3 0
    1 2 1
    2 3 1
    4 5 1
    1 5 1
    //期望输出：
    we are a team
    we are a team
    we are a team
    we are not a team
*/

let inputLines = [];
rl.on("line", (input) => {
    // 很明显：这个line是每接收一段数据才会触发
    inputLines.push(input);
    //   console.log("inputline is :",inputLines);
}).on("close", () => {
    // 这里的close是数据接受结束之后才会触发；
    // console.log("inputline is :",inputLines);
    let [n, m] = inputLines[0].split(" ").map(Number); //这里的map是什么用法,这里的写法自动隐式转换 <=> （e) => Number(e)
    // 这里将操作数据处理成二维数组
    const message = inputLines.slice(1).map((e) => e.split(" ").map(Number));
    // 接下来就是书写逻辑了
    if (n < 1 || n > 1000 || m < 1 || m > 1000) {
        console.log("Null");
        return;
    }
    // 创建一个parent数组，便于并查集操作
    const parent = Array.from({ length: n }, (_, i) => i);
    for (const info of message) {
        const [personA, personB, command] = info;
        // 输入检测
        if (personA < 1 || personA > n || personB < 1 || personB > n) {
            console.log("da pian zi");
            continue;
        }
        // recall一下并查集： 可以理解的是，一开始创建一个连续递增的数组，数组中每个元素指向自身，后面开始更新使得parent[rootB] = rootA这样就实现了数组树，进行了初始化。后面找的话也简单，并查集寻找本身就是一个递归函数，其会判断parent[x] 是否指向的是自身，如果不是，那么就要网上找find(parent[x], parent),直到为null，返回之前的那个最初的那个 
        //! 如果指令为 0，则合并 personA 和 personB 所在的团队
        if (command === 0) {
            const rootA = find(personA, parent);
            const rootB = find(personB, parent);
            if (rootA !== rootB) {
                parent[rootB] = rootA;
            }
        }
        // !如果指令为 1，则判断 personA 和 personB 是否在同一个团队
        else if (command === 1) {
            console.log(find(personA, parent) === find(personB, parent) ? "we are a team" : "we are not a team");
        }
        // !如果指令为其他值，则输出 "da pian zi"
        else {
            console.log("da pian zi");
        }
    }
});

// 判断两个东西是否在一起，想起了什么：并查集
function find(x, parent) {
    if (parent[x] !== x) {
        parent[x] = find(parent[x], parent);
    }
    return parent[x];
}
