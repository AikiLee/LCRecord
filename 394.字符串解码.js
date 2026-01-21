/*
 * @lc app=leetcode.cn id=394 lang=javascript
 *
 * [394] 字符串解码
 *
 * https://leetcode.cn/problems/decode-string/description/
 *
 * algorithms
 * Medium (59.47%)
 * Likes:    1987
 * Dislikes: 0
 * Total Accepted:    451.6K
 * Total Submissions: 753.8K
 * Testcase Example:  '"3[a]2[bc]"'
 *
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 *
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 *
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 *
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "3[a2[c]]"
 * 输出："accaccacc"
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "2[abc]3[cd]ef"
 * 输出："abcabccdcdcdef"
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "abc3[cd]xyz"
 * 输出："abccdcdcdxyz"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 30
 * s 由小写英文字母、数字和方括号 '[]' 组成
 * s 保证是一个 有效 的输入。
 * s 中所有整数的取值范围为 [1, 300]
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
    /* 
        读题：
        字符串解析，格式n[string] 输出格式：string * n ; 
        如何解析，可以使用栈，每当读到'['时就存入字符，直到读到']'时，将栈中的字符取出，并重复n次，然后将结果存入栈中，直到栈为空，将结果拼接成字符串返回;
        如何拼接：由于可能出现多个括号，考虑使用string.concat来实现✖；可以先split成数组，之后join成字符串;
        但是哲理有嵌套的情况，使用数组直接分割就不行了，考虑使用栈；
    */
    //输入：s = "3[a2[c]]"
    //输出："accaccacc" ,如何处理嵌套的情况
    const stk = []; //用于存储字符，每当读取到'['就开始存字符
    const res = [];
    const n = s.length;
    for (let i = 0; i < n; i++) {
        const c = s[i];
        
        if (isNum(c)) {
            let num = c;
            //如果c为数字，那就要判断之后是否还有数字 
            while(i+1 < n && isNum(s[i+1])) {
                num += s[i+1];
                i++;
            }
            stk.push(+num);

        } 
        else if (c !== "]") {
            // not num but char
            res.push(c);
        } else {
            // c === ']'
            const num = parseInt(stk.pop());
            let str = "";
            let top = res.pop();
            while (top !== "[") {
                str = top + str;
                top = res.pop();
            }
            let tmp = str.repeat(num);
            for (let c of tmp) {
                res.push(c);
            }
        }
    }

    return res.join("");
};

const isNum = (c) => {
    return c >= "0" && c <= "9";
};


// @lc code=end
// console.log(decodeString("3[a]2[bc]")); //expected aaabcbc
// console.log(decodeString("3[a2[c]]")); //expected accaccacc
// console.log(decodeString("2[abc]3[cd]ef")); //expected abcabccdcdcdef
console.log(decodeString("100[leetcode]"));
