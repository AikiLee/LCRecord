/* 
    ode:0039 https://hydro.ac/d/coder_gather/p/ode0039
    输入：
    3
    2
    2,5,6,7,9,5,7
    1,7,4,3,4
    预期输出：2,5,6,1,7,4,7,9,5,3,4,7
    输入：
    4
    3
    1,2,3,4,5,6
    1,2,3
    1,2,3,4
    预期输出：1,2,3,4,1,2,3,1,2,3,4,5,6
*/
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];
rl.on("line", (line) => {
    if (line) {
        input.push(line);
    }
    if (input.length === parseInt(input[1]) + 2) {
        const n = Number(input.slice(0, 1));
        const m = Number(input.slice(1, 2));
        const arrays = input.slice(2, input.length).map((item) => item.split(",").map(Number));
        // console.log(n,m,arrs);
        /* 
        如何处理这种循环截取的问题
        先基本理一下： n是每次需要读取的长度，m为数组行数
    */
        const res = [];
        while (arrays.length) {
            for (let i = 0; i < arrays.length; i++) {
                const arr = arrays[i];
                if (arr.length === 0) {
                    // 如果当前数组为空，删除;
                    arrays.splice(i, 1);
                } else {
                    res.push(...arr.splice(0, n));
                }
            }
        }
        console.log(res.join(","));
    }
});
