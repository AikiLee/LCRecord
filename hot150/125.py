import re


class Solution:
    def isPalindrome(self, s: str) -> bool:

        tmp = re.sub(r"[^a-zA-Z]", "", s)
        tmp = tmp.lower()
        n = len(tmp)
        if n == 0 or n == 1:
            return False
        i = 0
        j = n - 1
        while i < j:
            if tmp[i] != tmp[j]:
                return False
            i += 1
            j -= 1
        return True


if __name__ == "__main__":
    solution = Solution()
    # print(solution.isPalindrome("A man, a plan, a canal: Panama"))
    print(solution.isPalindrome("0P"))
