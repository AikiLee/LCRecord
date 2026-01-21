//! 本题关键的是使用正则表达式将字符串分离成数组，这也是需要掌握的技巧
/* 
题目：https://hydro.ac/d/coder_gather/p/ode0009
题目描述
磁盘的容量单位常用的有 M，G，T 这三个等级，它们之间的换算关系为：

1T = 1024G
1G = 1024M
现在给定 n 块磁盘的容量，请对它们按从小到大的顺序进行稳定排序。

例如给定5块盘的容量：

1T，20M，3G，10G6T，3M12G9M

排序后的结果为：

20M，3G，3M12G9M，1T，10G6T

注意单位可以重复出现，上述 3M12G9M 表示的容量即为：3M+12G+9M，和 12M12G 相等。

输入：
3
1G
2G
1024M
第一行是磁盘块的数量 n，接下来 n 行每行一个磁盘容量。

*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];
let n = 0;
let lineCount = 0;
// 对于这种多行读取，我还是建议读写分开写
rl.on("line", (line) => { 
    // 使用readline读取多行数据
    lineCount++;
    if(lineCount === 1) {
        n = parseInt(line);
    }else {
        input.push(line);
        if(lineCount - 1 === n){
            rl.close();
        }
    }
});

rl.on("close", () => {
    const arr = new Array();
    for(const str of input){
        // 使用正则表达式按G/M/T把字符串分离成字符数组
        const parts = str.match(/\d+[GMT]/g) || [];
        let totalM = 0 ;
        for(const part of parts){
            const num = parseInt(part.slice(0,-1));
            const unit = part.slice(-1);             // 提取单位
            
            if (unit === 'T') totalM += num * 1024 * 1024;
            else if (unit === 'G') totalM += num * 1024;
            else totalM += num; // M单位

        }
        arr.push({str,value: totalM});

    }
    console.log(arr.sort((a,b) => a.value - b.value).map(item => item.str).join('\n'));

})
