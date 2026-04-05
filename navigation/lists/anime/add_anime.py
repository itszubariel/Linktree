#!/usr/bin/env python3
"""
add_anime.py — Zubariel's Anime List Helper (v3 - with JSON caching)
Usage: python add_anime.py

Fetches anime info from Jikan API and caches images in anime_data.json
for faster loading. No more rate limiting issues!
"""

import json
import urllib.request
import urllib.parse
import os
import time
from datetime import datetime

HTML_FILE = "anilist.html"
JSON_FILE = "anime_data.json"
FALLBACK_IMG = "https://placehold.co/200x300/111/444?text=No+Image"

STATUS_OPTIONS = {
    "1": "completed",
    "2": "watching",
    "3": "on-hold",
    "4": "plan-to-watch",
    "5": "dropped",
}

STATUS_LABELS = {
    "completed": "Completed",
    "watching": "Watching",
    "on-hold": "On-Hold",
    "plan-to-watch": "Plan to Watch",
    "dropped": "Dropped",
}


def load_anime_cache():
    """Load existing anime data from JSON file."""
    if not os.path.exists(JSON_FILE):
        return {"last_updated": datetime.now().strftime("%Y-%m-%d"), "anime": []}
    
    try:
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"  [!] Error loading JSON: {e}")
        return {"last_updated": datetime.now().strftime("%Y-%m-%d"), "anime": []}


def save_anime_cache(cache):
    """Save anime data to JSON file."""
    cache["last_updated"] = datetime.now().strftime("%Y-%m-%d")
    try:
        with open(JSON_FILE, "w", encoding="utf-8") as f:
            json.dump(cache, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"  [!] Error saving JSON: {e}")
        return False


def search_anime(query):
    """Search for anime using Jikan API."""
    encoded = urllib.parse.quote(query)
    url = f"https://api.jikan.moe/v4/anime?q={encoded}&limit=5&sfw=true"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "AnimeListHelper/3.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
        return data.get("data", [])
    except Exception as e:
        print(f"  [!] API error: {e}")
        return []


def pick_result(results):
    """Let user pick from search results."""
    if not results:
        return None
    print("\n  Search results:")
    for i, r in enumerate(results, 1):
        ep = r.get("episodes") or "?"
        score = r.get("score") or "N/A"
        year = (r.get("aired") or {}).get("prop", {}).get("from", {}).get("year", "?")
        print(f"  [{i}] {r.get('title_english') or r['title']} — {ep} eps, score {score}, {year}")
    print("  [0] None of these / enter manually")
    while True:
        choice = input("  Pick: ").strip()
        if choice == "0":
            return None
        if choice.isdigit() and 1 <= int(choice) <= len(results):
            return results[int(choice) - 1]
        print("  Invalid, try again.")


def extract_genres(anime_data):
    """Extract genres and themes from API data."""
    genres = []
    for g in anime_data.get("genres", []):
        genres.append(g["name"])
    for t in anime_data.get("themes", []):
        genres.append(t["name"])
    return genres


def extract_image_url(anime_data):
    """Extract best quality image URL from API data."""
    if not anime_data:
        return FALLBACK_IMG
    
    images = anime_data.get("images", {}).get("jpg", {})
    return images.get("large_image_url") or images.get("image_url") or FALLBACK_IMG


def prompt(label, default):
    """Prompt user with a default value."""
    val = input(f"  {label} [{default}]: ").strip()
    return val if val else str(default)


def pick_status():
    """Let user pick anime status."""
    print("\n  Status:")
    for k, v in STATUS_OPTIONS.items():
        print(f"  [{k}] {STATUS_LABELS[v]}")
    while True:
        c = input("  Pick: ").strip()
        if c in STATUS_OPTIONS:
            return STATUS_OPTIONS[c]
        print("  Invalid.")


def create_anime_entry(title, episodes, genres, rating, status, image_url, japanese_title="", synopsis="", mal_score=None, anime_type="", year=None):
    """Create anime entry dict for JSON."""
    if rating and rating.lower() not in ("n/a", "none", "0", ""):
        try:
            rating_val = float(rating)
        except ValueError:
            rating_val = None
    else:
        rating_val = None
    
    if episodes and str(episodes).lower() not in ("n/a", "none", "0", ""):
        try:
            ep_val = int(str(episodes).replace("+", "").replace("...", ""))
        except ValueError:
            ep_val = None
    else:
        ep_val = None
    
    return {
        "title": title,
        "japanese_title": japanese_title,
        "status": status,
        "genres": genres,
        "rating": rating_val,
        "episodes": ep_val,
        "image_url": image_url,
        "synopsis": synopsis,
        "mal_score": mal_score,
        "type": anime_type,
        "year": year
    }


def update_html_file(cache):
    """Update HTML file with anime data from JSON cache."""
    if not os.path.exists(HTML_FILE):
        print(f"\n  [!] File not found: {HTML_FILE}")
        return False
    
    with open(HTML_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    
    data_start = content.find("const DATA = [")
    if data_start == -1:
        print("  [!] Could not find 'const DATA = [' in HTML file")
        return False
    
    bracket_count = 0
    i = data_start + len("const DATA = ")
    in_data = False
    for idx in range(i, len(content)):
        if content[idx] == '[':
            bracket_count += 1
            in_data = True
        elif content[idx] == ']':
            bracket_count -= 1
            if in_data and bracket_count == 0:
                data_end = idx + 1
                break
    else:
        print("  [!] Could not find end of DATA array")
        return False

    js_entries = []
    for anime in cache["anime"]:
        genre_list = ", ".join(f'"{g}"' for g in anime.get("genres", ["Action"]))
        
        rating_str = str(anime["rating"]) if anime.get("rating") is not None else "null"

        ep_str = str(anime["episodes"]) if anime.get("episodes") is not None else "null"

        safe_title = anime["title"].replace("'", "\\'").replace('"', '\\"')
        
        entry = f'      {{ title: "{safe_title}", status: "{anime["status"]}", genres: [{genre_list}], rating: {rating_str}, episodes: {ep_str}, imageUrl: "{anime.get("image_url", FALLBACK_IMG)}" }}'
        js_entries.append(entry)
    
    new_data_array = "const DATA = [\n" + ",\n".join(js_entries) + "\n    ];"

    new_content = content[:data_start] + new_data_array + content[data_end:]
    
    with open(HTML_FILE, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    return True


def main():
    print("=" * 55)
    print("  Zubariel's Anime List Helper v3 (JSON Cache)")
    print("=" * 55)
    
    cache = load_anime_cache()
    print(f"\n  Loaded {len(cache['anime'])} cached anime entries")
    
    while True:
        print()
        query = input("Anime to add (or 'q' to quit): ").strip()
        if query.lower() == "q":
            print("\n  Saving changes...")
            if save_anime_cache(cache):
                print(f"  ✓ Saved to {JSON_FILE}")
            if update_html_file(cache):
                print(f"  ✓ Updated {HTML_FILE}")
            print("\n  Done! Push to GitHub when ready.")
            break
        if not query:
            continue
        
        print(f"\n  Searching '{query}'...")
        time.sleep(0.4)
        results = search_anime(query)
        anime_api = pick_result(results)
        
        if anime_api:
            default_title = anime_api.get("title_english") or anime_api.get("title", query)
            default_episodes = str(anime_api.get("episodes") or "N/A")
            default_genres = extract_genres(anime_api)
            image_url = extract_image_url(anime_api)
            japanese_title = anime_api.get("title_japanese", "")
            synopsis = (anime_api.get("synopsis") or "").replace("[Written by MAL Rewrite]", "").strip()
            mal_score = anime_api.get("score")
            anime_type = anime_api.get("type", "")
            year = (anime_api.get("aired") or {}).get("prop", {}).get("from", {}).get("year")
        else:
            default_title = query
            default_episodes = "N/A"
            default_genres = []
            image_url = FALLBACK_IMG
            japanese_title = ""
            synopsis = ""
            mal_score = None
            anime_type = ""
            year = None
        
        print("\n  Confirm details (Enter = keep default):")
        title = prompt("Title", default_title)
        episodes = prompt("Episodes", default_episodes)
        genre_default = ", ".join(default_genres) if default_genres else "Action"
        genre_input = prompt("Genres (comma separated)", genre_default)
        genres = [g.strip() for g in genre_input.split(",") if g.strip()]
        rating = prompt("Your rating (e.g. 8.5 or N/A)", "N/A")
        status = pick_status()
 
        anime_entry = create_anime_entry(
            title, episodes, genres, rating, status, image_url,
            japanese_title, synopsis, mal_score, anime_type, year
        )
        
        print("\n" + "─" * 55)
        print(f"  Title: {anime_entry['title']}")
        print(f"  Status: {STATUS_LABELS[status]}")
        print(f"  Episodes: {anime_entry['episodes'] or 'N/A'}")
        print(f"  Rating: {anime_entry['rating'] or 'N/A'}")
        print(f"  Genres: {', '.join(genres)}")
        print(f"  Image: {image_url[:60]}...")
        print("─" * 55)
        
        confirm = input("\n  Add this anime? (y/n): ").strip().lower()
        if confirm == "y":
            cache["anime"].append(anime_entry)
            print(f"\n  ✓ '{title}' added to cache!")
        else:
            print("  Skipped.")
        
        again = input("\n  Add another? (y/n): ").strip().lower()
        if again != "y":
            print("\n  Saving changes...")
            if save_anime_cache(cache):
                print(f"  ✓ Saved to {JSON_FILE}")
            if update_html_file(cache):
                print(f"  ✓ Updated {HTML_FILE}")
            print("\n  All done! Don't forget to push.")
            break


if __name__ == "__main__":
    main()