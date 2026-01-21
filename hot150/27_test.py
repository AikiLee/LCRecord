class Solution:
    def removeElement(self, nums: list[int], val: int) -> int:
        k = 0  # next non val elem
        for x in nums:
            if x != val:
                nums[k] = x
                k += 1
        return k


if __name__ == "__main__":
    solution = Solution()
    nums = [0, 1, 2, 2, 3, 0, 4, 2]
    val = 2
    k = solution.removeElement(nums, val)
    print(f"k = {k}")
    print(f"nums[:k] = {nums[:k]}")
