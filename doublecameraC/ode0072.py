"""
机器人活动区域[100分]
题目描述
现有一个[机器人]，可放置于 M × N 的网格中任意位置，每个网格包含一个非负整数编号，当相邻网格的数字编号差值的绝对值小于等于 1 时，机器人可以在网格间移动。

问题： 求机器人可活动的最大范围对应的网格点数目。

说明：网格左上角坐标为 (0,0) ,右下角坐标为(m−1,n−1)，机器人只能在相邻网格间上下左右移动

输入描述
第 1 行输入为 M 和 N

M 表示网格的行数
N 表示网格的列数
之后 M 行表示网格数值，每行 N 个数值（数值大小用 k 表示），数值间用单个空格分隔，行首行尾无多余空格。

M、 N、 k 均为整数
1 ≤ M，N ≤ 150,
0 ≤ k ≤ 50
输出描述
输出 1 行，包含 1 个数字，表示最大活动区域的网格点数目，
行首行尾无多余空格。

示例1
输入
4 4
1 2 5 2
2 4 4 5
3 5 7 1
4 6 2 4
输出
6
"""

import sys
from collections import deque

# 设置递归深度以防万一，虽然这里打算用 BFS
sys.setrecursionlimit(20000)


def solve():
    # 读取第一行 M N
    first_line = sys.stdin.readline().strip()
    if not first_line:
        return
    m, n = map(int, first_line.split())

    # 读取矩阵
    matrix = []
    for _ in range(m):
        matrix.append(list(map(int, sys.stdin.readline().strip().split())))

    # 记录访问过的节点
    visited = [[False for _ in range(n)] for _ in range(m)]
    max_area = 0

    # 方向数组：上下左右
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    for i in range(m):
        for j in range(n):
            if not visited[i][j]:
                # 开始 BFS 寻找连通分量
                current_area = 0
                q = deque([(i, j)])
                visited[i][j] = True
                current_area += 1

                while q:
                    x, y = q.popleft()

                    for dx, dy in directions:
                        nx, ny = x + dx, y + dy

                        # 检查边界
                        if 0 <= nx < m and 0 <= ny < n:
                            # 检查是否访问过
                            if not visited[nx][ny]:
                                # 检查数值差值条件
                                if abs(matrix[x][y] - matrix[nx][ny]) <= 1:
                                    visited[nx][ny] = True
                                    current_area += 1
                                    q.append((nx, ny))

                max_area = max(max_area, current_area)

    print(max_area)


if __name__ == "__main__":
    solve()
