/* 
题目： https://hydro.ac/d/coder_gather/p/oda0022

题目描述
一个文件目录的数据格式为：目录id，本目录中文件大小，(子目录id列表）。

其中目录id全局唯一，取值范围[1, 200]，本目录中文件大小范围[1, 1000]，子目录id列表个数[0,10]例如 : 1 20 (2,3) 表示目录1中文件总大小是20，有两个子目录，id分别是2和3

现在输入一个文件系统中所有目录信息，以及待查询的目录 id ，返回这个目录和及该目录所有子目录的大小之和。

输入：
3 1
3 15 ()
1 20 (2)
2 10 (3)
第一行分别代表目录个数和目录id； M [1,100] N[1,200]
接下来的M行，分别代表： 目录id 文件大小 子目录id列表 
预期输出：
45
*/
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let lineCount = 0;
let n = 0;
let target = 0;
const input = [];
// 读写分离
rl.on("line", (line) => {
    if (lineCount === 0) {
        const line1 = line.split(" ");
        n = parseInt(line1[0]);
        target = parseInt(line1[1]);
        lineCount++;
    } else{
        const arr = line.split(" ");
        const id = parseInt(arr[0]);
        const size = parseInt(arr[1]);
        const child = arr[2] !== "()" ?  arr[2].slice(1, -1).split(",") : [];
        // 创建对象
        input.push([id, size, child]);
        if(input.length === n) rl.close();
    } 
});

rl.on("close", () => {
    const sizemap = new Map();
    const childMap = new Map();
    for (const [id, size, childIds] of input) {
        sizemap.set(id, size);
        const children = childIds.map(Number).filter(id => id !== "")
        childMap.set(id, children);
    }
    let totalSize = 0;
    const queue = [target];
    while(queue.length > 0) {
        const currentId = queue.shift();
        totalSize += sizemap.get(currentId) ?? 0;
        const children = childMap.get(currentId) || [];
        queue.push(...children);
    }
    console.log(totalSize);
});

// 找到parent数组上以i为根节点的所有子节点
function find(x, parent) {
    let res = [];
    while (parent[x] !== -1) {
        res.push(x);
        x = parent[x];
    }
    res.push(x);
    return res;
}


