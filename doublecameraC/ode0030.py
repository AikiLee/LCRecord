import sys
from typing import List

line = sys.stdin.readline().strip().split()
n = int(line[0])
row = int(line[1])

if n <= 0 or n > 999 or row <= 0 or row > 999:
    exit()


def build_matrix(n: int, row: int) -> List[List[int]]:
    col = n // row if n % row == 0 else n // row + 1
    m_total = row * col
    matrix = [[0 for _ in range(col)] for _ in range(row)]
    left, right = 0, col - 1
    top, bottom = 0, row - 1
    # count the number
    k = 1
    while left <= right and top <= bottom:
        for i in range(left, right + 1):
            matrix[top][i] = k if k <= n else "*"
            k += 1
        top += 1
        if top > bottom:
            break

        for i in range(top, bottom + 1):
            matrix[i][right] = k if k <= n else "*"
            k += 1
        right -= 1
        if left > right:
            break

        for i in range(right, left - 1, -1):
            matrix[bottom][i] = k if k <= n else "*"
            k += 1
        bottom -= 1
        if top > bottom:
            break

        for i in range(bottom, top - 1, -1):
            matrix[i][left] = k if k <= n else "*"
            k += 1
        left += 1
        if left > right:
            break
    return matrix


if __name__ == "__main__":
    matrix = build_matrix(n, row)
    for row in matrix:
        print(" ".join(str(x) for x in row))
