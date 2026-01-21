"""
题目描述
A、B两个人把苹果分为两堆，A希望按照他的计算规则等分苹果，他的计算规则是按照二进制加法计算，并且不计算进位
12+5=9（1100 + 0101 = 9），B的计算规则是十进制加法，包括正常进位，B希望在满足A的情况下获取苹果重量最多。

输入苹果的数量和每个苹果重量，输出满足A的情况下B获取的苹果总重量。

如果无法满足A的要求，输出-1。

数据范围

1 <= 总苹果数量 <= 20000
1 <= 每个苹果重量 <= 10000
输入描述
输入第一行是苹果数量：3

输入第二行是每个苹果重量：3 5 6

输出描述
输出第一行是B获取的苹果总重量：11

示例1
输入
3
3 5 6
输出
11
"""

import sys

# handle input
line = sys.stdin.readline().strip()
if not line:
    exit()

n = int(line)
line2 = sys.stdin.readline().strip()
apples = list(map(int, line2.split()))

# 这里主要是理解二进制不进位加法就是xor运算。要求两堆异或和为0，即
total_xor = 0
for apple in apples:
    total_xor ^= apple

# 具体的操作就是：当xor结果为0时，那么B拿走除最小苹果之外的所有苹果；不为0时，
if total_xor != 0:
    print(-1)
else:
    print(sum(apples) - min(apples))
