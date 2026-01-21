def hanming_distance(s1: str, s2: str) -> int:
    if not s1 or not s2:
        raise ValueError("有一个字符串不存在")
    if len(s1) != len(s2):
        raise ValueError("两个字符串长度不同")
    ord_distance = 0
    for i, j in zip(s1, s2):
        if i != j:
            ord_distance += 1
    return ord_distance


if __name__ == "__main__":
    print(hanming_distance("haha", "buai"))
