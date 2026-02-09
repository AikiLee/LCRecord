from typing import List


class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        """
        实现方式：
        1. 使用回溯模板
        2. 除了记录路径，还需要记录当前路径是否被访问：
        示例 1：
        输入：nums = [1,2,3]
        输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
        示例 2：
        输入：nums = [0,1]
        输出：[[0,1],[1,0]]

        Args:
            nums (List[int]): _description_

        Returns:
            List[List[int]]: _description_
        """
        n = len(nums)
        path = [0] * n  # 所有排列的长度都是一样的 n
        on_path = [False] * n
        ans = []

        def dfs(i):
            if i == n:
                ans.append(path.copy())
            for j, on in enumerate(on_path):
                if not on:
                    path[i] = nums[j]
                    on_path[j] = True
                    dfs(i + 1)
                    on_path[j] = False

        # def dfs(i, path, on_path):
        #     if i == n:
        #         ans.append(path[:])
        #     for j, on in enumerate(on_path):
        #         if not on:
        #             path[i] = nums[j]
        #             on_path[j] = True
        #             dfs(i + 1, path, on_path)
        #             on_path[j] = False

        # dfs(0, [0 for _ in range(n)], [False for _ in range(n)])
        dfs(0)
        return ans


if __name__ == "__main__":
    s = Solution()
    print(s.permute([1, 2, 3]))
