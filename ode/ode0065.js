/* 
题目： https://hydro.ac/d/coder_gather/p/ode0065
题目描述
一个人设定一组四码的数字作为谜底，另一方猜。

每猜一个数，出数者就要根据这个数字给出提示，提示以XAYB形式呈现，直到猜中位置。

其中X表示位置正确的数的个数（数字正确且位置正确），而Y表示数字正确而位置不对的数的个数。

例如，当谜底为8123，而猜谜者猜1052时，出题者必须提示0A2B。

例如，当谜底为5637，而猜谜者才4931时，出题者必须提示1A0B。

当前已知N组猜谜者猜的数字与提示，如果答案确定，请输出答案，不确定则输出NA。

输入： 
6
4815 1A1B
5716 0A1B
7842 0A1B
4901 0A0B
8585 3A0B
8555 2A1B
第一行：行数
后续N行，为用户输入和提示。第一个表示用户input， 第二个表示提示，形式： XAYB，其中A 表示数字和位置均正确，Y表示数字正确但是位置不对

思路：
*/
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const input = [];
// 处理输入逻辑
rl.on("line", (line) => {
    input.push(line);

}).on("close", () => {
    // 将二维数组的每一行的第一个数取出
    /* 题目有一个bug，就是四位数，所以最多10000个数
1. 可以一一遍历，将符合所有输入结果加入候选集
2. 如果遍历完所以数字，候选集中只有一个数，那么这个就是结果

*/
    const userInput = input.slice(1).map((el) => el.split(" "));
    //    存储候选集
    let matchCount = 0;
    let result = "";
    console.log(userInput);
    // 遍历所有数字
    // 遍历所有可能的四位数
    for (let i = 0; i < 10000; i++) {
        let answer = i.toString().padStart(4, "0");

        let isMatch = true;
        for (let [guess, expected] of userInput) {
            let countA = 0,
                countB = 0;
            let v1 = new Array(10).fill(0);
            let v2 = new Array(10).fill(0);
            // 转换为数字统计countA
            for (let pos = 0; pos < 4; pos++) {
                let c1 = parseInt(answer[pos]);
                let c2 = parseInt(guess[pos]);

                if (c1 === c2) {
                    countA++;
                } else {
                    v1[c1]++;
                    v2[c2]++;
                }
            }

            /* 
            统计countB，需要排除掉countA中的元素
            3585 ->  
            v1 [0,0,0,1,0,2,0,0,1,0]
            v2 [0,1,0,0,1,1,0,0,1,0]
            countA = 1
            countB = 1
            8385 ->
            countA = 1
            countB = 1
            5716 -> 
            countA = 0
            countB = 1
            7842 -> 
            countA = 0
            countB = 1
            4901 -> 
            countA = 0
            countB = 0
            8585 -> 
            countA = 3
            countB = 0
            8555 -> 
            countA = 2
            countB = 1


        */
            for (let pos = 0; pos < 10; pos++) {
                countB += Math.min(v1[pos], v2[pos]);
            }

            if (`${countA}A${countB}B` !== expected) {
                isMatch = false;
                break;
            }
        }
        // 当匹配时
        if (isMatch) {
            matchCount++;
            result = answer;
            if (matchCount > 1) {
                console.log("NA");
                return;
            }
        }
    }
    console.log(matchCount === 1 ? result : "NA");
});
