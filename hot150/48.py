class Solution:
    def rotate(self, matrix: List[List[int]]) -> List[List[int]]:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # 矩阵旋转的行为可以拆分成：矩阵进行转置 + 列交换
        # 先进行转置操作
        n = len(matrix)
        for i in range(n):
            for j in range(0, i + 1):
                tmp = matrix[j][i]
                matrix[j][i] = matrix[i][j]
                matrix[i][j] = tmp
        # 之后进行行交换
        i, j = 0, n - 1
        while i < j:
            for row in range(n):
                tmp = matrix[row][i]
                matrix[row][i] = matrix[row][j]
                matrix[row][j] = tmp

            i += 1
            j -= 1
        return matrix


if __name__ == "__main__":
    solution = Solution()
    print(
        solution.rotate([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]])
    )
