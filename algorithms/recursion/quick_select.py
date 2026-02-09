def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]


def partition(arr, left, right):
    # 选枢轴 (这里简单选取最左边，也可以随机选取优化)
    pivot = arr[left]
    # mark 指向实际上小于等于 pivot 的最后一个元素的位置
    mark = left

    for i in range(left + 1, right + 1):
        if arr[i] < pivot:
            mark += 1
            swap(arr, mark, i)

    # 将 pivot 放到最终位置
    swap(arr, left, mark)
    return mark


def quick_select(arr, left, right, k):
    """
    寻找数组中第 k 小的元素 (1-based index)
    即排序后索引为 k-1 的元素
    """
    if left == right:
        return arr[left]

    pivot_index = partition(arr, left, right)

    # 目标索引
    target_index = k - 1

    if pivot_index == target_index:
        return arr[pivot_index]
    elif pivot_index > target_index:
        # 目标在左边
        return quick_select(arr, left, pivot_index - 1, k)
    else:
        # 目标在右边
        return quick_select(arr, pivot_index + 1, right, k)


if __name__ == "__main__":
    test_arr = [3, 6, 8, 10, 1, 2, 1]
    # 排序后应为: [1, 1, 2, 3, 6, 8, 10]

    k = 4
    result = quick_select(test_arr, 0, len(test_arr) - 1, k)
    print(f"Original: {test_arr} (Note: partially modified by partition)")
    print(f"The {k}-th smallest element is: {result}")
