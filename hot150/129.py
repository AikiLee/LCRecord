# Definition for a binary tree node.
from buildbtree import build_tree


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        # 先考虑模拟做法
        total = 0
        if not root:
            return
        stk = [(root, [root.val])]
        while len(stk) > 0:
            node, path = stk.pop()
            # end situtation, calculate root to leaf's number
            if node.left is None and node.right is None:
                s = "".join(map(str, path))
                total += int(s)
            if node.left:
                stk.append((node.left, [*path, node.left.val]))
            if node.right:
                stk.append((node.right, [*path, node.right.val]))
        return total


if __name__ == "__main__":
    root = build_tree([4, 9, 0, 5, 1])
    solution = Solution()
    print(solution.sumNumbers(root))
