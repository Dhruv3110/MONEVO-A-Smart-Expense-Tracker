import requests, os

def categorize_items(items):
    HF_API_TOKEN = os.getenv("HF_API_TOKEN")
    MODEL = "facebook/bart-large-mnli"
    endpoint = f"https://api-inference.huggingface.co/models/{MODEL}"
    headers = {"Authorization": f"Bearer {HF_API_TOKEN}"}

    categories = [
        "Food", "Beverages", "Grocery", "Electronics",
        "Clothing", "Entertainment", "Utilities/Bills",
        "Transport", "Other"
    ]

    categorized_items = []
    for item in items:
        name, price = item["name"], item["price"]
        payload = {
            "inputs": f"This expense item is '{name}' costing {price} euros.",
            "parameters": {"candidate_labels": categories},
        }

        try:
            response = requests.post(endpoint, headers=headers, json=payload, timeout=15)
            if response.status_code == 200:
                output = response.json()
                if isinstance(output, dict) and "labels" in output:
                    category = output["labels"][0]
                elif isinstance(output, list) and "labels" in output[0]:
                    category = output[0]["labels"][0]
                else:
                    category = "Other"
            else:
                category = "Other"
        except Exception:
            category = "Other"

        categorized_items.append({"name": name, "price": price, "category": category})

    return categorized_items
