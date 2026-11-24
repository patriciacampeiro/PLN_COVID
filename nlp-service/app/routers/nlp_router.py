from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import json
import os
from app.services.text_processor import TextProcessor

router = APIRouter(prefix="/api/nlp", tags=["PLN Endpoints"])

class TextInput(BaseModel):
    text: str = Field(..., max_length=15000, description="Texto de entrada para análise")

class PreprocessInput(BaseModel):
    text: str = Field(..., max_length=15000)
    remove_stopwords: bool = True
    lowercase: bool = True
    remove_punct: bool = True
    remove_numbers: bool = False

class FrequencyInput(BaseModel):
    text: str = Field(..., max_length=25000)
    top_n: int = Field(20, ge=5, le=100)
    ngram: int = Field(1, ge=1, le=3)

class SimilarityInput(BaseModel):
    text1: str = Field(..., max_length=15000)
    text2: str = Field(..., max_length=15000)

class TfidfInput(BaseModel):
    documents: List[str] = Field(..., min_length=2, max_length=20)
    titles: Optional[List[str]] = None

@router.get("/health")
def healthcheck():
    return {"status": "UP", "service": "nlp-service", "engine": "spaCy + scikit-learn"}

@router.post("/tokenize")
def tokenize_endpoint(payload: TextInput):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="O texto não pode ser vazio.")
    return {"tokens": TextProcessor.tokenize(payload.text)}

@router.post("/preprocess")
def preprocess_endpoint(payload: PreprocessInput):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="O texto não pode ser vazio.")
    return TextProcessor.preprocess_pipeline(
        text=payload.text,
        remove_stopwords=payload.remove_stopwords,
        lowercase=payload.lowercase,
        remove_punct=payload.remove_punct,
        remove_numbers=payload.remove_numbers
    )

@router.post("/stem-lemma")
def stem_lemma_endpoint(payload: TextInput):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="O texto não pode ser vazio.")
    return {"comparisons": TextProcessor.stem_and_lemmatize(payload.text)}

@router.post("/frequency")
def frequency_endpoint(payload: FrequencyInput):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="O texto não pode ser vazio.")
    return TextProcessor.frequency_analysis(payload.text, payload.top_n, payload.ngram)

@router.post("/tfidf")
def tfidf_endpoint(payload: TfidfInput):
    return TextProcessor.calculate_tfidf(payload.documents, payload.titles)

@router.post("/similarity")
def similarity_endpoint(payload: SimilarityInput):
    if not payload.text1.strip() or not payload.text2.strip():
        raise HTTPException(status_code=400, detail="Ambos os textos devem ser preenchidos.")
    return TextProcessor.calculate_similarity(payload.text1, payload.text2)

@router.post("/sentiment")
def sentiment_endpoint(payload: TextInput):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="O texto não pode ser vazio.")
    return TextProcessor.sentiment_analysis(payload.text)

@router.post("/ner")
def ner_endpoint(payload: TextInput):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="O texto não pode ser vazio.")
    return {"entities": TextProcessor.extract_entities(payload.text)}

@router.get("/corpus/sample")
def get_corpus_samples():
    """Retorna amostras reais do corpus da pandemia documentado."""
    paths_to_try = [
        "datasets/processed/covid_corpus_ptbr.jsonl",
        "/app/datasets/processed/covid_corpus_ptbr.jsonl",
        "../datasets/processed/covid_corpus_ptbr.jsonl"
    ]
    for path in paths_to_try:
        if os.path.exists(path):
            samples = []
            with open(path, "r", encoding="utf-8") as f:
                for line in f:
                    if line.strip():
                        samples.append(json.loads(line))
            return {"total": len(samples), "documents": samples}
    return {"total": 0, "documents": []}
