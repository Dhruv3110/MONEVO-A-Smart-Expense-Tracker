import logging
from .preprocess_text import preprocess_text
from .llm_parser import parse_with_llm
from .validate_items import validate_items
from .regex_parser import parse_text_regex

def parse_text(text: str):
    """
    Hybrid parser:
    1. Try LLM
    2. Validate output
    3. Fallback to regex
    """
    cleaned_text = preprocess_text(text)

    try:
        logging.info("Using LLM parser")
        llm_result = parse_with_llm(cleaned_text)
        items = validate_items(llm_result.get("items", []))

        if items:
            return items

        raise ValueError("No valid items from LLM")

    except Exception as e:
        logging.warning(f"LLM failed, fallback to regex: {e}")
        regex_items = parse_text_regex(cleaned_text)
        return validate_items(regex_items)
