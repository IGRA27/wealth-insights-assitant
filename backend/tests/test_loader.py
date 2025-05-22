from pathlib import Path
from app.core import config
from scripts.load_pdfs import copy_pdfs
from app.services import retriever
from langchain.docstore.document import Document

def test_loader_rebuild(tmp_path: Path, monkeypatch):
    #PDF dummy (no importa su contenido)
    dummy_pdf = tmp_path / "dummy.pdf"
    dummy_pdf.write_bytes(b"%PDF-1.4\n%%EOF")

    #Parcho settings para usar carpeta temporal
    dst_dir = tmp_path / "dst"
    monkeypatch.setattr(config.settings, "data_path", dst_dir)
    monkeypatch.setattr(config.settings, "index_path", dst_dir / "faiss.index")

    #Mock: evito que PyPDFLoader intente parsear realmente
    monkeypatch.setattr(
        "langchain_community.document_loaders.pdf.PyPDFLoader.load",
        lambda self: [Document(page_content="dummy", metadata={})],
    )

    #ejecuto utilidades reales
    copied = copy_pdfs(tmp_path, dst_dir)
    assert copied == [dst_dir / "dummy.pdf"]

    vstore = retriever.get_vectorstore()
    assert vstore is not None
