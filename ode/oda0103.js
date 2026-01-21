/* 
Solo和koko是两兄弟，妈妈给了他们一大堆积木，每块积木上都有自己的重量。

现在他们想要将这些积木分成两堆。哥哥Solo负责分配，弟弟koko要求两个人获得的积木总重量“相等”（根据Koko的逻辑），个数可以不同，不然就会哭，但koko只会先将两个数转成二进制再进行加法，而且总会忘记进位（每个进位都忘记）。如当25（11101）加11（01011）时，koko得到的计算结果是18（10010）：

 11001
+01011
--------
 10010
Solo想要尽可能使自己得到的积木总重量最大，且不让koko哭。

input: 
3
3 5 6 
output:
11
101
110


*/

// 梳理一下：koko什么时候会哭：总重量不同的时候
// solo是怎么分的呢：

// 转换成一个特殊的二进制加法问题：模拟koko计算方式
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];
rl.on("line", (line) => {
    input.push(line.split(" "));
}).on("close", () => {
    const n = +input[0][0];
    const items = input[1];
    const maxWeight = -Infinity;
    // 这是选或者不选
    const dfs = (i,store) => {
        // 越界，结束了
        if(i >= n ) return ;
        for(let j = i ; j < n; j++) {


        }

    }

    console.log(kokoAdd(["25", "11"]));
});

//转换成二进制加法，并且每一个进位都会丢失，那这不就是按位异或了吗
function kokoAdd(items) {
    const n = items.length;
    let binarySum = 0;
    for (let i of items) {
        binarySum = i ^ binarySum;
    }
    return binarySum;
}
