from pathlib import Path
import subprocess
import argparse
import json
import io, os

# parser = argparse.ArgumentParser()
# parser.add_argument("--title", type=str, required=True, help="Title to process")
# args = parser.parse_args()

# "adagia"
# "annotationes",
titles = ["admonitio","antibarbari","apologia-debacchationes","apologia-declamatione","apologia-iacobum","apologia-in-principio","apologia-ioco","apologia-latomi","apologia-monachos","apologia-rhapsodias","apologia-sanctium","apologia-stunicae-blasphemias","apologia-stunicae-conclusiones","apologia-stunicae-prodromon","apologia-stunicae-taxata","apophthegmata","carmen-senectute","carmen-votivum","catalogus-lucubrationum","ciceronianus","colloquia","commentarius-ovidium","commentarius-prudentium","concio","de-bello-turcis","de-casa-natalitia","de-civilitate","de-conscribendis","de-constructione","de-contemptu","de-duplici","de-immensa","de-interdicto","de-libero","de-praeparatione","de-pueris","de-puritate","de-ratione","de-recta","de-sarcienda","declamatio","declamatiuncula","declarationes","detectio","disputatiuncula","dulce","ecclesiastes","enarrationes","enchiridion","encomium-matrimonii","encomium-medicae","epigrammata","epistola-archiepiscopum","epistola-contra","epistola-impudentissimos","epistola-leonem","epistola-martinum","epistola-nuncupatoria","epistola-stunicam","euripides","exhortatio","exomologesis","explanatio","expostulatio","galenus","gaza","hymni","hyperaspistes","institutio-christiani-matrimonii","institutio-principis-christiani","institutum","isocrates","libanius","lingua","lucianes","modus-confitendi","modus-orandi","moriae","obsecratio","oratio","paean","panegyricus","parabolae","paraclesis","paraphrasis-acta","paraphrasis-evangelium-ioannis","paraphrasis-evangelium-lucae","paraphrasis-evangelium-marci","paraphrasis-evangelium-matthaei","paraphrasis-iacobi","paraphrasis-ioannis","paraphrasis-iudae","paraphrasis-pauli","paraphrasis-petri","paraphrasis-vallae","peregrinatio","plutarchus","precatio-dominica","precatio-pro-pace","precatio-virginis","precationes-novae","psalmi","purgatio","querela","ratio","responsio-adversus","responsio-albertum","responsio-annotationes","responsio-apologeticum","responsio-collationes","responsio-petrum","responsio-phimostomum","scarabeus","sileni","spongia","supputatio","testamentum","vidua","virginis-lauretum","virginis-martyris","vita","xenophon"]

for title in titles:
    print(f"Processing TITLE {title} ...")

    input_dir = Path(f"works/titles/images/paged/{title}")
    output_dir = Path(f"works/titles/processed/text-ocr/{title}")
    output_dir.mkdir(parents=True, exist_ok=True)

    kraken_exe = os.path.expanduser("~/kraken-env/bin/kraken")
    MODEL = "works/scripts/catmus-print-fondue-large.mlmodel"

    for img_path in sorted(input_dir.glob("*.png")):

        # name_split = img_path.stem.split('-')
        # number = int(name_split[1])

            print(f"Processing {img_path.name} ...")

            out_path = output_dir / f"{img_path.stem}.txt"

            cmd = [
                kraken_exe,
                "-i", img_path,
                out_path,
                "segment", "-bl",
                "ocr",
                "-m", MODEL
            ]

            subprocess.run(cmd, check=True, capture_output=True)

            # json_out = output_dir / f"{img_path.stem}.json"
            # response_json = AnnotateImageResponse.to_json(response)
            # json_out.write_text(response_json, encoding="utf-8")