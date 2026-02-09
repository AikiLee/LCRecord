from typing import List


class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        n = len(s)
        path = []
        res = []

        # 剪枝：IP地址最多12位数字（3*4），如果超过必然无法构成
        if n > 12:
            return []

        def dfs(start_index):
            # 终止条件：如果不加以限制，path会一直变长
            # 这里的限制必须是：找到了4段
            if len(path) == 4:
                # 只有当正好切分完所有字符时，才是合法解
                if start_index == n:
                    res.append(".".join(path))
                return

            # 如果剩余的字符太多，甚至超过了剩余段数能容纳的最大长度，直接剪枝
            # 剩余段数 = 4 - len(path)
            # 每段最多3个字符
            if (n - start_index) > (4 - len(path)) * 3:
                return

            # 横向遍历：每一段只能是 1到3 个字符
            # 注意 range 的结束不仅受限于 n，也受限于 start_index + 3
            for j in range(start_index, min(start_index + 3, n)):
                segment = s[start_index : j + 1]

                # 校验合法性
                # 1. 前导0校验：长度大于1且以0开头是无效的 (如 "01", "00")
                if len(segment) > 1 and segment[0] == "0":
                    continue

                # 2. 数值校验：不能超过 255
                if int(segment) > 255:
                    continue

                path.append(segment)
                dfs(j + 1)
                path.pop()  # 回溯

        dfs(0)
        return res


if __name__ == "__main__":
    sol = Solution()
    # case 1
    print(sol.restoreIpAddresses("25525511135"))
    # expected: ["255.255.11.135","255.255.111.35"]

    # case 2
    print(sol.restoreIpAddresses("0000"))
    # expected: ["0.0.0.0"]
