from buildbtree import build_tree


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return root
        # cause we can get left and right tree in the same time, so we can exchange them
        queue = [root]
        while len(queue) > 0:
            node = queue.pop(0)
            # if node.left is None and node.right is None:
            #     return
            # regularly read then exchange node's left and right child
            if node.left:
                queue.append(node.left)

            if node.right:
                queue.append(node.right)
            tmp = node.left
            node.left = node.right
            node.right = tmp
            # after read left and right tree, then exchange two node

        return root


if __name__ == "__main__":
    root = build_tree([4, 2, 7, 1, 3, 6, 9])
    solution = Solution()
    print(solution.invertTree(root))
