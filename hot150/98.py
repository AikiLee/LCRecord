from buildbtree import build_tree
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    pre = float("-inf")

    # mid order
    # def isValidBST(self, root: Optional[TreeNode]) -> bool:
    #     if root is None:
    #         return True
    #     if not self.isValidBST(root.left):
    #         return False
    #     if self.pre > root.val:
    #         return False
    #     self.pre = root.val
    #     return self.isValidBST(root.right)

    # front order
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        # mid traverse
        pre = float("-inf")
        # def isValidBST(self, root: Optional[TreeNode]) -> bool:
        # if root is None:
        #     return True
        # if not self.isValidBST(root.left):
        #     return False
        # if root.val <= self.pre:
        #     return False
        # self.pre = root.val
        # return self.isValidBST(root.right)

        # front traverse
        # def check(node: Optional[TreeNode], left: float, right: float) -> bool:
        #     if node is None:
        #         return True
        #     x = node.val

        #     if not (left < x < right):
        #         return False
        #     # when go to the left subtree, all the values should between (left, x). when go right, the values should between (x,right)
        #     return check(node.left, left, x) and check(node.right, x, right)

        # return check(root, float("-inf"), float("inf"))

    # Post-order traversal (Bottom-up)
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        # Recursion returns a tuple: (is_valid, min_val, max_val)
        def post_order(node):
            if not node:
                # Base case: Empty node is valid.
                # return inf for min and -inf for max so that comparison with parent always succeeds
                return True, float("inf"), float("-inf")

            l_valid, l_min, l_max = post_order(node.left)
            r_valid, r_min, r_max = post_order(node.right)

            # Check if subtrees are valid AND current node respects the ranges
            # node.val must be strictly greater than max of left subtree
            # node.val must be strictly less than min of right subtree
            if l_valid and r_valid and l_max < node.val < r_min:
                # If valid, pass up the new range (min of whole tree, max of whole tree)
                # min(l_min, node.val) handles the case where left is empty (l_min is inf)
                return True, min(l_min, node.val), max(r_max, node.val)

            return False, 0, 0

        return post_order(root)[0]


if __name__ == "__main__":
    root = build_tree([5, 4, 6, None, None, 3, 7])
    solution = Solution()
    print(solution.isValidBST(root))  # expected false
