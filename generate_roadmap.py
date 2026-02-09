import re
import random

# 读取原始文件
with open("huawei_od_checklist.md", "r", encoding="utf-8") as f:
    content = f.read()

# 解析题目
problems = []
current_category = ""
current_difficulty = ""

lines = content.split("\n")
for line in lines:
    line = line.strip()
    if line.startswith("## "):
        current_category = line[3:].strip()
    elif line.startswith("**难度"):
        # 提取难度数字
        current_difficulty = line.replace("**难度", "").replace("**", "").strip()
    elif line.startswith("- [ ]") or line.startswith("- [x]"):
        # 如果是难度9，直接跳过
        if current_difficulty == "9":
            continue

        # 难度标准化
        diff_val = 6
        if current_difficulty != "-":
            try:
                diff_val = int(current_difficulty)
            except:
                diff_val = 6

        problems.append(
            {
                "category": current_category,
                "difficulty_str": current_difficulty,
                "difficulty_val": diff_val,
                "content": line,
            }
        )

# 分组
group_low = [p for p in problems if p["difficulty_val"] <= 6]
group_mid = [p for p in problems if p["difficulty_val"] == 7]
group_high = [p for p in problems if p["difficulty_val"] >= 8]


# 每日分配算法
def distribute_days(problem_pool, days):
    daily_plan = [[] for _ in range(days)]
    cat_map = {}
    for p in problem_pool:
        cat = p["category"]
        if cat not in cat_map:
            cat_map[cat] = []
        cat_map[cat].append(p)

    categories = list(cat_map.keys())

    mixed_pool = []
    # 轮询混合
    while any(cat_map.values()):
        for cat in categories:
            if cat_map[cat]:
                mixed_pool.append(cat_map[cat].pop(0))

    for i, problem in enumerate(mixed_pool):
        day_idx = i % days
        daily_plan[day_idx].append(problem)

    return daily_plan


# 分配计划
phase1 = distribute_days(group_low, 6)
phase2 = distribute_days(group_mid, 6)
phase3 = distribute_days(group_high, 6)

output = []
output.append("# 🚀 华为OD机试 18天冲刺 Roadmap")
output.append("")
output.append("> 📅 计划周期：18天")
output.append(f"> 🎯 目标：{len(problems)}题 (已剔除难度9)")
output.append("> 💡 策略：难度递增，每日混合题型")
output.append("")
output.append("---")
output.append("")

day_counter = 1


def print_phase(phase_plan, phase_name, diff_range):
    global day_counter
    output.append(f"## {phase_name} (难度 {diff_range})")
    output.append("")
    for day_tasks in phase_plan:
        output.append(f"### 第 {day_counter} 天 ({len(day_tasks)} 题)")
        for task in day_tasks:
            line = task["content"]
            match = re.search(r"\[(.*?)\]\((.*?)\)(.*)", line)

            # 使用正确的 category 引用
            category_str = f"**[{task['category']}]**"

            if match:
                title = (
                    match.group(1)
                    .replace("华为OD机试双机位C卷 - ", "")
                    .replace("华为OD机考双机位C卷 - ", "")
                )
                # 获取原有的复选框状态
                checkbox = "- [ ]"
                if "- [x]" in line:
                    checkbox = "- [x]"

                rest = match.group(3)
                remark = ""
                if "|" in rest:
                    parts = rest.split("|")
                    last_part = parts[-1].strip()
                    if (
                        "🔥" in last_part
                        or "⭐" in last_part
                        or "重点" in last_part
                        or "经典" in last_part
                    ):
                        remark = f" {last_part}"

                output.append(f"{checkbox} {category_str} {title}{remark}")
            else:
                output.append(
                    f'- [ ] {category_str} {line.replace("- [ ] ", "").replace("- [x] ", "")}'
                )

        output.append("")
        day_counter += 1


print_phase(phase1, "第一阶段：基础巩固", "4-6")
print_phase(phase2, "第二阶段：能力提升", "7")
print_phase(phase3, "第三阶段：高阶冲刺", "8")

print(f"Total problems scheduled: {len(problems)}")

with open("huawei_od_roadmap.md", "w", encoding="utf-8") as f:
    f.write("\n".join(output))
