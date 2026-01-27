from buildbtree import build_tree
from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        前序 + 转为链树
        """
        pre_order_list = []

        def pre_order(root):
            if root is None:
                return
            pre_order_list.append(root.val)
            pre_order(root.left)
            pre_order(root.right)

        def build_right_tree(arr):
            if not arr:
                return
            n = len(arr)
            root = TreeNode(arr[0])
            i = 1
            pre = root
            while i < n:
                node = TreeNode(arr[i])
                pre.right = node
                i += 1
                pre = node
            return root

        pre_order(root)

        return build_right_tree(pre_order_list)


if __name__ == "__main__":
    solution = Solution()
    root = build_tree([1, 2, 5, 3, 4, None, 6])
    solution.flatten(root)
