/* 
题目描述
一根X米长的树木，伐木工切割成不同长度的木材后进行交易，交易价格为每根木头长度的乘积。规定切割后的每根木头长度都为正整数；也可以不切割，直接拿整根树木进行交易。请问伐木工如何尽量少的切割，才能使收益最大化？

输入描述
木材的长度（X ≤ 50）

输出描述
输出最优收益时的各个树木长度，以空格分隔，按升序排列

输入：
10

预期输出：
3 3 4

*/
const readline = require("readline");
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    let n = parseInt(line);
    // 并非背包问题，而是划分区间
    // 用hash表做memo,找到每个阶段的最佳划分
    if(n <= 4 ) {
        console.log(n);
        return;
    }
    let paths = new Map();


    /* 
        重新理一下思路，还是背包问题。
        1. 选或不选 / 如何枚举 ✅
        2. 子问题考虑：
            - 每次划分，选择一个数，然后c-i,
            - 如何找到最大：
    
    */
   let numThrees = Math.floor(n / 3);
   const remainder = n %3;

    //    根据余数调整方案
    // 虽然这里
    let result = [];
    if(remainder === 0) {
        result = new Array(numThrees).fill(3);
    } else if (remainder === 1) {
        result = new Array(numThrees-1).fill(3);
        result.push(4); 
        
    } else { //remainder ===2 
        result = new Array(numThrees).fill(3);
        result.push(2);
    }
    result.sort((a,b) => a-b);

    console.log(result.join(" "));
    rl.close();
});
