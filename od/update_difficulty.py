#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
根据 difficulty_cache.json 中的难度信息更新 huawei_od_complete_list.md 中的难度列
"""

import json
import re
from pathlib import Path


def main():
    # 文件路径
    cache_file = Path(__file__).parent / "difficulty_cache.json"
    md_file = Path(__file__).parent.parent / "huawei_od_complete_list.md"

    # 读取难度缓存
    with open(cache_file, "r", encoding="utf-8") as f:
        difficulty_cache = json.load(f)

    print(f"已加载 {len(difficulty_cache)} 个难度记录")

    # 读取 markdown 文件
    with open(md_file, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # 正则表达式匹配 hydro.ac 链接中的问题 ID
    # 匹配形如 https://hydro.ac/d/coder_gather/p/oda0124 的链接
    hydro_pattern = re.compile(r"https://hydro\.ac/d/coder_gather/p/(od[a-z]?\d+)")

    updated_count = 0
    updated_lines = []

    for i, line in enumerate(lines):
        # 跳过表头行
        if i < 2:
            updated_lines.append(line)
            continue

        # 查找该行中的 hydro 链接
        match = hydro_pattern.search(line)
        if match:
            problem_id = match.group(1)

            # 查找难度
            if problem_id in difficulty_cache:
                difficulty = difficulty_cache[problem_id]

                # 解析表格行并更新难度
                # 表格格式: |标题|链接|分类|难度|说明|备注|
                parts = line.split("|")

                if len(parts) >= 5:
                    old_difficulty = parts[4].strip()
                    parts[4] = f" {difficulty} "

                    new_line = "|".join(parts)
                    updated_lines.append(new_line)

                    if old_difficulty != difficulty:
                        updated_count += 1
                        print(
                            f"行 {i+1}: {problem_id} 难度 '{old_difficulty}' -> '{difficulty}'"
                        )
                else:
                    updated_lines.append(line)
            else:
                # 没有找到对应的难度信息
                print(f"行 {i+1}: 未找到 {problem_id} 的难度信息")
                updated_lines.append(line)
        else:
            # 没有 hydro 链接的行保持不变
            updated_lines.append(line)

    # 写回文件
    with open(md_file, "w", encoding="utf-8") as f:
        f.writelines(updated_lines)

    print(f"\n完成! 共更新了 {updated_count} 个难度值")


if __name__ == "__main__":
    main()
