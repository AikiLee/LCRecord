def decimal_to_binary_iterator(n: int, zfill=8) -> str:
    # use //2 or >>; max is 2^(zfill - 1)
    if n == 0:
        return "0"
    if n > 2 ** (zfill - 1) or n < -(2 ** (zfill - 1)):
        raise ValueError("数值超过给定范围")
    binary_chars = ["0"] * 8
    abs_n = abs(n)
    cnt = zfill - 1
    while abs_n > 0:
        # 提取最低位, 因为按位进行运算的，和最低位对其进行与运算
        remainder = abs_n & 1
        binary_chars[cnt] = str(remainder)
        # 右移
        abs_n >>= 1
        cnt -= 1
    binary_chars[0] = "0" if n > 0 else "1"
    return "".join(binary_chars)


def get_anti_code(l: list[str], zfill=8) -> list[str]:
    """
    对二进制列表进行**全位取反**（包括符号位）。
    所有位 x -> ~x
    """
    # 1. 转换为整数
    val_str = "".join(l)
    val = int(val_str, 2)

    # 2. 构造全位掩码 (All-Ones Mask)
    # 对于 8 位，掩码应该是 11111111 (255)
    # 计算公式：(1 << zfill) - 1
    mask = (1 << zfill) - 1

    # 3. 进行异或 (XOR)
    # 0 ^ 1 = 1
    # 1 ^ 1 = 0
    # 每一位都翻转
    anti_val = val ^ mask

    # 4. 转回二进制字符串列表
    binary_str = f"{anti_val:0{zfill}b}"

    return list(binary_str)


def source_code_to_complement_code(n: int, zfill: int = 8) -> str:
    if n >= 0:
        return decimal_to_binary_iterator(n)
    abs_n = abs(n)
    abs_source_code = decimal_to_binary_iterator(abs_n)
    to_binary_arr = [x for x in abs_source_code]
    # 取反

    to_binary_arr = get_anti_code(to_binary_arr)

    # 加一
    for i in range(len(to_binary_arr) - 1, -1, -1):
        if to_binary_arr[i] == "0":
            to_binary_arr[i] = "1"
            break
        else:
            to_binary_arr[i] = "0"

    return "".join(to_binary_arr)


def decimal_to_binary_recursive(n: int) -> str:
    pass


if __name__ == "__main__":
    # print(decimal_to_binary_iterator(-5))
    print(source_code_to_complement_code(-5))
