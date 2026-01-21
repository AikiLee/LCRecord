from typing import Optional
from buildbtree import build_tree


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    # def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
    #     # traverse tree and statical sum
    #     if not root:
    #         return False
    #     # end situation
    #     if root.left is None and root.right is None:
    #         return targetSum == 0
    #     targetSum -= root.val
    #     return self.hasPathSum(root.left, targetSum) or self.hasPathSum(
    #         root.right, targetSum
    #     )
    # case2: simulate system stack and use dfs. timecomplexity: O(n), spacecomplexity: O(n)
    # def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
    #     if not root:
    #         return False
    #     stk = [(root, targetSum - root.val)]
    #     while stk:
    #         # simulate system stk, when reach the leaf, stop and pop, then check the targetSum is 0
    #         node, cur_val = stk.pop()
    #         if node.left is None and node.right is None and cur_val == 0:
    #             return True

    #         if node.left:
    #             stk.append((node.left, cur_val - node.left.val))
    #         if node.right:
    #             stk.append((node.right, cur_val - node.right.val))
    #     return False

    # case3: use bfs to tarverse
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root:
            return False
        queue = [(root, root.val)]
        while queue:
            node, cur_sum = queue.pop(0)

            if not node.left and not node.right and cur_sum == targetSum:
                return True

            if node.left:
                queue.append((node.left, cur_sum + node.left.val))
            if node.right:
                queue.append((node.right, cur_sum + node.right.val))
        return False


if __name__ == "__main__":
    solution = Solution()
    root = build_tree([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1])
    print(solution.hasPathSum(root, 22))  # excepted true
