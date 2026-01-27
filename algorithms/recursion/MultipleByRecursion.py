# 本质就是移位和加法
def peasant_multiply(x, y):
    if x == 0:
        return 0
    else:
        x1 = x // 2
        y1 = y + y
        prod = peasant_multiply(x1, y1)
        if x % 2 == 1:
            prod = prod + y
        return prod


if __name__ == "__main__":
    print(peasant_multiply(3, 5))
