from fastapi import APIRouter, File, UploadFile, HTTPException
from server.services.ocr_service import extract_text
from server.services.parse_service import parse_text
from server.services.categorize_service import categorize_items
import logging
router = APIRouter(prefix="/api/expenses", tags=["Expenses"])

ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/jpg"]

async def validate_file(file: UploadFile):
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise ValueError(f"Invalid file type: {file.content_type}. Only JPEG/PNG allowed.")

@router.post("/upload")
async def upload_receipt(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        file.file.seek(0)  # Reset pointer
        print(f"Uploaded file: {file.filename}, size: {len(image_bytes)} bytes")  # <-- Debug
        if len(image_bytes) == 0:
            raise ValueError("Empty file received")
        ocr_text = extract_text(image_bytes)
        items = parse_text(ocr_text)
        categorized_items = categorize_items(items)

        return {"status": "success", "count": len(categorized_items), "items": categorized_items}

    except ValueError as e:
        logging.error(f"OCR/Parsing Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        logging.error(f"Internal Server Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")