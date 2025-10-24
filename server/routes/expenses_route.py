from fastapi import APIRouter, File, UploadFile, HTTPException
from services.ocr_service import extract_text
from services.parse_service import parse_text
from services.categorize_service import categorize_items

router = APIRouter(prefix="/api/expenses", tags=["Expenses"])

@router.post("/upload")
async def upload_receipt(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        ocr_text = extract_text(image_bytes)
        items = parse_text(ocr_text)
        categorized_items = categorize_items(items)

        return {"status": "success", "count": len(categorized_items), "items": categorized_items}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
