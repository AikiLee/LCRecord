/* 
题目： https://hydro.ac/d/coder_gather/p/odb0040
描述：给定一段“密文”字符串 s，其中字符都是经过“密码本”映射的，现需要将“密文”解密并输出。映射的规则（'a' ~ 'i'）分别用（'1' ~ '9'）表示；（'j' ~ 'z'）分别用（"10*" ~ "26*"）表示。约束：映射始终唯一。

输入： 
20*19*20*
预期输出：
tst


j

twuqwtuvqtjqjvmy
twuqwiltuvqtjqjv

twuqwiltuvq
*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}); 

rl.on('line', function (line) { 
    const input = line.split('*').filter(el => el);
    const result = [];
    const map = new Map();
    for(let i = 1; i <= 26 ; i++) {
        map.set(i,String.fromCharCode(i + 96), 0);
    }
    for(let j = 0; j < input.length; j++){
        const cur = parseInt(input[j]);
        if(cur > 0 && cur < 27 ){
            result.push(map.get(cur));
        }
    }
    console.log(result.join(''));    
    rl.close();
});
