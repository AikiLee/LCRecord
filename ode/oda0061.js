/* 
事件推送：
https://hydro.ac/d/coder_gather/p/oda0061
题目描述
同一个数轴X上有两个点的集合A={A1, A2, …, Am}和B={B1, B2, …, Bn}，Ai和Bj均为正整数，A、B已经按照从小到大排好序，A、B均不为空，给定一个距离R(正整数)，列出同时满足如下条件的所有（Ai, Bj）数对：

Ai <= Bj
Ai, Bj之间的距离小于等于R
在满足1,2的情况下,每个Ai只需输出距离最近的Bj
输出结果按Ai从小到大的顺序排序
输入描述
第一行三个正整数m,n,R

第二行m个正整数,表示集合A

第三行n个正整数,表示集合B

输入限制：

1 <= R <= 100000
1 <= n,m <= 100000
1 <=Ai,Bj <= 1000000000
输出描述
每组数对输出一行Ai和Bj,以空格隔开

4 5 5
1 5 5 10
1 3 8 8 20

expect output:
1 1
5 8
5 8
*/
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
let lineCount = 0;
rl.on("line", (line) => {
    lineCount++;
    input.push(line);
    if (lineCount === 3) {
        const [m, n, R] = input[0].split(" ").map(Number);
        const A = input[1].split(" ").map(Number);
        const B = input[2].split(" ").map(Number);
        processData(m, n, R, A, B);
        rl.close();
    }
});

function processData(m, n, R, A, B) {
    /* 
    Ai <= Bj
    Ai, Bj之间的距离小于等于R
    在满足1,2的情况下,每个Ai只需输出距离最近的Bj
    输出结果按Ai从小到大的顺序排序
   */
    //  1e5数据量下会超时
    // const map = new Map();
    // for (let i = 0; i < m; i++) {
    //     for (let j = 0; j < n; j++) {
    //         if (A[i] <= B[j] && Math.abs(A[i] - B[j]) <= R) {
    //             const dist = Math.abs(A[i] - B[j]);
    //             if(!map.has(A[i])) {
    //                 map.set(A[i], B[j]);
    //             }else if (Math.abs(A[i] - map.get(A[i])) > dist) {
    //                 // ai到bj的距离更近,更新
    //                 map.set(A[i], B[j]);
    //             }
    //         }
    //     }
    // }
    // const ans = Array.from(map);
    // console.log(ans);

    // 使用双指针，来优化
    let j = 0; 
    const result = [];
    for(let i = 0; i < A.length; i++){
        while( j < n && B[j] < A[i]) {
            // 用到Ai <= Bj这一条件
            j++;
        }
        if(j >= n ) break;
        if(B[j] - A[i] <= R) {
            result.push([A[i], B[j]]);
        }

    }
    for(let x of result){
        console.log(x.join(' '));
    }

}
