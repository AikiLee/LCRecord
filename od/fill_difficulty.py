"""
从 hydro.ac 获取题目难度并填充到 huawei_od_complete_list.md 文件中
"""

import re
import json
from pathlib import Path

# 尝试导入 requests
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
CACHE_FILE_PATH = SCRIPT_DIR / "difficulty_cache.json"
TEST_HTML_PATH = SCRIPT_DIR / "test_response.html"

# HTTP Headers
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Cookie": COOKIES,
}


def parse_difficulty_from_html(html: str) -> dict[str, str]:
    """从 HTML 解析题目 ID 和难度的映射"""
    difficulty_map = {}

    if HAS_BS4:
        soup = BeautifulSoup(html, "html.parser")
        rows = soup.find_all("tr", {"data-pid": True})

        for row in rows:
            # 获取题目链接
            link = row.find("a", href=re.compile(r"/d/coder_gather/p/"))
            if link:
                href = link.get("href", "")
                # 提取题目 ID，如 oda0001
                match = re.search(r"/d/coder_gather/p/(\w+)", href)
                if match:
                    problem_id = match.group(1)

                    # 获取难度
                    difficulty_td = row.find("td", class_="col--difficulty")
                    if difficulty_td:
                        difficulty = difficulty_td.get_text(strip=True)
                        if difficulty:
                            difficulty_map[problem_id] = difficulty
    else:
        # 使用正则表达式解析
        # 查找每一行的题目链接和难度
        # 格式: <a href="/d/coder_gather/p/oda0001">...</a> ... <td class="col--difficulty">8</td>

        # 先找到所有行
        row_pattern = r'<tr data-pid="\d+">(.*?)</tr>'
        rows = re.findall(row_pattern, html, re.DOTALL)

        for row in rows:
            # 找题目 ID
            id_match = re.search(r'href="/d/coder_gather/p/(\w+)"', row)
            # 找难度
            diff_match = re.search(r'<td class="col--difficulty">(\d+)</td>', row)

            if id_match and diff_match:
                problem_id = id_match.group(1)
                difficulty = diff_match.group(1)
                difficulty_map[problem_id] = difficulty

    return difficulty_map


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
    """使用 urllib 获取页面内容"""
    try:
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE

        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, context=context, timeout=30) as response:
            return response.read().decode("utf-8")
    except Exception as e:
        print(f"urllib 获取失败: {e}")
        return None


def fetch_all_difficulties() -> dict[str, str]:
    """获取所有题目的难度信息"""
    all_difficulties = {}
    page = 1
    max_pages = 15  # 最多爬取15页

    while page <= max_pages:
        url = f"{HYDRO_PROBLEM_LIST_URL}?page={page}&q=&sort=default"
        print(f"正在获取第 {page} 页...")

        # 尝试获取页面
        html = None
        if HAS_REQUESTS:
            html = fetch_page_with_requests(url)
        if not html:
            html = fetch_page_with_urllib(url)

        if not html:
            print(f"获取第 {page} 页失败")
            break

        # 解析难度
        difficulties = parse_difficulty_from_html(html)
        if not difficulties:
            print(f"第 {page} 页没有找到题目")
            break

        all_difficulties.update(difficulties)
        print(f"第 {page} 页: 获取了 {len(difficulties)} 道题目的难度")

        # 检查是否还有下一页
        if "下一页" not in html and "next" not in html.lower():
            break

        page += 1

    return all_difficulties


def load_cache() -> dict[str, str]:
    """加载缓存的难度数据"""
    if CACHE_FILE_PATH.exists():
        try:
            with open(CACHE_FILE_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                print(f"从缓存加载了 {len(data)} 道题目的难度信息")
                return data
        except Exception as e:
            print(f"加载缓存失败: {e}")
    return {}


def save_cache(difficulties: dict[str, str]):
    """保存难度数据到缓存"""
    try:
        with open(CACHE_FILE_PATH, "w", encoding="utf-8") as f:
            json.dump(difficulties, f, ensure_ascii=False, indent=2)
        print(f"已保存 {len(difficulties)} 道题目的难度到缓存")
    except Exception as e:
        print(f"保存缓存失败: {e}")


def update_md_file(md_path: Path, difficulties: dict[str, str]) -> int:
    """更新 MD 文件中的难度信息"""
    with open(md_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    updated_count = 0
    updated_lines = []

    for line in lines:
        if line.startswith("|") and "hydro.ac" in line:
            # 这是包含 hydro 链接的行
            # 提取题目 ID
            match = re.search(r"hydro\.ac/d/coder_gather/p/(\w+)", line)
            if match:
                problem_id = match.group(1)
                difficulty = difficulties.get(problem_id, "")

                if difficulty:
                    # 解析表格行
                    parts = line.split("|")
                    if len(parts) >= 5:
                        # 检查难度列是否为空
                        # 表格结构: | 标题 | 链接 | 分类 | 难度 | 说明 | 备注 |
                        # 索引:      0    1      2     3      4      5      6
                        if len(parts) > 4 and not parts[4].strip():
                            parts[4] = f" {difficulty} "
                            line = "|".join(parts)
                            updated_count += 1

        updated_lines.append(line)

    # 写回文件
    with open(md_path, "w", encoding="utf-8") as f:
        f.writelines(updated_lines)

    return updated_count


def main():
    print("=" * 50)
    print("填充题目难度信息")
    print("=" * 50)

    # 检查依赖
    print(f"\n依赖检查:")
    print(f"  - requests: {'[OK]' if HAS_REQUESTS else '[X] (将使用 urllib)'}")
    print(f"  - BeautifulSoup: {'[OK]' if HAS_BS4 else '[X] (将使用正则)'}")

    # 尝试从本地 HTML 文件解析难度
    difficulties = {}

    # 首先尝试从本地 test_response.html 文件获取
    if TEST_HTML_PATH.exists():
        print(f"\n从本地文件 {TEST_HTML_PATH} 解析难度...")
        with open(TEST_HTML_PATH, "r", encoding="utf-8") as f:
            html = f.read()
        difficulties = parse_difficulty_from_html(html)
        print(f"从本地文件获取了 {len(difficulties)} 道题目的难度")

    # 尝试从缓存加载
    cached = load_cache()
    if cached:
        difficulties.update(cached)

    # 如果数据不够，尝试在线获取
    if len(difficulties) < 100:
        print("\n尝试在线获取更多题目难度...")
        online_difficulties = fetch_all_difficulties()
        if online_difficulties:
            difficulties.update(online_difficulties)
            save_cache(difficulties)

    if not difficulties:
        print("\n无法获取难度信息!")
        return

    print(f"\n共有 {len(difficulties)} 道题目的难度信息")

    # 更新 MD 文件
    if not MD_FILE_PATH.exists():
        print(f"\n错误: 找不到 MD 文件: {MD_FILE_PATH}")
        return

    updated = update_md_file(MD_FILE_PATH, difficulties)
    print(f"\n已更新 {updated} 道题目的难度信息到: {MD_FILE_PATH}")


if __name__ == "__main__":
    main()
