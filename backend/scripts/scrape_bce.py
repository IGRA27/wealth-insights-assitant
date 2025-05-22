#!/usr/bin/env python
"""
Descarga el PDF más reciente del Economic Bulletin del BCE y lo guarda en data/samples,
luego llama load_pdfs.py para reindexar todo en FAISS.

1) Visita la página del Economic Bulletin del BCE
2) Busca el primer enlace PDF disponible (usualmente el más reciente)
3) Descarga el PDF a data/samples
4) Llama a load_pdfs.py para reindexar en FAISS
"""

import subprocess
import sys
from pathlib import Path

import httpx
from bs4 import BeautifulSoup

ROOT         = Path(__file__).parent.parent
DATA_DIR     = ROOT / "data" / "samples"
LOAD_SCRIPT  = ROOT / "scripts" / "load_pdfs.py"
INDEX_URL    = "https://www.ecb.europa.eu/pub/economic-bulletin/html/index.en.html"

def fetch_latest_bulletin_pdf_url() -> str:
    r = httpx.get(INDEX_URL, follow_redirects=True, timeout=15)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")

    # Busca el primer enlace PDF (más reciente)
    a_pdf = soup.find("a", href=lambda h: h and h.endswith(".pdf"))
    if not a_pdf:
        raise RuntimeError("No se encontró ningún PDF en la página del boletín económico.")
    href = a_pdf["href"]
    if href.startswith("/"):
        return f"https://www.ecb.europa.eu{href}"
    return href

def download_pdf(pdf_url: str) -> Path:
    target = DATA_DIR / Path(pdf_url).name
    target.parent.mkdir(parents=True, exist_ok=True)
    print("Descargando PDF:", pdf_url)
    with httpx.stream("GET", pdf_url, follow_redirects=True, timeout=30) as r:
        r.raise_for_status()
        with open(target, "wb") as f:
            for chunk in r.iter_bytes():
                f.write(chunk)
    print("Guardado en", target)
    return target

def rebuild_index():
    print("Reconstruyendo índice FAISS…")
    subprocess.check_call(
        [sys.executable, str(LOAD_SCRIPT), "--input", str(DATA_DIR), "--reset"],
        cwd=ROOT
    )
    print("Índice FAISS actualizado.")

if __name__ == "__main__":
    try:
        pdf_url = fetch_latest_bulletin_pdf_url()
        download_pdf(pdf_url)
        rebuild_index()
    except Exception as e:
        print("Error:", e)
        sys.exit(1)
