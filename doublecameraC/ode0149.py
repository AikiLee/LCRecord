import sys

N = int(sys.stdin.readline().strip())

# 1. 7位一组，存储补码
# 2. 最高位置1表示还有字节，为0则表示为最后一个字节
# 3. 小端排序
# 4. 结果按hex的字符串来处理


def get_bit_length(N: int):
    if not N:
        raise ValueError("input is not a number")
    return (N.bit_length() + 7) // 8


def int_to_little_endian_hex(value: int) -> str:
    # 结果列表
    res = []

    # 即便输入是0，也需要至少输出一个字节 '00'
    if value == 0:
        return "00"

    while value > 0:
        # 1. 取出最低的7位
        part = value & 0x7F
        # 2. 将原数值右移7位，准备处理下一组
        value >>= 7

        # 3. 如果右移后 value 还有剩余（不为0），说明当前不是最后一个字节
        #    需要将当前字节最高位置为 1 (0x80)
        if value > 0:
            part |= 0x80

        # 4. 转成 16 进制大写，并补足两位
        res.append(format(part, "02X"))

    # 注意：题目要求“小端排序”，即低位字节在前。
    # 我们这里的循环是从低向高取的，append进去的顺序正好就是小端序
    # 所以直接 join 即可
    return "".join(res)


ans = int_to_little_endian_hex(N)

print(ans)
