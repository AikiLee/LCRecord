/**
 * topic: https://hydro.ac/d/coder_gather/p/ode0044
 * 英文输入法联想：
 * 读题：
 * 1.根据用户输入的单词前缀，在传入的英文语句中联想除单词，并且按照字典序列；
 * 2. 找不到责输出用户单词前缀
 * 
 * 输入：
 * line 1： 历史数据
 * line 2： 用户输入
 * 
 * 示例：
 *  I love you
    He
    期望输出：
    He
 * 思路：前缀匹配，
 * 
 */
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// 为了保险，以后双行的就直接读，不要读后再同一处理了
rl.on("line", function (line1) {
    rl.on("line", function (line2) {
        line1 = line1.replace(/[^\w\s]/g, "");
        const word = line1.split(" ");
        const pre = line2;
        const wordSet = new Set(word);
        const res = [];
        let ans = "";
        // console.log(word,pre);
        for (let word of Array.from(wordSet).sort()) {
            if (word.startsWith(pre)) {
                res.push(word);
                ans += word + " ";
            }
        }
        if (res.length === 0) {
            console.log(pre);
        } else {
            console.log(res.join(" "));
            // const output = res.join("");
            // console.log(output.length);
            // console.log(ans);
        }
        rl.close();
    });
});
