/* 
求出大于或等于 N 的最小回文素数。

如果一个数大于 1，且其因数只有 1 和它自身，那么这个数是素数。 例如，2，3，5，7，11 以及 13 是素数。

如果一个数从左往右读与从右往左读是一样的，那么这个数是回文数，例如，12321 是回文数。
*/

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

const input = [];
const N = 1e9;
rl.on("line", (line) => {
    input.push(parseInt(line));

}).on("close", () => {
    const n = input[0];
    // 所以就是找>=这个数的回文数
    for(let i = n; i < N; i++) {
        if(isPrime(i) && isPalindromes(i)) {
            console.log(i);
            break;
        }
    }
});

/**
 * 
 * @param {*} num 
 * @returns 返回true表示是素数，false表示不是素数
 */
function isPrime(num) {
    /* 
    1. 1不是素数
    2. 素数 = 大于1的自然数，且除了1和它本身没有其他因数
    3. 从2开始，到num的平方根，看是否有因数
    时间复杂度：O(sqrt(n))
    */
    if (num <= 1) {
        return false;
    }
    // 如果一个数不是素数，那么他必然可以被一个<=它平方根的数整除
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

/**
 * 
 * @param {*} num 
 * @returns 返回true表示是回文数，false表示不是回文数
 */
function isPalindromes(num) {
    // 判断是否是回文数
    const str = num.toString();
    const mid = str.length >> 1;
    for (let i = 0; i < mid; i++) {
        if (str[i] !== str[str.length - i - 1]) {
            return false;
        }
    }
    return true;
}