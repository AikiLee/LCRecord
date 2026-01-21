/* 
存在一个 m*n 的二维数组，其成员取值范围为 0，1，2。其中值为1的元素具备同化特性，每经过 1S，将上下左右值为0的元素同化为1，而值为2的元素，免疫同化。将数组所有成员随机初始化为0或2，再将矩阵的[0,0]元素修改为1，在经过足够长的时间后，求矩阵中有多少个元素是0或2（即0和2数量之和）。

输入：
m n 
matrix

*/
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = [];

rl.on("line",(line) => {
    input.push(line.split(' '));
}).on("close",() => {
    // 这个也是标准的bfs问题
    const m = parseInt(input[0][0]);
    const n = parseInt(input[0][1]);
    // 具体的矩阵信息
    const matrix = input.slice(1).map(row => row.map(Number));
    // 

})
