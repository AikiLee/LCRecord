from typing import List


class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []

        # 1. 建立映射表
        phone_map = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }

        res = []

        # 定义回溯函数
        # index: 当前我要处理 digits 中的第几个数字
        # path: 到目前为止，我已经拼出的字符串
        def backtrack(index: int, path: str):
            # ending case: 只要拼够了长度，就算一种方案
            if index == len(digits):
                res.append(path)
                return

            # current process: 拿到当前数字只对应的字母列表
            digit = digits[index]
            letters = phone_map[digit]

            # 做出选择
            for char in letters:
                # 递归进入下一层 (implicitly backtracking when string concatenation creates new string)
                # 这里的 path + char 是创建了一个新字符串传下去，
                # 所以函数返回时，本层的 path 还是原来的 path，相当于自动“撤销”了
                backtrack(index + 1, path + char)

        backtrack(0, "")
        return res


if __name__ == "__main__":
    s = Solution()
    print(s.letterCombinations("23"))
