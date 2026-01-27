"""
快速排序思想：
1. 选定枢轴量，
2. 分治：分区
3. 递归排序
4. 合并

实现思路：
1. 创建两个函数quick_sort, partition
2. partiton用于划分，quick_sort用于组织和排序
3. 排序逻辑：每次确定一个枢轴量，前半部分需要保证比轴小，后半部分要保证比轴大，由两个指针分别管理
4. 分区逻辑，确定
"""


def quick_sort(arr, left, right):
    if left < right:
        index = partition(arr, left, right)
        quick_sort(arr, left, index - 1)
        quick_sort(arr, index + 1, right)
    return arr


def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]


def partition(arr, left, right):
    # 选枢轴
    pivot = arr[left]
    # mark 指向实际上小于等于 pivot 的最后一个元素的位置
    mark = left
    # 这里的核心就是边界，
    for i in range(left + 1, right + 1):
        if arr[i] < pivot:
            mark += 1
            swap(arr, mark, i)

    # 将 pivot 放到最终位置 (所有小于它的元素都在它左边)
    swap(arr, left, mark)
    return mark


if __name__ == "__main__":
    test_arr = [3, 6, 8, 10, 1, 2, 1]
    print(f"Original: {test_arr}")
    quick_sort(test_arr, 0, len(test_arr) - 1)
    print(f"Sorted:   {test_arr}")
