/* 
题目描述
疫情期间，小明隔离在家，百无聊赖，在纸上写数字玩。他发明了一种写法：
给出数字个数n和行数m（0 < n ≤ 999，0 < m ≤ 999），从左上角的1开始，按照顺时针螺旋向内写方式，依次写出2,3…n，最终形成一个m行矩阵。
小明对这个矩阵有些要求：

每行数字的个数一样多
列的数量尽可能少
填充数字时优先填充外部
数字不够时，使用单个*号占位
输入描述
输入一行，两个整数，空格隔开，依次表示n、m

输出描述
符合要求的唯一矩阵

input: 9 4
n column , m row
expect output:
1 2 3
* * 4
9 * 5
8 7 6
从1开始输出到n

思路：
1. 1e3不建议用dfs/bfs;
2. 直接用二维数组来处理;列数尽量少->求余 n % m
*/

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    let [n, row] = line.split(" ").map(Number);
    /* 
    1. 先求余，计算列数
    2. 用循环来做
    
    
    */
    // case2: 3 5 三个数字写成5行，成一列就行了
    const col = n % row === 0 ? n / row : Math.floor(n / row) + 1;
    const matrix = new Array(row).fill(-1).map((item) => new Array(col).fill(-1));
    let count = 0;
    let rowStart = 0,
        colStart = 0,
        rowEnd = row - 1,
        colEnd = col - 1;
    if (n <= row) {
        // 写成一列
        for (let i = 1; i <= row; i++) {
            if (i <= n) {
                console.log(i);
            } else {
                console.log("*");
            }
        }
    } else {
        try {
            while (true) {
                // 向右遍历
                for (let i = colStart; i <= colEnd; i++) {
                    matrix[rowStart][i] = ++count;
                    if (count === n) throw new Error();
                }
                if (++rowStart > rowEnd) break;
                // 向下遍历
                for (let i = rowStart; i <= rowEnd; i++) {
                    matrix[i][colEnd] = ++count;
                    if (count === n) throw new Error();
                }

                if (--colEnd < colStart) break;
                // 向左遍历
                for (let i = colEnd; i >= colStart; i--) {
                    matrix[rowEnd][i] = ++count;
                    if (count === n) throw new Error();
                }
                if (--rowEnd < rowStart) break;
                // 向上遍历
                for (let i = rowEnd; i >= rowStart; i--) {
                    matrix[i][colStart] = ++count;
                    if (count === n) throw new Error();
                }
                if (++colStart > colEnd) break;
            }
        } catch (error) {
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[0].length; j++) {
                    if (matrix[i][j] !== -1) {
                        process.stdout.write(`${matrix[i][j]} `);
                    } else {
                        process.stdout.write("* ");
                    }
                }
                process.stdout.write("\n");
            }
        }
    }

    rl.close();
});
