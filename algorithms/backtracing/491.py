from typing import List


class Solution:
    def findSubsequences(self, nums: List[int]) -> List[List[int]]:
        path = []
        res = set()
        n = len(nums)

        # 因为是子序列，不要求连续，只要保证path中是递增的就可以
        def dfs(i):
            if len(path) >= 2:
                res.add(tuple(path))

            for j in range(i, n):
                # 剪枝：只有当 path 为空，或者新元素 >= path 最后一个元素时才添加
                if not path or nums[j] >= path[-1]:
                    path.append(nums[j])
                    dfs(j + 1)
                    # backtracing: append 和 pop 必须配对
                    path.pop()

        dfs(0)
        return [list(x) for x in res]


if __name__ == "__main__":
    s = Solution()
    # print(s.findSubsequences([4, 6, 7, 7]))
    print(
        s.findSubsequences([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1])
    )  # 少了 1,2,3,4,5,6,7,9,10
    # print(s.findSubsequences([4, 4, 3, 2, 1]))
