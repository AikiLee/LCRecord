class Solution:
    def intToRoman(self, num: int) -> str:
        # 1. begin with 4/9,
        values = [
            (1000, "M"),
            (900, "CM"),
            (500, "D"),
            (400, "CD"),
            (100, "C"),
            (90, "XC"),
            (50, "L"),
            (40, "XL"),
            (10, "X"),
            (9, "IX"),
            (5, "V"),
            (4, "IV"),
            (1, "I"),
        ]
        res = []
        for value, symbol in values:
            if num == 0:
                break

            count, num = divmod(num, value)
            res.append(symbol * count)
        return "".join(res)


if __name__ == "__main__":
    solution = Solution()
    print(solution.intToRoman(3749))  # expected "MMMDCCXLIX"
