from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        继续回顾回溯模板：
        def dfs():
            if end condition:
                return
            for current level element set:
                handler
                dfs()
                traceback

        对于本题：dfs(i,)
        1. 结束条件：target > 7 ; target == 7 add to the res
        2. 回溯：
            - 可以重复，所以还是一个如何枚举的问题，单纯用for循环就可以比较好的解决
            - handler过程就是更新path和组织循环
            - 回溯的过程就是将path中的元素pop出来

        Args:
            candidates (List[int]): _description_
            target (int): _description_

        Returns:
            List[List[int]]: _description_

        Demo:
        输入：candidates = [2,3,6,7], target = 7
        输出：[[2,2,3],[7]]
        解释：
        2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
        7 也是一个候选， 7 = 7 。
        仅有这两种组合。
        """
        n = len(candidates)
        res = set()
        candidates.sort()

        def dfs(i, path=[]):
            pre_sum = sum(path)
            if pre_sum > target:
                return
            if pre_sum == target:
                res.add(tuple(path))
                return
            for j in range(i, n):
                # 剪枝，这里能这么用，是需要先将candidates排序的，会提升平均性能但是极端情况还是没有改善
                if pre_sum + candidates[j] > target:
                    continue
                # update
                path.append(candidates[j])
                dfs(j, path)
                # 撤销操作
                path.pop()

        dfs(0)
        return [list(t) for t in res]


if __name__ == "__main__":
    s = Solution()
    print(s.combinationSum([2, 3, 6, 7], 7))  # expected [[2,2,3],[7]]
