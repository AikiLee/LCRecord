# lc54. 螺旋矩阵 https://leetcode.cn/problems/spiral-matrix/description/


def print_matrix_circle(matrix: list[list[int]]):
    # use four pointer to locate
    res = []
    left, right = 0, len(matrix[0]) - 1
    top, bottom = 0, len(matrix) - 1
    # four direction:
    # 1.left -> right, then go bottom, matrix[top][i]; top+=1.
    # 2.top -> bottom, then go left, matrix[i][right]; right-=1
    # 3. right -> left, then go top, matrix[bottom][i];bottom -=1
    # 4. bottom -> top, then go right, matrix[i][left]; left+=1
    while left <= right and top <= bottom:
        for i in range(left, right + 1):
            res.append(matrix[top][i])
        top += 1
        if top > bottom:
            break

        for i in range(top, bottom + 1):
            res.append(matrix[i][right])
        right -= 1
        if left > right:
            break

        for i in range(right, left - 1, -1):
            res.append(matrix[bottom][i])
        bottom -= 1
        if top > bottom:
            break

        for i in range(bottom, top - 1, -1):
            res.append(matrix[i][left])
        left += 1
        if left > right:
            break
    return res


if __name__ == "__main__":
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    print(print_matrix_circle(matrix))
