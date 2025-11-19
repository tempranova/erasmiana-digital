import os, json, re
from openai import OpenAI
from pathlib import Path
import argparse

# parser = argparse.ArgumentParser()
# parser.add_argument("--title", type=str, required=True, help="Title number to process")
# args = parser.parse_args()

titles = [
    # "admonitio","antibarbari","apologia-debacchationes","apologia-declamatione","apologia-iacobum","apologia-in-principio",
    # "apologia-ioco",
    # "apologia-latomi","apologia-monachos","apologia-rhapsodias","apologia-sanctium","apologia-stunicae-blasphemias","apologia-stunicae-conclusiones","apologia-stunicae-prodromon","apologia-stunicae-taxata","apophthegmata","carmen-senectute","carmen-votivum","catalogus-lucubrationum","ciceronianus","colloquia","commentarius-ovidium","commentarius-prudentium","concio","de-bello-turcis","de-casa-natalitia","de-civilitate",
    # "de-conscribendis","de-constructione","de-contemptu","de-duplici","de-immensa","de-interdicto","de-libero","de-praeparatione","de-pueris","de-puritate","de-ratione","de-recta","de-sarcienda","declamatio","declamatiuncula","declarationes","detectio","disputatiuncula","dulce","ecclesiastes","enarrationes","enchiridion","encomium-matrimonii","encomium-medicae","epigrammata","epistola-archiepiscopum","epistola-contra","epistola-impudentissimos","epistola-leonem","epistola-martinum","epistola-nuncupatoria","epistola-stunicam",
    # "euripides","exhortatio","exomologesis","explanatio","expostulatio","galenus","gaza","hymni","hyperaspistes","institutio-christiani-matrimonii","institutio-principis-christiani","institutum","isocrates","libanius","lingua","lucianes","modus-confitendi","modus-orandi","moriae","obsecratio","oratio","paean","panegyricus","parabolae","paraclesis","paraphrasis-acta",
    "paraphrasis-evangelium-ioannis","paraphrasis-evangelium-lucae","paraphrasis-evangelium-marci","paraphrasis-evangelium-matthaei","paraphrasis-iacobi","paraphrasis-ioannis","paraphrasis-iudae","paraphrasis-pauli","paraphrasis-petri","paraphrasis-vallae","peregrinatio","plutarchus","precatio-dominica","precatio-pro-pace","precatio-virginis","precationes-novae",
    "psalmi","purgatio","querela","ratio","responsio-adversus","responsio-albertum","responsio-annotationes","responsio-apologeticum","responsio-collationes","responsio-petrum","responsio-phimostomum","scarabeus","sileni","spongia","supputatio","testamentum","vidua","virginis-lauretum","virginis-martyris","vita","xenophon"
]

CHUNK_SIZE = 2000       # target characters per chunk
OVERLAP = 200           # characters of overlap
ENCODING = "utf-8"

for title in titles:
    # Path to your OCR text files
    input_dir = Path(f"works/titles/processed/text-llm/{title}")
    out_dir = Path(f"works/titles/processed/sections/{title}")
    out_dir.mkdir(parents=True, exist_ok=True)

    # --- Step 1: read and combine all pages, keeping refs ---
    pages = []
    prev_last_line = ""
    for txt_file in sorted(input_dir.glob("*.txt")):
        page_num = re.search(r"(\d+)", txt_file.stem)
        page_num = int(page_num.group(1)) if page_num else None
        text = txt_file.read_text(encoding=ENCODING).strip()

        pages.append({"page": page_num, "text": text})

    full_text = "".join(p["text"] + "\n" for p in pages)

    # --- Step 2: create mapping of character offsets to pages ---
    page_boundaries = []
    pos = 0
    for p in pages:
        start = pos
        end = pos + len(p["text"])
        page_boundaries.append((start, end, p["page"]))
        pos = end + 1  # for the newline

    def pages_for_chunk(start, end):
        return [pg for (s, e, pg) in page_boundaries if not (end < s or start > e)]

    # --- Step 3: create chunks with overlap ---
    chunks = []
    i = 0
    pos = 0
    while pos < len(full_text):
        chunk_text = full_text[pos : pos + CHUNK_SIZE]
        chunk_start = pos
        chunk_end = pos + len(chunk_text)
        page_nums = pages_for_chunk(chunk_start, chunk_end)

        chunks.append({
            "id": f"split-{i}-pages-{','.join(map(str,page_nums))}",
            "text": chunk_text,
            "start": chunk_start,
            "end": chunk_end,
            "pages": page_nums
        })
        i += 1
        pos += CHUNK_SIZE - OVERLAP

    # --- Step 4: add previous/next context and write files ---
    for idx, chunk in enumerate(chunks):
        before_text = chunks[idx - 1]["text"] if idx > 0 else ""
        after_text = chunks[idx + 1]["text"] if idx < len(chunks) - 1 else ""

        payload = {
            "id": chunk["id"],
            "pages": chunk["pages"],
            "before": before_text,
            "current": chunk["text"],
            "after": after_text,
        }

        # Save as JSON for easy prompting later
        out_path = out_dir / f"{chunk['id']}.json"
        out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding=ENCODING)

    print(f"✅ Created {len(chunks)} chunk files in {out_dir}")