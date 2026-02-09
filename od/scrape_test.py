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
    # Minimal working cookies to avoid SSL/MTU issues with large headers
    cookies = (
        "sid=WbPNeRz8QGCSc2FVv13tMpn3YaFzTc9K; sid.sig=0yq2bnfZut_N9tgdLEB-tbSyyCo"
    )

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        # "Cookie": cookies, # We pass cookie via -H in curl
    }

    import ssl

    context = ssl.create_default_context()
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE

    import subprocess
    import sys

    print(f"Fetching {url} using curl...")
    try:
        # Construct the curl command
        # We use -L to follow redirects (though we expect 302, maybe we want to see the login page if redirected)
        # But wait, we want to stay logged in. If we are redirected to login, the cookies are invalid.
        # But first let's just get the content.
        # Use -k to ignore SSL errors if needed (though curl worked without it in the test, but just in case)
        cmd = [
            "curl",
            "-s",  # silent
            "-L",  # follow redirects
            # "-A", headers["User-Agent"], # Removing UA as it seems to cause SSL handshake issues
            "-H",
            f"Cookie: {cookies}",
            url,
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")

        if result.returncode != 0:
            print(f"Curl failed with return code {result.returncode}")
            print(result.stderr)
            return

        html = result.stdout
        print(f"Fetched {len(html)} bytes.")

    except Exception as e:
        print(f"Error executing curl: {e}")
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
