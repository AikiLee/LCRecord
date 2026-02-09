import sys

# 不是贪心，往往这种就十分容易迷失在局部最优，而忽略了全局最优解，本题需要绕一个弯子，我们拿的最好，就需要保证剩下的最小；最后就需要我们维护一个总和最小的窗口就可以了

length = int(sys.stdin.readline().strip())
numbers = list(map(int, sys.stdin.readline().strip().split()))
N = int(sys.stdin.readline().strip())

if length > 1e5 + 1 or length < 1 or N < 1 or N > length:
    print(-1)
    exit()


for i in range(length):
    cur = numbers[i]
    if cur < 1 or cur > 100:
        print(-1)
        exit()

# 贪心是错误的，局部最优不代表全局最优
# 正解：反向思考。拿走N个，相当于留下 length - N 个连续的数。
# 只要让留下的这串连续数字之和最小，那么拿走的也就最大。

total_sum = sum(numbers)
window_len = length - N

# 如果全拿走，或者长度不够中间剩下的
if window_len == 0:
    print(total_sum)
    sys.exit()

# 计算初始窗口的和 (前 length - N 个)
current_window_sum = sum(numbers[:window_len])
min_window_sum = current_window_sum

# 开始滑动
# 窗口范围从 [0, window_len-1] 滑动到 [length - window_len - 1, length - 1]
for i in range(window_len, length):
    # 加上新进来的 numbers[i]，减去出去的 numbers[i - window_len]
    current_window_sum += numbers[i]
    current_window_sum -= numbers[i - window_len]
    min_window_sum = min(min_window_sum, current_window_sum)

print(total_sum - min_window_sum)
