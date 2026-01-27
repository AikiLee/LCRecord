# lc48. 旋转图像：https://leetcode.cn/problems/rotate-image/description/?envType=study-plan-v2&envId=top-interview-150


def rotate_image(matrix: list[list[int]]):
    """
    顺时针旋转二维矩阵：
    1. 基本思路就是：借助一个辅助数组，直接将原位置映射到新位置
    2. 原地旋转：借助线性代数的知识，将矩阵的旋转拆分 = 矩阵转置 + 列交换
    1 2 3 - 转置->1 4 7  - 1_3列交换 ->
    4 5 6         2 5 8
    7 8 9         3 6 9

    end:
    7 4 1
    8 5 2
    9 6 3
    Args:
        matrix (list[list[int]]): _description_
    """

    def matrix_transpose(matrix: list[list[int]]):
        n = len(matrix)
        for i in range(0, n):
            for j in range(0, i):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        return matrix

    def column_exchange(matrix: list[list[int]]):
        n = len(matrix)
        for j in range(0, n // 2):
            for i in range(0, n):
                matrix[i][j], matrix[i][n - j - 1] = matrix[i][n - j - 1], matrix[i][j]
        return matrix

    m1 = matrix_transpose(matrix)
    m2 = column_exchange(m1)
    return m2


if __name__ == "__main__":
    print(rotate_image([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
