import sys

# 选手编号：1 - N， 评委 3-10；分数 1-10；
# target:统计得分最多的三位选手，得分相同则看高分值；结果按降序输出选手序号

line1 = sys.stdin.readline().strip().split(",")
M = int(line1[0])
N = int(line1[1])
scores = []

if N < 3 or M < 3 or M > 10:
    print(-1)
    exit()

for i in range(M):
    lines = sys.stdin.readline().strip().split(",")

    try:
        scores.append(list(map(int, lines)))
    except ValueError:
        raise ValueError("列表中存在无法转换为整数的元素")

    # 开一个dict，存储总分，通过排序生成前三个分


d1 = dict()
user_score = []
for i in range(N):
    tmp = []
    for j in range(M):
        if scores[j][i] < 1 or scores[j][i] > 10:
            print(-1)
            exit()
        else:
            tmp.append(scores[j][i])
    d1[i] = sum(tmp)
    user_score.append(tmp)
    # 一定要熟练掌握多维排序
sorted_ids = sorted(
    range(N),
    key=lambda idx: (d1[idx], sorted(user_score[idx], reverse=True)),
    reverse=True,
)
# 如果需要输出前三名的选手编号（题目通常要求1-based编号）
result = [str(i + 1) for i in sorted_ids[:3]]
print(",".join(result))
