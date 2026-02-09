#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
将华为OD题目列表按类型拆分成多个小表格，并按难度排序
"""

import re
from pathlib import Path
from collections import defaultdict

# 高频题和重点题标记（基于网络反馈和算法类型分析）
HIGH_FREQUENCY_KEYWORDS = {
    # 模拟类 - 字符串处理是高频考点
    "螺旋数字矩阵": "🔥 高频题，经典矩阵模拟",
    "贪吃蛇": "🔥 高频题，经典模拟",
    "字符串摘要": "⭐ 字符串处理重点",
    "字符串分割转换": "⭐ 字符串处理重点",
    "模拟消息队列": "⭐ 队列模拟重点",
    "字符串化繁为简": "⭐ 字符串处理重点",
    # 数据结构/排序 - LRU缓存等是高频
    "文件缓存系统": "🔥 高频题，类似LRU缓存",
    "优先队列": "🔥 高频考点",
    "热点网站统计": "⭐ 堆/优先队列重点",
    "打印文件": "⭐ 优先队列重点",
    "哈夫曼": "⭐ 贪心+堆经典题",
    # DFS/BFS - 岛屿问题是高频
    "查找单入口空闲区域": "🔥 高频题，DFS/BFS经典",
    "机器人活动区域": "🔥 高频题，类似岛屿问题",
    "矩阵扩散": "🔥 高频题，BFS经典",
    "宜居星球改造计划": "🔥 高频题，多源BFS",
    "机器人走迷宫": "🔥 高频题，BFS最短路",
    "亲子游戏": "⭐ DFS/BFS重点",
    "乘坐保密电梯": "⭐ BFS状态搜索",
    "周末爬山": "⭐ DFS/BFS+剪枝",
    # 滑动窗口 - 高频考点
    "滑动窗口最大值": "🔥 高频题，单调队列经典",
    "最小矩阵宽度": "🔥 高频题，滑动窗口",
    "完美走位": "⭐ 滑动窗口重点",
    "最左侧冗余覆盖子串": "⭐ 滑动窗口重点",
    "字符串计数匹配": "⭐ 滑动窗口重点",
    "补种未成活胡杨": "⭐ 滑动窗口重点",
    # 二分 - 常见考点
    "员工派遣": "🔥 高频题，二分答案",
    "最佳植树距离": "⭐ 二分答案经典",
    "组装最大可靠性设备": "⭐ 二分+贪心",
    # 动态规划 - 重点考点
    "两个字符串间的最短路径": "🔥 高频题，编辑距离变形",
    "通过软盘拷贝文件": "🔥 高频题，01背包",
    "书籍叠放": "⭐ LIS变形，DP重点",
    "构造数列": "⭐ DP状态设计",
    "不含101的数": "⭐ 数位DP",
    # 贪心 - 常见考点
    "执行任务赚积分": "🔥 高频题，贪心经典",
    "斗地主之顺子": "⭐ 贪心重点",
    "最长的顺子": "⭐ 贪心重点",
    "高矮个子排队": "⭐ 贪心排序",
    # 数学原理
    "分苹果": "🔥 高频题，异或性质",
    "构成正方形的数量": "⭐ 数学计算",
    # 并查集
    "精准核酸检测": "🔥 高频题，并查集经典",
    # 其他重要题目
    "二叉树的广度优先遍历": "🔥 高频题，树的遍历",
    "启动多任务排序": "🔥 高频题，拓扑排序",
    "识文断句": "⭐ 前缀树(Trie)",
    "二维伞的雨滴效应": "⭐ BST应用",
    "跳房子": "⭐ 记忆化搜索",
    "仿LISP运算": "⭐ 栈/递归解析",
}


def extract_problem_name(title):
    """从标题中提取题目名称"""
    match = re.search(r"-\s*([^(（]+)", title)
    if match:
        return match.group(1).strip()
    return title


def get_remark(title):
    """根据题目名称获取备注"""
    problem_name = extract_problem_name(title)
    for keyword, remark in HIGH_FREQUENCY_KEYWORDS.items():
        if keyword in problem_name:
            return remark
    return ""


def parse_table_row(line):
    """解析表格行"""
    parts = line.split("|")
    if len(parts) < 7:
        return None

    title = parts[1].strip()
    link = parts[2].strip()
    category = parts[3].strip()
    difficulty = parts[4].strip()
    note = parts[5].strip()

    # 获取备注
    remark = get_remark(title)

    return {
        "title": title,
        "link": link,
        "category": category,
        "difficulty": difficulty if difficulty else "999",  # 无难度的放最后
        "note": note,
        "remark": remark,
        "original_line": line,
    }


def sort_key(row):
    """排序键: 先按难度数字排序"""
    try:
        return int(row["difficulty"])
    except ValueError:
        return 999


def main():
    md_file = Path(__file__).parent.parent / "huawei_od_complete_list.md"

    # 读取文件
    with open(md_file, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # 解析所有行
    categories = defaultdict(list)

    for i, line in enumerate(lines):
        if i < 2:  # 跳过表头
            continue

        row = parse_table_row(line)
        if row and row["category"]:
            categories[row["category"]].append(row)

    # 按类别排序输出
    category_order = [
        "一、模拟",
        "二、数据结构/排序",
        "三、逻辑分析",
        "四、DFS/BFS",
        "五、双指针/滑动窗口",
        "六、二分",
        "七、动态规划",
        "八、贪心",
        "九、数学原理",
        "十、并查集",
        "十一、其它",
    ]

    # 生成新的 markdown 内容
    output = []
    output.append("# 华为OD机试题目列表\n\n")
    output.append("> 📌 按类型分类，每个类型内按难度升序排列\n")
    output.append("> \n")
    output.append("> 🔥 = 高频题目  ⭐ = 重点题目\n\n")
    output.append("---\n\n")

    # 统计信息
    total_count = sum(len(rows) for rows in categories.values())
    output.append(f"**总计: {total_count} 道题目**\n\n")

    # 目录
    output.append("## 📑 目录\n\n")
    for cat in category_order:
        if cat in categories:
            count = len(categories[cat])
            anchor = cat.replace("、", "").replace("/", "").replace(" ", "-").lower()
            output.append(f"- [{cat}](#{anchor}) ({count}题)\n")
    output.append("\n---\n\n")

    # 各类别表格
    for cat in category_order:
        if cat not in categories:
            continue

        rows = categories[cat]
        # 按难度排序
        rows.sort(key=sort_key)

        output.append(f"## {cat}\n\n")
        output.append(f"共 {len(rows)} 道题目\n\n")
        output.append("| 难度 | 标题 | 链接 | 备注 |\n")
        output.append("|:---:|---|---|---|\n")

        for row in rows:
            difficulty = row["difficulty"] if row["difficulty"] != "999" else "-"
            remark = row["remark"]
            output.append(
                f"| {difficulty} | {row['title']} | {row['link']} | {remark} |\n"
            )

        output.append("\n")

    # 写入文件
    with open(md_file, "w", encoding="utf-8") as f:
        f.writelines(output)

    print(f"完成! 共处理 {total_count} 道题目，分为 {len(categories)} 个类别")
    for cat in category_order:
        if cat in categories:
            print(f"  - {cat}: {len(categories[cat])} 题")


if __name__ == "__main__":
    main()
