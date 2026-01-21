class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        k = 0  # next non val elem
        for x in nums:
            if x != val:
                nums[k] = x
                k += 1
        return k


if __name__ == "__main__":
    solution = Solution()
    print(solution.removeElement([3, 2, 2, 3], 3))
