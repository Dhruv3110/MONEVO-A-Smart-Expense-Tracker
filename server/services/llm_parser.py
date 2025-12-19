import os
import json
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

CATEGORIES = [
    "Food", "Beverages", "Grocery", "Electronics",
    "Clothing", "Entertainment", "Utilities",
    "Transport", "Other"
]

PROMPT_TEMPLATE = f"""You are a receipt and invoice parser.

Extract ONLY purchasable line items and assign a category.

Rules:
- Ignore addresses, headers, invoice numbers
- Ignore subtotal, tax, total, balance, payment terms
- Each item must have a description and a monetary amount
- Quantity may be missing (default 1)
- Category MUST be one of: {CATEGORIES}
- Return STRICT JSON only
- No explanations

Output format:
{{
  "items": [
    {{
      "name": string,
      "qty": number,
      "unit_price": number,
      "price": number,
      "category": string
    }}
  ]
}}

OCR TEXT:
<<<
{{TEXT}}
>>>
"""

def parse_with_llm(text: str) -> dict:
    if not os.getenv("GROQ_API_KEY"):
        raise RuntimeError("GROQ_API_KEY not set")

    prompt = PROMPT_TEMPLATE.replace("{TEXT}", text)

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "Return valid JSON only."},
            {"role": "user", "content": prompt}
        ],
        temperature=0,
        max_tokens=700
    )

    content = completion.choices[0].message.content.strip()
    return json.loads(content)
