# this is a all sequence
def trace(s: str):
    n = len(s)
    res = []

    # find all combinations in a len4 str
    def dfs(i: int, path: list[str]):
        if i >= n:
            return
        if len(path) == 4:
            # join the path together
            res.append("".join(path))
        for k in range(0, n):
            if s[k] not in path:
                dfs(k, [*path, s[k]])

    # notice traceback is a python library name, so you avoid to use it as a file name.
    dfs(0, [])
    return res


def flip_hand_method(s: str, k: int):
    # now use three filp hand method to solve this problem
    n = len(s)
    arr = list(s)
    arr.sort()
    k %= n

    def string_rotate(start: int, end: int):
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1

    string_rotate(0, k - 1)
    string_rotate(k, n - 1)
    string_rotate(0, n - 1)
    return "".join(arr)


def all_case(s: str):
    n = len(s)
    res = []
    for i in range(n):
        res.append(flip_hand_method(s, i))
    return res


if __name__ == "__main__":
    # print(trace("tops"))
    print(all_case("tops"))
