#!/bin/bash
# render_all.sh
#
# Finds every .qmd file under src/content, renders it with Quarto,
# embeds all its chart images directly into the resulting .md as base64,
# and deletes the leftover image folder. Run this any time you add or
# update a .qmd file anywhere in the content tree — no manual image
# handling required, no matter how many posts exist.
#
# Usage:
#   chmod +x render_all.sh
#   ./render_all.sh

set -e

CONTENT_DIR="src/content"

find "$CONTENT_DIR" -name "*.qmd" | while read -r QMD_FILE; do
  BASENAME=$(basename "$QMD_FILE" .qmd)
  DIR=$(dirname "$QMD_FILE")
  MD_FILE="$DIR/$BASENAME.md"
  IMG_DIR="$DIR/${BASENAME}_files/figure-commonmark"

  echo "Rendering: $QMD_FILE"
  quarto render "$QMD_FILE" --to gfm

  if [ -d "$IMG_DIR" ]; then
    echo "  Embedding images from: $IMG_DIR"
    python3 - "$MD_FILE" "$IMG_DIR" <<'EOF'
import sys, re, base64, os

md_path, img_dir = sys.argv[1], sys.argv[2]

with open(md_path, "r", encoding="utf-8") as f:
    content = f.read()

def replacer(m):
    alt, path = m.group(1), m.group(2)
    full = os.path.join(img_dir, os.path.basename(path))
    if not os.path.exists(full):
        return m.group(0)
    with open(full, "rb") as img:
        b64 = base64.b64encode(img.read()).decode()
    return f"![{alt}](data:image/png;base64,{b64})"

content = re.sub(r"!\[(.*?)\]\((.*?)\)", replacer, content)

with open(md_path, "w", encoding="utf-8") as f:
    f.write(content)
EOF
    rm -rf "$IMG_DIR"
  else
    echo "  No images found for this post, skipping embed step."
  fi

  echo "  Done: $MD_FILE is now fully self-contained."
  echo ""
done

echo "All .qmd files rendered and embedded. Each .md is a single, complete file."
echo "Remember: keep the original .qmd files OUTSIDE src/content (or delete them"
echo "from src/content after rendering) so your content loader doesn't pick up"
echo "both the raw source and the rendered version as duplicate posts."
