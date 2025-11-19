import json
import csv
from pathlib import Path
from rapidfuzz import fuzz, process
import re
import argparse

volumes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]

# parser = argparse.ArgumentParser()
# parser.add_argument("--volume", type=int, required=True, help="Volume number to process")
# args = parser.parse_args()

output_json = []

output_dir = Path(f"letters/volumes/seeds")
output_dir.mkdir(exist_ok=True)

for volume in volumes:
    # ===== CONFIGURATION =====
    letter_titles = Path(f"letters/volumes/processed/titles/{volume}/letter-titles.json")
    letter_metadata = Path(f"letters/volumes/processed/metadata-llm/{volume}")
    letter_text = Path(f"letters/volumes/processed/letters-llm/{volume}")
    letter_semantic = Path(f"letters/volumes/processed/semantic/{volume}")
    letter_commentary = Path(f"letters/volumes/processed/commentary-llm/{volume}")
    letter_translation = Path(f"letters/volumes/processed/translations/{volume}")
    letter_sources_1 = Path("letters/external/dutch/all-sources.json")
    letter_sources_2 = Path("letters/external/bodleian/all-sources.json")

    # ===== LOAD INPUTS =====
    letter_sources_1_json = json.loads(letter_sources_1.read_text(encoding="utf-8"))
    letter_sources_2_json = json.loads(letter_sources_2.read_text(encoding="utf-8"))
    letter_titles = json.loads(letter_titles.read_text(encoding="utf-8"))
    letters = letter_titles.get("letters", letter_titles)


    places = []

    volume = int(volume)

    for idx, letter in enumerate(letters): 

        letter_number = letter["letter_number"]
        page_array = letter["page_number"].split('-')
        page_number = page_array[1]
        page_numbers = []

        print (f"Reading letter {letter_number}")

        if idx + 1 < len(letters):
            next_letter = letters[idx + 1]
            next_page_array = next_letter["page_number"].split('-')
            next_page_number = next_page_array[1]
            pages = int(next_page_number) - int(page_number)
            if pages > 0:
                for i in range(int(next_page_number) - int(page_number)):
                    page_numbers.append(int(page_number) + i)
                page_numbers.append(int(next_page_number))
            else:
                page_numbers = [int(page_number), int(page_number) + 1]
        else: 
            page_numbers = [int(page_number), int(page_number) + 1]
        
        commentary = ""

        metadata = json.loads(Path(letter_metadata / f"letter-{letter_number}-metadata.json").read_text(encoding="utf-8"))
        semantic = json.loads(Path(letter_semantic / f"letter-{letter_number}-metadata-semantic.json").read_text(encoding="utf-8"))
        translation = Path(letter_translation / f"letter-{letter_number}-text-translation.txt").read_text(encoding="utf-8")
        if Path(letter_commentary / f"letter-{letter_number}-commentary.txt").exists():
            commentary = Path(letter_commentary / f"letter-{letter_number}-commentary.txt").read_text(encoding="utf-8")
        text = Path(letter_text / f"letter-{letter_number}-text.txt").read_text(encoding="utf-8")
        
        if not len(semantic["keywords"]) > 0:
            next_letter_number = int(letter_number) + 1
            while True:
                metadata = json.loads(Path(letter_metadata / f"letter-{next_letter_number}-metadata.json").read_text(encoding="utf-8"))
                semantic = json.loads(Path(letter_semantic / f"letter-{next_letter_number}-metadata-semantic.json").read_text(encoding="utf-8"))
                translation = Path(letter_translation / f"letter-{next_letter_number}-text-translation.txt").read_text(encoding="utf-8")
                if Path(letter_commentary / f"letter-{next_letter_number}-commentary.txt").exists():
                    commentary = Path(letter_commentary / f"letter-{next_letter_number}-commentary.txt").read_text(encoding="utf-8")
                text = Path(letter_text / f"letter-{next_letter_number}-text.txt").read_text(encoding="utf-8")

                if len(semantic["keywords"]) > 0:
                    break
                else:
                    next_letter_number = next_letter_number + 1

        # Removing any numbers from the text
        no_numbers_text = re.sub(r'[ \t]+', ' ', re.sub(r'\d+', '', text)).strip()

        # Removing the title from the text
        def remove_title_fuzzy(text, title):
            lines = text.strip().splitlines()
            best_i, best_score = 0, 0

            # Find the most similar early line to the known title
            for i, line in enumerate(lines[:8]):  # allow a few more lines just in case
                score = fuzz.ratio(title.lower(), line.lower())
                if score > best_score:
                    best_score, best_i = score, i

            # If we have a strong match, skip everything until real prose starts
            if best_score > 60:
                cutoff = best_i + 1
                while cutoff < len(lines):
                    line = lines[cutoff].strip()
                    # Stop removing once we hit a line that *looks like prose*
                    if (
                        len(line) > 20
                        and re.search(r'[a-z]', line)  # contains lowercase letters
                        and not re.search(r'\b(SALVTEM|SALUTEM|S\.?\s?[DP]\.?)\b', line)
                    ):
                        break
                    cutoff += 1
            else:
                cutoff = 0

            return "\n".join(lines[cutoff:]).strip()

        cleaned_text = remove_title_fuzzy(no_numbers_text, metadata["letter_title_latin"])

        # Date cleanups
        year_match = re.search(r'\b(\d{4})\b', metadata['date'])
        year = year_match.group(1) if year_match else 0

        month_pattern = r'\b(January|Jan\.?|February|Feb\.?|March|Mar\.?|April|Apr\.?|May|June|Jun\.?|July|Jul\.?|August|Aug\.?|September|Sept?\.?|October|Oct\.?|November|Nov\.?|December|Dec\.?)\b'
        month_match = re.search(month_pattern, metadata['date'], re.IGNORECASE)
        month_map = {
            "january": 1, "jan": 1,
            "february": 2, "feb": 2,
            "march": 3, "mar": 3,
            "april": 4, "apr": 4,
            "may": 5,
            "june": 6, "jun": 6,
            "july": 7, "jul": 7,
            "august": 8, "aug": 8,
            "september": 9, "sept": 9, "sep": 9,
            "october": 10, "oct": 10,
            "november": 11, "nov": 11,
            "december": 12, "dec": 12
        }
        if month_match:
            month_name = month_match.group(1).lower().rstrip('.')
            month = month_map.get(month_name, 0)
        else:
            month = 0

        season_pattern = r'\b(Spring|Summer|Autumn|Fall|Winter)\b'
        season_match = re.search(season_pattern, metadata['date'], re.IGNORECASE)
        season_map = {
            "spring": 1,
            "summer": 2,
            "autumn": 3, "fall": 3,
            "winter": 4
        }
        if season_match:
            season_name = season_match.group(1).lower()
            season = season_map.get(season_name, 0)
        else:
            season = 0
        
        day_pattern = r'\b([0-2]?\d|3[01])\b'
        day_match = re.search(day_pattern, metadata['date'])
        day = day_match.group(1) if day_match else 0

        places.append(metadata["place"])

        #matching sources 
        def find_by_number(all_data, target_number):
            # Normalize
            target_number = target_number.strip().lower()

            # Extract numeric part + optional letter
            def parse_number(s):
                match = re.match(r"^(\d+)([a-z]?)$", s.lower())
                if not match:
                    return None, None
                num = int(match.group(1))
                suffix = match.group(2)
                return num, suffix

            # Parse target
            t_num, t_suffix = parse_number(target_number)
            if t_num is None:
                return None

            for item in all_data:
                n = item.get("number")
                if not n:
                    continue

                # --- 1️⃣ Exact match
                if n.lower() == target_number:
                    return item

                # --- 2️⃣ Range match like "96-100"
                range_match = re.match(r"^(\d+)([a-z]?)-(\d+)([a-z]?)$", n.lower())
                if range_match:
                    start, s_suffix, end, e_suffix = range_match.groups()
                    start, end = int(start), int(end)
                    if start <= t_num <= end:
                        return item

                # --- 3️⃣ Single numeric (no range)
                single_match = re.match(r"^(\d+)([a-z]?)$", n.lower())
                if single_match:
                    s_num, s_suffix = parse_number(n)
                    # Exact suffix must match (so 95 != 95b)
                    if s_num == t_num and s_suffix == t_suffix:
                        return item
            return None

        def find_by_number_2(all_data, target_number):
            for item in all_data:
                n = item.get("allen_number")
                if n:
                    if n.lower() == target_number + '.' :
                        return item

        matching_source = find_by_number(letter_sources_1_json, letter_number)
        matching_bodleian_source = find_by_number_2(letter_sources_2_json, letter_number)

        letter_json = {
            "volume" : volume,
            "reference" : letter_number,
            "pages" : page_numbers,
            "year" : year,
            "month" : month,
            "season" : season,
            "day" : day,
            "date_text" : metadata["date"],
            "place_text" : metadata["place"],
            "related_to" : letter["sequence"] if "sequence" in letter else "",
            "title" : metadata["letter_title_latin"],
            "alt_title" : metadata["title"],
            "text" : cleaned_text,
            "sources" : [],
            "metadata" : {
                "summary" : semantic["summary"],
                "keywords" : semantic["keywords"],
                "themes" : semantic["themes"],
                "vector_small" : semantic["vector_small"]
            },
            "commentary" : [],
            "translations" : [{
                "translator" : "AI Deepseek",
                "text" : translation,
                "language" : "english"
            }]
        }

        if commentary:
            letter_json['commentary'].append({
                "commentator" : "Percy Stafford Allen",
                "text" : commentary
            })

        if matching_source:
            letter_json['sources'].append({
                "publication" : matching_source['book'],
                "author" : matching_source['translator'],
                "url" : matching_source['href'],
                "title" : matching_source['title']
            })
            letter_json['translations'].append({
                "language" : "nederlands",
                "translator" : matching_source['translator'],
                "url" : matching_source['href'],
                "title" : matching_source['title']
            })
            letter_json['commentary'].append({
                "commentator" : matching_source['translator'],
                "url" : matching_source['href'],
                "title" : matching_source['title']
            })

        if matching_bodleian_source:
            letter_json['origin'] = matching_bodleian_source["origin"]
            letter_json['origin_geo'] = matching_bodleian_source["origin_geo"]
            letter_json['destination'] = matching_bodleian_source["destination"]
            letter_json['destination_geo'] = matching_bodleian_source["destination_geo"]
            letter_json['author'] = re.split(r',\s*(?=[^,]*\d)', matching_bodleian_source["author"])[0]
            letter_json['recipient'] = re.split(r',\s*(?=[^,]*\d)', matching_bodleian_source["recipient"])[0]

            for source in matching_bodleian_source['sources']:
                letter_json['sources'].append({
                    "publication" : source['reference']
                })

            for resource in matching_bodleian_source['resources']:
                letter_json['sources'].append({
                    "title" : resource['text'],
                    "url" : resource['url'],
                })

            letter_json['sources'].append({
                "publication" : "Bodleian Early Modern Letters Online",
                "title" : "Bodleian Early Modern Letters Online",
                "author" : matching_bodleian_source['entered_by'],
                "url" : matching_bodleian_source['short_url'],
            })

        output_json.append(letter_json)
        # fn = f"seed-{volume}-sample-{letter_number}.json"
        # with open((output_dir / fn), "w", encoding="utf-8") as f:
        #     json.dump(letter_json, f, ensure_ascii=False, indent=2)

fn = f"letters.json"
with open((output_dir / fn), "w", encoding="utf-8") as f:
    json.dump(output_json, f, ensure_ascii=False, indent=2)

    # Placenames
    # unique_places = set()
    # for p in places:
    #     cleaned = p.strip()
    #     cleaned = cleaned.rstrip("?")  # remove uncertain marker
    #     cleaned = cleaned.strip()      # extra trim
    #     if cleaned:
    #         unique_places.add(cleaned)

    # unique_places = sorted(unique_places)

    # fn = f"placenames-{volume}.csv"
    # with open((output_dir / fn), "w", newline='', encoding="utf-8") as f:
    #     writer = csv.writer(f)
    #     writer.writerow(["place"])
    #     for place in unique_places:
    #         writer.writerow([place])
