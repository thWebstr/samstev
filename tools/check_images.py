#!/usr/bin/env python3
import os, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXTS = ('.html', '.htm', '.css', '.js')
IMG_EXTS = ('.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.png')

pattern_src = re.compile(r'''(?:src|data-src|srcset)\s*=\s*["']([^"']+)['"]''', re.IGNORECASE)
pattern_url = re.compile(r'''url\(\s*['"]?([^)'"\s]+)['"]?\s*\)''', re.IGNORECASE)
pattern_imgpath = re.compile(r'''['"]((?:\.\./|\./)?(?:images|photos|assets|img|static)[^'"\)]+(?:''' + '|'.join([re.escape(e) for e in IMG_EXTS]) + r'''))['"]''', re.IGNORECASE)

refs = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    for fname in filenames:
        if fname.lower().endswith(EXTS):
            fpath = Path(dirpath) / fname
            txt = fpath.read_text(encoding='utf-8', errors='ignore')
            # find src, srcset, data-src
            for m in pattern_src.finditer(txt):
                refs.append((fpath, m.group(1)))
            # find url(...) in css or inline styles
            for m in pattern_url.finditer(txt):
                refs.append((fpath, m.group(1)))
            # fallback generic image paths
            for m in pattern_imgpath.finditer(txt):
                refs.append((fpath, m.group(1)))

missing = []
checked = 0

for src_file, ref in refs:
    ref = ref.split(',')[0].strip()  # handle srcset multiple
    if ref.startswith('http://') or ref.startswith('https://') or ref.startswith('data:'):
        continue
    # ignore fragment-like or inline filter references (e.g. %23noise or #noise)
    if ref.startswith('%') or ref.startswith('#'):
        continue
    # only check likely image paths (extensions or common image dirs)
    if not (ref.lower().endswith(IMG_EXTS) or re.search(r"(?:images|photos|assets|img|static)/", ref, re.IGNORECASE)):
        continue
    # resolve path
    if ref.startswith('/'):
        cand = ROOT / ref.lstrip('/')
    elif ref.startswith('./') or ref.startswith('../'):
        cand = (src_file.parent / ref).resolve()
    else:
        # relative without dot — relative to src file
        cand = (src_file.parent / ref).resolve()
        # if not exist, also try ROOT/ref
        if not cand.exists():
            cand2 = (ROOT / ref).resolve()
            if cand2.exists():
                cand = cand2
    checked += 1
    if not cand.exists():
        missing.append((src_file.relative_to(ROOT), ref, cand))

print(f"Scanned {checked} image references across {len(set(p for p,_ in refs))} files.")
if missing:
    print(f"Found {len(missing)} missing references:\n")
    for src, ref, cand in missing:
        print(f"- In {src}: '{ref}' -> resolved to {cand}")
    sys.exit(2)
else:
    print('No missing image references found.')
    sys.exit(0)
