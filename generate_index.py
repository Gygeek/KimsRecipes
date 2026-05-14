"""
generate_index.py
Scans all recipe JSON files in the current directory and rebuilds master-recipes.json.
Called automatically by the GitHub Actions workflow (.github/workflows/update-index.yml)
whenever a recipe JSON is pushed to the main branch.
"""

import json
import os
import sys

EXCLUDE = {"master-recipes.json", "recipe-template.json"}
OUTPUT = "master-recipes.json"


def build_index():
    recipes = []
    errors = []

    json_files = sorted(
        f for f in os.listdir(".")
        if f.endswith(".json") and f not in EXCLUDE
    )

    if not json_files:
        print("No recipe JSON files found.")
        return

    for filename in json_files:
        try:
            with open(filename, encoding="utf-8") as fh:
                data = json.load(fh)
            title = data.get("title", "").strip()
            if not title:
                errors.append(f"  WARNING: '{filename}' has no 'title' field — skipped")
                continue
            recipes.append({"title": title, "file": filename})
        except json.JSONDecodeError as exc:
            errors.append(f"  ERROR: Could not parse '{filename}': {exc} — skipped")

    # Sort alphabetically by title (case-insensitive)
    recipes.sort(key=lambda r: r["title"].lower())

    with open(OUTPUT, "w", encoding="utf-8") as fh:
        json.dump(recipes, fh, indent=4, ensure_ascii=False)
        fh.write("\n")

    print(f"master-recipes.json updated with {len(recipes)} recipe(s).")

    if errors:
        print("\nIssues encountered:")
        for msg in errors:
            print(msg)
        sys.exit(1)   # Non-zero exit so CI marks the step as failed if any file is broken


if __name__ == "__main__":
    build_index()
