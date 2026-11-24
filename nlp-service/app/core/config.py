import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "Serviço de PLN - Plataforma Educacional COVID-19"
    VERSION: str = "1.0.0"
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8080",
        "http://127.0.0.1:8080"
    ]
    DATASET_PATH: str = os.getenv("DATASET_PATH", "../datasets/processed/covid_corpus_ptbr.jsonl")

settings = Settings()
