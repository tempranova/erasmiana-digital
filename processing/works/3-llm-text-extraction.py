import os, json
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
    # "euripides","exhortatio","exomologesis","explanatio","expostulatio","galenus","gaza","hymni","hyperaspistes","institutio-christiani-matrimonii","institutio-principis-christiani","institutum","isocrates","libanius","lingua","lucianes","modus-confitendi","modus-orandi","moriae","obsecratio","oratio","paean","panegyricus","parabolae","paraclesis","paraphrasis-acta","paraphrasis-evangelium-ioannis","paraphrasis-evangelium-lucae","paraphrasis-evangelium-marci","paraphrasis-evangelium-matthaei","paraphrasis-iacobi","paraphrasis-ioannis","paraphrasis-iudae","paraphrasis-pauli","paraphrasis-petri","paraphrasis-vallae",
    # "peregrinatio","plutarchus","precatio-dominica","precatio-pro-pace","precatio-virginis","precationes-novae",
    # "psalmi","purgatio","querela","ratio","responsio-adversus","responsio-albertum","responsio-annotationes","responsio-apologeticum","responsio-collationes","responsio-petrum","responsio-phimostomum","scarabeus","sileni","spongia","supputatio",
    "testamentum","vidua","virginis-lauretum","virginis-martyris","vita","xenophon"
]

client = OpenAI(
    api_key="sk-8b1d6cab30fa4fd3a5f485c6c85e7358",
    base_url="https://api.deepseek.com/v1"
)

for title in titles:
    
    print(f"Processing TITLE {title} ...")

    # Path to your OCR text files
    input_dir = Path(f"works/titles/processed/text-cleaned/{title}")
    out_dir = Path(f"works/titles/processed/text-llm/{title}")
    out_dir.mkdir(parents=True, exist_ok=True)

    max_loops = 8 

    index = 1

    for txt_file in sorted(input_dir.glob("*.txt")):

        if not title == "testamentum" or (title == "testamentum" and index > 292):

        # if index > 721:
    
            full_text = ""
            iteration = 1

            text = txt_file.read_text(encoding="utf-8")
            messages = [
                {
                    "role": "system",
                    "content": (
                        "You are a text-analysis model working on Erasmus's Opera Omnia.\n"
                        "Your goal is to extract only the main body of writing from jumbled OCR text, ignoring sidenotes, "
                        "numbering, page titles, and nonsense garbled words. Preserve line breaks."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        "Given this page, extract the comprehensible main text. Preserve line breaks."
                        f"```text\n{text}\n```"
                    ),
                },
            ]

            print(f"Processing {txt_file.name} ...")

            response = client.chat.completions.create(
                model="deepseek-coder",
                messages=messages,
            )

            page = response.choices[0].message.content.strip()

            fn = Path(out_dir / f"{txt_file.stem}-text.txt")
            fn.write_text(page, encoding="utf-8")

        index = index + 1
