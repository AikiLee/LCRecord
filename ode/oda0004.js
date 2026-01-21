/* 
题目描述
有5台打印机打印文件，每台打印机有自己的待打印队列。

因为打印的文件内容有轻重缓急之分，所以队列中的文件有1~10不同的代先级，其中数字越大优先级越高。

打印机会从自己的待打印队列中选择优先级最高的文件来打印。

如果存在两个优先级一样的文件，则选择最早进入队列的那个文件。

现在请你来模拟这5台打印机的打印过程。

输入描述
每个输入包含1个测试用例，

每个测试用例第一行给出发生事件的数量N（0 < N < 1000）。

接下来有 N 行，分别表示发生的事件。共有如下两种事件：

“IN P NUM”，表示有一个拥有优先级 NUM 的文件放到了打印机 P 的待打印队列中。（0< P <= 5, 0 < NUM <= 10)；
“OUT P”，表示打印机 P 进行了一次文件打印，同时该文件从待打印队列中取出。（0 < P <= 5）。
输出描述
对于每个测试用例，每次”OUT P”事件，请在一行中输出文件的编号。
如果此时没有文件可以打印，请输出”NULL“。
文件的编号定义为”IN P NUM”事件发生第 x 次，此处待打印文件的编号为x。编号从1开始。

有5台打印机,按优先级进行排序
p: 1 [1,2,3]
p: 2 [1]

输出(编号）：
out 1 -> 3
out 2 => 

用例1:
输入
7
opt p num
IN 1 1
IN 1 2
IN 1 3
IN 2 1
opt p
OUT 1
OUT 2
OUT 2

输出
3
4
NULL
*/

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 这里多行输入，建议读写分离
let count = 0;
let N = 0;
const input = [];
rl.on("line", (line) => {
    if (count === 0) {
        N = Number(line.trim());
    } else {
        input.push(line.split(" "));
    }
    count++;
    if (count === N + 1) {
        processHandler(input);
        rl.close();
    }
});

// 理解之后就好处理了：对于输入数据，我们需要再次加工。因为打印机是固定的，所以我们直接可以开一个数组，将数据读入，并加上timestamp，这样就可以对文件编号了
function processHandler(input) {
    const printers = new Array(6).fill(0).map(() => []);
    // 需要将输入数据分成IN和OUT两部分来处理,记录分界位置
    let fileId = 1;
    // 处理输入数据,因为in和out可能交替执行
    for (let i = 0; i < input.length; i++) {
        const [type, id, priority] = input[i];
        if (type === "IN") {
            // 当读取到in的时候,将数据放入对应的打印机队列中，这里需要注意打印机id是从1开始
            printers[parseInt(id)].push([parseInt(priority), fileId++]);
        } else if (type === "OUT") {
            // 当读取到out的时候,将数据从对应的打印机队列中取出
            // 这里不需要进行全局的排序，只需要对当前数组排一遍即可
            const outId = parseInt(id);
            const outLen = printers[outId].length;
            // 如果对应位置有数据，则将队首出队
            if (outLen > 0) {
                if(outLen === 1){
                    console.log(printers[outId][0][1]);
                    printers[outId].shift()
                }else{
                    // 长度>1才有排序的必要
                    printers[outId].sort((a, b) => {
                        if (a[0] === b[0]) return a[1] - b[1];
                        return b[0] - a[0];
                    });
                    const [priority, fileId] = printers[outId].shift();
                    console.log(`${fileId}`);
                }
            } else {
                console.log(`NULL`);
            }
        }
    }
    // 拿到加上timestamp的打印机数据后，就可以进行排序了，先以num从大到小排序，num相同再以timestamp从小到大排序
}

// 自定义比较
// 如何在不修改源数组的情况下对数组进行排序呢？
// function arrSort(arr) {
//     arr.sort((a, b) => {
//         if (a[0] !== b[0]) {
//             return b[0] - a[0];
//         } else {
//             return a[1] - b[1];
//         }
//     });
// }

// function arrSort(printers) {
//     for (const arr of printers) {
//         arr.sort((a, b) => {
//             if (a[0] !== b[0]) {
//                 return b[0] - a[0];
//             } else {
//                 return a[1] - b[1];
//             }
//         });
//     }
//     return printers;
// }
