class Solution:
    def spiralArray(self, array: List[List[int]]) -> List[int]:
        if not array:
            return []
        top, bottom = 0, len(array) - 1
        left, right = 0, len(array[0]) - 1
        res = []
        while True:
            # left
            for i in range(left, right + 1):
                res.append(array[top][i])
            top += 1
            if bottom < top:
                break

            # down
            for i in range(top, bottom + 1):
                res.append(array[i][right])
            right -= 1
            if left > right:
                break

            # left
            for i in range(right, left - 1, -1):
                res.append(array[bottom][i])
            bottom -= 1
            if top > bottom:
                break

            # up
            for i in range(bottom, top - 1, -1):
                res.append(array[i][left])
            left += 1
            if left < right:
                break
        return res


if __name__ == "__main__":
    solution = Solution()
    solution.spiralArray(
        [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]]
    )
