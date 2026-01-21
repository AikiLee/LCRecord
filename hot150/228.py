class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        n = len(nums)
        if n == 0:
            return []
        elif n == 1:
            return [f"{nums[0]}"]
        res = []
        start = 0
        for i in range(1, n):
            if nums[i] - nums[i - 1] != 1:
                # 结算上一段
                if start == i - 1:
                    res.append(str(nums[start]))
                else:
                    res.append(f"{nums[start]}->{nums[i-1]}")
                start = i

        # 循环结束了，最后一段 start -> n-1 还没处理，手动补上
        if start == n - 1:
            res.append(str(nums[start]))
        else:
            # start不在末尾
            res.append(f"{nums[start]}->{nums[n-1]}")
        return res


if __name__ == "__main__":
    solution = Solution()
    # print(solution.summaryRanges([0, 1, 2, 4, 5, 7]))
    print(solution.summaryRanges([-1]))
