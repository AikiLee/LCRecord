import sys

# 选或不选的问题
# todo: 待提交
N = int(sys.stdin.readline().strip())
if N < 0 or N > 1000:
    print(-1)
    exit()
u_input = []
for i in range(N):
    tmp = int(sys.stdin.readline().strip())
    if tmp < 0:
        print(-1)
        exit()
    u_input.append(tmp)

# 0/1 背包问题 - 动态规划解法
# 背包容量：软盘总块数 (1474560 / 512 = 2880)
# 物品重量：文件占用的块数
# 物品价值：文件的实际字节大小

# 软盘总容量及块大小
TOTAL_CAPACITY = 1474560
BLOCK_SIZE = 512
MAX_BLOCKS = TOTAL_CAPACITY // BLOCK_SIZE  # 2880

# dp[j] 表示使用了 j 个块所能存储的最大文件实际大小
# 初始化为 0
dp = [0] * (MAX_BLOCKS + 1)

# 处理每个文件
# 0/1 背包需要倒序遍历容量，防止同一个物品被多次使用
for size in u_input:
    # 计算该文件占用的块数: ceil(size / 512)
    # 整数向上取整技巧: (size + 512 - 1) // 512
    cost = (size + BLOCK_SIZE - 1) // BLOCK_SIZE

    # 如果单个文件超过软盘总容量，直接跳过
    if cost > MAX_BLOCKS:
        continue

    # 倒序刷新 DP 表
    for j in range(MAX_BLOCKS, cost - 1, -1):
        dp[j] = max(dp[j], dp[j - cost] + size)

# 输出最大价值
print(max(dp))
