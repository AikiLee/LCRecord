/* 
题目描述
给定字符串 target和 source，判断 target是否为 source 的子序列。

你可以认为target和 source 中仅包含英文小写字母。

字符串 source 可能会很长（长度~=500,000），而 target是个短字符串（长度<=100)。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。

（例如，”abc”是”aebycd”的一个子序列，而”ayb”不是）。

请找出最后一个子序列的起始位置。
input:
abc
abcaybec

output:
3

输入描述
第一行为target，短字符串（长度 <=100） 第二行为source，长字符串（长度 ~= 500,000）

输出描述
最后一个子序列的起始位置，即最后一个子序列首字母的下标。若在source中找不到target，则输出-1。
*/

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let lineCount = 0;
const input = [];
rl.on("line", (line) => {
    lineCount++;
    input.push(line);
    if(lineCount === 2){
        const [target,source] = input;
        processData(target,source);
        rl.close();
    }
})
/* 
abc
abcaybec
找target在source中完整出现的最后一个位置
*/
function processData(target,source){
    // 这里的子序列肯定是不连续的
    let j  = 0;
    let num = 0;
    let res = -1;
    for(let i = 0; i < source.length; i++) {
        if(source[i] === target[j]){
            j++;
        }
        if( j % target.length === 0) {
            // 第一次记录怎么办
                num++;
                j = j%target.length;
                if(num ){
                    res = i+1;
                }
        }
    }
    if(res === -1) console.log(-1);
    else console.log(res);



}