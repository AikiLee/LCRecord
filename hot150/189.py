from typing import List


class Solution:
    def rotate(self, nums: List[int], k: int) -> List[int]:
        """
        Do not return anything, modify nums in-place instead.
        """
        # like loop queue
        n = len(nums)
        k = k % n
        res = [0] * n
        for i in range(n):
            res[(i + k) % n] = nums[i]
        nums = res

        return nums


if __name__ == "__main__":
    solution = Solution()
    print(solution.rotate([1, 2, 3, 4, 5, 6, 7], 3))  # [5,6,7,1,2,3,4]
    print(solution.rotate([-1, -100, 3, 99], 2))  #  [3,99,-1,-100]
