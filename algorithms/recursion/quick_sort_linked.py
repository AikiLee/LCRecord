"""
对链表进行快速排序，基本思路：
1. 还是分成三个函数，quick_sort_linked,partitoin, swap
2. 因为是链表swap采用值交换；partition编写方式和数组类似，直接取开头为枢轴，传入参数有点变化，left和right分别对应指针，而不是下标了；quick_sort_linked(linklist, left, right)也是和数组差不多
"""

from typing import List
from ListNode import ListNode
import build_linklist


def quick_sort_linkedlist(left: ListNode, right: ListNode):
    # 边界情况，left == right == None，或只有一个
    if left == right or left.next == right:
        return left

    pivot_node = partition(left, right)

    # 递归左半部分，区间为 [left, pivot_node)，注意 pivot_node 是开区间边界
    quick_sort_linkedlist(left, pivot_node)

    # 递归右半部分，区间为 [pivot_node.next, right)
    quick_sort_linkedlist(pivot_node.next, right)

    return left


def partition(left: ListNode, right: ListNode):
    # 选择 left.val 作为 pivot
    pivot = left.val

    # mark 指向“小于 pivot”区域的最后一个节点
    # 初始只有 pivot 自己，所以 mark 指向 left
    mark = left

    # 也就是 [left+1, right) 这个区间遍历
    curr = left.next
    while curr != right:
        if curr.val < pivot:
            # 发现比 pivot 小的数，扩大小于区 (mark 前移)
            mark = mark.next
            # 将这个小数交换到小于区里
            swap(mark, curr)

        curr = curr.next

    # 最后把 pivot (即 left) 放到它正确的位置 (mark)
    swap(left, mark)

    # 返回 pivot 最终所在的节点
    return mark


def swap(a: ListNode, b: ListNode):
    # a,b分别代表需要交换的位置
    a.val, b.val = b.val, a.val


if __name__ == "__main__":

    list1 = [7, 3, 5, 1, 9, 2]
    # list1 = [3, 2, 1]
    head = build_linklist.build_linklist(list1)

    # right 传入 None，表示链表末尾的开区间
    quick_sort_linkedlist(head, None)

    # 打印结果
    print([x for x in head])
