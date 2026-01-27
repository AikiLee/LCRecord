from typing import List


class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        # time require O(N),
        # firstly, solve this problem by sorting
        n = len(nums)
        if n == 1:
            return 1
        nums.sort()
        cnt_max = 1
        cnt = 1
        pre = nums[0]
        for i in range(1, n):
            if nums[i - 1] + 1 == nums[i]:
                pre = nums[i]
                cnt += 1
                cnt_max = max(cnt_max, cnt)
            elif nums[i - 1] == nums[i]:
                continue
            else:
                cnt = 1
        return cnt_max


if __name__ == "__main__":
    solution = Solution()
    print(solution.longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))  # expected 9
    print(solution.longestConsecutive([1, 0, 1, 2]))  # expected 9
