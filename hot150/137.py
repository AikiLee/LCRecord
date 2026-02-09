from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        # 类似于136，但是这里需要我们设计一个模k计数器
        # 用统计走格子的方式
        nums.sort()
        n = len(nums)
        i = 0
        while i < n and i + 2 < n:
            fast = i + 2
            if nums[i] != nums[fast]:
                # find diff in this area
                target = nums[i]
                j = i + 1
                while j < i + 3:
                    if nums[j] != nums[i]:
                        return nums[i]
                    j += 1
            i += 3
        return nums[-1]


if __name__ == "__main__":
    s = Solution()
    print(s.singleNumber([2, 2, 3, 2]))
    # 0 0 0 1 1 1 99
    print(s.singleNumber([0, 1, 0, 1, 0, 1, 99]))
    # 100 100 100 500 30000 30000 30000
    print(s.singleNumber([30000, 500, 100, 30000, 100, 30000, 100]))
