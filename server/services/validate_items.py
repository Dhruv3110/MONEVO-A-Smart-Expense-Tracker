ALLOWED_CATEGORIES = {
    "Food", "Beverages", "Grocery", "Electronics",
    "Clothing", "Entertainment", "Utilities",
    "Transport", "Other"
}

def validate_items(items: list) -> list:
    """
    Prevent hallucinations, invalid numbers,
    and invalid categories.
    """
    clean_items = []

    for item in items:
        try:
            name = item["name"]
            qty = int(item.get("qty", 1))
            unit_price = float(item.get("unit_price", 0))
            price = float(item["price"])

            category = item.get("category", "Other")
            if category not in ALLOWED_CATEGORIES:
                category = "Other"

            if not name or price <= 0 or qty <= 0:
                continue

            if unit_price * qty > price + 0.01:
                unit_price = round(price / qty, 2)

            clean_items.append({
                "name": name,
                "qty": qty,
                "unit_price": unit_price,
                "price": price,
                "category": category
            })

        except Exception:
            continue

    return clean_items
