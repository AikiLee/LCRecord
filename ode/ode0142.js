const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const inputs = [];
rl.on("line", (line) => {
    /* 
        只有两行，直接读取就行了。
        直接采用求和的方式来做
    
    */
    if (line !== "") {
        inputs.push(line.split(" ").map(Number));
    }
}).on("close", () => {
    // console.log(inputs);
    const N = inputs[0][0];
    const len = inputs[1].length;
    const newInput = inputs.slice(1);
    let sum = 0;
    if (len === 0 || len === 1) {
        console.log(0);
    } else {
        // 不能简单累加，有重叠区域
        for (let i = 1; i < N ; i++) {
            sum += newInput[0][i] + (newInput[0][i - 1] ?? 0) > 100 ? 100 : newInput[0][i] + (newInput[0][i - 1]  ?? 0 );

        }
        // sum += newInput[0][0] + newInput[0][N - 1];
        console.log(100 * (N-1) - sum > 0 ? 100 * (N-1) - sum : 0);
    }
});
