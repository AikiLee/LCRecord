/* 
给出一个字符串s，仅包含小写英文字母和括号。

请按照从括号内到外的顺序，逐层反转每队匹配括号中的字符串，并返回最终的结果。
输入：
(u(love)i)
输出：
iloveu


*/

// 这个一看就是标准的用栈来操作的
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const input = [];
rl.on("line", (line) => {
    input.push(line.trim());
}).on("close", () => {
    /**
     * 1.准备一个栈，每当读取到左括号时，将将后面的字符放入。
     * 2. 当读取到右括号时，就将开始弹
     * 3. 这里有一点小问题，因为括号是有层级的，所以需要设置一个变量来记录当前的层级，当层级为0时，就可以将栈中的元素弹出。
     *
     */
    const str = input[0];
    console.log(solve(str));
    // 感觉不适合用循环来处理这种多层级的结构，用递归来做
});
// (u(love)i(me)y) =>

function solve(s) {
    const stk = [""];
    /* 
    可以理解为，每遇到一个左括号，就开一层，然后不断添加字符，直到遇到右括号，就将这一层字符串反转，追加到上一层
    (i(love)u(de(lay))am)
    */
    for (const c of s) {
        if (c === "(") {
            stk.push("");
        } else if (c === ")") {
            const reversedStr = stk.pop().split("").reverse().join("");
            stk[stk.length - 1] += reversedStr;
        } else {
            stk[stk.length - 1] += c;
        }
    }
    return stk[0];
}
