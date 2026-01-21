class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        k = 0
        n = len(nums)
        for i in range(0, n):
            if i == 0:
                k += 1
                continue
            if nums[i] != nums[i - 1]:
                nums[k] = nums[i]
                k += 1

        nums = nums[:k]
        return k, nums


if __name__ == "__main__":
    solution = Solution()
    print(solution.removeDuplicates([1, 1, 2]))
    print(solution.removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]))
