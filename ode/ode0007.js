/* 
    题目：https://hydro.ac/d/coder_gather/p/ode0007
*/
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
/* 
    input:
    a11,a12,a13,a14,a15,a21,a22,a23,a24,a25, a31,a32,a33,a34,a35,x1,x2,x3,x4,x5,b1,b2,b3,<=,<=,<=
*/
rl.on("line", (line) => {
    const input = line.split(";");
    const factor = input.slice(0, 3).map((item) => item.split(","));
    const variable = input[3].split(",");
    const b = input[4].split(",");
    const opt = input[5].split(",");
    const n = factor.length;
    const m = factor[0].length;
    const  flag = new Array(n).fill(0);
    const dist = new Array(n).fill(0);
    // console.log(factor,variable,b,opt);
    for (let i = 0; i < n; i++) {
        let sum = 0;
        // 计算每行式子
        for (let j = 0; j < m; j++) {
            sum += factor[i][j] * variable[j];
        }
        switch (opt[i]) {
            case "=":
                if (sum !== b[i]) {
                    flag[i] = 1;
                }
                break;
            case ">":
                if (sum <= b[i]) {
                    flag[i] = 1;
                }
                break;
            case "<":
                if (sum >= b[i]) {
                    flag[i] = 1;
                }
                break;
            case "<=":
                if (sum > b[i]) {
                    flag[i] = 1;
                }
                break;
            case ">=":
                if (sum < b[i]) {
                    flag[i] = 1;
                }
                break;
        }
        dist[i] = sum - b[i];
    }
    const maxVal = Math.max(...dist);
    const isTrue = flag.reduce((a,b)=> a+b, 0) ===0 ? true : false;
    console.log(isTrue+ " " +Math.floor(maxVal));
});

// console.log([1, 2, 3].slice(-1));
