class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        return sorted(s) == sorted(t)


if __name__ == "__main__":
    solution = Solution()
    print(solution.isAnagram("rat", "car"))
