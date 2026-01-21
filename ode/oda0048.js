// 1S = 7Y
/* 
题目描述
假设知道某段连续时间内股票价格，计算通过买入卖出可获得的最大收益。

输入一个大小为 n 的数 price(p1,p2,p3,p4…….pn),pi 是第i天的股票价格。

pi 的格式为股票价格(非负整型)加上货币单位 Y 或者 S,其中 Y 代表人民币,S 代表美元,这里规定 1 美元可以兑换 7 人民币。

Pi 样例 1：123Y 代表 123 元人民币

pi 样例 2：123S 代表 123 元美元,可兑换 861 人民币。

假设你可以在任何一天买入或者卖出股票,也可以选择放弃交易,请计其在交易周期 n 天内你能获得的最大收(以人民币计算)。
*/
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
    input = line.split(" ");
}).on("close", () => {
    // 这里的处理方法不太对，这里的数字不一定是一位，不能直接用0/1来访问
    // 2 21 28 6 56
    const values = input.map((item) => {
        // 这里的处理方法不太对，这里的数字不一定是一位，不能直接用0/1来访问
        // 提取数字部分,这里用+允许多位
        const num = parseInt(item.match(/\d+/g));
        const currency = item.slice(-1);
        
        if (currency === 'Y') {
            return num;
        } else {
            return num * 7;
        }
    });

    const mp = maxProfit(values);
    console.log(mp);
});

/* 
这里多考虑几个case：
2Y 3S 4S 6Y 8S
2 21 28 6 56
每天都交易： 19 + 7 + 50 = 76
56 28 2 6 21
*/
function maxProfit(prices) {
    // 找到区域内部最大利润，可以多次买卖; 还是得用贪心
    let ans = 0;
    for (let i = 1; i < prices.length; i++) {
        // 计算累计利润，当当前价格-昨天，大于累计利润时，更新累计利润
        ans += Math.max(0, prices[i] - prices[i - 1]);
    }
    return ans;
}

