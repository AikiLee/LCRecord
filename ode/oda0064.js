/* 
    题目： https://hydro.ac/d/coder_gather/p/oda0064
    读题：将数字转为字符串；没给输入范围，就使用默认的。取Math.floor(input / 26), 每有1就补一个a



*/
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    let  input = Number(line);
    const output = [];
    let ans = "";
    if(input ===1 ) {
        console.log('a');
    }
    while(input>0){
        input--;
        let m = input%26;
        input = Math.floor(input/26);
        let a  =String.fromCharCode(97+m);
        output.push(a);
    }
    console.log(output.reverse().join(""));
    rl.close();
});
