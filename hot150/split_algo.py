from typing import List


class Solution:
    def myPow(self, x: float, n: int) -> float:
        """
        LeetCode 50. Pow(x, n)
        使用分治思想（快速幂）计算 x 的 n 次方。
        核心思想：x^n = x^(n/2) * x^(n/2)
        如果 n 是奇数，则 x^n = x * x^(n//2) * x^(n//2)
        """

        def quick_mul(N):
            if N == 0:
                return 1.0
            y = quick_mul(N // 2)
            return y * y if N % 2 == 0 else y * y * x

        return quick_mul(n) if n >= 0 else 1.0 / quick_mul(-n)

    def mySqrt(self, x: int) -> int:
        """
        LeetCode 69. Sqrt(x)
        虽然通常称为二分查找，但二分查找也是分治思想的一种应用。
        寻找 y，使得 y^2 <= x < (y+1)^2
        """
        if x == 0:
            return 0
        if x == 1:
            return 1

        left, right = 1, x
        ans = -1
        while left <= right:
            mid = (left + right) // 2
            if mid * mid <= x:
                ans = mid
                left = mid + 1
            else:
                right = mid - 1
        return ans


# 测试代码
if __name__ == "__main__":
    sol = Solution()

    # 测试 Pow(x, n)
    print("Pow(2.0, 10) =", sol.myPow(2.0, 10))  # 1024.0
    print("Pow(2.1, 3) =", sol.myPow(2.1, 3))
    print("Pow(2.0, -2) =", sol.myPow(2.0, -2))  # 0.25

    # 测试 Sqrt(x)
    print("Sqrt(4) =", sol.mySqrt(4))  # 2
    print("Sqrt(8) =", sol.mySqrt(8))  # 2
