"""
https://hydro.ac/d/coder_gather/p/ode0048
运维日志排序[100分]
题目描述
[运维工程师]采集到某产品线网运行一天产生的日志n条，现需根据日志时间先后顺序对日志进行排序，日志时间格式为H:M:S.N。

H表示小时(0~23)
M表示分钟(0~59)
S表示秒(0~59)
N表示毫秒(0~999)
时间可能并没有补全，也就是说，01:01:01.001也可能表示为1:1:1.1。

输入描述
第一行输入一个整数n表示日志条数，1<=n<=100000，接下来n行输入n个时间。

输出描述
按时间升序排序之后的时间，如果有两个时间表示的时间相同，则保持输入顺序。

示例1
输入
2
01:41:8.9
1:1:09.211
输出
1:1:09.211
01:41:8.9
说明

示例2
输入
3
23:41:08.023
1:1:09.211
08:01:22.0
输出
1:1:09.211
08:01:22.0
23:41:08.023
说明
"""

import sys

N = int(sys.stdin.readline().strip())


def get_time_key(time_str):
    parts = list(map(int, time_str.replace(".", ":").split(":")))
    if len(parts) == 3:
        parts.append(0)
    return tuple(parts)


logs = [sys.stdin.readline().strip() for _ in range(N)]

logs.sort(key=get_time_key)

print("\n".join(logs))


# N = int(sys.stdin.readline().strip())
# if N > 1e5 or N < 1:
#     exit()

# dict = {}

# for _ in range(N):
#     origin_str = sys.stdin.readline().strip()
#     unified_str = origin_str.replace(".", ":")
#     parts = list(map(int, unified_str.split(":")))

#     if len(parts) == 3:
#         # add 0 if N not exist
#         parts.append(0)

#     dict.setdefault(tuple(parts), []).append(origin_str)

# for key in sorted(dict.keys()):
#     for log in dict[key]:
#         print(log)
