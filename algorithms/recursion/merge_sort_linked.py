"""
对链表进行归并排序，实现思路：
1. 基本操作和数组类似，因为没怎么用到数组的特性。先递归将数组拆分，然后归生成结果。这里还有一个问题，怎么样快速确定中点，断开链表
2. 具体的使用Merge_sort, merge, find_mid 3个函数:
    - merge_sort(listnode):负责分的
    - merge(listnode1,listnode2):负责排序和返回新数组的
    - find_mid(listnode):负责找链表的中间节点
"""

from build_linklist import build_linklist
from ListNode import ListNode


def merge_sort(head: ListNode):
    # use find_mid() to locate the middle pos, then recusively call self
    if head is None:
        return
    if head and head.next is None:
        return head

    mid = find_mid(head)
    left = merge_sort(head)
    right = merge_sort(mid)
    return merge(left, right)


def merge(list1: ListNode, list2: ListNode) -> ListNode:
    # return a new linked list.
    dummy = ListNode(-1)
    cur = dummy
    while list1 and list2:
        if list1.val > list2.val:
            cur.next = list2
            list2 = list2.next
        else:
            cur.next = list1
            list1 = list1.next
        cur = cur.next

    # handle remaining list
    cur.next = list1 if list1 else list2
    return dummy.next


def find_mid(head: ListNode):
    # use fast-slow pointer to find the mid
    # except find, we need cut the linked list in the middle, before slow
    slow = fast = head
    pre = None
    while fast and fast.next:
        pre = slow
        slow = slow.next
        fast = fast.next.next
    # after the loop, cut the link
    pre.next = None
    return slow


if __name__ == "__main__":
    # head = build_linklist([7, 3, 5, 2])
    head = build_linklist([7, 3, 5, 2, 9])
    asc_linkedlist = merge_sort(head)
    print([x for x in asc_linkedlist])
