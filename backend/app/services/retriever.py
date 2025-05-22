"""
Cargo PDFs, realiza chunks (chunkfica como diria yo) y construye / recupera el índice FAISS
"""
from __future__ import annotations
from pathlib import Path
from typing import List

from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

from ..core.config import get_settings
from ..core.logger import logger

settings = get_settings()


def _load_documents(path: Path) -> List[Document]:
    docs: List[Document] = []
    for pdf in path.glob("*.pdf"):
        docs.extend(PyPDFLoader(str(pdf)).load())
    logger.info(f"Loaded {len(docs)} pages from {path}")
    return docs


def get_vectorstore() -> FAISS:
    if settings.index_path.exists():
        logger.info("Loading existing FAISS index …")
        return FAISS.load_local(
            folder_path=str(settings.index_path.parent),
            embeddings=HuggingFaceEmbeddings(model_name=settings.embedding_model_name),
            index_name=settings.index_path.stem,
        )

    docs = _load_documents(settings.data_path)
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    chunks = splitter.split_documents(docs)

    embeddings = HuggingFaceEmbeddings(model_name=settings.embedding_model_name)
    vstore = FAISS.from_documents(chunks, embeddings)
    vstore.save_local(
        folder_path=str(settings.index_path.parent),
        index_name=settings.index_path.stem,
    )
    logger.info(f"Created FAISS index with {len(chunks)} chunks.")
    return vstore
