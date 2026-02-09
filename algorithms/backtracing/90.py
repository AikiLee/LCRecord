from typing import List


class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        res = []
        path = []
        n = len(nums)

        def dfs(i):
            # 更改追加的条件
            if i > n:
                return
            # 一个比较简单的方法，存排序后的tuple，然后就可以可以判断了
            tmp = tuple(sorted(path[:]))
            if tmp not in res:
                res.append(tmp)
            for j in range(i, n):
                # cut the branch
                path.append(nums[j])
                dfs(j + 1)
                # backtracing
                path.pop()

        dfs(0)
        return list(map(list, res))


if __name__ == "__main__":
    s = Solution()
    print(s.subsetsWithDup([4, 4, 4, 1, 4]))
