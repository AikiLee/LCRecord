/* 
  题目:https://hydro.ac/d/coder_gather/p/oda0062
  思路：
  完全二叉树的非叶节点的后序遍历。就是正常的后续遍历然后判断是否为叶节点再输出

*/
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    const input = line.split(" ").map(Number);
    const res = [];
    // console.log(input);
    const dfs = (i) => {
        if(i >= input.length) return ;
        dfs(2 * i + 1);
        dfs(2 * i + 2);
        if(input[i] !== undefined && input[2*i + 1 ] !== undefined || input[2*i + 2] !== undefined){
            res.push(input[i]);
        }
    }
    dfs(0);
    console.log(res.join(" "));


});
