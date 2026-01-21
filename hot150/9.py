class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        num = str(x)
        n = len(num)

        # 121 -> mid 1, 1221
        mid = n // 2
        if n % 2 == 0:
            i = 0
            j = mid
            while i < j and j < n and i < n:
                if num[i] != num[j]:
                    return False
                i += 1
                j += 1
        else:
            i = 0
            j = mid + 1
            while i < j and j < n and i < n:
                if num[i] != num[j]:
                    return False
                i += 1
                j += 1
        return True


if __name__ == "__main__":
    solution = Solution()
    # print(solution.isPalindrome(121))
    print(solution.isPalindrome(1001))
