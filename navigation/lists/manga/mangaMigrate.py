#!/usr/bin/env python3
import json
import urllib.request
import urllib.parse
import time

JSON_FILE = "manga_data.json"
FALLBACK_IMG = "https://placehold.co/200x300/111/444?text=No+Image"

EXISTING_DATA = [
    { "title": "One Piece", "status": "completed", "genres": ["Action", "Adventure", "Fantasy", "Shounen"], "rating": 8, "chapters": 1115 },
    { "title": "Naruto", "status": "completed", "genres": ["Action", "Adventure", "Martial Arts", "Shounen"], "rating": 8, "chapters": 700 },
    { "title": "Bleach", "status": "completed", "genres": ["Action", "Supernatural", "Shounen"], "rating": 9, "chapters": 686 },
    { "title": "Hunter x Hunter", "status": "completed", "genres": ["Action", "Adventure", "Fantasy", "Shounen"], "rating": 8.5, "chapters": 400 },
    { "title": "Solo Leveling", "status": "completed", "genres": ["Action", "Fantasy", "Supernatural", "Webtoon"], "rating": 8.5, "chapters": 200 },
    { "title": "Omniscient Reader's Viewpoint", "status": "completed", "genres": ["Action", "Psychological", "Supernatural", "Webtoon"], "rating": 9, "chapters": 191 },
    { "title": "Blue Lock", "status": "completed", "genres": ["Sports", "Psychological", "Shounen"], "rating": 8, "chapters": 260 },
    { "title": "Jujutsu Kaisen", "status": "completed", "genres": ["Action", "Supernatural", "School", "Shounen"], "rating": 7, "chapters": 262 },
    { "title": "Tokyo Ghoul", "status": "completed", "genres": ["Psychological", "Horror", "Supernatural", "Seinen"], "rating": 7.9, "chapters": 143 },
    { "title": "Death Note", "status": "completed", "genres": ["Mystery", "Psychological", "Supernatural", "Thriller"], "rating": 7.4, "chapters": 108 },
    { "title": "Fire Force", "status": "completed", "genres": ["Action", "Sci-Fi", "Supernatural", "Shounen"], "rating": 6.9, "chapters": 304 },
    { "title": "Dandadan", "status": "completed", "genres": ["Action", "Supernatural", "Comedy", "School"], "rating": 7.5, "chapters": 100 },
    { "title": "Gantz", "status": "completed", "genres": ["Action", "Horror", "Psychological", "Seinen"], "rating": 7, "chapters": 383 },
    { "title": "Pluto", "status": "completed", "genres": ["Drama", "Sci-Fi", "Mystery", "Psychological"], "rating": 6.4, "chapters": 65 },
    { "title": "Claymore", "status": "completed", "genres": ["Action", "Fantasy", "Horror", "Shounen"], "rating": 7, "chapters": 159 },
    { "title": "Dr. Stone", "status": "completed", "genres": ["Action", "Adventure", "Sci-Fi", "Shounen"], "rating": 7.5, "chapters": 232 },
    { "title": "Beelzebub", "status": "completed", "genres": ["Action", "Comedy", "Supernatural", "School"], "rating": 6.9, "chapters": 240 },
    { "title": "Soul Eater", "status": "completed", "genres": ["Action", "Supernatural", "Comedy", "Fantasy"], "rating": 7.4, "chapters": 113 },
    { "title": "Reborn!", "status": "completed", "genres": ["Action", "Comedy", "Supernatural", "Shounen"], "rating": 7.5, "chapters": 409 },
    { "title": "Inuyasha", "status": "completed", "genres": ["Action", "Fantasy", "Historical", "Romance"], "rating": 7, "chapters": 558 },
    { "title": "Toriko", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Shounen"], "rating": 7.4, "chapters": 396 },
    { "title": "Zetman", "status": "completed", "genres": ["Action", "Sci-Fi", "Psychological", "Seinen"], "rating": 6.9, "chapters": 226 },
    { "title": "Berserk", "status": "completed", "genres": ["Action", "Horror", "Fantasy", "Seinen"], "rating": 7.5, "chapters": 364 },
    { "title": "Demon Slayer: Kimetsu no Yaiba", "status": "completed", "genres": ["Action", "Supernatural", "Fantasy", "Shounen"], "rating": 8, "chapters": 110 },
    { "title": "Psycho-Pass", "status": "completed", "genres": ["Action", "Sci-Fi", "Thriller", "Seinen"], "rating": 7.5, "chapters": 94 },
    { "title": "Attack on Titan", "status": "completed", "genres": ["Action", "Adventure", "Fantasy", "Shounen"], "rating": 7.7, "chapters": 123 },
    { "title": "Goodnight Punpun", "status": "completed", "genres": ["Psychological", "Drama", "Seinen"], "rating": 8.2, "chapters": 12 },
    { "title": "Fairy Tail", "status": "completed", "genres": ["Adventure", "Fantasy", "Shounen"], "rating": 8.1, "chapters": 402 },
    { "title": "Akira", "status": "completed", "genres": ["Action", "Sci-Fi", "Thriller", "Seinen"], "rating": 7.8, "chapters": 42 },
    { "title": "Monster", "status": "completed", "genres": ["Mystery", "Psychological", "Thriller"], "rating": 7.2, "chapters": 31 },
    { "title": "Vinland Saga", "status": "completed", "genres": ["Action", "Fantasy", "Drama", "Seinen"], "rating": 10, "chapters": 100 },
    { "title": "JoJo's Bizarre Adventure", "status": "completed", "genres": ["Adventure", "Supernatural", "Mystery"], "rating": 7.4, "chapters": 186 },
    { "title": "Nana", "status": "completed", "genres": ["Fantasy", "Romance", "Drama"], "rating": 7, "chapters": 77 },
    { "title": "The Seven Deadly Sins", "status": "completed", "genres": ["Adventure", "Fantasy", "Shounen"], "rating": 6.9, "chapters": 180 },
    { "title": "March Comes in Like a Lion", "status": "completed", "genres": ["Action", "Drama", "Seinen"], "rating": 8.4, "chapters": 130 },
    { "title": "Parasyte", "status": "completed", "genres": ["Supernatural", "Psychological", "Horror"], "rating": 7.7, "chapters": 103 },
    { "title": "Noragami", "status": "completed", "genres": ["Action", "Fantasy", "Supernatural"], "rating": 7.2, "chapters": 142 },
    { "title": "Ao Haru Ride", "status": "completed", "genres": ["Drama", "Romance", "Slice of Life"], "rating": 7.6, "chapters": 52 },
    { "title": "My Hero Academia", "status": "completed", "genres": ["Action", "Supernatural", "Fantasy"], "rating": 7.8, "chapters": 195 },
    { "title": "Fairy Tail Zero", "status": "completed", "genres": ["Action", "Comedy", "Fantasy"], "rating": 7, "chapters": 220 },
    { "title": "Black Clover", "status": "completed", "genres": ["Action", "Fantasy", "Adventure", "Shounen"], "rating": 7.5, "chapters": 160 },
    { "title": "Oyasumi Punpun", "status": "completed", "genres": ["Psychological", "Drama", "Seinen"], "rating": 7, "chapters": 100 },
    { "title": "Blue Exorcist", "status": "completed", "genres": ["Action", "Supernatural", "Fantasy"], "rating": 7.8, "chapters": 175 },
    { "title": "The Ancient Magus' Bride", "status": "completed", "genres": ["Adventure", "Drama", "Fantasy"], "rating": 6.9, "chapters": 102 },
    { "title": "Haikyuu!!", "status": "completed", "genres": ["Action", "Sports", "Drama"], "rating": 7.7, "chapters": 300 },
    { "title": "Another", "status": "completed", "genres": ["Psychological", "Horror", "Mystery"], "rating": 7.2, "chapters": 75 },
    { "title": "Barakamon", "status": "completed", "genres": ["Comedy", "Slice of Life"], "rating": 6.8, "chapters": 40 },
    { "title": "Made in Abyss", "status": "completed", "genres": ["Fantasy", "Adventure", "Drama"], "rating": 7.1, "chapters": 80 },
    { "title": "Chainsaw Man", "status": "completed", "genres": ["Action", "Thriller", "Supernatural"], "rating": 7.6, "chapters": 180 },
    { "title": "Yowamushi Pedal", "status": "completed", "genres": ["Action", "Drama", "Sports"], "rating": 7, "chapters": 316 },
    { "title": "Fruits Basket", "status": "completed", "genres": ["Romance", "Drama", "Fantasy"], "rating": 6.9, "chapters": 50 },
    { "title": "Mushishi", "status": "completed", "genres": ["Adventure", "Mystery", "Supernatural"], "rating": 7.3, "chapters": 100 },
    { "title": "Toradora!", "status": "completed", "genres": ["Comedy", "Romance", "School"], "rating": 6.8, "chapters": 75 },
    { "title": "Dorohedoro", "status": "completed", "genres": ["Fantasy", "Action", "Drama"], "rating": 7.7, "chapters": 115 },
    { "title": "Honey and Clover", "status": "completed", "genres": ["Slice of Life", "Drama", "Romance"], "rating": 7.2, "chapters": 68 },
    { "title": "Kimi ni Todoke", "status": "completed", "genres": ["Romance", "Drama"], "rating": 7, "chapters": 58 },
    { "title": "D.Gray-man", "status": "completed", "genres": ["Action", "Fantasy", "Supernatural"], "rating": 7.3, "chapters": 135 },
    { "title": "Orange", "status": "completed", "genres": ["Drama", "Romance", "Slice of Life"], "rating": 6.9, "chapters": 60 },
    { "title": "Mobile Suit Gundam: The Origin", "status": "completed", "genres": ["Action", "Sci-Fi", "Mecha"], "rating": 7.7, "chapters": 105 },
    { "title": "Psycho-Pass: Inspector Shinya Kogami", "status": "completed", "genres": ["Psychological", "Thriller", "Mystery"], "rating": 7.5, "chapters": 65 },
    { "title": "Black Bullet", "status": "completed", "genres": ["Fantasy", "Adventure", "Drama"], "rating": 7.2, "chapters": 125 },
    { "title": "Say I Love You", "status": "completed", "genres": ["Romance", "Drama"], "rating": 6.8, "chapters": 55 },
    { "title": "Gekkan Shoujo Nozaki-kun", "status": "completed", "genres": ["Comedy", "Slice of Life"], "rating": 7.0, "chapters": 85 },
    { "title": "Shiki", "status": "completed", "genres": ["Horror", "Supernatural", "Mystery"], "rating": 7.1, "chapters": 40 },
    { "title": "Seraph of the End", "status": "completed", "genres": ["Action", "Fantasy", "Supernatural"], "rating": 7.6, "chapters": 150 },
    { "title": "Lovely★Complex", "status": "completed", "genres": ["Romance", "Drama", "Supernatural"], "rating": 7.3, "chapters": 70 },
    { "title": "Ghost in the Shell", "status": "completed", "genres": ["Sci-Fi", "Action", "Thriller"], "rating": 7.2, "chapters": 95 },
    { "title": "Non Non Biyori", "status": "completed", "genres": ["Slice of Life", "Comedy"], "rating": 6.9, "chapters": 50 },
    { "title": "Made in Abyss: Dawn of the Deep Soul", "status": "completed", "genres": ["Adventure", "Action", "Fantasy"], "rating": 7.5, "chapters": 110 },
    { "title": "Major", "status": "completed", "genres": ["Action", "Drama", "Sports"], "rating": 7.1, "chapters": 200 },
    { "title": "Tomie", "status": "completed", "genres": ["Horror", "Psychological"], "rating": 7.0, "chapters": 30 },
    { "title": "Yona of the Dawn", "status": "completed", "genres": ["Fantasy", "Romance", "Drama"], "rating": 6.8, "chapters": 45 },
    { "title": "Horimiya", "status": "completed", "genres": ["Drama", "Romance"], "rating": 7.1, "chapters": 80 },
    { "title": "Erased", "status": "completed", "genres": ["Supernatural", "Mystery", "Thriller"], "rating": 7.4, "chapters": 60 },
    { "title": "Slayers", "status": "completed", "genres": ["Fantasy", "Adventure"], "rating": 7.0, "chapters": 100 },
    { "title": "Azumanga Daioh", "status": "completed", "genres": ["Comedy", "School", "Slice of Life"], "rating": 6.7, "chapters": 70 },
    { "title": "Nisekoi", "status": "completed", "genres": ["Romance", "Drama"], "rating": 7.0, "chapters": 55 },
    { "title": "Blue Box", "status": "watching", "genres": ["Sports", "Romance", "School"], "rating": 0, "chapters": 0 },
]


def search_manga(query):
    encoded = urllib.parse.quote(query)
    url = f"https://api.jikan.moe/v4/manga?q={encoded}&limit=1&sfw=true"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "MangaMigration/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
        result = data.get("data", [])
        return result[0] if result else None
    except Exception as e:
        print(f"    [!] API error for '{query}': {e}")
        return None


def extract_image_url(manga_data):
    if not manga_data:
        return FALLBACK_IMG
    images = manga_data.get("images", {}).get("jpg", {})
    return images.get("large_image_url") or images.get("image_url") or FALLBACK_IMG


def migrate_manga(manga_obj, index, total):
    title = manga_obj.get("title", "")
    print(f"  [{index + 1}/{total}] Fetching: {title}")

    time.sleep(0.4)
    api_data = search_manga(title)

    if api_data:
        image_url = extract_image_url(api_data)
        japanese_title = api_data.get("title_japanese", "")
        synopsis = (api_data.get("synopsis") or "").replace("[Written by MAL Rewrite]", "").strip()
        mal_score = api_data.get("score")
        manga_type = api_data.get("type", "")
        chapters_api = api_data.get("chapters")
        published = (api_data.get("published") or {}).get("prop", {}).get("from", {}).get("year")
        print(f"    ✓ Found image: {image_url[:60]}...")
    else:
        image_url = FALLBACK_IMG
        japanese_title = ""
        synopsis = ""
        mal_score = None
        manga_type = ""
        chapters_api = None
        published = None
        print(f"    ⚠ Using fallback image")

    return {
        "title": title,
        "japanese_title": japanese_title,
        "status": manga_obj.get("status", "completed"),
        "genres": manga_obj.get("genres", ["Action"]),
        "rating": manga_obj.get("rating") or None,
        "chapters": manga_obj.get("chapters") or chapters_api,
        "image_url": image_url,
        "synopsis": synopsis,
        "mal_score": mal_score,
        "type": manga_type,
        "year": published
    }


def main():
    print("=" * 60)
    print("  Manga List Migration Tool")
    print("  Converting to JSON format with cached images")
    print("=" * 60)

    print(f"\n  Found {len(EXISTING_DATA)} manga to migrate")
    print("  This will take a few minutes due to API rate limiting...")

    confirm = input("\n  Continue? (y/n): ").strip().lower()
    if confirm != 'y':
        print("  Cancelled.")
        return

    migrated = []
    print("\n  Starting migration...")
    print("─" * 60)

    for i, manga in enumerate(EXISTING_DATA):
        try:
            migrated.append(migrate_manga(manga, i, len(EXISTING_DATA)))
        except Exception as e:
            print(f"    [!] Error migrating '{manga.get('title', 'unknown')}': {e}")
            migrated.append({
                "title": manga.get("title", "Unknown"),
                "japanese_title": "",
                "status": manga.get("status", "completed"),
                "genres": manga.get("genres", ["Action"]),
                "rating": manga.get("rating") or None,
                "chapters": manga.get("chapters"),
                "image_url": FALLBACK_IMG,
                "synopsis": "",
                "mal_score": None,
                "type": "",
                "year": None
            })

    cache = {
        "last_updated": __import__('time').strftime("%Y-%m-%d"),
        "manga": migrated
    }

    print("\n" + "─" * 60)
    print(f"  Saving to {JSON_FILE}...")

    try:
        with open(JSON_FILE, "w", encoding="utf-8") as f:
            json.dump(cache, f, indent=2, ensure_ascii=False)
        print(f"  ✓ Successfully saved {len(migrated)} manga entries!")
        print(f"\n  Next steps:")
        print(f"  1. Review {JSON_FILE}")
        print(f"  2. Use add_manga.py to add new manga going forward")
    except Exception as e:
        print(f"  [!] Error saving JSON: {e}")


if __name__ == "__main__":
    main()