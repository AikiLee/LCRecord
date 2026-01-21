# Definition for a binary tree node.
from buildbtree import build_tree


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        return self.judge(root.left, root.right)

    def judge(self, p, q):
        if p is None or q is None:
            return p is q
        return (
            p.val == q.val
            and self.judge(p.left, q.right)
            and self.judge(p.right, q.left)
        )


if __name__ == "__main__":
    root = build_tree([1, 2, 2, 3, 4, 4, 3])
    solution = Solution()
    print(solution.isSymmetric(root))
