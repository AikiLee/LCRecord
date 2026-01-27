"""
分治思想的简单应用，我们来回顾通用模式：
1. 将给定的问题分成若干完全相同且相互独立的实力
2. 将每个问题委托给递归处理
3. 将较小实例的解组合成为最终结果

"""


def merge_sort(arr):
    if arr is None:
        return
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])

    return merge(left_half, right_half)


# merge two array, input is their arr, and return sorted_arr
def merge(left, right):
    sorted_arr = []
    i, j = 0, 0
    while i < len(left) and j < len(right):

        if left[i] < right[i]:
            sorted_arr.append(left[i])
            i += 1
        else:
            sorted_arr.append(right[j])
            j += 1
    sorted_arr.extend(left[i:])
    sorted_arr.extend(right[j:])
    return sorted_arr


if __name__ == "__main__":
    print(merge_sort([5, 3, 4, 2, 1]))
