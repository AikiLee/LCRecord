import sys

# 1. 读取数组长度
line = sys.stdin.readline().strip()
if not line:
    raise Exception
n = int(line)

# 2. 读取数组元素
# 题目描述是"接下来n行，每行一个整数"，但也可能是一行空格分隔，为了稳健通常建议都兼容，
# 但根据题目描述，这里严格按行读取
data = []
for _ in range(n):
    data.append(int(sys.stdin.readline().strip()))

# 3. 构建前缀和数组 (长度 n + 1)
# 核心技巧：prefix[0] = 0
# prefix[i] 代表原数组前 i 个元素的和 (nums[0]...nums[i-1])
prefix = [0] * (n + 1)
for i in range(n):
    prefix[i + 1] = prefix[i] + data[i]

# 4. 循环处理查询直至 EOF
for line in sys.stdin:
    line = line.strip()
    if not line:
        break
    try:
        a, b = map(int, line.split())
        # 计算闭区间 [a, b] 的和
        # 公式：prefix[b + 1] - prefix[a]
        # 解释：(前 b+1 个数的和) - (前 a 个数的和) = 第 a+1 个到第 b+1 个数的和 = nums[a]...nums[b]
        print(prefix[b + 1] - prefix[a])
    except ValueError:
        continue
