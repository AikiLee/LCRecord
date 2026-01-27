def non_ad_items_exchange(s: str, k: int, t: int):
    arr = list(s)
    n = len(arr)

    def string_reverse(start: int, end: int):
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1

    string_reverse(0, k - 1)
    string_reverse(k, t - 1)
    string_reverse(t, n - 1)
    string_reverse(0, n - 1)
    return "".join(arr)


if __name__ == "__main__":
    print(non_ad_items_exchange("abc", 1, 2))
