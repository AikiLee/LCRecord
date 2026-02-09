class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __iter__(self):
        node = self
        while node:
            yield (node.val, node)
            node = node.next
