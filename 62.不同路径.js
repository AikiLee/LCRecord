/* 
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

*/

var uniquePaths = function (m, n) {
    /*
    这一题可以抽象为选或不选的问题
    数据量小没什么问题：一旦大起来就要考虑使用记忆化搜索来优化了。
    */
    // const memo = new Array(m).fill(0).map(() => new Array(n).fill(-1));

    // // i控制行，j控制列
    // const dfs = (i, j) => {
    //     // 越界
    //     if (i < 0 || j < 0 || i >= m || j >= n) {
    //         return 0;
    //     }
    //     if (i === m - 1 && j === n - 1) {
    //         // 走到出口
    //         return 1;
    //     }
    //     if(memo[i][j] !== -1) return memo[i][j];
    //     return memo[i][j] = dfs(i + 1, j) + dfs(i, j + 1);
    // };
    // return dfs(0, 0);
    // 考虑使用dp来做，现在来recall一下如何将记忆化搜索的问题转化为dp
    const dp = new Array(m+1).fill(0).map(() => new Array(n+1).fill(0));
    // 将初始状态设置为1
    dp[0][1] = 1;
    for(let i = 0 ; i < m; i++) {
        for(let j = 0 ; j < n; j++) {
           dp[i+1][j+1] = dp[i][j+1] + dp[i+1][j]; 
        }
    }
    return dp[m][n];

};

console.log(uniquePaths(3, 7)); //expected 28
console.log(uniquePaths(3, 2)); //expected 3
console.log(uniquePaths(7, 3)); //expected 28
console.log(uniquePaths(3, 3)); //expected 6
