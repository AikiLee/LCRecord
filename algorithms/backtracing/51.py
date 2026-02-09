from typing import List


class Solution:

    def solveNQueens(self, n: int) -> List[List[str]]:
        """
        N-Queens 回溯解法
        思路：逐行放置皇后，每行只放一个，检查列和对角线冲突
        """
        # res = []
        # path = []  # 存储每行皇后所在的列号，path[i] = 第i行皇后在第几列

        # # 使用集合记录已占用的列和对角线
        # cols = set()  # 已占用的列
        # diag1 = set()  # 已占用的主对角线 (row - col 相同则在同一主对角线)
        # diag2 = set()  # 已占用的副对角线 (row + col 相同则在同一副对角线)

        # def dfs(row):
        #     # 终止条件：所有行都放置了皇后
        #     if row == n:
        #         res.append(self.positions_to_board(path[:], n))
        #         return

        #     # 尝试在当前行的每一列放置皇后
        #     for col in range(n):
        #         # 检查是否冲突：列、主对角线、副对角线
        #         if col in cols or (row - col) in diag1 or (row + col) in diag2:
        #             continue  # 冲突，跳过

        #         # 放置皇后
        #         path.append(col)
        #         cols.add(col)
        #         diag1.add(row - col)
        #         diag2.add(row + col)

        #         # 递归处理下一行
        #         dfs(row + 1)

        #         # 回溯：撤销放置
        #         path.pop()
        #         cols.remove(col)
        #         diag1.remove(row - col)
        #         diag2.remove(row + col)

        # dfs(0)
        # return res

    def positions_to_board(self, cols: list[int], n) -> list[str]:
        """
        将皇后列号列表转换为棋盘字符串表示

        输入: [1, 3, 0, 2] 表示第0行皇后在第1列，第1行皇后在第3列，以此类推
        输出: [".Q..", "...Q", "Q...", "..Q."]

        Args:
            cols: 每行皇后所在的列号，cols[i] = 第i行皇后在第几列

        Returns:
            棋盘字符串列表，Q 表示皇后，. 表示空位
        """
        board = []
        for col in cols:
            row_str = "." * col + "Q" + "." * (n - col - 1)
            board.append(row_str)
        return board

    def solveNQueens(self, n: int) -> List[List[str]]:

        pass


if __name__ == "__main__":
    s = Solution()
    print(s.solveNQueens(4))  # expected 2
