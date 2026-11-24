from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import nlp_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Motor computacional de Processamento de Linguagem Natural para análise de documentos da COVID-19."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(nlp_router.router)

@app.get("/")
def root():
    return {
        "plataforma": "Mineração de Texto e Linguagem Natural - COVID-19",
        "modulo_nlp": "Online",
        "docs": "/docs"
    }
