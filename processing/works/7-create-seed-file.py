import json
import csv
from pathlib import Path
from rapidfuzz import fuzz, process
import re
import argparse

titles = [
    "adagia","annotationes",
    "admonitio","antibarbari","apologia-debacchationes","apologia-declamatione","apologia-iacobum","apologia-in-principio",
    "apologia-ioco",
    "apologia-latomi","apologia-monachos","apologia-rhapsodias","apologia-sanctium","apologia-stunicae-blasphemias","apologia-stunicae-conclusiones","apologia-stunicae-prodromon","apologia-stunicae-taxata","apophthegmata","carmen-senectute","carmen-votivum","catalogus-lucubrationum","ciceronianus","colloquia","commentarius-ovidium","commentarius-prudentium","concio","de-bello-turcis","de-casa-natalitia","de-civilitate",
    "de-conscribendis","de-constructione","de-contemptu","de-duplici","de-immensa","de-interdicto","de-libero","de-praeparatione","de-pueris","de-puritate","de-ratione","de-recta","de-sarcienda","declamatio","declamatiuncula","declarationes","detectio","disputatiuncula","dulce","ecclesiastes","enarrationes","enchiridion","encomium-matrimonii","encomium-medicae","epigrammata","epistola-archiepiscopum","epistola-contra","epistola-impudentissimos","epistola-leonem","epistola-martinum","epistola-nuncupatoria","epistola-stunicam",
    "euripides","exhortatio","exomologesis","explanatio","expostulatio","galenus","gaza","hymni","hyperaspistes","institutio-christiani-matrimonii","institutio-principis-christiani","institutum","isocrates","libanius","lingua","lucianes","modus-confitendi","modus-orandi","moriae","obsecratio","oratio","paean","panegyricus","parabolae","paraclesis","paraphrasis-acta",
    "paraphrasis-evangelium-ioannis","paraphrasis-evangelium-lucae","paraphrasis-evangelium-marci","paraphrasis-evangelium-matthaei","paraphrasis-iacobi","paraphrasis-ioannis","paraphrasis-iudae","paraphrasis-pauli","paraphrasis-petri","paraphrasis-vallae","peregrinatio","plutarchus","precatio-dominica","precatio-pro-pace","precatio-virginis","precationes-novae",
    "psalmi","purgatio","querela","ratio","responsio-adversus","responsio-albertum","responsio-annotationes","responsio-apologeticum","responsio-collationes","responsio-petrum","responsio-phimostomum","scarabeus","sileni","spongia","supputatio","testamentum","vidua","virginis-lauretum","virginis-martyris","vita","xenophon"
]

# parser = argparse.ArgumentParser()
# parser.add_argument("--title", type=str, required=True, help="Title to process")
# args = parser.parse_args()

# ===== CONFIGURATION =====

output_json = []

for title in titles:
    work_metadata = Path(f"works/titles/metadata/{title}/metadata.json")
    work_sections = Path(f"works/titles/processed/sections/{title}")
    work_sections_metadata = Path(f"works/titles/processed/metadata-llm/{title}")
    work_sections_semantic = Path(f"works/titles/processed/semantic/{title}")

    output_file = Path(f"works/titles/seeds/full-work-seed.json")
    # output_file.mkdir(exist_ok=True)

    # ===== LOAD INPUTS =====

    with open(work_metadata, "r", encoding="utf-8") as f:
        work_metadata_json = json.load(f)


    work = {
        "title" : work_metadata_json["title"],
        "slug" : work_metadata_json["slug"],
        "blurb" : work_metadata_json["blurb"],
        "year" : work_metadata_json["year"],
        "month" : work_metadata_json["month"],
        "day" : work_metadata_json["day"],
        "placename" : work_metadata_json["placename"],
        "coordinates" : work_metadata_json["coordinates"],
        "publications" : work_metadata_json["publications"],
        "translations" : work_metadata_json["translations"],
        "commentary" : work_metadata_json["commentary"],
        "sources" : work_metadata_json["sources"],
        "sections" : []
    }

    for json_file in sorted(work_sections.glob("*.json")):

        with open(json_file, "r", encoding="utf-8") as f:
            section_data = json.load(f)

        # print(work_sections_metadata / json_file.stem / '-metadata.json')
        with open(Path(f"{work_sections_metadata / json_file.stem}-metadata.json"), "r", encoding="utf-8") as f:
            section_metadata = json.load(f)

        with open(Path(f"{work_sections_semantic / json_file.stem}-metadata.json"), "r", encoding="utf-8") as f:
            section_semantic = json.load(f)

        split_title = json_file.stem.split('-')
        section_position = split_title[1]

        work["sections"].append({
            "pages" : section_data["pages"],
            "text" : section_data["current"],
            "title" : section_data["title"] if "title" in section_data else "",
            "position" : int(section_position),
            "metadata" : {
                "summary" : section_metadata["summary"],
                "keywords" : section_metadata["keywords"],
                "themes" : section_metadata["themes"],
                "vector_small" : section_semantic["vector_small"]
            }
        })

    output_json.append(work)

    # out_path = Path(output_dir / f"seed-{args.title}.json")
    # with open(out_path, "w", encoding="utf-8") as f:
    #     json.dump(output_json, f, ensure_ascii=False, indent=2)

# out_path = Path(output_dir / f"seed-{args.title}.json")
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(output_json, f, ensure_ascii=False, indent=2)