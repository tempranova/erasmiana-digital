import os, json
from openai import OpenAI
from pathlib import Path
import argparse

# parser = argparse.ArgumentParser()
# parser.add_argument("--title", type=str, required=True, help="Title number to process")
# args = parser.parse_args()

titles = [
    "adagia",
    "admonitio","antibarbari","apologia-debacchationes","apologia-declamatione","apologia-iacobum","apologia-in-principio",
    "apologia-ioco",
    "apologia-latomi","apologia-monachos","apologia-rhapsodias","apologia-sanctium","apologia-stunicae-blasphemias","apologia-stunicae-conclusiones","apologia-stunicae-prodromon","apologia-stunicae-taxata","apophthegmata","carmen-senectute","carmen-votivum","catalogus-lucubrationum","ciceronianus","colloquia","commentarius-ovidium","commentarius-prudentium","concio","de-bello-turcis","de-casa-natalitia","de-civilitate",
    "de-conscribendis","de-constructione","de-contemptu","de-duplici","de-immensa","de-interdicto","de-libero","de-praeparatione","de-pueris","de-puritate","de-ratione","de-recta","de-sarcienda","declamatio","declamatiuncula","declarationes","detectio","disputatiuncula","dulce","ecclesiastes","enarrationes","enchiridion","encomium-matrimonii","encomium-medicae","epigrammata","epistola-archiepiscopum","epistola-contra","epistola-impudentissimos","epistola-leonem","epistola-martinum","epistola-nuncupatoria","epistola-stunicam",
    
    
    "euripides","exhortatio","exomologesis","explanatio","expostulatio","galenus","gaza","hymni","hyperaspistes","institutio-christiani-matrimonii","institutio-principis-christiani","institutum","isocrates","libanius","lingua","lucianes","modus-confitendi","modus-orandi","moriae","obsecratio","oratio","paean","panegyricus","parabolae","paraclesis","paraphrasis-acta",
    
    
    "paraphrasis-evangelium-ioannis","paraphrasis-evangelium-lucae","paraphrasis-evangelium-marci","paraphrasis-evangelium-matthaei","paraphrasis-iacobi","paraphrasis-ioannis","paraphrasis-iudae","paraphrasis-pauli","paraphrasis-petri","paraphrasis-vallae","peregrinatio","plutarchus","precatio-dominica","precatio-pro-pace","precatio-virginis","precationes-novae",
    "psalmi","purgatio","querela","ratio","responsio-adversus","responsio-albertum","responsio-annotationes","responsio-apologeticum","responsio-collationes","responsio-petrum","responsio-phimostomum","scarabeus","sileni","spongia","supputatio","testamentum","vidua","virginis-lauretum","virginis-martyris","vita","xenophon"
]

OPENAI_API_KEY = "<open ai key>"
MODEL = "text-embedding-3-small"

client = OpenAI(api_key=OPENAI_API_KEY)

for title in titles:
    print(f"Embedding TITLE {title}")
    in_dir = Path(f"works/titles/processed/metadata-llm/{title}")
    out_dir = Path(f"works/titles/processed/semantic/{title}")
    out_dir.mkdir(parents=True, exist_ok=True)

    for json_file in sorted(in_dir.glob("*.json")):

        with open(json_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        summary = data.get("summary")
        themes = data.get("themes")

        # SUMMARY
        text_to_embed = f"Summary: {summary} Themes: {themes}."

        print(f"Embedding {json_file.name}")

        if not text_to_embed:
            print(f"⚠️ Skipping {json_file.name} — no text to embed.")
            continue

        response = client.embeddings.create(
            model=MODEL,
            input=text_to_embed
        )

        embedding = response.data[0].embedding

        summary_result = {
            "vector_small" : embedding
        }

        # Write out new JSON
        out_path = Path(out_dir / f"{json_file.stem}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(summary_result, f, ensure_ascii=False, indent=2)