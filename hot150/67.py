class Solution:
    def addBinary(self, a: str, b: str) -> str:
        res = []
        i, j = len(a) - 1, len(b) - 1
        carry = 0

        # 只要还有位数没处理完，或者还有进位，就继续循环
        while i >= 0 or j >= 0 or carry:
            # 拿到当前位的值，如果索引越界视为 0
            digit_a = int(a[i]) if i >= 0 else 0
            digit_b = int(b[j]) if j >= 0 else 0

            total = digit_a + digit_b + carry

            # 这一位的结果是 total % 2 (例如 1+1=2, 2%2=0)
            res.append(str(total % 2))

            # 新的进位是 total // 2 (例如 1+1=2, 2//2=1)
            carry = total // 2

            i -= 1
            j -= 1

        # 因为是从低位往高位算的（append到末尾），最后要反转
        return "".join(res[::-1])


# 测试
s = Solution()
print(s.addBinary("11", "1"))  # 输出 "100"
