class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        # 模拟栈，当然这个太麻烦了。可以直接用k指针来代替
        k = 0
        z = 0
        ns = len(s)
        nt = len(t)
        list1 = []
        list2 = []
        for i in range(ns):
            if s[i] == "#":
                if len(list1) == 0:
                    continue
                list1.pop()
                continue
            list1.append(s[i])
        for j in range(nt):
            if t[j] == "#":
                if len(list2) == 0:
                    continue
                list2.pop()
                continue
            list2.append(t[j])
        return "".join(list1) == "".join(list2)


if __name__ == "__main__":
    solution = Solution()
    # print(solution.backspaceCompare("ab#c", "ad#c"))  # expected true
    # print(solution.backspaceCompare("ab##", "c#d#"))  # expected true
    print(solution.backspaceCompare("a##c", "#a#c"))  # expected true
