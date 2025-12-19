import re

def parse_text_regex(text):
    """
    Universal receipt parser that supports:
    - Format A: Qty | Item | Unit Price | Amount
    - Format B: Qty | Item | Final Price
    - Never double-multiplies
    - Filters headers & addresses safely
    """

    lines = [l.strip() for l in text.splitlines() if l.strip()]
    items = []

    price_pattern = re.compile(r"[€$₹£¥₩]?\s*(\d+(?:\.\d{1,2})?)")
    qty_pattern = re.compile(r"^(\d+)\s+")
    phone_pattern = re.compile(r"\b\d{3,}[-\s]?\d{2,}[-\s]?\d{2,}\b")

    IGNORE_KEYWORDS = (
        "order", "host", "payment", "total", "tax", "tip",
        "subtotal", "transaction", "approved", "change",
        "cash", "thank", "copy", "customer", "authorization",
        "reader", "sale", "payment id", "card", "grand total",
        "date", "time", "receipt", "invoice", "balance",
        "due", "account", "@", "www", ".com", "tel", "phone",
        "fax", "vat", "reg", "store", "branch", "company",
        "limited", "llc", "inc", "corp", "corporation", "visa", 
        "mastercard", "amex", "discover", "debit", "credit", "cardholder",
        "signature", "authorized", "customer copy", "#", "****", "ave",
        "st.", "rd.", "blvd", "ln.", "dr.", "ct.", "street", "road", 
        "boulevard", "pm", "am", "cashier", "customer"
    )

    SUMMARY_KEYWORDS = (
        "subtotal",
        "tax",
        "total",
        "balance",
        "amount due",
        "grand total",
        "payment is due",
        "due in",
        "change due",
        "invoice"
    )

    def should_ignore(line: str) -> bool:
        lower = line.lower()

        if any(k in lower for k in SUMMARY_KEYWORDS):
            return True

        if price_pattern.search(line):
            return False

        if any(k in lower for k in IGNORE_KEYWORDS):
            return True

        if phone_pattern.search(line):
            return True

        if re.fullmatch(r"\d{3,}", line):
            return True

        return False

    for line in lines:
        if should_ignore(line):
            continue

        prices = price_pattern.findall(line)

        if not prices or not any(c.isalpha() for c in line):
            continue

        prices = [float(p) for p in prices]

        qty_match = qty_pattern.search(line)
        qty = int(qty_match.group(1)) if qty_match else 1

        name = line
        name = price_pattern.sub("", name)
        name = qty_pattern.sub("", name)
        name = re.sub(r"\s{2,}", " ", name).strip(" -:=")

        if len(prices) >= 2:
            unit_price = prices[-2]
            total_price = prices[-1]
        else:
            total_price = prices[0]
            unit_price = round(total_price / qty, 2) if qty > 1 else total_price

        items.append({
            "name": name,
            "qty": qty,
            "unit_price": unit_price,
            "price": total_price,
            "category": "Other"
        })

    return items
