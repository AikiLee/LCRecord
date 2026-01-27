class Solution:
    def mySqrt(self, x: int) -> int:
        # core idea: binary search
        if x == 0 or x == 1:
            return x
        left, right = 0, x
        while left + 1 < right:
            mid = left + (right - left) // 2
            tmp = mid * mid
            # core: accurate answer should be place here
            if tmp <= x:
                left = mid
            else:
                right = mid
        return left


if __name__ == "__main__":
    solution = Solution()
    print(solution.mySqrt(8))
