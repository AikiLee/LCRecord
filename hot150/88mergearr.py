class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        if n == 0:
            return
        # nums1 的有效长度是 m，直接保留前 m 个元素即可，这样就去除了末尾的占位 0
        nums1[:] = nums1[:m]
        # nums2 在本题中通常全是有效数据，但如果只要 n 个也可以截取
        nums2[:] = nums2[:n]
        i = 0
        j = 0
        while i < len(nums1) and j < n:
            if nums1[i] < nums2[j]:
                i += 1
            else:
                nums1.insert(i, nums2[j])
                j += 1
        # while i < n:
        # nums1还没插入完，不用管的
        while j < n:
            # nums2 还没插入完，将所有元素追加到num1末尾
            nums1.append(nums2[j])
            j += 1


if __name__ == "__main__":
    solution = Solution()
    # print(solution.merge([0], 0, [1], 1))
    print(solution.merge([4, 0, 0, 0, 0, 0], 1, [1, 2, 3, 5, 6], 5))
