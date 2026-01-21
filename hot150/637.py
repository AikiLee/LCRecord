from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


# optional like Union[X,None]
# use level traverse to build tree
def build_tree(values: List[Optional[int]]) -> Optional[TreeNode]:
    if not values:
        return None
    root = TreeNode(values[0])
    queue = [root]
    i = 1
    while i < len(values):
        node = queue.pop(0)
        # Process left child
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        # Process right child
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root


class Solution:
    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
        if not root:
            return []
        queue = [root]
        res = []
        while queue:
            n = len(queue)
            level_sum = 0

            # 使用range(n)确保只处理当前层的节点
            # Warning: 你的原代码中 while 循环里同时 append 和 pop(0) 会导致逻辑混乱
            for _ in range(n):
                node = queue.pop(0)
                level_sum += node.val

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            res.append(level_sum / n)
        return res


if __name__ == "__main__":
    solution = Solution()
    # 需要先用辅助函数构建树
    root = build_tree([3, 9, 20, None, None, 15, 7])
    print(solution.averageOfLevels(root))
