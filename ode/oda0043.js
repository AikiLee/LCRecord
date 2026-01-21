/* 
现在有n个容器服务，服务的启动可能有一定的依赖性（有些服务启动没有依赖），其次服务自身启动加载会消耗一些时间。

给你一个 n x n 的二维矩阵useTime，其中

useTime[i][i]=10 表示服务i自身启动加载需要消耗10s
useTime[i][j] = 1 表示服务i启动依赖服务j启动完成
useTime[i][k]=0 表示服务i启动不依赖服务k
其实 0<= i，j，k < n。

服务之间启动没有循环依赖（不会出现环），若想对任意一个服务i进行集成测试（服务i自身也需要加载），求最少需要等待多少时间。

输入描述
第一行输入服务总量 n， 之后的 n 行表示服务启动的依赖关系以及自身启动加载耗时 最后输入 k 表示计算需要等待多少时间后可以对服务 k 进行集成测试

其中 1 <= k <=n，1<=n<=100

输出描述
最少需要等待多少时间(s)后可以对服务 k 进行集成测试

输入
3
5 0 0
1 5 0
0 1 5
3
输出
15
*/
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const input = [];
// 输入较为复杂的输入还是读写分离
rl.on("line", (line) => {
    input.push(line.split(" ").map(Number));
}).on("close", () => {
    const N = input[0][0];
    const matrix = input.slice(1, 4);
    const target = input[N + 1][0];
    //最少等待时间 = 所有的依赖服务启动时间之和 + 本身的启动时间
    
    // useTime[i][j] = 1 表示服务i启动依赖服务j启动完成，j就是依赖，需要行遍历
    // 但是会出现一种情况，A -> B -> C这种递归的情况
    // 先暴力做一下吧
    const res = findMin(matrix, target);
    console.log(res);

});

function findMin(matrix, target) {
    const N = matrix.length;
    const memo = new Array(N).fill(-1);
    const dfs = (id) => {
        if(memo[id] !== -1) {
            return memo[id];
        }
        const selfTime = matrix[id][id];
        let maxDepTime = 0 ;
        for(let j = 0; j< N; j++){
            if(id !==j && matrix[id][j] === 1){
                maxDepTime = Math.max(maxDepTime, dfs(j));
            }
        }
        const totalTime = selfTime + maxDepTime;
        memo[id] = totalTime;
        return totalTime;
    };
    return dfs(target-1);
}
