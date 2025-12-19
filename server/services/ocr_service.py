import logging
from PIL import Image, ImageFilter, ImageEnhance
import pytesseract, io

logging.basicConfig(level=logging.INFO)

def preprocess_image(image):
    try:
        image = image.convert("L")
        image = image.filter(ImageFilter.SHARPEN)
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(2.0)
        image = image.resize((image.width * 2, image.height * 3), Image.LANCZOS)
        return image
    except Exception:
        raise ValueError("Image preprocessing failed")

def extract_text(image_bytes):
    try:
        image = Image.open(io.BytesIO(image_bytes))
        logging.info(f"OCR Image Mode: {image.mode}, Size: {image.size}")

        processed_image = preprocess_image(image)

        custom_config = r"--oem 3 --psm 6 -c preserve_interword_spaces=1"
        text = pytesseract.image_to_string(processed_image, config=custom_config)
        if not text.strip():
            raise ValueError("No text detected")

        return text

    except Exception as e:
        logging.error(f"OCR/Parsing Error: {str(e)}")
        raise ValueError("Text extraction from image failed.")
