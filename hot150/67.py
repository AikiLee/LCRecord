class Solution:
    MASK = 0xFFFFFFFF

    def addBinary(self, a: str, b: str) -> str:
        # 位运算模拟加法：a 存本位和(XOR)，b 存进位(AND << 1)
        # Python int 是任意精度，不存在越界问题，无需 MASK
        # (MASK 仅在需要模拟 32 位有符号整数时使用，如 LC 371 涉及负数的场景)
        a = int(a, 2)
        b = int(b, 2)
        while b != 0:
            # 本位和 (不进位加法)
            tmp = a ^ b
            # 进位
            b = (a & b) << 1
            a = tmp
        return bin(a)[2:]

    def minusBinary(self, a: str, b: str) -> str:
        a = int(a, 2)
        b = int(b, 2)
        # 将b转为补码
        MASK = 0xFFFFFFFF
        c = ~b + 1 & MASK
        while c != 0:
            # 本位和 (不进位加法)
            tmp = a ^ c & MASK
            # 进位
            c = (a & c) << 1
            a = tmp
        return bin(a)[2:]

    def multipleBinary(self, a: str, b: str) -> int:
        a = int(a, 2)
        b = int(b, 2)
        flag_a, flag_b = 0, 0
        if a < 0:
            flag_a = 1
        if b < 0:
            flag_b = 1
        cnt = 0
        while b != 0:
            # 提取最低位
            least = b & 1
            if least == 1:
                tmp = a * pow(2, cnt)
            # b 进行右移
            b = b >> 1
        flag = -1 if flag_a ^ flag_b else 1
        return flag * a


if __name__ == "__main__":
    s = Solution()
    print(s.multipleBinary("10000011", "1"))
    # print(s.minusBinary("11", "1"))
    # expected "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000"
