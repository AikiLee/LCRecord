class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        k = 1  # nums[0] 肯定保留，k 指向下一个要放置的位置
        cnt = 1  # 当前数字出现的次数（已经包含了 nums[0]）
        n = len(nums)

        for i in range(1, n):
            if nums[i] == nums[i - 1]:
                # 发现重复项
                cnt += 1
            else:
                # 发现新数字，计数器重置
                cnt = 1

            # 只有当计数器不超过 2 时，才移动元素
            if cnt <= 2:
                nums[k] = nums[i]
                k += 1

        # 截取有效部分方便调试查看
        nums = nums[:k]
        return k, nums


if __name__ == "__main__":
    solution = Solution()
    # print(solution.removeDuplicates([1, 1, 1, 2, 2, 3]))
    print(solution.removeDuplicates([0, 0, 1, 1, 1, 2, 3]))  # expected [0,0,1,1,2,3]
