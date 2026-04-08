#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
html_files = list(ROOT.glob('*.html')) + list((ROOT / 'pages').glob('*.html'))
img_pattern = re.compile(r'<img\s+([^>]*?)>', re.IGNORECASE)
src_pattern = re.compile(r'src\s*=\s*["\']([^"\']+)["\']', re.IGNORECASE)
alt_pattern = re.compile(r'\balt\s*=\s*["\']', re.IGNORECASE)

changes = []
for f in html_files:
    text = f.read_text(encoding='utf-8', errors='ignore')
    new_text = text
    offset = 0
    for m in img_pattern.finditer(text):
        attrs = m.group(1)
        if alt_pattern.search(attrs):
            continue
        src_m = src_pattern.search(attrs)
        if not src_m:
            continue
        src = src_m.group(1)
        # ignore data URIs
        if src.startswith('data:'):
            alt = 'decorative image'
        else:
            lower = src.lower()
            basename = Path(src).stem
            if 'logo' in lower:
                alt = 'Samstev Lensman logo'
            elif 'samstev' in lower:
                alt = 'Portrait of Stephen Samuel Oluwatobi'
            elif '/weddings/' in lower or 'wedding' in lower:
                alt = f'Wedding photo {basename}'
            elif '/birthdays/' in lower or 'birthday' in lower:
                alt = f'Birthday photo {basename}'
            elif '/corporate/' in lower or 'corporate' in lower:
                alt = f'Corporate event photo {basename}'
            elif '/documentary/' in lower or 'documentary' in lower:
                alt = f'Documentary photo {basename}'
            elif '/photos/' in lower or 'photo_' in lower:
                alt = f'Photo {basename}'
            else:
                alt = f'Image {basename}'
        # construct replacement: insert alt after src attribute if possible
        insert_pos = m.start(1) + offset
        attrs_text = attrs
        # find position after src attribute within attrs_text
        src_pos = src_pattern.search(attrs_text)
        if src_pos:
            # insert after the src attribute value
            # find end index in original new_text
            # compute absolute positions
            abs_attr_start = m.start(1) + offset
            src_end_rel = src_pos.end()
            insert_at = abs_attr_start + src_end_rel
            insert_str = f' alt="{alt}"'
            new_text = new_text[:insert_at] + insert_str + new_text[insert_at:]
            offset += len(insert_str)
        else:
            # fallback: add alt at start
            abs_attr_start = m.start(1) + offset
            insert_str = f' alt="{alt}" '
            new_text = new_text[:abs_attr_start] + insert_str + new_text[abs_attr_start:]
            offset += len(insert_str)
    if new_text != text:
        f.write_text(new_text, encoding='utf-8')
        changes.append(f.relative_to(ROOT))

print('Updated files:')
for c in changes:
    print('-', c)
if not changes:
    print('No changes needed.')
