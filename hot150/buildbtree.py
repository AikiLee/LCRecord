from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def build_tree(values: Optional[int]) -> TreeNode:
    """没有那么复杂，就基于完全二叉树来处理

    Args:
        values (Optional[int]): _description_

    Returns:
        TreeNode: _description_
    """
    if not values:
        return
    root = TreeNode(values[0])
    queue = [root]
    i = 1
    while i < len(values):
        node = queue.pop(0)
        # build and add left node
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        # i need to be set outside, when meet with "null"
        i += 1
        # build and add right node
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root


if __name__ == "__main__":
    ans = build_tree([5, 4, 8, 11, None, 13, 4])
