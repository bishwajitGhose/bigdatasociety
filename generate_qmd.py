#!/usr/bin/env python3
"""
Big Data Society — QMD Article Generator
Reads articles.csv and generates one ~5000-word .qmd file per row using the
DeepSeek V4 Pro API (OpenAI-compatible endpoint).

Usage (Mac terminal):
    export DEEPSEEK_API_KEY="sk-..."
    python3 generate_qmd.py                     # generate everything
    python3 generate_qmd.py --limit 3            # test run, first 3 rows only
    python3 generate_qmd.py --folder "Apache Spark"   # only one subfolder
    python3 generate_qmd.py --row 42              # only one specific row (1-indexed, excl. header)
"""

import os
import sys
import csv
import time
import argparse
import re
from pathlib import Path
from datetime import date

try:
    from openai import OpenAI
except ImportError:
    sys.exit(
        "Missing dependency. Run this first:\n"
        "    pip3 install openai --break-system-packages\n"
        "(or inside a virtualenv: pip3 install openai)"
    )

# ---------------------------------------------------------------------------
# CONFIG — edit these if needed
# ---------------------------------------------------------------------------
MODEL = "deepseek-v4-pro"
BASE_URL = "https://api.deepseek.com"
CSV_PATH = Path(__file__).parent / "articles.csv"
OUTPUT_ROOT = Path(__file__).parent / "output"   # qmd files land here, sorted by category/subfolder
AUTHOR_NAME = "Your Name"                         # <-- change this
MAX_RETRIES = 3
RETRY_WAIT_SECONDS = 15
REQUEST_PAUSE_SECONDS = 2      # small pause between requests to be polite to the API
MAX_OUTPUT_TOKENS = 8000       # ~5000 words + overhead; raise if responses get cut off

# ---------------------------------------------------------------------------
# PROMPT TEMPLATE
# ---------------------------------------------------------------------------
PROMPT_TEMPLATE = """You are a senior data engineer and technical writer producing a blog article for **Big Data Society**, a professional portfolio and education website for beginner-to-intermediate data analysts, data scientists, and web developers. Your writing is read by recruiters, hiring managers, students, and self-taught professionals — never by fellow PhDs. Write like a smart colleague explaining something over coffee, not like a textbook.

### Article to write
- Category folder: {category} -> {subfolder}
- SEO Title: {title}
- Focus keyword: {keyword}
- Search intent: {intent}
- Writing instruction: {instruction}

### Output format
Produce a single complete Quarto (.qmd) file, ready to drop into the folder above. Structure it exactly like this:

---
title: "{title}"
description: "[150-160 character meta description containing the focus keyword]"
author: "{author}"
date: "{today}"
categories: [{category}, {subfolder}]
image: "cover.png"
toc: true
toc-depth: 3
---

Followed by the article body in Markdown, using #, ##, ### headings, fenced code blocks with language tags (```python, ```r, ```sql, ```bash etc. as relevant), and Quarto callout blocks (::: {{.callout-note}} / ::: {{.callout-tip}} / ::: {{.callout-warning}}) where useful.

### Length and depth
- Target 4,800-5,200 words of body content (excluding front matter and code).
- Cover the topic from beginner to practical-intermediate level, matching the search intent above.
- Do not pad with filler. Every paragraph must teach something concrete.

### Language rules - this is the most important constraint
- Write in plain, everyday English. No academic tone, no jargon left unexplained.
- Every technical term must be defined in one plain sentence the first time it's used.
- Short sentences. Short paragraphs (2-4 sentences max).
- Active voice. Second person ("you") when explaining how to do something.
- Avoid AI-sounding filler phrases ("in today's fast-paced world," "it is important to note," "delve into," "unlock the power of," "in conclusion"). Just say the thing.
- No unexplained acronyms - spell out on first use.

### The 20+ real-world use cases requirement (mandatory)
Include a dedicated section titled "Real-World Use Cases" containing at least 20 distinct, concrete use cases of {keyword} / {subfolder} in the real world. For each use case:
- Name the real company, organization, government agency, or well-known open dataset involved (e.g., Netflix, Uber, CDC, NASA, World Bank, NYC Open Data, NHS, Spotify, Airbnb) - never invented or generic company names like "Company X."
- State the specific real problem the tool/technique solved.
- State the specific real data or dataset involved (name it, e.g., "NYC Taxi Trip Data," "Ghana DHS survey," "MIMIC-III clinical dataset," "Sentinel-2 satellite imagery").
- Keep each use case to 2-4 sentences - a compact, scannable entry, not a mini-essay.
- Spread use cases across multiple industries: healthcare, finance, retail/e-commerce, transportation, agriculture, climate/environment, social media, government/public sector, telecom, manufacturing, education, sports, gaming, cybersecurity, logistics, energy, insurance, media/streaming, real estate, and nonprofit/NGO work - do not cluster all 20 in one or two industries.
- Base all facts on your training knowledge; do not fabricate specific statistics, dollar figures, or percentages you are not confident are real. If unsure of a precise number, describe the use case without inventing one.

### Required article sections (adapt headings to fit the specific topic, but cover all of these)
1. Introduction - hook the reader, state what they'll learn, mention the focus keyword naturally in the first 100 words.
2. What Is [topic]? - plain-English definition, one relatable analogy.
3. Why It Matters - the real problem it solves, who uses it, where it fits in a typical data stack.
4. How It Works - core concepts explained simply, with at least one diagram-in-words or step list.
5. Getting Started / Hands-On Example - a runnable, realistic code example using a real or realistic public dataset, fully explained line by line.
6. Real-World Use Cases - the 20+ use cases described above.
7. Common Mistakes and How to Avoid Them - practical troubleshooting.
8. Best Practices - a tight, practical checklist.
9. [Topic] vs. Alternatives (only if relevant to the search intent) - short, fair comparison.
10. Career Relevance - why this skill matters for a data analyst job search, what roles ask for it.
11. FAQ - 5-7 real questions people search for, each answered in 2-4 sentences, phrased as H3 headings (good for featured snippets).
12. Conclusion + Call to Action - summarize, then invite the reader to check the related Big Data Society project or connect via the Contact page.

### SEO rules
- Use the focus keyword naturally in: the title, the meta description, the first paragraph, at least one H2, and 3-6 times total in the body (never keyword-stuffed).
- Use 3-5 related secondary keywords naturally throughout.
- Write descriptive, keyword-relevant H2/H3 headings (avoid vague headings like "Overview").
- Suggest 2-3 internal link anchors to other Big Data Society articles or project pages (as plain bracketed suggestions, e.g., [Link to: Apache Kafka for Beginners]), and 1-2 external link suggestions to authoritative sources (official docs, government/NGO data portals) - describe the link target in words, do not fabricate URLs.

### Copyright and accuracy rules
- Never quote or reproduce text from external sources. Describe and explain in your own words only.
- Never fabricate statistics, quotes, or attributions. If precise figures aren't known with confidence, describe the trend or use case qualitatively instead.
- Code examples must be original and correct, not copied from documentation verbatim.

### Before you finish
Reread the draft and confirm: word count is 4,800+, exactly 20+ use cases are present and span multiple industries with real named organizations/datasets, no AI-cliche phrases remain, and every technical term was defined in plain English on first use.

Output only the finished .qmd file content - no preamble, no explanation of what you did."""


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def load_articles(csv_path: Path):
    with open(csv_path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def build_client() -> OpenAI:
    api_key = os.environ.get("DEEPSEEK_API_KEY")
    if not api_key:
        sys.exit(
            "DEEPSEEK_API_KEY is not set.\n"
            "In Terminal, run:\n"
            '    export DEEPSEEK_API_KEY="your-key-here"\n'
            "then re-run this script."
        )
    return OpenAI(api_key=api_key, base_url=BASE_URL)


def generate_one(client: OpenAI, row: dict) -> str:
    prompt = PROMPT_TEMPLATE.format(
        category=row["category"].strip(),
        subfolder=row["subfolder"].strip(),
        title=row["title"].strip(),
        keyword=row["keyword"].strip(),
        intent=row["intent"].strip(),
        instruction=row["instruction"].strip(),
        author=AUTHOR_NAME,
        today=date.today().isoformat(),
    )

    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {"role": "system", "content": "You are a precise, plain-English technical writer."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=MAX_OUTPUT_TOKENS,
                stream=False,
                reasoning_effort="high",
                extra_body={"thinking": {"type": "enabled"}},
            )
            content = response.choices[0].message.content
            if not content or len(content) < 500:
                raise ValueError("Response looked too short, retrying.")
            return content.strip()
        except Exception as e:
            last_error = e
            print(f"    attempt {attempt} failed: {e}")
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_WAIT_SECONDS)
    raise RuntimeError(f"Failed after {MAX_RETRIES} attempts: {last_error}")


def main():
    parser = argparse.ArgumentParser(description="Generate .qmd articles via DeepSeek V4 Pro.")
    parser.add_argument("--limit", type=int, default=None, help="Only generate the first N rows.")
    parser.add_argument("--folder", type=str, default=None, help="Only generate rows for this subfolder (e.g. 'Apache Spark').")
    parser.add_argument("--row", type=int, default=None, help="Only generate this single row number (1-indexed).")
    parser.add_argument("--overwrite", action="store_true", help="Regenerate files even if they already exist.")
    args = parser.parse_args()

    articles = load_articles(CSV_PATH)

    if args.folder:
        articles = [a for a in articles if a["subfolder"].strip().lower() == args.folder.strip().lower()]
    if args.row:
        articles = [articles[args.row - 1]]
    if args.limit:
        articles = articles[: args.limit]

    if not articles:
        sys.exit("No matching rows found. Check --folder / --row / articles.csv.")

    client = build_client()

    total = len(articles)
    done, skipped, failed = 0, 0, 0

    for i, row in enumerate(articles, start=1):
        category_slug = slugify(row["category"])
        subfolder_slug = slugify(row["subfolder"])
        title_slug = slugify(row["title"])

        out_dir = OUTPUT_ROOT / category_slug / subfolder_slug
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / f"{title_slug}.qmd"

        print(f"[{i}/{total}] {row['category']} / {row['subfolder']} :: {row['title']}")

        if out_path.exists() and not args.overwrite:
            print(f"    already exists, skipping ({out_path})")
            skipped += 1
            continue

        try:
            qmd_content = generate_one(client, row)
            out_path.write_text(qmd_content, encoding="utf-8")
            word_count = len(qmd_content.split())
            print(f"    saved -> {out_path} (~{word_count} words)")
            done += 1
        except Exception as e:
            print(f"    FAILED: {e}")
            failed += 1

        time.sleep(REQUEST_PAUSE_SECONDS)

    print("\n----------------------------------------")
    print(f"Done: {done}  Skipped: {skipped}  Failed: {failed}  Total: {total}")
    print(f"Output folder: {OUTPUT_ROOT}")


if __name__ == "__main__":
    main()
