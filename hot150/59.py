class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        # 多了一个元素的生成,其实本质没变，直接新建一个空矩阵然后填入数据就行了
        res = [[0] * n for _ in range(n)]
        left, right = 0, n - 1
        top, bottom = 0, n - 1
        cnt = 1
        # 重复螺旋举证的思路
        while True:
            # right
            for i in range(left, right + 1):
                res[top][i] = cnt
                cnt += 1
            top += 1
            if top > bottom:
                break

            # down
            for i in range(top, bottom + 1):
                res[i][right] = cnt
                cnt += 1
            right -= 1
            if left > right:
                break

            # left
            for i in range(right, left - 1, -1):
                res[bottom][i] = cnt
                cnt += 1
            bottom -= 1
            if top > bottom:
                break

            # up
            for i in range(bottom, top - 1, -1):
                res[i][left] = cnt
                cnt += 1
            left += 1
            if left > right:
                break

        return res


if __name__ == "__main__":
    solution = Solution()
    print(solution.generateMatrix(3))
