/* 
题源：https://hydro.ac/d/coder_gather/p/ode0064
*/
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inputLines = [];
rl.on("line", (line) => {
    if (line !== "") {
        inputLines.push(line.split(" ")); // 读取第一行
    }
}).on("close", () => {
    // console.log(inputLines);
    const C = parseInt(inputLines[0][0]);
    const maxT = new Array(C).fill(0);
    const inputs = inputLines.slice(1); //切掉第一行
    let exp, mant;
    //计算出MRT 的值
    for (let i = 0; i < C; i++) {
        let [a, b] = inputs[i];
        if (b > 128) {
            // 处理一下，先计算出exp和mant
            const temp = parseInt(b);
            const binary = temp.toString(2);
            exp = parseInt(binary.slice(1, 4), 2);
            mant = parseInt(binary.slice(4), 2);
            b = (mant | 0x10) << (exp + 3);
        }
        // 输出的都是十进制
        // console.log(parseInt(b));
        // 下面计算发报文的时机了
        /**
         * 两个时间轴：
         * 1. 实际时间 每行a 相加
         * 2. 最大时间，每行MRT 相加
         * 所以发送时机应该是 在MRT
         *
         */
        maxT[i] =  parseInt(a) + parseInt(b); //每次接到报文后，对应的最大响应时间点

    }
    const result = maxT.sort((a, b) => a-b)[0];
    console.log(result);
});
