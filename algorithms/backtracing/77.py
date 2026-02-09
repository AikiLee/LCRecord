from typing import List


class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []

        def dfs(start, k, path=[]):
            # 终止条件：当path长度达到k时
            if len(path) == k:
                res.append(path[:])  # 创建path的副本
                return
            # 枚举可能的数字, 先选再撤销。
            for i in range(start, n + 1):
                # 使用深拷贝也可不撤销选择，利用系统栈保存的信息
                # new_path = path[:]
                # new_path.append(i)  # 选择当前数字
                dfs(i + 1, k, new_path)  # 递归处理
                path.pop()  # 回溯，撤销选择

        dfs(1, k)
        return res


if __name__ == "__main__":
    s = Solution()
    print(s.combine(4, 2))
    # expected [
    #   [2,4],
    #   [3,4],
    #   [2,3],
    #   [1,2],
    #   [1,3],
    #   [1,4],
    # ]
