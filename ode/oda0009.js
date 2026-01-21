const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 输入较为复杂，建议读写分离
// let N = 0;
// let count = 0;
// const lines = [];
const input = [];
rl.on("line", (line) => {
    /**
     * 首先需要搞清楚这个美学的原理
     * 首先确定每行的长度 = 2*i + 1 (i>=1)
     * 之后确定如何处理：第一行可以固定为R ， 之后的每行可以理解
     * 为： 上一行取反 + 上一行
     */
    // 这里需要注意一点：line运行次数是有限的
    // if (count === 0) {
    //     N = parseInt(line.trim());
    // } else {
    //     lines.push(line.split(" ").map((item) => Number(item)));
    // }
    // if (count === N) {
    //     solve();
    //     rl.close();
    // }
    // count++;
    input.push(line.trim());
}).on("close", () => {
    let N = parseInt(input[0], 10);
    for (let i = 1; i <= N; i++) {
        let [n, k] = input[i].split(" ").map(Number);
        const res = recursiveFind(n, BigInt(k)) === "R" ? "red" : "blue";
        console.log(res);
    }
});

function solve(lines) {
    for (const line of lines) {
        const [n, k] = line;

        const result = recursiveFind(n, BigInt(k));
        if (result === "R") {
            console.log("red");
        } else {
            console.log("blue");
        }
    }
}

function newFind(n, k) {
    if (n === 1) return "red";
    if (n === 2) return k === BigInt(0) ? "blue" : "red";

    let half = BigInt(1) << BigInt(n - 2);

    if (k >= half) {
        return newFind(n - 1, k - half);
    } else {
        return newFind(n - 1, k) === "red" ? "blue" : "red";
    }
}

// 因为根的情况是确定的
function recursiveFind(n, k) {
    if (n === 1) return "R";
    // 使用BigInt计算，进行二分查找，如果落在前半部分，则需要取反，然后继续往上找；落在后半部分，就可以取相同往上找
    // 计算当前层的中间位置，就是上一层的长度
    const mid = 1n << (BigInt(n) - 2n);
    // 捋顺就清除多了，k如果在前半部分就需要取反，之后继续往上找，如果在后半部分，就可以直接往上找
    if (k < mid) {
        // 在前半部分
        const preChar = recursiveFind(n - 1, k);
        return preChar === "R" ? "B" : "R";
    } else {
        return recursiveFind(n - 1, k - mid);
    }
}
