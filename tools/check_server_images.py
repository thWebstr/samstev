#!/usr/bin/env python3
import re
import sys
from urllib.parse import urljoin, urlparse
from urllib.request import urlopen, Request
from pathlib import Path

BASE = 'http://localhost:8000/'
ROOT = Path(__file__).resolve().parent.parent

pattern_src = re.compile(r'''(?:src|data-src|srcset)\s*=\s*["']([^"']+)['"]''', re.IGNORECASE)
pattern_url = re.compile(r'''url\(\s*['"]?([^)'"\s]+)['"]?\s*\)''', re.IGNORECASE)

pages = ['index.html']
for p in (ROOT / 'pages').glob('*.html'):
    pages.append(str(Path('pages') / p.name))

failed = []
checked = 0

for page in pages:
    page_url = urljoin(BASE, page)
    try:
        req = Request(page_url, headers={'User-Agent':'ImageChecker/1.0'})
        with urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"ERROR: Could not fetch {page_url}: {e}")
        failed.append((page, page_url, 'PAGE_FETCH_ERROR'))
        continue

    refs = set()
    for m in pattern_src.finditer(html):
        refs.add(m.group(1).split(',')[0].strip())
    for m in pattern_url.finditer(html):
        refs.add(m.group(1).strip())

    for ref in refs:
        if not ref or ref.startswith('http://') or ref.startswith('https://') or ref.startswith('data:'):
            continue
        if ref.startswith('#') or ref.startswith('%'):
            continue
        # resolve relative to page URL
        target = urljoin(page_url, ref)
        checked += 1
        try:
            r = Request(target, method='HEAD', headers={'User-Agent':'ImageChecker/1.0'})
            with urlopen(r, timeout=8) as rr:
                code = rr.getcode()
                if code >= 400:
                    failed.append((page, ref, target, code))
        except Exception as e:
            # try GET in case server doesn't accept HEAD
            try:
                r2 = Request(target, headers={'User-Agent':'ImageChecker/1.0'})
                with urlopen(r2, timeout=8) as rr2:
                    code = rr2.getcode()
                    if code >= 400:
                        failed.append((page, ref, target, code))
            except Exception as e2:
                failed.append((page, ref, target, str(e2)))

print(f"Checked {checked} server-side resource URLs across {len(pages)} pages.")
if failed:
    print('Found issues:')
    for item in failed:
        if len(item) == 3:
            print(f"- Page fetch failed: {item[0]} -> {item[1]} ({item[2]})")
        else:
            print(f"- In {item[0]}: reference '{item[1]}' -> {item[2]} returned {item[3]}")
    sys.exit(2)
else:
    print('No server-side 404s detected.')
    sys.exit(0)
