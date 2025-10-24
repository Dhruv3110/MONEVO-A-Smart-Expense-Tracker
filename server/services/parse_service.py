import re

def parse_text(text):
    """Extract product items and prices from OCR text."""
    try:
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        items, item_names, prices = [], [], []

        price_pattern = re.compile(r"[$€₹]?\s*([0-9]+(?:\.[0-9]{1,2})?)")
        ignore_keywords = [
            "order", "host", "payment", "total", "tax", "tip", "visa", "subtotal",
            "amount", "transaction", "approved", "change", "cash", "thank", "copy",
            "customer", "authorization", "type", "reader", "sale", "payment id",
            "card", "grand total", "date", "time", "address", "phone", "fax",
            "receipt", "invoice", "balance", "due", "account", "@", "www", ".com"
        ]
        phone_pattern = re.compile(r"\b\d{3,}[-\s]?\d{2,}[-\s]?\d{2,}\b")

        def should_ignore(line):
            lower = line.lower()
            return (
                any(k in lower for k in ignore_keywords)
                or phone_pattern.search(line)
                or re.search(r"\d{4,}", line)
                or (len(line.split()) == 1 and line.replace(".", "").isdigit())
            )

        clean_lines = [line for line in lines if not should_ignore(line)]

        for line in clean_lines:
            qty = 1
            qty_match = re.search(r"(?:(\d+)\s*[xX]?\s+)|(?:[xX]\s*(\d+))", line)
            if qty_match:
                qty = int(qty_match.group(1) or qty_match.group(2))
                line = re.sub(r"(?:(\d+)\s*[xX]?\s+)|(?:[xX]\s*(\d+))", "", line).strip()

            if price_pattern.search(line) and any(c.isalpha() for c in line):
                name = price_pattern.sub("", line).strip(" :-=")
                match = price_pattern.search(line)
                price = float(match.group(1))
                items.append({"name": name, "price": price, "qty": qty})
            elif price_pattern.fullmatch(line) or "$" in line or "€" in line:
                match = price_pattern.search(line)
                if match:
                    prices.append(float(match.group(1)))
            elif any(c.isalpha() for c in line):
                item_names.append(line)

        if not items and item_names and prices:
            for name, price in zip(item_names, prices):
                items.append({"name": name, "price": price, "qty": 1})

        return items
    except Exception:
        raise ValueError("Parsing OCR text failed.")
