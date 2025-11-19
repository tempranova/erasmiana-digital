import os, json
from openai import OpenAI
from pathlib import Path
import argparse

# parser = argparse.ArgumentParser()
# parser.add_argument("--title", type=str, required=True, help="Title number to process")
# args = parser.parse_args()


titles = [
    # "adagia"
    # "admonitio","antibarbari","apologia-debacchationes","apologia-declamatione","apologia-iacobum","apologia-in-principio",
    # "apologia-ioco",
    # "apologia-latomi","apologia-monachos","apologia-rhapsodias","apologia-sanctium","apologia-stunicae-blasphemias","apologia-stunicae-conclusiones","apologia-stunicae-prodromon","apologia-stunicae-taxata","apophthegmata","carmen-senectute","carmen-votivum","catalogus-lucubrationum","ciceronianus","colloquia","commentarius-ovidium","commentarius-prudentium","concio","de-bello-turcis","de-casa-natalitia","de-civilitate",
    # "de-conscribendis","de-constructione","de-contemptu","de-duplici","de-immensa","de-interdicto","de-libero","de-praeparatione","de-pueris","de-puritate","de-ratione","de-recta","de-sarcienda","declamatio","declamatiuncula","declarationes","detectio","disputatiuncula","dulce","ecclesiastes","enarrationes","enchiridion","encomium-matrimonii","encomium-medicae","epigrammata","epistola-archiepiscopum","epistola-contra","epistola-impudentissimos","epistola-leonem","epistola-martinum","epistola-nuncupatoria","epistola-stunicam",
    
    
    #"euripides","exhortatio","exomologesis","explanatio","expostulatio","galenus","gaza","hymni","hyperaspistes","institutio-christiani-matrimonii","institutio-principis-christiani","institutum","isocrates","libanius","lingua","lucianes","modus-confitendi","modus-orandi","moriae","obsecratio","oratio","paean","panegyricus","parabolae","paraclesis","paraphrasis-acta",
    
    
    "paraphrasis-evangelium-ioannis","paraphrasis-evangelium-lucae","paraphrasis-evangelium-marci","paraphrasis-evangelium-matthaei","paraphrasis-iacobi","paraphrasis-ioannis","paraphrasis-iudae","paraphrasis-pauli","paraphrasis-petri","paraphrasis-vallae","peregrinatio","plutarchus","precatio-dominica","precatio-pro-pace","precatio-virginis","precationes-novae",
    "psalmi","purgatio","querela","ratio","responsio-adversus","responsio-albertum","responsio-annotationes","responsio-apologeticum","responsio-collationes","responsio-petrum","responsio-phimostomum","scarabeus","sileni","spongia","supputatio","testamentum","vidua","virginis-lauretum","virginis-martyris","vita","xenophon"
]

client = OpenAI(
    api_key="sk-8b1d6cab30fa4fd3a5f485c6c85e7358",
    base_url="https://api.deepseek.com/v1"
)

for title in titles:
  print(f"Processing {title} ...")
  # Path to your OCR text files
  input_dir = Path(f"works/titles/processed/sections/{title}")
  out_dir = Path(f"works/titles/processed/metadata-llm/{title}")
  out_dir.mkdir(parents=True, exist_ok=True)

  do = False

  for json_file in sorted(input_dir.glob("*.json")):
    with open(json_file, "r", encoding="utf-8") as f:
        file_data = json.load(f)

    # if json_file.stem == "split-1716-pages-725,726":
    #   do = True

    # if do:

    current_content = file_data['current']

    if "title" in file_data:
      current_content = file_data["title"] + " " + current_content

    prompt = f"""
      You are a text-analysis model trained to study the works of Erasmus.

      Your goal is to extract structured semantic information from a specific passage.

      You will be given three text sections:
      - [PREVIOUS CONTEXT]: the text immediately before the target passage
      - [CURRENT EXTRACT]: the main passage to analyze
      - [NEXT CONTEXT]: the text immediately following the target passage

      Use the previous and next context ONLY to understand continuity and meaning,
      but describe and summarize ONLY the CURRENT EXTRACT.

      Return a well-formed JSON object with the following fields:

      {{
        "summary": "A concise 1–2 sentence English summary of the CURRENT EXTRACT only.",
        "themes": [
          "3–5 short phrases describing conceptual or thematic ideas, tone, or subjects."
        ],
        "keywords": [
          "1–12 key proper names, places, distinctive Latin terms, or important entities."
        ]
      }}

      If the passage is fragmentary or unclear, summarize as best you can from the available information.
      Do not include any commentary, explanations, or text outside the JSON object.

      [PREVIOUS CONTEXT]
      ```
      {file_data['before']}
      ```

      [CURRENT EXTRACT]
      ```
      {current_content}
      ```

      [NEXT CONTEXT]
      ```
      {file_data['after']}
      ```
    ```text
    """

    print(f"Processing {json_file.name} ...")
    response = client.chat.completions.create(
      model="deepseek-coder",
      messages=[{"role": "user", "content": prompt}],
      response_format={"type": "json_object"}
    )

    data = response.choices[0].message.content

    fn = Path(out_dir / f"{json_file.stem}-metadata.json")
    fn.write_text(data, encoding="utf-8")
