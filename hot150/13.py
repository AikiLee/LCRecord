class Solution:
    def romanToInt(self, s: str) -> int:

        # three cases need to be handled
        # 1. IX /IV  -1
        # 2. XL /XC -10
        # 3. CD /CM -100

        pre = ""
        res = 0
        for c in s:
            if c == "I":
                res += 1
            elif c == "V":
                res += 5
                if pre == "I":
                    # I calculate twice
                    res -= 2
            elif c == "X":
                res += 10
                if pre == "I":
                    res -= 2
            elif c == "L":
                res += 50
                if pre == "X":
                    res -= 20
            elif c == "C":
                res += 100
                if pre == "X":
                    res -= 20
            elif c == "D":
                res += 500
                if pre == "C":
                    res -= 200
            elif c == "M":
                res += 1000
                if pre == "C":
                    res -= 200
            pre = c
        return res


if __name__ == "__main__":
    solution = Solution()
    print(solution.romanToInt("MCMXCIV"))  # expected 1994
