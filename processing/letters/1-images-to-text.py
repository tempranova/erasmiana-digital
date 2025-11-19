from google.cloud import vision
from google.cloud.vision_v1 import AnnotateImageResponse
from pathlib import Path
import argparse
import json
import io

volumes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]

# parser = argparse.ArgumentParser()
# parser.add_argument("--volume", type=int, required=True, help="Volume number to process")
# args = parser.parse_args()

cred_path = Path(__file__).parent / "erasmus-475418-e84022499fec.json"
client = vision.ImageAnnotatorClient.from_service_account_file(cred_path)

for volume in volumes:
    input_dir = Path(f"letters/volumes/images/paged/{volume}")
    output_dir = Path(f"letters/volumes/processed/text-ocr/{volume}")
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Doing volume {volume}")

    for img_path in sorted(input_dir.glob("*.png")):
        with io.open(img_path, "rb") as image_file:
            content = image_file.read()

        image = vision.Image(content=content)
        image_context = vision.ImageContext(language_hints=["la", "el"])
        response = client.document_text_detection(image=image, image_context=image_context)

        print(f"Ouput {img_path.stem}")

        text_out = output_dir / f"{img_path.stem}.txt"
        text_out.write_text(response.full_text_annotation.text, encoding="utf-8")

        # json_out = output_dir / f"{img_path.stem}.json"
        # response_json = AnnotateImageResponse.to_json(response)
        # json_out.write_text(response_json, encoding="utf-8")