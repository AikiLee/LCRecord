from typing import List
from ListNode import ListNode


def build_linklist(arr: List[int]):
    if arr is None:
        return
    if len(arr) == 1:
        return ListNode(arr[0])
    head = ListNode(arr.pop(0))
    head.next = None
    pre = head
    while len(arr) > 0:
        value = arr.pop(0)
        node = ListNode(value)
        node.next = None
        pre.next = node
        pre = node

    return head
