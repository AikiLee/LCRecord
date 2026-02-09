from typing import List


class Solution:
    MAPPING = "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"

    def letterCombinations(self, digits: str) -> List[str]:
        """
        组合问题：
        1. 给定输入就是end condition,
        2. 具体的，这是一个如何枚举的问题，使用for MAPPING[i]组织循环
        3. 使用MAPPING存储数字到字符的映射
        """
        n = len(digits)
        res = []

        def dfs(i, path=[]):
            if i > n:
                return
            if i == n:
                res.append("".join(path))
                return
            num = digits[i]
            # 在这里更新i，是为了和映射之后的循环区分
            i += 1
            s = self.MAPPING[int(num)]
            for c in s:
                # update
                path.append(c)
                dfs(i, path)
                path.pop()

        dfs(0)
        return res


if __name__ == "__main__":
    s = Solution()
    print(
        s.letterCombinations("23")
    )  # expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
