from typing import List

"""_summary_
给定一个长度为 n 的 0 索引整数数组 nums。初始位置在下标 0。

每个元素 nums[i] 表示从索引 i 向后跳转的最大长度。换句话说，如果你在索引 i 处，你可以跳转到任意 (i + j) 处：

0 <= j <= nums[i] 且
i + j < n
返回到达 n - 1 的最小跳跃次数。测试用例保证可以到达 n - 1。

示例 1:
输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
"""


class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 1:
            return 0

        # 这是一个隐式的 BFS (Implicit BFS)
        # 我们可以把跳跃看作是分层的：
        # 第 0 层: index 0
        # 第 1 层: index 0 能跳到的所有位置
        # 第 2 层: 第 1 层能跳到的所有位置...

        jumps = 0
        current_level_end = 0  # 当前这一层（步数）能到达的最右边界
        next_level_farthest = 0  # 下一层能探索到的最远位置

        # 遍历数组，但不需要访问最后一个元素。
        # 因为进入最后一个元素的逻辑在 i == current_level_end 判断中已经被处理了（步数+1）
        for i in range(n - 1):
            # 记录我们在当前层能触及到的最远位置，这将是下一层的边界
            next_level_farthest = max(next_level_farthest, i + nums[i])

            # 如果我们走到了当前层的边界
            if i == current_level_end:
                jumps += 1  # 必须迈出新的一步（进入下一层）
                current_level_end = (
                    next_level_farthest  # 更新当前层的边界为刚才探索到的最远位置
                )

                # 如果这个新边界已经覆盖了终点，那其实不需要再往后走了
                if current_level_end >= n - 1:
                    break

        return jumps


if __name__ == "__main__":
    solution = Solution()
    print(solution.jump([2, 3, 1, 1, 4]))  # Expected: 2 (0->1->4)
    print(solution.jump([1, 2, 1, 1, 1]))  # Expected: 3 (0->1->3->4)
    print(solution.jump([1, 1, 1, 1]))  # Expected: 3
