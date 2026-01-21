class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        # 可以先排序然后直接和最后一个来比
        if not strs:
            return ""
        strs.sort()
        s1 = strs[0]
        s2 = strs[-1]
        i = 0
        while i < len(s1) and i < len(s2) and s1[i] == s2[i]:
            i += 1
        return s1[:i]


if __name__ == "__main__":
    solution = Solution()
    print(solution.longestCommonPrefix(["flower", "flow", "flight"]))  # expected "fl"
