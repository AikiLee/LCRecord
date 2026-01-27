from buildbtree import build_tree


def pre_order(root):
    if root is None:
        return
    print(root.val)
    left = pre_order(root.left)
    right = pre_order(root.right)
    return left or right or root


if __name__ == "__main__":
    root = build_tree([1, 2, 5, 3, 4, None, 6])
    pre_order(root)
