class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        last_word = s.strip().split()[-1]
        return len(last_word)


if __name__ == "__main__":
    solution = Solution()
    print(solution.lengthOfLastWord("   fly me   to   the moon  "))  # expected 4
