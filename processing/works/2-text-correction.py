from pathlib import Path
import re
import argparse

# parser = argparse.ArgumentParser()
# parser.add_argument("--title", type=str, required=True, help="Title number to process")
# args = parser.parse_args()

titles = ["admonitio","antibarbari","apologia-debacchationes","apologia-declamatione","apologia-iacobum","apologia-in-principio","apologia-ioco","apologia-latomi","apologia-monachos","apologia-rhapsodias","apologia-sanctium","apologia-stunicae-blasphemias","apologia-stunicae-conclusiones","apologia-stunicae-prodromon","apologia-stunicae-taxata","apophthegmata","carmen-senectute","carmen-votivum","catalogus-lucubrationum","ciceronianus","colloquia","commentarius-ovidium","commentarius-prudentium","concio","de-bello-turcis","de-casa-natalitia","de-civilitate","de-conscribendis","de-constructione","de-contemptu","de-duplici","de-immensa","de-interdicto","de-libero","de-praeparatione","de-pueris","de-puritate","de-ratione","de-recta","de-sarcienda","declamatio","declamatiuncula","declarationes","detectio","disputatiuncula","dulce","ecclesiastes","enarrationes","enchiridion","encomium-matrimonii","encomium-medicae","epigrammata","epistola-archiepiscopum","epistola-contra","epistola-impudentissimos","epistola-leonem","epistola-martinum","epistola-nuncupatoria","epistola-stunicam","euripides","exhortatio","exomologesis","explanatio","expostulatio","galenus","gaza","hymni","hyperaspistes","institutio-christiani-matrimonii","institutio-principis-christiani","institutum","isocrates","libanius","lingua","lucianes","modus-confitendi","modus-orandi","moriae","obsecratio","oratio","paean","panegyricus","parabolae","paraclesis","paraphrasis-acta","paraphrasis-evangelium-ioannis","paraphrasis-evangelium-lucae","paraphrasis-evangelium-marci","paraphrasis-evangelium-matthaei","paraphrasis-iacobi","paraphrasis-ioannis","paraphrasis-iudae","paraphrasis-pauli","paraphrasis-petri","paraphrasis-vallae","peregrinatio","plutarchus","precatio-dominica","precatio-pro-pace","precatio-virginis","precationes-novae","psalmi","purgatio","querela","ratio","responsio-adversus","responsio-albertum","responsio-annotationes","responsio-apologeticum","responsio-collationes","responsio-petrum","responsio-phimostomum","scarabeus","sileni","spongia","supputatio","testamentum","vidua","virginis-lauretum","virginis-martyris","vita","xenophon"]

def replace_unknown_chars(text):
    # Replace  and ́ with "que"
    return re.sub(r'́?||', 'que', text)

def fix_punctuation_spacing(text):
    # Ensure punctuation is followed by a space unless at end of line
    return re.sub(r'([.,:?\)])(?!\s|$)', r'\1 ', text)

def clean_single_page(text):
    """
    Cleans an individual OCR page of Erasmus's Adagia.
    Removes headers, page numbers, quire marks, and uppercase junk
    near the top or bottom of the page, while keeping valid text intact.
    """

    # Regex patterns tuned to Erasmus OCR quirks
    header_pattern = re.compile(r'^(DES[.:! ]+ERASMI.*ADAGIORVM|CHILIADIS.*CENTVRIA.*)$', re.IGNORECASE)
    page_number_pattern = re.compile(r'^\d{1,4}$')
    quire_pattern = re.compile(r'^[A-Z]{1,3}\s*\d$')  # e.g. "K 3", "PPP 4"
    uppercase_junk = re.compile(r'^[A-Z\s\W]{5,}$')  # lines mostly uppercase/non-word chars

    lines = [l.strip() for l in text.splitlines() if l.strip()]
    cleaned = []

    # --- Clean header zone (first ~5 lines) ---
    for line in lines[:5]:
        if (
            header_pattern.match(line)
            or page_number_pattern.match(line)
            or quire_pattern.match(line)
            or uppercase_junk.match(line)
        ):
            continue
        cleaned.append(line)

    # --- Middle of page (keep everything) ---
    for line in lines[5:-5]:
        cleaned.append(line)

    # --- Clean footer zone (last ~5 lines) ---
    for line in lines[-5:]:
        if (
            header_pattern.match(line)
            or page_number_pattern.match(line)
            or quire_pattern.match(line)
            or uppercase_junk.match(line)
        ):
            continue
        cleaned.append(line)

    return "\n".join(cleaned).strip()

def remove_overlap_garbage(text, min_cluster_size=3, max_line_len=10):
    """
    Remove clusters of >= `min_cluster_size` consecutive short lines (each ≤ `max_line_len` chars).
    """
    lines = text.splitlines()
    cleaned = []
    cluster = []

    def flush_cluster():
        if len(cluster) >= min_cluster_size:
            # Drop cluster entirely
            cluster.clear()
        else:
            # Keep small accidental short sequences (like poetry)
            cleaned.extend(cluster)
            cluster.clear()

    for line in lines:
        stripped = line.strip()
        if stripped and len(stripped) <= max_line_len:
            cluster.append(line)
        else:
            flush_cluster()
            cleaned.append(line)
    flush_cluster()  # handle trailing cluster

    return "\n".join(cleaned)

def remove_shortline_garbage(text, max_line_len=10, min_cluster_size=2, long_line_len=30):
    """
    Remove clusters of very short OCR lines, but keep real lines that just end with '¬'.
    Long/real lines: keep them, just strip the trailing '¬'.
    """
    lines = text.splitlines()
    cleaned = []
    cluster = []

    def is_sentencey(s: str) -> bool:
        # has punctuation or multiple words → likely real
        return bool(re.search(r'[.,;:]', s)) or len(s.split()) >= 4

    def flush_cluster():
        if len(cluster) >= min_cluster_size:
            # drop whole junk cluster
            cluster.clear()
        else:
            cleaned.extend(cluster)
            cluster.clear()

    for line in lines:
        s = line.strip()

        if not s:
            flush_cluster()
            cleaned.append(line)
            continue

        is_short = len(s) <= max_line_len
        ends_soft = s.endswith("¬")

        if is_short and not is_sentencey(s):
            # candidate junk → collect
            cluster.append(line)
        else:
            flush_cluster()
            # real line: if it ends with ¬ but is long/sentence-like, just trim it
            cleaned.append(line)
            # if ends_soft and (len(s) >= long_line_len or is_sentencey(s)):
            #     cleaned.append(line.rstrip().rstrip("¬").rstrip())
            # else:
            #     cleaned.append(line)

    flush_cluster()

    # Drop any final very short trailing line
    while cleaned and len(cleaned[-1].strip()) < 5:
        cleaned.pop()

    # collapse too many blank lines
    cleaned_text = re.sub(r'\n{3,}', '\n\n', "\n".join(cleaned))
    return cleaned_text.strip()

for title in titles:
    input_path = sorted(Path(f"works/titles/processed/text-ocr/{title}").glob("*.txt"))
    output_path = Path(f"works/titles/processed/text-cleaned/{title}")
    output_path.mkdir(parents=True, exist_ok=True)

    for input_file in input_path:
        text = input_file.read_text(encoding="utf-8")

        corrected_text = text
        corrected_text = replace_unknown_chars(corrected_text)
        corrected_text = fix_punctuation_spacing(corrected_text)
        # corrected_text = clean_single_page(corrected_text)
        # corrected_text = remove_overlap_garbage(corrected_text)
        # corrected_text = remove_shortline_garbage(corrected_text)

        out_file = output_path / f"{input_file.stem}.txt"
        out_file.write_text(corrected_text, encoding="utf-8")