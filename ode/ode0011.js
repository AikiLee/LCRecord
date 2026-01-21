/**
 *  题目：https://hydro.ac/d/coder_gather/p/ode0011
 *  测试数据：
 *  case1：
 *  00010 4
    00000 3 -1
    00010 5 12309
    11451 6 00000
    12309 7 11451
    //expected 6
    case2:
    10000 3
    76892 7 12309
    12309 5 -1
    10000 1 76892
    //expected 7
 */

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// 保存链表数据的Map，这一题数据很畜生，直接给的是地址信息；
let nodeMap = new Map();
let headAddress = "";
let n = 0;
let lineCount = 0;

// 读取输入的每一行,读取和处理逻辑分开写是有好处的;尤其对这种需要一边读一边处理输入数据的
rl.on("line", (line) => {
    lineCount++;
    let data = line.split(" ");
    if (lineCount === 1) {
        // 读取头节点地址和节点数
        headAddress = data[0];
        n = parseInt(data[1]);
    } else {
        // 存储节点信息,格式：address , [Node,nextNode]
        nodeMap.set(data[0], [data[1], data[2]]);
        if (lineCount - 1 === n) {
            rl.close(); // 读取完毕后关闭输入

        }
    }
});

// 处理逻辑,如何实现
rl.on("close", () => {
    let slow = headAddress;
    let fast = headAddress;

    // 快指针每次走两步，慢指针每次走一步，如何实现移动的？
    while (fast !== "-1" && nodeMap.has(fast)) {
        fast = nodeMap.get(fast)[1];
        if (fast === "-1" || !nodeMap.has(fast)) break;
        fast = nodeMap.get(fast)[1];
        slow = nodeMap.get(slow)[1];
    }

    // 输出慢指针指向的节点的值
    console.log(nodeMap.get(slow)[0]);
});
