from typing import Optional
from buildbtree import build_tree


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


t = build_tree([3, 9, 20, None, None, 15, 7])


def level_traverse(root: Optional[TreeNode]):
    if not root:
        return
    queue = []
