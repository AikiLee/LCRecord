"""
这里可以将分割理解成隔板，n个长的数组，有n个隔板，怎么分：
1. 利用for循环进行横向遍历，利用递归进行横向的遍历
2. 这是选或不选的问题



"""

from typing import List


class Solution:
    def partition(self, s: str) -> List[List[str]]:
        n = len(s)
        path = []
        res = []

        # def dfs(i, start):
        #     if i == n:
        #         res.append(path[:])
        #         return
        #     # 这里的作用是快速扫描
        #     if i < n - 1:
        #         dfs(i + 1, start)
        #     t = s[start : i + 1]
        #     if self.is_palidrome(t):
        #         path.append(t)
        #         # 最核心的一步，整体往后移动一位，然后继续寻找
        #         dfs(i + 1, i + 1)
        #         # withdraw
        #         path.pop()
        # dfs(0, 0)
        # return res

        def dfs(i):
            if i == n:
                res.append(path[:])
                return
            # 不要在循环中加一，这样很容易漏项
            for j in range(i, n):
                t = s[i : j + 1]
                if self.is_palidrome(t):
                    path.append(t)
                    dfs(j + 1)
                    # backtracing
                    path.pop()

        dfs(0)
        return res

    def is_palidrome(self, s: str) -> bool:
        if not s:
            return True
        n = len(s)
        for i in range(n // 2):
            if s[i] != s[n - i - 1]:
                return False
        return True


if __name__ == "__main__":
    s = Solution()
    print(s.partition("aab"))  # expected [["a","a","b"],["aa","b"]]
