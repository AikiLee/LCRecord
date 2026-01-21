const { set } = require("lodash");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
    if (line) {
        lines.push(line);
    }
}).on("close", () => {
    // 读取顾客数量
    const n = parseInt(lines.shift());

    // 使用 Map 存储订单时间，保证有序
    const orderTime = new Map();

    // 读取顾客订单时间并存入 Map
    for (let i = 0; i < n; i++) {
        const time = lines.shift();
        // 将订单时间作为键，值为该时间出现的次数
        orderTime.set(time, (orderTime.get(time) || 0) + 1);
    }

    // 初始化免单顾客数量
    let freeOrders = 0;
    // 用于存储上一个订单的秒数
    let prevSecond = "";
    let timeLine = [];
    // 遍历 Map 中的订单时间
    for (const [time, count] of orderTime) {
        // 获取当前订单时间的秒数
        const currentSecond = time.substring(0, 19);
        timeLine.push(currentSecond);
        timeLine.sort((a,b) => a-b);
        // 如果当前订单秒数与上一个订单秒数不同，则将当前订单的数量加入免单顾客数
        if (currentSecond !== prevSecond) {
            freeOrders += count;
            prevSecond = currentSecond;
        }
    }

    // 输出免单顾客数量
    console.log(freeOrders);
});
