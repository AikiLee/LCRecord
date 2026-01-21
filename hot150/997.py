class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        # 用双指针也可以做，i，j对应着首尾。因为是非递减数组，两端能找到局部最值，每次只需要将i，j之间的较大值放在list头部
        res = []
        n = len(nums)
        i = 0
        j = n - 1
        while i <= j and i < n and j >= 0:
            if abs(nums[i]) > abs(nums[j]):
                res.insert(0, nums[i] * nums[i])
                i += 1
            else:
                res.insert(0, nums[j] * nums[j])
                j -= 1
        return res


if __name__ == "__main__":
    solution = Solution()
    print(solution.sortedSquares([-4, -1, 0, 3, 10]))
