"""
华为OD题目爬虫脚本
从 hydro.ac 网站爬取题目信息，并更新到 huawei_od_complete_list.md 文件中

使用方法:
    python hydro_scraper.py

注意: 需要有效的登录Cookie才能访问题目列表
"""

import re
import time
import json
from pathlib import Path
from difflib import SequenceMatcher

# 尝试导入 requests，如果没有则使用 urllib
try:
    import requests

    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False
    import urllib.request
    import ssl

# 尝试导入 BeautifulSoup
try:
    from bs4 import BeautifulSoup

    HAS_BS4 = True
except ImportError:
    HAS_BS4 = False


# 配置
HYDRO_BASE_URL = "https://hydro.ac"
HYDRO_PROBLEM_LIST_URL = "https://hydro.ac/d/coder_gather/p"
COOKIES = "loggedin=83845; sid=UJfvfiD4tTMEvxjo3jSXUSq10MnEVVnm; sid.sig=Gy7ZD-a1DUc_DZaPNvOdh0QSiO8; test=7277379601173056; v=d8906a67077d130aa9d51f72cf97df54"

# 文件路径
SCRIPT_DIR = Path(__file__).parent
MD_FILE_PATH = SCRIPT_DIR.parent / "huawei_od_complete_list.md"
CACHE_FILE_PATH = SCRIPT_DIR / "hydro_cache.json"

# HTTP Headers
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Cookie": COOKIES,
}


def fetch_page_with_requests(url: str) -> str | None:
    """使用 requests 库获取页面内容"""
    if not HAS_REQUESTS:
        return None

    try:
        session = requests.Session()
        # 设置 cookies
        for cookie in COOKIES.split("; "):
            key, value = cookie.split("=", 1)
            session.cookies.set(key, value, domain="hydro.ac")

        response = session.get(url, headers=HEADERS, timeout=30, verify=True)
        response.raise_for_status()
        return response.text
    except Exception as e:
        print(f"requests 获取失败: {e}")
        return None


def fetch_page_with_urllib(url: str) -> str | None:
    """使用 urllib 获取页面内容（备选方案）"""
    try:
        # 创建 SSL 上下文，忽略证书验证
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE

        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, context=context, timeout=30) as response:
            return response.read().decode("utf-8")
    except Exception as e:
        print(f"urllib 获取失败: {e}")
        return None


def fetch_page(url: str) -> str | None:
    """获取页面内容，优先使用 requests"""
    print(f"正在获取: {url}")

    # 首先尝试 requests
    if HAS_REQUESTS:
        html = fetch_page_with_requests(url)
        if html:
            return html

    # 备选：使用 urllib
    html = fetch_page_with_urllib(url)
    if html:
        return html

    print(f"无法获取页面: {url}")
    return None


def parse_problem_list(html: str) -> list[dict]:
    """解析题目列表页面，提取题目信息"""
    problems = []

    if HAS_BS4:
        soup = BeautifulSoup(html, "html.parser")

        # 查找题目表格或列表
        # hydro.ac 的题目列表通常在 table 或特定的 div 中
        table = soup.find("table")
        if table:
            rows = table.find_all("tr")
            for row in rows[1:]:  # 跳过表头
                cols = row.find_all("td")
                if len(cols) >= 2:
                    # 尝试提取题目信息
                    title_col = cols[1] if len(cols) > 1 else cols[0]
                    link = title_col.find("a")
                    if link:
                        title = link.get_text(strip=True)
                        href = link.get("href", "")

                        # 提取难度（如果有）
                        difficulty = ""
                        for col in cols:
                            text = col.get_text(strip=True)
                            if "简单" in text or "中等" in text or "困难" in text:
                                difficulty = text
                                break
                            # 也尝试匹配星级或数字难度
                            if re.match(r"^\d+$", text) and 1 <= int(text) <= 10:
                                difficulty = text

                        problems.append(
                            {
                                "title": title,
                                "url": (
                                    HYDRO_BASE_URL + href
                                    if href.startswith("/")
                                    else href
                                ),
                                "difficulty": difficulty,
                            }
                        )

        # 如果没有找到表格，尝试查找其他结构
        if not problems:
            # 查找所有链接，筛选题目链接
            links = soup.find_all("a", href=re.compile(r"/d/coder_gather/p/"))
            for link in links:
                title = link.get_text(strip=True)
                href = link.get("href", "")
                if title and href:
                    problems.append(
                        {
                            "title": title,
                            "url": (
                                HYDRO_BASE_URL + href if href.startswith("/") else href
                            ),
                            "difficulty": "",
                        }
                    )
    else:
        # 使用正则表达式解析
        # 查找题目链接模式: /d/coder_gather/p/xxx
        # 链接内可能包含 <b> 标签，格式如: <a href="..."><b>id</b>&nbsp;&nbsp;标题</a>
        pattern = r'<a[^>]*href="(/d/coder_gather/p/[^"]+)"[^>]*>(.*?)</a>'
        matches = re.findall(pattern, html, re.DOTALL)
        for href, raw_title in matches:
            # 移除 HTML 标签
            title = re.sub(r"<[^>]+>", "", raw_title)
            # 移除 HTML 实体 &nbsp;
            title = title.replace("&nbsp;", " ")
            # 移除题目ID前缀（如 oda0001）
            title = re.sub(r"^od[ab]?\d+\s*", "", title)
            # 清理空白
            title = " ".join(title.split()).strip()
            if title:
                problems.append(
                    {
                        "title": title,
                        "url": HYDRO_BASE_URL + href,
                        "difficulty": "",
                    }
                )

    return problems


def extract_title_keywords(full_title: str) -> str:
    """从完整标题中提取关键词用于匹配"""
    # 移除前缀如 "华为OD机试双机位C卷 - "
    title = re.sub(r"华为OD[机考试双位C卷\s\-]+", "", full_title)
    # 移除分数信息如 "(100分)"
    title = re.sub(r"\s*\(\d+分\)\s*", "", title)
    # 移除 markdown 链接语法
    title = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", title)
    return title.strip()


def calculate_similarity(s1: str, s2: str) -> float:
    """计算两个字符串的相似度"""
    return SequenceMatcher(None, s1.lower(), s2.lower()).ratio()


def match_problems(md_titles: list[str], hydro_problems: list[dict]) -> dict[str, dict]:
    """将 MD 文件中的题目与 hydro 题目进行匹配"""
    matches = {}

    for md_title in md_titles:
        keywords = extract_title_keywords(md_title)
        best_match = None
        best_score = 0

        for problem in hydro_problems:
            hydro_keywords = extract_title_keywords(problem["title"])
            score = calculate_similarity(keywords, hydro_keywords)

            # 如果关键词完全包含，给予额外分数
            if keywords in hydro_keywords or hydro_keywords in keywords:
                score = max(score, 0.8)

            if score > best_score and score > 0.5:  # 阈值 0.5
                best_score = score
                best_match = problem

        if best_match:
            matches[md_title] = {
                "url": best_match["url"],
                "difficulty": best_match["difficulty"],
                "score": best_score,
            }

    return matches


def read_md_file(filepath: Path) -> list[str]:
    """读取 MD 文件内容"""
    with open(filepath, "r", encoding="utf-8") as f:
        return f.readlines()


def write_md_file(filepath: Path, lines: list[str]):
    """写入 MD 文件内容"""
    with open(filepath, "w", encoding="utf-8") as f:
        f.writelines(lines)


def update_md_with_matches(lines: list[str], matches: dict[str, dict]) -> list[str]:
    """更新 MD 文件，填充匹配到的链接和难度"""
    updated_lines = []

    for line in lines:
        if line.startswith("|") and "[" in line:
            # 这是一个题目行
            # 格式: | [标题](url) | | 分类 | | | |
            parts = line.split("|")
            if len(parts) >= 7:
                title_cell = parts[1].strip()

                # 检查是否匹配
                for md_title, match_info in matches.items():
                    if (
                        md_title in title_cell
                        or extract_title_keywords(md_title) in title_cell
                    ):
                        # 填充链接列
                        if not parts[2].strip():
                            parts[2] = f" [hydro]({match_info['url']}) "

                        # 填充难度列
                        if not parts[4].strip() and match_info.get("difficulty"):
                            parts[4] = f" {match_info['difficulty']} "

                        break

                line = "|".join(parts)

        updated_lines.append(line)

    return updated_lines


def load_cache() -> list[dict]:
    """加载缓存的题目数据"""
    if CACHE_FILE_PATH.exists():
        try:
            with open(CACHE_FILE_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                print(f"从缓存加载了 {len(data)} 道题目")
                return data
        except Exception as e:
            print(f"加载缓存失败: {e}")
    return []


def save_cache(problems: list[dict]):
    """保存题目数据到缓存"""
    try:
        with open(CACHE_FILE_PATH, "w", encoding="utf-8") as f:
            json.dump(problems, f, ensure_ascii=False, indent=2)
        print(f"已保存 {len(problems)} 道题目到缓存")
    except Exception as e:
        print(f"保存缓存失败: {e}")


def fetch_all_problems() -> list[dict]:
    """获取所有题目（支持分页）"""
    all_problems = []
    page = 1

    while True:
        url = f"{HYDRO_PROBLEM_LIST_URL}?page={page}&q=&sort=default"
        html = fetch_page(url)

        if not html:
            print(f"获取第 {page} 页失败，停止爬取")
            break

        # 检查是否被重定向到登录页
        if "login" in html.lower() and "redirect" in html.lower():
            print("Cookie 已过期，请更新 Cookie")
            break

        problems = parse_problem_list(html)

        if not problems:
            print(f"第 {page} 页没有找到题目，停止爬取")
            break

        all_problems.extend(problems)
        print(f"第 {page} 页: 获取了 {len(problems)} 道题目")

        # 检查是否还有下一页
        if "下一页" not in html and "next" not in html.lower():
            break

        page += 1
        time.sleep(1)  # 礼貌性延迟

    return all_problems


def main():
    print("=" * 50)
    print("华为OD题目爬虫脚本")
    print("=" * 50)

    # 检查依赖
    print(f"\n依赖检查:")
    print(f"  - requests: {'[OK]' if HAS_REQUESTS else '[X] (将使用 urllib)'}")
    print(f"  - BeautifulSoup: {'[OK]' if HAS_BS4 else '[X] (将使用正则)'}")

    # 检查 MD 文件是否存在
    if not MD_FILE_PATH.exists():
        print(f"\n错误: 找不到 MD 文件: {MD_FILE_PATH}")
        return

    print(f"\nMD 文件: {MD_FILE_PATH}")

    # 尝试从缓存加载
    problems = load_cache()

    # 如果缓存为空，则爬取
    if not problems:
        print("\n开始爬取 hydro.ac 题目列表...")
        problems = fetch_all_problems()

        if problems:
            save_cache(problems)
        else:
            print("\n无法获取题目列表。可能的原因:")
            print("  1. Cookie 已过期")
            print("  2. 网络连接问题")
            print("  3. SSL/TLS 问题")
            print("\n请尝试:")
            print("  1. 在浏览器中登录 hydro.ac 并更新 Cookie")
            print("  2. 检查网络连接")
            print("  3. 安装 requests 库: pip install requests")
            print("\n或者使用手动模式:")
            print("  1. 在浏览器中打开 https://hydro.ac/d/coder_gather/p")
            print("  2. 按 F12 打开开发者工具")
            print("  3. 在 Console 中运行以下代码获取题目数据:")
            print(
                """
    // 在浏览器控制台运行此代码
    const problems = [];
    document.querySelectorAll('tr').forEach(row => {
        const link = row.querySelector('a[href*="/d/coder_gather/p/"]');
        if (link) {
            const cols = row.querySelectorAll('td');
            problems.push({
                title: link.textContent.trim(),
                url: link.href,
                difficulty: cols.length > 2 ? cols[2].textContent.trim() : ''
            });
        }
    });
    console.log(JSON.stringify(problems, null, 2));
    // 复制输出的 JSON，保存到 od/hydro_cache.json 文件中
            """
            )
            return

    print(f"\n共有 {len(problems)} 道 hydro.ac 题目")

    # 读取 MD 文件
    lines = read_md_file(MD_FILE_PATH)

    # 提取 MD 中的题目标题
    md_titles = []
    for line in lines:
        if line.startswith("|") and "[" in line:
            match = re.search(r"\[([^\]]+)\]", line)
            if match:
                md_titles.append(match.group(1))

    print(f"MD 文件中有 {len(md_titles)} 道题目")

    # 匹配题目
    print("\n正在匹配题目...")
    matches = match_problems(md_titles, problems)
    print(f"成功匹配 {len(matches)} 道题目")

    # 更新 MD 文件
    if matches:
        updated_lines = update_md_with_matches(lines, matches)
        write_md_file(MD_FILE_PATH, updated_lines)
        print(f"\n已更新 MD 文件: {MD_FILE_PATH}")
    else:
        print("\n没有找到匹配的题目，MD 文件未更新")

    # 打印匹配结果
    print("\n匹配结果:")
    for title, info in list(matches.items())[:10]:
        print(f"  {extract_title_keywords(title)[:30]:30s} -> {info['url']}")
    if len(matches) > 10:
        print(f"  ... 还有 {len(matches) - 10} 个匹配")


def import_from_json(json_path: str):
    """从 JSON 文件导入题目数据"""
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            problems = json.load(f)
        save_cache(problems)
        print(f"成功导入 {len(problems)} 道题目")
        return problems
    except Exception as e:
        print(f"导入失败: {e}")
        return []


def export_problems_to_file(
    problems: list[dict], output_path: str, format_type: str = "md"
):
    """
    将题目信息导出到指定文件

    Args:
        problems: 题目列表，每个题目包含 title, url, difficulty
        output_path: 输出文件路径
        format_type: 输出格式，支持 'md' (Markdown), 'json', 'txt'
    """
    output_file = Path(output_path)

    try:
        if format_type == "json":
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(problems, f, ensure_ascii=False, indent=2)
        elif format_type == "md":
            with open(output_file, "w", encoding="utf-8") as f:
                f.write("# 华为OD题目列表\n\n")
                f.write(f"共 {len(problems)} 道题目\n\n")
                f.write("| 序号 | 题目标题 | 难度 | 链接 |\n")
                f.write("|------|----------|------|------|\n")
                for i, problem in enumerate(problems, 1):
                    title = problem.get("title", "未知")
                    url = problem.get("url", "")
                    difficulty = problem.get("difficulty", "未知")
                    # 如果难度为空，标记为"未知"
                    if not difficulty:
                        difficulty = "未知"
                    f.write(f"| {i} | {title} | {difficulty} | [{url}]({url}) |\n")
        else:  # txt 格式
            with open(output_file, "w", encoding="utf-8") as f:
                f.write("华为OD题目列表\n")
                f.write("=" * 50 + "\n\n")
                f.write(f"共 {len(problems)} 道题目\n\n")
                for i, problem in enumerate(problems, 1):
                    title = problem.get("title", "未知")
                    url = problem.get("url", "")
                    difficulty = problem.get("difficulty", "未知")
                    if not difficulty:
                        difficulty = "未知"
                    f.write(f"{i}. {title}\n")
                    f.write(f"   难度: {difficulty}\n")
                    f.write(f"   链接: {url}\n\n")

        print(f"\n✅ 成功导出 {len(problems)} 道题目到: {output_file.absolute()}")
        return True
    except Exception as e:
        print(f"\n❌ 导出失败: {e}")
        return False


def run_export(output_path: str):
    """运行导出功能"""
    print("=" * 50)
    print("华为OD题目爬虫 - 导出模式")
    print("=" * 50)

    # 检查依赖
    print(f"\n依赖检查:")
    print(f"  - requests: {'[OK]' if HAS_REQUESTS else '[X] (将使用 urllib)'}")
    print(f"  - BeautifulSoup: {'[OK]' if HAS_BS4 else '[X] (将使用正则)'}")

    # 尝试从缓存加载
    problems = load_cache()

    # 如果缓存为空，则爬取
    if not problems:
        print("\n开始爬取 hydro.ac 题目列表...")
        problems = fetch_all_problems()

        if problems:
            save_cache(problems)
        else:
            print("\n无法获取题目列表。请检查网络连接或更新 Cookie。")
            return

    print(f"\n共有 {len(problems)} 道题目")

    # 根据文件扩展名确定格式
    output_file = Path(output_path)
    ext = output_file.suffix.lower()
    if ext == ".json":
        format_type = "json"
    elif ext == ".md":
        format_type = "md"
    else:
        format_type = "txt"

    # 导出
    export_problems_to_file(problems, output_path, format_type)


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        # 如果提供了 JSON 文件路径，则导入
        if sys.argv[1] == "--import" and len(sys.argv) > 2:
            import_from_json(sys.argv[2])
        elif sys.argv[1] == "--output" and len(sys.argv) > 2:
            # 导出到指定文件
            run_export(sys.argv[2])
        elif sys.argv[1] == "--help":
            print("使用方法:")
            print(
                "  python hydro_scraper.py                       # 自动爬取并更新 MD 文件"
            )
            print(
                "  python hydro_scraper.py --output <file>       # 导出题目列表到指定文件"
            )
            print(
                "                                                # 支持格式: .md, .json, .txt"
            )
            print("  python hydro_scraper.py --import <json_file>  # 从 JSON 文件导入")
            print("  python hydro_scraper.py --help                # 显示帮助")
            print("\n示例:")
            print(
                "  python hydro_scraper.py --output problems.md    # 导出为 Markdown 格式"
            )
            print(
                "  python hydro_scraper.py --output problems.json  # 导出为 JSON 格式"
            )
            print(
                "  python hydro_scraper.py --output problems.txt   # 导出为纯文本格式"
            )
        else:
            print(f"未知参数: {sys.argv[1]}")
            print("使用 --help 查看帮助")
    else:
        main()
