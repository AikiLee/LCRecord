class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        n = len(s)
        if n > 12 or n < 4:
            return
        # 这是一个选或不选的问题
        path = []
        res = []

        def dfs(i: int) -> None:
            # end condition: i == n
            if i > n:
                return
            if len(path) == 4 and i == n:
                res.append(".".join(path[:]))
                return
            for j in range(i, n):
                t = s[i : j + 1]
                if is_legal(t):
                    path.append(t)
                    dfs(j + 1)
                    # backtracing
                    path.pop()

        dfs(0)
        return res

        def is_legal(s: str) -> bool:
            # 对每一个待加入的到路径中的数进行判断
            if not s:
                return
            if int(s) > 255 or int(s) < 0:
                return False
            real_num = str(int(s))
            if real_num != s:
                return False
            return True
