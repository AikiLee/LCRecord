class Solution:
    def hIndex(self, citations: List[int]) -> int:
        # 基本思路：
        # 1. 先将citations从大到小排序，这样就可以自动计算出高于当前引用数的数量。
        # 2.
        citations.sort(reverse=True)
        n = len(citations)
        mid = n // 2
        return citations[mid]


if __name__ == "__main__":
    solution = Solution()
    print(solution.hIndex([3, 0, 6, 1, 5]))
