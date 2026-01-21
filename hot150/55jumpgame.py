class Solution:
    def canJump(self, nums: List[int]) -> bool:
        n = len(nums)
        # 可以变换一下，只要当前的序列是递增的，那么就可以访问到，直到非递增地址，就需要计算一下可达性。
        # 这种稍微有点复杂的问题，不要想着模拟，而是要转换，经过简单的理解就可以得到 i+nums[i]就是当前节点能达到的最大距离
        if n == 0 or n == 1:
            return True
        max_reach = 0
        for i, jump in enumerate(nums):
            # 关键点：如果当前位置 i 已经超过了之前的最远可达距离，说明中间断开了，走不到这里
            if i > max_reach:
                return False

            # 更新最远可达距离：当前位置 + 跳跃能力
            max_reach = max(max_reach, i + jump)

            # 如果最远已经能覆盖最后一个下标，直接成功
            if max_reach >= n - 1:
                return True
        return False


if __name__ == "__main__":
    solution = Solution()
    print(solution.canJump([3, 2, 1, 0, 4]))  # expected false
    print(solution.canJump([2, 3, 1, 1, 4]))  # expected true
    print(solution.canJump([1, 1, 2, 2, 0, 1, 1]))  # expected true
