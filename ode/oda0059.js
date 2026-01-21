/* 
题目描述
给定一个m*n的整数矩阵作为地图，矩阵数值为地形高度中庸行者选择地图中的任意一点作为起点，尝试往上、下、左、右四个相邻格子移动;移动时有如下约束：

中庸行者只能上坡或者下坡，不能走到高度相同的点 不允许连续上坡或者连续下坡，需要交替进行 每个位置只能经过一次，不能重复行走 请给出中庸行者在本地图内，能连续移动的最大次数
*/

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const input = [];
rl.on("line", (line) => {
    input.push(line.split(" ").map(Number));
}).on("close", () => {
    const [n, m] = input[0];
    const map = input.slice(1);
    // 梳理一下逻辑：1.只能上下，且不能连续上下 2.高度相同不能走 3.每个店只能走一次
    // 从每个点出发，进行dfs,但是还要找到最大的长度
    let maxLen = 0;
    const dfs = (r, c, visited, lastMoveType) => {
        visited[r][c] = true;
        let currentMax = 1;
        const dr = [-1, 1, 0, 0];
        const dc = [0, 0, -1, 1];
        for (let i = 0; i < 4; i++) {
            // 循环进行上下左右四个方向
            const nr = r + dr[i];
            const nc = c + dc[i];
            // 检测是否越界
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                const currentHeight = map[r][c];
                const nextHeight = map[nr][nc];
                if (currentHeight === nextHeight) {
                    continue;
                }
                const isUphill = nextHeight > currentHeight;
                // 检查交替上下坡规则
                if (lastMoveType === 1 && isUphill) continue; // 禁止连续上坡
                if (lastMoveType === -1 && !isUphill) continue; // 禁止连续下坡

                const nextMoveType = isUphill ? 1 : -1;
                currentMax = Math.max(currentMax, 1 + dfs(nr, nc, visited, nextMoveType));
                // 回溯，将当前节点标记为未访问，以便其他路径可以使用
                visited[r][c] = false;
                return currentMax;
            }
        }
    };

    // 遍历所有节点，作为起点进行DFS
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const visited = new Array(m).fill(false).map(() => new Array(n).fill(false));
            // 从 (i, j) 出发，初始移动类型为0（起点）
            const pathLen = dfs(i, j, visited, 0);
            maxLen = Math.max(maxLen, pathLen);
        }
    }

    console.log(maxLen > 0 ? maxLen - 1 : 0);
});
