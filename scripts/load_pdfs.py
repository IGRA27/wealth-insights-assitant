#Usar .venv !/usr/bin/env python
"""
Cargo(o refresco)los PDFs indicados y reconstruye el índice FAISS
usado por el backend.
Uso:
$ python scripts/load_pdfs.py --input ./my_pdfs --reset
$ python scripts/load_pdfs.py                           #usa data/samples

Requisitos:
El backend debe estar instalado en editable (`pip install -e backend`)
Ejecutar desde la raíz del proyecto o establecer PYTHONPATH.
"""
from __future__ import annotations

import shutil
from pathlib import Path
import typing as t

import typer
from rich import print
from rich.progress import Progress, SpinnerColumn, BarColumn, TextColumn

from app.services.retriever import get_vectorstore
from app.core.config import get_settings

app = typer.Typer(add_completion=False)
settings = get_settings()


def copy_pdfs(src: Path, dst: Path) -> list[Path]:
    dst.mkdir(parents=True, exist_ok=True)
    copied: list[Path] = []
    for pdf in src.glob("*.pdf"):
        target = dst / pdf.name
        shutil.copy2(pdf, target)
        copied.append(target)
    return copied


@app.command()
def main(
    input: Path = typer.Option(
        settings.data_path, "--input", "-i",
        help="Carpeta con PDFs a indexar."
    ),
    reset: bool = typer.Option(
        False, "--reset",
        help="Borra el índice FAISS antes de reconstruir."
    ),
):
    """
    Copia los PDFs al almacén `data/samples` y reconstruye el índice FAISS.
    """
    target_dir = settings.data_path
    if reset and settings.index_path.exists():
        print("[yellow]Borrando índice FAISS previo…[/]")
        settings.index_path.unlink(missing_ok=True)

    print(f"[cyan]Copiando PDFs desde {input} hacia {target_dir}[/]")
    pdfs = copy_pdfs(input, target_dir)
    if not pdfs:
        print("[red]No se encontraron PDFs.[/]")
        raise typer.Exit(code=1)

    print(f"[green]Copiados {len(pdfs)} archivos.[/]")

    print("[cyan]Construyendo índice FAISS…[/]")
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
    ) as progress:
        task = progress.add_task("Chunking & Embeddings", total=None)
        #la llamada construirá o cargará el índice
        get_vectorstore()
        progress.update(task, completed=1)

    print("[bold green]Índice actualizado correctamente![/]")


if __name__ == "__main__":
    app()
