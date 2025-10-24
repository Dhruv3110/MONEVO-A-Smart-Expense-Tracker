# from fastapi import FastAPI, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv
# import pytesseract
# from PIL import Image, ImageFilter, ImageEnhance
# import io, re, requests, os, platform, cv2
# import numpy as np

# app = FastAPI()
# load_dotenv()

# # Tesseract path (Windows)
# if platform.system() == "Windows":
#     pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
# else:
#     pytesseract.pytesseract.tesseract_cmd = "/usr/bin/tesseract"
# # Allow frontend access
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# def preprocess_image(image): 
#     image = image.convert("L") # grayscale 
#     image = image.filter(ImageFilter.SHARPEN) 
#     enhancer = ImageEnhance.Contrast(image) 
#     image = enhancer.enhance(2.0) # increase contrast return image
#     image = image.resize((image.width * 2, image.height * 3), Image.LANCZOS) # upscale
#     return image

# def extract_text(image_bytes): 
#     image = Image.open(io.BytesIO(image_bytes)) 
#     processed_image = preprocess_image(image) 
#     custom_config = r"--oem 3 --psm 6 -c preserve_interword_spaces=1"
#     text = pytesseract.image_to_string(processed_image, config=custom_config)
#     return text



# def parse_text(text):
#     """
#     Extract only product items and prices from OCR text.
#     Automatically ignores addresses, phone numbers, totals, taxes, etc.
#     Handles right-aligned prices and ignores metadata like totals or addresses.
#     """

#     # Clean up and split into lines
#     lines = [line.strip() for line in text.splitlines() if line.strip()]
#     items, item_names, prices = [], [], []

#     # Regex patterns
#     price_pattern = re.compile(r"[$€₹]?\s*([0-9]+(?:\.[0-9]{1,2})?)")
    
#     ignore_keywords = [
#         "order", "host", "payment", "total", "tax", "tip", "visa", "subtotal",
#         "amount", "transaction", "approved", "change", "cash", "thank", "copy",
#         "customer", "authorization", "type", "reader", "sale", "payment id",
#         "card", "subtotal", "grand total", "date", "time", "address", "phone", "fax",
#         "receipt", "invoice", "balance", "due", "account", "@", "www", ".com",

#     ]
#     phone_pattern = re.compile(r"\b\d{3,}[-\s]?\d{2,}[-\s]?\d{2,}\b")

#     def should_ignore(line):
#         lower = line.lower()
#         return (
#             any(k in lower for k in ignore_keywords)
#             or phone_pattern.search(line)
#             or re.search(r"\d{4,}", line)  # long numbers (IDs, addresses)
#             or len(line.split()) == 1 and line.replace(".", "").isdigit()  # just a number
#         )

#     # Pass 1: Remove unwanted lines
#     clean_lines = [line for line in lines if not should_ignore(line)]
#     print("Clean Lines:", clean_lines)

#     for line in clean_lines:
#         qty =1
#         qty_match = re.search(r"(?:(\d+)\s*[xX]?\s+)|(?:[xX]\s*(\d+))",line)

#         if qty_match:
#             qty = int(qty_match.group(1) or qty_match.group(2))
#             line = re.sub(r"(?:(\d+)\s*[xX]?\s+)|(?:[xX]\s*(\d+))","",line).strip()

#         # If line has both item text & price → same-line item
#         if price_pattern.search(line) and any(c.isalpha() for c in line):
#             name = price_pattern.sub("", line).strip(" :-=")
#             match = price_pattern.search(line)
#             price = float(match.group(1))
#             items.append({"name": name, "price": price, "qty": qty})

#         # If line only has a price → collect separately
#         elif price_pattern.fullmatch(line) or "$" in line or "€" in line:
#             match = price_pattern.search(line)
#             if match:
#                 prices.append(float(match.group(1)))

#         # Otherwise treat as a possible item name
#         elif any(c.isalpha() for c in line):
#             item_names.append(line)

#     # If no items detected with price in same line — pair sequentially
#     if not items and item_names and prices:
#         for name, price in zip(item_names, prices):
#             items.append({"name": name, "price": price, "qty": 1})

#     return items

# # 🔹 Hugging Face Zero-shot Categorization
# def categorize_items(items):
#     HF_API_TOKEN = os.getenv("HF_API_TOKEN") or "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"
#     MODEL = "facebook/bart-large-mnli"
#     endpoint = f"https://api-inference.huggingface.co/models/{MODEL}"
#     headers = {"Authorization": f"Bearer {HF_API_TOKEN}"}

#     # Optional: Check model availability
#     res = requests.get(endpoint, headers=headers)
#     print("HF Model Check:", res.status_code)
#     print("Response Text:", res.text[:100])

#     categories = [
#         "Food",
#         "Beverages",
#         "Grocery",
#         "Electronics",
#         "Clothing",
#         "Entertainment",
#         "Utilities/Bills",
#         "Transport",
#         "Other",
#     ]

#     categorized_items = []
#     for item in items:
#         name = item["name"]
#         price = item["price"]

#         prompt = f"This expense item is '{name}' costing {price} euros."

#         payload = {
#             "inputs": prompt,
#             "parameters": {"candidate_labels": categories},
#         }

#         try:
#             response = requests.post(endpoint, headers=headers, json=payload)
#             if response.status_code == 200:
#                 output = response.json()
#                 # Handle zero-shot response structure
#                 if isinstance(output, dict) and "labels" in output:
#                     category = output["labels"][0]
#                 elif isinstance(output, list) and "labels" in output[0]:
#                     category = output[0]["labels"][0]
#                 else:
#                     category = "Other"
#             else:
#                 print("HF API Error", response.status_code, response.text)
#                 category = "Other"
#         except Exception as e:
#             print("Error:", e)
#             category = "Other"

#         categorized_items.append(
#             {"name": name, "price": price, "category": category}
#         )

#     return categorized_items


# # Upload Endpoint
# @app.post("/api/expenses/upload")
# async def upload_receipt(file: UploadFile = File(...)):
#     image_bytes = await file.read()
#     ocr_text = extract_text(image_bytes)

#     print("=== OCR TEXT START ===")
#     print(ocr_text)
#     print("=== OCR TEXT END ===")

#     items = parse_text(ocr_text)
#     print("Parsed Items:", items)

#     categorized_items = categorize_items(items)

#     return {"items": categorized_items}
