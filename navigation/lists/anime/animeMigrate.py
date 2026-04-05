#!/usr/bin/env python3
"""
migrate_to_json.py — One-time migration script
Converts existing DATA array in anilist.html to JSON format with cached images

Run this ONCE to create your anime_data.json file from existing data.
"""

import json
import urllib.request
import urllib.parse
import time
import re

JSON_FILE = "anime_data.json"
FALLBACK_IMG = "https://placehold.co/200x300/111/444?text=No+Image"

EXISTING_DATA = [
      { "title": "Naruto", "status": "completed", "genres": ["Action", "Adventure", "Shounen"], "rating": 7.5, "episodes": 220 },
      { "title": "Naruto: Shippuden", "status": "completed", "genres": ["Action", "Adventure", "Shounen"], "rating": 8, "episodes": 366 },
      { "title": "Attack on Titan", "status": "on-hold", "genres": ["Action", "Horror", "Fantasy"], "rating": 7, "episodes": 75 },
      { "title": "Your Lie in April", "status": "completed", "genres": ["Drama", "Romance"], "rating": 8, "episodes": 24 },
      { "title": "Fullmetal Alchemist: Brotherhood", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Magic", "Shounen"], "rating": 7.8, "episodes": 64 },
      { "title": "Death Note", "status": "completed", "genres": ["Mystery", "Thriller"], "rating": 6, "episodes": 37 },
      { "title": "Made in Abyss", "status": "completed", "genres": ["Fantasy", "Adventure"], "rating": 5, "episodes": 25 },
      { "title": "March Comes in Like a Lion", "status": "completed", "genres": ["Comedy", "Slice of Life"], "rating": 6, "episodes": 44 },
      { "title": "Demon Slayer: Kimetsu no Yaiba", "status": "completed", "genres": ["Action", "Supernatural"], "rating": 6, "episodes": 44 },
      { "title": "Re:Zero - Starting Life in Another World", "status": "dropped", "genres": ["Fantasy", "Romance", "Isekai"], "rating": 6, "episodes": 25 },
      { "title": "Vinland Saga", "status": "completed", "genres": ["Action", "Drama", "Historical"], "rating": 10, "episodes": 48 },
      { "title": "One Piece", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Shounen"], "rating": 8.5, "episodes": 1070 },
      { "title": "Jujutsu Kaisen", "status": "completed", "genres": ["Action", "Fantasy", "School", "Shounen"], "rating": 8.4, "episodes": 50 },
      { "title": "Hunter x Hunter", "status": "completed", "genres": ["Action", "Adventure", "Shounen"], "rating": 8, "episodes": 148 },
      { "title": "Toradora!", "status": "completed", "genres": ["Comedy", "Romance", "School"], "rating": 6, "episodes": 25 },
      { "title": "Tokyo Ghoul", "status": "completed", "genres": ["Action", "Drama", "Horror"], "rating": 7, "episodes": 48 },
      { "title": "Bleach", "status": "completed", "genres": ["Action", "Adventure", "Fantasy", "Shounen"], "rating": 8, "episodes": 366 },
      { "title": "Bleach: Thousand-Year Blood War", "status": "watching", "genres": ["Action", "Adventure", "Fantasy", "Shounen"], "rating": 9, "episodes": 0 },
      { "title": "Horimiya", "status": "completed", "genres": ["Romance", "School", "Shounen"], "rating": 9, "episodes": 26 },
      { "title": "My Teen Romantic Comedy SNAFU", "status": "completed", "genres": ["Comedy", "Drama", "Romance", "School"], "rating": 9, "episodes": 38 },
      { "title": "I Parry Everything", "status": "completed", "genres": ["Action", "Adventure", "Fantasy"], "rating": 5, "episodes": 12 },
      { "title": "Mission: Yozakura Family", "status": "completed", "genres": ["Action", "Comedy", "Romance", "Shounen"], "rating": 5, "episodes": 27 },
      { "title": "Tsukimichi: Moonlit Fantasy", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Fantasy", "Isekai"], "rating": 7.5, "episodes": 36 },
      { "title": "Banished From the Heroes' Party", "status": "completed", "genres": ["Adventure", "Fantasy", "Romance"], "rating": 5, "episodes": 13 },
      { "title": "The Greatest Demon Lord is Reborn as a Typical Nobody", "status": "completed", "genres": ["Action", "Fantasy", "School"], "rating": 6, "episodes": 12 },
      { "title": "I'm Quitting Heroing", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Fantasy"], "rating": 6, "episodes": 12 },
      { "title": "Wistoria: Wand and Sword", "status": "completed", "genres": ["Action", "Adventure", "Fantasy", "School", "Shounen"], "rating": 6, "episodes": 12 },
      { "title": "Tokyo Revengers", "status": "completed", "genres": ["Action", "Drama", "School", "Shounen"], "rating": 7, "episodes": 37 },
      { "title": "That Time I Got Reincarnated as a Slime", "status": "completed", "genres": ["Action", "Comedy", "Fantasy", "Isekai"], "rating": 7, "episodes": 84 },
      { "title": "Blue Lock", "status": "watching", "genres": ["Sports", "Drama", "Shounen"], "rating": 8, "episodes": 0 },
      { "title": "Loner Life in Another World", "status": "watching", "genres": ["Fantasy", "Adventure", "Isekai"], "rating": 0, "episodes": 0 },
      { "title": "Goodbye, Dragon Life", "status": "watching", "genres": ["Fantasy", "Adventure"], "rating": 0, "episodes": 0 },
      { "title": "Dandadan", "status": "watching", "genres": ["Action", "Comedy", "Supernatural"], "rating": 0, "episodes": 0 },
      { "title": "The Most Notorious 'Talker' Runs the World's Greatest Clan", "status": "watching", "genres": ["Action", "Adventure", "Fantasy"], "rating": 0, "episodes": 0 },
      { "title": "Let This Grieving Soul Retire", "status": "watching", "genres": ["Drama", "Fantasy", "Comedy"], "rating": 0, "episodes": 0 },
      { "title": "Mechanical Arms", "status": "watching", "genres": ["Action", "Adventure"], "rating": 0, "episodes": 0 },
      { "title": "The Healer Who Was Banished From His Party, Is, in Fact, the Strongest", "status": "watching", "genres": ["Fantasy", "Adventure"], "rating": 0, "episodes": 0 },
      { "title": "Haigakura", "status": "watching", "genres": ["Fantasy", "Adventure", "Supernatural"], "rating": 0, "episodes": 0 },
      { "title": "Blue Box", "status": "watching", "genres": ["Sports", "Romance", "School"], "rating": 0, "episodes": 0 },
      { "title": "Loving Yamada at Lv999!", "status": "plan-to-watch", "genres": ["Comedy", "Drama", "Romance", "School"], "rating": 0, "episodes": 13 },
      { "title": "The Aristocrat's Otherworldly Adventure", "status": "plan-to-watch", "genres": ["Action", "Fantasy", "Romance", "Harem", "Isekai"], "rating": 0, "episodes": 12 },
      { "title": "Pokemon Journeys: The Series", "status": "plan-to-watch", "genres": ["Action", "Adventure", "Comedy", "Fantasy"], "rating": 0, "episodes": 146 },
      { "title": "Your Name", "status": "plan-to-watch", "genres": ["Drama", "Romance"], "rating": 0, "episodes": 1 },
      { "title": "My Hero Academia", "status": "dropped", "genres": ["Action", "Adventure", "School", "Shounen"], "rating": 6, "episodes": 138 },
      { "title": "Sword Art Online", "status": "dropped", "genres": ["Action", "Adventure", "Fantasy", "Romance"], "rating": 4, "episodes": 96 },
      { "title": "Sabikui Bisco", "status": "dropped", "genres": ["Action", "Adventure", "Sci-Fi"], "rating": 0, "episodes": 12 },
      { "title": "The Dawn of the Witch", "status": "dropped", "genres": ["Action", "Adventure", "Comedy", "Fantasy"], "rating": 0, "episodes": 12 },
      { "title": "The Rising of the Shield Hero", "status": "dropped", "genres": ["Action", "Adventure", "Drama", "Fantasy", "Isekai"], "rating": 6, "episodes": 50 },
      { "title": "My Stepsister is My Ex-Girlfriend", "status": "dropped", "genres": ["Romance", "Comedy"], "rating": 0, "episodes": 12 },
      { "title": "Classroom of the Elite", "status": "dropped", "genres": ["Drama", "Thriller"], "rating": 6, "episodes": 37 },
      { "title": "Rent-A-Girlfriend", "status": "dropped", "genres": ["Comedy", "Romance", "School", "Shounen", "Harem"], "rating": 7, "episodes": 36 },
      { "title": "I Got a Cheat Skill in Another World", "status": "dropped", "genres": ["Action", "Adventure", "Fantasy", "School", "Isekai"], "rating": 0, "episodes": 13 },
      { "title": "The Legendary Hero Is Dead!", "status": "dropped", "genres": ["Action", "Comedy", "Fantasy", "Harem"], "rating": 0, "episodes": 12 },
      { "title": "91 Days", "status": "dropped", "genres": ["Drama", "Action", "Thriller"], "rating": 0, "episodes": 13 },
      { "title": "Log Horizon", "status": "dropped", "genres": ["Action", "Adventure", "Fantasy", "Magic", "Isekai"], "rating": 0, "episodes": 62 },
      { "title": "Ao Ashi", "status": "dropped", "genres": ["Sports", "Drama"], "rating": 0, "episodes": 24 },
      { "title": "Rurouni Kenshin (2023)", "status": "dropped", "genres": ["Action", "Historical", "Shounen"], "rating": 0, "episodes": 24 },
      { "title": "Spy x Family", "status": "dropped", "genres": ["Action", "Comedy", "Shounen"], "rating": 0, "episodes": 38 },
      { "title": "Banished From the Hero's Party (Quiet Life)", "status": "completed", "genres": ["Action", "Adventure", "Fantasy", "Romance"], "rating": 5, "episodes": 13 },
      { "title": "One Punch Man", "status": "completed", "genres": ["Action", "Comedy", "Sci-Fi"], "rating": 8, "episodes": 24 },
      { "title": "Pokémon", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Fantasy"], "rating": 8.5, "episodes": 1269 },
      { "title": "The Daily Life of the Immortal King", "status": "completed", "genres": ["Action", "Fantasy", "Comedy", "School"], "rating": 7, "episodes": 51 },
      { "title": "The Ossan Newbie Adventurer", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Fantasy"], "rating": 6, "episodes": 12 },
      { "title": "Food Wars!", "status": "completed", "genres": ["School", "Shounen", "Comedy"], "rating": 6, "episodes": 86 },
      { "title": "Record of Ragnarok", "status": "completed", "genres": ["Action", "Fantasy"], "rating": 8, "episodes": 26 },
      { "title": "My Isekai Life", "status": "completed", "genres": ["Action", "Fantasy", "Isekai"], "rating": 6, "episodes": 12 },
      { "title": "The Genius Prince's Guide to Raising a Nation Out of Debt", "status": "completed", "genres": ["Action", "Adventure", "Comedy"], "rating": 6, "episodes": 12 },
      { "title": "The Eminence in Shadow", "status": "completed", "genres": ["Action", "Comedy", "Fantasy", "Isekai"], "rating": 7.5, "episodes": 32 },
      { "title": "Dr. Stone", "status": "completed", "genres": ["Adventure", "Comedy", "Sci-Fi", "Shounen"], "rating": 8, "episodes": 35 },
      { "title": "The Misfit of Demon King Academy", "status": "completed", "genres": ["Action", "Fantasy", "School"], "rating": 7, "episodes": 35 },
      { "title": "Dragon Ball (All)", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Fantasy", "Shounen"], "rating": 9, "episodes": 806 },
      { "title": "The Seven Deadly Sins", "status": "completed", "genres": ["Action", "Adventure", "Fantasy", "Shounen"], "rating": 7, "episodes": 100 },
      { "title": "The Case Study of Vanitas", "status": "dropped", "genres": ["Fantasy", "Shounen", "Action"], "rating": 0, "episodes": 24 },
      { "title": "Mushoku Tensei: Jobless Reincarnation", "status": "completed", "genres": ["Adventure", "Fantasy", "Isekai"], "rating": 8.5, "episodes": 49 },
      { "title": "Hell's Paradise", "status": "completed", "genres": ["Action", "Adventure", "Fantasy", "Shounen"], "rating": 8, "episodes": 13 },
      { "title": "Mashle: Magic and Muscles", "status": "completed", "genres": ["Action", "Comedy", "Fantasy", "School", "Shounen"], "rating": 6, "episodes": 24 },
      { "title": "Ninja Kamui", "status": "completed", "genres": ["Action", "Sci-Fi"], "rating": 6, "episodes": 13 },
      { "title": "Assassination Classroom", "status": "completed", "genres": ["Action", "Comedy", "School", "Shounen"], "rating": 6.5, "episodes": 47 },
      { "title": "Kaiju No. 8", "status": "completed", "genres": ["Action", "Adventure", "Sci-Fi", "Shounen"], "rating": 6, "episodes": 12 },
      { "title": "The New Gate", "status": "completed", "genres": ["Action", "Adventure", "Fantasy", "Isekai"], "rating": 6, "episodes": 12 },
      { "title": "I Was Reincarnated as the 7th Prince", "status": "completed", "genres": ["Adventure", "Fantasy", "Magic"], "rating": 6, "episodes": 12 },
      { "title": "Shangri-La Frontier", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Fantasy", "Shounen"], "rating": 7, "episodes": 25 },
      { "title": "The Unwanted Undead Adventurer", "status": "completed", "genres": ["Action", "Adventure", "Fantasy"], "rating": 6, "episodes": 12 },
      { "title": "Undead Unluck", "status": "completed", "genres": ["Action", "Comedy", "Shounen"], "rating": 6, "episodes": 24 },
      { "title": "The Wrong Way to Use Healing Magic", "status": "completed", "genres": ["Action", "Comedy", "Fantasy", "Isekai"], "rating": 6, "episodes": 13 },
      { "title": "Bucchigiri?!", "status": "completed", "genres": ["Action", "School", "Supernatural"], "rating": 6, "episodes": 12 },
      { "title": "Wind Breaker", "status": "completed", "genres": ["Action", "Comedy", "Drama", "School"], "rating": 6, "episodes": 13 },
      { "title": "Aesthetica of a Rogue Hero", "status": "completed", "genres": ["Action", "Fantasy"], "rating": 5, "episodes": 12 },
      { "title": "Godzilla: Planet of the Monsters", "status": "completed", "genres": ["Action", "Adventure", "Sci-Fi"], "rating": 7.6, "episodes": 1 },
      { "title": "Doraemon", "status": "completed", "genres": ["Comedy", "Sci-Fi", "Shounen"], "rating": 8.5, "episodes": 1315 },
      { "title": "Battle Game in 5 Seconds", "status": "completed", "genres": ["Action", "Supernatural"], "rating": 6, "episodes": 12 },
      { "title": "Code Geass", "status": "completed", "genres": ["Action", "Drama", "Mecha", "Sci-Fi"], "rating": 10, "episodes": 50 },
      { "title": "Boruto: Naruto Next Generations", "status": "completed", "genres": ["Action", "Adventure", "Shounen"], "rating": 5.5, "episodes": 293 },
      { "title": "Black Lagoon", "status": "completed", "genres": ["Action"], "rating": 6, "episodes": 24 },
      { "title": "Black Bullet", "status": "completed", "genres": ["Action", "Mystery", "Sci-Fi"], "rating": 6, "episodes": 13 },
      { "title": "Baki", "status": "completed", "genres": ["Action", "Sports", "Shounen"], "rating": 5.5, "episodes": 65 },
      { "title": "Mob Psycho 100", "status": "completed", "genres": ["Action", "Comedy", "Supernatural"], "rating": 7.5, "episodes": 37 },
      { "title": "An Archdemon's Dilemma: How to Love Your Elf Bride", "status": "completed", "genres": ["Action", "Fantasy", "Romance"], "rating": 5.5, "episodes": 12 },
      { "title": "Welcome to Demon School! Iruma-kun", "status": "completed", "genres": ["Comedy", "Fantasy", "School", "Shounen", "Isekai"], "rating": 6.5, "episodes": 65 },
      { "title": "Chillin' in Another World with Level 2 Super Cheat Powers", "status": "completed", "genres": ["Adventure", "Fantasy", "Romance", "Isekai"], "rating": 6.2, "episodes": 12 },
      { "title": "Kuroko's Basketball", "status": "completed", "genres": ["Comedy", "School", "Shounen", "Sports"], "rating": 7, "episodes": 75 },
      { "title": "Dinosaur King", "status": "completed", "genres": ["Adventure", "Fantasy", "Action"], "rating": 7, "episodes": 50 },
      { "title": "Vermeil in Gold", "status": "completed", "genres": ["Fantasy", "School", "Shounen"], "rating": 6.8, "episodes": 12 },
      { "title": "I Want to Eat Your Pancreas", "status": "completed", "genres": ["Drama", "Romance"], "rating": 7.4, "episodes": 1 },
      { "title": "High School DxD", "status": "completed", "genres": ["Comedy", "Romance", "School", "Harem", "Action"], "rating": 8, "episodes": 50 },
      { "title": "Cells at Work!", "status": "completed", "genres": ["Action", "Comedy", "Drama"], "rating": 7.2, "episodes": 34 },
      { "title": "The Devil is a Part-Timer!", "status": "completed", "genres": ["Comedy", "Fantasy", "Romance"], "rating": 6.7, "episodes": 37 },
      { "title": "Haikyuu!!", "status": "completed", "genres": ["Comedy", "Drama", "School", "Shounen", "Sports"], "rating": 8, "episodes": 85 },
      { "title": "Black Clover", "status": "completed", "genres": ["Action", "Comedy", "Fantasy", "Magic", "Shounen"], "rating": 8, "episodes": 170 },
      { "title": "Gintama", "status": "completed", "genres": ["Action", "Comedy", "Adventure", "Shounen"], "rating": 9, "episodes": 367 },
      { "title": "Gurren Lagann", "status": "completed", "genres": ["Mecha", "Adventure", "Comedy", "Sci-Fi"], "rating": 8, "episodes": 27 },
      { "title": "Hyouka", "status": "completed", "genres": ["Mystery", "Slice of Life", "School", "Romance"], "rating": 8, "episodes": 22 },
      { "title": "Kill la Kill", "status": "completed", "genres": ["Action", "Comedy", "Supernatural", "School"], "rating": 7, "episodes": 24 },
      { "title": "Dies Irae", "status": "completed", "genres": ["Action", "Supernatural", "Thriller"], "rating": 7, "episodes": 17 },
      { "title": "Monster", "status": "completed", "genres": ["Psychological", "Thriller", "Drama", "Mystery"], "rating": 9, "episodes": 74 },
      { "title": "Mushishi", "status": "completed", "genres": ["Supernatural", "Slice of Life", "Mystery"], "rating": 8, "episodes": 26 },
      { "title": "Neon Genesis Evangelion", "status": "completed", "genres": ["Mecha", "Psychological", "Drama", "Sci-Fi"], "rating": 9, "episodes": 26 },
      { "title": "Paranoia Agent", "status": "completed", "genres": ["Mystery", "Psychological", "Thriller", "Supernatural"], "rating": 8, "episodes": 13 },
      { "title": "Parasyte: The Maxim", "status": "completed", "genres": ["Sci-Fi", "Horror", "Action", "Psychological"], "rating": 8, "episodes": 24 },
      { "title": "Steins;Gate", "status": "completed", "genres": ["Sci-Fi", "Psychological", "Drama", "Thriller"], "rating": 9, "episodes": 24 },
      { "title": "Trigun", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Sci-Fi"], "rating": 8, "episodes": 26 },
      { "title": "Violet Evergarden", "status": "completed", "genres": ["Drama", "Fantasy", "Romance"], "rating": 9, "episodes": 13 },
      { "title": "The Vision of Escaflowne", "status": "completed", "genres": ["Action", "Adventure", "Mecha", "Fantasy"], "rating": 8, "episodes": 26 },
      { "title": "YuYu Hakusho", "status": "completed", "genres": ["Supernatural", "Action", "Comedy", "Shounen"], "rating": 6.9, "episodes": 112 },
      { "title": "Cowboy Bebop", "status": "completed", "genres": ["Action", "Adventure", "Comedy", "Sci-Fi"], "rating": 8, "episodes": 26 },
      { "title": "Cyberpunk: Edgerunners", "status": "completed", "genres": ["Sci-Fi", "Action", "Adventure"], "rating": 7, "episodes": 10 },
      { "title": "Bocchi the Rock!", "status": "completed", "genres": ["Slice of Life", "Comedy", "Music", "School"], "rating": 7, "episodes": 12 },
      { "title": "Ranking of Kings", "status": "completed", "genres": ["Action", "Fantasy", "Drama", "Adventure"], "rating": 5.5, "episodes": 23 },
      { "title": "Deca-Dence", "status": "completed", "genres": ["Sci-Fi", "Action", "Adventure"], "rating": 6.5, "episodes": 12 },
      { "title": "Erased", "status": "completed", "genres": ["Mystery", "Drama", "Psychological", "Thriller"], "rating": 7, "episodes": 13 },
      { "title": "Ouran High School Host Club", "status": "completed", "genres": ["Comedy", "Romance", "School", "Shoujo"], "rating": 8, "episodes": 26 },
      { "title": "Puella Magi Madoka Magica", "status": "completed", "genres": ["Psychological", "Drama", "Fantasy"], "rating": 7.1, "episodes": 12 },
      { "title": "Anohana: The Flower We Saw That Day", "status": "completed", "genres": ["Drama", "Fantasy", "Romance"], "rating": 8, "episodes": 11 },
      { "title": "Clannad", "status": "completed", "genres": ["Romance", "Drama", "Slice of Life", "School"], "rating": 8, "episodes": 47 },
      { "title": "Darling in the Franxx", "status": "completed", "genres": ["Sci-Fi", "Action", "Drama", "Mecha"], "rating": 7.5, "episodes": 24 },
      { "title": "Gabriel DropOut", "status": "completed", "genres": ["Comedy", "Slice of Life", "School"], "rating": 7.4, "episodes": 13 },
      { "title": "Plunderer", "status": "completed", "genres": ["Fantasy", "Action", "Romance"], "rating": 7.0, "episodes": 24 },
      { "title": "Tokyo 24th Ward", "status": "completed", "genres": ["Mystery", "Drama", "Sci-Fi"], "rating": 6.9, "episodes": 13 },
      { "title": "Seiren", "status": "completed", "genres": ["School", "Romance", "Slice of Life"], "rating": 7.3, "episodes": 12 },
      { "title": "Sleepy Princess in the Demon Castle", "status": "completed", "genres": ["Comedy", "Fantasy"], "rating": 7.6, "episodes": 12 },
      { "title": "Accel World", "status": "completed", "genres": ["Action", "Sci-Fi", "Romance"], "rating": 7.2, "episodes": 24 },
      { "title": "Orange", "status": "completed", "genres": ["Romance", "Drama", "School", "Supernatural"], "rating": 7.0, "episodes": 13 },
      { "title": "Occultic;Nine", "status": "completed", "genres": ["Supernatural", "Mystery", "Thriller"], "rating": 6.5, "episodes": 12 },
      { "title": "Domestic Girlfriend", "status": "completed", "genres": ["Romance", "Comedy", "Drama", "School"], "rating": 7.9, "episodes": 12 },
      { "title": "Gleipnir", "status": "completed", "genres": ["Action", "Mystery", "Horror"], "rating": 7.7, "episodes": 13 },
      { "title": "Children of the Whales", "status": "completed", "genres": ["Fantasy", "Drama", "Adventure"], "rating": 7.4, "episodes": 12 },
      { "title": "Plastic Memories", "status": "completed", "genres": ["Romance", "Sci-Fi", "Drama"], "rating": 7.2, "episodes": 13 },
      { "title": "Arifureta: From Commonplace to World's Strongest", "status": "completed", "genres": ["Action", "Fantasy", "Isekai", "Harem"], "rating": 6.9, "episodes": 25 },
      { "title": "A Place Further than the Universe", "status": "completed", "genres": ["Slice of Life", "Drama", "Adventure"], "rating": 7.8, "episodes": 13 },
      { "title": "Wise Man's Grandchild", "status": "completed", "genres": ["Fantasy", "Isekai", "Magic", "Romance"], "rating": 7.6, "episodes": 12 },
      { "title": "Given", "status": "completed", "genres": ["Drama", "Music", "Romance", "Slice of Life"], "rating": 7.3, "episodes": 11 },
      { "title": "Midnight Occult Civil Servants", "status": "completed", "genres": ["Supernatural", "Mystery", "Fantasy"], "rating": 7.1, "episodes": 12 },
      { "title": "Overlord II", "status": "completed", "genres": ["Action", "Fantasy", "Isekai"], "rating": 7.2, "episodes": 13 },
      { "title": "Kiznaiver", "status": "completed", "genres": ["Sci-Fi", "Drama", "Romance", "School"], "rating": 7.0, "episodes": 12 },
      { "title": "To Your Eternity", "status": "completed", "genres": ["Fantasy", "Drama", "Action", "Adventure"], "rating": 7.5, "episodes": 20 },
      { "title": "Carole & Tuesday", "status": "completed", "genres": ["Drama", "Music", "Sci-Fi"], "rating": 7.6, "episodes": 24 },
      { "title": "Ghost Hound", "status": "completed", "genres": ["Mystery", "Supernatural", "Thriller", "Psychological"], "rating": 7.4, "episodes": 22 },
      { "title": "Ergo Proxy", "status": "completed", "genres": ["Sci-Fi", "Psychological", "Thriller"], "rating": 7.9, "episodes": 23 },
      { "title": "Kekkai Sensen", "status": "completed", "genres": ["Action", "Fantasy", "Supernatural", "Comedy"], "rating": 7.4, "episodes": 12 },
      { "title": "Lovely★Complex", "status": "completed", "genres": ["Comedy", "Romance", "Slice of Life", "School"], "rating": 7.5, "episodes": 24 },
      { "title": "Charlotte", "status": "completed", "genres": ["Supernatural", "Drama", "School"], "rating": 6.9, "episodes": 13 },
      { "title": "Gosick", "status": "completed", "genres": ["Mystery", "Historical", "Supernatural", "Romance"], "rating": 7.1, "episodes": 24 },
      { "title": "My Little Monster", "status": "completed", "genres": ["Comedy", "School", "Romance", "Shoujo"], "rating": 7.2, "episodes": 13 },
      { "title": "Aldnoah.Zero", "status": "completed", "genres": ["Sci-Fi", "Mecha", "Action", "Drama"], "rating": 7.6, "episodes": 24 },
      { "title": "Zankyou no Terror", "status": "completed", "genres": ["Action", "Mystery", "Thriller"], "rating": 7.0, "episodes": 11 },
      { "title": "Barakamon", "status": "completed", "genres": ["Comedy", "Slice of Life", "Drama"], "rating": 7.7, "episodes": 12 },
      { "title": "Nana", "status": "completed", "genres": ["Drama", "Romance", "Music", "Slice of Life"], "rating": 7.6, "episodes": 47 },
      { "title": "Another", "status": "completed", "genres": ["Horror", "Supernatural", "Mystery", "Thriller"], "rating": 7.5, "episodes": 12 },
      { "title": "ID: INVADED", "status": "completed", "genres": ["Sci-Fi", "Psychological", "Mystery"], "rating": 6.8, "episodes": 13 },
      { "title": "Golden Time", "status": "completed", "genres": ["Comedy", "Romance", "Drama", "Slice of Life"], "rating": 7.0, "episodes": 24 },
      { "title": "Grimgar: Ashes and Illusions", "status": "completed", "genres": ["Action", "Fantasy", "Adventure", "Drama"], "rating": 7.3, "episodes": 12 },
      { "title": "Beelzebub", "status": "completed", "genres": ["Comedy", "Shounen", "School", "Action", "Supernatural"], "rating": 6.9, "episodes": 60 },
      { "title": "Usagi Drop", "status": "completed", "genres": ["Slice of Life", "Drama"], "rating": 7.8, "episodes": 11 },
      { "title": "Scum's Wish", "status": "completed", "genres": ["Romance", "Drama", "School"], "rating": 6.4, "episodes": 12 },
      { "title": "Kyoukai no Kanata", "status": "completed", "genres": ["Action", "Fantasy", "Supernatural", "Romance"], "rating": 6.7, "episodes": 12 },
      { "title": "Guilty Crown", "status": "completed", "genres": ["Action", "Sci-Fi", "Drama", "Mecha"], "rating": 7.4, "episodes": 22 },
      { "title": "Nisekoi", "status": "completed", "genres": ["Comedy", "Romance", "School", "Shounen", "Harem"], "rating": 7.0, "episodes": 32 },
      { "title": "Run with the Wind", "status": "completed", "genres": ["Sports", "Slice of Life", "Drama"], "rating": 7.3, "episodes": 23 },
      { "title": "Azumanga Daioh", "status": "completed", "genres": ["Comedy", "School", "Slice of Life"], "rating": 6.8, "episodes": 26 },
      { "title": "Boogiepop and Others", "status": "completed", "genres": ["Sci-Fi", "Horror", "Psychological", "Mystery"], "rating": 6.6, "episodes": 18 },
      { "title": "Shiki", "status": "completed", "genres": ["Mystery", "Supernatural", "Thriller", "Horror"], "rating": 7.4, "episodes": 22 },
      { "title": "Peach Girl", "status": "completed", "genres": ["Romance", "Drama", "School", "Shoujo"], "rating": 7.5, "episodes": 25 },
      { "title": "Deadman Wonderland", "status": "completed", "genres": ["Sci-Fi", "Action", "Horror", "Psychological"], "rating": 7.1, "episodes": 12 },
      { "title": "Kids on the Slope", "status": "completed", "genres": ["Drama", "Music", "Slice of Life", "Romance"], "rating": 7.6, "episodes": 12 },
      { "title": "Kamisama Kiss", "status": "completed", "genres": ["Romance", "Comedy", "Fantasy", "Shoujo"], "rating": 7.0, "episodes": 25 },
      { "title": "School Days", "status": "completed", "genres": ["Psychological", "Drama", "Horror", "School"], "rating": 6.9, "episodes": 12 },
      { "title": "No Game No Life: Zero", "status": "completed", "genres": ["Fantasy", "Action", "Adventure"], "rating": 7.3, "episodes": 1 },
      { "title": "Honey and Clover", "status": "completed", "genres": ["Comedy", "Romance", "Drama", "Slice of Life"], "rating": 7.4, "episodes": 36 },
      { "title": "Blue Exorcist", "status": "completed", "genres": ["Action", "Fantasy", "Supernatural", "Shounen"], "rating": 6.8, "episodes": 25 },
      { "title": "Inu x Boku SS", "status": "completed", "genres": ["Romance", "Supernatural", "Comedy"], "rating": 7.5, "episodes": 13 },
      { "title": "Boogiepop Phantom", "status": "completed", "genres": ["Psychological", "Horror", "Thriller", "Mystery"], "rating": 7.7, "episodes": 12 },
      { "title": "True Tears", "status": "completed", "genres": ["Romance", "School", "Drama"], "rating": 7.0, "episodes": 13 },
      { "title": "Drifters", "status": "completed", "genres": ["Action", "Fantasy", "Historical", "Comedy"], "rating": 6.9, "episodes": 12 },
      { "title": "5 Centimeters per Second", "status": "completed", "genres": ["Drama", "Romance"], "rating": 7.6, "episodes": 1 },
      { "title": "Video Girl Ai", "status": "completed", "genres": ["Sci-Fi", "Romance", "Slice of Life", "Drama"], "rating": 7.5, "episodes": 6 },
      { "title": "Big Order", "status": "completed", "genres": ["Fantasy", "Action", "Psychological"], "rating": 6.5, "episodes": 10 },
      { "title": "Chrome Shelled Regios", "status": "completed", "genres": ["Sci-Fi", "Action", "Fantasy", "Romance"], "rating": 7.2, "episodes": 24 },
      { "title": "Battery", "status": "completed", "genres": ["Drama", "Sports", "Slice of Life"], "rating": 7.3, "episodes": 11 },
      { "title": "Natsuyuki Rendezvous", "status": "completed", "genres": ["Supernatural", "Romance", "Slice of Life"], "rating": 7.4, "episodes": 11 },
      { "title": "Fuuka", "status": "completed", "genres": ["Romance", "Drama", "Music", "School"], "rating": 7.1, "episodes": 12 },
      { "title": "Magical Girl Site", "status": "completed", "genres": ["Action", "Psychological", "Horror"], "rating": 6.8, "episodes": 12 },
      { "title": "Fate/Apocrypha", "status": "completed", "genres": ["Action", "Fantasy", "Magic"], "rating": 7.3, "episodes": 25 },
      { "title": "Welcome to the NHK", "status": "completed", "genres": ["Psychological", "Drama", "Comedy"], "rating": 7.7, "episodes": 24 },
      { "title": "Kimi ni Todoke", "status": "completed", "genres": ["Romance", "Comedy", "Drama", "School", "Shoujo"], "rating": 7.5, "episodes": 37 },
      { "title": "Granblue Fantasy The Animation", "status": "completed", "genres": ["Fantasy", "Adventure", "Action"], "rating": 7.3, "episodes": 13 },
      { "title": "Terra Formars", "status": "completed", "genres": ["Sci-Fi", "Adventure", "Action"], "rating": 7.4, "episodes": 13 },
      { "title": "Sword Gai: The Animation", "status": "completed", "genres": ["Action", "Supernatural", "Fantasy"], "rating": 7.3, "episodes": 24 },
      { "title": "Binbougami ga!", "status": "completed", "genres": ["Comedy", "Fantasy", "Supernatural", "Shounen"], "rating": 7.1, "episodes": 13 },
      { "title": "Sankarea", "status": "completed", "genres": ["Romance", "Drama", "Horror", "Comedy"], "rating": 7.6, "episodes": 12 },
      { "title": "Arslan Senki", "status": "completed", "genres": ["Action", "Historical", "Fantasy", "Adventure"], "rating": 7.5, "episodes": 25 },
      { "title": "Asobi Asobase", "status": "completed", "genres": ["Comedy", "School", "Slice of Life"], "rating": 7.0, "episodes": 12 },
      { "title": "Yamishibai: Japanese Ghost Stories", "status": "completed", "genres": ["Horror", "Supernatural"], "rating": 7.1, "episodes": 13 },
      { "title": "Voices of a Distant Star", "status": "completed", "genres": ["Romance", "Sci-Fi", "Drama"], "rating": 7.2, "episodes": 1 },
      { "title": "B: The Beginning", "status": "completed", "genres": ["Action", "Supernatural", "Mystery", "Thriller"], "rating": 7.6, "episodes": 18 },
      { "title": "Blassreiter", "status": "completed", "genres": ["Sci-Fi", "Action", "Thriller"], "rating": 7.4, "episodes": 24 },
      { "title": "Red Data Girl", "status": "completed", "genres": ["Fantasy", "Supernatural", "Romance", "School"], "rating": 7.3, "episodes": 12 },
      { "title": "Glasslip", "status": "completed", "genres": ["Romance", "Drama", "Slice of Life", "School", "Supernatural"], "rating": 7.1, "episodes": 13 },
      { "title": "Frieren: Beyond Journey's End", "status": "completed", "genres": ["Action", "Fantasy", "Adventure", "Drama"], "rating": 7.5, "episodes": 28 },
      { "title": "Heavenly Delusion", "status": "completed", "genres": ["Sci-Fi", "Drama", "Mystery", "Supernatural"], "rating": 6.9, "episodes": 13 },
      { "title": "Insomniacs After School", "status": "completed", "genres": ["Romance", "Comedy", "School", "Slice of Life"], "rating": 7.1, "episodes": 13 },
      { "title": "Undead Girl Murder Farce", "status": "completed", "genres": ["Action", "Supernatural", "Mystery"], "rating": 6.4, "episodes": 13 },
      { "title": "Blue Orchestra", "status": "completed", "genres": ["Drama", "Music", "Romance", "School"], "rating": 7.9, "episodes": 13 },
      { "title": "Reign of the Seven Spellblades", "status": "completed", "genres": ["Fantasy", "Adventure", "Action", "School"], "rating": 7.5, "episodes": 13 },
      { "title": "The Dangers in My Heart", "status": "completed", "genres": ["Comedy", "Romance", "School", "Slice of Life"], "rating": 6.1, "episodes": 24 },
      { "title": "My Happy Marriage", "status": "completed", "genres": ["Romance", "Drama", "Fantasy"], "rating": 7.4, "episodes": 12 },
      { "title": "No Guns Life", "status": "completed", "genres": ["Action", "Sci-Fi", "Drama"], "rating": 6.5, "episodes": 24 },
      { "title": "Helck", "status": "completed", "genres": ["Fantasy", "Adventure", "Comedy", "Action"], "rating": 7.9, "episodes": 26 },
      { "title": "Solo Leveling", "status": "completed", "genres": ["Action", "Adventure", "Fantasy"], "rating": 7.5, "episodes": 12 },
      { "title": "My Dress-Up Darling", "status": "completed", "genres": ["Romance", "Comedy", "School", "Drama"], "rating": 6.9, "episodes": 12 },
      { "title": "Edens Zero", "status": "completed", "genres": ["Sci-Fi", "Action", "Adventure", "Fantasy"], "rating": 6.4, "episodes": 25 },
      { "title": "Skip and Loafer", "status": "completed", "genres": ["Comedy", "Slice of Life", "School", "Romance"], "rating": 7.5, "episodes": 13 },
      { "title": "Aoashi", "status": "completed", "genres": ["Sports", "Drama", "School"], "rating": 7.9, "episodes": 24 },
      { "title": "More Than a Married Couple, But Not Lovers", "status": "completed", "genres": ["Romance", "Comedy", "School"], "rating": 7.4, "episodes": 13 },
      { "title": "Call of the Night", "status": "completed", "genres": ["Action", "Supernatural", "Romance"], "rating": 6.5, "episodes": 13 },
      { "title": "Baka & Test: Summon the Beasts", "status": "plan-to-watch", "genres": ["Comedy", "Romance", "School"], "rating": 6, "episodes": 13 },
    ]

def search_anime(query):
    """Search for anime using Jikan API."""
    encoded = urllib.parse.quote(query)
    url = f"https://api.jikan.moe/v4/anime?q={encoded}&limit=1&sfw=true"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "AnimeMigration/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
        result = data.get("data", [])
        return result[0] if result else None
    except Exception as e:
        print(f"    [!] API error for '{query}': {e}")
        return None


def extract_image_url(anime_data):
    """Extract best quality image URL from API data."""
    if not anime_data:
        return FALLBACK_IMG
    
    images = anime_data.get("images", {}).get("jpg", {})
    return images.get("large_image_url") or images.get("image_url") or FALLBACK_IMG


def migrate_anime(anime_obj, index, total):
    """Migrate a single anime entry."""
    title = anime_obj.get("title", "")
    print(f"  [{index + 1}/{total}] Fetching: {title}")
    
    # Fetch from API
    time.sleep(0.4)  # Rate limiting
    api_data = search_anime(title)
    
    if api_data:
        image_url = extract_image_url(api_data)
        japanese_title = api_data.get("title_japanese", "")
        synopsis = (api_data.get("synopsis") or "").replace("[Written by MAL Rewrite]", "").strip()
        mal_score = api_data.get("score")
        anime_type = api_data.get("type", "")
        year = (api_data.get("aired") or {}).get("prop", {}).get("from", {}).get("year")
        print(f"    ✓ Found image: {image_url[:60]}...")
    else:
        image_url = FALLBACK_IMG
        japanese_title = ""
        synopsis = ""
        mal_score = None
        anime_type = ""
        year = None
        print(f"    ⚠ Using fallback image")
    
    return {
        "title": title,
        "japanese_title": japanese_title,
        "status": anime_obj.get("status", "completed"),
        "genres": anime_obj.get("genres", ["Action"]),
        "rating": anime_obj.get("rating"),
        "episodes": anime_obj.get("episodes"),
        "image_url": image_url,
        "synopsis": synopsis,
        "mal_score": mal_score,
        "type": anime_type,
        "year": year
    }


def main():
    print("=" * 60)
    print("  Anime List Migration Tool")
    print("  Converting to JSON format with cached images")
    print("=" * 60)
    
    data_source = EXISTING_DATA
    
    if not data_source:
        print("\n  [!] No data found in EXISTING_DATA array")
        print("  Please paste your anime data or use the HTML parser")
        return
    
    print(f"\n  Found {len(data_source)} anime to migrate")
    print("  This will take a few minutes due to API rate limiting...")
    
    confirm = input("\n  Continue? (y/n): ").strip().lower()
    if confirm != 'y':
        print("  Cancelled.")
        return
    
    migrated = []
    print("\n  Starting migration...")
    print("─" * 60)
    
    for i, anime in enumerate(data_source):
        try:
            migrated_anime = migrate_anime(anime, i, len(data_source))
            migrated.append(migrated_anime)
        except Exception as e:
            print(f"    [!] Error migrating '{anime.get('title', 'unknown')}': {e}")
            # Add with fallback
            migrated.append({
                "title": anime.get("title", "Unknown"),
                "japanese_title": "",
                "status": anime.get("status", "completed"),
                "genres": anime.get("genres", ["Action"]),
                "rating": anime.get("rating"),
                "episodes": anime.get("episodes"),
                "image_url": FALLBACK_IMG,
                "synopsis": "",
                "mal_score": None,
                "type": "",
                "year": None
            })
    
    cache = {
        "last_updated": time.strftime("%Y-%m-%d"),
        "anime": migrated
    }
    
    print("\n" + "─" * 60)
    print(f"  Saving to {JSON_FILE}...")
    
    try:
        with open(JSON_FILE, "w", encoding="utf-8") as f:
            json.dump(cache, f, indent=2, ensure_ascii=False)
        print(f"  ✓ Successfully saved {len(migrated)} anime entries!")
        print(f"\n  Next steps:")
        print(f"  1. Review {JSON_FILE}")
        print(f"  2. Use add_anime.py to add new anime going forward")
    except Exception as e:
        print(f"  [!] Error saving JSON: {e}")


if __name__ == "__main__":
    main()