class Solution:
    def reverseBits(self, n: int) -> int:
        r = []
        bit_len = n.bit_length()
        while n != 0:
            bit = n & 1
            n = n >> 1
            r.append(str(bit))
        if bit_len % 8 != 0:
            n_bytes = bit_len // 8
            total_len = (n_bytes + 1) * 8
            diff = total_len - bit_len
            for _ in range(diff):
                r.append("0")
        ans = "".join(r)
        # lose low bit
        return int(ans, 2)


if __name__ == "__main__":
    s = Solution()
    print(s.reverseBits(43261596))
"00111001011110000010100101"
"00111001011110000010100101000000"
