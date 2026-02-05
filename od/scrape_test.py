import urllib.request
import urllib.parse
import re

# BeautifulSoup might also be missing, let's check.
# If bs4 is missing, I will use simple regex.
try:
    from bs4 import BeautifulSoup
except ImportError:
    BeautifulSoup = None


def scrape_hydro():
    url = "https://hydro.ac/d/coder_gather/p?q=&sort=default"
    cookies = "_pk_id.1.b38a=7ba079d193402dab.1745587651.; loggedin=83845; test=4508998636097957; v=0d2abe5f5c5b920b579b60769da2c6cc; sid=sB53r5pRluNyNVkaplfpTdnMNgBaDuKd; sid.sig=nbeo_pbkjLeI22LWX5kDBidAVEI"

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Cookie": cookies,
    }

    print(f"Fetching {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode("utf-8")
    except Exception as e:
        print(f"Error fetching: {e}")
        return

    if BeautifulSoup:
        soup = BeautifulSoup(html, "html.parser")
        table = soup.find("table")
        if table:
            print("Found a table.")
            rows = table.find_all("tr")
            print(f"Table has {len(rows)} rows.")
            for i, row in enumerate(rows[:5]):
                print(f"Row {i}: {row.get_text(strip=True)}")
        else:
            print("No table found.")
            print("Title:", soup.title.string if soup.title else "No title")
            # Print some body to enable debugging
            print(soup.prettify()[:1000])
    else:
        print("BeautifulSoup not found, using regex.")
        # Simple regex to find rows or titles
        # Looking for table rows
        rows = re.findall(r"<tr[^>]*>(.*?)</tr>", html, re.DOTALL)
        print(f"Found {len(rows)} rows (approx).")
        for i, row in enumerate(rows[:5]):
            print(f"Row {i}: {re.sub(r'<[^>]+>', ' ', row)[:100]}")


if __name__ == "__main__":
    scrape_hydro()
