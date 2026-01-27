from typing import List


class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # 一个简单的思路就是按字典序进行排序然后去重就可以了
        p = dict()
        for x in strs:
            arr1 = list(x)
            arr1.sort()
            origin = "".join(arr1)
            if p.get(origin) is None:
                p.setdefault(origin, [x])
            else:
                p.get(origin).append(x)
        # res = []
        # for i in p.keys():
        #     tmp = p.get(i)
        #     res.append(tmp)
        return list(p.values())


if __name__ == "__main__":
    solution = Solution()
    print(solution.groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
