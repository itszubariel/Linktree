#!/usr/bin/env python3
"""
add_manga.py — Zubariel's Manga List Helper
Usage: python add_manga.py

Fetches manga info from Jikan API and caches images in manga_data.json
for faster loading. Run migrate_manga_to_json.py first if starting fresh.
"""

import json
import urllib.request
import urllib.parse
import os
import time
from datetime import datetime

JSON_FILE = "manga_data.json"
FALLBACK_IMG = "https://placehold.co/200x300/111/444?text=No+Image"

STATUS_OPTIONS = {
    "1": "completed",
    "2": "reading",
    "3": "on-hold",
    "4": "plan-to-read",
    "5": "dropped",
}

STATUS_LABELS = {
    "completed": "Completed",
    "reading": "Reading",
    "on-hold": "On-Hold",
    "plan-to-read": "Plan to Read",
    "dropped": "Dropped",
}


def load_manga_cache():
    if not os.path.exists(JSON_FILE):
        return {"last_updated": datetime.now().strftime("%Y-%m-%d"), "manga": []}
    try:
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"  [!] Error loading JSON: {e}")
        return {"last_updated": datetime.now().strftime("%Y-%m-%d"), "manga": []}


def save_manga_cache(cache):
    cache["last_updated"] = datetime.now().strftime("%Y-%m-%d")
    try:
        with open(JSON_FILE, "w", encoding="utf-8") as f:
            json.dump(cache, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"  [!] Error saving JSON: {e}")
        return False


def search_manga(query):
    encoded = urllib.parse.quote(query)
    url = f"https://api.jikan.moe/v4/manga?q={encoded}&limit=5&sfw=true"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "MangaListHelper/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
        return data.get("data", [])
    except Exception as e:
        print(f"  [!] API error: {e}")
        return []


def pick_result(results):
    if not results:
        return None
    print("\n  Search results:")
    for i, r in enumerate(results, 1):
        ch = r.get("chapters") or "?"
        score = r.get("score") or "N/A"
        year = (r.get("published") or {}).get("prop", {}).get("from", {}).get("year", "?")
        print(f"  [{i}] {r.get('title_english') or r['title']} — {ch} ch, score {score}, {year}")
    print("  [0] None of these / enter manually")
    while True:
        choice = input("  Pick: ").strip()
        if choice == "0":
            return None
        if choice.isdigit() and 1 <= int(choice) <= len(results):
            return results[int(choice) - 1]
        print("  Invalid, try again.")


def extract_genres(manga_data):
    genres = []
    for g in manga_data.get("genres", []):
        genres.append(g["name"])
    for t in manga_data.get("themes", []):
        genres.append(t["name"])
    return genres


def extract_image_url(manga_data):
    if not manga_data:
        return FALLBACK_IMG
    images = manga_data.get("images", {}).get("jpg", {})
    return images.get("large_image_url") or images.get("image_url") or FALLBACK_IMG


def prompt(label, default):
    val = input(f"  {label} [{default}]: ").strip()
    return val if val else str(default)


def pick_status():
    print("\n  Status:")
    for k, v in STATUS_OPTIONS.items():
        print(f"  [{k}] {STATUS_LABELS[v]}")
    while True:
        c = input("  Pick: ").strip()
        if c in STATUS_OPTIONS:
            return STATUS_OPTIONS[c]
        print("  Invalid.")


def main():
    print("=" * 55)
    print("  Zubariel's Manga List Helper (JSON Cache)")
    print("=" * 55)

    cache = load_manga_cache()
    print(f"\n  Loaded {len(cache['manga'])} cached manga entries")

    while True:
        print()
        query = input("Manga to add (or 'q' to quit): ").strip()
        if query.lower() == "q":
            print("\n  Saving changes...")
            if save_manga_cache(cache):
                print(f"  ✓ Saved to {JSON_FILE}")
            print("\n  Done! Push to GitHub when ready.")
            break
        if not query:
            continue

        print(f"\n  Searching '{query}'...")
        time.sleep(0.4)
        results = search_manga(query)
        manga_api = pick_result(results)

        if manga_api:
            default_title = manga_api.get("title_english") or manga_api.get("title", query)
            default_chapters = str(manga_api.get("chapters") or "N/A")
            default_genres = extract_genres(manga_api)
            image_url = extract_image_url(manga_api)
            japanese_title = manga_api.get("title_japanese", "")
            synopsis = (manga_api.get("synopsis") or "").replace("[Written by MAL Rewrite]", "").strip()
            mal_score = manga_api.get("score")
            manga_type = manga_api.get("type", "")
            year = (manga_api.get("published") or {}).get("prop", {}).get("from", {}).get("year")
        else:
            default_title = query
            default_chapters = "N/A"
            default_genres = []
            image_url = FALLBACK_IMG
            japanese_title = ""
            synopsis = ""
            mal_score = None
            manga_type = ""
            year = None

        print("\n  Confirm details (Enter = keep default):")
        title = prompt("Title", default_title)
        chapters = prompt("Chapters", default_chapters)
        genre_default = ", ".join(default_genres) if default_genres else "Action"
        genre_input = prompt("Genres (comma separated)", genre_default)
        genres = [g.strip() for g in genre_input.split(",") if g.strip()]
        rating_input = prompt("Your rating (e.g. 8.5 or N/A)", "N/A")
        status = pick_status()

        try:
            rating_val = float(rating_input) if rating_input.lower() not in ("n/a", "none", "0", "") else None
        except ValueError:
            rating_val = None

        try:
            ch_val = int(str(chapters).replace("+", "")) if str(chapters).lower() not in ("n/a", "none", "0", "") else None
        except ValueError:
            ch_val = None

        entry = {
            "title": title,
            "japanese_title": japanese_title,
            "status": status,
            "genres": genres,
            "rating": rating_val,
            "chapters": ch_val,
            "image_url": image_url,
            "synopsis": synopsis,
            "mal_score": mal_score,
            "type": manga_type,
            "year": year
        }

        print("\n" + "─" * 55)
        print(f"  Title:    {entry['title']}")
        print(f"  Status:   {STATUS_LABELS[status]}")
        print(f"  Chapters: {entry['chapters'] or 'N/A'}")
        print(f"  Rating:   {entry['rating'] or 'N/A'}")
        print(f"  Genres:   {', '.join(genres)}")
        print(f"  Image:    {image_url[:60]}...")
        print("─" * 55)

        confirm = input("\n  Add this manga? (y/n): ").strip().lower()
        if confirm == "y":
            cache["manga"].append(entry)
            print(f"\n  ✓ '{title}' added!")
        else:
            print("  Skipped.")

        again = input("\n  Add another? (y/n): ").strip().lower()
        if again != "y":
            print("\n  Saving changes...")
            if save_manga_cache(cache):
                print(f"  ✓ Saved to {JSON_FILE}")
            print("\n  All done! Don't forget to push.")
            break


if __name__ == "__main__":
    main()