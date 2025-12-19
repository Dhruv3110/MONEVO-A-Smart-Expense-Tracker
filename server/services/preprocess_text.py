def preprocess_text(text: str) -> str:
    """
    Light cleanup only.
    DO NOT classify or ignore lines here.
    """
    lines = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        line = " ".join(line.split())
        lines.append(line)

    return "\n".join(lines)
