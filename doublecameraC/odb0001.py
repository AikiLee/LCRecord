import sys


# 读取输入
line1 = list(map(int, sys.stdin.readline().strip().split()))
if not line1:
    exit()
m = line1[0]
n = line1[1]

# 读取作业时长并检查异常输入
line2 = sys.stdin.readline().strip().split()
if not line2:
    print(0)
    exit()
numbers = list(map(int, line2))

if m <= 0 or m > 100 or n <= 0 or n > 100:
    print(-1)
    exit()

# 1. 核心规则：总是优先执行处理时间最短的作业 -> 必须先排序
# 即使是n < m，由于我们取了min，逻辑也是通的：并行处理，最慢的那个决定总时间。
sorted_arr = sorted(numbers)
cnt = 0

# i 是窗口左边界（当前最小任务），j 是窗口右边界（当前并行处理的最后一个任务）
i = 0
# 【修正点】当 n < m 时，我们只能开启 n 条流水线，所以右边界不能超过 n-1
j = min(n - 1, m - 1)

while i <= j:
    # 当前窗口中，最早完成的任务耗时
    # 因为我们每次都减去了消耗的时间，且总是从左往右处理，
    # 所以 sorted_arr[i] 一定是当前窗口里剩余时间最少的
    least = sorted_arr[i]

    # 累加流逝的时间
    cnt += least

    # 模拟时间流逝：当前窗口内的所有任务都减去 least
    for k in range(i, j + 1):
        sorted_arr[k] -= least

    # 任务 i 完成，左边界右移
    i += 1

    # 如果还有等待的作业，右边界右移（补充新任务进流水线）
    if j + 1 < n:
        j += 1

print(cnt)
