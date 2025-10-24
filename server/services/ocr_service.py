from PIL import Image, ImageFilter, ImageEnhance
import pytesseract, io

def preprocess_image(image):
    try:
        image = image.convert("L")  # grayscale
        image = image.filter(ImageFilter.SHARPEN)
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(2.0)  # increase contrast
        image = image.resize((image.width * 2, image.height * 3), Image.LANCZOS)  # upscale
        return image
    except Exception:
        raise ValueError("Image preprocessing failed")

def extract_text(image_bytes):
    try:
        image = Image.open(io.BytesIO(image_bytes))
        processed_image = preprocess_image(image)
        custom_config = r"--oem 3 --psm 6 -c preserve_interword_spaces=1"
        text = pytesseract.image_to_string(processed_image, config=custom_config)
        if not text.strip():
            raise ValueError("No text detected in image.")
        return text
    except Exception:
        raise ValueError("Text extraction from image failed.")
